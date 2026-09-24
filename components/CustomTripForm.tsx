'use client';

import { useState, FormEvent } from 'react';

export default function CustomTripForm() {
  const [tanggal, setTanggal] = useState('');
  const [peserta, setPeserta] = useState('2');
  const [pickup, setPickup] = useState('');
  const [durasi, setDurasi] = useState('3 Hari 2 Malam');
  const [destinasi, setDestinasi] = useState('');
  const [catatan, setCatatan] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const message = `Halo Lombok_Travelers,%0A%0ASaya ingin konsultasi request *Custom Trip Lombok*:%0A- *Tanggal*: ${encodeURIComponent(tanggal || 'Belum ditentukan')}%0A- *Jumlah Peserta*: ${encodeURIComponent(peserta)} Orang%0A- *Lokasi Penjemputan*: ${encodeURIComponent(pickup || 'Bandara Lombok')}%0A- *Estimasi Durasi*: ${encodeURIComponent(durasi)}%0A- *Destinasi/Aktivitas*: ${encodeURIComponent(destinasi || 'Tetebatu, Sembalun, Gili')}%0A- *Catatan Khusus*: ${encodeURIComponent(catatan || '-')}%0A%0AMohon info rekomendasi itinerary dan penawaran harga terbaik. Terima kasih!`;

    const waUrl = `https://wa.me/6283117110638?text=${message}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="custom-form-card">
      <h3>Formulir Request Custom Trip</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          
          <div className="form-group">
            <label htmlFor="customTanggal">Tanggal Perjalanan</label>
            <input
              type="date"
              id="customTanggal"
              className="form-input"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customPeserta">Jumlah Peserta (Pax)</label>
            <input
              type="number"
              id="customPeserta"
              className="form-input"
              min="1"
              placeholder="Contoh: 4"
              value={peserta}
              onChange={(e) => setPeserta(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customPickup">Lokasi Pickup</label>
            <input
              type="text"
              id="customPickup"
              className="form-input"
              placeholder="Bandara Lombok / Hotel Senggigi / dll"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customDurasi">Durasi Perjalanan</label>
            <select
              id="customDurasi"
              className="form-select"
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
            >
              <option value="1 Hari (Full Day)">1 Hari (Full Day)</option>
              <option value="2 Hari 1 Malam">2 Hari 1 Malam</option>
              <option value="3 Hari 2 Malam">3 Hari 2 Malam</option>
              <option value="4 Hari 3 Malam">4 Hari 3 Malam</option>
              <option value="5 Hari 4 Malam">5 Hari 4 Malam</option>
              <option value="Lebih dari 5 Hari">Lebih dari 5 Hari</option>
            </select>
          </div>

          <div className="form-group col-span-2">
            <label htmlFor="customDestinasi">Destinasi yang Diminati</label>
            <input
              type="text"
              id="customDestinasi"
              className="form-input"
              placeholder="Contoh: Tetebatu, Gili Trawangan, Mandalika, Sembalun"
              value={destinasi}
              onChange={(e) => setDestinasi(e.target.value)}
            />
          </div>

          <div className="form-group col-span-2">
            <label htmlFor="customCatatan">Catatan / Kebutuhan Khusus</label>
            <textarea
              id="customCatatan"
              className="form-textarea"
              placeholder="Contoh: Ada anak kecil, minta rekomendasi kuliner halal khas Sasak, hotel bintang 3..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            ></textarea>
          </div>

        </div>

        <button type="submit" className="btn-submit-custom">
          <i className="fa fa-whatsapp" style={{ fontSize: '18px' }}></i> Request Custom Trip via WhatsApp
        </button>
      </form>
    </div>
  );
}
