import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/constants'

export default function BookingCTA() {
  return (
    <section className="relative bg-[#0D0D0D] py-32 md:py-40 px-6 overflow-hidden">
      {/* Acento de luz desde arriba */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-brand-amber/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-brand-amber text-[10px] tracking-[0.5em] uppercase mb-10 font-sans">
          — ¿Aún no estás convencido? —
        </p>

        <h2 className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] text-brand-cream leading-[1.08] mb-8">
          ¿Aún no estás convencido?
          <br />
          <em className="text-brand-amber">Escríbenos por WhatsApp y te asesoramos.</em>
        </h2>

        <p className="text-brand-muted text-base md:text-lg mb-14 max-w-md mx-auto leading-relaxed">
          Te guiamos con el corte o servicio que más te conviene.
        </p>

        <Button href={WHATSAPP_URL} size="xl">
          Escribir por WhatsApp →
        </Button>

        <p className="text-brand-muted/30 text-[10px] font-sans tracking-[0.35em] uppercase mt-10">
          Tennessee Barber Shop · Las Condes, Santiago
        </p>
      </div>

      {/* Acento de luz desde abajo */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#333333] to-transparent" />
    </section>
  )
}
