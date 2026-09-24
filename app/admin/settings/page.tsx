'use client';

import { useState } from 'react';
import bookingsData from '@/data/bookings.json';

export default function AdminSettingsPage() {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [agencyName, setAgencyName] = useState('Lombok_Travelers');
  const [phone, setPhone] = useState('0831-1711-0638');
  const [address, setAddress] = useState('Jl. Pariwisata Tetebatu, Kec. Sikur, Kabupaten Lombok Timur, NTB 83662');
  const [nib, setNib] = useState('NIB: 1205240098712 (Biro Perjalanan Wisata Lokal)');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const downloadBackupJSON = () => {
    const jsonStr = JSON.stringify(bookingsData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `backup_database_lombok_travelers_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: '960px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px 0', color: '#0f172a' }}>
          Pengaturan Biro Travel & Rekening Pembayaran
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
          Kelola informasi resmi Tetebatu Basecamp, nomor rekening penerimaan DP, dan backup database.
        </p>
      </div>

      {savedSuccess && (
        <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', color: '#15803d', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
          <i className="fa fa-check-circle"></i> Pengaturan berhasil disimpan ke sistem.
        </div>
      )}

      {/* Grid Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Section 1: Profil Basecamp & Legalitas */}
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
            Profil Resmi Biro Travel
          </h2>

          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Nama Travel Partner</label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Nomor WhatsApp Hotline</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Alamat Kantor Basecamp</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Legalitas & Izin Pariwisata</label>
              <input
                type="text"
                value={nib}
                onChange={(e) => setNib(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: '#185a38',
                color: '#ffffff',
                border: 'none',
                padding: '9px 20px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Simpan Profil
            </button>
          </form>
        </div>

        {/* Section 2: Rekening Bank Pembayaran DP */}
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
            Rekening Pembayaran Uang Muka (DP)
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
            Nomor rekening resmi untuk dikirimkan ke calon tamu saat konfirmasi booking via WhatsApp.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '14px', color: '#002366' }}>Bank BCA</strong>
                <button
                  type="button"
                  onClick={() => copyToClipboard('0561188291', 'bca')}
                  style={{ background: 'none', border: 'none', color: copiedBank === 'bca' ? '#16a34a' : '#2563eb', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {copiedBank === 'bca' ? '✓ Tersalin' : 'Salin Rekening'}
                </button>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'monospace', color: '#0f172a' }}>056-1188-291</div>
              <span style={{ fontSize: '12px', color: '#64748b' }}>a.n. Lombok Travelers</span>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '14px', color: '#002366' }}>Bank Mandiri</strong>
                <button
                  type="button"
                  onClick={() => copyToClipboard('1610099887711', 'mandiri')}
                  style={{ background: 'none', border: 'none', color: copiedBank === 'mandiri' ? '#16a34a' : '#2563eb', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {copiedBank === 'mandiri' ? '✓ Tersalin' : 'Salin Rekening'}
                </button>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'monospace', color: '#0f172a' }}>161-00-9988-7711</div>
              <span style={{ fontSize: '12px', color: '#64748b' }}>a.n. Lombok Travelers</span>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '14px', color: '#002366' }}>Bank BRI</strong>
                <button
                  type="button"
                  onClick={() => copyToClipboard('472201019922531', 'bri')}
                  style={{ background: 'none', border: 'none', color: copiedBank === 'bri' ? '#16a34a' : '#2563eb', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {copiedBank === 'bri' ? '✓ Tersalin' : 'Salin Rekening'}
                </button>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'monospace', color: '#0f172a' }}>4722-01-019922-53-1</div>
              <span style={{ fontSize: '12px', color: '#64748b' }}>a.n. Ahmad (Owner)</span>
            </div>
          </div>
        </div>

        {/* Section 3: Backup Data */}
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
            Cadangan Data Reservasi (Backup)
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0' }}>
            Unduh seluruh riwayat booking dan nomor telepon tamu dalam format file JSON untuk arsip offline.
          </p>

          <button
            type="button"
            onClick={downloadBackupJSON}
            style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              padding: '9px 18px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <i className="fa fa-database"></i> Unduh Snapshot Database JSON
          </button>
        </div>
      </div>
    </div>
  );
}
