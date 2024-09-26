import Image from 'next/image'
import Button from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/constants'

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tennesseebarbershop/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61579515790905&locale=es_LA',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
        <path
          d="M14 8.5h2.5V5.5H14c-2.2 0-3.5 1.5-3.5 3.8V11H8v3h2.5v6h3v-6H16l.5-3h-3.5v-1.4c0-.7.4-1.1 1-1.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: undefined,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
        <path
          d="M15 3c.4 2.7 1.9 4.4 4.5 4.7v3.1c-1.7.1-3.2-.4-4.5-1.3V14c0 3.2-2.6 6-6.1 6S3 17.3 3 14.3C3 11.2 5.6 8.7 8.9 8.7c.3 0 .6 0 .9.1v3.2c-.3-.1-.6-.2-.9-.2-1.7 0-3.1 1.3-3.1 2.9 0 1.7 1.3 3 3 3s3.2-1.3 3.2-3V3h3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: WHATSAPP_URL,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
        <path
          d="M12 3.5A8.5 8.5 0 0 0 4.1 15.2L3.5 20.5l5.4-1.4A8.5 8.5 0 1 0 12 3.5Zm4.9 12.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.4-.8-3-1.2-4.9-4.3-5-4.5-.1-.1-1.2-1.6-1.2-3.1 0-1.5.8-2.2 1.1-2.5.3-.3.7-.4.9-.4h.7c.2 0 .5 0 .7.5l.9 2.2c.1.4.1.7 0 .9-.1.2-.2.4-.4.6-.2.2-.4.4-.6.7-.2.2-.4.5-.2.8.2.3.9 1.5 1.9 2.4 1.3 1.1 2.4 1.5 2.8 1.7.3.1.6.1.8-.1.2-.2.9-1 1.1-1.3.2-.3.4-.2.7-.1l1.9.9c.3.1.5.3.6.4.1.2.1 1-.1 1.6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Google Maps',
    href: 'https://www.google.com/maps/place/Tennessee+Barbershop/@-33.3738227,-70.5205687,17z/data=!3m1!4b1!4m6!3m5!1s0x9662cbfbbb73da77:0xb5a3a9f83a4f8e1f!8m2!3d-33.3738227!4d-70.5179938!16s%2Fg%2F11hdcc1ncl?entry=ttu&g_ep=EgoyMDI2MDQyOC4wIKXMDSoASAFQAw%3D%3D',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
        <path
          d="M12 2.5c-3.3 0-6 2.6-6 5.8 0 4.4 6 13.2 6 13.2s6-8.8 6-13.2c0-3.2-2.7-5.8-6-5.8Zm0 8.6a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-14 mb-14 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center text-center md:justify-self-center md:items-center md:text-center max-w-xs mx-auto">
            <div className="mb-6">
              <Image
                src="/assets/imagenes/logo_tennessee/logo_nuevo_tennessee.png"
                alt="Tennessee Barber Shop"
                width={140}
                height={140}
                className="h-28 w-28 md:h-32 md:w-32 object-contain mx-auto"
              />
            </div>
            <p className="text-brand-muted text-sm leading-relaxed">
              Cortes, asesoría y estilo de oficio. Para el hombre que cuida cómo se presenta.
            </p>
            <p className="text-brand-muted/40 text-[10px] tracking-[0.3em] uppercase font-sans mt-8">
              — Hacedores de reyes —
            </p>
          </div>

          {/* Ubicación */}
          <div>
            <h4 className="text-brand-cream font-sans text-[10px] tracking-[0.3em] uppercase mb-6">
              Ubicación
            </h4>
            <div className="flex flex-col gap-3 text-sm text-brand-muted mb-8">
              <p>Nueva Costanera 12255</p>
              <p>Cantagallo, local 36</p>
              <a
                href="https://www.google.com/maps/place/Tennessee+Barbershop/@-33.3738227,-70.5205687,17z/data=!3m1!4b1!4m6!3m5!1s0x9662cbfbbb73da77:0xb5a3a9f83a4f8e1f!8m2!3d-33.3738227!4d-70.5179938!16s%2Fg%2F11hdcc1ncl?entry=ttu&g_ep=EgoyMDI2MDQyOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-amber hover:text-brand-cream transition-colors"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>

          {/* Horarios */}
          <div id="horarios">
            <h4 className="text-brand-cream font-sans text-[10px] tracking-[0.3em] uppercase mb-6">
              Horarios
            </h4>
            <div className="flex flex-col gap-3 text-sm text-brand-muted mb-8">
              <p>Lunes a viernes · 11:00 am a 8:00 pm</p>
              <p>Sábado · 11:00 am a 5:00 pm</p>
              <p>Domingos y feriados · cerrado</p>
            </div>
          </div>

          {/* Contacto / Trabajo */}
          <div id="contacto" className="md:justify-self-start text-center md:text-left">
            <h4 className="text-brand-cream font-sans text-[10px] tracking-[0.3em] uppercase mb-6">
              Contacto
            </h4>
            <div className="flex flex-col items-center md:items-start gap-4 text-sm text-brand-muted mb-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand-cream transition-colors"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 text-brand-amber">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
                    <path
                      d="M12 3.5A8.5 8.5 0 0 0 4.1 15.2L3.5 20.5l5.4-1.4A8.5 8.5 0 1 0 12 3.5Zm4.9 12.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.4-.8-3-1.2-4.9-4.3-5-4.5-.1-.1-1.2-1.6-1.2-3.1 0-1.5.8-2.2 1.1-2.5.3-.3.7-.4.9-.4h.7c.2 0 .5 0 .7.5l.9 2.2c.1.4.1.7 0 .9-.1.2-.2.4-.4.6-.2.2-.4.4-.6.7-.2.2-.4.5-.2.8.2.3.9 1.5 1.9 2.4 1.3 1.1 2.4 1.5 2.8 1.7.3.1.6.1.8-.1.2-.2.9-1 1.1-1.3.2-.3.4-.2.7-.1l1.9.9c.3.1.5.3.6.4.1.2.1 1-.1 1.6Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>+56 9 5618 2885</span>
              </a>
              <a
                href="https://www.instagram.com/tennesseebarbershop/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-cream transition-colors"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 text-brand-amber">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                </svg>
                @tennesseebarbershop
              </a>
              <div className="pt-10 border-t border-white/10 w-full">
                <p className="text-brand-cream font-sans text-[10px] tracking-[0.3em] uppercase mb-3">
                  Trabaja con nosotros
                </p>
                <p className="text-brand-muted/80 leading-relaxed">
                  Si te gustaría trabajar con nosotros, escríbenos por WhatsApp.
                </p>
              </div>
            </div>
            <Button href={WHATSAPP_URL} size="sm" variant="outline">
              Escribir por WhatsApp
            </Button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-brand-muted/40 text-xs font-sans">
            © {new Date().getFullYear()} Tennessee Barber Shop · Las Condes, Santiago
          </p>
          <p className="text-brand-muted/25 text-xs font-sans">
            Diseñado para el hombre moderno.
          </p>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {SOCIAL_LINKS.map((link) => (
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] text-brand-amber hover:text-brand-cream hover:border-brand-amber/50 transition-colors duration-200"
                  title={link.label}
                >
                  {link.icon}
                </a>
              ) : (
                <span
                  key={link.label}
                  aria-label={`${link.label} próximamente`}
                  title="Próximamente"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] text-brand-muted/40 cursor-default"
                >
                  {link.icon}
                </span>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
