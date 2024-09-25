type ScrollLightShellProps = {
  children: React.ReactNode
}

export default function ScrollLightShell({ children }: ScrollLightShellProps) {
  return (
    <div className="relative isolate min-h-svh overflow-x-clip bg-[#0D0D0D]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#0D0D0D_0%,#111111_38%,#0D0D0D_100%)]" />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-[42svh] z-[1] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 sm:h-[40rem] sm:w-[40rem] lg:h-[46rem] lg:w-[46rem]"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(217,169,90,0.30)_0%,rgba(196,134,58,0.19)_18%,rgba(196,134,58,0.11)_36%,rgba(196,134,58,0.05)_56%,rgba(196,134,58,0.02)_70%,transparent_84%)] blur-[12px]" />
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(245,237,216,0.07)_0%,rgba(217,169,90,0.10)_28%,rgba(196,134,58,0.04)_54%,transparent_76%)] blur-[30px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.015)_35%,transparent_100%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
