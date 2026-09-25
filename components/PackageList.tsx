'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TourPackage } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedPackage } from '@/lib/localization';
import BookingModal from '@/components/BookingModal';

interface PackageListProps {
  packages: TourPackage[];
}

export default function PackageList({ packages }: PackageListProps) {
  const { language, t, convertPriceString } = useLanguage();
  const [filter, setFilter] = useState<string>('all');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPkgSlug, setSelectedPkgSlug] = useState<string>('');

  const localizedPackages = packages.map((p) => getLocalizedPackage(p, language));

  const filteredPackages = localizedPackages.filter((pkg) => {
    if (filter === 'all') return true;
    return pkg.category.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      {/* Filter Tabs */}
      <div className="package-tabs">
        <button
          className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t.packages.tabAll}
        </button>
        <button
          className={`tab-btn ${filter === 'lombok' ? 'active' : ''}`}
          onClick={() => setFilter('lombok')}
        >
          {t.packages.tabMulti}
        </button>
        <button
          className={`tab-btn ${filter === 'private' ? 'active' : ''}`}
          onClick={() => setFilter('private')}
        >
          {language === 'en' ? 'Private Trips' : 'Private Trip'}
        </button>
        <button
          className={`tab-btn ${filter === 'honeymoon' ? 'active' : ''}`}
          onClick={() => setFilter('honeymoon')}
        >
          {t.packages.tabHoneymoon}
        </button>
        <button
          className={`tab-btn ${filter === 'cultural' ? 'active' : ''}`}
          onClick={() => setFilter('cultural')}
        >
          {t.packages.tabCulture}
        </button>
      </div>

      {/* Packages Grid (3 Columns) */}
      <div className="packages-grid">
        {filteredPackages.map((pkg) => (
          <div key={pkg.slug} className="package-card" data-category={pkg.category}>
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
                  <span className="price-label">{t.packages.perPerson}</span>
                  <span className="price-value">{convertPriceString(pkg.pricePlaceholder)}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <Link href={`/paket/${pkg.slug}`} className="btn-card-secondary">
                    {t.buttons.detail}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPkgSlug(pkg.slug);
                      setBookingModalOpen(true);
                    }}
                    className="btn-card-primary"
                  >
                    <i className="fa fa-calendar-check-o"></i> {t.buttons.book}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultPackageSlug={selectedPkgSlug}
      />
    </>
  );
}
