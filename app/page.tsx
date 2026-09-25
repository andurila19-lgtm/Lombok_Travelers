'use client';

import { useState } from 'react';
import Link from 'next/link';
import packagesData from '@/data/packages.json';
import dailyTrips from '@/data/dailyTrips.json';
import { TourPackage, DailyTrip } from '@/types';
import SearchBar from '@/components/SearchBar';
import PackageList from '@/components/PackageList';
import CustomTripForm from '@/components/CustomTripForm';
import ConciergeTrigger from '@/components/ConciergeTrigger';
import FaqSection, { faqsData } from '@/components/FaqSection';
import BookingModal from '@/components/BookingModal';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language, t, convertPriceString } = useLanguage();
  const packages: TourPackage[] = packagesData as TourPackage[];
  const trips: DailyTrip[] = dailyTrips as DailyTrip[];

  // State for Transport Vehicle Booking Modal
  const [isVehicleBookingOpen, setIsVehicleBookingOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({ title: '', slug: '' });

  const handleOpenVehicleBooking = (title: string, slug: string) => {
    setSelectedVehicle({ title, slug });
    setIsVehicleBookingOpen(true);
  };

  const featuredFleets = [
    {
      id: 'innova',
      name: 'Toyota Innova Reborn',
      badge: language === 'en' ? 'Most Popular' : 'Paling Populer',
      badgeClass: 'home-fleet-badge-pop',
      category: language === 'en' ? 'Medium MPV Premium' : 'Medium MPV Premium',
      capacity: '6 - 7 Seat',
      transmission: 'Automatic',
      ac: 'Double Blower',
      price: 'Rp 850.000 / 12 Jam',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
      features: [
        language === 'en' ? 'Courteous native Sasak driver included' : 'Include Supir Ramah Asli Sasak',
        language === 'en' ? 'Fuel / BBM completely covered' : 'BBM / Bensin Sudah Termasuk',
        language === 'en' ? 'Cool dual AC & USB charging port' : 'Full AC Dingin & Port Charger USB',
      ],
    },
    {
      id: 'avanza',
      name: 'All New Avanza / Xenia',
      badge: language === 'en' ? 'Best Value' : 'Best Value',
      badgeClass: 'home-fleet-badge-val',
      category: language === 'en' ? 'Family MPV Budget' : 'MPV Keluarga Hemat',
      capacity: '5 - 6 Seat',
      transmission: 'Manual / Matic',
      ac: 'Full AC Dingin',
      price: 'Rp 550.000 / 12 Jam',
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
      features: [
        language === 'en' ? 'Punctual experienced driver' : 'Include Supir Berpengalaman',
        language === 'en' ? 'Fuel / BBM completely covered' : 'BBM / Bensin Sudah Termasuk',
        language === 'en' ? 'Spacious luggage trunk & clean interior' : 'Bersih, Wangi & Bagasi Koper Luas',
      ],
    },
    {
      id: 'hiace-commuter',
      name: 'Toyota HiAce Commuter',
      badge: language === 'en' ? 'Group & Family' : 'Rombongan & Grup',
      badgeClass: 'home-fleet-badge-grp',
      category: language === 'en' ? 'Spacious Tour Minibus' : 'Minibus Wisata Luas',
      capacity: '12 - 14 Seat',
      transmission: 'Manual',
      ac: 'Triple Blower Dingin',
      price: 'Rp 1.250.000 / 12 Jam',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      features: [
        language === 'en' ? 'High roof ceiling, easy walk inside' : 'Kabin Tinggi Nyaman Berdiri',
        language === 'en' ? 'Generous extra luggage room' : 'Bagasi Ekstra Besar Khusus Tour',
        language === 'en' ? 'Driver + Fuel included all-day' : 'Include Supir Khusus Tour + BBM',
      ],
    },
  ];

  const servicePillars = [
    {
      icon: 'fa-plane',
      title: language === 'en' ? 'Airport Transfer On-Time' : 'Airport Transfer Tepat Waktu',
      desc: language === 'en'
        ? 'Punctual pick-up/drop-off BIL Airport to Tetebatu, Mataram, Senggigi, Kuta & Bangsal.'
        : 'Antar-jemput tepat waktu Bandara Lombok (BIL) ke Tetebatu, Mataram, Senggigi & Kuta.',
    },
    {
      icon: 'fa-tint',
      title: language === 'en' ? 'All-Inclusive (Driver + BBM)' : 'Paket All-In (Driver + BBM)',
      desc: language === 'en'
        ? 'No hidden surprises. Car, experienced driver, and fuel are 100% included in the rate.'
        : 'Bebas biaya tersembunyi, BBM dan supir ramah asli Sasak sudah termasuk dalam tarif sewa.',
    },
    {
      icon: 'fa-id-card-o',
      title: language === 'en' ? 'Driver as Local Guide' : 'Driver Merangkap Guide',
      desc: language === 'en'
        ? 'Courteous native Sasak drivers guiding you along scenic routes at an unhurried pace.'
        : 'Supir lokal yang santun, informatif, dan siap memandu rute wisata terbaik tanpa buru-buru.',
    },
    {
      icon: 'fa-shield',
      title: language === 'en' ? '100% Private & Spotless' : '100% Private & Higienis',
      desc: language === 'en'
        ? 'Sanitized, cool AC vehicles exclusively for your group, never mixed with others.'
        : 'Mobil bersih, ber-AC dingin, wangi, dan khusus rombongan Anda tanpa dicampur orang lain.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsData.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* 2. HERO SLIDER BANNER (Matching Screenshot Exactly) */}
      <section
        className="hero-benchmark-wrapper"
        style={{ backgroundImage: "url('/images/rinjani_hero.jpg')" }}
      >
        <div className="hero-benchmark-overlay"></div>
        <div className="dschome">
          <strong>{t.hero.headline}</strong>
          <span className="hero-dest-line">{t.hero.subline}</span>
          <span>{t.hero.description}</span>
        </div>
      </section>

      {/* SEARCH BAR (#srchome Deep Blue matching screenshot) */}
      <SearchBar />

      {/* 3. WHY CHOOSE US (#why with purple circular icons matching screenshot) */}
      <section id="why">
        <div className="box1140">
          <div className="why-title-wrap">
            <h2>
              {t.why.title1}<br />{t.why.title2}
            </h2>
          </div>

          <div className="why-container-grid">
            {/* Feature 1 */}
            <div className="why">
              <div className="why-icon-circle">
                <i className="fa fa-cogs" aria-hidden="true"></i>
              </div>
              <h3>{t.why.features[0]?.title}</h3>
              <p>{t.why.features[0]?.desc}</p>
            </div>

            {/* Feature 2 */}
            <div className="why">
              <div className="why-icon-circle">
                <i className="fa fa-users" aria-hidden="true"></i>
              </div>
              <h3>{t.why.features[1]?.title}</h3>
              <p>{t.why.features[1]?.desc}</p>
            </div>

            {/* Feature 3 */}
            <div className="why">
              <div className="why-icon-circle">
                <i className="fa fa-camera" aria-hidden="true"></i>
              </div>
              <h3>{t.why.features[2]?.title}</h3>
              <p>{t.why.features[2]?.desc}</p>
            </div>

            {/* Feature 4 */}
            <div className="why">
              <div className="why-icon-circle">
                <i className="fa fa-camera-retro" aria-hidden="true"></i>
              </div>
              <h3>{t.why.features[3]?.title}</h3>
              <p>{t.why.features[3]?.desc}</p>
            </div>

            {/* Feature 5 */}
            <div className="why">
              <div className="why-icon-circle">
                <i className="fa fa-shield" aria-hidden="true"></i>
              </div>
              <h3>{t.why.features[4]?.title}</h3>
              <p>{t.why.features[4]?.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PAKET WISATA LOMBOK (#paket) */}
      <section className="packages-section" id="paket-wisata">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">{t.packages.tag}</span>
            <h2 className="section-title">{t.packages.title}</h2>
            <p className="section-subtitle">{t.packages.subtitle}</p>
          </div>

          {/* Interactive Package Cards with Category Tabs */}
          <PackageList packages={packages} />
        </div>
      </section>

      {/* 5. TRIP HARIAN (#pharian 8 Cards Grid) */}
      <section className="harian-section" id="pharian">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">{t.daily.tag}</span>
            <h2 className="section-title">{t.daily.title}</h2>
            <p className="section-subtitle">{t.daily.subtitle}</p>
          </div>

          <div className="harian-grid">
            {trips.map((trip) => (
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
                  <div className="harian-footer">
                    <div>
                      <span className="harian-price-text">
                        {language === 'en' ? 'Starting from' : 'Mulai dari'}
                      </span>
                      <span className="harian-price-val">{trip.price}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <Link
                        href="/trip-harian"
                        className="btn-card-secondary"
                      >
                        {language === 'en' ? 'Detail' : 'Detail'}
                      </Link>
                      <a
                        href={`https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20tanya%20Trip%20Harian:%20${encodeURIComponent(trip.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-card-primary"
                      >
                        <i className="fa fa-calendar-check-o"></i> {language === 'en' ? 'Book' : 'Booking'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DESTINASI PILIHAN LOMBOK (Visual Grid) */}
      <section className="destinations-section" id="destinasi">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">{t.destinations.tag}</span>
            <h2 className="section-title">{t.destinations.title}</h2>
            <p className="section-subtitle">{t.destinations.subtitle}</p>
          </div>

          <div className="destinations-grid">
            <div className="destination-card">
              <img src="/images/hero_tetebatu.png" alt="Tetebatu" />
              <div className="destination-overlay">
                <h3>Tetebatu</h3>
                <p>{language === 'en' ? 'Lush rice terraces & cool mountain breeze at Rinjani foot' : 'Terasering sawah asri & udara sejuk kaki Rinjani'}</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="/images/sembalun_bukit_selong.jpg" alt="Sembalun" />
              <div className="destination-overlay">
                <h3>Sembalun</h3>
                <p>{language === 'en' ? 'Spectacular volcanic valley & highland strawberry farms' : 'Lembah spektakuler & perkebunan stroberi'}</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr6U-cNCJReQAZiOIE9vEdk8RuA0b1ETWGkY9n0Dl4Y1S3aIvXg3BU-q6qa9DkD0AInIqEeQDraSgIyWfIndC_mmvKgO53RDefYqG8hrmIBgDxOpDYauPw7ljyl56Lk_SkJdVttpxGLZBTM35qlNCtc4MpNHuJfqpXiP5n8-lZQUezllR6qzmTf5Hrxp-akG7lvK6kXQ4Vh5mgvF4aQeI6zWqBHXNNnYaZKzifeQ0w0T3hFJ-dqG6g" alt="Kuta Mandalika" />
              <div className="destination-overlay">
                <h3>Kuta Mandalika</h3>
                <p>{language === 'en' ? 'Exotic beaches & international MotoGP racing circuit' : 'Pantai eksotis & sirkuit bertaraf internasional'}</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTbrGKinn1UKKBKH5wRoFYMO3R8yEVpHdEpf7bBfdTu1nUYYcTDECjmX12CZ_8eXyhRDJTK7jeZ11Fvs6hUY1rjly963y0tNadfutl_Ulv4cBK0mf3-gJkIaQHKav7mfW4VHPl3xOi-xjEhR7cHtaRfd_D0wC1wQrmXHMkRG-_hjmSGsYlAEv3v4wd3m9y_i2mQmxWZ_N_7_lHESWsTLMh79ooo4HaVGxc33YlnLlZDIyoI0Ajhya_" alt="Pink Beach" />
              <div className="destination-overlay">
                <h3>Pink Beach</h3>
                <p>{language === 'en' ? 'Rare pink coral sand & crystal clear bay in East Lombok' : 'Keunikan pasir merah muda di Lombok Timur'}</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="/images/gili_snorkeling.jpg" alt="Gili Trawangan" />
              <div className="destination-overlay">
                <h3>Gili Trawangan</h3>
                <p>{language === 'en' ? 'Turquoise water, wild sea turtles & serene car-free sunsets' : 'Air jernih, penyu laut & sunset tanpa polusi'}</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXFiA-A1V3lxkRRq1TLYKAH--twJKYdv7yCAGetDcM84zUeDJarsMPI2qvt39BjQE76dYaIIf-EMmuak1VoQdhMdLyQq5w9OqNpwGFLKCnFYWuqvgrpupnt3StPM1Jk9N-5fRlRdaSnboo6KiuDoRoF_9tTyAN9r0-HUfh8_G2KUrUauRC90tK01QtnyKOHEHKmS2BrJzKu6PFV8ocCjXiYvb2xC21czJCcPdmhzzhbCkz5W-06V0o" alt="Gili Nanggu" />
              <div className="destination-overlay">
                <h3>Gili Nanggu</h3>
                <p>{language === 'en' ? 'Peaceful natural marine aquarium with colorful reef fish' : 'Snorkeling aquarium alami yang tenang di selatan'}</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrdhTpDoO05VhKgf5uHhx2JjbLtWULHXfgSyWL9rMRw-hFYF76-JmxErOFqEpEwl1ZZAMgZMe_Ozyn6mGabgWSEZqiHbfqQEqx5_Q3VZyTyIRgujTXtGIKn1C-asysxMLe59NN3Fm8pb4GdjSaHBM2Z8aPg2PttvZ8uaJimjRXRJV69j9T05sb_H4Z61ndjaOTHFg9eNg3zA2ZVg0SvLAPwRle3pep5MdanbQtu8ZHod5AuYWCfpm3" alt="Senaru Waterfalls" />
              <div className="destination-overlay">
                <h3>Senaru & Rinjani Gate</h3>
                <p>{language === 'en' ? 'Sendang Gile & Tiu Kelep twin jungle waterfalls' : 'Air terjun magis Sendang Gile & Tiu Kelep'}</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBrPkUh5toEjBLPEVl-9WAF3WSi2xhWxzA0oFfnqnkG1SeJfgVj5uCS6mBef2FT9BYn_H57hM8k3VOZVB5wnenbI3970YR6MMgBB0BTzDf7bsqlmzljmnsOBteQZ1a0RIM76c9cOGnJnCYWzGQpbmsUDH2E80qFM0jcN0HC_fHQ6AKxB_XmCnJGheW0a8ZB0cg6FYBqvvzYmDyOkM0icuwdT_4YQJa85GhT6DIDmyUM26u01qlumJ1" alt="East Lombok" />
              <div className="destination-overlay">
                <h3>East Lombok Heritage</h3>
                <p>{language === 'en' ? 'Gili Kondo, ancient giant trees & traditional coastal life' : 'Gili Kondo, Pohon Purba & kehidupan bahari lokal'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOM TRIP (Punya Rencana Perjalanan Sendiri?) */}
      <section className="custom-trip-section" id="custom-trip">
        <div className="box1140">
          <div className="custom-trip-container">
            <div className="custom-trip-info">
              <span className="section-tag">{t.customTrip.tag}</span>
              <h2 className="font-editorial">{t.customTrip.title}</h2>
              <p>{t.customTrip.subtitle}</p>

              <div className="custom-features-list">
                <div className="custom-feature-item">
                  <i className="fa fa-calendar-check-o"></i>{' '}
                  {language === 'en' ? 'Flexible travel dates & customized durations' : 'Fleksibel menentukan tanggal & durasi trip'}
                </div>
                <div className="custom-feature-item">
                  <i className="fa fa-car"></i>{' '}
                  {language === 'en' ? 'Pick-up anywhere (Airport, Harbor, Hotel)' : 'Penjemputan di mana saja (Bandara, Pelabuhan, Hotel)'}
                </div>
                <div className="custom-feature-item">
                  <i className="fa fa-map-marker"></i>{' '}
                  {language === 'en' ? 'Freely mix & match destinations of your interest' : 'Kombinasi destinasi bebas sesuai minat Anda'}
                </div>
                <div className="custom-feature-item">
                  <i className="fa fa-users"></i>{' '}
                  {language === 'en' ? 'Perfect for solo travelers, couples, families & corporate groups' : 'Cocok untuk solo traveler, pasangan, keluarga & grup kantor'}
                </div>
              </div>

              <div style={{ background: 'rgba(24, 90, 56, 0.08)', padding: '14px 18px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                <strong style={{ color: 'var(--primary)', fontSize: '13.5px', display: 'block', marginBottom: '2px' }}>
                  {language === 'en' ? 'Free Instant WhatsApp Consultation' : 'Konsultasi Gratis Langsung via WhatsApp'}
                </strong>
                <span style={{ fontSize: '12.5px', color: 'var(--dark-soft)' }}>
                  {language === 'en'
                    ? 'Our local team responds promptly with clear schedules and transparent pricing.'
                    : 'Tim lokal kami akan merespons dengan rincian jadwal dan estimasi biaya transparan.'}
                </span>
              </div>
            </div>

            <CustomTripForm />
          </div>
        </div>
      </section>

      {/* 8. TRANSPORTASI LOMBOK (Redesigned: High-Converting Featured Fleet & 4 Value Pillars) */}
      <section className="transport-section" id="transport">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">{t.transport.tag}</span>
            <h2 className="section-title">{t.transport.title}</h2>
            <p className="section-subtitle">
              {language === 'en'
                ? 'Spotless vehicles inclusive of friendly local Sasak driver + fuel for your ultimate holiday comfort across Lombok.'
                : 'Pilihan armada bersih dan terawat dengan layanan All-Inclusive (Mobil + Supir Lokal Ramah + BBM) siap mengantar liburan Anda keliling Lombok.'}
            </p>
          </div>

          {/* 3 Featured Best-Seller Fleets */}
          <div className="home-fleet-grid">
            {featuredFleets.map((car) => (
              <div key={car.id} className="home-fleet-card">
                <div className="home-fleet-img-box">
                  <img src={car.image} alt={car.name} loading="lazy" />
                  <span className="home-fleet-badge-top">All-In Driver & BBM</span>
                  <span className={car.badgeClass}>{car.badge}</span>
                </div>

                <div className="home-fleet-body">
                  <h3 className="home-fleet-title">{car.name}</h3>
                  <span className="home-fleet-cat">{car.category}</span>

                  <div className="home-fleet-specs">
                    <span className="home-fleet-spec-pill">
                      <i className="fa fa-users"></i> {car.capacity}
                    </span>
                    <span className="home-fleet-spec-pill">
                      <i className="fa fa-cog"></i> {car.transmission}
                    </span>
                    <span className="home-fleet-spec-pill">
                      <i className="fa fa-snowflake-o"></i> {car.ac}
                    </span>
                  </div>

                  <ul className="home-fleet-features">
                    {car.features.map((feat, idx) => (
                      <li key={idx}>
                        <i className="fa fa-check-circle"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="home-fleet-price-row">
                    <span className="home-fleet-price-label">{language === 'en' ? 'Rental Rate:' : 'Tarif Sewa:'}</span>
                    <span className="home-fleet-price-val">{convertPriceString(car.price)}</span>
                  </div>

                  <div className="home-fleet-actions">
                    <button
                      type="button"
                      className="home-fleet-btn-book"
                      onClick={() => handleOpenVehicleBooking(`Sewa ${car.name}`, `sewa-${car.id}`)}
                    >
                      <i className="fa fa-calendar-check-o"></i>
                      <span>{language === 'en' ? 'Book Now' : 'Booking'}</span>
                    </button>
                    <a
                      href={`https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20tertarik%20sewa%20mobil%20${encodeURIComponent(car.name)}%20(${encodeURIComponent(car.price)}).%20Mohon%20info%20ketersediaan.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-fleet-btn-wa"
                    >
                      <i className="fa fa-whatsapp"></i>
                      <span>Chat WA</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Balanced Service Guarantees */}
          <div className="transport-pillars-grid">
            {servicePillars.map((pillar, i) => (
              <div key={i} className="transport-pillar-card">
                <div className="transport-pillar-icon">
                  <i className={`fa ${pillar.icon}`}></i>
                </div>
                <h4>{pillar.title}</h4>
                <p>{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Dual Action Buttons */}
          <div className="transport-action-bar">
            <Link href="/transport" className="btn-transport-all">
              <i className="fa fa-car"></i>
              <span>{language === 'en' ? 'View All 6 Fleets & Full Pricelist' : 'Lihat Semua 6 Armada & Daftar Tarif Lengkap'}</span>
              <i className="fa fa-arrow-right" style={{ fontSize: '12px' }}></i>
            </Link>
            <a
              href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20konsultasi%20rute%20dan%20sewa%20mobil%20di%20Lombok."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-transport-wa-all"
            >
              <i className="fa fa-whatsapp" style={{ color: '#25d366', fontSize: '16px' }}></i>
              <span>{language === 'en' ? 'Custom Route Consultation (Free)' : 'Konsultasi Rute Sewa (Gratis via WA)'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER / GALLERY (Moments From Lombok) */}
      <section className="gallery-section" id="gallery">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">{t.gallery.tag}</span>
            <h2 className="section-title">{t.gallery.title}</h2>
            <p className="section-subtitle">{t.gallery.subtitle}</p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item span-2">
              <img src="/images/hero_tetebatu.png" alt="Traveler di Tetebatu" />
              <div className="gallery-caption">
                {language === 'en' ? 'Morning Walk in Tetebatu Rice Terraces' : 'Trekking Pagi di Terasering Tetebatu'}
              </div>
            </div>

            <div className="gallery-item">
              <img src="/images/gili_snorkeling.jpg" alt="Snorkeling Gili Trawangan" />
              <div className="gallery-caption">
                {language === 'en' ? 'Sea Turtle Snorkeling at Gili Meno' : 'Snorkeling Penyu di Gili Meno'}
              </div>
            </div>

            <div className="gallery-item">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrdhTpDoO05VhKgf5uHhx2JjbLtWULHXfgSyWL9rMRw-hFYF76-JmxErOFqEpEwl1ZZAMgZMe_Ozyn6mGabgWSEZqiHbfqQEqx5_Q3VZyTyIRgujTXtGIKn1C-asysxMLe59NN3Fm8pb4GdjSaHBM2Z8aPg2PttvZ8uaJimjRXRJV69j9T05sb_H4Z61ndjaOTHFg9eNg3zA2ZVg0SvLAPwRle3pep5MdanbQtu8ZHod5AuYWCfpm3" alt="Air Terjun Lombok" />
              <div className="gallery-caption">
                {language === 'en' ? 'Refreshing Waterfalls at Rinjani Foot' : 'Segarnya Air Terjun Kaki Rinjani'}
              </div>
            </div>

            <div className="gallery-item">
              <img src="/images/sembalun_bukit_selong.jpg" alt="Panorama Sembalun" />
              <div className="gallery-caption">
                {language === 'en' ? 'Panoramic Splendor of Bukit Selong Sembalun' : 'Keindahan Bukit Selong Sembalun'}
              </div>
            </div>

            <div className="gallery-item">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD20oVTklMxySleHhwOdOVE5unl6u6NT6UVKKyMH1RY6ztOgmAvSWbgozoljKK4sbHXeQLGH2DSZJlFBrJLMaovcbubo8WazM5JZgAgm6mXcCfXqOmHnqwl_3lmrfONEAzPlDU_DQA8nxUUzjOfEy_2jlY9KpIEsPB1VFvSR1ArSJXR7YnRTtyAh9J8og4Hnk2Gwx-D4i4FvaMmIa1bBPDVDdq36xzTwPAoSPoQIjb2H2o2qcXB8x5P" alt="Tenun Sukarara" />
              <div className="gallery-caption">
                {language === 'en' ? 'Traditional Sasak Handweaving in Sukarara' : 'Belajar Menenun di Desa Sukarara'}
              </div>
            </div>

            <div className="gallery-item span-2">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr6U-cNCJReQAZiOIE9vEdk8RuA0b1ETWGkY9n0Dl4Y1S3aIvXg3BU-q6qa9DkD0AInIqEeQDraSgIyWfIndC_mmvKgO53RDefYqG8hrmIBgDxOpDYauPw7ljyl56Lk_SkJdVttpxGLZBTM35qlNCtc4MpNHuJfqpXiP5n8-lZQUezllR6qzmTf5Hrxp-akG7lvK6kXQ4Vh5mgvF4aQeI6zWqBHXNNnYaZKzifeQ0w0T3hFJ-dqG6g" alt="Sunset Bukit Merese" />
              <div className="gallery-caption">
                {language === 'en' ? 'Golden Hour over Bukit Merese Mandalika' : 'Golden Hour di Bukit Merese Mandalika'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIAL (Testimonial dari Tamu Kami) */}
      <section className="testimonial-section" id="testimonial">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">{t.testimonials.tag}</span>
            <h2 className="section-title">{t.testimonials.title}</h2>
            <p className="section-subtitle">{t.testimonials.subtitle}</p>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div>
                <div className="testi-stars">
                  <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                </div>
                <p className="testi-text">
                  {language === 'en'
                    ? '"Our 3D2N private trip with Lombok_Travelers was truly unforgettable! The local guide was a native of Tetebatu, super friendly, knew all the best photo spots, and our children were very comfortable throughout the journey."'
                    : '"Private trip 3H2M bersama Lombok_Travelers sangat berkesan! Guide lokalnya asli Tetebatu, sangat ramah, paham spot foto terbaik, dan anak-anak kami sangat nyaman selama di jalan."'}
                </p>
              </div>
              <div className="testi-author">
                <div className="author-avatar">R</div>
                <div className="author-info">
                  <h4>Rian & Keluarga</h4>
                  <span>{language === 'en' ? 'Family Trip Jakarta • 3D2N Package' : 'Family Trip Jakarta • Paket 3H2M'}</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div>
                <div className="testi-stars">
                  <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                </div>
                <p className="testi-text">
                  {language === 'en'
                    ? '"Trekking through Tetebatu rice terraces and snorkeling in Gili Trawangan were the highlights of our honeymoon. The service was heartfelt, the vehicle clean and punctual. Highly recommended!"'
                    : '"Trekking sawah di Tetebatu dan snorkeling di Gili Trawangan jadi highlight liburan honeymoon kami. Pelayanannya sangat personal, mobil bersih, dan tepat waktu. Recommended banget!"'}
                </p>
              </div>
              <div className="testi-author">
                <div className="author-avatar">N</div>
                <div className="author-info">
                  <h4>Nadia & Fikri</h4>
                  <span>{language === 'en' ? 'Honeymoon Surabaya • Private Trip' : 'Honeymoon Surabaya • Paket Private Trip'}</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div>
                <div className="testi-stars">
                  <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                </div>
                <p className="testi-text">
                  {language === 'en'
                    ? '"My first visit to Lombok and so glad I booked with this local team. From airport arrival to Taliwang culinary suggestions, everything was top-notch with zero hidden costs."'
                    : '"Pertama kali ke Lombok dan senang sekali pilih travel lokal ini. Mulai dari penjemputan bandara sampai rekomendasi kuliner Ayam Taliwang semuanya memuaskan tanpa biaya tersembunyi."'}
                </p>
              </div>
              <div className="testi-author">
                <div className="author-avatar">B</div>
                <div className="author-info">
                  <h4>Bramantyo</h4>
                  <span>{language === 'en' ? 'Solo Traveler Bandung • Daily Trip Tetebatu & Sembalun' : 'Solo Traveler Bandung • Trip Harian Tetebatu & Sembalun'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. ABOUT LOMBOK_TRAVELERS */}
      <section className="about-section" id="tentang-kami">
        <div className="box1140">
          <div className="about-container">
            <div className="about-images-cluster">
              <div className="about-img-main">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv_jQ5aaka3AU2xEIgxtfafMHJ2DhEc9_FbDCOi0270rETaVq2b-35tGEe55qB8Yb8LbNlszLF9E0NZAQJLszzZNojbG019AuwYTtW8NLOCw5Vz2X35ckmlqAO7b9J1fF1EsOU4vLtUJljMYcg_OsHwFjcWqp7ENwfXpWGls-Wof84WH9iY9Adqq84wYGKzFX1tQHJBVxsXXlSLAd1Wkk6bh10q-3ShsBIy6YFf4Zh4nA0vKeeAfxH"
                  alt="Guide Lombok_Travelers"
                />
              </div>
              <div className="about-badge-floating">
                <i className="fa fa-map-marker"></i>
                <div className="about-badge-text">
                  <strong>Tetebatu, Lombok Timur</strong>
                  <span>{language === 'en' ? 'Cultural Heart & Rinjani Foothills' : 'Pusat Budaya & Lembah Rinjani'}</span>
                </div>
              </div>
            </div>

            <div className="about-content">
              <span className="section-tag">{language === 'en' ? 'About Us' : 'Tentang Kami'}</span>
              <h2 className="font-editorial">{language === 'en' ? 'About Lombok_Travelers' : 'Tentang Lombok_Travelers'}</h2>
              <p>
                {language === 'en'
                  ? 'Lombok_Travelers is an official local travel partner headquartered in Tetebatu, East Lombok, assisting travelers from around the world through tailored tour packages, private trips, car rentals, and custom itineraries.'
                  : 'Lombok_Travelers merupakan biro perjalanan wisata lokal berpusat di Tetebatu, Lombok Timur, yang membantu wisatawan menjelajahi Lombok melalui paket wisata, private trip, transportasi, dan perjalanan yang dapat disesuaikan.'}
              </p>
              <p>
                {language === 'en'
                  ? 'To us, Lombok is more than a holiday destination—it is our ancestral home rich in natural wonders, sacred Rinjani vistas, and hospitable Sasak heritage. We are dedicated to providing warm, honest, and unforgettable travel memories for every guest.'
                  : 'Bagi kami, Lombok bukan sekadar destinasi liburan, melainkan tanah kelahiran yang kaya akan pesona alam, kesakralan Gunung Rinjani, dan tradisi suku Sasak yang ramah. Kami berkomitmen memberikan pengalaman liburan yang hangat, jujur, dan berkesan bagi setiap tamu.'}
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-label">{language === 'en' ? 'Native Local Team' : 'Tim Lokal Asli'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">20+</span>
                  <span className="stat-label">{language === 'en' ? 'Handpicked Spots' : 'Destinasi Pilihan'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">5.0</span>
                  <span className="stat-label">{language === 'en' ? 'Guest Satisfaction' : 'Kepuasan Tamu'}</span>
                </div>
              </div>

              <a
                href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20tahu%20lebih%20banyak%20tentang%20paket%20wisata%20Lombok."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <i className="fa fa-handshake-o"></i>{' '}
                {language === 'en' ? 'Connect With Us & Inquire' : 'Kenal Lebih Dekat & Konsultasi Trip'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION (AEO & GEO Ready) */}
      <FaqSection />

      {/* AI TRAVEL CONCIERGE */}
      <ConciergeTrigger />

      {/* 12. FINAL CTA */}
      <section className="final-cta-section" style={{ backgroundImage: "url('/images/rinjani_hero.jpg')" }}>
        <div className="final-cta-overlay"></div>
        <div className="final-cta-content">
          <h2 className="font-editorial">
            {language === 'en' ? 'Ready to Explore Lombok?' : 'Siap Menjelajahi Lombok?'}
          </h2>
          <p>
            {language === 'en'
              ? 'Tell us your travel vision, and we will craft a seamless, stress-free holiday.'
              : 'Ceritakan rencana perjalanan Anda, kami bantu menyiapkannya dengan nyaman dan tanpa repot.'}
          </p>
          <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/paket/paket-lombok-3-hari-2-malam" className="btn-primary">
              <i className="fa fa-calendar-check-o"></i> {language === 'en' ? 'Book Package' : 'Pesan Sekarang'}
            </Link>
            <a
              href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20siap%20merencanakan%20liburan%20ke%20Lombok."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <i className="fa fa-whatsapp" style={{ color: '#25d366', fontSize: '18px' }}></i>{' '}
              {language === 'en' ? 'Chat WhatsApp' : 'Chat WhatsApp'}
            </a>
          </div>
        </div>
      </section>
      {/* VEHICLE BOOKING MODAL */}
      <BookingModal
        isOpen={isVehicleBookingOpen}
        onClose={() => setIsVehicleBookingOpen(false)}
        packageTitle={selectedVehicle.title}
        packageSlug={selectedVehicle.slug}
      />
    </>
  );
}
