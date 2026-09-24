import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sewa Mobil Lombok Murah + Driver Ramah & BBM — Lombok_Travelers',
  description:
    'Rental mobil Lombok terlengkap: Avanza, Innova Reborn, HiAce Commuter & Premio, Fortuner, dan Alphard. Armada bersih, AC dingin, driver asli lokal paham rute dan ramah keluarga.',
  alternates: {
    canonical: 'https://lomboktravelers.com/transport',
  },
  openGraph: {
    title: 'Sewa Mobil & Transportasi Wisata Lombok Bergaransi — Lombok_Travelers',
    description:
      'Layanan sewa mobil private harian dan drop airport Lombok. Termasuk BBM dan driver profesional berpengalaman.',
    url: 'https://lomboktravelers.com/transport',
    images: [
      {
        url: '/images/hero_tetebatu.png',
        width: 1200,
        height: 630,
        alt: 'Sewa Mobil Lombok Travelers',
      },
    ],
  },
};

export default function TransportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
