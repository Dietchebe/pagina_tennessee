import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { GoogleGenerativeAI } from '@google/generative-ai';
import nodemailer from 'nodemailer';

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

    // Generar mensaje de bienvenida con IA
    let aiMessage = `¡Muchas gracias ${name}! Tu cita ha sido confirmada.`;
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
        const prompt = `Eres el asistente virtual de la barbería Tennessee. Escribe un mensaje muy corto y amigable (máximo 2 oraciones, menos de 30 palabras) confirmando la reserva de ${name} con el barbero ${barber} para el día ${date} a las ${time}. Menciona algún rasgo de experto del barbero (ej: Víctor en degradados, Ronald clásico, Barreto moderno o barba). No uses saludos excesivos, sé directo.`;
        
        // Retry logic for 503 errors
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const result = await model.generateContent(prompt);
            aiMessage = result.response.text().trim();
            break; // Success, exit loop
          } catch (e: any) {
            if (e.status === 503 && attempt < 2) {
              await new Promise(r => setTimeout(r, 1000)); // wait 1s and retry
              continue;
            }
            throw e; // throw other errors or if out of retries
          }
        }
      } else {
        console.warn("Falta GEMINI_API_KEY en las variables de entorno.");
      }
    } catch (aiError: any) {
      console.error("Error generando mensaje con IA:", aiError);
      // Fallback limpio y seguro para la presentación
      aiMessage = `¡Muchas gracias ${name}! Tu cita ha sido confirmada con éxito.`;
    }

    // --- Enviar correo al cliente ---
    try {
      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASSWORD;
      
      if (emailUser && emailPass && email) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass
          }
        });

        await transporter.sendMail({
          from: `"Tennessee Barber Shop" <${emailUser}>`,
          to: email,
          subject: "Confirmación de tu reserva - Tennessee",
          text: aiMessage,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
              <h2 style="color: #2c3e50; text-align: center;">Tennessee Barber Shop</h2>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="font-size: 16px; color: #333; margin: 0;">${aiMessage}</p>
              </div>
              <p style="color: #666; font-size: 14px; text-align: center;">Nos vemos el ${date} a las ${time} hrs con ${barber}.</p>
            </div>
          `
        });
        console.log(`Correo de confirmación enviado con éxito a ${email}`);
      } else {
        console.warn("Faltan credenciales de correo (EMAIL_USER o EMAIL_PASSWORD) o el email del cliente está vacío.");
      }
    } catch (emailError) {
      console.error("Error enviando el correo electrónico:", emailError);
      // No lanzamos el error para no romper la reserva si el correo falla
    }

    return NextResponse.json({ success: true, bookingId: result.lastInsertRowid, aiMessage }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
