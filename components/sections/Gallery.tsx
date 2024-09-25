'use client'

import { useEffect, useRef } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'

type Column =
  | { type: 'tall'; w: string; label: string }
  | { type: 'stack'; w: string; topLabel: string; bottomLabel: string }

// Cada columna del collage: o foto vertical completa, o dos fotos apiladas.
// Los ratios y anchos varían para crear el efecto de mosaico de la referencia.
const COLUMNS: Column[] = [
  { type: 'tall', w: 'w-[240px] md:w-[280px]', label: '01' },
  { type: 'stack', w: 'w-[300px] md:w-[360px]', topLabel: '02', bottomLabel: '03' },
  { type: 'tall', w: 'w-[260px] md:w-[300px]', label: '04' },
  { type: 'stack', w: 'w-[280px] md:w-[340px]', topLabel: '05', bottomLabel: '06' },
  { type: 'tall', w: 'w-[280px] md:w-[320px]', label: '07' },
  { type: 'stack', w: 'w-[260px] md:w-[300px]', topLabel: '08', bottomLabel: '09' },
]

// Duplicado para loop infinito sin saltos visibles.
const TRACK = [...COLUMNS, ...COLUMNS]

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (prefersReducedMotion || !isMobile) return

    let rafId = 0
    let isPaused = false
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null
    const speed = 0.55 // px por frame ≈ 33 px/s, deslizamiento lento pero visible

    const step = () => {
      if (!isPaused) {
        track.scrollLeft += speed
        const halfWidth = track.scrollWidth / 2
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth
        }
      }
      rafId = requestAnimationFrame(step)
    }

    const pause = () => {
      isPaused = true
      if (resumeTimeout) {
        clearTimeout(resumeTimeout)
        resumeTimeout = null
      }
    }

    const scheduleResume = () => {
      if (resumeTimeout) clearTimeout(resumeTimeout)
      resumeTimeout = setTimeout(() => {
        isPaused = false
      }, 1500)
    }

    const onMouseEnter = () => pause()
    const onMouseLeave = () => {
      isPaused = false
    }
    const onTouchStart = () => pause()
    const onTouchEnd = () => scheduleResume()

    track.addEventListener('mouseenter', onMouseEnter)
    track.addEventListener('mouseleave', onMouseLeave)
    track.addEventListener('touchstart', onTouchStart, { passive: true })
    track.addEventListener('touchend', onTouchEnd, { passive: true })
    track.addEventListener('touchcancel', onTouchEnd, { passive: true })

    rafId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(rafId)
      if (resumeTimeout) clearTimeout(resumeTimeout)
      track.removeEventListener('mouseenter', onMouseEnter)
      track.removeEventListener('mouseleave', onMouseLeave)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchend', onTouchEnd)
      track.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  return (
    <section id="galeria" className="relative py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Galería" title="Nuestro trabajo" />

        {/* Collage horizontal con auto-deslizamiento + swipe manual.
            Cuando se completa el set, hace loop sin corte (track duplicado). */}
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto overflow-y-hidden mb-10 h-[460px] md:h-[560px] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TRACK.map((col, i) => (
            <div key={i} className={`${col.w} flex flex-col gap-3 shrink-0`}>
              {col.type === 'tall' ? (
                <PhotoTile label={col.label} />
              ) : (
                <>
                  <PhotoTile label={col.topLabel} />
                  <PhotoTile label={col.bottomLabel} />
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function PhotoTile({ label }: { label: string }) {
  return (
    <div className="flex-1 min-h-0 bg-[radial-gradient(circle_at_top,#2a2a2a_0%,#161616_70%)] border border-[#333333] rounded-lg flex items-end p-4 overflow-hidden">
      <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-brand-muted/60">
        Foto {label}
      </p>
    </div>
  )
}
