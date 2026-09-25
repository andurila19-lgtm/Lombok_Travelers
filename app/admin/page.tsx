'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Booking } from '@/types';
import packagesData from '@/data/packages.json';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setBookings(data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const totalPax = bookings.reduce((sum, b) => sum + (b.participants || 1), 0);
  const newInquiries = bookings.filter((b) => b.status === 'New Inquiry');
  const activeBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Menunggu Konfirmasi' || b.status === 'DP' || b.status === 'Lunas' || (b.status as string) === 'Booking');
  const completedBookings = bookings.filter((b) => b.status === 'Selesai');
  const estimatedRevenue = totalPax * 1650000;

  return (
    <div className="admin-page-container">
      {/* Welcome Banner */}
      <div
        className="admin-welcome-banner"
        style={{
          background: 'linear-gradient(135deg, #091e13 0%, #185a38 100%)',
          borderRadius: '16px',
          padding: '24px 28px',
          color: '#ffffff',
          marginBottom: '22px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 24px -4px rgba(24, 90, 56, 0.25)',
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <span
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#86efac',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '10.5px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              display: 'inline-block',
              marginBottom: '6px',
            }}
          >
            Pusat Komando Operasional
          </span>
          <h1 className="admin-welcome-title" style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff', lineHeight: 1.25 }}>
            Selamat Datang di Command Center Lombok_Travelers
          </h1>
          <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, maxWidth: '600px', lineHeight: 1.5 }}>
            Basecamp Tetebatu, Sikur, Lombok Timur. Seluruh data reservasi, armada supir, dan pembukuan uang muka (DP) terpantau terpusat.
          </p>
        </div>

        <div className="admin-welcome-actions" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link
            href="/admin/bookings"
            style={{
              background: '#22c55e',
              color: '#ffffff',
              padding: '9px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.35)',
              flex: '1 1 auto',
            }}
          >
            <i className="fa fa-list-alt"></i> Kelola Booking ({bookings.length})
          </Link>
          <Link
            href="/admin/schedule"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '9px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flex: '1 1 auto',
            }}
          >
            <i className="fa fa-calendar"></i> Jadwal Trip
          </Link>
        </div>
      </div>

      {/* 4 KPI Summary Cards (2x2 on mobile, 4-col on desktop) */}
      <div
        className="admin-kpi-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          marginBottom: '24px',
        }}
      >
        {/* Card 1 */}
        <div className="admin-kpi-card" style={{ background: '#ffffff', padding: '16px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Tamu</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              <i className="fa fa-users"></i>
            </div>
          </div>
          <div className="admin-kpi-number" style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>{totalPax} Pax</div>
          <span style={{ fontSize: '11.5px', color: '#16a34a', display: 'block', marginTop: '2px' }}>
            <i className="fa fa-arrow-up"></i> Dari {bookings.length} reservasi
          </span>
        </div>

        {/* Card 2 */}
        <div className="admin-kpi-card" style={{ background: '#ffffff', padding: '16px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Inquiry Baru</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              <i className="fa fa-bell-o"></i>
            </div>
          </div>
          <div className="admin-kpi-number" style={{ fontSize: '24px', fontWeight: 800, color: '#d97706', marginTop: '6px' }}>{newInquiries.length} Baru</div>
          <span style={{ fontSize: '11.5px', color: '#64748b', display: 'block', marginTop: '2px' }}>
            Follow-up via WA
          </span>
        </div>

        {/* Card 3 */}
        <div className="admin-kpi-card" style={{ background: '#ffffff', padding: '16px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Trip Terkunci</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              <i className="fa fa-shield"></i>
            </div>
          </div>
          <div className="admin-kpi-number" style={{ fontSize: '24px', fontWeight: 800, color: '#7e22ce', marginTop: '6px' }}>{activeBookings.length} Trip</div>
          <span style={{ fontSize: '11.5px', color: '#64748b', display: 'block', marginTop: '2px' }}>
            Booking & DP aktif
          </span>
        </div>

        {/* Card 4 */}
        <div className="admin-kpi-card" style={{ background: '#ffffff', padding: '16px 18px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estimasi Omset</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              <i className="fa fa-money"></i>
            </div>
          </div>
          <div className="admin-kpi-number" style={{ fontSize: '22px', fontWeight: 800, color: '#15803d', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Rp {estimatedRevenue.toLocaleString('id-ID')}
          </div>
          <span style={{ fontSize: '11.5px', color: '#64748b', display: 'block', marginTop: '2px' }}>
            Proyeksi omset aktif
          </span>
        </div>
      </div>

      {/* 2-Column Operational Grid */}
      <div className="admin-ops-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Left: Penjemputan & Trip Terdekat (Dispatch Manifest) */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 2px 0', color: '#0f172a' }}>Jadwal Penjemputan Tamu</h3>
              <span style={{ fontSize: '11.5px', color: '#64748b' }}>Rombongan yang akan segera tiba di Lombok</span>
            </div>
            <Link href="/admin/schedule" style={{ fontSize: '11.5px', fontWeight: 700, color: '#185a38', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Lihat Semua ›
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {bookings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                style={{
                  background: '#f8fafc',
                  padding: '11px 13px',
                  borderRadius: '8px',
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '13px', color: '#0f172a' }}>{b.customer_name}</strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>({b.participants} Pax)</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#002366', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {b.package_name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="fa fa-map-marker" style={{ color: '#16a34a' }}></i>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.pickup_location}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#185a38' }}>{b.travel_date}</div>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '3px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      background: b.status === 'DP' ? '#f3e8ff' : '#eff6ff',
                      color: b.status === 'DP' ? '#7e22ce' : '#1d4ed8',
                    }}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Action Hub & Modules */}
        <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 3px 0', color: '#0f172a' }}>Modul Operasional</h3>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 14px 0' }}>
            Akses langsung ke seluruh instrumen pengelolaan Lombok_Travelers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <Link
              href="/admin/bookings"
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
                textDecoration: 'none',
                color: '#0f172a',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '13px' }}>
                <i className="fa fa-list"></i>
              </div>
              <strong style={{ fontSize: '12.5px', display: 'block' }}>Semua Booking</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Data, status & voucher</span>
            </Link>

            <Link
              href="/admin/schedule"
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
                textDecoration: 'none',
                color: '#0f172a',
              }}
            >
              <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '13px' }}>
                <i className="fa fa-calendar-check-o"></i>
              </div>
              <strong style={{ fontSize: '12.5px', display: 'block' }}>Jadwal Trip</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Manifest penjemputan</span>
            </Link>

            <Link
              href="/admin/fleets"
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
                textDecoration: 'none',
                color: '#0f172a',
              }}
            >
              <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '13px' }}>
                <i className="fa fa-car"></i>
              </div>
              <strong style={{ fontSize: '12.5px', display: 'block' }}>Armada & Sopir</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Unit Innova, HiAce, Avanza</span>
            </Link>

            <Link
              href="/admin/finance"
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px',
                textDecoration: 'none',
                color: '#0f172a',
              }}
            >
              <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', fontSize: '13px' }}>
                <i className="fa fa-money"></i>
              </div>
              <strong style={{ fontSize: '12.5px', display: 'block' }}>Keuangan & DP</strong>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Kas masuk & piutang</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .admin-welcome-banner {
            padding: 16px 16px !important;
          }
          .admin-welcome-title {
            fontSize: 18px !important;
          }
          .admin-welcome-actions {
            width: 100% !important;
          }
          .admin-welcome-actions a {
            flex: 1 1 45% !important;
          }
          .admin-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .admin-kpi-card {
            padding: 12px 12px !important;
          }
          .admin-kpi-number {
            font-size: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
