'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [username, setUsername] = useState('admin_lombok');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Harap masukkan Username dan Password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Username atau password tidak sesuai.');
        return;
      }

      // Successful login -> Navigate to admin dashboard
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setErrorMsg('Gagal menghubungi server. Periksa koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#091e13',
        backgroundImage: 'radial-gradient(ellipse at 50% 25%, rgba(24, 90, 56, 0.45) 0%, rgba(9, 30, 19, 0.98) 75%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        color: '#ffffff',
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '440px',
          width: '100%',
          backgroundColor: '#0f291a',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '24px',
          padding: '40px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 50px rgba(34, 197, 94, 0.12)',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #185a38 0%, #22c55e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              fontSize: '24px',
              fontWeight: 900,
              color: '#ffffff',
              boxShadow: '0 8px 20px rgba(34, 197, 94, 0.4)',
            }}
          >
            LT
          </div>
          <span
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              color: '#86efac',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '4px 12px',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '10px',
            }}
          >
            Portal Administrator
          </span>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>
            Lombok_Travelers ERP
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
            Sistem Keamanan Terpusat Reservasi & Operasional Tour
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div
            role="alert"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#fca5a5',
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <i className="fa fa-exclamation-circle" style={{ color: '#ef4444' }}></i>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="admin_username"
              style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}
            >
              Username / ID Admin
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <i className="fa fa-user" style={{ position: 'absolute', left: '14px', color: '#64748b', fontSize: '14px' }}></i>
              <input
                id="admin_username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                autoComplete="username"
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="admin_password"
              style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}
            >
              Kata Sandi (Master Password)
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <i className="fa fa-lock" style={{ position: 'absolute', left: '14px', color: '#64748b', fontSize: '14px' }}></i>
              <input
                id="admin_password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                autoComplete="current-password"
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '15px',
                  padding: '4px',
                }}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '22px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#86efac', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa fa-shield"></i> Terenkripsi PBKDF2 & HttpOnly Session Token
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '10px',
              backgroundColor: '#22c55e',
              color: '#ffffff',
              border: 'none',
              fontSize: '14.5px',
              fontWeight: 700,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(34, 197, 94, 0.4)',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.8 : 1,
            }}
          >
            {isLoading ? (
              <>
                <i className="fa fa-spinner fa-spin"></i>
                <span>Memverifikasi Akses...</span>
              </>
            ) : (
              <>
                <i className="fa fa-sign-in"></i>
                <span>Masuk ke Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              color: '#94a3b8',
              fontSize: '12.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa fa-arrow-left"></i> Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#091e13',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#86efac',
          }}
        >
          <i className="fa fa-spinner fa-spin fa-2x"></i>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
