import { z } from 'zod';

/**
 * Utility to strip HTML tags and dangerous script characters to prevent Stored XSS
 */
export function sanitizeText(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/<[^>]*>?/gm, '') // remove HTML tags
    .replace(/[<>'"`]/g, '')    // remove raw script delimiters
    .trim();
}

/**
 * Zod Schema for Booking Creation (Custom Trip & Package Inquiries)
 */
export const createBookingSchema = z.object({
  customer_name: z
    .string()
    .min(2, { message: 'Nama pemesan minimal 2 karakter.' })
    .max(100, { message: 'Nama pemesan maksimal 100 karakter.' })
    .transform((val) => sanitizeText(val)),

  whatsapp: z
    .string()
    .min(8, { message: 'Nomor WhatsApp minimal 8 digit.' })
    .max(20, { message: 'Nomor WhatsApp maksimal 20 digit.' })
    .regex(/^[+]?[0-9\s\-()]{8,20}$/, {
      message: 'Format nomor WhatsApp tidak valid. Gunakan angka atau format internasional (+62).',
    })
    .transform((val) => sanitizeText(val)),

  email: z
    .string()
    .email({ message: 'Format email tidak valid.' })
    .optional()
    .or(z.literal(''))
    .transform((val) => (val ? sanitizeText(val).toLowerCase() : undefined)),

  package_id: z
    .string()
    .min(1, { message: 'ID Paket tidak boleh kosong.' })
    .max(100)
    .default('custom-trip')
    .transform((val) => sanitizeText(val)),

  package_name: z
    .string()
    .min(2, { message: 'Nama Paket wajib diisi.' })
    .max(150)
    .transform((val) => sanitizeText(val)),

  travel_date: z
    .string()
    .min(6, { message: 'Tanggal perjalanan wajib diisi.' })
    .max(30)
    .transform((val) => sanitizeText(val)),

  participants: z.coerce
    .number({ message: 'Jumlah peserta harus berupa angka.' })
    .int({ message: 'Jumlah peserta harus bilangan bulat.' })
    .min(1, { message: 'Minimal peserta adalah 1 orang.' })
    .max(200, { message: 'Maksimal peserta online adalah 200 orang.' }),

  pickup_location: z
    .string()
    .max(200, { message: 'Lokasi jemput maksimal 200 karakter.' })
    .optional()
    .default('Lombok Airport / Hotel')
    .transform((val) => sanitizeText(val)),

  transportation: z
    .string()
    .max(100, { message: 'Pilihan transportasi maksimal 100 karakter.' })
    .optional()
    .default('Standar Paket')
    .transform((val) => sanitizeText(val)),

  notes: z
    .string()
    .max(1000, { message: 'Catatan tambahan maksimal 1000 karakter.' })
    .optional()
    .default('')
    .transform((val) => sanitizeText(val)),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

/**
 * Zod Schema for Booking Status Update (Admin)
 */
export const updateBookingStatusSchema = z.object({
  status: z.enum(['New Inquiry', 'Confirmed', 'Completed', 'Cancelled']),
});
