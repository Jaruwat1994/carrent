'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [scale, setScale] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setScale(max > 0 ? h.scrollTop / max : 0)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${scale})` }}
      aria-hidden="true"
    />
  )
}
