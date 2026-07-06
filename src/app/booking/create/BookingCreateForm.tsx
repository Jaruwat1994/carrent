'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Vehicle {
  _id: string
  brand: string
  model: string
  year: number
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
  images: string[]
}

type DurationOption = 'custom' | 'daily' | 'weekly' | 'monthly'

export function BookingCreateForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { status } = useSession()
  const vehicleId = searchParams.get('vehicleId')

  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [durationOption, setDurationOption] = useState<DurationOption>('custom')
  const [daysCount, setDaysCount] = useState(1)
  const [weeksCount, setWeeksCount] = useState(1)
  const [monthsCount, setMonthsCount] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')
  const [returnLocation, setReturnLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (!vehicleId) return
    fetch(`/api/vehicles/${vehicleId}`)
      .then((r) => r.json())
      .then((d) => setVehicle(d.vehicle))
  }, [vehicleId])

  // Auto-calculate end date when duration option changes
  useEffect(() => {
    if (!startDate || durationOption === 'custom') return
    const start = new Date(startDate)
    let days = 0
    if (durationOption === 'daily') days = daysCount
    else if (durationOption === 'weekly') days = weeksCount * 7
    else if (durationOption === 'monthly') days = monthsCount * 30

    const end = new Date(start)
    end.setDate(end.getDate() + days)
    setEndDate(end.toISOString().split('T')[0])
  }, [startDate, durationOption, daysCount, weeksCount, monthsCount])

  const calcPrice = () => {
    if (!vehicle || !startDate || !endDate) return 0
    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
    if (days < 1) return 0
    if (days >= 30) return Math.ceil(days / 30) * vehicle.pricePerMonth
    if (days >= 7) return Math.ceil(days / 7) * vehicle.pricePerWeek
    return days * vehicle.pricePerDay
  }

  const getPricingTier = () => {
    if (!startDate || !endDate) return null
    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
    if (days < 1) return null
    if (days >= 30) return 'monthly'
    if (days >= 7) return 'weekly'
    return 'daily'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicleId, startDate, endDate, pickupLocation, returnLocation, notes }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'เกิดข้อผิดพลาด'); return }
    router.push(`/booking/confirmation/${data.rental._id}`)
  }

  const totalPrice = calcPrice()
  const today = new Date().toISOString().split('T')[0]
  const pricingTier = getPricingTier()
  const rentalDays = startDate && endDate ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) : 0

  if (status === 'loading') return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-muted)' }}>กำลังโหลด...</span>
    </div>
  )

  return (
    <div style={{ minHeight: '80vh', paddingTop: '48px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        <Link href={vehicleId ? `/vehicles/${vehicleId}` : '/vehicles'} style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
          ← กลับ
        </Link>

        <div style={{ marginBottom: '36px' }}>
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Booking</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>จองรถ</h1>
        </div>

        {/* Selected vehicle */}
        {vehicle && (
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-card)', padding: '20px 24px', marginBottom: '28px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '72px', height: '52px', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-elevated)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {vehicle.images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={vehicle.images[0]} alt={vehicle.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '24px', color: 'var(--text-muted)' }}>◎</span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '4px', fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>
                <span>฿{vehicle.pricePerDay.toLocaleString()}/วัน</span>
                <span>฿{vehicle.pricePerWeek.toLocaleString()}/สัปดาห์</span>
                <span>฿{vehicle.pricePerMonth.toLocaleString()}/เดือน</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: '#F87171' }}>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Rental Duration Options */}
          <div>
            <label className="field-label">เลือกระยะเวลาเช่า</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {[
                { value: 'daily' as DurationOption, label: 'รายวัน' },
                { value: 'weekly' as DurationOption, label: 'รายสัปดาห์' },
                { value: 'monthly' as DurationOption, label: 'รายเดือน' },
                { value: 'custom' as DurationOption, label: 'กำหนดเอง' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDurationOption(opt.value)}
                  style={{
                    padding: '10px 12px',
                    background: durationOption === opt.value ? 'var(--accent)' : 'var(--bg-elevated)',
                    border: `1px solid ${durationOption === opt.value ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    color: durationOption === opt.value ? '#000' : 'var(--text-secondary)',
                    fontFamily: 'Sarabun, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Duration count selectors */}
            {durationOption === 'daily' && (
              <div>
                <label className="field-label" style={{ fontSize: '12px' }}>จำนวนวัน</label>
                <input
                  type="number"
                  value={daysCount}
                  onChange={e => setDaysCount(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  max={29}
                  className="input-field"
                  style={{ maxWidth: '120px' }}
                />
              </div>
            )}
            {durationOption === 'weekly' && (
              <div>
                <label className="field-label" style={{ fontSize: '12px' }}>จำนวนสัปดาห์</label>
                <input
                  type="number"
                  value={weeksCount}
                  onChange={e => setWeeksCount(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  max={4}
                  className="input-field"
                  style={{ maxWidth: '120px' }}
                />
              </div>
            )}
            {durationOption === 'monthly' && (
              <div>
                <label className="field-label" style={{ fontSize: '12px' }}>จำนวนเดือน</label>
                <input
                  type="number"
                  value={monthsCount}
                  onChange={e => setMonthsCount(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  max={12}
                  className="input-field"
                  style={{ maxWidth: '120px' }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="field-label">วันรับรถ</label>
              <input type="date" value={startDate} min={today} onChange={e => setStartDate(e.target.value)} required className="input-field" />
            </div>
            <div>
              <label className="field-label">วันคืนรถ</label>
              <input
                type="date"
                value={endDate}
                min={startDate || today}
                onChange={e => setEndDate(e.target.value)}
                required
                className="input-field"
                disabled={durationOption !== 'custom'}
                style={{ opacity: durationOption !== 'custom' ? 0.6 : 1 }}
              />
            </div>
          </div>

          <div>
            <label className="field-label">สถานที่รับรถ</label>
            <input type="text" value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} placeholder="ระบุสถานที่รับรถ" className="input-field" />
          </div>

          <div>
            <label className="field-label">สถานที่คืนรถ</label>
            <input type="text" value={returnLocation} onChange={e => setReturnLocation(e.target.value)} placeholder="ระบุสถานที่คืนรถ (ถ้าต่างจากรับรถ)" className="input-field" />
          </div>

          <div>
            <label className="field-label">หมายเหตุ</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="ข้อมูลเพิ่มเติม..." className="input-field" style={{ resize: 'none', height: 'auto' }} />
          </div>

          {/* Price summary */}
          {totalPrice > 0 && (
            <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-accent)', borderRadius: '12px', padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>ระยะเวลา: {rentalDays} วัน</span>
                  {pricingTier && (
                    <div style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--accent)', marginTop: '4px' }}>
                      คิดตามอัตรา: {pricingTier === 'monthly' ? 'รายเดือน' : pricingTier === 'weekly' ? 'รายสัปดาห์' : 'รายวัน'}
                    </div>
                  )}
                </div>
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '26px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.02em' }}>฿{totalPrice.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>มัดจำ 30%</span>
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 700, color: 'var(--text-secondary)' }}>฿{Math.round(totalPrice * 0.3).toLocaleString()}</span>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary" style={{ justifyContent: 'center', padding: '16px', fontSize: '15px', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'กำลังส่งคำขอ...' : 'ยืนยันการจอง'}
          </button>
        </form>
      </div>
    </div>
  )
}
