'use client';

import { useState } from 'react';
import AiConciergeModal from './AiConciergeModal';

export default function ConciergeTrigger() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="section-padding concierge-section">
        <div className="box1140">
          <div className="concierge-banner">
            <div className="concierge-left">
              <span className="concierge-tag">
                <i className="fa fa-lightbulb-o"></i> Butuh Bantuan Memilih?
              </span>
              <h3>Masih Bingung Memilih Paket?</h3>
              <p>
                Ceritakan kebutuhan perjalanan Anda, kami bantu menemukan paket yang paling sesuai dengan durasi, peserta, dan preferensi liburan Anda.
              </p>
            </div>
            <div>
              <button
                className="btn-concierge"
                onClick={() => setModalOpen(true)}
              >
                <i className="fa fa-compass" style={{ color: 'var(--primary)' }}></i> Chat dengan Travel Assistant
              </button>
            </div>
          </div>
        </div>
      </section>

      <AiConciergeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
