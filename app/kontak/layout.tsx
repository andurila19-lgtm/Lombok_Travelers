import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak & Lokasi Kantor Basecamp — Lombok_Travelers Tetebatu',
  description:
    'Hubungi Lombok_Travelers via WhatsApp 24/7 di 0831-1711-0638 atau kunjungi kantor basecamp kami di Jl. Pariwisata Tetebatu, Kec. Sikur, Lombok Timur. Konsultasi itinerary gratis!',
  alternates: {
    canonical: 'https://lomboktravelers.com/kontak',
  },
  openGraph: {
    title: 'Hubungi Lombok_Travelers — Layanan Pelanggan 24 Jam',
    description:
      'Konsultasikan rencana liburan Anda bersama tour planner kami. Respon cepat ramah via WhatsApp.',
    url: 'https://lomboktravelers.com/kontak',
    images: [
      {
        url: '/images/hero_tetebatu.png',
        width: 1200,
        height: 630,
        alt: 'Kontak Lombok Travelers',
      },
    ],
  },
};

export default function KontakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
