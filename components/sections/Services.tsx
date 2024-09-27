'use client'

import { useState } from 'react'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionDivider from '@/components/ui/SectionDivider'
import { SERVICES } from '@/lib/constants'

type Tab = keyof typeof SERVICES
type ServiceItem = {
  name: string
  price: number
  promoPrice?: number
  promoLabel?: string
  isFrom?: boolean
}

const serviceGroups = SERVICES as Record<Tab, ServiceItem[]>

const TABS: { id: Tab; label: string }[] = [
  { id: 'cortes', label: 'Cortes' },
  { id: 'barba', label: 'Barba' },
  { id: 'especialidades', label: 'Especialidades' },
]

function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-CL')}`
}

export default function Services() {
  const [active, setActive] = useState<Tab>('cortes')

  return (
    <section id="servicios" className="relative bg-transparent py-12 md:py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          eyebrow="Servicios"
          title="¿Qué necesitas hoy?"
          subtitle="Del corte clásico a la especialidad premium. Asesoría incluida."
        />

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2 border-b border-[#333333] mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`min-w-0 whitespace-nowrap text-center font-sans text-[8px] md:text-[10px] tracking-[0.12em] md:tracking-[0.24em] uppercase px-2 md:px-4 py-3 transition-all duration-200 border-b-2 -mb-px cursor-pointer ${
                active === tab.id
                  ? 'text-brand-amber border-brand-amber'
                  : 'text-brand-muted border-transparent hover:text-brand-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lista de servicios */}
        <div className="divide-y divide-[#333333] mb-8">
          {serviceGroups[active].map((service) => (
            <div
              key={service.name}
              className="py-6 flex items-start justify-between gap-6"
            >
              <div className="flex-1">
                <h3 className="font-serif text-brand-cream text-lg mb-1.5">
                  {service.name}
                </h3>
                {service.promoLabel ? (
                  <span className="inline-block font-sans text-[9px] text-brand-amber/80 tracking-[0.25em] uppercase border border-brand-amber/25 px-2 py-[3px]">
                    {service.promoLabel}
                  </span>
                ) : null}
              </div>
              <div className="text-right shrink-0">
                {typeof service.promoPrice === 'number' ? (
                  <>
                    <p className="font-sans text-brand-muted/60 text-xs line-through mb-0.5">
                      {formatPrice(service.price)}
                    </p>
                    <p className="font-serif text-brand-amber text-2xl leading-none">
                      {formatPrice(service.promoPrice)}
                    </p>
                  </>
                ) : (
                  <p className="font-serif text-brand-amber text-2xl leading-none">
                    {'isFrom' in service && service.isFrom ? (
                      <span className="text-brand-muted/60 text-sm font-sans mr-1">Desde</span>
                    ) : null}
                    {formatPrice(service.price)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <SectionDivider />
      </div>
    </section>
  )
}
