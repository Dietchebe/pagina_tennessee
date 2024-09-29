import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const stmt = db.prepare("SELECT * FROM bookings ORDER BY date DESC, time DESC");
    const bookings = stmt.all();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    return NextResponse.json({ error: 'Error al obtener reservas' }, { status: 500 });
  }
}
