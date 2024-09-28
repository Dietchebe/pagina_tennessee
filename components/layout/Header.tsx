'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/lib/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDesktopMenuOpen(false)
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0D0D0D]/96 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#inicio"
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center leading-none transition-[top] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? 'top-[46%] md:top-1/2' : 'top-[64%] md:top-[66%]'
          }`}
        >
          <Image
            src="/assets/imagenes/logo_tennessee/logo_sin_titulo_3.png"
            alt="Tennessee Barber Shop"
            width={144}
            height={144}
            className={`object-contain transition-[width,height] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? 'h-20 w-20 md:h-24 md:w-24'
                : 'h-36 w-36 md:h-48 md:w-48'
            }`}
            priority
          />
        </a>

        {/* Desktop menu */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setDesktopMenuOpen((open) => !open)}
            className={`flex items-center gap-3 rounded-full border px-5 py-3 font-sans text-[10px] tracking-[0.28em] uppercase transition-colors duration-200 ${
              desktopMenuOpen || scrolled
                ? 'border-[#444444] bg-[#111111]/90 text-brand-cream hover:border-brand-amber/60'
                : 'border-white/15 bg-black/10 text-brand-muted hover:text-brand-cream hover:border-white/30'
            }`}
            aria-expanded={desktopMenuOpen}
            aria-controls="desktop-menu"
            aria-label="Abrir menú de navegación"
          >
            <span>Menú</span>
            <span className="text-[11px] leading-none">{desktopMenuOpen ? '▴' : '▾'}</span>
          </button>

          <div
            id="desktop-menu"
            className={`absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-2xl border border-[#333333] bg-[#0D0D0D]/98 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 ${
              desktopMenuOpen
                ? 'visible translate-y-0 opacity-100'
                : 'pointer-events-none invisible -translate-y-2 opacity-0'
            }`}
          >
            <nav className="flex flex-col p-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setDesktopMenuOpen(false)}
                  className="rounded-xl px-4 py-3 font-sans text-[10px] text-brand-muted tracking-[0.25em] uppercase transition-colors hover:bg-white/5 hover:text-brand-cream"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2 relative z-10"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-5 h-px bg-brand-cream transition-all duration-300 origin-center ${
              menuOpen ? 'rotate-45 translate-y-[6px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-brand-cream transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-px bg-brand-cream transition-all duration-300 origin-center ${
              menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen
            ? 'max-h-96 bg-[#0D0D0D]/98 border-b border-[#333333]'
            : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-8 gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm text-brand-muted hover:text-brand-cream tracking-[0.25em] uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
