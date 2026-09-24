'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="box1140 footer-grid">
          
          {/* Col 1: Brand & Contact */}
          <div className="footer-col footer-brand-info">
            <div className="footer-logo-row">
              <img src="/images/logo.png" alt="Lombok_Travelers" />
              <span>Lombok_Travelers</span>
            </div>
            <p>
              {language === 'en'
                ? 'Official local travel partner based in Tetebatu, East Lombok. Trusted services for private tours, family holiday packages, honeymoon trips, and reliable island transportation.'
                : 'Local travel partner untuk wisata Lombok, private trip, paket wisata, transportasi, itinerary, dan custom trip berbasis di Tetebatu, Lombok Timur.'}
            </p>
            <div className="footer-contact-item">
              <i className="fa fa-map-marker"></i>
              <span>Tetebatu, Kec. Sikur, Kabupaten Lombok Timur, Nusa Tenggara Barat 83662</span>
            </div>
            <div className="footer-contact-item">
              <i className="fa fa-whatsapp"></i>
              <span>WhatsApp: 0831-1711-0638</span>
            </div>
            <div className="footer-sosmed">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="sosmed-btn" aria-label="Instagram"><i className="fa fa-instagram"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="sosmed-btn" aria-label="Facebook"><i className="fa fa-facebook"></i></a>
              <a href="https://wa.me/6283117110638" target="_blank" rel="noopener noreferrer" className="sosmed-btn" aria-label="WhatsApp"><i className="fa fa-whatsapp"></i></a>
            </div>
          </div>

          {/* Col 2: Paket Wisata */}
          <div className="footer-col">
            <h3>{language === 'en' ? 'Tour Packages' : 'Paket Wisata'}</h3>
            <div className="footer-links">
              <Link href="/paket">{language === 'en' ? '› All Tour Packages' : '› Semua Paket Tour'}</Link>
              <Link href="/paket/paket-lombok-3-hari-2-malam">Paket Lombok 3H2M</Link>
              <Link href="/paket/paket-lombok-2-hari-1-malam">Paket Lombok 2H1M</Link>
              <Link href="/paket/paket-lombok-4-hari-3-malam">Paket Lombok 4H3M</Link>
              <Link href="/paket/paket-lombok-5-hari-4-malam">Paket Lombok 5H4M</Link>
              <Link href="/paket/private-lombok-honeymoon-trip">Private Honeymoon</Link>
              <Link href="/paket/tetebatu-nature-cultural-immersion">Tetebatu Cultural</Link>
            </div>
          </div>

          {/* Col 3: Trip Harian */}
          <div className="footer-col">
            <h3>{language === 'en' ? 'Daily Trips' : 'Trip Harian'}</h3>
            <div className="footer-links">
              <Link href="/trip-harian">{language === 'en' ? '› All 1-Day Tours' : '› Semua Trip Harian'}</Link>
              <Link href="/trip-harian">Sasak & Kuta Mandalika</Link>
              <Link href="/trip-harian">Tetebatu Nature Trip</Link>
              <Link href="/trip-harian">Pink Beach & Snorkeling</Link>
              <Link href="/trip-harian">Gili Trawangan Snorkeling</Link>
              <Link href="/trip-harian">Sembalun & Bukit Selong</Link>
            </div>
          </div>

          {/* Col 4: Transport & Info */}
          <div className="footer-col">
            <h3>{language === 'en' ? 'Transport & Rental' : 'Sewa Transportasi'}</h3>
            <div className="footer-links">
              <Link href="/transport">{language === 'en' ? '› Car Rental & Fleet' : '› Daftar Sewa Mobil'}</Link>
              <Link href="/transport">All New Avanza</Link>
              <Link href="/transport">Toyota Innova Reborn</Link>
              <Link href="/transport">Toyota HiAce Commuter</Link>
              <Link href="/transport">Toyota Fortuner VRZ</Link>
              <Link href="/transport">Antar-Jemput Bandara BIL</Link>
            </div>
          </div>

          {/* Col 5: Company & Articles */}
          <div className="footer-col">
            <h3>{language === 'en' ? 'Company & Guides' : 'Informasi & Panduan'}</h3>
            <div className="footer-links">
              <Link href="/artikel">{language === 'en' ? 'Travel Articles & Guides' : 'Artikel & Panduan Wisata'}</Link>
              <Link href="/tentang-kami">{language === 'en' ? 'About Lombok_Travelers' : 'Tentang Lombok_Travelers'}</Link>
              <Link href="/kontak">{language === 'en' ? 'Contact & Office Basecamp' : 'Kontak & Kantor Basecamp'}</Link>
              <Link href="/#custom-trip">{language === 'en' ? 'Request Custom Trip' : 'Formulir Custom Trip'}</Link>
              <a href="https://wa.me/6283117110638" target="_blank" rel="noopener noreferrer">
                WhatsApp 0831-1711-0638
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="box1140">
          <p>© 2026 Lombok_Travelers. All Rights Reserved. Local Travel Partner Tetebatu, Lombok Timur, NTB.</p>
        </div>
      </div>
    </footer>
  );
}
