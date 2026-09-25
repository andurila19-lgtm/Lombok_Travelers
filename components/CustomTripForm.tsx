'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function CustomTripForm() {
  const { language } = useLanguage();
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [peserta, setPeserta] = useState('2');
  const [pickup, setPickup] = useState('');
  const [durasi, setDurasi] = useState('3 Hari 2 Malam');
  const [destinasi, setDestinasi] = useState('');
  const [catatan, setCatatan] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!nama.trim() || nama.trim().length < 2) {
      setFormError(language === 'en' ? 'Name must be at least 2 characters.' : 'Nama pemesan minimal 2 karakter.');
      return;
    }

    const cleanPhone = whatsapp.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setFormError(language === 'en' ? 'Invalid WhatsApp number.' : 'Nomor WhatsApp tidak valid (minimal 8 digit).');
      return;
    }

    if (tanggal && tanggal < todayStr) {
      setFormError(language === 'en' ? 'Date cannot be in the past.' : 'Tanggal perjalanan tidak boleh tanggal yang sudah lewat.');
      return;
    }

    const paxNum = parseInt(peserta) || 2;
    if (paxNum < 1 || paxNum > 100) {
      setFormError(language === 'en' ? 'Participants must be between 1 and 100.' : 'Jumlah peserta harus antara 1 sampai 100.');
      return;
    }

    setIsSubmitting(true);

    let bookingCode = '';
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: nama.trim(),
          whatsapp: whatsapp.trim(),
          package_name: `Custom Trip: ${destinasi || durasi}`,
          package_id: 'custom-trip',
          travel_date: tanggal || todayStr,
          participants: paxNum,
          pickup_location: pickup.trim() || 'Bandara Lombok',
          transportation: 'Innova / Avanza (Sesuai Rute Custom)',
          notes: `[Durasi: ${durasi}] [Destinasi: ${destinasi}] ${catatan}`.trim(),
          hp_field: honeypot,
          status: 'New Inquiry',
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.booking_number) {
        bookingCode = data.data.booking_number;
      }
    } catch (err) {
      console.error('Error saving custom trip booking:', err);
    } finally {
      setIsSubmitting(false);
    }

    const message = `Halo Lombok_Travelers,\n\nSaya ingin konfirmasi booking:\n\nNo. Booking: ${bookingCode || 'LT-CUSTOM'}\nNama: ${nama.trim()}\nPaket: Custom Trip (${destinasi || durasi})\nTanggal: ${tanggal || 'Sesuai Diskusi'}\nPeserta: ${paxNum} Orang\nPickup: ${pickup.trim() || 'Bandara Lombok'}\n\nMohon konfirmasi ketersediaannya.`;

    const waUrl = `https://wa.me/6283117110638?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="custom-form-card">
      <h3>{language === 'en' ? 'Custom Trip Inquiry Form' : 'Formulir Request Custom Trip'}</h3>
      <form onSubmit={handleSubmit}>
        {/* Anti-Spam Bot Trap (Honeypot) */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
          <label htmlFor="hp_field_custom">Jangan isi bidang ini</label>
          <input
            id="hp_field_custom"
            type="text"
            name="hp_field"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {formError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '14px' }}>
            {formError}
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="customNama">
              {language === 'en' ? 'Full Name *' : 'Nama Pemesan *'}
            </label>
            <input
              type="text"
              id="customNama"
              className="form-input"
              placeholder={language === 'en' ? 'e.g. John Doe' : 'Contoh: Pak Budi Santoso'}
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customWhatsapp">
              {language === 'en' ? 'WhatsApp Number *' : 'Nomor WhatsApp Aktif *'}
            </label>
            <input
              type="tel"
              id="customWhatsapp"
              className="form-input"
              placeholder={language === 'en' ? '+62 / +1 ...' : '0812xxxxxxxx'}
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customTanggal">
              {language === 'en' ? 'Estimated Date *' : 'Tanggal Perjalanan *'}
            </label>
            <input
              type="date"
              id="customTanggal"
              className="form-input"
              min={todayStr}
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customPeserta">
              {language === 'en' ? 'Number of Guests (Pax) *' : 'Jumlah Peserta (Pax) *'}
            </label>
            <input
              type="number"
              id="customPeserta"
              className="form-input"
              min="1"
              max="100"
              placeholder={language === 'en' ? 'e.g. 4' : 'Contoh: 4'}
              value={peserta}
              onChange={(e) => setPeserta(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customPickup">
              {language === 'en' ? 'Pick-up Location *' : 'Lokasi Pickup *'}
            </label>
            <input
              type="text"
              id="customPickup"
              className="form-input"
              placeholder={language === 'en' ? 'Lombok Airport / Hotel / Harbor' : 'Bandara Lombok / Hotel Senggigi / dll'}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customDurasi">
              {language === 'en' ? 'Estimated Duration' : 'Durasi Perjalanan'}
            </label>
            <select
              id="customDurasi"
              className="form-select"
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
            >
              <option value="1 Hari (Full Day)">{language === 'en' ? '1 Day (Full Day)' : '1 Hari (Full Day)'}</option>
              <option value="2 Hari 1 Malam">{language === 'en' ? '2 Days 1 Night' : '2 Hari 1 Malam'}</option>
              <option value="3 Hari 2 Malam">{language === 'en' ? '3 Days 2 Nights' : '3 Hari 2 Malam'}</option>
              <option value="4 Hari 3 Malam">{language === 'en' ? '4 Days 3 Nights' : '4 Hari 3 Malam'}</option>
              <option value="5 Hari 4 Malam">{language === 'en' ? '5 Days 4 Nights' : '5 Hari 4 Malam'}</option>
              <option value="Lebih dari 5 Hari">{language === 'en' ? 'More than 5 Days' : 'Lebih dari 5 Hari'}</option>
            </select>
          </div>

          <div className="form-group col-span-2">
            <label htmlFor="customDestinasi">
              {language === 'en' ? 'Preferred Destinations / Activities' : 'Destinasi yang Diminati'}
            </label>
            <input
              type="text"
              id="customDestinasi"
              className="form-input"
              placeholder={language === 'en' ? 'e.g. Tetebatu, Gili Trawangan, Mandalika, Sembalun' : 'Contoh: Tetebatu, Gili Trawangan, Mandalika, Sembalun'}
              value={destinasi}
              onChange={(e) => setDestinasi(e.target.value)}
            />
          </div>

          <div className="form-group col-span-2">
            <label htmlFor="customCatatan">
              {language === 'en' ? 'Special Notes / Requests' : 'Catatan / Kebutuhan Khusus'}
            </label>
            <textarea
              id="customCatatan"
              className="form-textarea"
              placeholder={language === 'en' ? 'e.g. Traveling with toddlers, halal culinary requests, 3-star hotel recommendation...' : 'Contoh: Ada anak kecil, minta rekomendasi kuliner halal khas Sasak, hotel bintang 3...'}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            ></textarea>
          </div>

        </div>

        <button type="submit" className="btn-submit-custom" disabled={isSubmitting}>
          <i className={`fa ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-whatsapp'}`} style={{ fontSize: '18px' }}></i>
          {isSubmitting
            ? (language === 'en' ? ' Saving Inquiry...' : ' Menyimpan Reservasi...')
            : (language === 'en' ? ' Request Custom Trip via WhatsApp' : ' Request Custom Trip via WhatsApp')}
        </button>
      </form>
    </div>
  );
}
