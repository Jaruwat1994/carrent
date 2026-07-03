'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Rental {
  _id: string
  rentalCode: string
  startDate: string
  endDate: string
  totalPrice: number
  status: string
  vehicleId: { brand: string; model: string; year: number }
}

const statusConfig: Record<string, { text: string; color: string; bg: string }> = {
  pending:   { text: 'รอยืนยัน',    color: '#F5A623', bg: 'rgba(245,166,35,0.12)' },
  confirmed: { text: 'ยืนยันแล้ว',   color: '#60A5FA', bg: 'rgba(96,165,250,0.12)' },
  active:    { text: 'กำลังเช่า',    color: '#6EE08A', bg: 'rgba(110,224,138,0.12)' },
  completed: { text: 'เสร็จสิ้น',    color: '#A09FA6', bg: 'rgba(160,159,166,0.12)' },
  cancelled: { text: 'ยกเลิก',       color: '#F87171', bg: 'rgba(248,113,113,0.12)' },
  overdue:   { text: 'เกินกำหนด',   color: '#FB923C', bg: 'rgba(251,146,60,0.12)' },
}

export default function CustomerDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((d) => { setRentals(d.rentals || []); setLoading(false) })
  }, [status])

  const active = rentals.filter((r) => ['pending', 'confirmed', 'active'].includes(r.status))
  const past   = rentals.filter((r) => ['completed', 'cancelled', 'overdue'].includes(r.status))
  const fmt = (d: string) => new Date(d).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })

  if (status === 'loading' || loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-muted)' }}>กำลังโหลด...</div>
      </div>
    )
  }

  const stats = [
    { label: 'จองทั้งหมด',      value: rentals.length,                                    accent: false },
    { label: 'กำลังดำเนินการ',  value: active.length,                                     accent: true },
    { label: 'เสร็จสิ้น',       value: rentals.filter(r => r.status === 'completed').length, accent: false },
    { label: 'ยกเลิก',          value: rentals.filter(r => r.status === 'cancelled').length, accent: false },
  ]

  return (
    <div style={{ minHeight: '80vh', paddingTop: '48px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Dashboard</p>
            <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '4px' }}>
              สวัสดี, {session?.user?.name?.split(' ')[0]}
            </h1>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-secondary)' }}>ยินดีต้อนรับสู่แดชบอร์ดของคุณ</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/customer/profile" className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>โปรไฟล์</Link>
            <Link href="/vehicles" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>จองรถใหม่</Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '40px' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: 'var(--bg-secondary)', border: `1px solid ${s.accent ? 'var(--border-accent)' : 'var(--border)'}`, borderRadius: 'var(--radius-card)', padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '36px', fontWeight: 900, color: s.accent ? 'var(--accent)' : 'var(--text-primary)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick nav */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {[
            { href: '/customer/bookings', label: 'ประวัติการจองทั้งหมด' },
            { href: '/vehicles', label: 'ดูรถทั้งหมด' },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', padding: '6px 14px', border: '1px solid var(--border)', borderRadius: '20px', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
              {item.label} →
            </Link>
          ))}
        </div>

        {/* Active rentals */}
        {active.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>
              การจองปัจจุบัน
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {active.map((r) => <RentalRow key={r._id} rental={r} fmt={fmt} />)}
            </div>
          </section>
        )}

        {/* Past rentals */}
        {past.length > 0 && (
          <section>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>
              ประวัติการจอง
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {past.slice(0, 5).map((r) => <RentalRow key={r._id} rental={r} fmt={fmt} />)}
            </div>
            {past.length > 5 && (
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Link href="/customer/bookings" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--accent)', textDecoration: 'none' }}>
                  ดูทั้งหมด ({past.length} รายการ) →
                </Link>
              </div>
            )}
          </section>
        )}

        {rentals.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 24px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)' }}>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '48px', color: 'var(--text-muted)', marginBottom: '16px' }}>◎</div>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '8px' }}>ยังไม่มีประวัติการจอง</p>
            <Link href="/vehicles" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--accent)', textDecoration: 'none' }}>เริ่มจองรถเลย →</Link>
          </div>
        )}
      </div>
    </div>
  )
}

function RentalRow({ rental, fmt }: { rental: Rental; fmt: (d: string) => string }) {
  const s = statusConfig[rental.status] ?? { text: rental.status, color: 'var(--text-muted)', bg: 'var(--bg-elevated)' }
  return (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '20px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-accent)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>
            {rental.vehicleId?.brand} {rental.vehicleId?.model} ({rental.vehicleId?.year})
          </p>
          <span style={{ padding: '3px 10px', borderRadius: '20px', background: s.bg, fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: s.color }}>
            {s.text}
          </span>
        </div>
        <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>{fmt(rental.startDate)} — {fmt(rental.endDate)}</p>
        <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>รหัส: {rental.rentalCode}</p>
      </div>
      <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
        ฿{rental.totalPrice.toLocaleString()}
      </p>
    </div>
  )
}
