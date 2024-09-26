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
  const rafRef = useRef<number | null>(null)
  const loopWidthRef = useRef(0)
  const pausedRef = useRef(false)
  const pointerDownRef = useRef(false)
  const lastTimestampRef = useRef(0)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const speed = window.matchMedia('(min-width: 1024px)').matches ? 46 : 32

    const pause = () => {
      pausedRef.current = true
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
        resumeTimeoutRef.current = null
      }
    }

    const resume = () => {
      pausedRef.current = false
      lastTimestampRef.current = 0
    }

    const scheduleResume = (delay = 1200) => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = setTimeout(() => {
        pointerDownRef.current = false
        resume()
      }, delay)
    }

    const measureLoopWidth = () => {
      loopWidthRef.current = track.scrollWidth / 2
    }

    measureLoopWidth()

    const resizeObserver = new ResizeObserver(measureLoopWidth)
    resizeObserver.observe(track)

    const onPointerDown = () => {
      pointerDownRef.current = true
      pause()
    }
    const onPointerUp = () => {
      pointerDownRef.current = false
      scheduleResume()
    }
    const onPointerCancel = () => {
      pointerDownRef.current = false
      scheduleResume(400)
    }
    const onVisibilityChange = () => {
      if (document.hidden) {
        pause()
      } else {
        resume()
      }
    }

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointerup', onPointerUp)
    track.addEventListener('pointercancel', onPointerCancel)
    document.addEventListener('visibilitychange', onVisibilityChange)

    const step = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp

      const loopWidth = loopWidthRef.current
      const deltaSeconds = (timestamp - lastTimestampRef.current) / 1000
      lastTimestampRef.current = timestamp

      if (!pausedRef.current && !document.hidden && loopWidth > 0) {
        let nextScrollLeft = track.scrollLeft + speed * deltaSeconds

        if (nextScrollLeft >= loopWidth) {
          nextScrollLeft -= loopWidth
        }

        track.scrollLeft = nextScrollLeft
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
      resizeObserver.disconnect()
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointerup', onPointerUp)
      track.removeEventListener('pointercancel', onPointerCancel)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <section id="galeria" className="relative bg-transparent pt-24 md:pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Galería" title="Nuestro trabajo" />

        {/* Collage horizontal con auto-deslizamiento + swipe manual.
            Cuando se completa el set, hace loop sin corte (track duplicado). */}
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto overflow-y-hidden h-[460px] md:h-[560px] [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
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
        <div className="pt-10 md:pt-12">
          <SectionDivider />
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
