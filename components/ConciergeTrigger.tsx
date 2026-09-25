'use client';

import { useState } from 'react';
import AiConciergeModal from './AiConciergeModal';
import { useLanguage } from '@/context/LanguageContext';

export default function ConciergeTrigger() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <section className="section-padding concierge-section">
        <div className="box1140">
          <div className="concierge-banner">
            <div className="concierge-left">
              <span className="concierge-tag">
                <i className="fa fa-lightbulb-o"></i> {t.concierge?.tag || 'Butuh Bantuan Memilih?'}
              </span>
              <h3>{t.concierge?.bannerTitle || 'Masih Bingung Memilih Paket?'}</h3>
              <p>
                {t.concierge?.bannerDesc || 'Ceritakan kebutuhan perjalanan Anda, kami bantu menemukan paket yang paling sesuai dengan durasi, peserta, dan preferensi liburan Anda.'}
              </p>
            </div>
            <div>
              <button
                className="btn-concierge"
                onClick={() => setModalOpen(true)}
              >
                <i className="fa fa-compass" style={{ color: 'var(--primary)' }}></i> {t.concierge?.bannerBtn || 'Chat dengan Travel Assistant'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <AiConciergeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
