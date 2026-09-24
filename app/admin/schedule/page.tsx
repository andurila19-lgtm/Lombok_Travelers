'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Booking } from '@/types';

export default function AdminSchedulePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'upcoming'>('all');

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setBookings(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(a.travel_date).getTime() - new Date(b.travel_date).getTime()
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              Jadwal & Manifest Trip
            </h1>
            <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
              Dispatch & Penjemputan
            </span>
          </div>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: '4px 0 0 0' }}>
            Pantau jadwal keberangkatan rombongan, koordinasi supir penjemput bandara BIL, dan kesiapan armada.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa fa-print"></i> Cetak Manifest Harian
          </button>
        </div>
      </div>

      {/* Manifest Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sortedBookings.map((b) => {
          const cleanPhone = b.whatsapp.replace(/\D/g, '');
          const phone = cleanPhone.startsWith('0') ? `62${cleanPhone.slice(1)}` : cleanPhone;
          const reminderMsg = `Halo Kak ${b.customer_name},\n\nSalam dari Lombok_Travelers Tetebatu. Kami mengkonfirmasi penjemputan Anda besok tanggal ${b.travel_date} di *${b.pickup_location}*.\n\nArmada kami *${b.transportation}* bersama supir lokal Sasak kami sudah siap. Mohon nomor HP tetap aktif ya. Terima kasih!`;
          const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(reminderMsg)}`;

          return (
            <div
              key={b.id}
              className="schedule-card"
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '18px 20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                display: 'grid',
                gridTemplateColumns: '110px 1fr auto',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              {/* Date Box */}
              <div
                className="schedule-date-box"
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, display: 'block' }}>
                  {new Date(b.travel_date).toLocaleDateString('id-ID', { weekday: 'short' })}
                </span>
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#185a38', display: 'block', lineHeight: 1.1 }}>
                  {b.travel_date.split('-')[2]}
                </span>
                <span style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>
                  {new Date(b.travel_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                </span>
              </div>

              {/* Trip Manifest Info */}
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '15px', color: '#0f172a' }}>{b.customer_name}</strong>
                  <span style={{ fontSize: '11.5px', background: '#eff6ff', color: '#1d4ed8', padding: '2px 7px', borderRadius: '4px', fontWeight: 700 }}>
                    {b.participants} Orang
                  </span>
                  <span style={{ fontSize: '11.5px', background: '#f1f5f9', color: '#475569', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                    {b.booking_number}
                  </span>
                </div>

                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#002366', marginBottom: '6px' }}>
                  {b.package_name}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#475569' }}>
                  <div>
                    <i className="fa fa-map-marker" style={{ color: '#16a34a', marginRight: '4px' }}></i>
                    Pickup: <strong>{b.pickup_location}</strong>
                  </div>
                  <div>
                    <i className="fa fa-car" style={{ color: '#2563eb', marginRight: '4px' }}></i>
                    Armada: <strong>{b.transportation}</strong>
                  </div>
                  <div>
                    <i className="fa fa-whatsapp" style={{ color: '#16a34a', marginRight: '4px' }}></i>
                    {b.whatsapp}
                  </div>
                </div>

                {b.notes && (
                  <div style={{ fontSize: '11.5px', color: '#854d0e', background: '#fefce8', padding: '4px 8px', borderRadius: '4px', marginTop: '6px', display: 'inline-block' }}>
                    <i className="fa fa-info-circle"></i> Catatan: {b.notes}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="schedule-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '140px' }}>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#25d366',
                    color: '#ffffff',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fa fa-whatsapp"></i> WA Reminder H-1
                </a>

                <Link
                  href="/admin/bookings"
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Lihat Rincian ›
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .schedule-card {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
            padding: 14px !important;
          }
          .schedule-date-box {
            display: flex !important;
            align-items: center !important;
            justifyContent: space-around !important;
            padding: 6px 12px !important;
          }
          .schedule-date-box span {
            display: inline-block !important;
            margin: 0 4px !important;
          }
          .schedule-actions {
            flex-direction: row !important;
            width: 100% !important;
          }
          .schedule-actions a,
          .schedule-actions button {
            flex: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
