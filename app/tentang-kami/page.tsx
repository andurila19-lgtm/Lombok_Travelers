'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function TentangKamiPage() {
  const { language } = useLanguage();

  return (
    <div className="multipage-wrapper">
      {/* PAGE HEADER */}
      <div className="page-header-banner">
        <div className="box1140">
          <nav className="breadcrumb-nav">
            <Link href="/">{language === 'en' ? 'Home' : 'Beranda'}</Link>
            <span>›</span>
            <strong>{language === 'en' ? 'About Us' : 'Tentang Kami'}</strong>
          </nav>
          <h1 className="page-header-title">
            {language === 'en'
              ? 'About Lombok_Travelers — Local Tetebatu Travel Partner'
              : 'Tentang Lombok_Travelers — Partner Wisata Lokal Tetebatu'}
          </h1>
          <p className="page-header-subtitle">
            {language === 'en'
              ? 'Born and raised in Tetebatu, East Lombok. We bridge travelers with the authentic warmth, natural wonders, and culture of the Sasak island.'
              : 'Lahir dan berpusat di Tetebatu, Lombok Timur. Kami menghubungkan wisatawan dengan keindahan alam murni, keramahan Sasak, dan liburan bebas repot.'}
          </p>
        </div>
      </div>

      <div className="box1140" style={{ padding: '40px 15px 80px 15px' }}>
        {/* STORY SECTION */}
        <div className="about-container" style={{ marginBottom: '60px' }}>
          <div className="about-text-col">
            <span className="section-tag">
              {language === 'en' ? 'Our Roots & Heritage' : 'Kisah & Identitas Kami'}
            </span>
            <h2 className="section-title">
              {language === 'en'
                ? 'From Tetebatu Highlands to All Across Lombok Island'
                : 'Dari Kesejukan Tetebatu Menjelajahi Seluruh Pulau Lombok'}
            </h2>
            <p className="about-p">
              {language === 'en'
                ? 'Lombok_Travelers was founded by native youths in Tetebatu, a historic village nestled at the southern foot of Mount Rinjani. Inspired by generations of travelers discovering the tranquility of rice terraces and misty waterfalls, we established an official, reliable, and modern travel agency.'
                : 'Lombok_Travelers didirikan oleh para pemuda lokal asli Tetebatu, desa wisata bersejarah di kaki selatan Gunung Rinjani. Terinspirasi dari keramahan turun-temurun dan keindahan terasering sawah, kami membangun biro perjalanan resmi yang profesional, ramah, dan transparan.'}
            </p>
            <p className="about-p">
              {language === 'en'
                ? 'Unlike mass tour operators, our focus is tailored private travel. You explore at your own pace with our friendly local drivers who double as your photographers and storytellers.'
                : 'Berbeda dengan operator tur massal yang terburu-buru, kami mengutamakan kenyamanan private tour. Anda menikmati liburan dengan tempo Anda sendiri bersama driver lokal yang siap menjadi fotografer dan rekan cerita selama di perjalanan.'}
            </p>

            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">1,200+</span>
                <span className="stat-label">
                  {language === 'en' ? 'Delighted Guests' : 'Traveler Puas'}
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-number">99.4%</span>
                <span className="stat-label">
                  {language === 'en' ? '5-Star Reviews' : 'Ulasan Bintang 5'}
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">
                  {language === 'en' ? 'Private & Authentic' : 'Private Tanpa Gabung'}
                </span>
              </div>
            </div>
          </div>

          <div className="about-visual-col">
            <div className="about-card-img" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/images/hero_tetebatu.png"
                alt="Tetebatu Heritage Basecamp"
                style={{ width: '100%', height: '380px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* 4 CORE COMMITMENTS */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-tag">
            {language === 'en' ? 'Our Values' : 'Nilai & Komitmen Kami'}
          </span>
          <h2 className="section-title">
            {language === 'en'
              ? '4 Pillars of the Lombok_Travelers Standard'
              : '4 Standar Pelayanan Lombok_Travelers'}
          </h2>
        </div>

        <div className="why-container-grid" style={{ marginBottom: '60px' }}>
          <div className="why" style={{ background: '#fff', border: '1px solid #eef2f6', borderRadius: '8px' }}>
            <div className="why-icon-circle">
              <i className="fa fa-handshake-o"></i>
            </div>
            <h3>{language === 'en' ? 'Honest & Transparent' : 'Jujur & Transparan'}</h3>
            <p>
              {language === 'en'
                ? 'All inclusions, entrance tickets, and transport costs are clear upfront. Zero surprise charges.'
                : 'Harga paket all-inclusive yang jelas sejak awal. Tidak ada biaya siluman atau paksaan belanja oleh-oleh.'}
            </p>
          </div>

          <div className="why" style={{ background: '#fff', border: '1px solid #eef2f6', borderRadius: '8px' }}>
            <div className="why-icon-circle">
              <i className="fa fa-users"></i>
            </div>
            <h3>{language === 'en' ? 'True Local Guides' : 'Pemandu Lokal Berizin'}</h3>
            <p>
              {language === 'en'
                ? 'Native Sasak drivers who know secret timings to avoid crowds and the finest viewpoints.'
                : 'Dipandu driver lokal asli yang hafal jam-jam terbaik ke destinasi agar tidak padat pengunjung.'}
            </p>
          </div>

          <div className="why" style={{ background: '#fff', border: '1px solid #eef2f6', borderRadius: '8px' }}>
            <div className="why-icon-circle">
              <i className="fa fa-camera"></i>
            </div>
            <h3>{language === 'en' ? 'Free Documentation' : 'Free Dokumentasi'}</h3>
            <p>
              {language === 'en'
                ? 'GoPro underwater photography for 3 Gili snorkeling and photo assistance for your memories.'
                : 'Gratis foto dan video action cam GoPro saat snorkeling penyu dan terumbu karang di 3 Gili.'}
            </p>
          </div>

          <div className="why" style={{ background: '#fff', border: '1px solid #eef2f6', borderRadius: '8px' }}>
            <div className="why-icon-circle">
              <i className="fa fa-heart"></i>
            </div>
            <h3>{language === 'en' ? 'Community Support' : 'Dukung Warga Lokal'}</h3>
            <p>
              {language === 'en'
                ? 'Every tour directly supports rural homestays, boat captains, and local organic farms.'
                : 'Setiap paket wisata Anda turut memberdayakan ekonomi warga desa, boatman lokal, dan petani Tetebatu.'}
            </p>
          </div>
        </div>

        {/* CTA TO CONTACT OR CONSULT */}
        <div className="custom-banner-card">
          <div className="custom-banner-text">
            <h3>
              {language === 'en'
                ? 'Ready to Explore Lombok with Us?'
                : 'Siap Menjelajahi Lombok Bersama Kami?'}
            </h3>
            <p>
              {language === 'en'
                ? 'Chat directly with our Tetebatu travel advisors. We respond in minutes with personalized advice.'
                : 'Konsultasikan tanggal liburan Anda sekarang. Tim kami siap memberikan rekomendasi rute terbaik.'}
            </p>
          </div>
          <a
            href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20tanya%20paket%20wisata%20Lombok."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-custom-wa"
          >
            <i className="fa fa-whatsapp"></i>{' '}
            {language === 'en' ? 'Chat on WhatsApp' : 'Chat WhatsApp 0831-1711-0638'}
          </a>
        </div>
      </div>
    </div>
  );
}
