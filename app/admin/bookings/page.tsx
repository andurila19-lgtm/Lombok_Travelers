'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Booking, BookingStatus } from '@/types';
import packagesData from '@/data/packages.json';

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string; icon: string; countBadge: string }
> = {
  'New Inquiry': {
    label: 'New Inquiry',
    bg: '#eff6ff',
    text: '#1d4ed8',
    border: '#bfdbfe',
    icon: 'fa-bell-o',
    countBadge: '#3b82f6',
  },
  'Menunggu Konfirmasi': {
    label: 'Menunggu Konfirmasi',
    bg: '#fff7ed',
    text: '#c2410c',
    border: '#ffedd5',
    icon: 'fa-clock-o',
    countBadge: '#ea580c',
  },
  Confirmed: {
    label: 'Confirmed',
    bg: '#ecfdf5',
    text: '#047857',
    border: '#a7f3d0',
    icon: 'fa-check-circle-o',
    countBadge: '#10b981',
  },
  Booking: {
    label: 'Booking',
    bg: '#fef3c7',
    text: '#b45309',
    border: '#fde68a',
    icon: 'fa-calendar-check-o',
    countBadge: '#f59e0b',
  },
  DP: {
    label: 'DP (Telah Masuk)',
    bg: '#f3e8ff',
    text: '#7e22ce',
    border: '#e9d5ff',
    icon: 'fa-money',
    countBadge: '#a855f7',
  },
  Lunas: {
    label: 'Lunas',
    bg: '#dcfce7',
    text: '#15803d',
    border: '#bbf7d0',
    icon: 'fa-check-circle',
    countBadge: '#22c55e',
  },
  Selesai: {
    label: 'Selesai',
    bg: '#f1f5f9',
    text: '#334155',
    border: '#cbd5e1',
    icon: 'fa-flag-checkered',
    countBadge: '#64748b',
  },
  Cancelled: {
    label: 'Cancelled',
    bg: '#fee2e2',
    text: '#b91c1c',
    border: '#fecaca',
    icon: 'fa-ban',
    countBadge: '#ef4444',
  },
};

type ViewMode = 'table' | 'kanban' | 'schedule' | 'finance' | 'fleets';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // View switch: table, kanban, schedule, finance, fleets
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [packageFilter, setPackageFilter] = useState<string>('ALL');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Modals state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states for Edit / Create
  const [formData, setFormData] = useState<Partial<Booking>>({});

  // 1. Fetch bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/bookings');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setBookings(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 2. Metrics calculation
  const metrics = useMemo(() => {
    const total = bookings.length;
    const newInquiry = bookings.filter((b) => b.status === 'New Inquiry').length;
    const bookingAktif = bookings.filter((b) => b.status === 'Booking').length;
    const dp = bookings.filter((b) => b.status === 'DP').length;
    const lunas = bookings.filter((b) => b.status === 'Lunas').length;
    const selesai = bookings.filter((b) => b.status === 'Selesai').length;

    // Financial estimations (avg Rp 1.500.000 / pax for demo calculation)
    const activePax = bookings
      .filter((b) => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (b.participants || 1), 0);
    const estimatedTurnover = activePax * 1650000;
    const dpCollected = (dp + lunas + selesai) * 1250000;
    const pendingSettlement = estimatedTurnover - dpCollected;

    return {
      total,
      newInquiry,
      bookingAktif,
      dp,
      lunas,
      selesai,
      activePax,
      estimatedTurnover,
      dpCollected,
      pendingSettlement,
    };
  }, [bookings]);

  // 3. Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        b.booking_number.toLowerCase().includes(query) ||
        b.customer_name.toLowerCase().includes(query) ||
        b.whatsapp.includes(query) ||
        (b.email && b.email.toLowerCase().includes(query));

      const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
      const matchPackage = packageFilter === 'ALL' || b.package_name === packageFilter;
      const matchDate = !dateFilter || b.travel_date === dateFilter;

      return matchSearch && matchStatus && matchPackage && matchDate;
    });
  }, [bookings, searchQuery, statusFilter, packageFilter, dateFilter]);

  // 4. Update Status handler
  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
        );
        if (selectedBooking && selectedBooking.id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // 5. Delete handler
  const handleDelete = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        setDeleteConfirmId(null);
        if (selectedBooking && selectedBooking.id === bookingId) {
          setIsDetailOpen(false);
          setSelectedBooking(null);
        }
      }
    } catch (err) {
      console.error('Error deleting booking:', err);
    }
  };

  // 6. Save Edit / New Booking
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.whatsapp || !formData.travel_date) {
      alert('Nama, WhatsApp, dan Tanggal Trip wajib diisi!');
      return;
    }

    if (isEditOpen && selectedBooking) {
      try {
        const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setBookings((prev) =>
            prev.map((b) => (b.id === selectedBooking.id ? json.data : b))
          );
          setSelectedBooking(json.data);
          setIsEditOpen(false);
        }
      } catch (err) {
        console.error('Error saving edits:', err);
      }
    } else if (isNewBookingOpen) {
      try {
        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setBookings((prev) => [json.data, ...prev]);
          setIsNewBookingOpen(false);
        }
      } catch (err) {
        console.error('Error creating new booking:', err);
      }
    }
  };

  // 7. Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 8. Export to CSV file
  const handleExportCSV = () => {
    if (bookings.length === 0) {
      alert('Tidak ada data untuk diexport.');
      return;
    }

    const headers = [
      'No. Booking',
      'Nama Customer',
      'WhatsApp',
      'Email',
      'Paket Wisata',
      'Tanggal Trip',
      'Peserta',
      'Lokasi Pickup',
      'Transportasi',
      'Status',
      'Catatan',
      'Waktu Booking',
    ];

    const rows = filteredBookings.map((b) => [
      `"${b.booking_number}"`,
      `"${b.customer_name}"`,
      `"${b.whatsapp}"`,
      `"${b.email || ''}"`,
      `"${b.package_name}"`,
      `"${b.travel_date}"`,
      b.participants,
      `"${b.pickup_location}"`,
      `"${b.transportation}"`,
      `"${b.status}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`,
      `"${b.created_at}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bookings_lombok_travelers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 9. Smart WhatsApp messaging templates
  const getSmartWaUrl = (b: Booking, type: 'confirm' | 'voucher' | 'reminder' | 'review') => {
    const cleanPhone = b.whatsapp.replace(/\D/g, '');
    const phone = cleanPhone.startsWith('0')
      ? `62${cleanPhone.slice(1)}`
      : cleanPhone.startsWith('62')
      ? cleanPhone
      : `62${cleanPhone}`;

    let text = '';
    if (type === 'confirm') {
      text = `Halo Kak ${b.customer_name},\n\nTerima kasih telah mengajukan reservasi di Lombok_Travelers!\n\n📋 *Rincian Booking:*\n- No. Booking: ${b.booking_number}\n- Paket: ${b.package_name}\n- Tanggal Trip: ${b.travel_date}\n- Peserta: ${b.participants} Orang\n- Penjemputan: ${b.pickup_location}\n\nJadwal armada dan pemandu lokal Tetebatu kami *TERSEDIA* pada tanggal tersebut. Untuk mengunci jadwal, silakan melakukan pembayaran DP 30%.\n\nApakah ada pertanyaan tambahan mengenai itinerary? Terima kasih!`;
    } else if (type === 'voucher') {
      text = `Halo Kak ${b.customer_name},\n\nBerikut konfirmasi E-Voucher resmi Lombok_Travelers untuk perjalanan Anda:\n\n🎫 *No. Voucher:* ${b.booking_number}\n📍 *Paket:* ${b.package_name}\n📅 *Tanggal Keberangkatan:* ${b.travel_date}\n🚐 *Armada:* ${b.transportation}\n📍 *Titik Temu:* ${b.pickup_location}\n\nDriver kami akan standby 15 menit sebelum jadwal penjemputan. Sampai jumpa di Lombok!`;
    } else if (type === 'reminder') {
      text = `Halo Kak ${b.customer_name}!\n\nPengingat penjemputan H-1 liburan Lombok besok (${b.travel_date}). Driver lokal kami akan menjemput Anda di *${b.pickup_location}*.\n\nMohon pastikan nomor HP aktif. Jika butuh bantuan darurat, hotline kami standby di 0831-1711-0638. Selamat beristirahat!`;
    } else if (type === 'review') {
      text = `Halo Kak ${b.customer_name},\n\nTerima kasih banyak telah mempercayakan liburan di Lombok bersama keluarga besar Lombok_Travelers Tetebatu!\n\nSemoga perjalanannya sangat berkesan. Jika berkenan, mohon bantuan memberikan ulasan bintang 5 dan pengalaman Anda bersama supir & guide kami di Google Maps. Sangat berarti bagi pemandu lokal kami! Terima kasih.`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div>
      {/* ========================================================
          1. HEADER & COMMAND BAR
          ======================================================== */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Operasional & Reservasi Tamu
            </h1>
            <span
              style={{
                background: '#e0f2fe',
                color: '#0369a1',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              {filteredBookings.length} Data
            </span>
          </div>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: '4px 0 0 0' }}>
            Tetebatu Basecamp • Pantau alur reservasi tamu, jadwal penjemputan bandara, dan pencatatan pembayaran DP.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleExportCSV}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '9px 14px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            <i className="fa fa-file-excel-o" style={{ color: '#16a34a' }}></i> Export Excel / CSV
          </button>

          <button
            type="button"
            onClick={fetchBookings}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '9px 12px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title="Refresh Data"
          >
            <i className={`fa fa-refresh ${loading ? 'fa-spin' : ''}`}></i>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({
                customer_name: '',
                whatsapp: '',
                email: '',
                package_name: packagesData[0]?.title || 'Paket Lombok 3 Hari 2 Malam',
                package_id: packagesData[0]?.slug || 'paket-lombok-3-hari-2-malam',
                travel_date: new Date().toISOString().split('T')[0],
                participants: 2,
                pickup_location: 'Bandara Internasional Lombok (BIL)',
                transportation: 'Innova Reborn (Private AC)',
                notes: '',
                status: 'New Inquiry',
              });
              setIsNewBookingOpen(true);
            }}
            style={{
              backgroundColor: '#185a38',
              border: 'none',
              borderRadius: '8px',
              padding: '9px 16px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(24, 90, 56, 0.3)',
            }}
          >
            <i className="fa fa-plus"></i> Tambah Booking Baru
          </button>
        </div>
      </div>

      {/* ========================================================
          2. VIEW SWITCHER TABS (Table, Kanban, Schedule, Finance, Fleets)
          ======================================================== */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          borderBottom: '2px solid #e2e8f0',
          marginBottom: '20px',
          overflowX: 'auto',
          paddingBottom: '2px',
        }}
      >
        <button
          type="button"
          onClick={() => setViewMode('table')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: viewMode === 'table' ? '3px solid #185a38' : '3px solid transparent',
            color: viewMode === 'table' ? '#185a38' : '#64748b',
            fontWeight: viewMode === 'table' ? 800 : 600,
            fontSize: '14px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          <i className="fa fa-table"></i> Tabel Booking
        </button>

        <button
          type="button"
          onClick={() => setViewMode('kanban')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: viewMode === 'kanban' ? '3px solid #185a38' : '3px solid transparent',
            color: viewMode === 'kanban' ? '#185a38' : '#64748b',
            fontWeight: viewMode === 'kanban' ? 800 : 600,
            fontSize: '14px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          <i className="fa fa-columns"></i> Pipeline Kanban
          <span
            style={{
              background: '#e2e8f0',
              color: '#334155',
              fontSize: '11px',
              padding: '1px 6px',
              borderRadius: '999px',
            }}
          >
            {bookings.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('schedule')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: viewMode === 'schedule' ? '3px solid #185a38' : '3px solid transparent',
            color: viewMode === 'schedule' ? '#185a38' : '#64748b',
            fontWeight: viewMode === 'schedule' ? 800 : 600,
            fontSize: '14px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          <i className="fa fa-calendar"></i> Jadwal Keberangkatan Trip
        </button>

        <button
          type="button"
          onClick={() => setViewMode('finance')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: viewMode === 'finance' ? '3px solid #185a38' : '3px solid transparent',
            color: viewMode === 'finance' ? '#185a38' : '#64748b',
            fontWeight: viewMode === 'finance' ? 800 : 600,
            fontSize: '14px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          <i className="fa fa-money"></i> Ringkasan Omset & DP
        </button>

        <button
          type="button"
          onClick={() => setViewMode('fleets')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: viewMode === 'fleets' ? '3px solid #185a38' : '3px solid transparent',
            color: viewMode === 'fleets' ? '#185a38' : '#64748b',
            fontWeight: viewMode === 'fleets' ? 800 : 600,
            fontSize: '14px',
            padding: '10px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
          }}
        >
          <i className="fa fa-car"></i> Status Armada & Sopir
        </button>
      </div>

      {/* ========================================================
          3. METRICS CARDS (Top KPI Summary)
          ======================================================== */}
      <div
        className="admin-booking-kpi-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
          marginBottom: '22px',
        }}
      >
        <div
          onClick={() => setStatusFilter('ALL')}
          style={{
            backgroundColor: '#ffffff',
            padding: '14px 16px',
            borderRadius: '10px',
            border: statusFilter === 'ALL' ? '2px solid #002366' : '1px solid #e2e8f0',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
              Total Reservasi
            </span>
            <i className="fa fa-folder-open-o" style={{ color: '#002366' }}></i>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>{metrics.total}</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>{metrics.activePax} Total Peserta</span>
        </div>

        <div
          onClick={() => setStatusFilter('New Inquiry')}
          style={{
            backgroundColor: '#ffffff',
            padding: '14px 16px',
            borderRadius: '10px',
            border: statusFilter === 'New Inquiry' ? '2px solid #2563eb' : '1px solid #e2e8f0',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase' }}>
              New Inquiry
            </span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }}></span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#1d4ed8' }}>{metrics.newInquiry}</div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Perlu difollow-up</span>
        </div>

        <div
          onClick={() => setStatusFilter('Booking')}
          style={{
            backgroundColor: '#ffffff',
            padding: '14px 16px',
            borderRadius: '10px',
            border: statusFilter === 'Booking' ? '2px solid #d97706' : '1px solid #e2e8f0',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
              Booking Aktif
            </span>
            <i className="fa fa-calendar" style={{ color: '#d97706' }}></i>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#b45309' }}>{metrics.bookingAktif}</div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Menunggu DP</span>
        </div>

        <div
          onClick={() => setStatusFilter('DP')}
          style={{
            backgroundColor: '#ffffff',
            padding: '14px 16px',
            borderRadius: '10px',
            border: statusFilter === 'DP' ? '2px solid #9333ea' : '1px solid #e2e8f0',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#7e22ce', textTransform: 'uppercase' }}>
              DP Masuk
            </span>
            <i className="fa fa-credit-card" style={{ color: '#9333ea' }}></i>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#7e22ce' }}>{metrics.dp}</div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Jadwal armada siap</span>
        </div>

        <div
          onClick={() => setStatusFilter('Lunas')}
          style={{
            backgroundColor: '#ffffff',
            padding: '14px 16px',
            borderRadius: '10px',
            border: statusFilter === 'Lunas' ? '2px solid #16a34a' : '1px solid #e2e8f0',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#15803d', textTransform: 'uppercase' }}>
              Lunas
            </span>
            <i className="fa fa-check-circle" style={{ color: '#16a34a' }}></i>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#15803d' }}>{metrics.lunas}</div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Pembayaran 100%</span>
        </div>

        <div
          onClick={() => setStatusFilter('Selesai')}
          style={{
            backgroundColor: '#ffffff',
            padding: '14px 16px',
            borderRadius: '10px',
            border: statusFilter === 'Selesai' ? '2px solid #475569' : '1px solid #e2e8f0',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
              Selesai
            </span>
            <i className="fa fa-flag-checkered" style={{ color: '#475569' }}></i>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#334155' }}>{metrics.selesai}</div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Trip sukses terlaksana</span>
        </div>
      </div>

      {/* ========================================================
          4. FILTER & SEARCH CONTROLS (Common to Table & Kanban)
          ======================================================== */}
      {(viewMode === 'table' || viewMode === 'kanban') && (
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '16px 18px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              alignItems: 'end',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Pencarian Cepat
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Cari nama, no. booking, atau nomor HP..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 32px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <i className="fa fa-search" style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }}></i>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Filter Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              >
                <option value="ALL">Semua Status ({bookings.length})</option>
                <option value="New Inquiry">New Inquiry</option>
                <option value="Booking">Booking</option>
                <option value="DP">DP</option>
                <option value="Lunas">Lunas</option>
                <option value="Selesai">Selesai</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Filter Paket Wisata
              </label>
              <select
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              >
                <option value="ALL">Semua Paket</option>
                {packagesData.map((p) => (
                  <option key={p.slug} value={p.title}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                Filter Tanggal Keberangkatan
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 1: TABEL LENGKAP (TABLE VIEW)
          ======================================================== */}
      {viewMode === 'table' && (
        <div>
          {/* DESKTOP TABLE VIEW (>= 768px) */}
          <div
            className="booking-desktop-table"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '12px 14px', fontWeight: 700 }}>No. Booking</th>
                    <th style={{ padding: '12px 14px', fontWeight: 700 }}>Nama Tamu</th>
                    <th style={{ padding: '12px 14px', fontWeight: 700 }}>WhatsApp</th>
                    <th style={{ padding: '12px 14px', fontWeight: 700 }}>Paket Wisata</th>
                    <th style={{ padding: '12px 14px', fontWeight: 700 }}>Tanggal Trip</th>
                    <th style={{ padding: '12px 14px', fontWeight: 700, textAlign: 'center' }}>Pax</th>
                    <th style={{ padding: '12px 14px', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '12px 14px', fontWeight: 700, textAlign: 'center' }}>Aksi Cepat</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                        <i className="fa fa-inbox" style={{ fontSize: '30px', marginBottom: '8px', display: 'block' }}></i>
                        Tidak ada booking yang cocok dengan filter ini.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => {
                      const statusConf = STATUS_CONFIG[b.status] || STATUS_CONFIG['New Inquiry'];

                      return (
                        <tr
                          key={b.id}
                          style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <strong style={{ color: '#002366', fontFamily: 'monospace', fontSize: '13px' }}>
                                {b.booking_number}
                              </strong>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(b.booking_number)}
                                title="Salin No. Booking"
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: copiedId === b.booking_number ? '#16a34a' : '#94a3b8',
                                  cursor: 'pointer',
                                }}
                              >
                                <i className={copiedId === b.booking_number ? 'fa fa-check' : 'fa fa-clone'}></i>
                              </button>
                            </div>
                          </td>

                          <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0f172a' }}>
                            {b.customer_name}
                          </td>

                          <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                            <a
                              href={getSmartWaUrl(b, 'confirm')}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#15803d', fontWeight: 600, textDecoration: 'none' }}
                            >
                              <i className="fa fa-whatsapp"></i> {b.whatsapp}
                            </a>
                          </td>

                          <td style={{ padding: '12px 14px', maxWidth: '240px' }}>
                            <span title={b.package_name} style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {b.package_name}
                            </span>
                          </td>

                          <td style={{ padding: '12px 14px', whiteSpace: 'nowrap', color: '#475569' }}>
                            {b.travel_date}
                          </td>

                          <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700 }}>
                            {b.participants}
                          </td>

                          <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                            <select
                              value={b.status}
                              onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                              style={{
                                backgroundColor: statusConf.bg,
                                color: statusConf.text,
                                border: `1px solid ${statusConf.border}`,
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '11.5px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                outline: 'none',
                              }}
                            >
                              <option value="New Inquiry">New Inquiry</option>
                              <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="DP">DP</option>
                              <option value="Lunas">Lunas</option>
                              <option value="Selesai">Selesai</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td style={{ padding: '12px 14px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'inline-flex', gap: '6px' }}>
                              {/* Detail */}
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedBooking(b);
                                  setIsDetailOpen(true);
                                }}
                                title="Lihat Detail & Template WA"
                                style={{
                                  background: '#f1f5f9',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                }}
                              >
                                <i className="fa fa-eye"></i>
                              </button>

                              {/* Voucher */}
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedBooking(b);
                                  setIsVoucherOpen(true);
                                }}
                                title="Cetak E-Voucher"
                                style={{
                                  background: '#fef3c7',
                                  border: '1px solid #fde68a',
                                  color: '#b45309',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                }}
                              >
                                <i className="fa fa-print"></i>
                              </button>

                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedBooking(b);
                                  setFormData(b);
                                  setIsEditOpen(true);
                                }}
                                title="Edit Booking"
                                style={{
                                  background: '#eff6ff',
                                  border: '1px solid #bfdbfe',
                                  color: '#1d4ed8',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                }}
                              >
                                <i className="fa fa-pencil"></i>
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(b.id)}
                                title="Hapus"
                                style={{
                                  background: '#fee2e2',
                                  border: '1px solid #fecaca',
                                  color: '#dc2626',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                }}
                              >
                                <i className="fa fa-trash-o"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE RESPONSIVE CARDS VIEW (< 768px) */}
          <div className="booking-mobile-cards">
            {filteredBookings.length === 0 ? (
              <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '36px 16px', textAlign: 'center', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
                <i className="fa fa-inbox" style={{ fontSize: '32px', marginBottom: '8px', display: 'block' }}></i>
                Tidak ada booking yang cocok dengan filter ini.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredBookings.map((b) => {
                  const statusConf = STATUS_CONFIG[b.status] || STATUS_CONFIG['New Inquiry'];

                  return (
                    <div
                      key={b.id}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        padding: '14px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                      }}
                    >
                      {/* Card Top: Booking code + Status select */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: '#002366', fontFamily: 'monospace', fontSize: '13px' }}>
                            {b.booking_number}
                          </strong>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(b.booking_number)}
                            title="Salin No. Booking"
                            style={{ background: 'none', border: 'none', color: copiedId === b.booking_number ? '#16a34a' : '#94a3b8', cursor: 'pointer', padding: '2px' }}
                          >
                            <i className={copiedId === b.booking_number ? 'fa fa-check' : 'fa fa-clone'}></i>
                          </button>
                        </div>

                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                          style={{
                            backgroundColor: statusConf.bg,
                            color: statusConf.text,
                            border: `1px solid ${statusConf.border}`,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 700,
                            outline: 'none',
                          }}
                        >
                          <option value="New Inquiry">New Inquiry</option>
                          <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="DP">DP</option>
                          <option value="Lunas">Lunas</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      {/* Guest & Trip Info */}
                      <div style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                            {b.customer_name}
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '2px 6px', borderRadius: '4px' }}>
                            {b.participants} Pax
                          </span>
                        </div>

                        <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#185a38', marginTop: '3px' }}>
                          {b.package_name}
                        </div>

                        <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          <span><i className="fa fa-calendar" style={{ color: '#16a34a' }}></i> {b.travel_date}</span>
                          <span><i className="fa fa-map-marker" style={{ color: '#dc2626' }}></i> {b.pickup_location}</span>
                        </div>
                      </div>

                      {/* Action Buttons Toolbar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap' }}>
                        <a
                          href={getSmartWaUrl(b, 'confirm')}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: '#dcfce7',
                            color: '#15803d',
                            border: '1px solid #bbf7d0',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <i className="fa fa-whatsapp"></i> Chat WA
                        </a>

                        <button
                          type="button"
                          onClick={() => { setSelectedBooking(b); setIsDetailOpen(true); }}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            color: '#334155',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <i className="fa fa-eye"></i> Detail
                        </button>

                        <button
                          type="button"
                          onClick={() => { setSelectedBooking(b); setIsVoucherOpen(true); }}
                          style={{
                            background: '#fef3c7',
                            border: '1px solid #fde68a',
                            color: '#b45309',
                            borderRadius: '6px',
                            padding: '6px 9px',
                            fontSize: '11.5px',
                            cursor: 'pointer',
                          }}
                          title="Cetak E-Voucher"
                        >
                          <i className="fa fa-print"></i>
                        </button>

                        <button
                          type="button"
                          onClick={() => { setSelectedBooking(b); setFormData(b); setIsEditOpen(true); }}
                          style={{
                            background: '#eff6ff',
                            border: '1px solid #bfdbfe',
                            color: '#1d4ed8',
                            borderRadius: '6px',
                            padding: '6px 9px',
                            fontSize: '11.5px',
                            cursor: 'pointer',
                          }}
                          title="Edit"
                        >
                          <i className="fa fa-pencil"></i>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(b.id)}
                          style={{
                            background: '#fee2e2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            borderRadius: '6px',
                            padding: '6px 9px',
                            fontSize: '11.5px',
                            cursor: 'pointer',
                            marginLeft: 'auto',
                          }}
                          title="Hapus"
                        >
                          <i className="fa fa-trash-o"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 2: PIPELINE KANBAN (KANBAN BOARD VIEW)
          ======================================================== */}
      {viewMode === 'kanban' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '14px',
            alignItems: 'start',
            overflowX: 'auto',
          }}
        >
          {(['New Inquiry', 'Booking', 'DP', 'Lunas', 'Selesai'] as BookingStatus[]).map((stage) => {
            const stageBookings = bookings.filter((b) => b.status === stage);
            const conf = STATUS_CONFIG[stage];

            return (
              <div
                key={stage}
                style={{
                  backgroundColor: '#f1f5f9',
                  borderRadius: '10px',
                  padding: '14px',
                  border: '1px solid #e2e8f0',
                  minHeight: '400px',
                }}
              >
                {/* Stage Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: conf.countBadge }}></span>
                    <strong style={{ fontSize: '13px', color: '#1e293b' }}>{stage}</strong>
                  </div>
                  <span
                    style={{
                      background: conf.bg,
                      color: conf.text,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 800,
                    }}
                  >
                    {stageBookings.length}
                  </span>
                </div>

                {/* Cards in Stage */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stageBookings.length === 0 ? (
                    <div style={{ padding: '20px 10px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
                      Kosong di tahap ini
                    </div>
                  ) : (
                    stageBookings.map((b) => (
                      <div
                        key={b.id}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          padding: '12px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, color: '#002366', fontFamily: 'monospace' }}>
                            {b.booking_number}
                          </span>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>{b.participants} Pax</span>
                        </div>
                        <strong style={{ fontSize: '13px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                          {b.customer_name}
                        </strong>
                        <div style={{ fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
                          {b.package_name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                          <i className="fa fa-calendar-o"></i> {b.travel_date}
                        </div>

                        {/* Quick Kanban Action */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedBooking(b);
                              setIsDetailOpen(true);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#2563eb',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              padding: 0,
                            }}
                          >
                            Buka Detail ›
                          </button>

                          {stage === 'New Inquiry' && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(b.id, 'Booking')}
                              style={{ background: '#fef3c7', color: '#b45309', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Konfirmasi ›
                            </button>
                          )}

                          {stage === 'Booking' && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(b.id, 'DP')}
                              style={{ background: '#f3e8ff', color: '#7e22ce', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Terima DP ›
                            </button>
                          )}

                          {stage === 'DP' && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(b.id, 'Lunas')}
                              style={{ background: '#dcfce7', color: '#15803d', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Lunaskan ›
                            </button>
                          )}

                          {stage === 'Lunas' && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(b.id, 'Selesai')}
                              style={{ background: '#f1f5f9', color: '#334155', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Trip Selesai ✓
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================
          VIEW 3: JADWAL KEBERANGKATAN (SCHEDULE TIMELINE)
          ======================================================== */}
      {viewMode === 'schedule' && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 4px 0' }}>Jadwal & Penjemputan Trip Wisata</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Susunan keberangkatan rombongan tamu terurut berdasarkan tanggal perjalanan.
              </p>
            </div>
            <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
              Zona Waktu: WITA (Lombok)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[...bookings]
              .sort((a, b) => new Date(a.travel_date).getTime() - new Date(b.travel_date).getTime())
              .map((b) => (
                <div
                  key={b.id}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: b.status === 'Cancelled' ? '#fef2f2' : '#f8fafc',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '8px',
                        backgroundColor: '#185a38',
                        color: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '12px',
                      }}
                    >
                      <span style={{ fontSize: '18px', lineHeight: 1 }}>{b.travel_date.split('-')[2]}</span>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>
                        {new Date(b.travel_date).toLocaleDateString('id-ID', { month: 'short' })}
                      </span>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <strong style={{ fontSize: '15px', color: '#0f172a' }}>{b.customer_name}</strong>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>({b.participants} Peserta)</span>
                        <span
                          style={{
                            backgroundColor: STATUS_CONFIG[b.status].bg,
                            color: STATUS_CONFIG[b.status].text,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 700,
                          }}
                        >
                          {b.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#002366', fontWeight: 600 }}>{b.package_name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                        <i className="fa fa-map-marker" style={{ color: '#16a34a' }}></i> Pickup: {b.pickup_location} •{' '}
                        <i className="fa fa-car"></i> {b.transportation}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      href={getSmartWaUrl(b, 'reminder')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-detail"
                      style={{
                        background: '#dcfce7',
                        color: '#15803d',
                        border: '1px solid #bbf7d0',
                        fontSize: '12px',
                        padding: '6px 12px',
                      }}
                    >
                      <i className="fa fa-whatsapp"></i> WA Reminder H-1
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBooking(b);
                        setIsDetailOpen(true);
                      }}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Detail
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 4: RINGKASAN OMSET & KEUANGAN (FINANCE VIEW)
          ======================================================== */}
      {viewMode === 'finance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Finance Overview Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                Estimasi Omset Total (Gross)
              </span>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#002366', marginTop: '6px' }}>
                Rp {metrics.estimatedTurnover.toLocaleString('id-ID')}
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>
                Berdasarkan {metrics.activePax} pax terdaftar dalam paket wisata.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase' }}>
                DP / Kas Terkumpul (Received)
              </span>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#15803d', marginTop: '6px' }}>
                Rp {metrics.dpCollected.toLocaleString('id-ID')}
              </div>
              <p style={{ fontSize: '12px', color: '#16a34a', margin: '4px 0 0 0' }}>
                Sudah mengamankan biaya bensin, boat snorkeling & driver.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #fde68a' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>
                Pelunasan di Lokasi (Pending)
              </span>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#b45309', marginTop: '6px' }}>
                Rp {metrics.pendingSettlement.toLocaleString('id-ID')}
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>
                Diterima secara tunai / transfer saat penjemputan tamu di Lombok.
              </p>
            </div>
          </div>

          {/* Package Popularity Breakdown */}
          <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 800 }}>Paket Wisata Paling Diminati Tamu</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {packagesData.map((pkg) => {
                const count = bookings.filter((b) => b.package_id === pkg.slug || b.package_name === pkg.title).length;
                const pct = bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0;

                return (
                  <div key={pkg.slug}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                      <strong>{pkg.title}</strong>
                      <span>{count} Reservasi ({pct}%)</span>
                    </div>
                    <div style={{ height: '8px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: '#185a38' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW 5: STATUS ARMADA & SOPIR LOKAL (FLEETS VIEW)
          ======================================================== */}
      {viewMode === 'fleets' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            { name: 'All New Avanza (Unit #01)', plate: 'DR 1422 AX', driver: 'Pak Johari (Tetebatu)', status: 'Siap Operasi', pax: '5 Pax' },
            { name: 'Innova Reborn (Unit #02)', plate: 'DR 1889 BZ', driver: 'Mas Dedi (Sikur)', status: 'On Trip (Gili Trawangan)', pax: '7 Pax' },
            { name: 'Innova Reborn (Unit #03)', plate: 'DR 1902 CL', driver: 'Pak Herman (Tetebatu)', status: 'Siap Operasi', pax: '7 Pax' },
            { name: 'Toyota HiAce Commuter (Unit #04)', plate: 'DR 7120 DK', driver: 'Bang Fikri (Mataram)', status: 'Booked Besok (Sembalun)', pax: '14 Pax' },
            { name: 'Toyota HiAce Premio Luxury (Unit #05)', plate: 'DR 7788 VIP', driver: 'Pak Rudi (Tetebatu)', status: 'Siap Operasi VIP', pax: '10 Pax' },
            { name: 'Toyota Fortuner VRZ (Unit #06)', plate: 'DR 1111 EX', driver: 'Mas Ridwan (Senggigi)', status: 'Siap Operasi', pax: '6 Pax' },
          ].map((car, idx) => (
            <div key={idx} style={{ background: '#ffffff', borderRadius: '10px', padding: '18px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px' }}>
                  {car.plate}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: car.status.includes('Siap') ? '#15803d' : '#b45309',
                    background: car.status.includes('Siap') ? '#dcfce7' : '#fef3c7',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {car.status}
                </span>
              </div>
              <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block' }}>{car.name}</strong>
              <div style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>
                <i className="fa fa-user"></i> Driver: <strong>{car.driver}</strong>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                Kapasitas Maksimal: {car.pax}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================
          MODAL: DETAIL BOOKING + 4 SMART WHATSAPP TEMPLATES
          ======================================================== */}
      {isDetailOpen && selectedBooking && (
        <div
          className="modal-overlay active"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDetailOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '660px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              overflow: 'hidden',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #091e13 0%, #185a38 100%)',
                padding: '18px 22px',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#4ade80' }}>
                  Detail & Tindak Lanjut Reservasi
                </span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                  {selectedBooking.booking_number}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px',
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px 24px', overflowY: 'auto' }}>
              {/* Quick Status Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  marginBottom: '18px',
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Status Saat Ini:</span>
                  <div style={{ marginTop: '2px' }}>
                    <span
                      style={{
                        backgroundColor: STATUS_CONFIG[selectedBooking.status].bg,
                        color: STATUS_CONFIG[selectedBooking.status].text,
                        border: `1px solid ${STATUS_CONFIG[selectedBooking.status].border}`,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 800,
                      }}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '2px' }}>
                    Ubah Status:
                  </label>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value as BookingStatus)}
                    style={{
                      padding: '5px 8px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      outline: 'none',
                    }}
                  >
                    <option value="New Inquiry">New Inquiry</option>
                    <option value="Booking">Booking</option>
                    <option value="DP">DP</option>
                    <option value="Lunas">Lunas</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Data Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', fontSize: '13px' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>Data Tamu:</strong>
                  <div>Nama: <strong>{selectedBooking.customer_name}</strong></div>
                  <div>WhatsApp: <strong>{selectedBooking.whatsapp}</strong></div>
                  <div>Email: {selectedBooking.email || '-'}</div>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', fontSize: '13px' }}>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>Data Perjalanan:</strong>
                  <div>Paket: <strong>{selectedBooking.package_name}</strong></div>
                  <div>Tanggal: <strong>{selectedBooking.travel_date}</strong> ({selectedBooking.participants} Pax)</div>
                  <div>Pickup: {selectedBooking.pickup_location}</div>
                  <div>Armada: {selectedBooking.transportation}</div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', marginBottom: '18px' }}>
                  <strong style={{ color: '#854d0e' }}>Catatan Khusus Tamu:</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#713f12' }}>{selectedBooking.notes}</p>
                </div>
              )}

              {/* SMART WHATSAPP TEMPLATES (4 ACTION BUTTONS) */}
              <div>
                <strong style={{ fontSize: '13px', color: '#0f172a', display: 'block', marginBottom: '8px' }}>
                  Kirim Pesan WhatsApp Instan ke Tamu:
                </strong>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <a
                    href={getSmartWaUrl(selectedBooking, 'confirm')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      color: '#1d4ed8',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <i className="fa fa-whatsapp" style={{ color: '#25d366' }}></i> 1. Konfirmasi & Info DP
                  </a>

                  <a
                    href={getSmartWaUrl(selectedBooking, 'voucher')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#f3e8ff',
                      border: '1px solid #e9d5ff',
                      color: '#7e22ce',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <i className="fa fa-ticket"></i> 2. Kirim Format E-Voucher
                  </a>

                  <a
                    href={getSmartWaUrl(selectedBooking, 'reminder')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#fef3c7',
                      border: '1px solid #fde68a',
                      color: '#b45309',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <i className="fa fa-clock-o"></i> 3. Pengingat H-1 Penjemputan
                  </a>

                  <a
                    href={getSmartWaUrl(selectedBooking, 'review')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#dcfce7',
                      border: '1px solid #bbf7d0',
                      color: '#15803d',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      gap: '6px',
                    }}
                  >
                    <i className="fa fa-star" style={{ color: '#f59e0b' }}></i> 4. Trip Selesai & Review
                  </a>
                </div>
              </div>

              {/* AUDIT LOG TRAIL (Security Requirement #11) */}
              {selectedBooking.audit_log && selectedBooking.audit_log.length > 0 && (
                <div style={{ marginTop: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
                  <strong style={{ fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <i className="fa fa-history"></i> Log Aktivitas & Audit Perubahan:
                  </strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', color: '#64748b' }}>
                    {selectedBooking.audit_log.map((log, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>
                          {new Date(log.timestamp).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                        <span style={{ fontWeight: 700, color: '#334155' }}>{log.action}</span>
                        <span>oleh</span>
                        <span style={{ fontWeight: 600, color: '#16a34a' }}>{log.actor}</span>
                        {log.details && <span style={{ color: '#64748b' }}>({log.details})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '14px 22px',
                backgroundColor: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsVoucherOpen(true);
                  }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fa fa-print"></i> Cetak E-Voucher Resmi
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData(selectedBooking);
                    setIsDetailOpen(false);
                    setIsEditOpen(true);
                  }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#2563eb',
                    cursor: 'pointer',
                  }}
                >
                  <i className="fa fa-pencil"></i> Edit Booking
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeleteConfirmId(selectedBooking.id);
                  }}
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#dc2626',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fa fa-trash"></i> Hapus
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                style={{
                  background: '#334155',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CETAK E-VOUCHER RESMI TRAVEL
          ======================================================== */}
      {isVoucherOpen && selectedBooking && (
        <div
          className="modal-overlay active"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsVoucherOpen(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              maxWidth: '680px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                background: '#f8fafc',
                padding: '12px 20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                Preview E-Voucher Perjalanan
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    background: '#185a38',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fa fa-print"></i> Cetak / Simpan PDF
                </button>
                <button
                  type="button"
                  onClick={() => setIsVoucherOpen(false)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>

            {/* Printable Voucher Paper */}
            <div id="official-voucher" style={{ padding: '28px', overflowY: 'auto', backgroundColor: '#ffffff', color: '#1e293b' }}>
              {/* Header Letterhead */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #185a38', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#185a38' }}>LOMBOK_TRAVELERS</h2>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    Local Travel Partner • Jl. Pariwisata Tetebatu, Sikur, Lombok Timur, NTB 83662
                  </span>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    Hotline WhatsApp: +62 831-1711-0638 • Web: lomboktravelers.reaksy.com
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                    Official Travel Voucher
                  </span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#002366', fontFamily: 'monospace' }}>
                    {selectedBooking.booking_number}
                  </div>
                  <span style={{ fontSize: '11px', background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    Status: {selectedBooking.status}
                  </span>
                </div>
              </div>

              {/* Voucher Main Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px', fontSize: '13px' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Identitas Tamu:
                  </strong>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{selectedBooking.customer_name}</div>
                  <div style={{ color: '#475569', marginTop: '2px' }}>WhatsApp: {selectedBooking.whatsapp}</div>
                  <div style={{ color: '#475569' }}>Email: {selectedBooking.email || '-'}</div>
                  <div style={{ marginTop: '6px' }}>Jumlah Rombongan: <strong>{selectedBooking.participants} Orang</strong></div>
                </div>

                <div>
                  <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Program Perjalanan:
                  </strong>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#002366' }}>{selectedBooking.package_name}</div>
                  <div style={{ marginTop: '2px' }}>Tanggal Mulai: <strong>{selectedBooking.travel_date}</strong></div>
                  <div>Penjemputan: <strong>{selectedBooking.pickup_location}</strong></div>
                  <div>Armada: <strong>{selectedBooking.transportation}</strong></div>
                </div>
              </div>

              {/* Inclusions Box */}
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px', fontSize: '12.5px' }}>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                  Fasilitas Termasuk dalam Voucher Ini:
                </strong>
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#475569', lineHeight: 1.6 }}>
                  <li>Transportasi mobil ber-AC + Bahan Bakar + Supir lokal asli Sasak</li>
                  <li>Tiket masuk semua destinasi wisata & parkir sesuai rute resmi</li>
                  <li>Perlengkapan snorkeling & private boat (jika termasuk program Gili)</li>
                  <li>Pendampingan tour & dokumentasi standar</li>
                </ul>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div style={{ marginBottom: '20px', fontSize: '12px', color: '#475569' }}>
                  <strong>Catatan Khusus:</strong> {selectedBooking.notes}
                </div>
              )}

              {/* Footer Stamp & Signature */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px dashed #cbd5e1', paddingTop: '16px' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Dicetak pada: {new Date().toLocaleDateString('id-ID')} • Harap tunjukkan voucher ini ke supir saat penjemputan.
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#185a38', marginBottom: '40px' }}>
                    Lombok_Travelers Management
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', borderTop: '1px solid #94a3b8', paddingTop: '4px' }}>
                    Tetebatu Basecamp Representative
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT / CREATE BOOKING
          ======================================================== */}
      {(isEditOpen || isNewBookingOpen) && (
        <div
          className="modal-overlay active"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsEditOpen(false);
              setIsNewBookingOpen(false);
            }
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              overflow: 'hidden',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                backgroundColor: '#185a38',
                color: '#ffffff',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
                {isEditOpen ? `Edit Data ${formData.booking_number}` : 'Tambah Booking Baru (Manual)'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                  setIsNewBookingOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveForm} style={{ padding: '20px', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Nama Tamu *</label>
                  <input
                    type="text"
                    value={formData.customer_name || ''}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Nomor WhatsApp *</label>
                  <input
                    type="text"
                    value={formData.whatsapp || ''}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Status</label>
                  <select
                    value={formData.status || 'New Inquiry'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as BookingStatus })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="New Inquiry">New Inquiry</option>
                    <option value="Booking">Booking</option>
                    <option value="DP">DP</option>
                    <option value="Lunas">Lunas</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Paket Wisata</label>
                <select
                  value={formData.package_name || ''}
                  onChange={(e) => {
                    const found = packagesData.find((p) => p.title === e.target.value);
                    setFormData({
                      ...formData,
                      package_name: e.target.value,
                      package_id: found ? found.slug : 'custom-trip',
                    });
                  }}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  {packagesData.map((pkg) => (
                    <option key={pkg.slug} value={pkg.title}>
                      {pkg.title}
                    </option>
                  ))}
                  <option value="Custom Itinerary Lombok">Custom Itinerary Lombok</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Tanggal Trip *</label>
                  <input
                    type="date"
                    value={formData.travel_date || ''}
                    onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Peserta *</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.participants || 1}
                    onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 1 })}
                    required
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Lokasi Pickup</label>
                <input
                  type="text"
                  value={formData.pickup_location || ''}
                  onChange={(e) => setFormData({ ...formData, pickup_location: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Armada Transportasi</label>
                <input
                  type="text"
                  value={formData.transportation || ''}
                  onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Status Reservasi</label>
                <select
                  value={formData.status || 'New Inquiry'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as BookingStatus })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value="New Inquiry">New Inquiry</option>
                  <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="DP">DP</option>
                  <option value="Lunas">Lunas</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Catatan</label>
                <textarea
                  rows={2}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setIsNewBookingOpen(false);
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#185a38',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: DELETE CONFIRMATION
          ======================================================== */}
      {deleteConfirmId && (
        <div
          className="modal-overlay active"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(3px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', fontSize: '20px' }}>
              <i className="fa fa-exclamation-triangle"></i>
            </div>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 800 }}>Hapus Booking?</h4>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748b' }}>Data reservasi ini akan dihapus permanen.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', cursor: 'pointer' }}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '7px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .booking-mobile-cards {
          display: none;
        }
        .booking-desktop-table {
          display: block;
        }

        @media (max-width: 768px) {
          .booking-mobile-cards {
            display: block !important;
          }
          .booking-desktop-table {
            display: none !important;
          }
          .admin-booking-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
        }

        @media (max-width: 480px) {
          .admin-booking-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
