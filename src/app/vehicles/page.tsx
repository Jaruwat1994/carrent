'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

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
  images: string[]
  status: string
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [brand, setBrand] = useState('')
  const [transmission, setTransmission] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchVehicles = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '12' })
    if (brand) params.set('brand', brand)
    if (transmission) params.set('transmission', transmission)
    const res = await fetch(`/api/vehicles?${params}`)
    const data = await res.json()
    setVehicles(data.vehicles || [])
    setTotalPages(data.totalPages || 1)
    setLoading(false)
  }, [page, brand, transmission])

  useEffect(() => { fetchVehicles() }, [fetchVehicles])

  return (
    <div style={{ minHeight: '80vh', paddingTop: '48px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>Fleet</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '10px' }}>รถยนต์ทั้งหมด</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '16px', color: 'var(--text-secondary)' }}>เลือกรถที่ใช่สำหรับทุกการเดินทาง</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px', padding: '20px 24px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label className="field-label">ยี่ห้อรถ</label>
            <input
              type="text"
              placeholder="ค้นหายี่ห้อ..."
              value={brand}
              onChange={(e) => { setBrand(e.target.value); setPage(1) }}
              className="input-field"
              style={{ padding: '10px 14px' }}
            />
          </div>
          <div style={{ flex: '1 1 160px' }}>
            <label className="field-label">ประเภทเกียร์</label>
            <select
              value={transmission}
              onChange={(e) => { setTransmission(e.target.value); setPage(1) }}
              className="input-field"
              style={{ padding: '10px 14px' }}
            >
              <option value="">ทั้งหมด</option>
              <option value="automatic">เกียร์ออโต้</option>
              <option value="manual">เกียร์ธรรมดา</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ borderRadius: 'var(--radius-card)', background: 'var(--bg-secondary)', height: '320px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '48px', color: 'var(--text-muted)', marginBottom: '16px' }}>◎</div>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '18px', color: 'var(--text-secondary)' }}>ไม่พบรถที่ค้นหา</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {vehicles.map((v) => <VehicleCard key={v._id} vehicle={v} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '48px' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: '40px', height: '40px',
                  borderRadius: '8px',
                  border: p === page ? 'none' : '1px solid var(--border)',
                  background: p === page ? 'var(--accent)' : 'transparent',
                  color: p === page ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 700, fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const fuelLabel: Record<string, string> = { gasoline: 'เบนซิน', diesel: 'ดีเซล', hybrid: 'ไฮบริด', electric: 'ไฟฟ้า' }

  return (
    <Link href={`/vehicles/${vehicle._id}`} className="card" style={{ textDecoration: 'none', display: 'block', overflow: 'hidden' }}>
      {/* Image */}
      <div style={{ height: '180px', background: 'var(--bg-elevated)', overflow: 'hidden', position: 'relative' }}>
        {vehicle.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={vehicle.images[0]} alt={vehicle.model} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-secondary))' }}>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '48px', color: 'var(--text-muted)' }}>◎</span>
          </div>
        )}
        {/* Status badge */}
        {vehicle.status === 'available' && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 10px', background: 'rgba(13,13,20,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(100,220,100,0.3)', borderRadius: '20px' }}>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#6EE08A' }}>AVAILABLE</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '4px' }}>
          {vehicle.brand} {vehicle.model}
        </h3>
        <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          {vehicle.year} · {vehicle.color}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {[
            `${vehicle.seats} ที่นั่ง`,
            vehicle.transmission === 'automatic' ? 'ออโต้' : 'ธรรมดา',
            fuelLabel[vehicle.fuelType] || vehicle.fuelType,
          ].map((tag) => (
            <span key={tag} style={{ padding: '3px 10px', borderRadius: '20px', border: '1px solid var(--border)', fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '22px', fontWeight: 900, color: 'var(--accent)' }}>
            ฿{vehicle.pricePerDay.toLocaleString()}
          </span>
          <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>/วัน</span>
        </div>
      </div>
    </Link>
  )
}
