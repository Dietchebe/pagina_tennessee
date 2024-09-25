'use client'

import { useEffect, useState } from 'react'

const PILLARS = [
  {
    number: '01',
    title: 'Oficio real',
    text: 'Cada corte se piensa para tu estilo, no para una plantilla.',
  },
  {
    number: '02',
    title: 'Asesoría personalizada',
    text: 'Te guiamos antes de cortar para que salgas con una mejor decisión.',
  },
  {
    number: '03',
    title: 'Seguimiento de estilo',
    text: 'Guardamos tus preferencias para que volver sea más rápido.',
  },
  {
    number: '04',
    title: 'Comunidad masculina',
    text: 'Un espacio sobrio, cómodo y pensado para hombres que se cuidan.',
  },
]

const PROFILES = [
  {
    name: 'Víctor Castellano',
    role: 'Ceo · Tennessee Barber Shop',
    slogan:
      '"Tennessee existe para que cada visita termine con un corte preciso, una imagen clara y una experiencia que le represente"',
    tone: 'from-[#2a1a0a] to-[#1a1a1a]',
  },
  {
    name: 'Ronald',
    role: 'Barbero del equipo Tennessee',
    slogan:
      '"Ayudo a que cada cliente mantenga un estilo limpio, firme y fácil de llevar día a día"',
    tone: 'from-[#341d10] to-[#1a1a1a]',
  },
  {
    name: 'Barreto',
    role: 'Barbero del equipo Tennessee',
    slogan: '“Fade, mullet o low taper… quedas 10/10”',
    tone: 'from-[#24180f] to-[#1a1a1a]',
  },
]

function DividerBand() {
  return (
    <div className="px-6">
      <div className="relative h-16 md:h-20">
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent" />
      </div>
    </div>
  )
}

export default function BrandPillars() {
  const [activeProfile, setActiveProfile] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveProfile((current) => (current + 1) % PROFILES.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  const profile = PROFILES[activeProfile]

  return (
    <section id="nosotros" className="relative bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="px-6 pt-1 pb-8 md:pt-8 md:pb-10">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <div className="lg:sticky lg:top-32">
              <p className="text-brand-amber text-[10px] tracking-[0.35em] uppercase mb-5 font-sans text-center lg:text-left">
                — Nosotros —
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-cream leading-tight mb-5 text-center lg:text-left">
                No solo cortamos.
                <br />
                <em className="text-brand-amber">Asesoramos.</em>
              </h2>
              <div className="max-w-md mb-6">
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#2A1F10] bg-gradient-to-b ${profile.tone} mb-5 transition-all duration-500`}
                >
                  <div className="absolute inset-0 flex items-end justify-start p-6">
                    <div className="opacity-20">
                      <div className="w-12 h-12 border border-brand-amber rounded-full mb-2" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="text-brand-amber text-[9px] tracking-[0.35em] uppercase font-sans">
                      {String(activeProfile + 1).padStart(2, '0')} · {PROFILES.length}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 transition-all duration-500">
                    <p className="font-serif text-brand-cream text-2xl leading-tight">
                      {profile.name}
                    </p>
                    <p className="text-brand-amber text-[9px] tracking-[0.35em] uppercase font-sans mt-2">
                      {profile.role}
                    </p>
                  </div>
                </div>

                <div className="min-h-[7rem] md:min-h-[6rem]">
                  <p className="text-brand-muted text-base md:text-lg leading-relaxed">
                    {profile.slogan}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent mt-10 md:mt-12" />
        </div>

        <div className="px-6 pt-10 pb-14 md:pt-12 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 md:mb-10 max-w-2xl mx-auto text-center">
              <p className="text-brand-amber text-[10px] tracking-[0.35em] uppercase mb-3 font-sans">
                — Por qué nosotros —
              </p>
              <h3 className="font-serif text-4xl md:text-5xl text-brand-cream leading-tight">
                Cuatro razones que sostienen la experiencia.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#2A1F10] rounded-[2rem] overflow-hidden">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="bg-[#0D0D0D] hover:bg-[#141008] transition-colors duration-300 p-7 md:p-8"
                >
                  <span className="font-serif text-brand-amber/50 text-4xl mb-6 block leading-none">
                    {pillar.number}
                  </span>
                  <h3 className="font-serif text-brand-cream text-xl mb-3">{pillar.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
