'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/vehicles', label: 'รถทั้งหมด' },
    { href: '/services', label: 'บริการ' },
    { href: '/promotions', label: 'โปรโมชั่น' },
    { href: '/about', label: 'เกี่ยวกับเรา' },
    { href: '/contact', label: 'ติดต่อ' },
  ]

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(13,13,20,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0px' }}>
          <span style={{
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 900,
            fontSize: '22px',
            color: 'var(--accent)',
            letterSpacing: '-0.03em',
          }}>Car</span>
          <span style={{
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 300,
            fontSize: '22px',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>all</span>
          <span style={{
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 900,
            fontSize: '22px',
            color: 'var(--accent)',
            letterSpacing: '-0.03em',
          }}>Car</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'Sarabun, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: pathname === link.href ? 'var(--accent)' : 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = pathname === link.href ? 'var(--accent)' : 'var(--text-secondary)')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="desktop-nav">
          <ThemeToggle />
          {session ? (
            <>
              <Link href="/customer/dashboard" style={{
                fontFamily: 'Sarabun, sans-serif',
                fontSize: '14px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '32px', height: '32px',
                  borderRadius: '50%',
                  background: 'var(--accent-muted)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 700,
                  fontSize: '12px',
                  color: 'var(--accent)',
                }}>
                  {session.user?.name?.charAt(0).toUpperCase()}
                </span>
                {session.user?.name?.split(' ')[0]}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn-outline"
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outline" style={{ padding: '8px 20px', fontSize: '13px' }}>
                เข้าสู่ระบบ
              </Link>
              <Link href="/register" className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block',
              width: '22px',
              height: '2px',
              background: menuOpen
                ? i === 1 ? 'transparent' : 'var(--accent)'
                : 'var(--text-secondary)',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                : 'none'
                : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        maxHeight: menuOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
        background: 'rgba(13,13,20,0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: menuOpen ? '1px solid var(--border)' : 'none',
      }}>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Sarabun, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: pathname === link.href ? 'var(--accent)' : 'var(--text-secondary)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {session ? (
              <>
                <Link href="/customer/dashboard" onClick={() => setMenuOpen(false)} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontFamily: 'Sarabun, sans-serif' }}>แดชบอร์ด</Link>
                <button onClick={() => { signOut({ callbackUrl: '/' }); setMenuOpen(false) }} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontFamily: 'Sarabun, sans-serif', textAlign: 'left', cursor: 'pointer' }}>ออกจากระบบ</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-outline" style={{ textAlign: 'center' }}>เข้าสู่ระบบ</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ textAlign: 'center' }}>สมัครสมาชิก</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
