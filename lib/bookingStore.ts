import fs from 'fs';
import path from 'path';
import { Booking, BookingStatus } from '@/types';
import initialBookings from '@/data/bookings.json';

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json');

// In-memory fallback in case filesystem is restricted or read-only
let memoryBookings: Booking[] = initialBookings as Booking[];

export function getBookingsFromDisk(): Booking[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        memoryBookings = parsed;
        return memoryBookings;
      }
    }
  } catch (error) {
    console.error('Failed to read bookings from disk:', error);
  }
  return memoryBookings;
}

export function saveBookingsToDisk(bookings: Booking[]): boolean {
  memoryBookings = bookings;
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Failed to save bookings to disk:', error);
    return false;
  }
}

/**
 * Generate a unique booking number in format:
 * LT-[YYYYMMDD]-[SEQUENCE]
 * e.g., LT-20260924-001
 */
export function generateBookingNumber(existingBookings: Booking[]): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePrefix = `LT-${year}${month}${day}`;

  const todayBookings = existingBookings.filter(
    (b) => b.booking_number && b.booking_number.startsWith(datePrefix)
  );

  const nextSeq = todayBookings.length + 1;
  const seqStr = String(nextSeq).padStart(3, '0');

  return `${datePrefix}-${seqStr}`;
}

export function createBooking(
  data: Omit<Booking, 'id' | 'booking_number' | 'status' | 'created_at' | 'updated_at' | 'audit_log'> & {
    status?: BookingStatus;
  }
): Booking {
  const bookings = getBookingsFromDisk();
  const bookingNumber = generateBookingNumber(bookings);
  const nowIso = new Date().toISOString();

  // SECURITY RULE: Every newly submitted booking by customer MUST ALWAYS start as 'New Inquiry'
  const newBooking: Booking = {
    id: `bk-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    booking_number: bookingNumber,
    customer_name: data.customer_name,
    whatsapp: data.whatsapp,
    email: data.email || '',
    package_id: data.package_id,
    package_name: data.package_name,
    travel_date: data.travel_date,
    participants: Number(data.participants) || 1,
    adults: Number(data.adults) || Number(data.participants) || 1,
    children: Number(data.children) || 0,
    pickup_location: data.pickup_location,
    hotel_class: data.hotel_class || 'Tanpa Hotel / Sesuai Pilihan',
    transportation: data.transportation || 'Standar Paket (Innova / Avanza)',
    notes: data.notes || '',
    status: 'New Inquiry', // Strictly 'New Inquiry'
    created_at: nowIso,
    updated_at: nowIso,
    audit_log: [
      {
        timestamp: nowIso,
        action: 'INQUIRY_CREATED',
        note: 'Customer mengajukan reservasi online dengan status New Inquiry',
        performed_by: 'Customer / Public Form',
      },
    ],
  };

  const updatedList = [newBooking, ...bookings];
  saveBookingsToDisk(updatedList);
  return newBooking;
}

export function updateBooking(
  id: string,
  updates: Partial<Omit<Booking, 'id' | 'booking_number' | 'created_at'>>,
  performedBy = 'Administrator'
): Booking | null {
  const bookings = getBookingsFromDisk();
  const index = bookings.findIndex((b) => b.id === id || b.booking_number === id);
  if (index === -1) return null;

  const current = bookings[index];
  const nowIso = new Date().toISOString();

  const auditHistory = current.audit_log ? [...current.audit_log] : [];
  if (updates.status && updates.status !== current.status) {
    auditHistory.push({
      timestamp: nowIso,
      action: 'STATUS_CHANGED',
      note: `Status diubah dari [${current.status}] menjadi [${updates.status}]`,
      performed_by: performedBy,
    });
  } else {
    auditHistory.push({
      timestamp: nowIso,
      action: 'DETAILS_UPDATED',
      note: 'Data booking diperbarui oleh admin',
      performed_by: performedBy,
    });
  }

  const updated: Booking = {
    ...current,
    ...updates,
    updated_at: nowIso,
    audit_log: auditHistory,
  };

  bookings[index] = updated;
  saveBookingsToDisk(bookings);
  return updated;
}

export function deleteBooking(id: string): boolean {
  const bookings = getBookingsFromDisk();
  const filtered = bookings.filter((b) => b.id !== id && b.booking_number !== id);
  if (filtered.length === bookings.length) return false;

  saveBookingsToDisk(filtered);
  return true;
}
