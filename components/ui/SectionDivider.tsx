export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative h-16 md:h-20">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent" />
    </div>
  )
}
