'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface AiConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Recommendation {
  title: string;
  desc: string;
  link: string;
  waText: string;
}

export default function AiConciergeModal({ isOpen, onClose }: AiConciergeModalProps) {
  const [durasi, setDurasi] = useState('3h2m');
  const [gaya, setGaya] = useState('nature');
  const [pax, setPax] = useState('2');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let rec: Recommendation = {
      title: isEn
        ? 'Lombok 3 Days 2 Nights Package (Sasak, Mandalika & 3 Gilis)'
        : 'Paket Lombok 3 Hari 2 Malam (Sasak, Mandalika & 3 Gili)',
      desc: isEn
        ? 'Ideal blend of Sasak heritage, exotic south beaches, and vibrant marine life at Gili Trawangan.'
        : 'Kombinasi ideal antara budaya Sasak, pantai eksotis selatan, dan keindahan bawah laut Gili Trawangan.',
      link: '/paket/paket-lombok-3-hari-2-malam',
      waText: isEn
        ? 'Hello Lombok_Travelers, I would like to consult about the Lombok 3D2N Package recommended by your Travel Assistant.'
        : 'Halo Lombok_Travelers, saya ingin konsultasi Paket Lombok 3H2M rekomendasi Travel Assistant.'
    };

    if (durasi === '1h') {
      if (gaya === 'snorkeling') {
        rec = {
          title: isEn
            ? 'Daily Trip: Gili Trawangan & 3 Gilis Snorkeling'
            : 'Trip Harian: Gili Trawangan & 3 Gili Snorkeling',
          desc: isEn
            ? 'Full-day trip swimming with sea turtles and exploring vibrant coral reefs in Gili Air, Meno & Trawangan.'
            : 'One-day trip berenang bersama penyu laut dan menjelajahi terumbu karang Gili Air, Meno & Trawangan.',
          link: '/#pharian',
          waText: isEn
            ? 'Hello Lombok_Travelers, I would like to book the 3 Gilis Snorkeling Daily Trip.'
            : 'Halo Lombok_Travelers, saya ingin booking Trip Harian Snorkeling 3 Gili.'
        };
      } else {
        rec = {
          title: isEn
            ? 'Daily Trip: Tetebatu Nature & Waterfall Trip'
            : 'Trip Harian: Tetebatu Nature & Waterfall Trip',
          desc: isEn
            ? 'Enjoy lush rice terraces, the Black Monkey Forest, and refreshing waterfalls at the foot of Mount Rinjani.'
            : 'Menikmati terasiring sawah Tetebatu, Black Monkey Forest, dan air terjun alami kaki Gunung Rinjani.',
          link: '/#pharian',
          waText: isEn
            ? 'Hello Lombok_Travelers, I would like to book the Tetebatu Nature Daily Trip.'
            : 'Halo Lombok_Travelers, saya ingin booking Trip Harian Tetebatu Nature.'
        };
      }
    } else if (durasi === '4h5h') {
      rec = {
        title: isEn
          ? 'Lombok 4 Days 3 Nights / 5 Days 4 Nights Package'
          : 'Paket Lombok 4 Hari 3 Malam / 5 Hari 4 Malam',
        desc: isEn
          ? 'Most comprehensive exploration: Tetebatu highlands, Sembalun Rinjani, Pink Beach, and Gili Trawangan with a relaxed pace.'
          : 'Eksplorasi terlengkap: Tetebatu highland, Sembalun Rinjani, Pink Beach, dan Gili Trawangan dengan ritme santai.',
        link: '/paket/paket-lombok-4-hari-3-malam',
        waText: isEn
          ? 'Hello Lombok_Travelers, I am interested in the Lombok 4D3N/5D4N Package.'
          : 'Halo Lombok_Travelers, saya tertarik dengan Paket 4H3M/5H4M Lombok.'
      };
    } else if (gaya === 'honeymoon') {
      rec = {
        title: isEn
          ? 'Private Romantic Lombok Honeymoon Package'
          : 'Paket Private Honeymoon Lombok Romantis',
        desc: isEn
          ? 'Peaceful romantic escape with private transport, private boat, and candlelight dinner.'
          : 'Pengalaman liburan berdua yang tenang dengan private transport, private boat, dan candle light dinner.',
        link: '/paket/private-lombok-honeymoon-trip',
        waText: isEn
          ? 'Hello Lombok_Travelers, I would like to consult about the Romantic Lombok Honeymoon Package.'
          : 'Halo Lombok_Travelers, saya ingin konsultasi Paket Honeymoon Lombok Romantis.'
      };
    }

    setRecommendation(rec);
  };

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ background: 'var(--primary-soft)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>
            {t.concierge?.modalTag || (isEn ? 'Travel Assistant' : 'Assistant Perjalanan')}
          </span>
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--dark)', marginBottom: '6px' }}>
          {t.concierge?.modalTitle || 'Pilih Paket Sesuai Impian Liburan Anda'}
        </h3>
        <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginBottom: '20px' }}>
          {t.concierge?.modalSubtitle || 'Jawab 3 pertanyaan singkat berikut dan asisten kami akan merekomendasikan pilihan paket terbaik:'}
        </p>

        <form onSubmit={handleSubmit}>
          {/* Q1 */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--dark)', display: 'block', marginBottom: '6px' }}>
              {t.concierge?.q1 || '1. Berapa lama rencana waktu liburan Anda?'}
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <label style={{ border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="radio" name="aiDurasi" value="1h" checked={durasi === '1h'} onChange={(e) => setDurasi(e.target.value)} /> {t.concierge?.q1Opt1 || (isEn ? '1 Day (Daily Trip)' : '1 Hari (Trip Harian)')}
              </label>
              <label style={{ border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="radio" name="aiDurasi" value="3h2m" checked={durasi === '3h2m'} onChange={(e) => setDurasi(e.target.value)} /> {t.concierge?.q1Opt2 || (isEn ? '2 - 3 Days' : '2 - 3 Hari')}
              </label>
              <label style={{ border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="radio" name="aiDurasi" value="4h5h" checked={durasi === '4h5h'} onChange={(e) => setDurasi(e.target.value)} /> {t.concierge?.q1Opt3 || (isEn ? '4 - 5 Days' : '4 - 5 Hari')}
              </label>
            </div>
          </div>

          {/* Q2 */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--dark)', display: 'block', marginBottom: '6px' }}>
              {t.concierge?.q2 || '2. Gaya liburan apa yang paling Anda inginkan?'}
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <label style={{ border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="radio" name="aiGaya" value="nature" checked={gaya === 'nature'} onChange={(e) => setGaya(e.target.value)} /> {t.concierge?.q2Opt1 || (isEn ? 'Nature & Rice Terraces (Tetebatu)' : 'Alam & Sawah (Tetebatu)')}
              </label>
              <label style={{ border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="radio" name="aiGaya" value="snorkeling" checked={gaya === 'snorkeling'} onChange={(e) => setGaya(e.target.value)} /> {t.concierge?.q2Opt2 || (isEn ? 'Beaches & Snorkeling (Gili)' : 'Pantai & Snorkeling (Gili)')}
              </label>
              <label style={{ border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="radio" name="aiGaya" value="honeymoon" checked={gaya === 'honeymoon'} onChange={(e) => setGaya(e.target.value)} /> {t.concierge?.q2Opt3 || (isEn ? 'Romantic Getaway (Honeymoon)' : 'Romantis Berdua (Honeymoon)')}
              </label>
            </div>
          </div>

          {/* Q3 */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="aiPax" style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--dark)', display: 'block', marginBottom: '6px' }}>
              {t.concierge?.q3 || '3. Jumlah orang yang ikut serta'}
            </label>
            <input
              type="number"
              id="aiPax"
              className="form-input"
              value={pax}
              min="1"
              style={{ maxWidth: '140px' }}
              onChange={(e) => setPax(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}>
            <i className="fa fa-search"></i> {t.concierge?.btnCalculate || 'Dapatkan Rekomendasi Paket'}
          </button>
        </form>

        {recommendation && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>
              {t.concierge?.recTag || 'Rekomendasi Paket Terbaik Untuk Anda:'}
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#14532d', marginBottom: '6px' }}>
              {recommendation.title}
            </h4>
            <p style={{ fontSize: '13px', color: '#374151', marginBottom: '12px', lineHeight: 1.5 }}>
              {recommendation.desc}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link href={recommendation.link} className="btn-detail" onClick={onClose} style={{ fontSize: '12px', padding: '6px 14px' }}>
                {t.concierge?.btnViewPkg || 'Lihat Rincian Paket'}
              </Link>
              <a
                href={`https://wa.me/6283117110638?text=${encodeURIComponent(recommendation.waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: '12px', padding: '6px 14px', background: '#25d366' }}
              >
                <i className="fa fa-whatsapp"></i> {t.concierge?.btnConsultWa || 'Chat via WhatsApp'}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
