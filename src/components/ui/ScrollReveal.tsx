'use client'

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale'

interface Props {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  style?: CSSProperties
}

const dirClass: Record<Direction, string> = {
  up: '',
  left: ' reveal-left',
  right: ' reveal-right',
  scale: ' reveal-scale',
}

export function ScrollReveal({ children, direction = 'up', delay = 0, className = '', style }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal${dirClass[direction]}${visible ? ' reveal-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}
