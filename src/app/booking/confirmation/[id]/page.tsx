'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Rental {
  _id: string
  rentalCode: string
  startDate: string
  endDate: string
  totalPrice: number
  deposit: number
  status: string
  pickupLocation?: string
  vehicleId: { brand: string; model: string; year: number; images: string[] }
}

export default function BookingConfirmationPage() {
  const { id } = useParams()
  const [rental, setRental] = useState<Rental | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/bookings/${id}`)
      .then((r) => r.json())
      .then((d) => { setRental(d.rental); setLoading(false) })
  }, [id])

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-muted)' }}>กำลังโหลด...</span>
    </div>
  )
  if (!rental) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-secondary)' }}>ไม่พบข้อมูลการจอง</span>
    </div>
  )

  const fmt = (d: string) => new Date(d).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div style={{ minHeight: '80vh', paddingTop: '64px', paddingBottom: '80px', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(245,166,35,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ maxWidth: '560px', position: 'relative', zIndex: 1 }}>
        {/* Success icon */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '72px', height: '72px',
            borderRadius: '50%',
            background: 'var(--accent-muted)',
            border: '1px solid var(--border-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '28px', color: 'var(--accent)' }}>✓</span>
          </div>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '8px' }}>
            จองรถสำเร็จ!
          </h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-secondary)' }}>
            รอการยืนยันจากเจ้าหน้าที่ภายใน 24 ชั่วโมง
          </p>
        </div>

        {/* Booking card */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '36px', marginBottom: '24px' }}>
          {/* Booking code */}
          <div style={{ textAlign: 'center', paddingBottom: '24px', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>รหัสการจอง</p>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '28px', fontWeight: 900, letterSpacing: '0.05em', color: 'var(--accent)' }}>{rental.rentalCode}</p>
          </div>

          {/* Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>รถที่จอง</p>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{rental.vehicleId?.brand} {rental.vehicleId?.model}</p>
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>({rental.vehicleId?.year})</p>
            </div>
            <div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>สถานะ</p>
              <span style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(245,166,35,0.12)', fontFamily: 'Raleway, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', color: '#F5A623' }}>
                รอยืนยัน
              </span>
            </div>
            <div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>วันรับรถ</p>
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-primary)' }}>{fmt(rental.startDate)}</p>
            </div>
            <div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>วันคืนรถ</p>
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-primary)' }}>{fmt(rental.endDate)}</p>
            </div>
            {rental.pickupLocation && (
              <div style={{ gridColumn: '1 / -1' }}>
                <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>สถานที่รับรถ</p>
                <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-primary)' }}>{rental.pickupLocation}</p>
              </div>
            )}
          </div>

          {/* Price */}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '24px', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>ราคาทั้งหมด</span>
              <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '28px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.02em' }}>฿{rental.totalPrice.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>มัดจำ (30%)</span>
              <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', color: 'var(--text-secondary)' }}>฿{rental.deposit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Link href="/customer/bookings" className="btn-outline" style={{ justifyContent: 'center', padding: '14px' }}>
            ดูประวัติการจอง
          </Link>
          <Link href="/vehicles" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
            จองรถเพิ่ม
          </Link>
        </div>
      </div>
    </div>
  )
}
