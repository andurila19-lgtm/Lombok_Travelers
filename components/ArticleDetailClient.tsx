'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

interface ArticleDetailClientProps {
  article: ArticleItem;
  relatedArticles: ArticleItem[];
}

export default function ArticleDetailClient({
  article,
  relatedArticles,
}: ArticleDetailClientProps) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const waText = isEn
    ? `Hello Lombok_Travelers, I just read your article "${article.title}" and would like to consult about visiting this destination.`
    : `Halo Lombok_Travelers, saya membaca artikel "${article.title}" dan ingin konsultasi trip ke destinasi ini.`;
  const waUrl = `https://wa.me/6283117110638?text=${encodeURIComponent(waText)}`;

  return (
    <>
      {/* HEADER BANNER & BREADCRUMBS */}
      <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '36px 15px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <nav style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#185a38', textDecoration: 'none', fontWeight: 600 }}>
              {isEn ? 'Home' : 'Beranda'}
            </Link>
            <span>›</span>
            <Link href="/artikel" style={{ color: '#185a38', textDecoration: 'none', fontWeight: 600 }}>
              {isEn ? 'Articles & Guides' : 'Artikel & Panduan'}
            </Link>
            <span>›</span>
            <span style={{ color: '#94a3b8' }}>{article.category}</span>
          </nav>

          <span
            style={{
              backgroundColor: '#dcfce7',
              color: '#15803d',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'inline-block',
              marginBottom: '10px',
            }}
          >
            {article.category}
          </span>

          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.25, margin: '0 0 14px 0' }}>
            {article.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px', color: '#64748b', flexWrap: 'wrap' }}>
            <span><i className="fa fa-clock-o" style={{ color: '#16a34a', marginRight: '5px' }}></i> {article.readTime}</span>
            <span>•</span>
            <span><i className="fa fa-calendar-o" style={{ color: '#16a34a', marginRight: '5px' }}></i> {article.date}</span>
            <span>•</span>
            <span><i className="fa fa-user-circle-o" style={{ color: '#16a34a', marginRight: '5px' }}></i> {isEn ? 'Lombok_Travelers Tetebatu Team' : 'Tim Lombok_Travelers Tetebatu'}</span>
          </div>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '36px 15px 80px 15px' }}>
        {/* Featured Image */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <img
            src={article.image}
            alt={article.title}
            style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Lead Excerpt */}
        <p
          style={{
            fontSize: '18px',
            lineHeight: 1.7,
            color: '#1e293b',
            fontWeight: 500,
            borderLeft: '4px solid #185a38',
            paddingLeft: '18px',
            marginBottom: '28px',
            fontStyle: 'italic',
          }}
        >
          {article.excerpt}
        </p>

        {/* Content Paragraphs */}
        <div style={{ fontSize: '16px', lineHeight: 1.8, color: '#334155' }}>
          {article.content.map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '20px' }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* AUTHOR & WHATSAPP CTA BOX */}
        <div
          style={{
            marginTop: '48px',
            background: 'linear-gradient(135deg, #091e13 0%, #185a38 100%)',
            borderRadius: '16px',
            padding: '30px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: '0 10px 25px -5px rgba(24, 90, 56, 0.3)',
          }}
        >
          <div style={{ maxWidth: '500px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#86efac', fontWeight: 800 }}>
              {isEn ? 'Route Consultation with Local Guides' : 'Konsultasi Rute Bersama Warga Lokal'}
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '6px 0 8px 0', color: '#ffffff' }}>
              {isEn ? 'Interested in Visiting This Destination?' : 'Tertarik Mengunjungi Destinasi Ini?'}
            </h3>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
              {isEn
                ? 'Plan your pickup schedule, private AC car rental, or daily trip package with official local guides from Lombok_Travelers in Tetebatu.'
                : 'Konsultasikan jadwal penjemputan, sewa mobil private AC, atau paket trip harian bersama tim pemandu resmi Lombok_Travelers di Tetebatu.'}
            </p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25d366',
              color: '#ffffff',
              padding: '12px 22px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)',
            }}
          >
            <i className="fa fa-whatsapp" style={{ fontSize: '18px' }}></i> {isEn ? 'Ask Schedule via WA' : 'Tanya Jadwal via WA'}
          </a>
        </div>

        {/* RELATED ARTICLES */}
        <div style={{ marginTop: '56px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
            {isEn ? 'More Articles & Travel Guides' : 'Artikel & Panduan Wisata Lainnya'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/artikel/${rel.slug}`}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '150px', overflow: 'hidden' }}>
                  <img
                    src={rel.image}
                    alt={rel.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {rel.category}
                  </span>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 8px 0', color: '#0f172a', lineHeight: 1.4, flex: 1 }}>
                    {rel.title}
                  </h4>
                  <span style={{ fontSize: '12px', color: '#185a38', fontWeight: 600 }}>
                    {isEn ? 'Read Guide ›' : 'Baca Selengkapnya ›'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
