import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import packagesData from '@/data/packages.json';
import { TourPackage } from '@/types';
import GalleryThumbnails from '@/components/GalleryThumbnails';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const packages: TourPackage[] = packagesData as TourPackage[];
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const packages: TourPackage[] = packagesData as TourPackage[];
  const pkg = packages.find((p) => p.slug === slug);

  if (!pkg) {
    return {
      title: 'Paket Wisata Tidak Ditemukan — Lombok_Travelers',
    };
  }

  return {
    title: `${pkg.title} — Lombok_Travelers`,
    description: pkg.shortDesc,
    openGraph: {
      title: `${pkg.title} — Lombok_Travelers`,
      description: pkg.shortDesc,
      images: [
        {
          url: pkg.image,
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const packages: TourPackage[] = packagesData as TourPackage[];
  const pkg = packages.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  const relatedPackages = packages.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.description,
    touristType: 'Leisure',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: '0',
      availability: 'https://schema.org/InStock',
      url: `https://lomboktravelers.com/paket/${pkg.slug}`,
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Lombok_Travelers',
      url: 'https://lomboktravelers.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* DETAIL HERO & BREADCRUMB */}
      <div className="detail-hero" style={{ backgroundImage: `url('${pkg.image}')` }}>
        <div className="detail-hero-overlay"></div>
        <div className="box1140 detail-hero-content">
          <nav className="breadcrumb-nav">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/#paket-wisata">Paket Wisata Lombok</Link>
            <span>›</span>
            <strong>{pkg.title}</strong>
          </nav>

          <h1 className="detail-title font-editorial">
            {pkg.title} {pkg.subtitle ? `(${pkg.subtitle})` : ''}
          </h1>

          <div className="detail-meta-pills">
            <span className="meta-pill"><i className="fa fa-clock-o"></i> {pkg.duration}</span>
            <span className="meta-pill"><i className="fa fa-users"></i> {pkg.type}</span>
            <span className="meta-pill"><i className="fa fa-map-marker"></i> {pkg.location}</span>
            <span className="meta-pill highlight"><i className="fa fa-tag"></i> Mulai dari: {pkg.pricePlaceholder}</span>
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
              <h2>Deskripsi Paket</h2>
              <p className="detail-desc-text">
                {pkg.description}
              </p>
            </div>

            {/* 3. ITINERARY TIMETABLE */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="detail-block">
                <h2>Rencana Perjalanan (Itinerary)</h2>

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
              <h2>Fasilitas Paket</h2>
              <div className="inc-exc-grid">
                
                {/* Termasuk */}
                <div className="inc-box">
                  <h3 className="inc-title"><i className="fa fa-check-circle"></i> Paket Termasuk:</h3>
                  <ul className="inc-list">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i}><i className="fa fa-check"></i> {inc}</li>
                    ))}
                  </ul>
                </div>

                {/* Tidak Termasuk */}
                <div className="exc-box">
                  <h3 className="exc-title"><i className="fa fa-times-circle"></i> Paket Tidak Termasuk:</h3>
                  <ul className="exc-list">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i}><i className="fa fa-times"></i> {exc}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Extra Documentation Addons Banner */}
              <div className="extra-addons-box">
                <h4><i className="fa fa-video-camera"></i> Layanan Tambahan Dokumentasi Profesional</h4>
                <div className="addons-grid">
                  <div className="addon-item">
                    <i className="fa fa-paper-plane-o addon-icon"></i>
                    <div className="addon-text">
                      <strong>Dokumentasi Drone (Footage Udara HD)</strong>
                      <span>Pilot drone profesional + RAW footage pantai & bukit Lombok: Konsultasikan / Rp 750.000/hari</span>
                    </div>
                  </div>
                  <div className="addon-item">
                    <i className="fa fa-film addon-icon"></i>
                    <div className="addon-text">
                      <strong>Video Sinematik + Editing Reels Instagram/TikTok</strong>
                      <span>Kamera mirrorless & underwater GoPro + edited video siap upload: Konsultasikan / Rp 1.500.000/trip</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. HARGA PAKET */}
            <div className="detail-block">
              <h2>Harga {pkg.title}</h2>
              <p style={{ fontSize: '14px', color: 'var(--dark-soft)', marginBottom: '14px' }}>
                Harga dihitung per orang (pax) disesuaikan dengan jumlah rombongan dan pilihan kelas penginapan:
              </p>

              <table className="price-table">
                <thead>
                  <tr>
                    <th>Jumlah Peserta</th>
                    <th>Paket Tanpa Hotel</th>
                    <th>Paket Hotel Bintang 3</th>
                    <th>Paket Hotel Bintang 4</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>2 Orang (Pasangan/Duet)</strong></td>
                    <td className="price-col">Konsultasikan</td>
                    <td className="price-col">Request Price</td>
                    <td className="price-col">Request Price</td>
                  </tr>
                  <tr>
                    <td><strong>3 – 4 Orang (Keluarga Kecil)</strong></td>
                    <td className="price-col">Konsultasikan</td>
                    <td className="price-col">Request Price</td>
                    <td className="price-col">Request Price</td>
                  </tr>
                  <tr>
                    <td><strong>5 – 6 Orang (Grup Sedang)</strong></td>
                    <td className="price-col">Konsultasikan</td>
                    <td className="price-col">Request Price</td>
                    <td className="price-col">Request Price</td>
                  </tr>
                  <tr>
                    <td><strong>7 – 12+ Orang (Rombongan HiAce)</strong></td>
                    <td className="price-col">Spesial Grup</td>
                    <td className="price-col">Spesial Grup</td>
                    <td className="price-col">Spesial Grup</td>
                  </tr>
                </tbody>
              </table>

              <p className="price-note">
                * <em>Harga dapat disesuaikan berdasarkan jumlah peserta, periode liburan (High/Peak Season Lebaran, Natal & Tahun Baru), serta preferensi hotel. Hubungi tim Lombok_Travelers untuk penawaran terbaik dan diskon khusus rombongan.</em>
              </p>

              {/* Large WhatsApp Booking CTA Button */}
              <div className="whatsapp-booking-cta">
                <p><strong>Sudah punya rencana tanggal perjalanan?</strong> Hubungi kami langsung untuk mengecek ketersediaan armada, driver, dan diskon paket:</p>
                <a
                  href={`https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20tertarik%20untuk%20pesan%20${encodeURIComponent(pkg.title)}.%20Mohon%20info%20penawaran%20harga%20dan%20ketersediaan.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa-booking-lg"
                >
                  <i className="fa fa-whatsapp" style={{ fontSize: '22px' }}></i> Pesan Paket Ini via WhatsApp
                </a>
              </div>
            </div>

            {/* 6. TESTIMONIAL TAMU UNTUK PAKET INI */}
            <div className="detail-block">
              <h2>Ulasan Tamu Paket Ini</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ color: '#f59e0b', marginBottom: '6px' }}>
                    <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                  </div>
                  <p style={{ fontSize: '13.5px', fontStyle: 'italic', color: 'var(--dark-soft)' }}>
                    &quot;Program perjalanan sangat pas temponya, tidak buru-buru. Guide supirnya dari Tetebatu sangat ramah dan sabar menemani keluarga kami. Pemandangan Lombok luar biasa indah!&quot;
                  </p>
                  <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--dark)' }}>
                    — Mas Dimas & Keluarga (Jakarta)
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <div style={{ color: '#f59e0b', marginBottom: '6px' }}>
                    <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                  </div>
                  <p style={{ fontSize: '13.5px', fontStyle: 'italic', color: 'var(--dark-soft)' }}>
                    &quot;Makanan lokalnya enak-enak, mobilnya bersih dan wangi. Pelayanan transparan tanpa biaya aneh-aneh di lapangan. Terima kasih Lombok_Travelers!&quot;
                  </p>
                  <div style={{ marginTop: '8px', fontSize: '12px', fontWeight: 700, color: 'var(--dark)' }}>
                    — Ibu Ratna (Surabaya)
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
                <span className="sidebar-price-label">Mulai dari</span>
                <span className="sidebar-price-amount">{pkg.pricePlaceholder}</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>per orang / {pkg.type.toLowerCase()}</span>
              </div>

              <ul className="sidebar-features">
                <li><i className="fa fa-check-circle"></i> Durasi: {pkg.duration}</li>
                <li><i className="fa fa-check-circle"></i> Tipe: {pkg.type}</li>
                <li><i className="fa fa-check-circle"></i> Transport Mobil Ber-AC</li>
                <li><i className="fa fa-check-circle"></i> Driver Lokal Asli Sasak</li>
                <li><i className="fa fa-check-circle"></i> Tiket Wisata & Parkir</li>
              </ul>

              <a
                href={`https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20tanya%20booking%20${encodeURIComponent(pkg.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sidebar-wa"
              >
                <i className="fa fa-whatsapp"></i> Booking via WhatsApp
              </a>

              <div style={{ textAlign: 'center', marginTop: '14px' }}>
                <span style={{ fontSize: '11.5px', color: 'var(--muted)' }}><i className="fa fa-lock"></i> Respon cepat dalam 5 - 15 menit</span>
              </div>
            </div>

            {/* Local Host Badge Card */}
            <div className="sidebar-card" style={{ backgroundColor: 'var(--primary-soft)', borderColor: 'rgba(24, 90, 56, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                  <i className="fa fa-map-marker"></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-dark)' }}>Tetebatu Base Camp</h4>
                  <span style={{ fontSize: '12px', color: 'var(--primary)' }}>Lombok Timur Travel Partner</span>
                </div>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--dark-soft)', lineHeight: 1.5 }}>
                Ingin mengubah rute atau menambah destinasi Tetebatu & Sembalun ke paket ini? Kami siap menyesuaikan itinerary sesuai keinginan Anda!
              </p>
              <Link href="/#custom-trip" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textDecoration: 'underline', display: 'inline-block', marginTop: '8px' }}>
                Ajukan Custom Itinerary ›
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
              <span className="section-tag">Pilihan Lainnya</span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--dark)' }}>Paket Wisata Terkait</h2>
            </div>
            <Link href="/#paket-wisata" style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--primary)' }}>
              Lihat Semua Paket <i className="fa fa-arrow-right"></i>
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
                    <span className="price-value" style={{ fontSize: '14px' }}>{rel.pricePlaceholder}</span>
                    <Link href={`/paket/${rel.slug}`} className="btn-detail" style={{ fontSize: '12px', padding: '6px 12px' }}>
                      Lihat Detail
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
