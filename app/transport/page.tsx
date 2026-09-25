'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import BookingModal from '@/components/BookingModal';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  capacity: string;
  transmission: string;
  pricePerDay: string;
  image: string;
  features: string[];
}

const vehicles: Vehicle[] = [
  {
    id: 'avanza',
    name: 'All New Avanza / Xenia',
    category: 'MPV Keluarga Hemat',
    capacity: '5 - 6 Penumpang',
    transmission: 'Manual / Automatic',
    pricePerDay: 'Rp 550.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    features: ['Include Driver Ramah', 'BBM Sudah Termasuk', 'AC Dingin & Bersih', 'Free Air Mineral']
  },
  {
    id: 'innova',
    name: 'Toyota Innova Reborn',
    category: 'Medium MPV Premium',
    capacity: '6 - 7 Penumpang',
    transmission: 'Automatic',
    pricePerDay: 'Rp 850.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
    features: ['Suspensi Nyaman & Luas', 'Include Driver Berpengalaman', 'BBM Sudah Termasuk', 'Port USB Charger']
  },
  {
    id: 'hiace-commuter',
    name: 'Toyota HiAce Commuter',
    category: 'Minibus Rombongan',
    capacity: '12 - 14 Penumpang',
    transmission: 'Manual',
    pricePerDay: 'Rp 1.250.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    features: ['Kabin Luas Berdiri Mudah', 'Bagasi Koper Besar', 'Driver Khusus Rombongan', 'Include BBM & Antar-Jemput']
  },
  {
    id: 'hiace-premio',
    name: 'Toyota HiAce Premio Luxury',
    category: 'Executive Minibus',
    capacity: '10 - 12 Penumpang',
    transmission: 'Manual',
    pricePerDay: 'Rp 1.550.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    features: ['Interior Mewah Captain Seat', 'Audio & Layar Hiburan', 'Driver Standar Protokol VIP', 'Include BBM Full Day']
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner VRZ',
    category: 'Premium SUV',
    capacity: '5 - 6 Penumpang',
    transmission: 'Automatic',
    pricePerDay: 'Rp 1.600.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['Tangguh di Tanjakan Rinjani', 'Gaya Elegan & Mewah', 'Driver Khusus Eksekutif', 'BBM & Layanan VIP']
  },
  {
    id: 'alphard',
    name: 'Toyota Alphard Transformer',
    category: 'VIP Luxury Van',
    capacity: '5 - 6 Penumpang',
    transmission: 'Automatic',
    pricePerDay: 'Rp 3.200.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    features: ['Ottoman Leather Seat', 'Sunroof & Ambient Lighting', 'Driver Berpakaian Formal', 'Pilihan Tamu VIP / Pejabat']
  }
];

export default function TransportPage() {
  const { language, convertPriceString } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState<{ title: string; slug: string }>({
    title: '',
    slug: '',
  });

  const handleOpenBooking = (title: string, slug: string) => {
    setSelectedVehicleForBooking({ title, slug });
    setIsBookingOpen(true);
  };

  const filteredVehicles = vehicles.filter((v) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'family') return v.id === 'avanza' || v.id === 'innova';
    if (selectedCategory === 'group') return v.id.includes('hiace');
    if (selectedCategory === 'vip') return v.id === 'fortuner' || v.id === 'alphard';
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
            <strong>{language === 'en' ? 'Transport & Rental' : 'Sewa Transportasi'}</strong>
          </nav>
          <h1 className="page-header-title">
            {language === 'en'
              ? 'Lombok Car Rental & Airport Transfers'
              : 'Sewa Mobil & Transportasi Wisata Lombok'}
          </h1>
          <p className="page-header-subtitle">
            {language === 'en'
              ? 'Reliable, well-maintained vehicles with hospitable native Sasak drivers and all-inclusive fuel packages.'
              : 'Armada bersih dan terawat dengan driver lokal berpengalaman asli Sasak + BBM include untuk kenyamanan maksimal.'}
          </p>
        </div>
      </div>

      <div className="box1140" style={{ padding: '40px 15px 80px 15px' }}>
        {/* VEHICLE TABS */}
        <div className="package-tabs" style={{ marginBottom: '32px' }}>
          <button
            className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            {language === 'en' ? 'All Fleet' : 'Semua Armada'}
          </button>
          <button
            className={`tab-btn ${selectedCategory === 'family' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('family')}
          >
            Keluarga (Avanza / Innova)
          </button>
          <button
            className={`tab-btn ${selectedCategory === 'group' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('group')}
          >
            Rombongan (HiAce)
          </button>
          <button
            className={`tab-btn ${selectedCategory === 'vip' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('vip')}
          >
            VIP & SUV (Fortuner / Alphard)
          </button>
        </div>

        {/* VEHICLES GRID */}
        <div className="fleet-grid">
          {filteredVehicles.map((car) => (
            <div key={car.id} className="fleet-card">
              <div className="fleet-img-box">
                <img src={car.image} alt={car.name} />
                <span className="fleet-badge">{car.category}</span>
              </div>
              <div className="fleet-body">
                <h3 className="fleet-name">{car.name}</h3>
                <div className="fleet-specs">
                  <span><i className="fa fa-users"></i> {car.capacity}</span>
                  <span><i className="fa fa-cog"></i> {car.transmission}</span>
                </div>

                <ul className="fleet-features-list">
                  {car.features.map((feat, i) => (
                    <li key={i}><i className="fa fa-check"></i> {feat}</li>
                  ))}
                </ul>

                <div className="fleet-footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
                  <div className="fleet-price">
                    <span className="fleet-price-tag">{convertPriceString(car.pricePerDay)}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(`Sewa Mobil ${car.name}`, `sewa-${car.id}`)}
                      style={{
                        background: 'var(--primary, #185a38)',
                        color: '#ffffff',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px 10px',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <i className="fa fa-calendar-check-o"></i> {language === 'en' ? 'Book' : 'Booking'}
                    </button>

                    <a
                      href={`https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20ingin%20sewa%20mobil%20${encodeURIComponent(car.name)}.%20Mohon%20info%20ketersediaan.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-rent-wa"
                      style={{
                        padding: '8px 10px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                      }}
                    >
                      <i className="fa fa-whatsapp"></i> Chat WA
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AIRPORT TRANSFER TABLE */}
        <div className="detail-block" style={{ marginTop: '56px' }}>
          <h2>
            <i className="fa fa-plane" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>
            {language === 'en' ? 'Airport Transfer Rates (Lombok BIL)' : 'Tarif Antar-Jemput Bandara Lombok (BIL)'}
          </h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
            {language === 'en'
              ? 'Fixed all-in price per car (including driver, fuel, and airport toll parking):'
              : 'Harga all-in per mobil (sudah termasuk driver, BBM, dan parkir bandara):'}
          </p>

          <table className="price-table">
            <thead>
              <tr>
                <th>Rute Perjalanan</th>
                <th>Mobil Avanza (1-5 Org)</th>
                <th>Innova Reborn (1-6 Org)</th>
                <th>HiAce (1-14 Org)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Bandara BIL ↔ Kuta Mandalika</strong></td>
                <td>{convertPriceString('Rp 200.000')}</td>
                <td>{convertPriceString('Rp 350.000')}</td>
                <td>{convertPriceString('Rp 550.000')}</td>
              </tr>
              <tr>
                <td><strong>Bandara BIL ↔ Kota Mataram</strong></td>
                <td>{convertPriceString('Rp 250.000')}</td>
                <td>{convertPriceString('Rp 400.000')}</td>
                <td>{convertPriceString('Rp 650.000')}</td>
              </tr>
              <tr>
                <td><strong>Bandara BIL ↔ Senggigi</strong></td>
                <td>{convertPriceString('Rp 300.000')}</td>
                <td>{convertPriceString('Rp 450.000')}</td>
                <td>{convertPriceString('Rp 750.000')}</td>
              </tr>
              <tr>
                <td><strong>Bandara BIL ↔ Pelabuhan Bangsal (Gili)</strong></td>
                <td>{convertPriceString('Rp 350.000')}</td>
                <td>{convertPriceString('Rp 500.000')}</td>
                <td>{convertPriceString('Rp 850.000')}</td>
              </tr>
              <tr>
                <td><strong>Bandara BIL ↔ Tetebatu (Lombok Timur)</strong></td>
                <td>{convertPriceString('Rp 300.000')}</td>
                <td>{convertPriceString('Rp 450.000')}</td>
                <td>{convertPriceString('Rp 750.000')}</td>
              </tr>
              <tr>
                <td><strong>Bandara BIL ↔ Sembalun / Senaru</strong></td>
                <td>{convertPriceString('Rp 500.000')}</td>
                <td>{convertPriceString('Rp 750.000')}</td>
                <td>{convertPriceString('Rp 1.100.000')}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => handleOpenBooking('Antar-Jemput Bandara BIL Lombok', 'transfer-bandara-bil')}
              style={{
                background: 'var(--primary, #185a38)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(24, 90, 56, 0.25)',
              }}
            >
              <i className="fa fa-calendar-check-o"></i> Reservasi Antar-Jemput Bandara Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Integrated Customer Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packageTitle={selectedVehicleForBooking.title}
        packageSlug={selectedVehicleForBooking.slug}
      />
    </div>
  );
}
