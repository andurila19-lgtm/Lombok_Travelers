'use client';

import { useState } from 'react';

interface FleetUnit {
  id: string;
  name: string;
  plate: string;
  type: string;
  capacity: string;
  status: 'Ready' | 'On Trip' | 'Booked Besok' | 'Service';
  driver: string;
}

interface DriverProfile {
  id: string;
  name: string;
  origin: string;
  phone: string;
  specialty: string;
  status: 'Ready' | 'On Duty' | 'Off';
  rating: number;
}

export default function AdminFleetsPage() {
  const [fleets, setFleets] = useState<FleetUnit[]>([
    { id: 'f1', name: 'All New Avanza (Unit #01)', plate: 'DR 1422 AX', type: 'MPV Hemat', capacity: '5-6 Pax', status: 'Ready', driver: 'Pak Johari' },
    { id: 'f2', name: 'Innova Reborn (Unit #02)', plate: 'DR 1889 BZ', type: 'Medium MPV', capacity: '7 Pax', status: 'On Trip', driver: 'Mas Dedi' },
    { id: 'f3', name: 'Innova Reborn (Unit #03)', plate: 'DR 1902 CL', type: 'Medium MPV', capacity: '7 Pax', status: 'Ready', driver: 'Pak Herman' },
    { id: 'f4', name: 'Toyota HiAce Commuter (Unit #04)', plate: 'DR 7120 DK', type: 'Minibus Rombongan', capacity: '14 Pax', status: 'Booked Besok', driver: 'Bang Fikri' },
    { id: 'f5', name: 'Toyota HiAce Premio Luxury (Unit #05)', plate: 'DR 7788 VIP', type: 'Executive Van', capacity: '10 Pax', status: 'Ready', driver: 'Pak Rudi' },
    { id: 'f6', name: 'Toyota Fortuner VRZ (Unit #06)', plate: 'DR 1111 EX', type: 'SUV VIP', capacity: '6 Pax', status: 'Ready', driver: 'Mas Ridwan' },
  ]);

  const [drivers, setDrivers] = useState<DriverProfile[]>([
    { id: 'd1', name: 'Pak Johari', origin: 'Tetebatu, Sikur', phone: '081277889911', specialty: 'Rute Tetebatu, Air Terjun, & Kopi Sasak', status: 'Ready', rating: 4.9 },
    { id: 'd2', name: 'Mas Dedi', origin: 'Sikur, Lombok Timur', phone: '081933445566', specialty: 'Rute Snorkeling 3 Gili, Malimbu & Sunset', status: 'On Duty', rating: 5.0 },
    { id: 'd3', name: 'Pak Herman', origin: 'Tetebatu Selatan', phone: '085211223344', specialty: 'Sabar, ramah keluarga & lansia', status: 'Ready', rating: 4.9 },
    { id: 'd4', name: 'Bang Fikri', origin: 'Mataram Barat', phone: '087766554433', specialty: 'HiAce Rombongan & Event Instansi', status: 'On Duty', rating: 4.8 },
  ]);

  const toggleFleetStatus = (id: string) => {
    setFleets((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const nextStatus = f.status === 'Ready' ? 'On Trip' : f.status === 'On Trip' ? 'Ready' : 'Ready';
          return { ...f, status: nextStatus };
        }
        return f;
      })
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              Armada & Driver Lokal Sasak
            </h1>
            <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
              Operasional Kendaraan
            </span>
          </div>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: '4px 0 0 0' }}>
            Kesiapan unit mobil sewa private ber-AC dan profil pemandu lokal asli Lombok.
          </p>
        </div>
      </div>

      {/* Section 1: Fleet Cars Grid */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
          Status Armada Wisata ({fleets.length} Unit)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
          {fleets.map((car) => {
            const isReady = car.status === 'Ready';
            const isOnTrip = car.status === 'On Trip';

            return (
              <div
                key={car.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '12px',
                      background: '#0f172a',
                      color: '#ffffff',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {car.plate}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleFleetStatus(car.id)}
                    style={{
                      background: isReady ? '#dcfce7' : isOnTrip ? '#fef3c7' : '#f1f5f9',
                      color: isReady ? '#15803d' : isOnTrip ? '#b45309' : '#475569',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    title="Klik untuk ubah status"
                  >
                    {car.status} ↻
                  </button>
                </div>

                <strong style={{ fontSize: '16px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                  {car.name}
                </strong>
                <div style={{ fontSize: '12.5px', color: '#64748b', marginBottom: '12px' }}>
                  {car.type} • Kapasitas: <strong>{car.capacity}</strong>
                </div>

                <div
                  style={{
                    background: '#f8fafc',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12.5px',
                  }}
                >
                  <span style={{ color: '#475569' }}>
                    <i className="fa fa-user-circle-o" style={{ color: '#185a38', marginRight: '6px' }}></i>
                    Driver Utama: <strong>{car.driver}</strong>
                  </span>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>Terkunci</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Driver Roster */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
          Daftar Driver & Guide Lokal ({drivers.length} Personel)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
          {drivers.map((drv) => (
            <div
              key={drv.id}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#185a38',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 800,
                  }}
                >
                  {drv.name[0]}
                </div>
                <div>
                  <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block' }}>{drv.name}</strong>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Asal: {drv.origin}</span>
                </div>
              </div>

              <div style={{ fontSize: '12.5px', color: '#334155', marginBottom: '12px', lineHeight: 1.5 }}>
                <i className="fa fa-map-signs" style={{ color: '#16a34a', marginRight: '6px' }}></i>
                {drv.specialty}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                <div style={{ color: '#f59e0b', fontSize: '12px' }}>
                  <i className="fa fa-star"></i> {drv.rating} / 5.0
                </div>

                <a
                  href={`https://wa.me/62${drv.phone.slice(1)}?text=Halo%20${encodeURIComponent(drv.name)},%20ada%20update%20jadwal%20trip%20tamu%20Lombok_Travelers.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#dcfce7',
                    color: '#15803d',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fa fa-whatsapp"></i> Chat Driver
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
