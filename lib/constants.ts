export const AGENDAPRO_URL =
  'https://tennesseebarbershop.site.agendapro.com/cl/sucursal/5404?rwg_token=AFd1xnG6dr_M47BrNvXn5tO88pg0dtJUp1uum7KOjnTHDhn7D_iukGU_ilGzPQD1-lVAtdcoKdZVj5_fqqtziUKKibOu6OLDrA%3D%3D'
export const WHATSAPP_URL = 'https://wa.me/56956182885'

export const SERVICES = {
  cortes: [
    {
      name: 'Corte Degradado',
      price: 19900,
      promoPrice: 15920,
      promoLabel: 'Primera vez',
    },
    {
      name: 'Corte Clásico',
      price: 17900,
    },
    {
      name: 'Corte con Barba',
      price: 26900,
      promoPrice: 21520,
      promoLabel: 'Primera vez',
    },
  ],
  barba: [
    { name: 'Barba Spa', price: 17900 },
    { name: 'Afeitado al ras con toallas calientes', price: 16000 },
    { name: 'Depilación orejas y nariz', price: 12000 },
    { name: 'Depilación cejas', price: 6000 },
  ],
  especialidades: [
    { name: 'Ondulación permanente con corte incluido', price: 80000, isFrom: false },
    { name: 'Alisado', price: 40000, isFrom: true },
    { name: 'Decoloración y color fantasía', price: 100000, isFrom: true },
  ],
} satisfies Record<string, { name: string; price: number; promoPrice?: number; promoLabel?: string; isFrom?: boolean }[]>

export const STATS = [
  { value: '500+', label: 'Cortes realizados' },
  { value: '3', label: 'Barberos de oficio' },
  { value: '4.9★', label: 'Calificación Google' },
  { value: '5+', label: 'Años de experiencia' },
]

export const PROMOTIONS = [
  '20% de descuento en tu primera visita en corte degradado o corte con barba',
  'Martes y miércoles: 20% descuento en todos los cortes para Uandes, U. Andrés Bello, Tabancura y Oasis Fitness',
  'Perfilado de cejas gratis los martes y miércoles al agendar servicio',
  'Trae un amigo: uno obtiene 50% de descuento en un servicio adicional',
]

export const NAV_LINKS = [
  { href: '#galeria', label: 'Trabajos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#horarios', label: 'Horarios' },
  { href: '#contacto', label: 'Contacto' },
]

export const TESTIMONIALS = [
  {
    name: 'Matías R.',
    text: 'Increíble experiencia. Víctor me asesoró sobre qué estilo me quedaría mejor y quedé más que satisfecho. Definitivamente mi barbería.',
    rating: 5,
  },
  {
    name: 'Diego F.',
    text: 'Hace meses que vengo aquí. La calidad del corte y el trato cercano no tiene comparación en Las Condes.',
    rating: 5,
  },
  {
    name: 'Sebastián M.',
    text: 'Vine por primera vez con el descuento y no me voy a mover. El ambiente es perfecto y salí sintiéndome renovado.',
    rating: 5,
  },
]
