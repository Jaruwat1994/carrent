'use client'

interface Props {
  items: string[]
  className?: string
}

export function Marquee({ items, className = '' }: Props) {
  const doubled = [...items, ...items]
  return (
    <div className={`marquee-mask ${className}`}>
      <div className="marquee">
        {doubled.map((it, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: 'clamp(20px, 3vw, 32px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-muted)',
              padding: '0 40px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '40px',
              opacity: 0.55,
              transition: 'color 0.2s ease, opacity 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.opacity = '1' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.opacity = '0.55' }}
          >
            {it}
            <span style={{ color: 'var(--accent)', fontSize: '0.5em', opacity: 0.5 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
