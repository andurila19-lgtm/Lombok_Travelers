'use client';

import { useState } from 'react';
import BookingModal from './BookingModal';
import { useLanguage } from '@/context/LanguageContext';

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
  const { language, t } = useLanguage();

  const isEn = language === 'en';
  const waText = isEn
    ? `Hello Lombok_Travelers, I would like to consult about booking ${packageTitle}.`
    : `Halo Lombok_Travelers, saya ingin konsultasi booking ${packageTitle}.`;
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
          <i className="fa fa-calendar-check-o"></i> {t.buttons.book}
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
        <div className="booking-cta-buttons-row" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-booking-primary"
            style={{
              flex: '1 1 160px',
              background: 'linear-gradient(135deg, #185a38 0%, #0f3d26 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '11px 16px',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 3px 10px rgba(24, 90, 56, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <i className="fa fa-calendar-check-o" style={{ fontSize: '15px' }}></i> {t.buttons.bookNow}
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: '1 1 160px',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '11px 16px',
              fontSize: '13.5px',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 3px 10px rgba(37, 211, 102, 0.2)',
            }}
          >
            <i className="fa fa-whatsapp" style={{ fontSize: '16px' }}></i> {t.buttons.chatWa}
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
          <i className="fa fa-calendar-check-o"></i> {t.buttons.bookNow}
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
          <i className="fa fa-whatsapp"></i> {t.buttons.chatWa}
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
