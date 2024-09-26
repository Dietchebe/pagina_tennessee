import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tennessee Barber Shop — Las Condes, Santiago',
  description:
    'Barbería premium en Las Condes, Santiago. Cortes, asesoría personalizada y estilo de oficio. Agenda tu hora online.',
  openGraph: {
    title: 'Tennessee Barber Shop',
    description:
      'Barbería premium en Las Condes, Santiago. Tu mejor versión empieza aquí.',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
