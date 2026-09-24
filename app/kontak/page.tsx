'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function KontakPage() {
  const { language } = useLanguage();

  const [nama, setNama] = useState('');
  const [wa, setWa] = useState('');
  const [layanan, setLayanan] = useState('Paket Wisata Lombok');
  const [tanggal, setTanggal] = useState('');
  const [pesan, setPesan] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Lombok_Travelers, saya ingin konsultasi:\n- Nama: ${nama}\n- WhatsApp: ${wa}\n- Layanan: ${layanan}\n- Tanggal Trip: ${tanggal || '-'}\n- Pesan: ${pesan || '-'}`;
    const url = `https://wa.me/6283117110638?text=${encodeURIComponent(text)}`;
    setSubmitted(true);
    window.open(url, '_blank');
  };

  return (
    <div className="multipage-wrapper">
      {/* PAGE HEADER */}
      <div className="page-header-banner">
        <div className="box1140">
          <nav className="breadcrumb-nav">
            <Link href="/">{language === 'en' ? 'Home' : 'Beranda'}</Link>
            <span>›</span>
            <strong>{language === 'en' ? 'Contact Us' : 'Kontak Kami'}</strong>
          </nav>
          <h1 className="page-header-title">
            {language === 'en'
              ? 'Contact Lombok_Travelers — Tetebatu Basecamp'
              : 'Hubungi Lombok_Travelers — Kantor & Layanan Pelanggan'}
          </h1>
          <p className="page-header-subtitle">
            {language === 'en'
              ? 'We are ready to assist your Lombok vacation planning. Chat with us on WhatsApp or visit our local office in Tetebatu, East Lombok.'
              : 'Kami siap membantu rencana liburan Anda di Lombok. Hubungi kami via WhatsApp atau kunjungi basecamp kami di Tetebatu, Lombok Timur.'}
          </p>
        </div>
      </div>

      <div className="box1140" style={{ padding: '40px 15px 80px 15px' }}>
        <div className="contact-layout-grid">
          
          {/* LEFT: INFO CARD */}
          <div className="contact-info-card">
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', marginBottom: '20px' }}>
              {language === 'en' ? 'Direct Information' : 'Informasi Kontak Resmi'}
            </h2>

            <div className="contact-item-row">
              <div className="contact-icon-box">
                <i className="fa fa-map-marker"></i>
              </div>
              <div>
                <strong>{language === 'en' ? 'Basecamp Office' : 'Alamat Basecamp Kantor'}</strong>
                <p style={{ margin: '4px 0 0 0', color: '#555', fontSize: '14px' }}>
                  Jl. Pariwisata Tetebatu, Kec. Sikur, Kabupaten Lombok Timur, Nusa Tenggara Barat 83662
                </p>
              </div>
            </div>

            <div className="contact-item-row">
              <div className="contact-icon-box">
                <i className="fa fa-whatsapp"></i>
              </div>
              <div>
                <strong>WhatsApp Hotline (24/7 Fast Response)</strong>
                <p style={{ margin: '4px 0 0 0', color: '#555', fontSize: '14px' }}>
                  <a href="https://wa.me/6283117110638" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    0831-1711-0638
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-item-row">
              <div className="contact-icon-box">
                <i className="fa fa-clock-o"></i>
              </div>
              <div>
                <strong>{language === 'en' ? 'Operating Hours' : 'Jam Operasional'}</strong>
                <p style={{ margin: '4px 0 0 0', color: '#555', fontSize: '14px' }}>
                  Senin – Minggu: 06:00 – 22:00 WITA<br />
                  <span style={{ fontSize: '12px', color: '#888' }}>*Emergency hotline 24 jam untuk tamu yang sedang dalam perjalanan.</span>
                </p>
              </div>
            </div>

            <div className="contact-item-row">
              <div className="contact-icon-box">
                <i className="fa fa-envelope-o"></i>
              </div>
              <div>
                <strong>Email</strong>
                <p style={{ margin: '4px 0 0 0', color: '#555', fontSize: '14px' }}>
                  info@lomboktravelers.com / booking@lomboktravelers.com
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Quick Card */}
            <div style={{ background: 'var(--primary-soft)', padding: '20px', borderRadius: '8px', marginTop: '24px', border: '1px solid rgba(24, 90, 56, 0.2)' }}>
              <h4 style={{ color: 'var(--primary-dark)', marginBottom: '8px' }}>
                <i className="fa fa-bolt"></i> {language === 'en' ? 'Instant WhatsApp Chat' : 'Respon Cepat WhatsApp'}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--dark-soft)', marginBottom: '14px' }}>
                {language === 'en'
                  ? 'Connect immediately with our local tour advisor for quick rate quotes and date availability.'
                  : 'Ingin tanya harga cepat atau cek ketersediaan driver dan armada untuk besok? Klik tombol di bawah ini:'}
              </p>
              <a
                href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20tanya%20info%20paket%20wisata."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sidebar-wa"
                style={{ textAlign: 'center', justifyContent: 'center' }}
              >
                <i className="fa fa-whatsapp"></i> Chat WhatsApp Sekarang
              </a>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE FORM */}
          <div className="contact-form-card">
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
              {language === 'en' ? 'Send an Inquiry' : 'Formulir Konsultasi Liburan'}
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
              {language === 'en'
                ? 'Fill in your details below and we will tailor the best quote for your trip.'
                : 'Isi rencana perjalanan Anda di bawah ini untuk mendapatkan penawaran spesial dan rekomendasi itinerary terbaik:'}
            </p>

            {submitted && (
              <div style={{ background: '#dcfce7', color: '#166534', padding: '14px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
                <i className="fa fa-check-circle"></i>{' '}
                {language === 'en'
                  ? 'Thank you! WhatsApp window has opened with your inquiry details.'
                  : 'Terima kasih! WhatsApp telah terbuka dengan rincian pesan Anda. Tim kami segera membalas.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="custom-form">
              <div className="form-group">
                <label className="form-label">
                  {language === 'en' ? 'Full Name *' : 'Nama Lengkap *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? 'e.g. John Doe' : 'Contoh: Budi Santoso'}
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    {language === 'en' ? 'WhatsApp Number *' : 'Nomor WhatsApp Aktif *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={wa}
                    onChange={(e) => setWa(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {language === 'en' ? 'Planned Travel Date' : 'Rencana Tanggal Trip'}
                  </label>
                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {language === 'en' ? 'Interested Service' : 'Pilihan Layanan'}
                </label>
                <select
                  value={layanan}
                  onChange={(e) => setLayanan(e.target.value)}
                  className="form-input"
                >
                  <option value="Paket Wisata Lombok (Multi-Day)">Paket Wisata Lombok (2H1M - 5H4M)</option>
                  <option value="Private Trip Harian (1 Day Tour)">Private Trip Harian (1 Day Tour)</option>
                  <option value="Sewa Mobil & Transportasi">Sewa Mobil & Transportasi (+ Driver & BBM)</option>
                  <option value="Paket Honeymoon Romantis">Paket Honeymoon Romantis</option>
                  <option value="Tetebatu Cultural & Waterfall Trip">Tetebatu Cultural & Waterfall Trip</option>
                  <option value="Custom Itinerary Sesuai Keinginan">Custom Itinerary Sesuai Keinginan</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {language === 'en' ? 'Notes / Questions' : 'Catatan / Pertanyaan Tambahan'}
                </label>
                <textarea
                  rows={4}
                  placeholder={
                    language === 'en'
                      ? 'Tell us your group size, hotel preferences or specific destinations you want to visit...'
                      : 'Ceritakan jumlah peserta, preferensi hotel, atau destinasi yang ingin Anda kunjungi...'
                  }
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>

              <button type="submit" className="btn-form-submit">
                <i className="fa fa-whatsapp"></i>{' '}
                {language === 'en' ? 'Send Inquiry via WhatsApp' : 'Kirim Pesan via WhatsApp'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
