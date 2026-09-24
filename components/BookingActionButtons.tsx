'use client';

import { useState } from 'react';
import BookingModal from './BookingModal';

interface BookingActionButtonsProps {
  packageSlug: string;
  packageTitle: string;
  variant?: 'sidebar' | 'inline' | 'card';
}

export default function BookingActionButtons({
  packageSlug,
  packageTitle,
  variant = 'sidebar',
}: BookingActionButtonsProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const waText = `Halo Lombok_Travelers, saya ingin konsultasi booking ${packageTitle}.`;
  const waUrl = `https://wa.me/6283117110638?text=${encodeURIComponent(waText)}`;

  if (variant === 'card') {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="btn-booking-card"
          style={{
            background: 'var(--primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '7px 12px',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background 0.2s ease',
          }}
        >
          <i className="fa fa-calendar-check-o"></i> Booking
        </button>

        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultPackageSlug={packageSlug}
        />
      </>
    );
  }

  if (variant === 'inline') {
    return (
      <>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-booking-primary"
            style={{
              flex: '1 1 200px',
              background: 'var(--primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '14px 22px',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 14px rgba(24, 90, 56, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fa fa-calendar-check-o" style={{ fontSize: '18px' }}></i> Booking Sekarang
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 200px',
              background: '#25d366',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '14px 22px',
              fontSize: '15px',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.2)',
            }}
          >
            <i className="fa fa-whatsapp" style={{ fontSize: '20px' }}></i> Chat via WhatsApp
          </a>
        </div>

        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultPackageSlug={packageSlug}
        />
      </>
    );
  }

  // Default: variant === 'sidebar'
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          style={{
            width: '100%',
            background: 'var(--primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '13px 16px',
            fontSize: '14.5px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(24, 90, 56, 0.25)',
            transition: 'background 0.2s ease',
          }}
        >
          <i className="fa fa-calendar-check-o"></i> Booking Sekarang
        </button>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sidebar-wa"
          style={{
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <i className="fa fa-whatsapp"></i> Chat WhatsApp
        </a>
      </div>

      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPackageSlug={packageSlug}
      />
    </>
  );
}
