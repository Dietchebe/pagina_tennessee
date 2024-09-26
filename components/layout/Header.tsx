'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { NAV_LINKS } from '@/lib/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0D0D0D]/96 backdrop-blur-md border-b border-[#333333]'
          : 'bg-transparent'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 py-5 flex items-center justify-end md:justify-between">
        {/* Logo */}
        <a
          href="#inicio"
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center leading-none transition-[top] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? 'top-1/2' : 'top-[66%]'
          }`}
        >
          <Image
            src="/assets/imagenes/logo_tennessee/logo_nuevo_tennessee.png"
            alt="Tennessee Barber Shop"
            width={144}
            height={144}
            className={`object-contain transition-[width,height] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? 'h-20 w-20 md:h-24 md:w-24'
                : 'h-40 w-40 md:h-48 md:w-48'
            }`}
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[10px] text-brand-muted hover:text-brand-cream tracking-[0.25em] uppercase transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

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
