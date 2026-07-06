'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { ChevronLeft, MapPin, Fuel, CheckCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'

interface Vehicle {
  _id: string
  brand: string
  model: string
  year: number
  seats: number
  color: string
  transmission: string
  fuelType: string
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
  description?: string
  images: string[]
  features: string[]
  status: string
  location?: string
}

export default function VehicleDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/vehicles/${id}`)
      .then((r) => r.json())
      .then((d) => { setVehicle(d.vehicle); setLoading(false) })
  }, [id])

  if (loading) return (
    <div style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Breadcrumb skeleton */}
        <Skeleton height={14} width={160} style={{ marginBottom: '32px', borderRadius: '6px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '48px', alignItems: 'start' }}>
          {/* Image placeholder */}
          <div style={{ borderRadius: 'var(--radius-card)', overflow: 'hidden', aspectRatio: '16/9', background: 'var(--bg-elevated)' }}>
            <Skeleton height="100%" borderRadius={0} style={{ minHeight: '300px' }} />
          </div>

          {/* Info panel skeleton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Skeleton height={12} width={120} />
            <Skeleton height={38} width="85%" />
            {/* Tags row */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Skeleton height={28} width={80} borderRadius={20} />
              <Skeleton height={28} width={90} borderRadius={20} />
              <Skeleton height={28} width={70} borderRadius={20} />
              <Skeleton height={28} width={110} borderRadius={20} />
            </div>
            {/* Pricing box */}
            <Skeleton height={110} borderRadius={8} style={{ marginTop: '4px' }} />
            {/* Description lines */}
            <Skeleton height={14} />
            <Skeleton height={14} width="92%" />
            <Skeleton height={14} width="74%" />
            {/* Features label + pills */}
            <Skeleton height={11} width={80} />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Skeleton height={24} width={90} borderRadius={20} />
              <Skeleton height={24} width={75} borderRadius={20} />
              <Skeleton height={24} width={100} borderRadius={20} />
            </div>
            {/* CTA */}
            <Skeleton height={52} style={{ marginTop: '8px', borderRadius: 'var(--radius-btn)' }} />
          </div>
        </div>
      </div>
    </div>
  )

  if (!vehicle) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-secondary)' }}>ไม่พบรถ</span>
    </div>
  )

  const fuelLabel: Record<string, string> = { gasoline: 'เบนซิน', diesel: 'ดีเซล', hybrid: 'ไฮบริด', electric: 'ไฟฟ้า' }
  const isAvailable = vehicle.status === 'available'

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <Link
          href="/vehicles"
          style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '32px' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ChevronLeft size={15} strokeWidth={2} />
          กลับไปรายการรถ
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '48px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{ borderRadius: 'var(--radius-card)', overflow: 'hidden', background: 'var(--bg-elevated)', aspectRatio: '16/9', position: 'relative' }}>
            {vehicle.images?.[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={vehicle.images[0]} alt={vehicle.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-secondary))' }}>
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '72px', color: 'var(--text-muted)' }}>◎</span>
              </div>
            )}
            {isAvailable && (
              <div style={{ position: 'absolute', top: '16px', left: '16px', padding: '6px 14px', background: 'rgba(13,13,20,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(110,224,138,0.3)', borderRadius: '20px' }}>
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#6EE08A' }}>AVAILABLE</span>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>
              {vehicle.year} · {vehicle.color}
            </p>
            <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '20px' }}>
              {vehicle.brand} {vehicle.model}
            </h1>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              <span style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid var(--border)', fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
                {vehicle.seats} ที่นั่ง
              </span>
              <span style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid var(--border)', fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
                {vehicle.transmission === 'automatic' ? 'เกียร์ออโต้' : 'เกียร์ธรรมดา'}
              </span>
              <span style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid var(--border)', fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Fuel size={12} strokeWidth={1.75} />
                {fuelLabel[vehicle.fuelType] || vehicle.fuelType}
              </span>
              {vehicle.location && (
                <span style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid var(--border)', fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={12} strokeWidth={1.75} />
                  {vehicle.location}
                </span>
              )}
            </div>

            {/* Pricing */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-card)', padding: '24px', marginBottom: '24px' }}>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>ราคาเช่า</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                {[
                  { amount: vehicle.pricePerDay, unit: 'ต่อวัน' },
                  { amount: vehicle.pricePerWeek, unit: 'ต่อสัปดาห์' },
                  { amount: vehicle.pricePerMonth, unit: 'ต่อเดือน' },
                ].map((p, i) => (
                  <div key={p.unit} style={{ padding: '16px 12px', textAlign: 'center', borderRight: i < 2 ? '1px solid var(--border)' : 'none', background: 'var(--bg-primary)' }}>
                    <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
                      ฿{p.amount.toLocaleString()}
                    </div>
                    <div style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{p.unit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {vehicle.description && (
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '20px' }}>{vehicle.description}</p>
            )}

            {/* Features */}
            {vehicle.features?.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>คุณสมบัติ</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {vehicle.features.map((f) => (
                    <span key={f} style={{ padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--border)', fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <CheckCircle size={11} strokeWidth={2} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {isAvailable ? (
              <button
                onClick={() => session ? router.push(`/booking/create?vehicleId=${vehicle._id}`) : router.push('/login')}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '15px' }}
                disabled={sessionStatus === 'loading'}
              >
                {sessionStatus === 'loading' ? 'กำลังโหลด...' : session ? 'จองรถคันนี้' : 'เข้าสู่ระบบเพื่อจอง'}
              </button>
            ) : (
              <div style={{ width: '100%', padding: '16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-btn)', textAlign: 'center', fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-muted)' }}>
                รถไม่ว่างในขณะนี้
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
