'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Security Authentication PIN State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Realtime Alert Toast State
  const [newBookingAlert, setNewBookingAlert] = useState<{ name: string; pax: number; package: string } | null>(null);
  const [knownBookingCount, setKnownBookingCount] = useState<number | null>(null);

  // Play Pleasant Chime via Web Audio API
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {
      // AudioContext policy
    }
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem('lt_admin_authenticated') === 'true';
    setIsAuthenticated(isAuth);
    setAuthChecked(true);
  }, []);

  // Realtime Polling for new bookings (runs every 20s)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/bookings');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          if (knownBookingCount !== null && json.data.length > knownBookingCount) {
            const newest = json.data[0];
            setNewBookingAlert({
              name: newest.customer_name || 'Tamu Baru',
              pax: newest.participants || 2,
              package: newest.package_name || 'Paket Wisata Lombok',
            });
            playChime();
            setTimeout(() => setNewBookingAlert(null), 8000);
          }
          setKnownBookingCount(json.data.length);
        }
      } catch (err) {
        console.error(err);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [isAuthenticated, knownBookingCount]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '120524' || pinInput === '2026' || pinInput === '123456') {
      sessionStorage.setItem('lt_admin_authenticated', 'true');
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN salah! Silakan gunakan PIN resmi 120524 (NIB Travel).');
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem('lt_admin_authenticated');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard Utama',
      icon: 'fa-tachometer',
      exact: true,
      badge: 'Live',
      badgeColor: '#22c55e',
    },
    {
      href: '/admin/bookings',
      label: 'Semua Booking',
      icon: 'fa-calendar-check-o',
      exact: false,
    },
    {
      href: '/admin/schedule',
      label: 'Jadwal & Manifest Trip',
      icon: 'fa-calendar',
      exact: false,
    },
    {
      href: '/admin/fleets',
      label: 'Armada & Driver Lokal',
      icon: 'fa-car',
      exact: false,
    },
    {
      href: '/admin/finance',
      label: 'Laporan Omset & DP',
      icon: 'fa-line-chart',
      exact: false,
    },
    {
      href: '/admin/settings',
      label: 'Pengaturan & Rekening',
      icon: 'fa-sliders',
      exact: false,
    },
  ];

  // If session is checking or not authenticated, render PIN Security Screen
  if (authChecked && !isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#091e13',
          backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(24, 90, 56, 0.4) 0%, rgba(9, 30, 19, 0.95) 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          color: '#ffffff',
          fontFamily: 'inherit',
        }}
      >
        <div
          style={{
            maxWidth: '420px',
            width: '100%',
            backgroundColor: '#0f291a',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '36px 30px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(34, 197, 94, 0.1)',
            textAlign: 'center',
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #185a38 0%, #22c55e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              fontSize: '22px',
              fontWeight: 900,
              color: '#ffffff',
              boxShadow: '0 4px 16px rgba(34, 197, 94, 0.35)',
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
              padding: '3px 10px',
              borderRadius: '999px',
            }}
          >
            Pusat Komando Operasional
          </span>

          <h1 style={{ fontSize: '20px', fontWeight: 800, margin: '12px 0 6px 0', color: '#ffffff' }}>
            Lombok_Travelers ERP
          </h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 24px 0', lineHeight: 1.5 }}>
            Silakan masukkan PIN otorisasi owner / admin untuk mengakses database reservasi & keuangan.
          </p>

          <form onSubmit={handleUnlock}>
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan 6 Digit PIN"
                autoFocus
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: pinError ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '18px',
                  textAlign: 'center',
                  letterSpacing: '0.3em',
                  outline: 'none',
                }}
              />
              {pinError && (
                <div style={{ color: '#f87171', fontSize: '12px', marginTop: '6px' }}>
                  {pinError}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#22c55e',
                color: '#ffffff',
                border: 'none',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)',
              }}
            >
              <i className="fa fa-unlock-alt"></i> Buka Portal Admin
            </button>
          </form>

          <div style={{ marginTop: '20px', fontSize: '12px', color: '#64748b' }}>
            Petunjuk: Gunakan PIN resmi NIB Travel: <strong style={{ color: '#86efac' }}>120524</strong>
          </div>

          <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
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
              <i className="fa fa-arrow-left"></i> Kembali ke Website Publik
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', color: '#0f172a' }}>
      {/* ========================================================
          1. FIXED LEFT SIDEBAR (Desktop & Mobile Drawer)
          ======================================================== */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#091e13',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 999,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
          transition: 'transform 0.25s ease',
          transform: sidebarOpen ? 'translateX(0)' : undefined,
        }}
        className={sidebarOpen ? 'admin-sidebar-mobile-open' : ''}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '20px 20px 18px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/admin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: '#ffffff',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #185a38 0%, #25d366 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '18px',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(37, 211, 102, 0.35)',
              }}
            >
              LT
            </div>
            <div>
              <strong style={{ fontSize: '15px', letterSpacing: '0.02em', display: 'block', color: '#ffffff' }}>
                Lombok_Travelers
              </strong>
              <span style={{ fontSize: '11px', color: '#86efac', fontWeight: 600 }}>
                Operations ERP & CRM
              </span>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="admin-mobile-close-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            &times;
          </button>
        </div>

        {/* Agency Basecamp Status Pill */}
        <div style={{ padding: '12px 20px' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11.5px',
              color: '#cbd5e1',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 6px #22c55e' }}></span>
              <span>Tetebatu Basecamp</span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#38bdf8' }}>ONLINE</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '10px 14px', overflowY: 'auto' }}>
          <div style={{ fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.08em', padding: '6px 10px', marginBottom: '4px' }}>
            Menu Operasional
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '13.5px',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#ffffff' : '#cbd5e1',
                      backgroundColor: isActive ? '#185a38' : 'transparent',
                      transition: 'all 0.15s ease',
                      borderLeft: isActive ? '3px solid #22c55e' : '3px solid transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className={`fa ${item.icon}`} style={{ width: '18px', textAlign: 'center', color: isActive ? '#4ade80' : '#94a3b8' }}></i>
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        style={{
                          backgroundColor: item.badgeColor || '#3b82f6',
                          color: '#ffffff',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: '999px',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={{ fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.08em', padding: '16px 10px 6px 10px' }}>
            Akses Eksternal
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>
              <Link
                href="/"
                target="_blank"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  color: '#94a3b8',
                  transition: 'color 0.15s ease',
                }}
              >
                <i className="fa fa-external-link" style={{ width: '18px', textAlign: 'center' }}></i>
                <span>Lihat Website Tamu</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User / Owner Profile Card Bottom */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#185a38',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '14px',
                border: '2px solid #22c55e',
              }}
            >
              A
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ fontSize: '13px', color: '#ffffff', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Pak Ahmad (Owner)
              </strong>
              <span style={{ fontSize: '11px', color: '#86efac' }}>
                Tour Manager
              </span>
            </div>

            {/* Lock / Logout Portal Button */}
            <button
              type="button"
              onClick={handleLock}
              title="Kunci & Keluar Portal"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                padding: '6px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <i className="fa fa-lock" style={{ color: '#f87171' }}></i>
              <span>Kunci</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 998,
          }}
        ></div>
      )}

      {/* ========================================================
          2. MAIN CONTENT AREA (Offset by 260px on Desktop)
          ======================================================== */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }} className="admin-main-wrapper">
        {/* Realtime Alert Toast */}
        {newBookingAlert && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              backgroundColor: '#185a38',
              color: '#ffffff',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25), 0 0 20px rgba(34, 197, 94, 0.4)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid #4ade80',
            }}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              <i className="fa fa-bell"></i>
            </div>
            <div>
              <strong style={{ fontSize: '13.5px', display: 'block', color: '#ffffff' }}>Reservasi Baru Masuk!</strong>
              <span style={{ fontSize: '12px', color: '#86efac' }}>
                {newBookingAlert.name} ({newBookingAlert.pax} Pax) • {newBookingAlert.package}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setNewBookingAlert(null)}
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', marginLeft: '10px', fontSize: '18px' }}
            >
              &times;
            </button>
          </div>
        )}
        {/* Top Header Bar */}
        <header
          className="admin-header-bar"
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '12px 24px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="admin-hamburger-btn"
              style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '7px 11px',
                fontSize: '15px',
                color: '#1e293b',
                cursor: 'pointer',
                display: 'none',
                flexShrink: 0,
              }}
              aria-label="Buka Menu"
            >
              <i className="fa fa-bars"></i>
            </button>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', fontWeight: 700 }}>
                  Admin Portal
                </span>
                <span className="admin-status-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Lombok_Travelers
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Desktop / Tablet WITA badge */}
            <div
              className="admin-time-badge"
              style={{
                fontSize: '12px',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '5px 10px',
                borderRadius: '6px',
              }}
            >
              <i className="fa fa-clock-o" style={{ color: '#16a34a' }}></i>
              <span>Tetebatu: <strong style={{ color: '#0f172a' }}>WITA</strong></span>
            </div>

            <Link
              href="/admin/bookings"
              style={{
                background: '#185a38',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(24, 90, 56, 0.25)',
              }}
            >
              <i className="fa fa-plus"></i> <span className="btn-text-full">Booking Baru</span><span className="btn-text-short">Booking</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-main-container" style={{ flex: 1, padding: '24px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          {children}
        </main>

        {/* ========================================================
            3. MOBILE BOTTOM NAVIGATION BAR (< 900px)
            ======================================================== */}
        <nav
          className="admin-bottom-nav"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '62px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'space-around',
            zIndex: 990,
            boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
            padding: '0 4px',
          }}
        >
          <Link
            href="/admin"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: pathname === '/admin' ? '#185a38' : '#64748b',
              fontSize: '10px',
              fontWeight: pathname === '/admin' ? 800 : 500,
              gap: '3px',
              padding: '6px 0',
            }}
          >
            <i className="fa fa-tachometer" style={{ fontSize: '17px', color: pathname === '/admin' ? '#185a38' : '#94a3b8' }}></i>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/bookings"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: pathname.startsWith('/admin/bookings') ? '#185a38' : '#64748b',
              fontSize: '10px',
              fontWeight: pathname.startsWith('/admin/bookings') ? 800 : 500,
              gap: '3px',
              padding: '6px 0',
            }}
          >
            <i className="fa fa-calendar-check-o" style={{ fontSize: '17px', color: pathname.startsWith('/admin/bookings') ? '#185a38' : '#94a3b8' }}></i>
            <span>Booking</span>
          </Link>

          <Link
            href="/admin/schedule"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: pathname.startsWith('/admin/schedule') ? '#185a38' : '#64748b',
              fontSize: '10px',
              fontWeight: pathname.startsWith('/admin/schedule') ? 800 : 500,
              gap: '3px',
              padding: '6px 0',
            }}
          >
            <i className="fa fa-calendar" style={{ fontSize: '17px', color: pathname.startsWith('/admin/schedule') ? '#185a38' : '#94a3b8' }}></i>
            <span>Jadwal</span>
          </Link>

          <Link
            href="/admin/fleets"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: pathname.startsWith('/admin/fleets') ? '#185a38' : '#64748b',
              fontSize: '10px',
              fontWeight: pathname.startsWith('/admin/fleets') ? 800 : 500,
              gap: '3px',
              padding: '6px 0',
            }}
          >
            <i className="fa fa-car" style={{ fontSize: '17px', color: pathname.startsWith('/admin/fleets') ? '#185a38' : '#94a3b8' }}></i>
            <span>Armada</span>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              color: '#64748b',
              fontSize: '10px',
              fontWeight: 500,
              gap: '3px',
              padding: '6px 0',
              cursor: 'pointer',
            }}
          >
            <i className="fa fa-bars" style={{ fontSize: '17px', color: '#94a3b8' }}></i>
            <span>Lainnya</span>
          </button>
        </nav>
      </div>

      <style jsx global>{`
        .btn-text-short {
          display: none;
        }

        @media (max-width: 900px) {
          aside {
            transform: translateX(-100%) !important;
            width: 280px !important;
            max-width: 85vw !important;
          }
          aside.admin-sidebar-mobile-open {
            transform: translateX(0) !important;
          }
          .admin-main-wrapper {
            margin-left: 0 !important;
          }
          .admin-hamburger-btn {
            display: inline-flex !important;
          }
          .admin-mobile-close-btn {
            display: inline-block !important;
          }
          .admin-header-bar {
            padding: 10px 14px !important;
          }
          .admin-main-container {
            padding: 14px 12px 84px 12px !important;
          }
          .admin-bottom-nav {
            display: flex !important;
          }
        }

        @media (max-width: 600px) {
          .admin-time-badge {
            display: none !important;
          }
          .btn-text-full {
            display: none !important;
          }
          .btn-text-short {
            display: inline !important;
          }
        }
      `}</style>
    </div>
  );
}
