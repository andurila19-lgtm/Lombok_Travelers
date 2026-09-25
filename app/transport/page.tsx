'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import BookingModal from '@/components/BookingModal';

interface VehicleRaw {
  id: string;
  name: string;
  category: { id: string; en: string };
  capacity: { id: string; en: string };
  transmission: { id: string; en: string };
  pricePerDay: string;
  image: string;
  features: { id: string[]; en: string[] };
}

const rawVehicles: VehicleRaw[] = [
  {
    id: 'avanza',
    name: 'All New Avanza / Xenia',
    category: { id: 'MPV Keluarga Hemat', en: 'Budget Family MPV' },
    capacity: { id: '5 - 6 Penumpang', en: '5 - 6 Passengers' },
    transmission: { id: 'Manual / Automatic', en: 'Manual / Automatic' },
    pricePerDay: 'Rp 550.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    features: {
      id: ['Include Driver Ramah', 'BBM Sudah Termasuk', 'AC Dingin & Bersih', 'Free Air Mineral'],
      en: ['Friendly Driver Included', 'Fuel (BBM) Fully Covered', 'Clean & Cold AC', 'Free Bottled Mineral Water']
    }
  },
  {
    id: 'innova',
    name: 'Toyota Innova Reborn',
    category: { id: 'Medium MPV Premium', en: 'Premium Medium MPV' },
    capacity: { id: '6 - 7 Penumpang', en: '6 - 7 Passengers' },
    transmission: { id: 'Automatic', en: 'Automatic' },
    pricePerDay: 'Rp 850.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
    features: {
      id: ['Suspensi Nyaman & Luas', 'Include Driver Berpengalaman', 'BBM Sudah Termasuk', 'Port USB Charger'],
      en: ['Smooth Ride & Spacious', 'Experienced Driver Included', 'Fuel Fully Included', 'USB Charging Ports']
    }
  },
  {
    id: 'hiace-commuter',
    name: 'Toyota HiAce Commuter',
    category: { id: 'Minibus Rombongan', en: 'Group Minibus' },
    capacity: { id: '12 - 14 Penumpang', en: '12 - 14 Passengers' },
    transmission: { id: 'Manual', en: 'Manual' },
    pricePerDay: 'Rp 1.250.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    features: {
      id: ['Kabin Luas Berdiri Mudah', 'Bagasi Koper Besar', 'Driver Khusus Rombongan', 'Include BBM & Antar-Jemput'],
      en: ['Spacious High-Roof Cabin', 'Generous Luggage Trunk', 'Dedicated Group Driver', 'Fuel & Roundtrip Included']
    }
  },
  {
    id: 'hiace-premio',
    name: 'Toyota HiAce Premio Luxury',
    category: { id: 'Executive Minibus', en: 'Executive Luxury Minibus' },
    capacity: { id: '10 - 12 Penumpang', en: '10 - 12 Passengers' },
    transmission: { id: 'Manual', en: 'Manual' },
    pricePerDay: 'Rp 1.550.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    features: {
      id: ['Interior Mewah Captain Seat', 'Audio & Layar Hiburan', 'Driver Standar Protokol VIP', 'Include BBM Full Day'],
      en: ['Plush Captain Seats', 'Audio & Media Entertainment Screen', 'VIP Protocol Standard Driver', 'Full Day Fuel Included']
    }
  },
  {
    id: 'fortuner',
    name: 'Toyota Fortuner VRZ',
    category: { id: 'Premium SUV', en: 'Premium 4WD SUV' },
    capacity: { id: '5 - 6 Penumpang', en: '5 - 6 Passengers' },
    transmission: { id: 'Automatic', en: 'Automatic' },
    pricePerDay: 'Rp 1.600.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: {
      id: ['Tangguh di Tanjakan Rinjani', 'Gaya Elegan & Mewah', 'Driver Khusus Eksekutif', 'BBM & Layanan VIP'],
      en: ['Power on Rinjani Mountain Slopes', 'Prestigious & Luxurious Style', 'Dedicated Executive Driver', 'Fuel & VIP Service']
    }
  },
  {
    id: 'alphard',
    name: 'Toyota Alphard Transformer',
    category: { id: 'VIP Luxury Van', en: 'VIP Luxury Van' },
    capacity: { id: '5 - 6 Penumpang', en: '5 - 6 Passengers' },
    transmission: { id: 'Automatic', en: 'Automatic' },
    pricePerDay: 'Rp 3.200.000 / 12 Jam',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    features: {
      id: ['Ottoman Leather Seat', 'Sunroof & Ambient Lighting', 'Driver Berpakaian Formal', 'Pilihan Tamu VIP / Pejabat'],
      en: ['Ottoman Leather Recliners', 'Sunroof & Ambient Lighting', 'Formally Dressed Chauffeur', 'Dignitaries & VIP Choice']
    }
  }
];

export default function TransportPage() {
  const { language, t, convertPriceString } = useLanguage();
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

  const filteredVehicles = rawVehicles.filter((v) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'family') return v.id === 'avanza' || v.id === 'innova';
    if (selectedCategory === 'group') return v.id.includes('hiace');
    if (selectedCategory === 'vip') return v.id === 'fortuner' || v.id === 'alphard';
    return true;
  });

  const routes = [
    {
      routeId: 'Bandara BIL ↔ Kuta Mandalika',
      routeEn: 'BIL Airport ↔ Kuta Mandalika',
      avanza: 'Rp 200.000',
      innova: 'Rp 350.000',
      hiace: 'Rp 550.000'
    },
    {
      routeId: 'Bandara BIL ↔ Kota Mataram',
      routeEn: 'BIL Airport ↔ Mataram City',
      avanza: 'Rp 250.000',
      innova: 'Rp 400.000',
      hiace: 'Rp 650.000'
    },
    {
      routeId: 'Bandara BIL ↔ Senggigi',
      routeEn: 'BIL Airport ↔ Senggigi Beach',
      avanza: 'Rp 300.000',
      innova: 'Rp 450.000',
      hiace: 'Rp 750.000'
    },
    {
      routeId: 'Bandara BIL ↔ Pelabuhan Bangsal (Gili)',
      routeEn: 'BIL Airport ↔ Bangsal Harbor (Gilis)',
      avanza: 'Rp 350.000',
      innova: 'Rp 500.000',
      hiace: 'Rp 850.000'
    },
    {
      routeId: 'Bandara BIL ↔ Tetebatu (Lombok Timur)',
      routeEn: 'BIL Airport ↔ Tetebatu (East Lombok)',
      avanza: 'Rp 300.000',
      innova: 'Rp 450.000',
      hiace: 'Rp 750.000'
    },
    {
      routeId: 'Bandara BIL ↔ Sembalun / Senaru',
      routeEn: 'BIL Airport ↔ Sembalun / Senaru (Rinjani)',
      avanza: 'Rp 500.000',
      innova: 'Rp 750.000',
      hiace: 'Rp 1.100.000'
    }
  ];

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
            {language === 'en' ? 'Family (Avanza / Innova)' : 'Keluarga (Avanza / Innova)'}
          </button>
          <button
            className={`tab-btn ${selectedCategory === 'group' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('group')}
          >
            {language === 'en' ? 'Group (HiAce Minibus)' : 'Rombongan (HiAce)'}
          </button>
          <button
            className={`tab-btn ${selectedCategory === 'vip' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('vip')}
          >
            {language === 'en' ? 'VIP & SUV (Fortuner / Alphard)' : 'VIP & SUV (Fortuner / Alphard)'}
          </button>
        </div>

        {/* VEHICLES GRID */}
        <div className="fleet-grid">
          {filteredVehicles.map((car) => {
            const cat = car.category[language] || car.category.id;
            const cap = car.capacity[language] || car.capacity.id;
            const trans = car.transmission[language] || car.transmission.id;
            const feats = car.features[language] || car.features.id;

            return (
              <div key={car.id} className="fleet-card">
                <div className="fleet-img-box">
                  <img src={car.image} alt={car.name} />
                  <span className="fleet-badge">{cat}</span>
                </div>
                <div className="fleet-body">
                  <h3 className="fleet-name">{car.name}</h3>
                  <div className="fleet-specs">
                    <span><i className="fa fa-users"></i> {cap}</span>
                    <span><i className="fa fa-cog"></i> {trans}</span>
                  </div>

                  <ul className="fleet-features-list">
                    {feats.map((feat, i) => (
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
                        <i className="fa fa-calendar-check-o"></i> {t.buttons.book}
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
                        <i className="fa fa-whatsapp"></i> {t.buttons.chatWa}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
                <th>{language === 'en' ? 'Transfer Route' : 'Rute Perjalanan'}</th>
                <th>{language === 'en' ? 'Avanza (1-5 Pax)' : 'Mobil Avanza (1-5 Org)'}</th>
                <th>{language === 'en' ? 'Innova Reborn (1-6 Pax)' : 'Innova Reborn (1-6 Org)'}</th>
                <th>{language === 'en' ? 'HiAce (1-14 Pax)' : 'HiAce (1-14 Org)'}</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r, i) => (
                <tr key={i}>
                  <td><strong>{language === 'en' ? r.routeEn : r.routeId}</strong></td>
                  <td>{convertPriceString(r.avanza)}</td>
                  <td>{convertPriceString(r.innova)}</td>
                  <td>{convertPriceString(r.hiace)}</td>
                </tr>
              ))}
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
              <i className="fa fa-calendar-check-o"></i>{' '}
              {language === 'en' ? 'Reserve Airport Transfer Now' : 'Reservasi Antar-Jemput Bandara Sekarang'}
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
