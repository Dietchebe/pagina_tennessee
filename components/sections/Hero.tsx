import Button from '@/components/ui/Button'
import { AGENDAPRO_URL } from '@/lib/constants'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[92svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background — reemplazar div por <video> cuando esté listo el archivo */}
      <div className="absolute inset-0">
        {/*
          Cuando tengas el video, reemplaza el div de abajo con:

          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        */}
        <div className="w-full h-full bg-[#0D0D0D]">
          {/* Gradiente cálido simulando iluminación de barbería */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#2a2a2a_0%,#0D0D0D_65%)]" />
        </div>
      </div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-28 pb-16">
        <p className="text-brand-amber text-[10px] tracking-[0.5em] uppercase mb-10 font-sans">
          — Las Condes · Santiago de — Chile · Cantagallo 
        </p>

        <h1 className="font-serif text-[clamp(2.8rem,8vw,6rem)] text-brand-cream leading-[1.05] mb-8">
          Tu próxima visita
          <br />
          <em className="text-brand-amber">empieza aquí.</em>
        </h1>

        <p className="text-brand-muted text-base md:text-xl mb-12 max-w-lg mx-auto leading-relaxed">
          Cortes precisos, asesoría real y reserva online.
          <br className="hidden sm:block" />
          Todo pensado para decidir rápido en mobile.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href={AGENDAPRO_URL} size="xl">
            Agendar aquí →
          </Button>
          <Button href="#servicios" size="xl" variant="outline">
            Ver servicios
          </Button>
        </div>

        <div id="hero-booking-trigger" className="h-px w-px mx-auto mt-6" aria-hidden="true" />

        <p className="mt-8 text-brand-muted/60 text-[10px] tracking-[0.35em] uppercase font-sans">
          +10000 cortes · 4.9★ Google · Asesoría incluida
        </p>
      </div>
    </section>
  )
}
