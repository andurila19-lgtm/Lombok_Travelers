import { TourPackage, DailyTrip } from '@/types';
import { Language } from '@/context/LanguageContext';

export interface LocalizedPackageContent {
  title: string;
  subtitle: string;
  duration: string;
  type: string;
  badge?: string;
  shortDesc: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  pricePlaceholder?: string;
  itinerary?: Array<{
    day: string;
    title: string;
    schedule: Array<{
      time: string;
      activity: string;
    }>;
  }>;
}

export const packagesLocalizedMap: Record<string, Record<Language, LocalizedPackageContent>> = {
  'paket-lombok-3-hari-2-malam': {
    id: {
      title: 'Paket Lombok 3 Hari 2 Malam',
      subtitle: 'Sasak Cultural Tour, Kuta Mandalika & Snorkeling 3 Gili',
      duration: '3 Hari 2 Malam',
      type: 'Private Trip',
      badge: 'Best Seller',
      pricePlaceholder: 'Konsultasikan',
      shortDesc: 'Kombinasi komplit: Desa Adat Sasak Sade, Sirkuit Mandalika, Pantai Kuta & Tanjung Aan, Bukit Merese, dan Snorkeling 3 Gili (Air, Meno, Trawangan).',
      description: 'Paket Wisata Lombok 3 Hari 2 Malam adalah pilihan perjalanan terpopuler bagi wisatawan yang ingin menikmati esensi terbaik Pulau Lombok secara efisien, santai, dan berkesan. Program ini memadukan kekayaan budaya asli Suku Sasak, keindahan pantai pasir merica di kawasan Kuta Mandalika, serta petualangan bawah laut snorkeling di kepulauan 3 Gili (Gili Air, Gili Meno, dan Gili Trawangan). Perjalanan ini berstatus Private Trip, artinya armada mobil ber-AC dan supir lokal kami sepenuhnya didedikasikan untuk Anda dan rombongan Anda tanpa digabung dengan tamu lain.',
      highlights: [
        'Hotel 2 Malam',
        'Private Car AC',
        'Private Boat Gili',
        'Driver / Guide Asli Sasak'
      ],
      inclusions: [
        'Hotel 2 malam (pilihan bintang 3/4) termasuk sarapan pagi',
        'Transportasi mobil ber-AC (Innova/Avanza) + Bensin + Driver ramah',
        'Private Glass Bottom Boat Snorkeling di 3 Gili (Air, Meno, Trawangan)',
        'Perlengkapan snorkeling lengkap (Masker, Snorkel, Pelampung/Life Jacket)',
        'Makan siang 2x dan Makan malam 2x di restoran lokal',
        'Seluruh tiket masuk destinasi wisata & biaya parkir',
        'Guide lokal berlisensi di Desa Adat Sade & Sukarara',
        'Gratis foto menggunakan baju adat tradisional Sasak',
        'Air mineral botol dingin harian selama trip',
        'Dokumentasi standar foto kamera/smartphone & action cam GoPro'
      ],
      exclusions: [
        'Tiket pesawat terbang PP ke/dari Lombok',
        'Pengeluaran pribadi (laundry, minibar hotel, belanja suvenir)',
        'Sewa sepeda atau Cidomo di Gili Trawangan',
        'Tipping sukarela untuk supir/guide lokal',
        'Tambahan asuransi perjalanan pribadi'
      ],
      itinerary: [
        {
          day: 'Hari 1',
          title: 'Sasak Cultural Tour & Kuta Mandalika Explorer',
          schedule: [
            { time: '09.00', activity: 'Penjemputan di Bandara Internasional Lombok (BIL) atau Hotel oleh Tim Lombok_Travelers' },
            { time: '09.30 – 11.00', activity: 'Mengunjungi Desa Tenun Sukarara (Mencoba menenun tradisional Sasak & gratis berfoto baju adat khas Lombok)' },
            { time: '11.00 – 12.30', activity: 'Eksplorasi Desa Adat Sasak Sade / Ende (Melihat rumah adat tradisional lantai kotoran kerbau & tradisi lokal)' },
            { time: '12.30 – 14.00', activity: 'Makan siang di restoran lokal tepi pantai kawasan Kuta' },
            { time: '14.00 – 15.30', activity: 'Wisata ke Pantai Kuta Mandalika & foto di landmark Sirkuit Internasional Mandalika' },
            { time: '15.30 – 17.00', activity: 'Menuju Pantai Tanjung Aan dengan pasir putih khas butiran merica dan air laut jernih toska' },
            { time: '17.00 – 18.30', activity: 'Menikmati panorama sunset golden hour di atas Bukit Merese (hiking ringan 5 menit)' },
            { time: '18.30 – 20.00', activity: 'Makan malam kuliner legendaris khas Sasak: Ayam Taliwang & Plecing Kangkung' },
            { time: '20.00', activity: 'Check-in Hotel pilihan (area Senggigi / Mataram / Kuta), istirahat dan acara bebas' }
          ]
        },
        {
          day: 'Hari 2',
          title: 'Snorkeling 3 Gili (Air, Meno, Trawangan) & Sunset Island',
          schedule: [
            { time: '07.30 – 08.30', activity: 'Sarapan pagi di hotel & persiapan tour bahari' },
            { time: '08.30 – 09.45', activity: 'Perjalanan pesisir pantai barat Lombok via Malimbu & Tebing Villa Hantu' },
            { time: '09.45 – 10.15', activity: 'Tiba di Pelabuhan Teluk Nare, menaiki Private Boat Snorkeling' },
            { time: '10.15 – 11.30', activity: 'Snorkeling spot 1: Gili Air Coral Garden (Melihat ikan karang warna-warni & feeding fish)' },
            { time: '11.30 – 12.45', activity: 'Snorkeling spot 2: Gili Meno Turtle Point & Patung Bawah Laut (Underwater Statues)' },
            { time: '12.45 – 14.30', activity: 'Mendarat di Gili Trawangan, makan siang di restoran tepi pantai & sholat' },
            { time: '14.30 – 16.30', activity: 'Acara santai di Gili Trawangan: bersepeda keliling pulau, naik cidomo kuda, atau foto di ayunan laut' },
            { time: '16.30 – 17.30', activity: 'Kembali menyeberang ke Pulau Lombok dan bilas air tawar' },
            { time: '18.00 – 19.30', activity: 'Makan malam kuliner olahan seafood segar tepi pantai Senggigi' },
            { time: '20.00', activity: 'Kembali ke hotel dan istirahat' }
          ]
        },
        {
          day: 'Hari 3',
          title: 'Pusat Oleh-oleh Khas Lombok & Transfer Airport',
          schedule: [
            { time: '08.00 – 09.00', activity: 'Sarapan pagi di hotel, proses check-out & luggage loading' },
            { time: '09.00 – 11.00', activity: 'Wisata belanja oleh-oleh khas Lombok: Kaos Lombok, Mutiara, Madu Sumbawa, Kopi Sasak Tetebatu, dan Dodol Rumput Laut' },
            { time: '11.00 – 12.30', activity: 'Makan siang santai di restoran lokal khas Lombok (opsional/sesuai jam penerbangan)' },
            { time: '12.30 – 14.00', activity: 'Pengantaran kembali ke Bandara Internasional Lombok (BIL). Program tour selesai!' }
          ]
        }
      ]
    },
    en: {
      title: 'Lombok 3 Days 2 Nights Tour',
      subtitle: 'Sasak Cultural Tour, Kuta Mandalika & 3 Gilis Snorkeling',
      duration: '3 Days 2 Nights',
      type: 'Private Trip',
      badge: 'Best Seller',
      pricePlaceholder: 'Inquire Now',
      shortDesc: 'Complete classic highlights: Sade Sasak Village, Mandalika MotoGP Circuit, Kuta & Tanjung Aan beaches, Bukit Merese sunset, and 3 Gilis Snorkeling.',
      description: 'The Lombok 3 Days 2 Nights Tour is our most popular program for travelers who want to experience the absolute finest of Lombok Island comfortably, efficiently, and memorably. This itinerary seamlessly blends authentic Sasak indigenous culture, the pepper-grain sands of Kuta Mandalika, and an exhilarating snorkeling voyage across the 3 Gilis (Gili Air, Gili Meno, and Gili Trawangan). 100% Private Trip status guarantees a dedicated air-conditioned vehicle and courteous native Sasak driver exclusively for your party without any strangers.',
      highlights: [
        '2 Nights Hotel',
        'Private AC Car',
        'Private Gili Boat',
        'Native Sasak Guide'
      ],
      inclusions: [
        '2 Nights Accommodation (3/4-Star options) with daily breakfast',
        'Air-conditioned private transportation (Innova/Avanza) + Fuel + Driver',
        'Private Glass-Bottom Boat for 3 Gilis Snorkeling (Air, Meno, Trawangan)',
        'Complete snorkeling gear (Mask, Snorkel, Life Jacket / Buoy)',
        '2x Lunch and 2x Dinner at curated local restaurants',
        'All destination entrance admissions & parking fees',
        'Licensed local guides at Sade & Sukarara Cultural Villages',
        'Free traditional Sasak royal costume photo session',
        'Cold bottled mineral water daily during tours',
        'Complimentary photography assistance and underwater GoPro shots'
      ],
      exclusions: [
        'Return domestic/international flights to/from Lombok',
        'Personal expenses (laundry, hotel minibar, souvenir shopping)',
        'Bicycle or Cidomo horse cart rentals on Gili Trawangan',
        'Voluntary gratuities/tipping for driver and local boat crew',
        'Optional personal travel insurance'
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Sasak Cultural Heritage & Kuta Mandalika Explorer',
          schedule: [
            { time: '09:00', activity: 'Warm welcome & pick-up at Lombok International Airport (BIL) or your hotel by Lombok_Travelers' },
            { time: '09:30 – 11:00', activity: 'Visit Sukarara Weaving Village (Hands-on traditional Sasak handloom weaving & complimentary traditional costume photo shoot)' },
            { time: '11:00 – 12:30', activity: 'Explore Sade / Ende Indigenous Village (Ancient Sasak thatched architecture & living cultural traditions)' },
            { time: '12:30 – 14:00', activity: 'Beachside Indonesian lunch at a curated restaurant in Kuta Mandalika' },
            { time: '14:00 – 15:30', activity: 'Explore Kuta Mandalika Beach and photo stop at the iconic Mandalika International Circuit' },
            { time: '15:30 – 17:00', activity: 'Proceed to Tanjung Aan Beach, renowned for turquoise waters and rare pepper-like white sand' },
            { time: '17:00 – 18:30', activity: 'Experience the golden hour sunset atop panoramic Bukit Merese (easy 5-minute stroll)' },
            { time: '18:30 – 20:00', activity: 'Authentic Sasak dinner: Legendary grilled Ayam Taliwang & spicy Plecing Kangkung' },
            { time: '20:00', activity: 'Hotel check-in (Senggigi / Mataram / Kuta), evening relaxation and leisure' }
          ]
        },
        {
          day: 'Day 2',
          title: '3 Gilis Private Snorkeling Cruise (Air, Meno, Trawangan) & Sunset',
          schedule: [
            { time: '07:30 – 08:30', activity: 'Breakfast at hotel and preparation for the marine adventure' },
            { time: '08:30 – 09:45', activity: 'Scenic coastal highway drive past Malimbu Hill & Villa Hantu panoramic cliff view' },
            { time: '09:45 – 10:15', activity: 'Arrive at Teluk Nare Harbor and board your Private Glass-Bottom Boat' },
            { time: '10:15 – 11:30', activity: 'Snorkeling Stop 1: Gili Air Coral Garden (Vibrant marine corals & tropical fish feeding)' },
            { time: '11:30 – 12:45', activity: 'Snorkeling Stop 2: Gili Meno Turtle Point & Famous Underwater Statues' },
            { time: '12:45 – 14:30', activity: 'Land on Gili Trawangan, beachfront seaside lunch and leisure' },
            { time: '14:30 – 16:30', activity: 'Island exploration: bicycle ride around car-free island, Cidomo horse carriage, or beach swing photos' },
            { time: '16:30 – 17:30', activity: 'Private boat crossing back to Lombok mainland and fresh water shower' },
            { time: '18:00 – 19:30', activity: 'Fresh grilled seafood dinner overlooking Senggigi Bay' },
            { time: '20:00', activity: 'Return to hotel and unwind' }
          ]
        },
        {
          day: 'Day 3',
          title: 'Authentic Lombok Souvenir Shopping & Airport Transfer',
          schedule: [
            { time: '08:00 – 09:00', activity: 'Hotel breakfast, luggage packing and smooth check-out' },
            { time: '09:00 – 11:00', activity: 'Souvenir shopping: Lombok apparel, cultivated sea pearls, Sumbawa wild honey, Tetebatu Sasak coffee & seaweed sweets' },
            { time: '11:00 – 12:30', activity: 'Relaxed local culinary lunch (optional / adjusted to your flight departure time)' },
            { time: '12:30 – 14:00', activity: 'Direct private transfer to Lombok International Airport (BIL). End of tour services with warm memories!' }
          ]
        }
      ]
    }
  },

  'paket-lombok-2-hari-1-malam': {
    id: {
      title: 'Paket Lombok 2 Hari 1 Malam',
      subtitle: 'Kuta Mandalika Explorer & Sukarara Weaving Village',
      duration: '2 Hari 1 Malam',
      type: 'Private Trip',
      badge: 'Weekend Trip',
      pricePlaceholder: 'Konsultasikan',
      shortDesc: 'Pilihan ideal untuk liburan singkat: eksplorasi tenun Sukarara, Bukit Merese, pantai pasir putih, dan pusat suvenir khas Lombok.',
      description: 'Dirancang khusus bagi traveler dengan waktu terbatas yang ingin memaksimalkan akhir pekan di Lombok. Menikmati eksotisme pantai pasir merica Kuta Mandalika dan tradisi tenun Sasak dengan penjemputan langsung dari bandara.',
      highlights: [
        'Hotel 1 Malam',
        'Antar-Jemput Bandara',
        'Pantai Mandalika & Merese',
        'Desa Tenun Sukarara'
      ],
      inclusions: [
        'Hotel 1 malam termasuk sarapan pagi',
        'Mobil ber-AC + Driver ramah + BBM include',
        'Tiket masuk seluruh destinasi wisata & parkir',
        'Makan siang 1x & Makan malam 1x khas Lombok',
        'Air mineral botol harian selama trip'
      ],
      exclusions: [
        'Tiket pesawat PP ke/dari Lombok',
        'Pengeluaran pribadi & belanja oleh-oleh',
        'Tipping sukarela supir'
      ],
      itinerary: [
        {
          day: 'Hari 1',
          title: 'Sasak Heritage & Eksotisme Mandalika',
          schedule: [
            { time: '09.00', activity: 'Penjemputan di Bandara BIL Lombok oleh supir lokal kami' },
            { time: '10.00 – 12.00', activity: 'Desa Tenun Sukarara & Desa Adat Sasak Sade' },
            { time: '12.30 – 14.00', activity: 'Makan siang kuliner lokal di kawasan Kuta' },
            { time: '14.00 – 17.00', activity: 'Pantai Kuta Mandalika, Sirkuit Mandalika & Pantai Tanjung Aan' },
            { time: '17.00 – 18.30', activity: 'Sunset eksotis di puncak Bukit Merese' },
            { time: '19.00', activity: 'Makan malam Ayam Taliwang & check-in hotel' }
          ]
        },
        {
          day: 'Hari 2',
          title: 'Belanja Oleh-Oleh & Transfer Bandara',
          schedule: [
            { time: '08.00', activity: 'Sarapan hotel & check-out' },
            { time: '09.30 – 11.30', activity: 'Pusat mutiara, kaos Lombok & kuliner khas' },
            { time: '12.00', activity: 'Pengantaran ke Bandara Lombok (BIL)' }
          ]
        }
      ]
    },
    en: {
      title: 'Lombok 2 Days 1 Night Tour',
      subtitle: 'Kuta Mandalika Explorer & Sukarara Weaving Village',
      duration: '2 Days 1 Night',
      type: 'Private Trip',
      badge: 'Weekend Trip',
      pricePlaceholder: 'Inquire Now',
      shortDesc: 'Ideal weekend getaway: Sukarara handweaving, Merese Hill sunset, white sand beaches, and authentic Lombok gift shopping.',
      description: 'Crafted specifically for busy travelers with limited time seeking to maximize a weekend in Lombok. Relish the pepper-grain sands of Kuta Mandalika, panoramic cliffs, and rich Sasak weaving traditions with private airport pickup.',
      highlights: [
        '1 Night Hotel',
        'Airport Roundtrip',
        'Mandalika & Merese Hill',
        'Sukarara Weaving Village'
      ],
      inclusions: [
        '1 Night Hotel accommodation with breakfast',
        'Private AC vehicle + Courteous Driver + Fuel included',
        'All destination entrance fees and parking tickets',
        '1x Lunch & 1x Dinner featuring local delicacies',
        'Complimentary bottled water throughout the tour'
      ],
      exclusions: [
        'Roundtrip flights to/from Lombok',
        'Personal expenses and souvenir shopping',
        'Voluntary driver gratuities'
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Sasak Heritage & Mandalika South Beaches',
          schedule: [
            { time: '09:00', activity: 'Airport greeting at Lombok BIL by our native driver' },
            { time: '10:00 – 12:00', activity: 'Sukarara Weaving Village & Sade Ancient Sasak Village' },
            { time: '12:30 – 14:00', activity: 'Seaside lunch in the vibrant Kuta resort district' },
            { time: '14:00 – 17:00', activity: 'Kuta Mandalika Beach, Circuit photo-op & Tanjung Aan pepper beach' },
            { time: '17:00 – 18:30', activity: 'Breathtaking sunset from Bukit Merese panoramic lookout' },
            { time: '19:00', activity: 'Authentic Taliwang chicken dinner & hotel check-in' }
          ]
        },
        {
          day: 'Day 2',
          title: 'Lombok Souvenir Delights & Airport Transfer',
          schedule: [
            { time: '08:00', activity: 'Hotel breakfast and easy check-out' },
            { time: '09:30 – 11:30', activity: 'Shopping for Lombok pearls, shirts, Sumbawa honey & Sasak coffee' },
            { time: '12:00', activity: 'Private transfer to Lombok Airport (BIL) for your flight' }
          ]
        }
      ]
    }
  },

  'paket-lombok-4-hari-3-malam': {
    id: {
      title: 'Paket Lombok 4 Hari 3 Malam',
      subtitle: 'Complete Lombok: Sembalun Rinjani, Tetebatu, Gili & South Beach',
      duration: '4 Hari 3 Malam',
      type: 'Private Trip',
      badge: 'Favorit Keluarga',
      pricePlaceholder: 'Konsultasikan',
      shortDesc: 'Jelajah utuh Pulau Seribu Masjid: Kuta Mandalika, Gili Trawangan, segarnya udara Sembalun di kaki Rinjani, dan panorama terasiring hijau Tetebatu.',
      description: 'Paket 4H3M memberikan ritme liburan yang seimbang antara petualangan pegunungan dan pantai tropis. Anda akan diajak menikmati sejuknya udara lembah Sembalun, sawah bertingkat Tetebatu, serta keindahan terumbu karang 3 Gili.',
      highlights: [
        'Hotel 3 Malam',
        'Sembalun & Tetebatu',
        'Snorkeling 3 Gili',
        'Kuliner Khas Sasak'
      ],
      inclusions: [
        'Hotel 3 malam pilihan (bintang 3/4) include sarapan',
        'Transportasi private ber-AC penuh + Driver + BBM',
        'Private boat snorkeling 3 Gili + alat lengkap',
        'Makan siang 3x & Makan malam 3x sesuai program',
        'Tiket semua destinasi wisata & pemandu lokal'
      ],
      exclusions: [
        'Tiket pesawat PP ke/dari Lombok',
        'Pengeluaran pribadi',
        'Tipping guide/driver'
      ],
      itinerary: [
        {
          day: 'Hari 1',
          title: 'Eksplorasi Budaya Sasak & Pantai Selatan Mandalika',
          schedule: [
            { time: '09.00', activity: 'Penjemputan di Bandara BIL Lombok oleh Tim Lombok_Travelers' },
            { time: '10.00 – 12.30', activity: 'Desa Tenun Sukarara & Desa Adat Sade Sasak' },
            { time: '13.00 – 17.00', activity: 'Pantai Tanjung Aan, Sirkuit Mandalika & Bukit Merese' },
            { time: '18.30', activity: 'Makan malam kuliner khas Sasak & check-in hotel' }
          ]
        },
        {
          day: 'Hari 2',
          title: 'Snorkeling Eksklusif 3 Gili (Air, Meno, Trawangan)',
          schedule: [
            { time: '08.00', activity: 'Penjemputan hotel & perjalanan via pesisir Malimbu' },
            { time: '10.00 – 14.00', activity: 'Private boat snorkeling patung bawah laut, coral garden & turtle point' },
            { time: '14.00 – 16.30', activity: 'Santai & bersepeda di Gili Trawangan' },
            { time: '18.00', activity: 'Makan malam seafood tepi pantai Senggigi' }
          ]
        },
        {
          day: 'Hari 3',
          title: 'Kesejukan Tetebatu & Panorama Sembalun Rinjani',
          schedule: [
            { time: '08.00', activity: 'Menuju dataran tinggi Sembalun di kaki Gunung Rinjani' },
            { time: '10.30 – 13.00', activity: 'Bukit Selong, petak sawah warna-warni & petik strawberry' },
            { time: '13.30 – 16.30', activity: 'Trekking sawah hijau Tetebatu & Air Terjun Sarang Walet' },
            { time: '18.30', activity: 'Makan malam & kembali ke hotel' }
          ]
        },
        {
          day: 'Hari 4',
          title: 'Pusat Mutiara, Suvenir & Airport Drop-off',
          schedule: [
            { time: '08.30', activity: 'Check-out hotel & belanja mutiara serta suvenir khas Lombok' },
            { time: '12.00', activity: 'Pengantaran ke Bandara Internasional Lombok (BIL)' }
          ]
        }
      ]
    },
    en: {
      title: 'Lombok 4 Days 3 Nights Tour',
      subtitle: 'Complete Lombok: Sembalun Rinjani, Tetebatu, Gilis & South Coast',
      duration: '4 Days 3 Nights',
      type: 'Private Trip',
      badge: 'Family Favorite',
      pricePlaceholder: 'Inquire Now',
      shortDesc: 'A panoramic loop around Lombok: Kuta Mandalika, 3 Gilis snorkeling, cool highland Sembalun beneath Mount Rinjani, and lush green Tetebatu.',
      description: 'Our 4D3N Grand Tour provides a harmoniously balanced pace between highland mountain beauty and idyllic tropical seas. Experience misty valleys in Sembalun, verdant rice terraces in Tetebatu, and vibrant marine life across the 3 Gilis.',
      highlights: [
        '3 Nights Hotel',
        'Sembalun & Tetebatu',
        '3 Gilis Snorkeling',
        'Authentic Sasak Cuisine'
      ],
      inclusions: [
        '3 Nights Hotel (3/4-Star options) with daily breakfast',
        'Full private AC vehicle + Courteous Driver + Fuel',
        'Private 3 Gilis Snorkeling Boat + full gear',
        '3x Lunches & 3x Dinners as scheduled',
        'All admissions, destination passes & local guides'
      ],
      exclusions: [
        'Roundtrip flights to/from Lombok',
        'Personal shopping and laundry',
        'Voluntary crew gratuities'
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Sasak Cultural Living & South Mandalika Coast',
          schedule: [
            { time: '09:00', activity: 'Airport pick-up at Lombok BIL by our native team' },
            { time: '10:00 – 12:30', activity: 'Sukarara Weaving Village & Sade Ancient Sasak Village' },
            { time: '13:00 – 17:00', activity: 'Tanjung Aan Beach, Mandalika MotoGP Circuit & Bukit Merese' },
            { time: '18:30', activity: 'Sasak Taliwang dinner & hotel check-in' }
          ]
        },
        {
          day: 'Day 2',
          title: '3 Gilis Private Island Snorkeling Cruise',
          schedule: [
            { time: '08:00', activity: 'Hotel pick-up & panoramic coastal drive via Malimbu Hill' },
            { time: '10:00 – 14:00', activity: 'Snorkeling statues, coral gardens & turtle sanctuary' },
            { time: '14:00 – 16:30', activity: 'Leisure and island cycling on Gili Trawangan' },
            { time: '18:00', activity: 'Fresh grilled seaside seafood dinner at Senggigi' }
          ]
        },
        {
          day: 'Day 3',
          title: 'Misty Sembalun Highlands & Tetebatu Rice Valleys',
          schedule: [
            { time: '08:00', activity: 'Drive up to the volcanic highlands of Sembalun below Rinjani' },
            { time: '10:30 – 13:00', activity: 'Bukit Selong patchwork view & fresh strawberry farm picking' },
            { time: '13:30 – 16:30', activity: 'Tetebatu rice terrace walking & Sarang Walet hidden waterfall' },
            { time: '18:30', activity: 'Traditional culinary dinner and hotel return' }
          ]
        },
        {
          day: 'Day 4',
          title: 'Lombok Pearls, Local Crafts & Airport Transfer',
          schedule: [
            { time: '08:30', activity: 'Hotel check-out, pearl galleries and traditional gift shopping' },
            { time: '12:00', activity: 'Private transfer to Lombok International Airport (BIL)' }
          ]
        }
      ]
    }
  },

  'paket-lombok-5-hari-4-malam': {
    id: {
      title: 'Paket Lombok 5 Hari 4 Malam',
      subtitle: 'Grand Island Tour: Pink Beach, Secret Gilis & Rinjani Foothills',
      duration: '5 Hari 4 Malam',
      type: 'Private Trip',
      badge: 'Grand Explorer',
      pricePlaceholder: 'Konsultasikan',
      shortDesc: 'Petualangan menyeluruh tanpa terburu-buru: Pink Beach, Secret Gilis (Nanggu & Sudak), air terjun tersembunyi, Sembalun, dan pesona selatan Lombok.',
      description: 'Program liburan terlengkap dengan ritme santai. Mengunjungi spot-spot tersembunyi pulau Lombok yang jarang dijangkau wisatawan umum bersama pemandu lokal berdedikasi.',
      highlights: [
        'Hotel 4 Malam',
        'Pink Beach & Secret Gilis',
        'Sembalun & Tetebatu',
        'Dokumentasi Foto Lengkap'
      ],
      inclusions: [
        'Hotel 4 malam pilihan include sarapan',
        'Armada private standby penuh selama 5 hari',
        'Perahu private Pink Beach & Secret Gilis',
        'Makan lengkap selama tour sesuai jadwal',
        'Seluruh tiket wisata & guide lokal'
      ],
      exclusions: [
        'Tiket pesawat PP ke/dari Lombok',
        'Pengeluaran pribadi',
        'Tipping supir/kru'
      ]
    },
    en: {
      title: 'Lombok 5 Days 4 Nights Tour',
      subtitle: 'Grand Island Tour: Pink Beach, Secret Gilis & Rinjani Foothills',
      duration: '5 Days 4 Nights',
      type: 'Private Trip',
      badge: 'Grand Explorer',
      pricePlaceholder: 'Inquire Now',
      shortDesc: 'Unrushed in-depth island immersion: Pink Beach, Gili Nanggu secret islands, mountain waterfalls, Sembalun, and southern shores.',
      description: 'Our most comprehensive holiday program designed at an easy, leisurely pace. Unveil secluded spots of Lombok rarely visited by mass tourists alongside our caring native hosts.',
      highlights: [
        '4 Nights Hotel',
        'Pink Beach & Secret Gilis',
        'Sembalun & Tetebatu',
        'Full Photo Documentation'
      ],
      inclusions: [
        '4 Nights accommodation with daily breakfast',
        'Dedicated private AC vehicle on standby throughout 5 days',
        'Private chartered boats for Pink Beach & Secret Gilis',
        'All lunches and dinners as programmed',
        'All entrance passes and licensed local guides'
      ],
      exclusions: [
        'Roundtrip flights to/from Lombok',
        'Personal expenditures',
        'Voluntary crew tipping'
      ]
    }
  },

  'private-lombok-honeymoon-trip': {
    id: {
      title: 'Private Lombok Honeymoon Trip',
      subtitle: 'Romantic Sanctuary: Candlelight Dinner, Private Boat & Sunset Cruise',
      duration: '3H2M / 4H3M',
      type: 'Honeymoon',
      badge: 'Spesial Pasangan',
      pricePlaceholder: 'Konsultasikan',
      shortDesc: 'Dirancang khusus untuk pasangan: dekorasi kamar bulan madu, candlelight dinner tepi pantai, sunset cruise private, dan spot foto romantis.',
      description: 'Wujudkan momen manis bulan madu yang intim dan tak terlupakan di Lombok. Privasi penuh, layanan hospitality hangat, dan pemandangan sunset romantis yang memikat hati.',
      highlights: [
        'Honeymoon Bed Decoration',
        'Romantic Candlelight Dinner',
        'Private Boat Snorkeling',
        'Private Driver Khusus'
      ],
      inclusions: [
        'Resort / Villa Honeymoon pilihan dengan sarapan',
        'Setup dekorasi bunga kamar & cake bulan madu',
        '1x Romantic Candlelight Dinner tepi pantai',
        'Private Boat & Perlengkapan Snorkeling 3 Gili',
        'Transportasi private exclusive + supir ramah'
      ],
      exclusions: [
        'Tiket pesawat PP ke/dari Lombok',
        'Pengeluaran pribadi',
        'Tipping'
      ]
    },
    en: {
      title: 'Private Lombok Honeymoon Tour',
      subtitle: 'Romantic Sanctuary: Candlelight Dinner, Private Boat & Sunset Cruise',
      duration: '3D2N / 4D3N',
      type: 'Honeymoon',
      badge: 'Special Couple',
      pricePlaceholder: 'Inquire Now',
      shortDesc: 'Tailor-made for couples: romantic floral bed decor, seaside candlelight dinner, private snorkeling cruise, and dreamy photo spots.',
      description: 'Cherish an unforgettable honeymoon escape in Lombok. Total privacy, heartfelt local hospitality, and hypnotic sunset ocean views curated just for two.',
      highlights: [
        'Honeymoon Floral Bed Decor',
        'Romantic Candlelight Dinner',
        'Private Snorkeling Cruise',
        'Exclusive Private Driver'
      ],
      inclusions: [
        'Romantic Resort / Villa stay with breakfast',
        'Complimentary floral bed setup & honeymoon cake',
        '1x Beachfront Romantic Candlelight Dinner',
        'Private Boat & full snorkeling equipment',
        'Exclusive private AC vehicle + discrete driver'
      ],
      exclusions: [
        'Return airfares to/from Lombok',
        'Personal expenses and spa treatments',
        'Voluntary gratuities'
      ]
    }
  },

  'tetebatu-nature-cultural-immersion': {
    id: {
      title: 'Tetebatu Nature & Cultural Immersion',
      subtitle: 'Highland Sanctuary, Rice Terraces & Sasak Living',
      duration: '2H1M / 3H2M',
      type: 'Private Trip',
      badge: 'Khas Tetebatu',
      pricePlaceholder: 'Konsultasikan',
      shortDesc: 'Rasakan denyut kehidupan asli Lombok: trekking sawah bertingkat Tetebatu, sangrai kopi tradisional Sasak, melihat Black Monkey langka, dan air terjun alami.',
      description: 'Menyelami ketenangan desa wisata Tetebatu di lereng Gunung Rinjani. Belajar tradisi lokal, menikmati kopi Sasak racikan tangan penduduk asli, serta menyusuri air terjun tersembunyi yang asri.',
      highlights: [
        'Local Guide Asli Tetebatu',
        'Trekking Terasering Sawah',
        'Black Monkey Sanctuary',
        'Air Terjun Sarang Walet'
      ],
      inclusions: [
        'Eco-lodge / Homestay asri Tetebatu include sarapan',
        'Pemandu lokal berlisensi asli Tetebatu',
        'Workshop sangrai kopi tradisional Sasak',
        'Makan kuliner organik lokal pedesaan',
        'Transport penjemputan dari bandara/hotel'
      ],
      exclusions: [
        'Tiket pesawat PP ke/dari Lombok',
        'Pengeluaran pribadi',
        'Tipping guide'
      ]
    },
    en: {
      title: 'Tetebatu Nature & Cultural Immersion',
      subtitle: 'Highland Sanctuary, Rice Terraces & Sasak Living',
      duration: '2D1N / 3D2N',
      type: 'Private Trip',
      badge: 'Tetebatu Eco-Heritage',
      pricePlaceholder: 'Inquire Now',
      shortDesc: 'Experience authentic rural Lombok: Tetebatu terraced rice walks, artisan Sasak coffee roasting, rare Black Monkey watching, and hidden canyon falls.',
      description: 'Immerse in the serene mountain village of Tetebatu on the southern slopes of Mount Rinjani. Experience living local traditions, savor handcrafted coffee, and discover tucked-away jungle waterfalls.',
      highlights: [
        'Native Tetebatu Guide',
        'Terraced Rice Field Trek',
        'Black Monkey Sanctuary',
        'Sarang Walet Waterfall'
      ],
      inclusions: [
        'Charming Tetebatu Eco-Lodge / Homestay with breakfast',
        'Licensed native guide from Tetebatu village',
        'Traditional Sasak coffee-roasting masterclass',
        'Wholesome organic homecooked village meals',
        'Private airport/hotel pickup and transfer'
      ],
      exclusions: [
        'Return flights to/from Lombok',
        'Personal expenses',
        'Voluntary guide tipping'
      ]
    }
  }
};

export const dailyTripsLocalizedMap: Record<number, Record<Language, { title: string; duration: string; desc: string }>> = {
  1: {
    id: {
      title: 'Sasak & Kuta Mandalika',
      duration: '1 Hari',
      desc: 'Desa Adat Sade, Tenun Sukarara, Sirkuit Mandalika, Pantai Tanjung Aan & Bukit Merese.'
    },
    en: {
      title: 'Sasak Heritage & Kuta Mandalika',
      duration: '1 Day',
      desc: 'Sade Sasak Village, Sukarara handweaving, Mandalika MotoGP Circuit, Tanjung Aan Beach & Bukit Merese sunset.'
    }
  },
  2: {
    id: {
      title: 'Tetebatu Nature Trip',
      duration: '1 Hari',
      desc: 'Terasiring sawah Tetebatu, Black Monkey Forest, Air Terjun Sarang Walet & sangrai kopi lokal.'
    },
    en: {
      title: 'Tetebatu Nature & Waterfall Trip',
      duration: '1 Day',
      desc: 'Tetebatu terraced rice fields, Black Monkey Forest, Sarang Walet Hidden Waterfall & local coffee roasting.'
    }
  },
  3: {
    id: {
      title: 'Pink Beach & Snorkeling',
      duration: '1 Hari',
      desc: 'Eksplorasi Pantai Pink Tangsi, Pulau Pasir timbul, snorkeling terumbu karang di Gili Petelu.'
    },
    en: {
      title: 'Pink Beach & Island Snorkeling',
      duration: '1 Day',
      desc: 'Explore Pink Beach Tangsi, tidal Sand Island, and coral reef snorkeling at Gili Petelu.'
    }
  },
  4: {
    id: {
      title: 'Gili Trawangan & 3 Gili',
      duration: '1 Hari',
      desc: 'Snorkeling bersama penyu di Gili Meno & Gili Air, keliling sepeda dan santai di Gili Trawangan.'
    },
    en: {
      title: 'Gili Trawangan & 3 Gilis Snorkeling',
      duration: '1 Day',
      desc: 'Snorkel with wild sea turtles at Gili Meno & Gili Air, bicycle rides, and beach vibes on Gili Trawangan.'
    }
  },
  5: {
    id: {
      title: 'Gili Nanggu Secret Islands',
      duration: '1 Hari',
      desc: 'Kawasan gili selatan yang tenang, surga snorkeling ikan warna-warni, makan siang di Gili Sudak & Kedis.'
    },
    en: {
      title: 'Gili Nanggu Secret Islands',
      duration: '1 Day',
      desc: 'Serene southern Gilis, vibrant reef fish sanctuary, beachside lunch at Gili Sudak & tiny Gili Kedis.'
    }
  },
  6: {
    id: {
      title: 'Sembalun & Bukit Selong',
      duration: '1 Hari',
      desc: 'Dataran tinggi kaki Gunung Rinjani, petak sawah warna-warni Bukit Selong, Desa Kuno Beleq & Kebun Strawberry.'
    },
    en: {
      title: 'Sembalun Highlands & Bukit Selong',
      duration: '1 Day',
      desc: 'Highland valley below Mount Rinjani, colorful patchwork fields at Bukit Selong, Beleq ancient village & fresh strawberry farms.'
    }
  },
  7: {
    id: {
      title: 'Air Terjun Senaru & Tiu Kelep',
      duration: '1 Hari',
      desc: 'Jalur trekking hutan tropis menuju Air Terjun Sendang Gile dan kemegahan Air Terjun Tiu Kelep di kaki Rinjani.'
    },
    en: {
      title: 'Senaru & Tiu Kelep Twin Waterfalls',
      duration: '1 Day',
      desc: 'Lush rainforest trek to Sendang Gile Waterfall and the majestic Tiu Kelep waterfall at Rinjani foothills.'
    }
  },
  8: {
    id: {
      title: 'South Lombok & Selong Belanak',
      duration: '1 Hari',
      desc: 'Pantai Selong Belanak (belajar selancar), Pantai Mawun yang melengkung indah, dan sunset tebing Kuta.'
    },
    en: {
      title: 'South Lombok & Selong Belanak',
      duration: '1 Day',
      desc: 'Selong Belanak beach (beginner surf lessons), picturesque crescent Mawun Bay, and coastal sunset cliffs.'
    }
  }
};

export function getLocalizedPackage(pkg: TourPackage, lang: Language): TourPackage {
  const loc = packagesLocalizedMap[pkg.slug]?.[lang];
  if (!loc) return pkg;

  return {
    ...pkg,
    title: loc.title || pkg.title,
    subtitle: loc.subtitle || pkg.subtitle,
    duration: loc.duration || pkg.duration,
    type: loc.type || pkg.type,
    badge: loc.badge || pkg.badge,
    shortDesc: loc.shortDesc || pkg.shortDesc,
    description: loc.description || pkg.description,
    highlights: loc.highlights || pkg.highlights,
    inclusions: loc.inclusions || pkg.inclusions,
    exclusions: loc.exclusions || pkg.exclusions,
    pricePlaceholder: (lang === 'en' && pkg.pricePlaceholder.toLowerCase().includes('konsultasi')) ? 'Inquire' : pkg.pricePlaceholder,
    itinerary: (loc.itinerary && loc.itinerary.length > 0) ? loc.itinerary : pkg.itinerary
  };
}

export function getLocalizedTrip(trip: DailyTrip, lang: Language): DailyTrip {
  const loc = dailyTripsLocalizedMap[trip.id]?.[lang];
  if (!loc) return trip;

  return {
    ...trip,
    title: loc.title || trip.title,
    duration: loc.duration || trip.duration,
    desc: loc.desc || trip.desc,
    price: (lang === 'en' && trip.price.toLowerCase().includes('konsultasi')) ? 'Inquire' : trip.price
  };
}
