'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function SearchBar() {
  const router = useRouter();
  const { t } = useLanguage();
  const [kategori, setKategori] = useState('semua');
  const [destinasi, setDestinasi] = useState('semua');
  const [durasi, setDurasi] = useState('semua');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const target = document.getElementById('paket-wisata');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#paket-wisata');
    }
  };

  return (
    <div id="srchome">
      <div className="box1140">
        <form onSubmit={handleSearch} className="srchome-form">
          
          {/* Col 1: Pilih Kategori */}
          <div className="srchome-col">
            <label htmlFor="kategori">{t.search.catLabel}</label>
            <select
              name="kat"
              id="kategori"
              aria-label={t.search.catLabel}
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            >
              <option value="semua">{t.search.allCat}</option>
              <option value="Paket Wisata Lombok">{t.search.catHoliday}</option>
              <option value="Private Trip">{t.search.catPrivate}</option>
              <option value="Paket Honeymoon">{t.search.catHoneymoon}</option>
              <option value="Paket Trip 1 Hari">{t.search.catDaily}</option>
              <option value="Tetebatu Cultural">{t.search.catTetebatu}</option>
            </select>
          </div>

          {/* Col 2: Pilih Destinasi */}
          <div className="srchome-col">
            <label htmlFor="destinasi">{t.search.destLabel}</label>
            <select
              name="des"
              id="destinasi"
              aria-label={t.search.destLabel}
              value={destinasi}
              onChange={(e) => setDestinasi(e.target.value)}
            >
              <option value="semua">{t.search.allDest}</option>
              <option value="Tetebatu">Tetebatu & Lembah Rinjani</option>
              <option value="Gili Trawangan">Gili Trawangan & 3 Gili</option>
              <option value="Kuta Mandalika">Kuta Mandalika & Merese</option>
              <option value="Sembalun">Lembah Sembalun</option>
              <option value="Pink Beach">Pink Beach Lombok</option>
              <option value="Gili Nanggu">Gili Nanggu Secret Islands</option>
              <option value="Senaru">Air Terjun Senaru & Tiu Kelep</option>
            </select>
          </div>

          {/* Col 3: Pilih Durasi */}
          <div className="srchome-col">
            <label htmlFor="durasi">{t.search.durLabel}</label>
            <select
              name="dur"
              id="durasi"
              aria-label={t.search.durLabel}
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
            >
              <option value="semua">{t.search.allDur}</option>
              <option value="1 Hari">{t.search.dur1Day}</option>
              <option value="2 Hari 1 Malam">{t.search.dur2D1N}</option>
              <option value="3 Hari 2 Malam">{t.search.dur3D2N}</option>
              <option value="4 Hari 3 Malam">{t.search.dur4D3N}</option>
              <option value="5 Hari 4 Malam">{t.search.dur5D4N}</option>
            </select>
          </div>

          {/* Col 4: Submit Yellow Button */}
          <div className="srchome-btn-col">
            <button type="submit" className="smt">
              <i className="fa fa-search" aria-hidden="true"></i> {t.search.btnText}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
