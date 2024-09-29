import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const barber = searchParams.get('barber');
  const date = searchParams.get('date');

  let query = "SELECT time, barber, date FROM bookings WHERE status = 'confirmed'";
  const params: any[] = [];

  if (barber) {
    query += " AND barber = ?";
    params.push(barber);
  }
  
  if (date) {
    query += " AND date = ?";
    params.push(date);
  }

  const stmt = db.prepare(query);
  const bookings = stmt.all(...params);

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, barber, date, time } = body;

    if (!name || !email || !phone || !barber || !date || !time) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Check if the slot is already taken
    const checkStmt = db.prepare("SELECT id FROM bookings WHERE barber = ? AND date = ? AND time = ? AND status = 'confirmed'");
    const existing = checkStmt.get(barber, date, time);

    if (existing) {
      return NextResponse.json({ error: 'Este horario ya está reservado.' }, { status: 409 });
    }

    const insertStmt = db.prepare(`
      INSERT INTO bookings (name, email, phone, barber, date, time)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(name, email, phone, barber, date, time);

    // Enviar datos a Google Sheets
    try {
      await fetch('https://script.google.com/macros/s/AKfycbxo0CCe7tTUTdkjPKrLAf5ORGix-IHqtfOXsjBlz0Lu-_YHwzmQ8dN8M7CR8Iw8NtLt/exec', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, barber, date, time }),
      });
    } catch (sheetError) {
      console.error('Error enviando a Google Sheets:', sheetError);
    }

    return NextResponse.json({ success: true, bookingId: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
