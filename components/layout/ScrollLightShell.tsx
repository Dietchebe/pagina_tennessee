'use client'

import { useEffect, useRef } from 'react'

type ScrollLightShellProps = {
  children: React.ReactNode
}

export default function ScrollLightShell({ children }: ScrollLightShellProps) {
  const shellRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    let rafId = 0

    const updateGlow = () => {
      const rect = shell.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const total = rect.height + viewportHeight
      const rawProgress = (viewportHeight - rect.top) / total
      const progress = Math.min(1, Math.max(0, rawProgress))

      const y = progress * Math.max(rect.height - 260, 0)
      const x = 52 + Math.sin(progress * Math.PI * 1.15) * 9
      const opacity = 0.18 + Math.sin(progress * Math.PI) * 0.12

      shell.style.setProperty('--scroll-glow-y', `${y}px`)
      shell.style.setProperty('--scroll-glow-x', `${x}%`)
      shell.style.setProperty('--scroll-glow-opacity', opacity.toFixed(3))
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateGlow)
    }

    updateGlow()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={shellRef}
      className="relative isolate overflow-hidden bg-[#0D0D0D]"
      style={
        {
          ['--scroll-glow-y' as string]: '0px',
          ['--scroll-glow-x' as string]: '52%',
          ['--scroll-glow-opacity' as string]: '0.18',
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,#111111_38%,#0D0D0D_100%)]" />
      <div
        className="pointer-events-none absolute top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand-amber/20 blur-[140px] transition-transform duration-150 ease-out"
        style={{
          left: 'var(--scroll-glow-x)',
          transform: 'translate3d(-50%, var(--scroll-glow-y), 0)',
          opacity: 'var(--scroll-glow-opacity)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.018)_35%,transparent_100%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#333333] to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
