'use client'

import { useState, useEffect } from 'react'

type Booking = {
  id: number
  name: string
  email: string
  phone: string
  barber: string
  date: string
  time: string
  status: string
  created_at: string
}

export default function Backoffice() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings/all')
      if (!res.ok) throw new Error('Error al cargar datos')
      const data = await res.json()
      setBookings(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Cargando datos...</div>
  }

  return (
    <main className="min-h-screen bg-black/95 text-gray-200 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 tracking-tight">Backoffice Interno - Reservas</h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8">
            {error}
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-white/10 text-white uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Contacto</th>
                  <th className="px-6 py-4">Barbero</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Hora</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Registrado el</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      No hay reservas registradas.
                    </td>
                  </tr>
                ) : (
                  bookings.map(booking => (
                    <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono">{booking.id}</td>
                      <td className="px-6 py-4 font-medium text-white">{booking.name}</td>
                      <td className="px-6 py-4">
                        <div>{booking.phone}</div>
                        <div className="text-gray-500 text-xs">{booking.email}</div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">{booking.barber}</td>
                      <td className="px-6 py-4">{booking.date}</td>
                      <td className="px-6 py-4 font-mono font-bold text-white">{booking.time}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{new Date(booking.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
