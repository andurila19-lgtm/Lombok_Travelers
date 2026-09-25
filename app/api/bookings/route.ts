import { NextResponse } from 'next/server';
import { getBookingsFromDisk, createBooking } from '@/lib/bookingStore';
import { createBookingSchema } from '@/lib/validations/booking';

export async function GET() {
  try {
    const bookings = getBookingsFromDisk();
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Schema Validation & Input Sanitization
    const parseResult = createBookingSchema.safeParse(body);
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map((e) => e.message).join(', ');
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }

    const validData = parseResult.data;

    // 2. Persist safely sanitized booking
    const newBooking = createBooking({
      customer_name: validData.customer_name,
      whatsapp: validData.whatsapp,
      email: validData.email,
      package_id: validData.package_id,
      package_name: validData.package_name,
      travel_date: validData.travel_date,
      participants: validData.participants,
      adults: validData.adults,
      children: validData.children,
      pickup_location: validData.pickup_location,
      hotel_class: validData.hotel_class,
      transportation: validData.transportation,
      notes: validData.notes,
      status: 'New Inquiry',
    });

    return NextResponse.json(
      { success: true, message: 'Booking berhasil diajukan', data: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Format payload data tidak valid atau corrupt' },
      { status: 400 }
    );
  }
}
