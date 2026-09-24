export interface ItineraryItem {
  time: string;
  activity: string;
}

export interface ItineraryDay {
  day: string;
  title: string;
  schedule: ItineraryItem[];
}

export interface TourPackage {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  duration: string;
  type: string;
  location: string;
  image: string;
  gallery: string[];
  pricePlaceholder: string;
  shortDesc: string;
  description: string;
  highlights: string[];
  itinerary?: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
}

export interface DailyTrip {
  id: number;
  title: string;
  duration: string;
  image: string;
  desc: string;
  price: string;
}

export type BookingStatus =
  | 'New Inquiry'
  | 'Booking'
  | 'DP'
  | 'Lunas'
  | 'Selesai'
  | 'Cancelled';

export interface Booking {
  id: string;
  booking_number: string;
  customer_name: string;
  whatsapp: string;
  email?: string;
  package_id: string;
  package_name: string;
  travel_date: string;
  participants: number;
  pickup_location: string;
  transportation: string;
  notes?: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}
