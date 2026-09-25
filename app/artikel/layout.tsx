import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panduan Wisata & Tips Liburan ke Lombok Terbaru 2026 — Lombok_Travelers',
  description:
    'Kumpulan artikel, tips snorkeling 3 Gili, rute trekking Gunung Rinjani, pesona Desa Wisata Tetebatu, dan rekomendasi kuliner khas Sasak langsung dari pemandu lokal.',
  alternates: {
    canonical: 'https://lomboktravelers.reaksy.com/artikel',
  },
  openGraph: {
    title: 'Panduan & Artikel Wisata Lombok Terlengkap — Lombok_Travelers',
    description:
      'Tips traveling, rute rahasia, rekomendasi musim liburan, dan panduan budaya Lombok dari tim lokal Tetebatu.',
    url: 'https://lomboktravelers.reaksy.com/artikel',
    images: [
      {
        url: '/images/rinjani_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Artikel Wisata Lombok Travelers',
      },
    ],
  },
};

export default function ArtikelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
