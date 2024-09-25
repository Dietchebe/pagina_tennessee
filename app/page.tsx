import Header from '@/components/layout/Header'
import ScrollLightShell from '@/components/layout/ScrollLightShell'
import Hero from '@/components/sections/Hero'
import Gallery from '@/components/sections/Gallery'
import BrandPillars from '@/components/sections/BrandPillars'
import Services from '@/components/sections/Services'
import Promotions from '@/components/sections/Promotions'
import Location from '@/components/sections/Location'
import BookingCTA from '@/components/sections/BookingCTA'
import FloatingBookingButton from '@/components/sections/FloatingBookingButton'
import Footer from '@/components/layout/Footer'

export default function Page() {
  return (
    <>
      <Header />

      <ScrollLightShell>
        <main>
          <Hero />
          <Gallery />
          <BrandPillars />
          <Services />
          <Promotions />
          <Location />
          <BookingCTA />
        </main>

        <Footer />
      </ScrollLightShell>

      {/*
        El botón flotante se mantiene fuera del shell para que no participe del
        apilado visual del fondo y quede siempre nítido.
      */}
      <FloatingBookingButton />
    </>
  )
}
