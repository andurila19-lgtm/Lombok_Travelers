'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface FaqItem {
  q: string;
  qEn: string;
  a: string;
  aEn: string;
}

export const faqsData: FaqItem[] = [
  {
    q: 'Apakah paket wisata di Lombok_Travelers bersifat private atau digabung rombongan lain?',
    qEn: 'Are the tour packages private or shared with other travelers?',
    a: 'Seluruh paket wisata kami berstatus 100% Private Trip. Artinya, kendaraan ber-AC, driver lokal, serta private boat snorkeling hanya diperuntukkan bagi Anda dan keluarga/rombongan Anda sendiri, tanpa digabung dengan tamu lain. Jadwal perjalanan pun lebih fleksibel dan santai.',
    aEn: 'All of our tour packages are 100% Private Trips. Your air-conditioned car, local Sasak driver, and snorkeling boat are exclusively dedicated to you and your party, ensuring optimal privacy and a relaxed pace.',
  },
  {
    q: 'Apakah harga paket sudah termasuk tiket pesawat ke Lombok?',
    qEn: 'Do package prices include flights to Lombok?',
    a: 'Harga paket wisata darat kami belum termasuk tiket pesawat ke/dari Lombok. Hal ini memberi Anda keleluasaan memilih maskapai, waktu penerbangan, dan promo tiket terbaik. Penjemputan di Bandara Internasional Lombok (BIL) sudah termasuk penuh dalam paket.',
    aEn: 'Packages do not include flights to Lombok, allowing you the flexibility to book your preferred airline and schedule. However, VIP airport pick-up and drop-off in Lombok are fully included in all packages.',
  },
  {
    q: 'Bagaimana cara booking dan sistem pembayarannya?',
    qEn: 'How do I book and what is the payment process?',
    a: 'Proses booking sangat mudah: hubungi tim kami via WhatsApp untuk konfirmasi tanggal, destinasi, dan jumlah peserta. Anda cukup membayar uang muka (DP) sebesar 30% untuk mengamankan armada dan pemandu. Pelunasan sisa pembayaran dapat dilakukan secara fleksibel saat tiba di Lombok.',
    aEn: 'Booking is simple: chat with our team on WhatsApp to confirm dates, itinerary, and group size. A 30% deposit secures your booking, and the remaining balance can be settled upon your arrival in Lombok.',
  },
  {
    q: 'Apakah rute perjalanan (itinerary) bisa di-custom sesuai keinginan?',
    qEn: 'Can the itinerary be customized to our preferences?',
    a: 'Sangat bisa! Sebagai biro lokal Tetebatu, kami sangat fleksibel. Anda dapat menambah destinasi seperti trekking sawah Tetebatu, air terjun Benang Kelambu, Pantai Pink, atau Bukit Merese sesuai preferensi dan ritme liburan Anda.',
    aEn: 'Absolutely! As a local Tetebatu operator, we happily customize itineraries based on your interests—whether that means extra waterfall hikes, pink beaches, or relaxing café stops.',
  },
  {
    q: 'Kapan waktu terbaik untuk liburan ke Pulau Lombok?',
    qEn: 'When is the best time to visit Lombok?',
    a: 'Waktu terbaik secara umum adalah musim kemarau (Mei hingga Oktober) dengan cuaca cerah dan jarak pandang bawah air sangat jernih untuk snorkeling 3 Gili. Jika Anda menyukai pemandangan sawah Tetebatu dan Sembalun yang hijau segar bak zamrud, bulan Desember hingga April juga sangat mempesona.',
    aEn: 'The dry season from May to October is prime for sunny beach days, climbing Mount Rinjani, and clear snorkeling in the Gilis. Meanwhile, December to April offers lush emerald-green rice terraces in Tetebatu and Sembalun.',
  },
  {
    q: 'Apakah aman untuk anak-anak, lansia, atau pemula snorkeling?',
    qEn: 'Is it safe for children, seniors, and beginner snorkelers?',
    a: 'Sangat aman. Tim driver dan guide lokal kami terlatih mendampingi keluarga dengan anak-anak maupun lansia. Untuk trip snorkeling di 3 Gili, kami menyediakan pelampung standar keselamatan (life jacket) dan guide perahu akan mendampingi Anda langsung di air.',
    aEn: 'Very safe. Our local guides and drivers take great care of families with kids and seniors. For snorkeling tours, certified life jackets and in-water guide assistance are provided at all times.',
  },
];

export default function FaqSection() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq" style={{ padding: '70px 0', background: 'var(--bg-surface)' }}>
      <div className="box1140">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <span className="section-tag" style={{ background: 'var(--primary-soft)', color: 'var(--primary)', padding: '5px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {language === 'en' ? 'Help & Knowledge Center' : 'Tanya Jawab Wisatawan'}
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navy)', marginTop: '12px', marginBottom: '10px' }}>
            {language === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan yang Sering Diajukan (FAQ)'}
          </h2>
          <p style={{ color: 'var(--dark-soft)', fontSize: '14.5px', lineHeight: 1.6 }}>
            {language === 'en'
              ? 'Everything you need to know about booking private tours, custom itineraries, and traveling in Lombok.'
              : 'Informasi lengkap seputar pemesanan paket wisata, fleksibilitas perjalanan, dan tips berlibur di Lombok bersama Lombok_Travelers.'}
          </p>
        </div>

        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqsData.map((item, idx) => {
            const isOpen = openIndex === idx;
            const question = language === 'en' ? item.qEn : item.q;
            const answer = language === 'en' ? item.aEn : item.a;

            return (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border)',
                  borderRadius: '10px',
                  boxShadow: isOpen ? '0 4px 15px rgba(24, 90, 56, 0.08)' : '0 1px 3px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '15.5px',
                    fontWeight: 700,
                    color: isOpen ? 'var(--primary)' : 'var(--dark)',
                  }}
                >
                  <span>{question}</span>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isOpen ? 'var(--primary)' : 'var(--border-light)',
                      color: isOpen ? '#ffffff' : 'var(--dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      flexShrink: 0,
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <i className={`fa ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 22px 20px 22px',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: '#475569',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '14px',
                    }}
                  >
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <p style={{ fontSize: '13.5px', color: 'var(--muted)', marginBottom: '12px' }}>
            {language === 'en'
              ? 'Still have a specific question about your trip plan?'
              : 'Punya pertanyaan khusus seputar rombongan atau request destinasi lain?'}
          </p>
          <a
            href="https://wa.me/6283117110638?text=Halo%20Lombok_Travelers,%20saya%20punya%20pertanyaan%20seputar%20paket%20wisata%20Lombok."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <i className="fa fa-whatsapp" style={{ color: '#25d366', fontSize: '18px' }}></i>{' '}
            {language === 'en' ? 'Ask Our Tour Consultant' : 'Tanya Konsultan Tour via WhatsApp'}
          </a>
        </div>
      </div>
    </section>
  );
}
