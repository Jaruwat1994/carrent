'use client'

import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  href: string
  className?: string
  style?: React.CSSProperties
  strength?: number
}

export function MagneticButton({ children, href, className = '', style, strength = 0.35 }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
    >
      {children}
    </a>
  )
}
