import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyWhatsApp from '@/components/StickyWhatsApp';

export const metadata: Metadata = {
  metadataBase: new URL('https://lomboktravelers.com'),
  title: 'Lombok_Travelers — Paket Wisata Lombok, Private Trip & Transportasi Tetebatu',
  description:
    'Lombok_Travelers adalah local travel partner di Tetebatu, Lombok Timur. Melayani paket wisata Lombok 2H1M, 3H2M, 4H3M, trip harian, private tour, dan sewa transportasi bergaransi ramah & profesional.',
  keywords: [
    'paket wisata lombok',
    'tour lombok murah',
    'private trip lombok',
    'tetebatu lombok timur',
    'paket tour 3 hari 2 malam lombok',
    'snorkeling gili trawangan',
    'sewa mobil lombok',
    'lombok travelers'
  ],
  authors: [{ name: 'Lombok_Travelers' }],
  creator: 'Lombok_Travelers',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://lomboktravelers.com',
    siteName: 'Lombok_Travelers',
    title: 'Lombok_Travelers — Paket Wisata Lombok & Private Trip Tetebatu',
    description:
      'Jelajahi Lombok dengan cara yang lebih berkesan bersama tim lokal asli Tetebatu. Paket wisata 2H1M, 3H2M, 4H3M, custom trip dan transportasi.',
    images: [
      {
        url: '/images/hero_tetebatu.png',
        width: 1200,
        height: 630,
        alt: 'Lombok_Travelers Tetebatu Landscape'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lombok_Travelers — Paket Wisata Lombok & Private Trip',
    description: 'Local travel partner di Tetebatu, Lombok Timur. Paket wisata, private trip & transportasi.',
    images: ['/images/hero_tetebatu.png']
  }
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Lombok_Travelers',
    image: 'https://lomboktravelers.com/images/logo.png',
    '@id': 'https://lomboktravelers.com/#agency',
    url: 'https://lomboktravelers.com',
    telephone: '+6283117110638',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tetebatu, Kec. Sikur',
      addressLocality: 'Lombok Timur',
      addressRegion: 'Nusa Tenggara Barat',
      postalCode: '83662',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -8.5305,
      longitude: 116.4172
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '06:00',
      closes: '22:00'
    },
    sameAs: [
      'https://www.instagram.com/lombok_travelers',
      'https://wa.me/6283117110638'
    ]
  };

  return (
    <html lang="id">
      <head>
        <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <StickyWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
