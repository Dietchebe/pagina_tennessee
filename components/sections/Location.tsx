'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionDivider from '@/components/ui/SectionDivider'

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Tennessee+Barbershop/@-33.3738227,-70.5205687,17z/data=!3m1!4b1!4m6!3m5!1s0x9662cbfbbb73da77:0xb5a3a9f83a4f8e1f!8m2!3d-33.3738227!4d-70.5179938!16s%2Fg%2F11hdcc1ncl?entry=ttu&g_ep=EgoyMDI2MDQyOC4wIKXMDSoASAFQAw%3D%3D'

const INGRESS_IMAGES = [
  '/assets/imagenes/foto_ingreso/f1_ingreso.JPG',
  '/assets/imagenes/foto_ingreso/f2_ingreso.JPG',
  '/assets/imagenes/foto_ingreso/f3_ingreso.JPG',
  '/assets/imagenes/foto_ingreso/f4_ingreso.JPG',
  '/assets/imagenes/foto_ingreso/f5_ingreso.JPG',
]

const GOOGLE_MAPS_PREVIEW = '/assets/imagenes/foto_ingreso/foto_googlemaps.png'

export default function Location() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % INGRESS_IMAGES.length)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section id="ubicacion" className="relative bg-transparent py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Ubicación"
          title="Estamos en Nueva Costanera 12255"
          subtitle="Cantagallo, local 36, 2do piso"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-6 md:gap-8">
          <div className="border border-[#333333] bg-[#1a1a1a] min-h-[240px] md:min-h-[360px] relative overflow-hidden rounded-[1.5rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2a2a2a_0%,transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.2)_100%)]" />

            {INGRESS_IMAGES.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === activeImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={src}
                  alt={`Entrada Tennessee ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="media-monochrome object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            ))}

            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-[#333333] bg-[#0D0D0D] min-h-[240px] md:min-h-[360px] overflow-hidden relative rounded-[1.5rem] block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]"
            aria-label="Abrir Tennessee Barber Shop en Google Maps"
          >
            <Image
              src={GOOGLE_MAPS_PREVIEW}
              alt="Vista previa de la ubicación de Tennessee Barber Shop en Google Maps"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.22)_45%,rgba(0,0,0,0.72)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />

            <div className="relative z-10 h-full min-h-[240px] md:min-h-[360px] flex flex-col justify-between p-5 md:p-8">
              <div className="flex flex-col gap-3 md:gap-4 justify-end h-full">
                <div className="pt-3 md:pt-4 border-t border-white/10 mt-auto">
                  <div className="flex flex-col gap-3">
                    <p className="text-brand-muted text-sm md:text-base leading-relaxed max-w-sm">
                      Nueva Costanera 12255, Cantagallo local 36.
                    </p>

                    <div className="inline-flex items-center gap-3 self-start border border-[#333333] bg-[#111111]/80 px-4 py-3 transition-colors group-hover:border-brand-amber/40 group-hover:bg-[#151515]">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-amber/10 text-brand-amber">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                          <path
                            d="M12 2.5c-3.3 0-6 2.6-6 5.8 0 4.4 6 13.2 6 13.2s6-8.8 6-13.2c0-3.2-2.7-5.8-6-5.8Zm0 8.6a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="text-brand-cream text-sm font-medium">Abrir en Maps</p>
                        <p className="text-brand-muted/70 text-[10px] uppercase tracking-[0.25em]">
                          Google Maps
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="pt-10 md:pt-12">
          <SectionDivider />
        </div>
      </div>
    </section>
  )
}
