'use client'

import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  href: string
  className?: string
  style?: React.CSSProperties
  intensity?: number
}

export function TiltCard({ children, href, className = '', style, intensity = 10 }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * intensity
    const ry = (px - 0.5) * intensity
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      className={`tilt-card${className ? ` ${className}` : ''}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
    >
      <span className="tilt-shine" />
      {children}
    </a>
  )
}
