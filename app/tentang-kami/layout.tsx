import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Lombok_Travelers — Partner Wisata Lokal Asli Tetebatu, Lombok Timur',
  description:
    'Profil Lombok_Travelers, agen perjalanan lokal berbasis di Tetebatu, Lombok Timur. Didirikan oleh pemandu lokal berlisensi dengan dedikasi memperkenalkan keaslian alam & budaya Lombok.',
  alternates: {
    canonical: 'https://lomboktravelers.com/tentang-kami',
  },
  openGraph: {
    title: 'Tentang Kami — Lombok_Travelers Tetebatu',
    description:
      'Kenal lebih dekat dengan tim lokal Lombok_Travelers. Layanan tour terpercaya, ramah, dan berpengalaman puluhan tahun.',
    url: 'https://lomboktravelers.com/tentang-kami',
    images: [
      {
        url: '/images/hero_tetebatu.png',
        width: 1200,
        height: 630,
        alt: 'Tentang Lombok Travelers Tetebatu',
      },
    ],
  },
};

export default function TentangKamiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
