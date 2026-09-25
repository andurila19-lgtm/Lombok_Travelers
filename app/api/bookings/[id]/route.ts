import { NextResponse } from 'next/server';
import { getBookingsFromDisk, updateBooking, deleteBooking } from '@/lib/bookingStore';
import { updateBookingStatusSchema } from '@/lib/validations/booking';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const bookings = getBookingsFromDisk();
    const found = bookings.find((b) => b.id === id || b.booking_number === id);

    if (!found) {
      return NextResponse.json(
        { success: false, error: 'Booking tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: found });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error fetching booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.status) {
      const parseResult = updateBookingStatusSchema.safeParse({ status: body.status });
      if (!parseResult.success) {
        return NextResponse.json(
          { success: false, error: parseResult.error.issues[0]?.message || 'Status booking tidak valid' },
          { status: 400 }
        );
      }
    }

    const updated = updateBooking(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Booking tidak ditemukan atau gagal diupdate' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status/data booking berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error updating booking' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const success = deleteBooking(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Booking tidak ditemukan atau gagal dihapus' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking berhasil dihapus',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error deleting booking' },
      { status: 500 }
    );
  }
}
