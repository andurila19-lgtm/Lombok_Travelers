import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
function checkRateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number } {
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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin');
  const method = request.method;

  // 1. CORS Preflight & Verification for API routes
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
        preflightHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        preflightHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        preflightHeaders.set('Access-Control-Max-Age', '86400');
      }
      return new NextResponse(null, { status: 204, headers: preflightHeaders });
    }

    // 2. API Rate Limiting on POST, PATCH, DELETE (Prevent Spam & Bot Abuse)
    if (['POST', 'PATCH', 'DELETE'].includes(method)) {
      const forwardedFor = request.headers.get('x-forwarded-for');
      const realIp = request.headers.get('x-real-ip');
      const ip = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

      // Limit: max 15 requests per minute per IP for mutating endpoints
      const rateLimitKey = `${ip}:${pathname}`;
      const { allowed, remaining } = checkRateLimit(rateLimitKey, 15, 60 * 1000);

      if (!allowed) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: 'Terlalu banyak permintaan (Rate limit terlampaui). Silakan tunggu 1 menit sebelum mencoba kembali.',
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
  }

  // 3. Process normal request & attach Enterprise Security Headers
  const response = NextResponse.next();

  // Attach CORS headers to API responses
  if (pathname.startsWith('/api') && origin) {
    if (
      ALLOWED_ORIGINS.includes(origin) ||
      origin.endsWith('.reaksy.com') ||
      origin.endsWith('.lomboktravelers.com')
    ) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    }
  }

  // Enterprise HTTP Security Headers (OWASP Recommended)
  response.headers.set('X-Frame-Options', 'SAMEORIGIN'); // Prevent clickjacking
  response.headers.set('X-Content-Type-Options', 'nosniff'); // Prevent MIME confusion attacks
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin'); // Protect referrer privacy
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()'); // Disable unused hardware
  response.headers.set('X-XSS-Protection', '1; mode=block'); // Legacy XSS defense

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, images, and favicons
     */
    '/((?!_next/static|_next/image|images|favicon.ico).*)',
  ],
};
