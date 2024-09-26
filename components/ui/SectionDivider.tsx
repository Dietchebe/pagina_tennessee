export default function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative left-1/2 h-16 w-screen max-w-none -translate-x-1/2 md:h-20"
    >
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 mx-auto w-full max-w-4xl">
        <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-black/45 to-transparent blur-[1.5px]" />
        <div className="h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent md:via-brand-amber/55" />
      </div>
    </div>
  )
}
