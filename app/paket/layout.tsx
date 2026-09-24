import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paket Wisata Lombok & Private Tour Murah 2026 — Lombok_Travelers',
  description:
    'Katalog lengkap paket wisata Lombok: Paket 2H1M, 3H2M, 4H3M, 5H4M, dan Honeymoon romantis. Fasilitas private car, hotel bintang, boat snorkeling, dan guide lokal asli Sasak.',
  alternates: {
    canonical: 'https://lomboktravelers.com/paket',
  },
  openGraph: {
    title: 'Katalog Paket Wisata Lombok Lengkap & Bergaransi — Lombok_Travelers',
    description:
      'Pilihan private trip terbaik di Lombok. Eksplorasi Mandalika, 3 Gili, Tetebatu, dan Sembalun bersama tim lokal berlisensi.',
    url: 'https://lomboktravelers.com/paket',
    siteName: 'Lombok_Travelers',
    images: [
      {
        url: '/images/hero_tetebatu.png',
        width: 1200,
        height: 630,
        alt: 'Paket Wisata Lombok Travelers',
      },
    ],
  },
};

export default function PaketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
