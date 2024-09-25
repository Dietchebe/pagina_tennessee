'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { AGENDAPRO_URL } from '@/lib/constants'

export default function FloatingBookingButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById('hero-booking-trigger')

    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting)
      },
      {
        threshold: 0,
      }
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-4'
      }`}
      aria-hidden={!visible}
    >
      <Button href={AGENDAPRO_URL} size="md" className="rounded-full shadow-lg shadow-black/50">
        Agendar aquí →
      </Button>
    </div>
  )
}
