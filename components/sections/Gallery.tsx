'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionDivider from '@/components/ui/SectionDivider'

type Column =
  | { type: 'tall'; w: string; top: MediaTile }
  | { type: 'stack'; w: string; top: MediaTile; bottom: MediaTile }

type MediaTile =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; alt: string }

// Cada columna del collage: una pieza alta o dos piezas apiladas.
const COLUMNS: Column[] = [
  {
    type: 'tall',
    w: 'w-[240px] md:w-[280px]',
    top: {
      kind: 'video',
      src: '/assets/imagenes/fotos_clientes_testimonio/video_cliente4.mp4',
      alt: 'Video cliente 4',
    },
  },
  {
    type: 'stack',
    w: 'w-[300px] md:w-[360px]',
    top: {
      kind: 'image',
      src: '/assets/imagenes/fotos_clientes_testimonio/fct1.png',
      alt: 'Foto cliente testimonio 1',
    },
    bottom: {
      kind: 'video',
      src: '/assets/imagenes/fotos_clientes_testimonio/video_cliente1.MP4',
      alt: 'Video cliente 1',
    },
  },
  {
    type: 'tall',
    w: 'w-[260px] md:w-[300px]',
    top: {
      kind: 'video',
      src: '/assets/imagenes/fotos_clientes_testimonio/video_cliente3.mp4',
      alt: 'Video cliente 3',
    },
  },
  {
    type: 'stack',
    w: 'w-[280px] md:w-[340px]',
    top: {
      kind: 'video',
      src: '/assets/imagenes/fotos_clientes_testimonio/video_cliente2.mp4',
      alt: 'Video cliente 2',
    },
    bottom: {
      kind: 'image',
      src: '/assets/imagenes/fotos_clientes_testimonio/fct2.png',
      alt: 'Foto cliente testimonio 2',
    },
  },
  {
    type: 'tall',
    w: 'w-[280px] md:w-[320px]',
    top: {
      kind: 'image',
      src: '/assets/imagenes/fotos_clientes_testimonio/fct3.png',
      alt: 'Foto cliente testimonio 3',
    },
  },
  {
    type: 'stack',
    w: 'w-[260px] md:w-[300px]',
    top: {
      kind: 'image',
      src: '/assets/imagenes/fotos_clientes_testimonio/fct4.png',
      alt: 'Foto cliente testimonio 4',
    },
    bottom: {
      kind: 'image',
      src: '/assets/imagenes/fotos_clientes_testimonio/fct5.png',
      alt: 'Foto cliente testimonio 5',
    },
  },
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
    <section id="galeria" className="relative bg-transparent pt-24 md:pt-32 px-6">
      <SectionDivider />
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Galería" title="Nuestro trabajo" />

        {/* Collage horizontal con auto-deslizamiento + swipe manual.
            Cuando se completa el set, hace loop sin corte (track duplicado). */}
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto overflow-y-hidden h-[460px] md:h-[560px] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TRACK.map((col, i) => (
            <div key={i} className={`${col.w} flex flex-col gap-3 shrink-0`}>
              {col.type === 'tall' ? (
                <MediaTile item={col.top} />
              ) : (
                <>
                  <MediaTile item={col.top} />
                  <MediaTile item={col.bottom} />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="relative h-40 md:h-60">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}

function MediaTile({ item }: { item: MediaTile }) {
  return (
    <div className="relative flex-1 min-h-0 bg-[radial-gradient(circle_at_top,#2a2a2a_0%,#161616_70%)] border border-[#333333] rounded-lg overflow-hidden">
      {item.kind === 'image' ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 20vw, 45vw"
          className="media-monochrome object-cover object-center"
        />
      ) : (
        <video autoPlay muted loop playsInline className="media-monochrome w-full h-full object-cover object-center">
          <source src={item.src} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.18)_100%)]" />
    </div>
  )
}
