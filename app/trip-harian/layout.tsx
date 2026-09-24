import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trip Harian Lombok: Snorkeling 3 Gili & Air Terjun Tetebatu — Lombok_Travelers',
  description:
    'Pilihan one-day trip harian di Lombok: Snorkeling 3 Gili Trawangan, Air Terjun Sarang Walet Tetebatu, Panorama Sembalun, dan Pantai Pink. Berangkat setiap hari tanpa repot.',
  alternates: {
    canonical: 'https://lomboktravelers.com/trip-harian',
  },
  openGraph: {
    title: 'Trip Harian Lombok Terbaik — Snorkeling & Wisata Alam',
    description:
      'Jelajahi keindahan Lombok dalam 1 hari dengan private transport, boat snorkeling, dan pemandu lokal Tetebatu.',
    url: 'https://lomboktravelers.com/trip-harian',
    images: [
      {
        url: '/images/gili_snorkeling.jpg',
        width: 1200,
        height: 630,
        alt: 'Trip Harian Lombok Snorkeling',
      },
    ],
  },
};

export default function TripHarianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
