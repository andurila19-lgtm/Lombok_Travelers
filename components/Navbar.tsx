'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();

  const isHome = pathname === '/';
  const isPaket = pathname.startsWith('/paket');
  const isTrip = pathname.startsWith('/trip-harian');
  const isTransport = pathname.startsWith('/transport');
  const isArtikel = pathname.startsWith('/artikel');
  const isAbout = pathname.startsWith('/tentang-kami');
  const isKontak = pathname.startsWith('/kontak');

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* HEADER / NAVBAR */}
      <header id="header">
        <div className="navbar-container">
          {/* Logo Left */}
          <Link href="/" className="brand-logo">
            <img src="/images/logo.png" alt="Lombok_Travelers Logo" />
            <div className="brand-logo-text">
              <span className="brand-name">Lombok_Travelers</span>
              <span className="brand-tagline">Tetebatu • Lombok Timur</span>
            </div>
          </Link>

          {/* Navigation Center */}
          <nav className="nav-menu">
            <div className="nav-item">
              <Link href="/" className={`nav-link ${isHome ? 'active' : ''}`}>
                {t.nav.home}
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/paket" className={`nav-link ${isPaket ? 'active' : ''}`}>
                {t.nav.tourPackages} <i className="fa fa-angle-down"></i>
              </Link>
              <div className="dropdown-menu">
                <Link href="/paket" className="dropdown-link" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  {language === 'en' ? '› View All Packages' : '› Lihat Semua Paket'}
                </Link>
                <div style={{ height: '1px', background: '#eee', margin: '4px 0' }}></div>
                <Link href="/paket/paket-lombok-3-hari-2-malam" className="dropdown-link">
                  Paket Lombok 3H2M (Best Seller)
                </Link>
                <Link href="/paket/paket-lombok-2-hari-1-malam" className="dropdown-link">
                  Paket Lombok 2H1M
                </Link>
                <Link href="/paket/paket-lombok-4-hari-3-malam" className="dropdown-link">
                  Paket Lombok 4H3M
                </Link>
                <Link href="/paket/paket-lombok-5-hari-4-malam" className="dropdown-link">
                  Paket Lombok 5H4M
                </Link>
                <Link href="/paket/private-lombok-honeymoon-trip" className="dropdown-link">
                  Private Honeymoon
                </Link>
                <Link href="/paket/tetebatu-nature-cultural-immersion" className="dropdown-link">
                  Tetebatu Cultural Tour
                </Link>
              </div>
            </div>
            <div className="nav-item">
              <Link href="/trip-harian" className={`nav-link ${isTrip ? 'active' : ''}`}>
                {t.nav.dailyTrips}
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/transport" className={`nav-link ${isTransport ? 'active' : ''}`}>
                {t.nav.transport}
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/artikel" className={`nav-link ${isArtikel ? 'active' : ''}`}>
                {t.nav.articles}
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/tentang-kami" className={`nav-link ${isAbout ? 'active' : ''}`}>
                {language === 'en' ? 'About Us' : 'Tentang Kami'}
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/kontak" className={`nav-link ${isKontak ? 'active' : ''}`}>
                {language === 'en' ? 'Contact' : 'Kontak'}
              </Link>
            </div>
          </nav>

          {/* Language & Currency Controls Right */}
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Currency Selector Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#f1f5f9',
              borderRadius: '20px',
              padding: '2px',
              border: '1px solid #cbd5e1'
            }}>
              <button
                type="button"
                onClick={() => setCurrency('IDR')}
                style={{
                  background: currency === 'IDR' ? '#002366' : 'transparent',
                  color: currency === 'IDR' ? '#ffffff' : '#64748b',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '3px 8px',
                  fontWeight: currency === 'IDR' ? 700 : 600,
                  fontSize: '11px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Rupiah (IDR)"
              >
                IDR
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                style={{
                  background: currency === 'USD' ? '#002366' : 'transparent',
                  color: currency === 'USD' ? '#ffffff' : '#64748b',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '3px 8px',
                  fontWeight: currency === 'USD' ? 700 : 600,
                  fontSize: '11px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="US Dollar (USD)"
              >
                USD
              </button>
            </div>

            {/* Language Toggle */}
            <div className="bahasa-toggle">
              <button
                type="button"
                className={`bahasa-item ${language === 'id' ? 'active-lang' : ''}`}
                onClick={() => setLanguage('id')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: language === 'id' ? 800 : 500,
                  color: language === 'id' ? '#002366' : '#777777',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  outline: language === 'id' ? '1px solid #002366' : 'none'
                }}
                aria-label="Pilih Bahasa Indonesia"
              >
                ID{' '}
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" style={{ border: '1px solid #ddd', verticalAlign: 'middle', display: 'inline-block' }}>
                  <rect width="18" height="6" fill="#E70011" />
                  <rect y="6" width="18" height="6" fill="#FFFFFF" />
                </svg>
              </button>
              <span style={{ color: '#ccc', margin: '0 2px' }}>|</span>
              <button
                type="button"
                className={`bahasa-item ${language === 'en' ? 'active-lang' : ''}`}
                onClick={() => setLanguage('en')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: language === 'en' ? 800 : 500,
                  color: language === 'en' ? '#002366' : '#777777',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  outline: language === 'en' ? '1px solid #002366' : 'none'
                }}
                aria-label="Select English Language"
              >
                EN{' '}
                <svg width="18" height="12" viewBox="0 0 60 30" fill="none" style={{ border: '1px solid #ddd', verticalAlign: 'middle', display: 'inline-block' }}>
                  <clipPath id="gb-flag"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
                  <clipPath id="gb-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
                  <g clipPath="url(#gb-flag)">
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                  </g>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button className="mobile-toggle" aria-label="Menu Navigasi" onClick={() => setMobileOpen(true)}>
            <i className="fa fa-bars"></i>
          </button>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      <div className={`mobile-nav-drawer ${mobileOpen ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <div className="brand-logo-text">
              <span className="brand-name" style={{ fontSize: '17px' }}>Lombok_Travelers</span>
              <span className="brand-tagline">Tetebatu Travel Partner</span>
            </div>
            <button style={{ background: 'none', border: 'none', fontSize: '20px', color: 'var(--dark)', cursor: 'pointer' }} onClick={() => setMobileOpen(false)}>
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="mobile-nav-links">
            <Link href="/" onClick={() => setMobileOpen(false)}>{t.nav.home}</Link>
            <Link href="/paket" onClick={() => setMobileOpen(false)}>{t.nav.tourPackages}</Link>
            <Link href="/trip-harian" onClick={() => setMobileOpen(false)}>{t.nav.dailyTrips}</Link>
            <Link href="/transport" onClick={() => setMobileOpen(false)}>{t.nav.transport}</Link>
            <Link href="/artikel" onClick={() => setMobileOpen(false)}>{t.nav.articles}</Link>
            <Link href="/tentang-kami" onClick={() => setMobileOpen(false)}>{language === 'en' ? 'About Us' : 'Tentang Kami'}</Link>
            <Link href="/kontak" onClick={() => setMobileOpen(false)}>{language === 'en' ? 'Contact' : 'Kontak'}</Link>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Currency:</div>
              <div style={{ display: 'inline-flex', background: '#f1f5f9', borderRadius: '16px', padding: '2px', border: '1px solid #cbd5e1' }}>
                <button
                  type="button"
                  onClick={() => setCurrency('IDR')}
                  style={{
                    background: currency === 'IDR' ? '#002366' : 'transparent',
                    color: currency === 'IDR' ? '#fff' : '#64748b',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '3px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  IDR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  style={{
                    background: currency === 'USD' ? '#002366' : 'transparent',
                    color: currency === 'USD' ? '#fff' : '#64748b',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '3px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  USD
                </button>
              </div>
            </div>
            <a href="https://wa.me/6283117110638" target="_blank" rel="noopener noreferrer" className="btn-sidebar-wa">
              <i className="fa fa-whatsapp"></i> Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
