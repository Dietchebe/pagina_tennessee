type ButtonProps = {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-sans tracking-widest uppercase transition-all duration-300 font-medium'

  const variants = {
    primary: 'bg-brand-amber text-[#0D0D0D] hover:bg-brand-amber-light',
    outline:
      'border border-brand-amber text-brand-amber hover:bg-brand-amber hover:text-[#0D0D0D]',
  }

  const sizes = {
    sm: 'text-[10px] px-4 py-2',
    md: 'text-xs px-6 py-3',
    lg: 'text-xs px-8 py-4',
    xl: 'text-sm px-10 py-5',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href?.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
