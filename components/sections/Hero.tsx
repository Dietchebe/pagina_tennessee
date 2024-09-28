import Button from '@/components/ui/Button'
import { AGENDAPRO_URL } from '@/lib/constants'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[92svh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="media-monochrome w-full h-full object-cover object-center"
        >
          <source src="/assets/imagenes/videos/video_intro/v1_intro.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,13,13,0.36)_48%,rgba(13,13,13,0.82)_100%)]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/74 via-black/52 to-black/86" />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-36 pb-16">
        <h1 className="font-serif text-[clamp(2.8rem,8vw,6rem)] text-brand-cream leading-[1.05] mb-8 -mt-1">
          Tu próxima visita
          <br />
          <em className="text-brand-amber">empieza aquí.</em>
        </h1>

        <p className="mt-8 text-white text-[10px] tracking-[0.35em] uppercase font-sans">
          +10000 cortes · 4.9★ Google · Asesoría incluida
        </p>

        <div
          className="mb-12 mx-auto max-w-lg h-[4.75rem] md:h-[5.75rem]"
          aria-hidden="true"
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href={AGENDAPRO_URL} size="xl">
            Agendar aquí →
          </Button>
          <Button href="#servicios" size="xl" variant="outline">
            Ver servicios
          </Button>
        </div>

        <div id="hero-booking-trigger" className="h-px w-px mx-auto mt-6" aria-hidden="true" />

        <p className="mt-20 text-brand-amber text-[10px] tracking-[0.5em] uppercase font-sans">
          Av. Nueva Las Condes 12255 * Cantagallo
        </p>

      </div>
    </section>
  )
}
