'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Car, CalendarDays, Users, LogOut, GalleryHorizontal, CreditCard, Receipt } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'ภาพรวม',     Icon: LayoutDashboard, exact: true },
  { href: '/admin/vehicles',  label: 'จัดการรถ',   Icon: Car },
  { href: '/admin/bookings',  label: 'การจอง',     Icon: CalendarDays },
  { href: '/admin/customers', label: 'ลูกค้า',     Icon: Users },
  { href: '/admin/payments',  label: 'ช่องทางชำระเงิน',   Icon: CreditCard },
  { href: '/admin/transactions',  label: 'รายการโอนเงิน',   Icon: Receipt },
  { href: '/admin/carousel',  label: 'Carousel',   Icon: GalleryHorizontal },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside style={{
      width: '240px', minHeight: '100vh', background: '#0d1117',
      borderRight: '1px solid #1f2937', display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid #1f2937' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', background: '#F5A623', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Fira Code, monospace', fontSize: '14px', fontWeight: 700, color: '#000',
          }}>C</div>
          <div>
            <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: '#f9fafb', letterSpacing: '-0.01em' }}>Carallcar</div>
            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#F5A623', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px' }}>
        <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4b5563', padding: '8px 12px 8px', marginBottom: '4px' }}>
          เมนูหลัก
        </div>
        {navItems.map(({ href, label, Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '8px', textDecoration: 'none',
              marginBottom: '2px', transition: 'all 0.18s',
              background: isActive ? 'rgba(245,166,35,0.1)' : 'transparent',
              border: isActive ? '1px solid rgba(245,166,35,0.2)' : '1px solid transparent',
            }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#1f2937'; e.currentTarget.style.borderColor = '#374151' } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' } }}>
              <Icon
                size={16}
                color={isActive ? '#F5A623' : '#6b7280'}
                style={{ transition: 'color 0.18s', flexShrink: 0 }}
              />
              <span style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: isActive ? 600 : 400, color: isActive ? '#f9fafb' : '#9ca3af', letterSpacing: '-0.01em', transition: 'color 0.18s' }}>{label}</span>
              {isActive && <div style={{ marginLeft: 'auto', width: '4px', height: '4px', borderRadius: '50%', background: '#F5A623' }} />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid #1f2937' }}>
        <button onClick={handleLogout} style={{
          width: '100%', padding: '10px 12px', background: 'transparent',
          border: '1px solid #1f2937', borderRadius: '8px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.18s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; e.currentTarget.style.background = 'rgba(239,68,68,0.05)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.background = 'transparent' }}>
          <LogOut size={15} color="#6b7280" style={{ transition: 'color 0.18s' }} />
          <span style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#6b7280', transition: 'color 0.18s' }}>ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  )
}
