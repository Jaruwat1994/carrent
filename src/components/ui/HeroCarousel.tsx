'use client'

import { useState, useEffect, useCallback } from 'react'

interface Slide {
  _id?: string
  title: string
  subtitle?: string
  imageUrl: string
  priceLabel?: string
}

const FALLBACK: Slide[] = [
  { title: 'SUV',    imageUrl: '/images/vehicles/suv-white.svg',    priceLabel: '฿1,200/วัน' },
  { title: 'Sedan',  imageUrl: '/images/vehicles/sedan-black.svg',  priceLabel: '฿800/วัน'   },
  { title: 'Pickup', imageUrl: '/images/vehicles/pickup-black.svg', priceLabel: '฿950/วัน'   },
  { title: 'Van',    imageUrl: '/images/vehicles/van-white.svg',    priceLabel: '฿1,500/วัน' },
]

export function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>(FALLBACK)
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    fetch('/api/carousel')
      .then(r => r.json())
      .then(d => { if (d.slides?.length) setSlides(d.slides) })
      .catch(() => {})
  }, [])

  const go = useCallback((idx: number) => {
    if (fading) return
    setFading(true)
    setTimeout(() => { setCurrent(idx); setFading(false) }, 280)
  }, [fading])

  const next = useCallback(() => go((current + 1) % slides.length), [current, go, slides.length])
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go, slides.length])

  useEffect(() => {
    const id = setInterval(next, 4200)
    return () => clearInterval(id)
  }, [next])

  const slide = slides[current]

  const btnBase: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: '36px', height: '36px', borderRadius: '50%',
    background: 'rgba(13,13,20,0.85)', backdropFilter: 'blur(8px)',
    border: '1px solid rgba(245,166,35,0.25)', color: '#F5A623',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '18px', lineHeight: '1', transition: 'border-color 0.2s, background 0.2s',
    zIndex: 2,
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', width: '70%', height: '50%',
        background: 'radial-gradient(ellipse, rgba(245,166,35,0.15) 0%, transparent 70%)',
        bottom: '10%', left: '15%', filter: 'blur(28px)', pointerEvents: 'none',
      }} />

      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={slide.imageUrl}
        src={slide.imageUrl}
        alt={slide.title}
        className="hero-car"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.28s ease' }}
      />

      {/* Prev */}
      <button
        onClick={prev}
        aria-label="ก่อนหน้า"
        style={{ ...btnBase, left: '-14px' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,166,35,0.15)'; e.currentTarget.style.borderColor = 'rgba(245,166,35,0.55)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(13,13,20,0.85)'; e.currentTarget.style.borderColor = 'rgba(245,166,35,0.25)' }}
      >‹</button>

      {/* Next */}
      <button
        onClick={next}
        aria-label="ถัดไป"
        style={{ ...btnBase, right: '-14px' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,166,35,0.15)'; e.currentTarget.style.borderColor = 'rgba(245,166,35,0.55)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(13,13,20,0.85)'; e.currentTarget.style.borderColor = 'rgba(245,166,35,0.25)' }}
      >›</button>

      {/* Badge */}
      <div style={{
        position: 'absolute', bottom: '18%', right: '2%',
        background: 'rgba(13,13,20,0.9)', backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-accent)', borderRadius: '12px',
        padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: '2px',
        opacity: fading ? 0 : 1, transition: 'opacity 0.28s ease',
      }}>
        <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{slide.title}</span>
        {slide.priceLabel && (
          <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '18px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.02em' }}>{slide.priceLabel}</span>
        )}
        {slide.subtitle && (
          <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '11px', color: 'var(--text-muted)' }}>{slide.subtitle}</span>
        )}
      </div>

      {/* Dots */}
      <div style={{
        position: 'absolute', bottom: '4%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '6px', alignItems: 'center',
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`สไลด์ ${i + 1}`}
            style={{
              width: i === current ? '20px' : '6px', height: '6px',
              borderRadius: '3px', border: 'none',
              background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
