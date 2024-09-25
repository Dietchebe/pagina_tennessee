import SectionTitle from '@/components/ui/SectionTitle'

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Tennessee+Barbershop/@-33.3738227,-70.5205687,17z/data=!3m1!4b1!4m6!3m5!1s0x9662cbfbbb73da77:0xb5a3a9f83a4f8e1f!8m2!3d-33.3738227!4d-70.5179938!16s%2Fg%2F11hdcc1ncl?entry=ttu&g_ep=EgoyMDI2MDQyOC4wIKXMDSoASAFQAw%3D%3D'

export default function Location() {
  return (
    <section id="ubicacion" className="relative border-t border-[#2A1F10] py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Ubicación"
          title="Estamos en Nueva Costanera 12255"
          subtitle="Cantagallo, local 36"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-6 md:gap-8">
          <div className="border border-[#333333] bg-[#1a1a1a] min-h-[320px] md:min-h-[420px] relative overflow-hidden rounded-[1.5rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2a2a2a_0%,transparent_55%)]" />
            <div className="absolute inset-0 border-0" />
          </div>

          <div className="border border-[#333333] bg-[#0D0D0D] min-h-[320px] md:min-h-[420px] overflow-hidden relative rounded-[1.5rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(211,158,67,0.14)_0%,transparent_30%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.04)_0%,transparent_35%),linear-gradient(135deg,#141414_0%,#0D0D0D_100%)]" />
            <div className="absolute inset-0 opacity-35 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />

            <div className="relative z-10 h-full min-h-[320px] md:min-h-[420px] flex flex-col justify-between p-6 md:p-8">
              <div>
                <p className="text-brand-amber text-[10px] tracking-[0.35em] uppercase mb-5 font-sans">
                  — Mapa de referencia —
                </p>
                <h3 className="font-serif text-brand-cream text-2xl md:text-3xl mb-4">
                  Tennessee Barber Shop
                </h3>
                <p className="text-brand-muted text-sm md:text-base leading-relaxed max-w-sm">
                  Nueva Costanera 12255, Cantagallo local 36. Abre el mapa para llegar directo.
                </p>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div className="inline-flex items-center gap-3 border border-[#333333] bg-[#111111]/80 px-4 py-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-amber/10 text-brand-amber">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
                      <path
                        d="M12 2.5c-3.3 0-6 2.6-6 5.8 0 4.4 6 13.2 6 13.2s6-8.8 6-13.2c0-3.2-2.7-5.8-6-5.8Zm0 8.6a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-brand-cream text-sm font-medium">Preview de ubicación</p>
                    <p className="text-brand-muted/70 text-[10px] uppercase tracking-[0.25em]">
                      Google Maps
                    </p>
                  </div>
                </div>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-brand-amber/40 bg-brand-amber/10 px-5 py-3 text-brand-cream text-sm hover:bg-brand-amber/15 hover:border-brand-amber/60 transition-colors"
                >
                  Abrir en Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
