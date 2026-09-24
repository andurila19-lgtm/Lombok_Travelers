'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    home: string;
    tourPackages: string;
    dailyTrips: string;
    transport: string;
    articles: string;
    aboutUs: string;
    allPackages: string;
    chatWa: string;
  };
  hero: {
    headline: string;
    subline: string;
    description: string;
  };
  search: {
    catLabel: string;
    allCat: string;
    destLabel: string;
    allDest: string;
    durLabel: string;
    allDur: string;
    btnText: string;
    catHoliday: string;
    catPrivate: string;
    catHoneymoon: string;
    catDaily: string;
    catTetebatu: string;
    dur1Day: string;
    dur2D1N: string;
    dur3D2N: string;
    dur4D3N: string;
    dur5D4N: string;
  };
  why: {
    title1: string;
    title2: string;
    features: Array<{
      title: string;
      desc: string;
    }>;
  };
  packages: {
    tag: string;
    title: string;
    subtitle: string;
    tabAll: string;
    tabMulti: string;
    tabDaily: string;
    tabHoneymoon: string;
    tabCulture: string;
    perPerson: string;
    viewDetail: string;
    consultWa: string;
    bestSellerBadge: string;
  };
  daily: {
    tag: string;
    title: string;
    subtitle: string;
    bookNow: string;
    durationPrefix: string;
  };
  destinations: {
    tag: string;
    title: string;
    subtitle: string;
  };
  customTrip: {
    tag: string;
    title: string;
    subtitle: string;
    desc: string;
    nameLabel: string;
    waLabel: string;
    dateLabel: string;
    participantsLabel: string;
    prefLabel: string;
    notesLabel: string;
    btnSubmit: string;
  };
  transport: {
    tag: string;
    title: string;
    subtitle: string;
    rentNow: string;
  };
  gallery: {
    tag: string;
    title: string;
    subtitle: string;
  };
  testimonials: {
    tag: string;
    title: string;
    subtitle: string;
  };
  whatsapp: {
    bubble: string;
    defaultMsg: string;
  };
  footer: {
    desc: string;
    servicesTitle: string;
    contactTitle: string;
    copyright: string;
  };
}

const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'Home',
      tourPackages: 'Paket Wisata',
      dailyTrips: 'Trip Harian',
      transport: 'Transport',
      articles: 'Artikel',
      aboutUs: 'Tentang Kami',
      allPackages: 'Lihat Semua Paket',
      chatWa: 'Chat WhatsApp'
    },
    hero: {
      headline: 'Dapatkan Pengalaman Berkesan',
      subline: 'Mengunjungi destinasi terbaik di Pulau Lombok',
      description: 'Kami menyediakan paket wisata dengan destinasi terbaik di Pulau Lombok dan dokumentasi terlengkap'
    },
    search: {
      catLabel: 'Pilih Kategori:',
      allCat: 'Semua Kategori',
      destLabel: 'Pilih Destinasi:',
      allDest: 'Semua Destinasi',
      durLabel: 'Pilih Durasi:',
      allDur: 'Semua Durasi',
      btnText: 'CARI TOUR',
      catHoliday: 'Paket Wisata Lombok',
      catPrivate: 'Private Trip',
      catHoneymoon: 'Paket Honeymoon',
      catDaily: 'Paket Trip Harian',
      catTetebatu: 'Tetebatu & Cultural',
      dur1Day: '1 Hari (Trip Harian)',
      dur2D1N: '2 Hari 1 Malam',
      dur3D2N: '3 Hari 2 Malam',
      dur4D3N: '4 Hari 3 Malam',
      dur5D4N: '5 Hari 4 Malam'
    },
    why: {
      title1: 'Kenapa Wajib Memilih Tour Wisata di Lombok',
      title2: 'Bersama Lombok_Travelers',
      features: [
        {
          title: 'Travel Agen Resmi',
          desc: 'Biro perjalanan wisata resmi lokal terdaftar berpusat di Tetebatu, Lombok Timur.'
        },
        {
          title: 'Tim Berpengalaman',
          desc: 'Tour Anda akan dilayani oleh tim lokal kami yang sudah berpengalaman di bidang pelayanan wisata.'
        },
        {
          title: 'Gratis Dokumentasi',
          desc: 'Paket wisata yang kami tawarkan sudah termasuk GRATIS dokumentasi foto & action cam GoPro bawah laut.'
        },
        {
          title: 'Travel Photographer',
          desc: 'Selama tour Anda akan ditemani oleh Tour Leader kami yang siap mengabadikan momen liburan terbaik.'
        },
        {
          title: 'Tanpa Biaya Tersembunyi',
          desc: 'Harga paket all-in transparan, jujur tanpa ada biaya tambahan tak terduga selama di lapangan.'
        }
      ]
    },
    packages: {
      tag: 'Katalog Pilihan',
      title: 'Paket Wisata Lengkap',
      subtitle: 'Pilih paket perjalanan sesuai durasi dan kebutuhan Anda.',
      tabAll: 'Semua Paket',
      tabMulti: 'Multi-Day (2H1M - 5H4M)',
      tabDaily: 'Trip Harian (1 Hari)',
      tabHoneymoon: 'Honeymoon',
      tabCulture: 'Tetebatu & Culture',
      perPerson: 'Harga mulai / orang',
      viewDetail: 'Lihat Detail Paket',
      consultWa: 'Tanya WA',
      bestSellerBadge: 'BEST SELLER'
    },
    daily: {
      tag: 'One-Day Adventure',
      title: 'Pilihan Trip Harian Lombok',
      subtitle: 'Paket perjalanan satu hari private eksklusif dengan penjemputan dari hotel Anda.',
      bookNow: 'Booking Trip',
      durationPrefix: 'Durasi'
    },
    destinations: {
      tag: 'Destinasi Favorit',
      title: 'Spot Wisata Terindah di Lombok',
      subtitle: 'Eksplorasi keindahan alam mulai dari pegunungan hijau Tetebatu hingga pantai eksotis Gili.'
    },
    customTrip: {
      tag: 'Rencanakan Liburan Sendiri',
      title: 'Custom Itinerary Sesuai Keinginan',
      subtitle: 'Punya destinasi impian sendiri atau liburan keluarga besar? Konsultasikan rencana trip Anda.',
      desc: 'Isi preferensi perjalanan Anda di bawah ini, tim kami akan merancang rute liburan terbaik dengan harga paling bersahabat.',
      nameLabel: 'Nama Lengkap',
      waLabel: 'Nomor WhatsApp Aktif',
      dateLabel: 'Rencana Tanggal Perjalanan',
      participantsLabel: 'Jumlah Peserta (Orang)',
      prefLabel: 'Kategori / Destinasi Pilihan',
      notesLabel: 'Catatan Khusus / Permintaan Khusus',
      btnSubmit: 'Kirim via WhatsApp Otomatis'
    },
    transport: {
      tag: 'Armada & Driver Lokal',
      title: 'Sewa Mobil & Transport Lombok',
      subtitle: 'Layanan sewa armada terawat include driver ramah asli Lombok + BBM untuk kenyamanan liburan Anda.',
      rentNow: 'Sewa Sekarang'
    },
    gallery: {
      tag: 'Galeri Momen',
      title: 'Keseruan Para Traveler Bersama Kami',
      subtitle: 'Dokumentasi asli pelanggan saat menjelajahi keindahan alam Pulau Lombok.'
    },
    testimonials: {
      tag: 'Ulasan Jujur',
      title: 'Apa Kata Para Tamu Lombok_Travelers',
      subtitle: 'Testimoni nyata dari wisatawan nusantara & mancanegara yang berwisata bersama kami.'
    },
    whatsapp: {
      bubble: 'Halo, Ada yang bisa kami bantu?',
      defaultMsg: 'Halo Lombok_Travelers, saya ingin konsultasi paket liburan ke Lombok.'
    },
    footer: {
      desc: 'Biro perjalanan wisata resmi lokal berpusat di Tetebatu, Lombok Timur. Mitra terpercaya untuk private tour, paket wisata keluarga, honeymoon, serta transportasi Lombok.',
      servicesTitle: 'Layanan Wisata',
      contactTitle: 'Hubungi Kami',
      copyright: 'Hak Cipta Dilindungi Undang-Undang. Tetebatu, Lombok Timur, NTB.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      tourPackages: 'Tour Packages',
      dailyTrips: 'Daily Trips',
      transport: 'Transport',
      articles: 'Articles',
      aboutUs: 'About Us',
      allPackages: 'View All Packages',
      chatWa: 'WhatsApp Chat'
    },
    hero: {
      headline: 'Get an Unforgettable Experience',
      subline: 'Visiting the best destinations on Lombok Island',
      description: 'We provide premier tour packages with Lombok’s finest destinations and comprehensive documentation'
    },
    search: {
      catLabel: 'Select Category:',
      allCat: 'All Categories',
      destLabel: 'Select Destination:',
      allDest: 'All Destinations',
      durLabel: 'Select Duration:',
      allDur: 'All Durations',
      btnText: 'SEARCH TOUR',
      catHoliday: 'Lombok Tour Packages',
      catPrivate: 'Private Trips',
      catHoneymoon: 'Honeymoon Packages',
      catDaily: 'Daily Day Trips',
      catTetebatu: 'Tetebatu & Cultural',
      dur1Day: '1 Day (Daily Trip)',
      dur2D1N: '2 Days 1 Night',
      dur3D2N: '3 Days 2 Nights',
      dur4D3N: '4 Days 3 Nights',
      dur5D4N: '5 Days 4 Nights'
    },
    why: {
      title1: 'Why Choose Lombok Tour Wisata',
      title2: 'With Lombok_Travelers',
      features: [
        {
          title: 'Licensed Travel Agency',
          desc: 'Official registered local travel agency based in Tetebatu, East Lombok.'
        },
        {
          title: 'Experienced Local Team',
          desc: 'Your tour will be guided by our friendly, knowledgeable local team with years of expertise.'
        },
        {
          title: 'Free Documentation',
          desc: 'All tour packages include complimentary high-res photography and underwater GoPro action shots.'
        },
        {
          title: 'Dedicated Tour Photographer',
          desc: 'Your Tour Leader captures your best holiday moments throughout the journey.'
        },
        {
          title: 'Transparent & No Hidden Costs',
          desc: 'All-inclusive transparent pricing with zero surprise extra charges on the ground.'
        }
      ]
    },
    packages: {
      tag: 'Handpicked Catalog',
      title: 'Complete Tour Packages',
      subtitle: 'Select the ideal travel package tailored to your schedule and preferences.',
      tabAll: 'All Packages',
      tabMulti: 'Multi-Day (2D1N - 5D4N)',
      tabDaily: 'Day Trips (1 Day)',
      tabHoneymoon: 'Honeymoon',
      tabCulture: 'Tetebatu & Culture',
      perPerson: 'Starting from / person',
      viewDetail: 'View Package Details',
      consultWa: 'Chat WhatsApp',
      bestSellerBadge: 'BEST SELLER'
    },
    daily: {
      tag: 'One-Day Adventure',
      title: 'Lombok Daily Day Trips',
      subtitle: 'Exclusive private 1-day excursions including round-trip pickup directly from your hotel.',
      bookNow: 'Book Trip',
      durationPrefix: 'Duration'
    },
    destinations: {
      tag: 'Favorite Destinations',
      title: 'Most Breathtaking Spots in Lombok',
      subtitle: 'Explore pristine nature from the lush terraced valleys of Tetebatu to the exotic shores of the Gili Islands.'
    },
    customTrip: {
      tag: 'Tailor-Made Holiday',
      title: 'Custom Itinerary to Fit Your Dream',
      subtitle: 'Have specific dream spots or traveling with a large family? Consult with our local trip designers.',
      desc: 'Fill out your travel preferences below, and our team will craft the optimal route at the most reasonable local rates.',
      nameLabel: 'Full Name',
      waLabel: 'Active WhatsApp Number',
      dateLabel: 'Planned Travel Date',
      participantsLabel: 'Number of Guests',
      prefLabel: 'Preferred Category / Destinations',
      notesLabel: 'Special Requests or Notes',
      btnSubmit: 'Send via WhatsApp Automatically'
    },
    transport: {
      tag: 'Fleet & Local Drivers',
      title: 'Car Rental & Transport Lombok',
      subtitle: 'Well-maintained vehicles inclusive of friendly local driver + fuel for your ultimate holiday comfort.',
      rentNow: 'Rent Now'
    },
    gallery: {
      tag: 'Moment Gallery',
      title: 'Traveler Highlights With Us',
      subtitle: 'Authentic photos from our delighted guests exploring the wonders of Lombok Island.'
    },
    testimonials: {
      tag: 'Verified Reviews',
      title: 'What Our Guests Say About Lombok_Travelers',
      subtitle: 'Genuine feedback from travelers who explored Lombok with our local team.'
    },
    whatsapp: {
      bubble: 'Hello, how can we help you?',
      defaultMsg: 'Hello Lombok_Travelers, I would like to inquire about holiday packages in Lombok.'
    },
    footer: {
      desc: 'Official local travel agency headquartered in Tetebatu, East Lombok. Your trusted partner for private tours, family vacations, honeymoon escapes, and transport services.',
      servicesTitle: 'Tour Services',
      contactTitle: 'Contact Us',
      copyright: 'All Rights Reserved. Tetebatu, East Lombok, NTB, Indonesia.'
    }
  }
};

export type Currency = 'IDR' | 'USD';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (idrAmount: number) => string;
  convertPriceString: (priceStr: string) => string;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'id',
  setLanguage: () => {},
  currency: 'IDR',
  setCurrency: () => {},
  formatPrice: (amount) => `Rp ${amount.toLocaleString('id-ID')}`,
  convertPriceString: (str) => str,
  t: translations.id
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [currency, setCurrencyState] = useState<Currency>('IDR');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('lombok_lang') as Language | null;
      if (savedLang === 'id' || savedLang === 'en') {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
      }
      const savedCurr = localStorage.getItem('lombok_currency') as Currency | null;
      if (savedCurr === 'IDR' || savedCurr === 'USD') {
        setCurrencyState(savedCurr);
      }
    } catch {
      // ignore SSR or storage exceptions
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('lombok_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem('lombok_currency', curr);
    } catch {
      // ignore
    }
  };

  // Kurs standar: $1 USD = ~Rp 15.800
  const formatPrice = (idrAmount: number) => {
    if (currency === 'USD') {
      const usd = Math.round(idrAmount / 15800);
      return `$${usd} USD`;
    }
    return `Rp ${idrAmount.toLocaleString('id-ID')}`;
  };

  const convertPriceString = (priceStr: string) => {
    if (currency !== 'USD' || !priceStr) return priceStr;
    // Extract numbers from string like "Rp 1.650.000 / pax"
    const cleaned = priceStr.replace(/[^\d]/g, '');
    const num = parseInt(cleaned, 10);
    if (!num || isNaN(num)) return priceStr;
    const usd = Math.round(num / 15800);
    return priceStr.replace(/Rp\s*[\d.]+/i, `$${usd} USD`);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        formatPrice,
        convertPriceString,
        t: translations[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
