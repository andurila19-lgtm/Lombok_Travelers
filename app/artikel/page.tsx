'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

const articles: Article[] = [
  {
    id: 'snorkeling-3-gili',
    title: 'Panduan Lengkap Snorkeling 3 Gili: Trawangan, Meno, dan Air',
    category: 'Tips Traveling',
    readTime: '5 Menit Baca',
    date: '12 September 2026',
    image: '/images/gili_snorkeling.jpg',
    excerpt: 'Ketahui spot patung bawah laut Nest karya Jason deCaires Taylor, turtle point penyu liar, serta tips sewa private glass-bottom boat tanpa repot.',
    content: [
      'Gili Trawangan, Gili Meno, dan Gili Air adalah tiga pulau kecil tanpa kendaraan bermotor yang menjadi primadona wisata bahari di Lombok. Untuk pengalaman snorkeling terbaik, disarankan menyewa perahu kayu private dengan kaca transparan di lantainya (glass-bottom boat).',
      'Spot pertama yang wajib dikunjungi adalah Underwater Statues di lepas pantai Gili Meno. 48 patung seukuran manusia yang melingkar ini menjadi rumah bagi terumbu karang dan ribuan ikan warna-warni.',
      'Spot kedua adalah Turtle Point di perairan antara Meno dan Trawangan. Di sini, Anda hampir 100% dijamin dapat berenang berdampingan dengan penyu hijau (Chelonia mydas) di habitat aslinya.',
      'Tips dari kami: Bawa kamera anti-air atau pesan paket wisata Lombok_Travelers yang sudah include dokumentasi action cam GoPro GRATIS!'
    ]
  },
  {
    id: 'desa-wisata-tetebatu',
    title: '5 Alasan Kenapa Desa Wisata Tetebatu Wajib Masuk Bucket List Anda',
    category: 'Destinasi',
    readTime: '6 Menit Baca',
    date: '05 September 2026',
    image: '/images/hero_tetebatu.png',
    excerpt: 'Dijuluki sebagai Ubud-nya Lombok, Tetebatu menawarkan ketenangan persawahan berundak, air terjun Sarang Walet, dan perjumpaan dengan Black Monkey langka.',
    content: [
      'Terletak tepat di lereng selatan Gunung Rinjani, Tetebatu memiliki hawa sejuk pegunungan dan panorama terasering sawah yang memukau tanpa hiruk pikuk keramaian kota.',
      'Daya tarik utama Tetebatu meliputi trekking menyusuri sawah tradisional dengan latar belakang Gunung Rinjani, menyusuri goa alami Air Terjun Sarang Walet (Hidden Canyon), serta melihat habitat monyet hitam endemik (Trachypithecus auratus cristatus).',
      'Selain keindahan alam, Tetebatu adalah pusat budaya Sasak otentik di mana warga memproduksi kopi robusta tradisional, rempah vanili, dan tenun lokal. Menginap di homestay lokal Tetebatu memberikan pengalaman kehangatan masyarakat asli yang jarang ditemukan di tempat lain.'
    ]
  },
  {
    id: 'tips-mendaki-rinjani',
    title: 'Persiapan Fisik & Tips Mendaki Gunung Rinjani untuk Pemula',
    category: 'Rinjani & Trekking',
    readTime: '7 Menit Baca',
    date: '28 Agustus 2026',
    image: '/images/rinjani_hero.jpg',
    excerpt: 'Mendaki atap Pulau Lombok setinggi 3.726 mdpl membutuhkan stamina matang, perlengkapan tepat, dan pemilihan jalur Sembalun atau Senaru.',
    content: [
      'Gunung Rinjani merupakan gunung berapi tertinggi kedua di Indonesia. Jalur Sembalun umumnya dipilih bagi pendaki yang menargetkan puncak (Summit 3.726 mdpl) karena menyajikan padang savana luas.',
      'Bagi pemula, program 2 Hari 1 Malam sampai Plawangan Senaru atau Sembalun Crater Rim sudah menyuguhkan pemandangan magis Danau Segara Anak dan Gunung Baru Jari tanpa harus memaksakan diri ke puncak.',
      'Pastikan Anda melakukan latihan kardio (jogging atau renang) minimal 3-4 minggu sebelum hari pendakian, menggunakan sepatu trekking dengan grip memadai, dan selalu mendaki bersama pemandu lokal berlisensi.'
    ]
  },
  {
    id: 'pink-beach-lombok',
    title: 'Eksplorasi Pantai Tangsi (Pink Beach): Lokasi, Rute & Waktu Terbaik',
    category: 'Destinasi',
    readTime: '4 Menit Baca',
    date: '18 Agustus 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Warna merah muda pasir Pantai Tangsi berasal dari serpihan koral merah mikroskopis Foraminifera yang terhempas ombak secara alami.',
    content: [
      'Pantai Tangsi atau Pink Beach terletak di ujung tenggara Lombok Timur (Kecamatan Jerowaru). Warna pasirnya tampak paling jelas merah muda saat disinari matahari pagi sekitar pukul 08.00 hingga 11.00 WITA.',
      'Rute terbaik mencapai Pink Beach adalah menaiki perahu private dari Pelabuhan Tanjung Luar. Jalur laut ini sangat kami rekomendasikan karena Anda bisa sekaligus singgah di Pulau Pasir (Sand Island) yang hanya muncul saat air surut serta snorkeling di Gili Petelu.'
    ]
  },
  {
    id: 'kuliner-khas-lombok',
    title: 'Wisata Kuliner Khas Lombok: Selain Ayam Taliwang yang Wajib Dicoba',
    category: 'Kuliner Sasak',
    readTime: '4 Menit Baca',
    date: '10 Agustus 2026',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Cicipi kelezatan Pelecing Kangkung lombok berakar renyah, Sate Rembiga sapi manis pedas, Nasi Balap Puyung gurih, dan Beberuk Terong segar.',
    content: [
      'Kuliner Pulau Lombok terkenal dengan cita rasa bumbu rempah cabai merah yang kaya dan pedas membakar.',
      'Sate Rembiga: Potongan daging sapi empuk yang dimarinasi dalam gula merah, cabai, dan ketumbar lalu dibakar hingga caramelized.',
      'Pelecing Kangkung: Kangkung khas Lombok memiliki batang tebal dan tekstur sangat renyah, disiram sambal terasi bakar dan perasan jeruk limau.',
      'Nasi Balap Puyung: Nasi hangat dengan suwiran ayam pedas kering, kacang kedelai renyah, dan taburan serundeng kelapa.'
    ]
  },
  {
    id: 'musim-terbaik-lombok',
    title: 'Kapan Waktu Terbaik Liburan ke Lombok? Panduan Cuaca & Musim',
    category: 'Tips Traveling',
    readTime: '5 Menit Baca',
    date: '01 Agustus 2026',
    image: '/images/sembalun_bukit_selong.jpg',
    excerpt: 'Simak perbedaan musim kemarau (Mei - Oktober) untuk snorkeling dan pendakian, serta musim hijau (Desember - April) untuk panorama alam segar.',
    content: [
      'Musim Kemarau (Mei – Oktober): Waktu paling ideal untuk aktivitas laut, snorkeling di 3 Gili, Pantai Pink, dan pendakian Gunung Rinjani. Langit cerah, ombak tenang, dan jarak pandang bawah air sangat jernih.',
      'Musim Penghujan / Hijau (Desember – April): Tetebatu dan Sembalun berubah menjadi hamparan hijau zamrud yang sangat asri. Air terjun Tiu Kelep dan Sendang Gile berada pada debit maksimal.',
      'Tips: Jika ingin menghindari keramaian peak season, pilihlah bulan Mei, Juni, atau September untuk suasana santai dan tiket pesawat lebih terjangkau.'
    ]
  }
];

export default function ArtikelPage() {
  const { language } = useLanguage();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter((a) => {
    if (selectedCat === 'all') return true;
    return a.category.toLowerCase().includes(selectedCat.toLowerCase());
  });

  return (
    <div className="multipage-wrapper">
      {/* PAGE HEADER */}
      <div className="page-header-banner">
        <div className="box1140">
          <nav className="breadcrumb-nav">
            <Link href="/">{language === 'en' ? 'Home' : 'Beranda'}</Link>
            <span>›</span>
            <strong>{language === 'en' ? 'Articles & Travel Guide' : 'Artikel & Panduan Wisata'}</strong>
          </nav>
          <h1 className="page-header-title">
            {language === 'en'
              ? 'Lombok Travel Guides & Insider Tips'
              : 'Artikel & Panduan Wisata Pulau Lombok'}
          </h1>
          <p className="page-header-subtitle">
            {language === 'en'
              ? 'Curated recommendations, cultural insights, and practical travel tips written by local Sasak explorers.'
              : 'Informasi destinasi tersembunyi, tips snorkeling, panduan trekking Rinjani, dan kuliner khas langsung dari tim lokal Tetebatu.'}
          </p>
        </div>
      </div>

      <div className="box1140" style={{ padding: '40px 15px 80px 15px' }}>
        {/* CATEGORY TABS */}
        <div className="package-tabs" style={{ marginBottom: '32px' }}>
          <button
            className={`tab-btn ${selectedCat === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCat('all')}
          >
            {language === 'en' ? 'All Articles' : 'Semua Artikel'}
          </button>
          <button
            className={`tab-btn ${selectedCat === 'tips' ? 'active' : ''}`}
            onClick={() => setSelectedCat('tips')}
          >
            Tips Traveling
          </button>
          <button
            className={`tab-btn ${selectedCat === 'destinasi' ? 'active' : ''}`}
            onClick={() => setSelectedCat('destinasi')}
          >
            Destinasi
          </button>
          <button
            className={`tab-btn ${selectedCat === 'rinjani' ? 'active' : ''}`}
            onClick={() => setSelectedCat('rinjani')}
          >
            Rinjani & Trekking
          </button>
          <button
            className={`tab-btn ${selectedCat === 'kuliner' ? 'active' : ''}`}
            onClick={() => setSelectedCat('kuliner')}
          >
            Kuliner Sasak
          </button>
        </div>

        {/* ARTICLES GRID */}
        <div className="articles-grid">
          {filteredArticles.map((art) => (
            <article key={art.id} className="article-card">
              <div className="article-img-box">
                <img src={art.image} alt={art.title} />
                <span className="article-cat-badge">{art.category}</span>
              </div>
              <div className="article-card-body">
                <div className="article-meta">
                  <span><i className="fa fa-clock-o"></i> {art.readTime}</span>
                  <span>•</span>
                  <span><i className="fa fa-calendar-o"></i> {art.date}</span>
                </div>
                <h2 className="article-title">{art.title}</h2>
                <p className="article-excerpt">{art.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px' }}>
                  <Link
                    href={`/artikel/${art.id}`}
                    className="btn-read-more"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    {language === 'en' ? 'Read Full Guide' : 'Baca Selengkapnya'}{' '}
                    <i className="fa fa-angle-right"></i>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(art)}
                    style={{
                      background: 'none',
                      border: '1px solid #cbd5e1',
                      color: '#475569',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    title="Preview Cepat"
                  >
                    <i className="fa fa-eye"></i> Quick View
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ARTICLE MODAL POPUP */}
        {activeArticle && (
          <div
            className="article-modal-backdrop"
            onClick={() => setActiveArticle(null)}
          >
            <div
              className="article-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setActiveArticle(null)}
                aria-label="Tutup"
              >
                <i className="fa fa-times"></i>
              </button>

              <div className="article-modal-header">
                <span className="article-cat-badge" style={{ position: 'static' }}>
                  {activeArticle.category}
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, marginTop: '10px', color: 'var(--navy)' }}>
                  {activeArticle.title}
                </h2>
                <div className="article-meta" style={{ marginTop: '8px' }}>
                  <span><i className="fa fa-clock-o"></i> {activeArticle.readTime}</span>
                  <span>•</span>
                  <span><i className="fa fa-calendar-o"></i> {activeArticle.date}</span>
                </div>
              </div>

              <div className="article-modal-img">
                <img src={activeArticle.image} alt={activeArticle.title} />
              </div>

              <div className="article-modal-body">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx} style={{ marginBottom: '16px', lineHeight: 1.7, color: '#334155' }}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="article-modal-footer">
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                  {language === 'en'
                    ? 'Have questions about this route or need a private local guide?'
                    : 'Ingin mengunjungi destinasi ini bersama travel guide lokal berpengalaman?'}
                </p>
                <a
                  href={`https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20tertarik%20dengan%20artikel%20${encodeURIComponent(activeArticle.title)}.%20Mohon%20info%20rekomendasi%20trip.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-custom-wa"
                  style={{ display: 'inline-flex' }}
                >
                  <i className="fa fa-whatsapp"></i>{' '}
                  {language === 'en' ? 'Inquire on WhatsApp' : 'Tanya Rute via WhatsApp'}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
