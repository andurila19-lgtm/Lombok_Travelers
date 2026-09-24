'use client';

import { useState } from 'react';
import Link from 'next/link';
import dailyTripsData from '@/data/dailyTrips.json';
import { DailyTrip } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import BookingModal from '@/components/BookingModal';

export default function TripHarianPage() {
  const { language, convertPriceString } = useLanguage();
  const trips: DailyTrip[] = dailyTripsData as DailyTrip[];
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTripForBooking, setSelectedTripForBooking] = useState<{ title: string; slug: string }>({
    title: '',
    slug: '',
  });

  const handleOpenBooking = (trip: DailyTrip) => {
    setSelectedTripForBooking({
      title: trip.title,
      slug: String(trip.id),
    });
    setIsBookingOpen(true);
  };

  const filteredTrips = trips.filter((t) => {
    if (selectedRegion === 'all') return true;
    if (selectedRegion === 'gili') return t.title.toLowerCase().includes('gili');
    if (selectedRegion === 'kuta') return t.title.toLowerCase().includes('mandalika') || t.title.toLowerCase().includes('selatan') || t.title.toLowerCase().includes('sasak');
    if (selectedRegion === 'tetebatu') return t.title.toLowerCase().includes('tetebatu') || t.title.toLowerCase().includes('pink');
    if (selectedRegion === 'rinjani') return t.title.toLowerCase().includes('senaru') || t.title.toLowerCase().includes('sembalun');
    return true;
  });

  return (
    <div className="multipage-wrapper">
      {/* PAGE HEADER */}
      <div className="page-header-banner">
        <div className="box1140">
          <nav className="breadcrumb-nav">
            <Link href="/">{language === 'en' ? 'Home' : 'Beranda'}</Link>
            <span>›</span>
            <strong>{language === 'en' ? 'Daily Day Trips' : 'Trip Harian'}</strong>
          </nav>
          <h1 className="page-header-title">
            {language === 'en'
              ? 'Lombok One-Day Private Trips'
              : 'Pilihan Paket Trip Harian Lombok (1 Hari)'}
          </h1>
          <p className="page-header-subtitle">
            {language === 'en'
              ? 'Private full-day excursions with hotel round-trip pickup, flexible pace, and experienced Sasak drivers.'
              : 'Eksplorasi destinasi unggulan Lombok dalam 1 hari private tour. Include jemputan hotel, mobil nyaman, driver ramah, tiket masuk & dokumentasi.'}
          </p>
        </div>
      </div>

      <div className="box1140" style={{ padding: '40px 15px 80px 15px' }}>
        {/* REGION FILTER TABS */}
        <div className="package-tabs" style={{ marginBottom: '32px' }}>
          <button
            className={`tab-btn ${selectedRegion === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('all')}
          >
            {language === 'en' ? 'All Daily Trips' : 'Semua Trip Harian'}
          </button>
          <button
            className={`tab-btn ${selectedRegion === 'gili' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('gili')}
          >
            Gili Islands Snorkeling
          </button>
          <button
            className={`tab-btn ${selectedRegion === 'kuta' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('kuta')}
          >
            Kuta & Pantai Selatan
          </button>
          <button
            className={`tab-btn ${selectedRegion === 'tetebatu' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('tetebatu')}
          >
            Tetebatu & Pink Beach
          </button>
          <button
            className={`tab-btn ${selectedRegion === 'rinjani' ? 'active' : ''}`}
            onClick={() => setSelectedRegion('rinjani')}
          >
            Sembalun & Senaru Rinjani
          </button>
        </div>

        {/* TRIPS GRID */}
        <div className="harian-grid">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="harian-card">
              <div className="harian-img-box">
                <img src={trip.image} alt={trip.title} />
                <span className="harian-duration-tag">
                  {language === 'en' ? 'Duration' : 'Durasi'}: {trip.duration}
                </span>
              </div>
              <div className="harian-body">
                <h3 className="harian-title">{trip.title}</h3>
                <p className="harian-desc">{trip.desc}</p>

                <div className="harian-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="harian-price-text">
                      {language === 'en' ? 'Starting from' : 'Mulai dari'}
                    </span>
                    <span className="harian-price-val">{convertPriceString(trip.price)}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(trip)}
                      className="btn-card-primary"
                    >
                      <i className="fa fa-calendar-check-o"></i> {language === 'en' ? 'Book' : 'Booking'}
                    </button>

                    <a
                      href={`https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20tertarik%20dengan%20${encodeURIComponent(trip.title)}.%20Mohon%20info%20jadwal%20dan%20penjemputan.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-card-secondary"
                    >
                      <i className="fa fa-whatsapp"></i> Chat WA
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INCLUSIONS SUMMARY BOX */}
        <div className="daily-inclusions-box" style={{ marginTop: '48px' }}>
          <h3>
            <i className="fa fa-shield" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>
            {language === 'en' ? 'All Daily Trips Include:' : 'Setiap Trip Harian Sudah Termasuk:'}
          </h3>
          <div className="daily-inc-grid">
            <div className="inc-pill-item">
              <i className="fa fa-check-circle"></i>{' '}
              {language === 'en' ? 'Hotel roundtrip pickup & drop-off' : 'Antar-jemput hotel PP'}
            </div>
            <div className="inc-pill-item">
              <i className="fa fa-check-circle"></i>{' '}
              {language === 'en' ? 'Private AC car + fuel (BBM)' : 'Mobil private AC + BBM'}
            </div>
            <div className="inc-pill-item">
              <i className="fa fa-check-circle"></i>{' '}
              {language === 'en' ? 'Friendly local Sasak driver' : 'Driver lokal ramah asli Sasak'}
            </div>
            <div className="inc-pill-item">
              <i className="fa fa-check-circle"></i>{' '}
              {language === 'en' ? 'All destination entrance tickets & parking' : 'Tiket masuk destinasi & retribusi parkir'}
            </div>
            <div className="inc-pill-item">
              <i className="fa fa-check-circle"></i>{' '}
              {language === 'en' ? 'Free mineral water during tour' : 'Air mineral botol selama trip'}
            </div>
            <div className="inc-pill-item">
              <i className="fa fa-check-circle"></i>{' '}
              {language === 'en' ? 'Complimentary photo assistance' : 'Bantuan foto & dokumentasi'}
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Customer Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packageTitle={selectedTripForBooking.title}
        packageSlug={selectedTripForBooking.slug}
      />
    </div>
  );
}
