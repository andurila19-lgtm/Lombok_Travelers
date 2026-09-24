'use client';

import { useState, useEffect } from 'react';
import { Booking } from '@/types';

export default function AdminFinancePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

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

  const activeBookings = bookings.filter((b) => b.status !== 'Cancelled');
  const totalPax = activeBookings.reduce((sum, b) => sum + (b.participants || 1), 0);

  // Estimasi rata-rata per paket
  const grossTurnover = totalPax * 1650000;
  const operationalCosts = grossTurnover * 0.62; // 62% HPP (BBM, Driver fee, Boat snorkeling, Hotel, Resto)
  const netProfit = grossTurnover - operationalCosts;

  const dpReceived = activeBookings
    .filter((b) => b.status === 'DP' || b.status === 'Lunas' || b.status === 'Selesai')
    .reduce((sum, b) => sum + (b.participants || 1) * 500000, 0);

  const pendingCollection = grossTurnover - dpReceived;

  const exportFinanceCSV = () => {
    const headers = ['No Booking', 'Nama Tamu', 'Paket', 'Peserta', 'Estimasi Total (Rp)', 'DP 30% (Rp)', 'Sisa Pelunasan (Rp)', 'Status Booking'];
    const rows = activeBookings.map((b) => {
      const total = (b.participants || 1) * 1650000;
      const dp = Math.round(total * 0.3);
      const sisa = total - dp;
      return [
        `"${b.booking_number}"`,
        `"${b.customer_name}"`,
        `"${b.package_name}"`,
        b.participants,
        total,
        dp,
        sisa,
        `"${b.status}"`,
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `laporan_keuangan_lombok_travelers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              Laporan Keuangan & Estimasi Omset
            </h1>
            <span style={{ background: '#f3e8ff', color: '#7e22ce', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
              Finansial Operasional
            </span>
          </div>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: '4px 0 0 0' }}>
            Pencatatan estimasi nilai transaksi paket wisata, penerimaan uang muka (DP), dan sisa penagihan on-arrival.
          </p>
        </div>

        <button
          type="button"
          onClick={exportFinanceCSV}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '9px 16px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <i className="fa fa-download" style={{ color: '#16a34a' }}></i> Export Pembukuan CSV
        </button>
      </div>

      {/* 4 Financial Big Metric Cards */}
      <div
        className="admin-finance-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}
      >
        <div style={{ background: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Proyeksi Omset
          </span>
          <div className="fin-big-number" style={{ fontSize: '24px', fontWeight: 900, color: '#002366', marginTop: '4px' }}>
            Rp {grossTurnover.toLocaleString('id-ID')}
          </div>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>Dari {totalPax} peserta terdaftar</span>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #bbf7d0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            DP Kas Masuk
          </span>
          <div className="fin-big-number" style={{ fontSize: '24px', fontWeight: 900, color: '#15803d', marginTop: '4px' }}>
            Rp {dpReceived.toLocaleString('id-ID')}
          </div>
          <span style={{ fontSize: '11.5px', color: '#15803d' }}>
            <i className="fa fa-check"></i> Mengamankan armada
          </span>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #fde68a', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Piutang Pelunasan
          </span>
          <div className="fin-big-number" style={{ fontSize: '24px', fontWeight: 900, color: '#b45309', marginTop: '4px' }}>
            Rp {pendingCollection.toLocaleString('id-ID')}
          </div>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>Ditagih saat kedatangan</span>
        </div>

        <div style={{ background: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Estimasi Laba Bersih
          </span>
          <div className="fin-big-number" style={{ fontSize: '24px', fontWeight: 900, color: '#185a38', marginTop: '4px' }}>
            Rp {netProfit.toLocaleString('id-ID')}
          </div>
          <span style={{ fontSize: '11.5px', color: '#16a34a' }}>Margin ~38% setelah HPP</span>
        </div>
      </div>

      {/* Financial Table */}
      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Rincian Finansial per Booking</h3>
          <span style={{ fontSize: '11.5px', color: '#64748b' }}>Standar DP: 30% dari total estimasi</span>
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '650px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '12px 14px', fontWeight: 700 }}>No. Booking</th>
                <th style={{ padding: '12px 14px', fontWeight: 700 }}>Nama Tamu</th>
                <th style={{ padding: '12px 14px', fontWeight: 700 }}>Paket Wisata</th>
                <th style={{ padding: '12px 14px', fontWeight: 700, textAlign: 'center' }}>Pax</th>
                <th style={{ padding: '12px 14px', fontWeight: 700 }}>Estimasi Nilai</th>
                <th style={{ padding: '12px 14px', fontWeight: 700 }}>DP Masuk</th>
                <th style={{ padding: '12px 14px', fontWeight: 700 }}>Sisa Pelunasan</th>
                <th style={{ padding: '12px 14px', fontWeight: 700 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeBookings.map((b) => {
                const total = (b.participants || 1) * 1650000;
                const isDpPaid = b.status === 'DP' || b.status === 'Lunas' || b.status === 'Selesai';
                const dp = isDpPaid ? Math.round(total * 0.3) : 0;
                const sisa = b.status === 'Lunas' || b.status === 'Selesai' ? 0 : total - dp;

                return (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#002366', whiteSpace: 'nowrap' }}>
                      {b.booking_number}
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 600, whiteSpace: 'nowrap' }}>{b.customer_name}</td>
                    <td style={{ padding: '12px 14px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.package_name}</td>
                    <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700 }}>{b.participants}</td>
                    <td style={{ padding: '12px 14px', fontWeight: 700, whiteSpace: 'nowrap' }}>Rp {total.toLocaleString('id-ID')}</td>
                    <td style={{ padding: '12px 14px', color: '#15803d', fontWeight: 600, whiteSpace: 'nowrap' }}>Rp {dp.toLocaleString('id-ID')}</td>
                    <td style={{ padding: '12px 14px', color: sisa > 0 ? '#b45309' : '#15803d', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {sisa === 0 ? '✓ Lunas' : `Rp ${sisa.toLocaleString('id-ID')}`}
                    </td>
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: isDpPaid ? '#dcfce7' : '#fef3c7',
                          color: isDpPaid ? '#15803d' : '#b45309',
                        }}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .admin-finance-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .admin-finance-grid > div {
            padding: 12px 14px !important;
          }
          .fin-big-number {
            font-size: 19px !important;
          }
        }
      `}</style>
    </div>
  );
}
