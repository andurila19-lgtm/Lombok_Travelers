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
  buttons: {
    book: string;
    bookNow: string;
    detail: string;
    viewDetail: string;
    chatWa: string;
    chatWaLong: string;
    submit: string;
    resetFilter: string;
  };
  packageDetail: {
    breadcrumbHome: string;
    breadcrumbTour: string;
    startingFrom: string;
    perPerson: string;
    packageDescTitle: string;
    itineraryTitle: string;
    facilitiesTitle: string;
    inclusionsTitle: string;
    exclusionsTitle: string;
    extraAddonsTitle: string;
    droneTitle: string;
    droneDesc: string;
    reelsTitle: string;
    reelsDesc: string;
    priceTitle: string;
    priceSubtitle: string;
    colPax: string;
    colNoHotel: string;
    colHotel3: string;
    colHotel4: string;
    row2pax: string;
    row3pax: string;
    row5pax: string;
    row7pax: string;
    valConsult: string;
    valRequest: string;
    valSpecialGroup: string;
    priceNote: string;
    ctaQuestion: string;
    reviewsTitle: string;
    review1Text: string;
    review1Author: string;
    review2Text: string;
    review2Author: string;
    sidebarFrom: string;
    sidebarPerPax: string;
    sidebarCar: string;
    sidebarDriver: string;
    sidebarTickets: string;
    sidebarFastResp: string;
    basecampTitle: string;
    basecampSubtitle: string;
    basecampDesc: string;
    basecampLink: string;
    relatedTag: string;
    relatedTitle: string;
    viewAllPkgs: string;
  };
  bookingModal: {
    systemBadge: string;
    titleNew: string;
    titleSuccess: string;
    nameLabel: string;
    namePlaceholder: string;
    waLabel: string;
    waPlaceholder: string;
    waHint: string;
    emailLabel: string;
    emailPlaceholder: string;
    pkgLabel: string;
    dateLabel: string;
    paxLabel: string;
    pickupLabel: string;
    pickupPlaceholder: string;
    transportLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    termsText: string;
    btnSubmitting: string;
    btnSubmit: string;
    successTitle: string;
    successSubtitle: string;
    refLabel: string;
    summaryPkg: string;
    summaryDate: string;
    summaryPax: string;
    summaryStatus: string;
    followUpPrompt: string;
    btnWaConfirm: string;
    btnClose: string;
    errorName: string;
    errorWa: string;
    errorDate: string;
    errorDatePast: string;
    errorPax: string;
    errorGeneral: string;
  };
  concierge: {
    tag: string;
    bannerTitle: string;
    bannerDesc: string;
    bannerBtn: string;
    modalTag: string;
    modalTitle: string;
    modalSubtitle: string;
    q1: string;
    q1Opt1: string;
    q1Opt2: string;
    q1Opt3: string;
    q2: string;
    q2Opt1: string;
    q2Opt2: string;
    q2Opt3: string;
    q3: string;
    q3Opt1: string;
    q3Opt2: string;
    q3Opt3: string;
    btnCalculate: string;
    recTag: string;
    btnViewPkg: string;
    btnConsultWa: string;
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
    },
    buttons: {
      book: 'Booking',
      bookNow: 'Booking Sekarang',
      detail: 'Detail',
      viewDetail: 'Lihat Detail',
      chatWa: 'Chat WA',
      chatWaLong: 'Chat via WhatsApp',
      submit: 'Kirim',
      resetFilter: 'Reset Filter'
    },
    packageDetail: {
      breadcrumbHome: 'Home',
      breadcrumbTour: 'Paket Wisata Lombok',
      startingFrom: 'Mulai dari:',
      perPerson: 'per orang / private trip',
      packageDescTitle: 'Deskripsi Paket',
      itineraryTitle: 'Rencana Perjalanan (Itinerary)',
      facilitiesTitle: 'Fasilitas Paket',
      inclusionsTitle: 'Paket Termasuk:',
      exclusionsTitle: 'Paket Tidak Termasuk:',
      extraAddonsTitle: 'Layanan Tambahan Dokumentasi Profesional',
      droneTitle: 'Dokumentasi Drone (Footage Udara HD)',
      droneDesc: 'Pilot drone profesional + RAW footage pantai & bukit Lombok: Konsultasikan / Rp 750.000/hari',
      reelsTitle: 'Video Sinematik + Editing Reels Instagram/TikTok',
      reelsDesc: 'Kamera mirrorless & underwater GoPro + edited video siap upload: Konsultasikan / Rp 1.500.000/trip',
      priceTitle: 'Harga',
      priceSubtitle: 'Harga dihitung per orang (pax) disesuaikan dengan jumlah rombongan dan pilihan kelas penginapan:',
      colPax: 'Jumlah Peserta',
      colNoHotel: 'Paket Tanpa Hotel',
      colHotel3: 'Paket Hotel Bintang 3',
      colHotel4: 'Paket Hotel Bintang 4',
      row2pax: '2 Orang (Pasangan/Duet)',
      row3pax: '3 – 4 Orang (Keluarga Kecil)',
      row5pax: '5 – 6 Orang (Grup Sedang)',
      row7pax: '7 – 12+ Orang (Rombongan HiAce)',
      valConsult: 'Konsultasikan',
      valRequest: 'Request Price',
      valSpecialGroup: 'Spesial Grup',
      priceNote: '* Harga dapat disesuaikan berdasarkan jumlah peserta, periode liburan (High/Peak Season Lebaran, Natal & Tahun Baru), serta preferensi hotel. Hubungi tim Lombok_Travelers untuk penawaran terbaik dan diskon khusus rombongan.',
      ctaQuestion: 'Sudah punya rencana tanggal perjalanan? Ajukan booking sekarang untuk mengamankan jadwal armada dan pemandu lokal kami:',
      reviewsTitle: 'Ulasan Tamu Paket Ini',
      review1Text: '"Program perjalanan sangat pas temponya, tidak buru-buru. Guide supirnya dari Tetebatu sangat ramah dan sabar menemani keluarga kami. Pemandangan Lombok luar biasa indah!"',
      review1Author: '— Mas Dimas & Keluarga (Jakarta)',
      review2Text: '"Makanan lokalnya enak-enak, mobilnya bersih dan wangi. Pelayanan transparan tanpa biaya aneh-aneh di lapangan. Terima kasih Lombok_Travelers!"',
      review2Author: '— Ibu Ratna (Surabaya)',
      sidebarFrom: 'Mulai dari',
      sidebarPerPax: 'per orang / private trip',
      sidebarCar: 'Transport Mobil Ber-AC',
      sidebarDriver: 'Driver Lokal Asli Sasak',
      sidebarTickets: 'Tiket Wisata & Parkir',
      sidebarFastResp: 'Respon cepat dalam 5 - 15 menit',
      basecampTitle: 'Tetebatu Base Camp',
      basecampSubtitle: 'Lombok Timur Travel Partner',
      basecampDesc: 'Ingin mengubah rute atau menambah destinasi Tetebatu & Sembalun ke paket ini? Kami siap menyesuaikan itinerary sesuai keinginan Anda!',
      basecampLink: 'Ajukan Custom Itinerary ›',
      relatedTag: 'Pilihan Lainnya',
      relatedTitle: 'Paket Wisata Terkait',
      viewAllPkgs: 'Lihat Semua Paket'
    },
    bookingModal: {
      systemBadge: 'Lombok_Travelers Booking System',
      titleNew: 'Booking Paket Wisata',
      titleSuccess: 'Reservasi Diterima',
      nameLabel: 'Nama Lengkap Pemesan *',
      namePlaceholder: 'Contoh: Budi Santoso',
      waLabel: 'Nomor WhatsApp Aktif *',
      waPlaceholder: 'Contoh: 081234567890',
      waHint: 'Untuk konfirmasi jadwal & voucher penjemputan',
      emailLabel: 'Alamat Email (Opsional)',
      emailPlaceholder: 'nama@email.com',
      pkgLabel: 'Paket Wisata Pilihan *',
      dateLabel: 'Tanggal Keberangkatan *',
      paxLabel: 'Jumlah Peserta (Orang) *',
      pickupLabel: 'Lokasi Penjemputan (Pickup) *',
      pickupPlaceholder: 'Contoh: Bandara BIL / Hotel Senggigi / Pelabuhan',
      transportLabel: 'Pilihan Kelas Transportasi',
      notesLabel: 'Catatan / Permintaan Khusus (Opsional)',
      notesPlaceholder: 'Contoh: Pilihan hotel bintang 3/4, ada anak kecil, request kamar double bed...',
      termsText: 'Dengan mengajukan booking, tim lokal kami akan memeriksa ketersediaan armada & pemandu lalu menghubungi Anda via WhatsApp dengan rincian konfirmasi.',
      btnSubmitting: 'Memproses...',
      btnSubmit: 'Kirim Pengajuan Booking via WhatsApp',
      successTitle: 'Pengajuan Booking Berhasil Terkirim!',
      successSubtitle: 'Terima kasih! Tim lokal Tetebatu kami telah mencatat reservasi Anda ke dalam sistem antrean prioritas.',
      refLabel: 'Nomor Referensi Booking',
      summaryPkg: 'Paket:',
      summaryDate: 'Tanggal Trip:',
      summaryPax: 'Peserta:',
      summaryStatus: 'Status: Menunggu Konfirmasi Tim',
      followUpPrompt: 'Hubungkan langsung ke WhatsApp untuk mempercepat konfirmasi jadwal armada & supir:',
      btnWaConfirm: 'Buka WhatsApp & Konfirmasi Sekarang',
      btnClose: 'Selesai & Kembali ke Web',
      errorName: 'Nama pemesan wajib diisi (minimal 2 karakter).',
      errorWa: 'Nomor WhatsApp tidak valid (format nomor minimal 8 digit).',
      errorDate: 'Silakan pilih tanggal keberangkatan trip.',
      errorDatePast: 'Tanggal perjalanan tidak boleh tanggal yang sudah lewat.',
      errorPax: 'Jumlah peserta harus antara 1 sampai 100 orang.',
      errorGeneral: 'Terjadi kesalahan sistem saat mengirim booking. Silakan coba lagi.'
    },
    concierge: {
      tag: 'Butuh Bantuan Memilih?',
      bannerTitle: 'Masih Bingung Memilih Paket?',
      bannerDesc: 'Ceritakan kebutuhan perjalanan Anda, kami bantu menemukan paket yang paling sesuai dengan durasi, peserta, dan preferensi liburan Anda.',
      bannerBtn: 'Chat dengan Travel Assistant',
      modalTag: 'Assistant Perjalanan',
      modalTitle: 'Pilih Paket Sesuai Impian Liburan Anda',
      modalSubtitle: 'Jawab 3 pertanyaan singkat berikut dan asisten kami akan merekomendasikan pilihan paket terbaik:',
      q1: '1. Berapa lama rencana waktu liburan Anda?',
      q1Opt1: '1 Hari (Trip Harian)',
      q1Opt2: '2 - 3 Hari',
      q1Opt3: '4 - 5 Hari',
      q2: '2. Apa tema utama liburan yang Anda cari?',
      q2Opt1: 'Alam & Budaya Sasak',
      q2Opt2: 'Pantai & Snorkeling 3 Gili',
      q2Opt3: 'Honeymoon Romantis Berdua',
      q3: '3. Berapa jumlah rombongan Anda?',
      q3Opt1: 'Solo Traveler (1 Orang)',
      q3Opt2: 'Berdua / Pasangan (2 Orang)',
      q3Opt3: 'Keluarga / Rombongan (3+ Orang)',
      btnCalculate: 'Lihat Rekomendasi Paket',
      recTag: 'Rekomendasi Terbaik Untuk Anda',
      btnViewPkg: 'Lihat Detail Paket Ini',
      btnConsultWa: 'Konsultasi via WhatsApp'
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
    },
    buttons: {
      book: 'Book',
      bookNow: 'Book Now',
      detail: 'Detail',
      viewDetail: 'View Details',
      chatWa: 'Chat WA',
      chatWaLong: 'Chat via WhatsApp',
      submit: 'Submit',
      resetFilter: 'Reset Filters'
    },
    packageDetail: {
      breadcrumbHome: 'Home',
      breadcrumbTour: 'Tour Packages',
      startingFrom: 'Starting from:',
      perPerson: 'per person / private trip',
      packageDescTitle: 'Package Overview',
      itineraryTitle: 'Travel Itinerary',
      facilitiesTitle: 'Package Inclusions & Exclusions',
      inclusionsTitle: 'Package Inclusions:',
      exclusionsTitle: 'Package Exclusions:',
      extraAddonsTitle: 'Professional Documentation Add-on Services',
      droneTitle: 'Drone Aerial Video Footage (HD)',
      droneDesc: 'Professional drone pilot + RAW beach & hill footage: Inquire / Rp 750,000/day',
      reelsTitle: 'Cinematic Video + Instagram/TikTok Reels Editing',
      reelsDesc: 'Mirrorless camera & underwater GoPro + edited video ready to upload: Inquire / Rp 1,500,000/trip',
      priceTitle: 'Pricing for',
      priceSubtitle: 'Price per person (pax) tailored to group size and accommodation tier:',
      colPax: 'Group Size',
      colNoHotel: 'Without Hotel',
      colHotel3: '3-Star Hotel',
      colHotel4: '4-Star Hotel',
      row2pax: '2 Guests (Couple/Pair)',
      row3pax: '3 – 4 Guests (Small Family)',
      row5pax: '5 – 6 Guests (Medium Group)',
      row7pax: '7 – 12+ Guests (HiAce Minibus Group)',
      valConsult: 'Inquire',
      valRequest: 'Request Price',
      valSpecialGroup: 'Special Group',
      priceNote: '* Prices can be customized based on season (High/Peak Season Lebaran, Christmas & New Year), group size, and hotel preferences. Contact Lombok_Travelers for the best quote and special group discounts.',
      ctaQuestion: 'Already have your travel dates in mind? Book now to secure your private vehicle and native guide:',
      reviewsTitle: 'Guest Reviews for this Package',
      review1Text: '"The itinerary was perfectly paced, never rushed. Our native driver from Tetebatu was exceedingly warm and patient with our family. Lombok is breathtaking!"',
      review1Author: '— Mas Dimas & Family (Jakarta)',
      review2Text: '"Delicious local food, pristine vehicle that smelled clean and fresh. Transparent service with zero unexpected costs on the ground. Thank you Lombok_Travelers!"',
      review2Author: '— Mrs. Ratna (Surabaya)',
      sidebarFrom: 'Starting from',
      sidebarPerPax: 'per person / private trip',
      sidebarCar: 'Air-Conditioned Private Vehicle',
      sidebarDriver: 'Native Sasak Local Driver',
      sidebarTickets: 'Destination Tickets & Parking Included',
      sidebarFastResp: 'Fast response within 5 - 15 minutes',
      basecampTitle: 'Tetebatu Base Camp',
      basecampSubtitle: 'East Lombok Travel Partner',
      basecampDesc: 'Want to customize routes or add Tetebatu & Sembalun to this package? We are ready to adjust the itinerary to your wishes!',
      basecampLink: 'Request Custom Itinerary ›',
      relatedTag: 'More Options',
      relatedTitle: 'Related Tour Packages',
      viewAllPkgs: 'View All Packages'
    },
    bookingModal: {
      systemBadge: 'Lombok_Travelers Booking System',
      titleNew: 'Tour Package Booking',
      titleSuccess: 'Reservation Received',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. John Doe',
      waLabel: 'Active WhatsApp Number *',
      waPlaceholder: '+62 / +1 ...',
      waHint: 'For instant schedule confirmation & voucher delivery',
      emailLabel: 'Email Address (Optional)',
      emailPlaceholder: 'email@example.com',
      pkgLabel: 'Selected Tour Package *',
      dateLabel: 'Planned Travel Date *',
      paxLabel: 'Number of Guests (Pax) *',
      pickupLabel: 'Pickup Location *',
      pickupPlaceholder: 'e.g. Lombok Airport / Senggigi Hotel / Harbor',
      transportLabel: 'Preferred Vehicle Class',
      notesLabel: 'Special Requests / Accommodation Preferences (Optional)',
      notesPlaceholder: 'e.g. 3-star hotel tier, traveling with toddler, double-bed room...',
      termsText: 'By submitting this booking, our local team will verify vehicle & guide availability and contact you via WhatsApp with a detailed itinerary confirmation.',
      btnSubmitting: 'Submitting...',
      btnSubmit: 'Submit Booking & Chat on WhatsApp',
      successTitle: 'Booking Request Submitted!',
      successSubtitle: 'Thank you! Our Tetebatu local team has logged your booking into our system.',
      refLabel: 'Booking Reference',
      summaryPkg: 'Package:',
      summaryDate: 'Travel Date:',
      summaryPax: 'Participants:',
      summaryStatus: 'Status: Awaiting Team Confirmation',
      followUpPrompt: 'Connect directly on WhatsApp to speed up your booking confirmation and driver assignment:',
      btnWaConfirm: 'Confirm on WhatsApp Now',
      btnClose: 'Done & Back to Website',
      errorName: 'Name is required (at least 2 characters).',
      errorWa: 'Invalid WhatsApp number (at least 8 digits).',
      errorDate: 'Please select a travel departure date.',
      errorDatePast: 'Travel date cannot be in the past.',
      errorPax: 'Participants must be between 1 and 100 people.',
      errorGeneral: 'An error occurred while submitting your booking. Please try again.'
    },
    concierge: {
      tag: 'Need Help Choosing?',
      bannerTitle: 'Still Wondering Which Package Fits Best?',
      bannerDesc: 'Tell us your travel style, and our assistant will match the ideal package for your duration, group, and preferences.',
      bannerBtn: 'Chat with Travel Assistant',
      modalTag: 'Travel Assistant',
      modalTitle: 'Find Your Dream Holiday Package',
      modalSubtitle: 'Answer 3 quick questions and our assistant will recommend the best match:',
      q1: '1. How long is your planned vacation?',
      q1Opt1: '1 Day (Daily Trip)',
      q1Opt2: '2 - 3 Days',
      q1Opt3: '4 - 5 Days',
      q2: '2. What is your primary travel theme?',
      q2Opt1: 'Nature & Sasak Culture',
      q2Opt2: 'Beaches & 3 Gilis Snorkeling',
      q2Opt3: 'Romantic Couples Honeymoon',
      q3: '3. How many guests are traveling?',
      q3Opt1: 'Solo Traveler (1 Guest)',
      q3Opt2: 'Couple / Pair (2 Guests)',
      q3Opt3: 'Family / Group (3+ Guests)',
      btnCalculate: 'See Recommended Package',
      recTag: 'Top Recommendation For You',
      btnViewPkg: 'View Package Details',
      btnConsultWa: 'Consult via WhatsApp'
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

    // Matches patterns like "Rp 550.000", "Rp. 1.250.000", "Rp 850,000", "IDR 500.000"
    // Captures only the numeric portion right after Rp / IDR
    if (/(?:Rp\.?|IDR)/i.test(priceStr)) {
      return priceStr.replace(/(?:Rp\.?|IDR)\s*([\d.,]+)/gi, (match, priceDigits) => {
        const cleanNum = priceDigits.replace(/[^\d]/g, '');
        const idr = parseInt(cleanNum, 10);
        if (!idr || isNaN(idr)) return match;
        const usd = Math.round(idr / 15800);
        return `$${usd} USD`;
      });
    }

    // If it's a standalone formatted number like "550.000"
    if (/^[\d.,\s]+$/.test(priceStr.trim())) {
      const cleaned = priceStr.trim().replace(/[^\d]/g, '');
      const idr = parseInt(cleaned, 10);
      if (idr && !isNaN(idr) && idr > 1000) {
        const usd = Math.round(idr / 15800);
        return `$${usd} USD`;
      }
    }

    return priceStr;
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
