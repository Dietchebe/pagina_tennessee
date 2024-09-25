import SectionTitle from '@/components/ui/SectionTitle'
import { PROMOTIONS } from '@/lib/constants'

export default function Promotions() {
  return (
    <section className="relative py-10 md:py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Promociones" title="Promociones" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo}
              className="border border-[#333333] bg-[#0D0D0D] p-6 md:p-7 rounded-[1.5rem]"
            >
              <p className="text-brand-amber text-[10px] tracking-[0.35em] uppercase mb-4 font-sans">
                — Oferta —
              </p>
              <p className="text-brand-muted text-sm leading-relaxed">{promo}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
