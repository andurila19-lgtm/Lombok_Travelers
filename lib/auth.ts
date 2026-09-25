/**
 * Authentication and Security Utility for Lombok_Travelers Admin
 * Uses Web Crypto API for full compatibility across Node.js and Next.js Edge Runtime.
 */

export const ADMIN_COOKIE_NAME = 'lt_admin_session';

// Secret key for HMAC token signing (configurable via env)
const SECRET_KEY =
  process.env.SESSION_SECRET ||
  'lombok_travelers_enterprise_hmac_secret_key_2026_secure_tetebatu';

// Default Admin Credentials (configurable via env)
export const DEFAULT_ADMIN_USERNAME =
  process.env.ADMIN_USERNAME || 'admin_lombok';

// Password hash generated with PBKDF2-HMAC-SHA256 (Salt: lt_salt_2026, 100000 iter)
// Default password: LombokTravelers2026!
const DEFAULT_HASH_WITH_SALT =
  'lt_salt_2026:6dbbc0657158f96e4695eb074668f18471c26f0f5bdfb6f2f0c72782e4f0ef1f';

export interface AdminUser {
  username: string;
  role: 'admin';
  exp: number;
}

// Helper: Base64URL encoding/decoding
export function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64UrlToBytes(base64Url: string): Uint8Array {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function textToBase64Url(text: string): string {
  return bytesToBase64Url(new TextEncoder().encode(text));
}

export function base64UrlToText(base64Url: string): string {
  return new TextDecoder().decode(base64UrlToBytes(base64Url));
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hash password with PBKDF2 using Web Crypto
 */
export async function hashPassword(
  password: string,
  salt = 'lt_salt_2026'
): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    true,
    ['sign']
  );

  const exported = await crypto.subtle.exportKey('raw', key);
  return `${salt}:${bufferToHex(exported)}`;
}

/**
 * Verify password against stored PBKDF2 hash (timing-safe)
 */
export async function verifyPassword(
  plain: string,
  storedHashWithSalt = DEFAULT_HASH_WITH_SALT
): Promise<boolean> {
  try {
    // If environment has raw override for development ease
    if (process.env.ADMIN_PASSWORD && plain === process.env.ADMIN_PASSWORD) {
      return true;
    }

    const [salt, expectedHash] = storedHashWithSalt.split(':');
    if (!salt || !expectedHash) return false;

    const computed = await hashPassword(plain, salt);
    const [, actualHash] = computed.split(':');

    // Constant-time string comparison to prevent timing attacks
    if (expectedHash.length !== actualHash.length) return false;
    let result = 0;
    for (let i = 0; i < expectedHash.length; i++) {
      result |= expectedHash.charCodeAt(i) ^ actualHash.charCodeAt(i);
    }
    return result === 0;
  } catch {
    return false;
  }
}

/**
 * Create a cryptographically signed session token (HMAC-SHA256)
 * Valid for 8 hours
 */
export async function createSessionToken(
  user: { username: string; role: 'admin' },
  durationMs = 8 * 3600 * 1000
): Promise<string> {
  const payload: AdminUser = {
    username: user.username,
    role: user.role,
    exp: Date.now() + durationMs,
  };

  const payloadEncoded = textToBase64Url(JSON.stringify(payload));
  const enc = new TextEncoder();

  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(SECRET_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    enc.encode(payloadEncoded)
  );

  const signatureEncoded = bytesToBase64Url(new Uint8Array(signature));

  return `${payloadEncoded}.${signatureEncoded}`;
}

/**
 * Verify a session token signature & expiration
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<AdminUser | null> {
  if (!token || typeof token !== 'string') return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payloadEncoded, signatureEncoded] = parts;
    const enc = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(SECRET_KEY),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = base64UrlToBytes(signatureEncoded);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes as unknown as BufferSource,
      enc.encode(payloadEncoded)
    );

    if (!isValid) return null;

    const payload: AdminUser = JSON.parse(base64UrlToText(payloadEncoded));

    // Check expiration
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    if (payload.role !== 'admin') {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
