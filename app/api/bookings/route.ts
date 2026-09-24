import { NextResponse } from 'next/server';
import { getBookingsFromDisk, createBooking } from '@/lib/bookingStore';

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

    if (!body.customer_name || !body.whatsapp || !body.package_name || !body.travel_date) {
      return NextResponse.json(
        { success: false, error: 'Nama, WhatsApp, Paket, dan Tanggal wajib diisi.' },
        { status: 400 }
      );
    }

    const newBooking = createBooking({
      customer_name: body.customer_name,
      whatsapp: body.whatsapp,
      email: body.email,
      package_id: body.package_id || 'custom-trip',
      package_name: body.package_name,
      travel_date: body.travel_date,
      participants: Number(body.participants) || 1,
      pickup_location: body.pickup_location || 'Lombok Airport / Hotel',
      transportation: body.transportation || 'Standar Paket',
      notes: body.notes,
      status: 'New Inquiry',
    });

    return NextResponse.json(
      { success: true, message: 'Booking berhasil diajukan', data: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while creating booking' },
      { status: 500 }
    );
  }
}
