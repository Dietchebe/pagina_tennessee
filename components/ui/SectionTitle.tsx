type SectionTitleProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignClass} mb-14 md:mb-20`}>
      {eyebrow && (
        <p className="text-brand-amber text-[10px] tracking-[0.35em] uppercase mb-5 font-sans">
          — {eyebrow} —
        </p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl text-brand-cream leading-tight mb-5">
        {title}
      </h2>
      {subtitle && (
        <p className="text-brand-muted text-base md:text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
