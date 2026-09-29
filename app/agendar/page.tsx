'use client'

import { useState, useEffect } from 'react'
import { format, addDays, isSunday, isSaturday, startOfToday } from 'date-fns'
import { es } from 'date-fns/locale'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const BARBERS = ['Ronald', 'Victor', 'Barreto']

function generateTimeSlots(dateStr: string) {
  if (!dateStr) return []
  const dateObj = new Date(dateStr)
  
  // Sunday
  if (isSunday(dateObj)) return []

  const slots = []
  const startHour = 9
  const endHour = isSaturday(dateObj) ? 15 : 19

  for (let i = startHour; i < endHour; i++) {
    slots.push(`${i.toString().padStart(2, '0')}:00`)
    slots.push(`${i.toString().padStart(2, '0')}:30`)
  }
  return slots
}

export default function AgendarPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    barber: '',
    date: '',
    time: ''
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [aiResponse, setAiResponse] = useState("")

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  // Generate the next 14 available days
  const upcomingDays = []
  let currentDate = startOfToday()
  while (upcomingDays.length < 14) {
    if (!isSunday(currentDate)) {
      upcomingDays.push(format(currentDate, 'yyyy-MM-dd'))
    }
    currentDate = addDays(currentDate, 1)
  }

  useEffect(() => {
    if (formData.date && formData.barber) {
      // Fetch booked slots
      const fetchSlots = async () => {
        try {
          const res = await fetch(`/api/bookings?barber=${formData.barber}&date=${formData.date}`)
          const bookings = await res.json()
          const bookedTimes = bookings.map((b: any) => b.time)
          
          const allSlots = generateTimeSlots(formData.date)
          const available = allSlots.filter(slot => !bookedTimes.includes(slot))
          setAvailableSlots(available)
        } catch (error) {
          console.error("Error fetching slots:", error)
        }
      }
      fetchSlots()
    }
  }, [formData.date, formData.barber])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Hubo un error al reservar' })
      } else {
        setMessage({ type: 'success', text: '¡Reserva confirmada con éxito!' })
        if (data.aiMessage) {
          setAiResponse(data.aiMessage)
        }
        setStep(4) // Success step
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black/95 text-gray-200 py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-black border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <Link href="/" className="text-white/50 hover:text-white text-sm mb-6 inline-block">
            &larr; Volver al inicio
          </Link>
          <h1 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">Agendar Cita</h1>
          
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl text-white font-medium mb-4">Selecciona tu Barbero</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {BARBERS.map(barber => (
                  <button
                    key={barber}
                    onClick={() => { updateForm('barber', barber); setStep(2) }}
                    className={`p-4 rounded-xl border transition-all ${
                      formData.barber === barber 
                        ? 'border-white text-white bg-white/10' 
                        : 'border-white/20 hover:border-white/50 hover:bg-white/5'
                    }`}
                  >
                    <div className="font-semibold text-lg">{barber}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl text-white font-medium mb-4">Selecciona Fecha y Hora</h2>
              
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Fecha</label>
                <select 
                  className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:border-white focus:outline-none transition-colors"
                  value={formData.date}
                  onChange={(e) => {
                    updateForm('date', e.target.value)
                    updateForm('time', '')
                  }}
                >
                  <option value="">Selecciona un día</option>
                  {upcomingDays.map(date => (
                    <option key={date} value={date}>
                      {format(new Date(date + 'T12:00:00'), "EEEE d 'de' MMMM", { locale: es })}
                    </option>
                  ))}
                </select>
              </div>

              {formData.date && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Hora</label>
                  {availableSlots.length === 0 ? (
                    <div className="text-yellow-500 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                      No hay horarios disponibles para este día.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {availableSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => { updateForm('time', time) }}
                          className={`p-2 rounded-lg border transition-all ${
                            formData.time === time 
                              ? 'border-white text-white bg-white/10' 
                              : 'border-white/20 hover:border-white/50 hover:bg-white/5 text-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white transition-colors">Atrás</button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!formData.date || !formData.time}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl text-white font-medium mb-4">Tus Datos</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nombre completo</label>
                  <input 
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:border-white focus:outline-none transition-colors"
                    value={formData.name}
                    onChange={e => updateForm('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input 
                    required
                    type="email"
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:border-white focus:outline-none transition-colors"
                    value={formData.email}
                    onChange={e => updateForm('email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Teléfono</label>
                  <input 
                    required
                    type="tel"
                    className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:border-white focus:outline-none transition-colors"
                    value={formData.phone}
                    onChange={e => updateForm('phone', e.target.value)}
                  />
                </div>

                {message.text && (
                  <div className={`p-4 rounded-lg border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-green-500/10 border-green-500/50 text-green-400'}`}>
                    {message.text}
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => setStep(2)} className="text-gray-400 hover:text-white transition-colors">Atrás</button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Confirmando...' : 'Confirmar Reserva'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 py-8 animate-in zoom-in-95 fade-in duration-500">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl text-white font-bold">¡Cita Confirmada!</h2>
              <p className="text-gray-400 text-lg">
                Te esperamos el {formData.date} a las {formData.time} hrs.<br/>
                Barbero: {formData.barber}
              </p>
              
              {aiResponse && (
                <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl relative">
                  <div className="absolute -top-3 -left-3 bg-white text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="text-sm">✨</span> Asistente IA
                  </div>
                  <p className="text-white italic">"{aiResponse}"</p>
                </div>
              )}

              <div className="pt-8">
                <Button href="/">Volver al Inicio</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
