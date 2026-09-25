import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

/**
 * In-memory sliding window rate limiting
 */
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up expired entries every 5 minutes to prevent memory accumulation
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpired() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }
}

/**
 * Checks if the given key (IP + endpoint) has exceeded the rate limit.
 */
function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  cleanupExpired();
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}

// Trusted domains allowed to access APIs
const ALLOWED_ORIGINS = [
  'https://lomboktravelers.reaksy.com',
  'https://reaksy.com',
  'https://lomboktravelers.com',
  'https://www.lomboktravelers.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // FAST PATH: Never intercept public pages or static assets
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  try {
    const origin = request.headers.get('origin');
    const method = request.method;

    // --------------------------------------------------------------------------
    // 1. ADMIN ROUTE AUTHORIZATION GATEWAY
    // --------------------------------------------------------------------------
    if (pathname.startsWith('/admin')) {
      const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const adminUser = await verifySessionToken(sessionToken);

      // If visiting /admin/login while already authenticated -> redirect to /admin
      if (pathname === '/admin/login') {
        if (adminUser) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
      }

      // For all other /admin routes (/admin, /admin/bookings, /admin/schedule, etc.)
      // If not authenticated -> strictly redirect to /admin/login
      if (!adminUser) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

  // --------------------------------------------------------------------------
  // 2. CORS PREFLIGHT & SECURE API ROUTING
  // --------------------------------------------------------------------------
  if (pathname.startsWith('/api')) {
    // Handle CORS preflight OPTIONS request
    if (method === 'OPTIONS') {
      const preflightHeaders = new Headers();
      if (
        origin &&
        (ALLOWED_ORIGINS.includes(origin) ||
          origin.endsWith('.reaksy.com') ||
          origin.endsWith('.lomboktravelers.com'))
      ) {
        preflightHeaders.set('Access-Control-Allow-Origin', origin);
        preflightHeaders.set(
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, DELETE, OPTIONS'
        );
        preflightHeaders.set(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization, X-Requested-With'
        );
        preflightHeaders.set('Access-Control-Max-Age', '86400');
      }
      return new NextResponse(null, { status: 204, headers: preflightHeaders });
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip =
      (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

    // 2a. Brute Force Protection on Login Endpoint (Strict: max 5 req/minute)
    if (pathname === '/api/auth/login' && method === 'POST') {
      const loginRateKey = `${ip}:auth-login`;
      const { allowed } = checkRateLimit(loginRateKey, 5, 60 * 1000);
      if (!allowed) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            error:
              'Terlalu banyak percobaan login gagal. Demi keamanan, silakan tunggu 1 menit.',
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '60',
            },
          }
        );
      }
    }

    // 2b. Rate Limiting on API POST/PATCH/DELETE endpoints (max 15 req/minute)
    if (['POST', 'PATCH', 'DELETE'].includes(method)) {
      const rateLimitKey = `${ip}:${pathname}`;
      const { allowed } = checkRateLimit(rateLimitKey, 15, 60 * 1000);

      if (!allowed) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            error:
              'Terlalu banyak permintaan (Rate limit terlampaui). Silakan tunggu 1 menit sebelum mencoba kembali.',
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '60',
              'X-RateLimit-Limit': '15',
              'X-RateLimit-Remaining': '0',
            },
          }
        );
      }
    }

    // 2c. Server-Side API Authorization Check for Admin Booking Management
    // Customer can only POST new bookings.
    // GET /api/bookings (list all), PATCH/DELETE /api/bookings/* require valid admin session!
    const isAdminOnlyApi =
      (pathname === '/api/bookings' && method === 'GET') ||
      (pathname.startsWith('/api/bookings/') && ['GET', 'PATCH', 'DELETE'].includes(method));

    if (isAdminOnlyApi) {
      const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const adminUser = await verifySessionToken(sessionToken);

      if (!adminUser) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: 'Unauthorized: Akses ditolak. Harap login sebagai administrator.',
          }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }
  }

  // --------------------------------------------------------------------------
  // 3. ENTERPRISE SECURITY HEADERS
  // --------------------------------------------------------------------------
  const response = NextResponse.next();

  // Attach CORS headers to API responses
  if (pathname.startsWith('/api') && origin) {
    if (
      ALLOWED_ORIGINS.includes(origin) ||
      origin.endsWith('.reaksy.com') ||
      origin.endsWith('.lomboktravelers.com')
    ) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
      );
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
      );
    }
  }

  // Enterprise HTTP Security Headers (OWASP Recommended)
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
  } catch (err) {
    console.error('Security Middleware Exception:', err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
