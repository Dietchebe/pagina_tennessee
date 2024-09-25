import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import { TESTIMONIALS, AGENDAPRO_URL } from '@/lib/constants'

export default function Testimonials() {
  return (
    <section className="bg-[#1a1a1a] py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Reseñas"
          title="Lo que dicen quienes ya confían en nosotros."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="border border-[#333333] bg-[#0D0D0D] p-8 md:p-10 flex flex-col"
            >
              {/* Estrellas */}
              <div className="flex gap-1 mb-7">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-brand-amber text-sm leading-none">
                    ★
                  </span>
                ))}
              </div>

              {/* Cita */}
              <p className="font-serif text-brand-cream text-base leading-relaxed mb-8 flex-1 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Nombre */}
              <div className="border-t border-[#333333] pt-5">
                <p className="font-sans text-brand-muted text-[10px] tracking-[0.3em] uppercase">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-brand-muted text-sm mb-8 font-sans">
            Reseñas reales de Google
          </p>
          <Button href={AGENDAPRO_URL} size="lg">
            Únete a ellos. Reserva aquí →
          </Button>
        </div>
      </div>
    </section>
  )
}
