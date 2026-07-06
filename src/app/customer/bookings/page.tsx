'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CalendarX, ChevronLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'

interface Rental {
  _id: string
  rentalCode: string
  startDate: string
  endDate: string
  totalPrice: number
  status: string
  vehicleId: { brand: string; model: string; year: number; color: string; images: string[] }
}

const statusConfig: Record<string, { text: string; color: string; bg: string }> = {
  pending:   { text: 'รอยืนยัน',   color: '#F5A623', bg: 'rgba(245,166,35,0.12)' },
  confirmed: { text: 'ยืนยันแล้ว', color: '#60A5FA', bg: 'rgba(96,165,250,0.12)' },
  active:    { text: 'กำลังเช่า',  color: '#6EE08A', bg: 'rgba(110,224,138,0.12)' },
  completed: { text: 'เสร็จสิ้น',  color: '#A09FA6', bg: 'rgba(160,159,166,0.12)' },
  cancelled: { text: 'ยกเลิก',     color: '#F87171', bg: 'rgba(248,113,113,0.12)' },
  overdue:   { text: 'เกินกำหนด', color: '#FB923C', bg: 'rgba(251,146,60,0.12)' },
}

export default function CustomerBookingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState<string | null>(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((d) => { setRentals(d.rentals || []); setLoading(false) })
  }, [status])

  const handleCancel = async (id: string) => {
    if (!confirm('ยืนยันการยกเลิกการจองนี้?')) return
    setCancelling(id)
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'cancel' }),
    })
    const data = await res.json()
    setCancelling(null)
    if (!res.ok) { setMsg(data.error); return }
    setMsg('ยกเลิกการจองสำเร็จ')
    setRentals((prev) => prev.map((r) => r._id === id ? { ...r, status: 'cancelled' } : r))
  }

  const fmt = (d: string) => new Date(d).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })

  if (status === 'loading' || loading) {
    return (
      <div style={{ minHeight: '80vh', paddingTop: '48px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <Skeleton height={12} width={80} style={{ marginBottom: '12px' }} />
            <Skeleton height={32} width={200} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    <Skeleton height={16} width="40%" />
                    <Skeleton height={13} width="50%" />
                    <Skeleton height={12} width="30%" />
                  </div>
                  <Skeleton height={28} width={100} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '80vh', paddingTop: '48px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>My Bookings</p>
            <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>ประวัติการจอง</h1>
          </div>
          <Link href="/customer/dashboard" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            <ChevronLeft size={14} /> แดชบอร์ด
          </Link>
        </div>

        {/* Message */}
        {msg && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '10px',
            marginBottom: '24px',
            background: msg.includes('สำเร็จ') ? 'rgba(110,224,138,0.1)' : 'rgba(248,113,113,0.1)',
            border: `1px solid ${msg.includes('สำเร็จ') ? 'rgba(110,224,138,0.2)' : 'rgba(248,113,113,0.2)'}`,
          }}>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: msg.includes('สำเร็จ') ? '#6EE08A' : '#F87171' }}>{msg}</p>
          </div>
        )}

        {rentals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 24px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <CalendarX size={48} color="var(--text-muted)" />
            </div>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '8px' }}>ยังไม่มีประวัติการจอง</p>
            <Link href="/vehicles" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--accent)', textDecoration: 'none' }}>จองรถเลย →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rentals.map((r) => {
              const s = statusConfig[r.status] ?? { text: r.status, color: 'var(--text-muted)', bg: 'var(--bg-elevated)' }
              const canCancel = ['pending', 'confirmed'].includes(r.status)
              return (
                <div key={r._id} style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-card)',
                  padding: '24px 28px',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-accent)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <p style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>
                          {r.vehicleId?.brand} {r.vehicleId?.model} ({r.vehicleId?.year})
                        </p>
                        <span style={{ padding: '3px 10px', borderRadius: '20px', background: s.bg, fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: s.color }}>
                          {s.text}
                        </span>
                      </div>
                      <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                        {fmt(r.startDate)} — {fmt(r.endDate)}
                      </p>
                      <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>
                        รหัส: <span style={{ fontFamily: 'Raleway, sans-serif', letterSpacing: '0.05em' }}>{r.rentalCode}</span>
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                      <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '22px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
                        ฿{r.totalPrice.toLocaleString()}
                      </p>
                      {canCancel && (
                        <button
                          onClick={() => handleCancel(r._id)}
                          disabled={cancelling === r._id}
                          style={{
                            padding: '6px 16px',
                            border: '1px solid rgba(248,113,113,0.3)',
                            borderRadius: '8px',
                            background: 'transparent',
                            color: '#F87171',
                            fontFamily: 'Sarabun, sans-serif',
                            fontSize: '13px',
                            cursor: 'pointer',
                            opacity: cancelling === r._id ? 0.5 : 1,
                            transition: 'all 0.2s',
                          }}
                        >
                          {cancelling === r._id ? 'กำลังยกเลิก...' : 'ยกเลิกการจอง'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
