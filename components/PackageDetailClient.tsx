'use client';

import Link from 'next/link';
import { TourPackage } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedPackage } from '@/lib/localization';
import GalleryThumbnails from '@/components/GalleryThumbnails';
import BookingActionButtons from '@/components/BookingActionButtons';

interface PackageDetailClientProps {
  initialPackage: TourPackage;
  initialRelatedPackages: TourPackage[];
}

export default function PackageDetailClient({
  initialPackage,
  initialRelatedPackages,
}: PackageDetailClientProps) {
  const { language, t, convertPriceString } = useLanguage();

  const pkg = getLocalizedPackage(initialPackage, language);
  const relatedPackages = initialRelatedPackages.map((rel) =>
    getLocalizedPackage(rel, language)
  );

  return (
    <>
      {/* DETAIL HERO & BREADCRUMB */}
      <div className="detail-hero" style={{ backgroundImage: `url('${pkg.image}')` }}>
        <div className="detail-hero-overlay"></div>
        <div className="box1140 detail-hero-content">
          <nav className="breadcrumb-nav">
            <Link href="/">{t.packageDetail.breadcrumbHome}</Link>
            <span>›</span>
            <Link href="/#paket-wisata">{t.packageDetail.breadcrumbTour}</Link>
            <span>›</span>
            <strong>{pkg.title}</strong>
          </nav>

          <h1 className="detail-title font-editorial">
            {pkg.title} {pkg.subtitle ? `(${pkg.subtitle})` : ''}
          </h1>

          <div className="detail-meta-pills">
            <span className="meta-pill">
              <i className="fa fa-clock-o"></i> {pkg.duration}
            </span>
            <span className="meta-pill">
              <i className="fa fa-users"></i> {pkg.type}
            </span>
            <span className="meta-pill">
              <i className="fa fa-map-marker"></i> {pkg.location}
            </span>
            <span className="meta-pill highlight">
              <i className="fa fa-tag"></i> {t.packageDetail.startingFrom} {convertPriceString(pkg.pricePlaceholder)}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN DETAIL CONTENT CONTAINER */}
      <div className="box1140">
        <div className="detail-layout">

          {/* LEFT COLUMN: MAIN CONTENT */}
          <div className="detail-main">

            {/* 1. Destination Gallery Showcase */}
            <GalleryThumbnails images={pkg.gallery} title={pkg.title} />

            {/* 2. Deskripsi Paket */}
            <div className="detail-block">
              <h2>{t.packageDetail.packageDescTitle}</h2>
              <p className="detail-desc-text">
                {pkg.description}
              </p>
            </div>

            {/* 3. ITINERARY TIMETABLE */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="detail-block">
                <h2>{t.packageDetail.itineraryTitle}</h2>

                {pkg.itinerary.map((dayPlan, dIdx) => (
                  <div key={dIdx} className="itinerary-day-box">
                    <div className="itinerary-day-header">
                      <span className="day-tag">{dayPlan.day}</span>
                      <span>{dayPlan.title}</span>
                    </div>
                    <table className="itinerary-table">
                      <tbody>
                        {dayPlan.schedule.map((item, sIdx) => (
                          <tr key={sIdx}>
                            <td className="col-time">{item.time}</td>
                            <td className="col-colon">:</td>
                            <td className="col-activity">{item.activity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

            {/* 4. PAKET TERMASUK & TIDAK TERMASUK */}
            <div className="detail-block">
              <h2>{t.packageDetail.facilitiesTitle}</h2>
              <div className="inc-exc-grid">
                
                {/* Termasuk */}
                <div className="inc-box">
                  <h3 className="inc-title">
                    <i className="fa fa-check-circle"></i> {t.packageDetail.inclusionsTitle}
                  </h3>
                  <ul className="inc-list">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i}><i className="fa fa-check"></i> {inc}</li>
                    ))}
                  </ul>
                </div>

                {/* Tidak Termasuk */}
                <div className="exc-box">
                  <h3 className="exc-title">
                    <i className="fa fa-times-circle"></i> {t.packageDetail.exclusionsTitle}
                  </h3>
                  <ul className="exc-list">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i}><i className="fa fa-times"></i> {exc}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Extra Documentation Addons Banner */}
              <div className="extra-addons-box">
                <h4>
                  <i className="fa fa-video-camera"></i> {t.packageDetail.extraAddonsTitle}
                </h4>
                <div className="addons-grid">
                  <div className="addon-item">
                    <i className="fa fa-paper-plane-o addon-icon"></i>
                    <div className="addon-text">
                      <strong>{t.packageDetail.droneTitle}</strong>
                      <span>{convertPriceString(t.packageDetail.droneDesc)}</span>
                    </div>
                  </div>
                  <div className="addon-item">
                    <i className="fa fa-film addon-icon"></i>
                    <div className="addon-text">
                      <strong>{t.packageDetail.reelsTitle}</strong>
                      <span>{convertPriceString(t.packageDetail.reelsDesc)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. HARGA PAKET */}
            <div className="detail-block">
              <h2>{t.packageDetail.priceTitle} {pkg.title}</h2>
              <p style={{ fontSize: '14px', color: 'var(--dark-soft)', marginBottom: '14px' }}>
                {t.packageDetail.priceSubtitle}
              </p>

              <div className="table-responsive">
                <table className="price-table">
                  <thead>
                    <tr>
                      <th>{t.packageDetail.colPax}</th>
                      <th>{t.packageDetail.colNoHotel}</th>
                      <th>{t.packageDetail.colHotel3}</th>
                      <th>{t.packageDetail.colHotel4}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>{t.packageDetail.row2pax}</strong></td>
                      <td className="price-col">{t.packageDetail.valConsult}</td>
                      <td className="price-col">{t.packageDetail.valRequest}</td>
                      <td className="price-col">{t.packageDetail.valRequest}</td>
                    </tr>
                    <tr>
                      <td><strong>{t.packageDetail.row3pax}</strong></td>
                      <td className="price-col">{t.packageDetail.valConsult}</td>
                      <td className="price-col">{t.packageDetail.valRequest}</td>
                      <td className="price-col">{t.packageDetail.valRequest}</td>
                    </tr>
                    <tr>
                      <td><strong>{t.packageDetail.row5pax}</strong></td>
                      <td className="price-col">{t.packageDetail.valConsult}</td>
                      <td className="price-col">{t.packageDetail.valRequest}</td>
                      <td className="price-col">{t.packageDetail.valRequest}</td>
                    </tr>
                    <tr>
                      <td><strong>{t.packageDetail.row7pax}</strong></td>
                      <td className="price-col">{t.packageDetail.valSpecialGroup}</td>
                      <td className="price-col">{t.packageDetail.valSpecialGroup}</td>
                      <td className="price-col">{t.packageDetail.valSpecialGroup}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="price-note">
                <em>{t.packageDetail.priceNote}</em>
              </p>

              {/* Booking Action Buttons (Online Booking Form + WhatsApp) */}
              <div className="whatsapp-booking-cta">
                <p><strong>{t.packageDetail.ctaQuestion}</strong></p>
                <BookingActionButtons packageSlug={pkg.slug} packageTitle={pkg.title} variant="inline" />
              </div>
            </div>

            {/* 6. TESTIMONIAL TAMU UNTUK PAKET INI */}
            <div className="detail-block">
              <h2>{t.packageDetail.reviewsTitle}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ color: '#f59e0b', marginBottom: '6px' }}>
                    <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                  </div>
                  <p style={{ fontSize: '13.5px', fontStyle: 'italic', color: 'var(--dark-soft)' }}>
                    {t.packageDetail.review1Text}
                  </p>
                  <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--dark)' }}>
                    {t.packageDetail.review1Author}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ color: '#f59e0b', marginBottom: '6px' }}>
                    <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                  </div>
                  <p style={{ fontSize: '13.5px', fontStyle: 'italic', color: 'var(--dark-soft)' }}>
                    {t.packageDetail.review2Text}
                  </p>
                  <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--dark)' }}>
                    {t.packageDetail.review2Author}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          <aside className="detail-sidebar">
            
            {/* Booking Card */}
            <div className="sidebar-card">
              <div className="sidebar-price-header">
                <span className="sidebar-price-label">{t.packageDetail.sidebarFrom}</span>
                <span className="sidebar-price-amount">{convertPriceString(pkg.pricePlaceholder)}</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{t.packageDetail.sidebarPerPax}</span>
              </div>

              <ul className="sidebar-features">
                <li><i className="fa fa-check-circle"></i> {pkg.duration}</li>
                <li><i className="fa fa-check-circle"></i> {pkg.type}</li>
                <li><i className="fa fa-check-circle"></i> {t.packageDetail.sidebarCar}</li>
                <li><i className="fa fa-check-circle"></i> {t.packageDetail.sidebarDriver}</li>
                <li><i className="fa fa-check-circle"></i> {t.packageDetail.sidebarTickets}</li>
              </ul>

              <BookingActionButtons packageSlug={pkg.slug} packageTitle={pkg.title} variant="sidebar" />

              <div style={{ textAlign: 'center', marginTop: '14px' }}>
                <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                  <i className="fa fa-lock"></i> {t.packageDetail.sidebarFastResp}
                </span>
              </div>
            </div>

            {/* Local Host Badge Card */}
            <div className="sidebar-card" style={{ backgroundColor: 'var(--primary-soft)', borderColor: 'rgba(24, 90, 56, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  <i className="fa fa-map-marker"></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-dark)' }}>{t.packageDetail.basecampTitle}</h4>
                  <span style={{ fontSize: '12px', color: 'var(--primary)' }}>{t.packageDetail.basecampSubtitle}</span>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--dark-soft)', lineHeight: 1.5 }}>
                {t.packageDetail.basecampDesc}
              </p>
              <Link href="/#custom-trip" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textDecoration: 'underline', display: 'inline-block', marginTop: '8px' }}>
                {t.packageDetail.basecampLink}
              </Link>
            </div>

          </aside>

        </div>
      </div>

      {/* RELATED PACKAGES */}
      <section className="related-packages-section">
        <div className="box1140">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
            <div>
              <span className="section-tag">{t.packageDetail.relatedTag}</span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--dark)' }}>{t.packageDetail.relatedTitle}</h2>
            </div>
            <Link href="/#paket-wisata" style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--primary)' }}>
              {t.packageDetail.viewAllPkgs} <i className="fa fa-arrow-right"></i>
            </Link>
          </div>

          <div className="packages-grid">
            {relatedPackages.map((rel) => (
              <div key={rel.slug} className="package-card">
                <div className="card-img-wrapper" style={{ height: '180px' }}>
                  <img src={rel.image} alt={rel.title} />
                  <span className="card-badge">{rel.duration}</span>
                </div>
                <div className="package-card-body" style={{ padding: '16px' }}>
                  <h3 className="package-title" style={{ fontSize: '16px' }}>{rel.title}</h3>
                  <p className="package-desc" style={{ fontSize: '12.5px' }}>{rel.shortDesc}</p>
                  <div className="package-card-footer">
                    <span className="price-value" style={{ fontSize: '14px' }}>
                      {convertPriceString(rel.pricePlaceholder)}
                    </span>
                    <Link href={`/paket/${rel.slug}`} className="btn-detail" style={{ fontSize: '12px', padding: '6px 12px' }}>
                      {t.buttons.viewDetail}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
