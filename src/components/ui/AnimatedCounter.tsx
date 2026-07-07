'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  style?: React.CSSProperties
}

export function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1600, className, style }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              setDisplay(Math.round(eased * value))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display.toLocaleString('en-US')}{suffix}
    </span>
  )
}
