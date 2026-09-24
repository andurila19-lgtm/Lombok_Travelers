'use client';

import Link from 'next/link';
import packagesData from '@/data/packages.json';
import dailyTrips from '@/data/dailyTrips.json';
import { TourPackage, DailyTrip } from '@/types';
import SearchBar from '@/components/SearchBar';
import PackageList from '@/components/PackageList';
import CustomTripForm from '@/components/CustomTripForm';
import ConciergeTrigger from '@/components/ConciergeTrigger';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const packages: TourPackage[] = packagesData as TourPackage[];
  const trips: DailyTrip[] = dailyTrips as DailyTrip[];

  return (
    <>
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
            <span className="section-tag">Katalog Pilihan</span>
            <h2 className="section-title">Paket Wisata Lengkap</h2>
            <p className="section-subtitle">Pilih paket perjalanan sesuai durasi dan kebutuhan Anda.</p>
          </div>

          {/* Interactive Package Cards with Category Tabs */}
          <PackageList packages={packages} />
        </div>
      </section>

      {/* 5. TRIP HARIAN (#pharian 8 Cards Grid) */}
      <section className="harian-section" id="pharian">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">One-Day Tours</span>
            <h2 className="section-title">Paket Trip Harian</h2>
            <p className="section-subtitle">
              Pilihan perjalanan satu hari yang efisien dan padat pengalaman untuk mengunjungi destinasi terbaik Lombok.
            </p>
          </div>

          <div className="harian-grid">
            {trips.map((trip) => (
              <div key={trip.id} className="harian-card">
                <div className="harian-img-box">
                  <img src={trip.image} alt={trip.title} />
                  <span className="harian-duration-tag">Durasi: {trip.duration}</span>
                </div>
                <div className="harian-body">
                  <h3 className="harian-title">{trip.title}</h3>
                  <p className="harian-desc">{trip.desc}</p>
                  <div className="harian-footer">
                    <div>
                      <span className="harian-price-text">Mulai dari</span>
                      <span className="harian-price-val">{trip.price}</span>
                    </div>
                    <a
                      href={`https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20tanya%20Trip%20Harian:%20${encodeURIComponent(trip.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-harian-link"
                    >
                      Lihat Detail <i className="fa fa-angle-right"></i>
                    </a>
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
            <span className="section-tag">Spot Populer</span>
            <h2 className="section-title">Destinasi Pilihan Lombok</h2>
            <p className="section-subtitle">
              Jelajahi keragaman lanskap pulau Lombok dari puncak pegunungan hingga laut biru toska.
            </p>
          </div>

          <div className="destinations-grid">
            <div className="destination-card">
              <img src="/images/hero_tetebatu.png" alt="Tetebatu" />
              <div className="destination-overlay">
                <h3>Tetebatu</h3>
                <p>Terasering sawah asri & udara sejuk kaki Rinjani</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="/images/sembalun_bukit_selong.jpg" alt="Sembalun" />
              <div className="destination-overlay">
                <h3>Sembalun</h3>
                <p>Lembah spektakuler & perkebunan stroberi</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr6U-cNCJReQAZiOIE9vEdk8RuA0b1ETWGkY9n0Dl4Y1S3aIvXg3BU-q6qa9DkD0AInIqEeQDraSgIyWfIndC_mmvKgO53RDefYqG8hrmIBgDxOpDYauPw7ljyl56Lk_SkJdVttpxGLZBTM35qlNCtc4MpNHuJfqpXiP5n8-lZQUezllR6qzmTf5Hrxp-akG7lvK6kXQ4Vh5mgvF4aQeI6zWqBHXNNnYaZKzifeQ0w0T3hFJ-dqG6g" alt="Kuta Mandalika" />
              <div className="destination-overlay">
                <h3>Kuta Mandalika</h3>
                <p>Pantai eksotis & sirkuit bertaraf internasional</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTbrGKinn1UKKBKH5wRoFYMO3R8yEVpHdEpf7bBfdTu1nUYYcTDECjmX12CZ_8eXyhRDJTK7jeZ11Fvs6hUY1rjly963y0tNadfutl_Ulv4cBK0mf3-gJkIaQHKav7mfW4VHPl3xOi-xjEhR7cHtaRfd_D0wC1wQrmXHMkRG-_hjmSGsYlAEv3v4wd3m9y_i2mQmxWZ_N_7_lHESWsTLMh79ooo4HaVGxc33YlnLlZDIyoI0Ajhya_" alt="Pink Beach" />
              <div className="destination-overlay">
                <h3>Pink Beach</h3>
                <p>Keunikan pasir merah muda di Lombok Timur</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="/images/gili_snorkeling.jpg" alt="Gili Trawangan" />
              <div className="destination-overlay">
                <h3>Gili Trawangan</h3>
                <p>Air jernih, penyu laut & sunset tanpa polusi</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXFiA-A1V3lxkRRq1TLYKAH--twJKYdv7yCAGetDcM84zUeDJarsMPI2qvt39BjQE76dYaIIf-EMmuak1VoQdhMdLyQq5w9OqNpwGFLKCnFYWuqvgrpupnt3StPM1Jk9N-5fRlRdaSnboo6KiuDoRoF_9tTyAN9r0-HUfh8_G2KUrUauRC90tK01QtnyKOHEHKmS2BrJzKu6PFV8ocCjXiYvb2xC21czJCcPdmhzzhbCkz5W-06V0o" alt="Gili Nanggu" />
              <div className="destination-overlay">
                <h3>Gili Nanggu</h3>
                <p>Snorkeling aquarium alami yang tenang di selatan</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrdhTpDoO05VhKgf5uHhx2JjbLtWULHXfgSyWL9rMRw-hFYF76-JmxErOFqEpEwl1ZZAMgZMe_Ozyn6mGabgWSEZqiHbfqQEqx5_Q3VZyTyIRgujTXtGIKn1C-asysxMLe59NN3Fm8pb4GdjSaHBM2Z8aPg2PttvZ8uaJimjRXRJV69j9T05sb_H4Z61ndjaOTHFg9eNg3zA2ZVg0SvLAPwRle3pep5MdanbQtu8ZHod5AuYWCfpm3" alt="Senaru Waterfalls" />
              <div className="destination-overlay">
                <h3>Senaru & Rinjani Gate</h3>
                <p>Air terjun magis Sendang Gile & Tiu Kelep</p>
              </div>
            </div>

            <div className="destination-card">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBrPkUh5toEjBLPEVl-9WAF3WSi2xhWxzA0oFfnqnkG1SeJfgVj5uCS6mBef2FT9BYn_H57hM8k3VOZVB5wnenbI3970YR6MMgBB0BTzDf7bsqlmzljmnsOBteQZ1a0RIM76c9cOGnJnCYWzGQpbmsUDH2E80qFM0jcN0HC_fHQ6AKxB_XmCnJGheW0a8ZB0cg6FYBqvvzYmDyOkM0icuwdT_4YQJa85GhT6DIDmyUM26u01qlumJ1" alt="East Lombok" />
              <div className="destination-overlay">
                <h3>East Lombok Heritage</h3>
                <p>Gili Kondo, Pohon Purba & kehidupan bahari lokal</p>
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
              <span className="section-tag">Personalisasi Perjalanan</span>
              <h2 className="font-editorial">Punya Rencana Perjalanan Sendiri?</h2>
              <p>
                Ceritakan kebutuhan perjalanan Anda dan kami bantu menyesuaikan itinerary, destinasi, transportasi, dan aktivitas selama di Lombok.
              </p>

              <div className="custom-features-list">
                <div className="custom-feature-item">
                  <i className="fa fa-calendar-check-o"></i> Fleksibel menentukan tanggal & durasi trip
                </div>
                <div className="custom-feature-item">
                  <i className="fa fa-car"></i> Penjemputan di mana saja (Bandara, Pelabuhan, Hotel)
                </div>
                <div className="custom-feature-item">
                  <i className="fa fa-map-marker"></i> Kombinasi destinasi bebas sesuai minat Anda
                </div>
                <div className="custom-feature-item">
                  <i className="fa fa-users"></i> Cocok untuk solo traveler, pasangan, keluarga & grup kantor
                </div>
              </div>

              <div style={{ background: 'rgba(24, 90, 56, 0.08)', padding: '14px 18px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                <strong style={{ color: 'var(--primary)', fontSize: '13.5px', display: 'block', marginBottom: '2px' }}>
                  Konsultasi Gratis Langsung via WhatsApp
                </strong>
                <span style={{ fontSize: '12.5px', color: 'var(--dark-soft)' }}>
                  Tim lokal kami akan merespons dengan rincian jadwal dan estimasi biaya transparan.
                </span>
              </div>
            </div>

            <CustomTripForm />
          </div>
        </div>
      </section>

      {/* 8. TRANSPORTASI LOMBOK */}
      <section className="transport-section" id="transport">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">Armada & Layanan</span>
            <h2 className="section-title">Transportasi Lombok</h2>
            <p className="section-subtitle">
              Sewa mobil ber-AC, antar-jemput bandara, dan rental transportasi harian didampingi driver lokal yang ramah dan menguasai rute.
            </p>
          </div>

          <div className="transport-grid">
            <div className="transport-card">
              <div className="transport-icon"><i className="fa fa-plane"></i></div>
              <h3>Airport Transfer</h3>
              <p>Antar-jemput tepat waktu Bandara Internasional Lombok (BIL) ke Tetebatu, Mataram, Senggigi, Kuta & Bangsal.</p>
            </div>

            <div className="transport-card">
              <div className="transport-icon"><i className="fa fa-car"></i></div>
              <h3>Private Car Rental</h3>
              <p>Unit mobil bersih & terawat (Toyota Innova Reborn, Avanza, Xpander, HiAce) full AC dingin.</p>
            </div>

            <div className="transport-card">
              <div className="transport-icon"><i className="fa fa-id-card-o"></i></div>
              <h3>Driver Lokal Ramah</h3>
              <p>Supir lokal asli yang santun, informatif, dan siap memandu rute wisata terbaik tanpa terburu-buru.</p>
            </div>

            <div className="transport-card">
              <div className="transport-icon"><i className="fa fa-road"></i></div>
              <h3>Private Trip Transport</h3>
              <p>Kendaraan siap standby penuh selama program tour tanpa dicampur penumpang atau rombongan lain.</p>
            </div>

            <div className="transport-card">
              <div className="transport-icon"><i className="fa fa-building-o"></i></div>
              <h3>Hotel Pickup & Drop</h3>
              <p>Layanan perpindahan hotel antar wilayah (misal: dari Tetebatu ke Senggigi / Pelabuhan Gili).</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a
              href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20pesan%20layanan%20transportasi%20sewa%20mobil%20di%20Lombok."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <i className="fa fa-car"></i> Pesan Transportasi Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER / GALLERY (Moments From Lombok) */}
      <section className="gallery-section" id="gallery">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">Dokumentasi Perjalanan</span>
            <h2 className="section-title">Kustomer Kami</h2>
            <p className="section-subtitle">
              Senyum, kebersamaan, dan keindahan alam Lombok yang diabadikan bersama traveler Lombok_Travelers.
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item span-2">
              <img src="/images/hero_tetebatu.png" alt="Traveler di Tetebatu" />
              <div className="gallery-caption">Trekking Pagi di Terasering Tetebatu</div>
            </div>

            <div className="gallery-item">
              <img src="/images/gili_snorkeling.jpg" alt="Snorkeling Gili Trawangan" />
              <div className="gallery-caption">Snorkeling Penyu di Gili Meno</div>
            </div>

            <div className="gallery-item">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrdhTpDoO05VhKgf5uHhx2JjbLtWULHXfgSyWL9rMRw-hFYF76-JmxErOFqEpEwl1ZZAMgZMe_Ozyn6mGabgWSEZqiHbfqQEqx5_Q3VZyTyIRgujTXtGIKn1C-asysxMLe59NN3Fm8pb4GdjSaHBM2Z8aPg2PttvZ8uaJimjRXRJV69j9T05sb_H4Z61ndjaOTHFg9eNg3zA2ZVg0SvLAPwRle3pep5MdanbQtu8ZHod5AuYWCfpm3" alt="Air Terjun Lombok" />
              <div className="gallery-caption">Segarnya Air Terjun Kaki Rinjani</div>
            </div>

            <div className="gallery-item">
              <img src="/images/sembalun_bukit_selong.jpg" alt="Panorama Sembalun" />
              <div className="gallery-caption">Keindahan Bukit Selong Sembalun</div>
            </div>

            <div className="gallery-item">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD20oVTklMxySleHhwOdOVE5unl6u6NT6UVKKyMH1RY6ztOgmAvSWbgozoljKK4sbHXeQLGH2DSZJlFBrJLMaovcbubo8WazM5JZgAgm6mXcCfXqOmHnqwl_3lmrfONEAzPlDU_DQA8nxUUzjOfEy_2jlY9KpIEsPB1VFvSR1ArSJXR7YnRTtyAh9J8og4Hnk2Gwx-D4i4FvaMmIa1bBPDVDdq36xzTwPAoSPoQIjb2H2o2qcXB8x5P" alt="Tenun Sukarara" />
              <div className="gallery-caption">Belajar Menenun di Desa Sukarara</div>
            </div>

            <div className="gallery-item span-2">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr6U-cNCJReQAZiOIE9vEdk8RuA0b1ETWGkY9n0Dl4Y1S3aIvXg3BU-q6qa9DkD0AInIqEeQDraSgIyWfIndC_mmvKgO53RDefYqG8hrmIBgDxOpDYauPw7ljyl56Lk_SkJdVttpxGLZBTM35qlNCtc4MpNHuJfqpXiP5n8-lZQUezllR6qzmTf5Hrxp-akG7lvK6kXQ4Vh5mgvF4aQeI6zWqBHXNNnYaZKzifeQ0w0T3hFJ-dqG6g" alt="Sunset Bukit Merese" />
              <div className="gallery-caption">Golden Hour di Bukit Merese Mandalika</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIAL (Testimonial dari Tamu Kami) */}
      <section className="testimonial-section" id="testimonial">
        <div className="box1140">
          <div className="section-header">
            <span className="section-tag">Ulasan Traveler</span>
            <h2 className="section-title">Testimonial Dari Tamu Kami</h2>
            <p className="section-subtitle">
              Kepuasan dan kenyamanan perjalanan Anda adalah prioritas utama Lombok_Travelers.
            </p>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div>
                <div className="testi-stars">
                  <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                </div>
                <p className="testi-text">
                  &quot;Private trip 3H2M bersama Lombok_Travelers sangat berkesan! Guide lokalnya asli Tetebatu, sangat ramah, paham spot foto terbaik, dan anak-anak kami sangat nyaman selama di jalan.&quot;
                </p>
              </div>
              <div className="testi-author">
                <div className="author-avatar">R</div>
                <div className="author-info">
                  <h4>Rian & Keluarga</h4>
                  <span>Family Trip Jakarta • Paket 3H2M</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div>
                <div className="testi-stars">
                  <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                </div>
                <p className="testi-text">
                  &quot;Trekking sawah di Tetebatu dan snorkeling di Gili Trawangan jadi highlight liburan honeymoon kami. Pelayanannya sangat personal, mobil bersih, dan tepat waktu. Recommended banget!&quot;
                </p>
              </div>
              <div className="testi-author">
                <div className="author-avatar">N</div>
                <div className="author-info">
                  <h4>Nadia & Fikri</h4>
                  <span>Honeymoon Surabaya • Paket Private Trip</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div>
                <div className="testi-stars">
                  <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i>
                </div>
                <p className="testi-text">
                  &quot;Pertama kali ke Lombok dan senang sekali pilih travel lokal ini. Mulai dari penjemputan bandara sampai rekomendasi kuliner Ayam Taliwang semuanya memuaskan tanpa biaya tersembunyi.&quot;
                </p>
              </div>
              <div className="testi-author">
                <div className="author-avatar">B</div>
                <div className="author-info">
                  <h4>Bramantyo</h4>
                  <span>Solo Traveler Bandung • Trip Harian Tetebatu & Sembalun</span>
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
                  <span>Pusat Budaya & Lembah Rinjani</span>
                </div>
              </div>
            </div>

            <div className="about-content">
              <span className="section-tag">Tentang Kami</span>
              <h2 className="font-editorial">Tentang Lombok_Travelers</h2>
              <p>
                Lombok_Travelers merupakan biro perjalanan wisata lokal berpusat di Tetebatu, Lombok Timur, yang membantu wisatawan menjelajahi Lombok melalui paket wisata, private trip, transportasi, dan perjalanan yang dapat disesuaikan.
              </p>
              <p>
                Bagi kami, Lombok bukan sekadar destinasi liburan, melainkan tanah kelahiran yang kaya akan pesona alam, kesakralan Gunung Rinjani, dan tradisi suku Sasak yang ramah. Kami berkomitmen memberikan pengalaman liburan yang hangat, jujur, dan berkesan bagi setiap tamu.
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-num">100%</span>
                  <span className="stat-label">Tim Lokal Asli</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">20+</span>
                  <span className="stat-label">Destinasi Pilihan</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">5.0</span>
                  <span className="stat-label">Kepuasan Tamu</span>
                </div>
              </div>

              <a
                href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20tahu%20lebih%20banyak%20tentang%20paket%20wisata%20Lombok."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <i className="fa fa-handshake-o"></i> Kenal Lebih Dekat & Konsultasi Trip
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AI TRAVEL CONCIERGE */}
      <ConciergeTrigger />

      {/* 12. FINAL CTA */}
      <section className="final-cta-section" style={{ backgroundImage: "url('/images/rinjani_hero.jpg')" }}>
        <div className="final-cta-overlay"></div>
        <div className="final-cta-content">
          <h2 className="font-editorial">Siap Menjelajahi Lombok?</h2>
          <p>Ceritakan rencana perjalanan Anda, kami bantu menyiapkannya dengan nyaman dan tanpa repot.</p>
          <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/paket/paket-lombok-3-hari-2-malam" className="btn-primary">
              <i className="fa fa-calendar-check-o"></i> Pesan Sekarang
            </Link>
            <a
              href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20siap%20merencanakan%20liburan%20ke%20Lombok."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <i className="fa fa-whatsapp" style={{ color: '#25d366', fontSize: '18px' }}></i> Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
