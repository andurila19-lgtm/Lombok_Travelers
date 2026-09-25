import { NextResponse } from 'next/server';
import {
  DEFAULT_ADMIN_USERNAME,
  verifyPassword,
  createSessionToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username dan Password wajib diisi.' },
        { status: 400 }
      );
    }

    const expectedUsername =
      process.env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME;

    if (username.trim() !== expectedUsername) {
      return NextResponse.json(
        { success: false, error: 'Kredensial login tidak valid.' },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'Kredensial login tidak valid.' },
        { status: 401 }
      );
    }

    // Generate signed HMAC token (valid 8 hours)
    const token = await createSessionToken({
      username: expectedUsername,
      role: 'admin',
    });

    const isProd = process.env.NODE_ENV === 'production';

    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil. Selamat datang di Dashboard.',
      user: {
        username: expectedUsername,
        role: 'admin',
      },
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 8 * 3600, // 8 hours
    });

    return response;
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat proses login.' },
      { status: 500 }
    );
  }
}
