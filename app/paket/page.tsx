'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import packagesData from '@/data/packages.json';
import { TourPackage } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import BookingModal from '@/components/BookingModal';

function SearchParamSync({
  setFilterCategory,
  setSearchQuery,
  setDurationFilter,
}: {
  setFilterCategory: (val: string) => void;
  setSearchQuery: (val: string) => void;
  setDurationFilter: (val: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const kat = searchParams.get('kategori');
    const des = searchParams.get('destinasi');
    const dur = searchParams.get('durasi');

    if (des && des !== 'semua') {
      setSearchQuery(des);
    }
    if (dur && dur !== 'semua') {
      setDurationFilter(dur);
    }
    if (kat && kat !== 'semua') {
      const lower = kat.toLowerCase();
      if (lower.includes('honeymoon')) setFilterCategory('honeymoon');
      else if (lower.includes('private')) setFilterCategory('private');
      else if (lower.includes('cultural') || lower.includes('tetebatu')) setFilterCategory('cultural');
      else if (lower.includes('wisata')) setFilterCategory('lombok');
    }
  }, [searchParams, setFilterCategory, setSearchQuery, setDurationFilter]);

  return null;
}

export default function PaketPage() {
  const { language, convertPriceString } = useLanguage();
  const packages: TourPackage[] = packagesData as TourPackage[];

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPkgSlug, setSelectedPkgSlug] = useState<string>('');

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [durationFilter, setDurationFilter] = useState<string>('all');

  const filteredPackages = packages.filter((pkg) => {
    const matchesCat =
      filterCategory === 'all' ||
      pkg.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesQuery =
      searchQuery === '' ||
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDur =
      durationFilter === 'all' || pkg.duration.includes(durationFilter);

    return matchesCat && matchesQuery && matchesDur;
  });

  return (
    <div className="multipage-wrapper">
      <Suspense fallback={null}>
        <SearchParamSync
          setFilterCategory={setFilterCategory}
          setSearchQuery={setSearchQuery}
          setDurationFilter={setDurationFilter}
        />
      </Suspense>

      {/* PAGE HEADER */}
      <div className="page-header-banner">
        <div className="box1140">
          <nav className="breadcrumb-nav">
            <Link href="/">{language === 'en' ? 'Home' : 'Beranda'}</Link>
            <span>›</span>
            <strong>{language === 'en' ? 'Tour Packages' : 'Paket Wisata'}</strong>
          </nav>
          <h1 className="page-header-title">
            {language === 'en'
              ? 'Lombok Tour Packages & Private Trips'
              : 'Katalog Paket Wisata Lombok & Private Trip'}
          </h1>
          <p className="page-header-subtitle">
            {language === 'en'
              ? 'Explore our complete private itineraries with friendly local guides, comfortable AC vehicles, and complimentary underwater GoPro photography.'
              : 'Pilihan paket liburan terlengkap dengan armada ber-AC, driver lokal ramah asli Sasak, dan GRATIS dokumentasi foto & GoPro bawah laut.'}
          </p>
        </div>
      </div>

      <div className="box1140" style={{ padding: '40px 15px 80px 15px' }}>
        {/* FILTER & SEARCH CONTROLS */}
        <div className="catalog-filter-bar">
          <div className="filter-search-box">
            <i className="fa fa-search"></i>
            <input
              type="text"
              placeholder={
                language === 'en'
                  ? 'Search package by destination, island or activity...'
                  : 'Cari paket berdasarkan destinasi, pulau atau aktivitas...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#999',
                  padding: '4px'
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            )}
          </div>

          <div className="filter-select-group">
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">
                {language === 'en' ? 'All Durations' : 'Semua Durasi'}
              </option>
              <option value="2 Hari 1 Malam">2 Hari 1 Malam (2D1N)</option>
              <option value="3 Hari 2 Malam">3 Hari 2 Malam (3D2N)</option>
              <option value="4 Hari 3 Malam">4 Hari 3 Malam (4D3N)</option>
              <option value="5 Hari 4 Malam">5 Hari 4 Malam (5D4N)</option>
            </select>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="package-tabs" style={{ marginBottom: '32px' }}>
          <button
            className={`tab-btn ${filterCategory === 'all' ? 'active' : ''}`}
            onClick={() => setFilterCategory('all')}
          >
            {language === 'en' ? 'All Packages' : 'Semua Paket'}
          </button>
          <button
            className={`tab-btn ${filterCategory === 'lombok' ? 'active' : ''}`}
            onClick={() => setFilterCategory('lombok')}
          >
            Multi-Day (2H1M - 5H4M)
          </button>
          <button
            className={`tab-btn ${filterCategory === 'private' ? 'active' : ''}`}
            onClick={() => setFilterCategory('private')}
          >
            Private Trip
          </button>
          <button
            className={`tab-btn ${filterCategory === 'honeymoon' ? 'active' : ''}`}
            onClick={() => setFilterCategory('honeymoon')}
          >
            Honeymoon
          </button>
          <button
            className={`tab-btn ${filterCategory === 'cultural' ? 'active' : ''}`}
            onClick={() => setFilterCategory('cultural')}
          >
            Tetebatu & Cultural
          </button>
        </div>

        {/* RESULTS COUNT */}
        <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
          {language === 'en'
            ? `Showing ${filteredPackages.length} tour packages`
            : `Menampilkan ${filteredPackages.length} paket wisata`}
        </div>

        {/* PACKAGES GRID */}
        {filteredPackages.length === 0 ? (
          <div className="empty-state-box">
            <i className="fa fa-map-o" style={{ fontSize: '40px', color: '#ccc', marginBottom: '12px' }}></i>
            <h3>{language === 'en' ? 'No packages matched' : 'Tidak ada paket yang sesuai'}</h3>
            <p style={{ color: '#777', fontSize: '14px' }}>
              {language === 'en'
                ? 'Try adjusting your search query or reset the filters.'
                : 'Coba ubah kata kunci pencarian atau reset filter di atas.'}
            </p>
            <button
              onClick={() => {
                setFilterCategory('all');
                setSearchQuery('');
                setDurationFilter('all');
              }}
              className="btn-reset-filter"
            >
              {language === 'en' ? 'Reset Filters' : 'Reset Filter'}
            </button>
          </div>
        ) : (
          <div className="packages-grid">
            {filteredPackages.map((pkg) => (
              <div key={pkg.slug} className="package-card">
                <div className="card-img-wrapper">
                  <img src={pkg.image} alt={pkg.title} />
                  <span className="card-badge">{pkg.duration}</span>
                  {pkg.badge && (
                    <span className="card-badge-right">
                      <i className="fa fa-star"></i> {pkg.badge}
                    </span>
                  )}
                </div>
                <div className="package-card-body">
                  <span className="package-category">{pkg.type}</span>
                  <h3 className="package-title">{pkg.title}</h3>
                  <p className="package-desc">{pkg.shortDesc}</p>

                  <div className="package-highlights">
                    {pkg.highlights.map((h, i) => (
                      <span key={i} className="highlight-pill">
                        <i className="fa fa-check"></i> {h}
                      </span>
                    ))}
                  </div>

                  <div className="package-card-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div className="price-box">
                      <span className="price-label">
                        {language === 'en' ? 'Starting from' : 'Mulai dari'}
                      </span>
                      <span className="price-value">{convertPriceString(pkg.pricePlaceholder)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <Link href={`/paket/${pkg.slug}`} className="btn-card-secondary">
                        {language === 'en' ? 'Detail' : 'Detail'}
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPkgSlug(pkg.slug);
                          setBookingModalOpen(true);
                        }}
                        className="btn-card-primary"
                      >
                        <i className="fa fa-calendar-check-o"></i> Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CUSTOM TRIP BANNER */}
        <div className="custom-banner-card">
          <div className="custom-banner-text">
            <h3>
              {language === 'en'
                ? 'Want a Custom Travel Route?'
                : 'Punya Rencana & Destinasi Sendiri?'}
            </h3>
            <p>
              {language === 'en'
                ? 'Tell us your preferred dates, group size, and must-see places. Our local team will design a tailor-made private itinerary with the best transparent rates.'
                : 'Konsultasikan keinginan liburan Anda. Tim lokal Tetebatu kami siap merancang itinerary custom sesuai budget dan preferensi Anda.'}
            </p>
          </div>
          <a
            href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20konsultasi%20custom%20trip%20Lombok."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-custom-wa"
          >
            <i className="fa fa-whatsapp"></i>{' '}
            {language === 'en' ? 'Consult via WhatsApp' : 'Konsultasi Custom Trip'}
          </a>
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultPackageSlug={selectedPkgSlug}
      />
    </div>
  );
}
