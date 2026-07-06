'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

interface Booking {
  _id: string; rentalCode: string; startDate: string; endDate: string
  totalPrice: number; deposit: number; status: string; notes: string
  pickupLocation: string; returnLocation: string; createdAt: string
  vehicleId: { brand: string; model: string; year: number; licensePlate: string; images: string[] }
  customerId: { firstName: string; lastName: string; email: string; phone: string }
}

const STATUS_LIST = ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'overdue']

const STATUS_LABELS: Record<string, string> = {
  pending:   'รอยืนยัน',
  confirmed: 'ยืนยันแล้ว',
  active:    'กำลังเช่า',
  completed: 'เสร็จสิ้น',
  cancelled: 'ยกเลิก',
  overdue:   'เกินกำหนด',
}

const SC: Record<string, { bg: string; color: string; border: string }> = {
  pending:   { bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24', border: 'rgba(251,191,36,0.3)'  },
  confirmed: { bg: 'rgba(96,165,250,0.12)',   color: '#60a5fa', border: 'rgba(96,165,250,0.3)'  },
  active:    { bg: 'rgba(52,211,153,0.12)',   color: '#34d399', border: 'rgba(52,211,153,0.3)'  },
  completed: { bg: 'rgba(107,114,128,0.15)',  color: '#6b7280', border: 'rgba(107,114,128,0.3)' },
  cancelled: { bg: 'rgba(248,113,113,0.12)',  color: '#f87171', border: 'rgba(248,113,113,0.3)' },
  overdue:   { bg: 'rgba(251,146,60,0.12)',   color: '#fb923c', border: 'rgba(251,146,60,0.3)'  },
}

function StatusBadge({ status }: { status: string }) {
  const s = SC[status] ?? SC.pending
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: '999px',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600,
      letterSpacing: '0.05em', textTransform: 'capitalize', whiteSpace: 'nowrap',
    }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

function formatDate(iso: string) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatDateTime(iso: string) {
  if (!iso) return '-'
  return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4b5563', width: '90px', flexShrink: 0, paddingTop: '1px' }}>{label}</span>
      <span style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#d1d5db', flex: 1 }}>{children}</span>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4b5563', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #1f2937' }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>{children}</div>
    </div>
  )
}

// ─── Inline status dropdown ──────────────────────────────────────────────────

function StatusDropdown({ bookingId, current, onChange }: {
  bookingId: string; current: string
  onChange: (id: string, status: string) => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleSelect = async (st: string) => {
    if (st === current) { setOpen(false); return }
    setBusy(true); setOpen(false)
    await onChange(bookingId, st)
    setBusy(false)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button disabled={busy} onClick={() => setOpen(o => !o)} style={{
        background: 'transparent', border: 'none', cursor: busy ? 'default' : 'pointer',
        padding: '2px 4px', borderRadius: '4px', opacity: busy ? 0.5 : 1,
        display: 'flex', alignItems: 'center', gap: '4px', transition: 'background 0.15s',
      }}
        onMouseEnter={e => { if (!busy) e.currentTarget.style.background = '#1f2937' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
        <StatusBadge status={current} />
        <span style={{ color: '#4b5563', fontSize: '10px', fontFamily: 'Fira Code, monospace' }}>▾</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
          <div style={{
            position: 'absolute', top: '100%', left: 0, zIndex: 50,
            marginTop: '4px', background: '#0d1117',
            border: '1px solid #1f2937', borderRadius: '10px',
            padding: '6px', minWidth: '140px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          }}>
            {STATUS_LIST.map(st => {
              const sc = SC[st]; const isActive = st === current
              return (
                <button key={st} onClick={() => handleSelect(st)} style={{
                  width: '100%', textAlign: 'left', padding: '7px 10px',
                  background: isActive ? sc.bg : 'transparent',
                  border: 'none', borderRadius: '6px', cursor: 'pointer',
                  fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600,
                  color: isActive ? sc.color : '#9ca3af', letterSpacing: '0.05em',
                  textTransform: 'capitalize', transition: 'all 0.1s',
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#1f2937'; e.currentTarget.style.color = '#f9fafb' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9ca3af' } }}>
                  {STATUS_LABELS[st] ?? st}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Detail modal ─────────────────────────────────────────────────────────────

function BookingModal({ booking, onClose, onStatusChange }: {
  booking: Booking; onClose: () => void
  onStatusChange: (id: string, status: string) => Promise<void>
}) {
  const [localStatus, setLocalStatus] = useState(booking.status)
  const [updating, setUpdating] = useState(false)

  const handleChange = async (st: string) => {
    setUpdating(true)
    await onStatusChange(booking._id, st)
    setLocalStatus(st)
    setUpdating(false)
  }

  const v = booking.vehicleId
  const c = booking.customerId
  const img = v?.images?.[0] ?? null

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0d1117', border: '1px solid #1f2937', borderRadius: '16px',
        width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto',
        padding: '32px', position: 'relative',
      }}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'transparent', border: '1px solid #1f2937', borderRadius: '8px',
          color: '#6b7280', cursor: 'pointer', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fira Code, monospace', fontSize: '16px', transition: 'all 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.color = '#f9fafb' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.color = '#6b7280' }}>
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623', marginBottom: '6px' }}>รายละเอียดการจอง</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '22px', fontWeight: 700, color: '#f9fafb', margin: 0, letterSpacing: '-0.02em' }}>#{booking.rentalCode}</h2>
            <StatusBadge status={localStatus} />
          </div>
          <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', color: '#4b5563', marginTop: '4px' }}>สร้างเมื่อ {formatDateTime(booking.createdAt)}</div>
        </div>

        {/* Vehicle */}
        <Section label="รถยนต์">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            {img && <img src={img} alt={v ? `${v.brand} ${v.model}` : 'vehicle'} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #1f2937', flexShrink: 0 }} />}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Row label="รุ่น">{v ? `${v.brand} ${v.model} (${v.year})` : '-'}</Row>
              <Row label="ทะเบียน">{v?.licensePlate ?? '-'}</Row>
            </div>
          </div>
        </Section>

        {/* Customer */}
        <Section label="ลูกค้า">
          <Row label="ชื่อ">{c ? `${c.firstName} ${c.lastName}` : '-'}</Row>
          <Row label="อีเมล">{c?.email ?? '-'}</Row>
          <Row label="โทรศัพท์">{c?.phone ?? '-'}</Row>
        </Section>

        {/* Booking info */}
        <Section label="ข้อมูลการจอง">
          <Row label="วันรับ">{formatDate(booking.startDate)}</Row>
          <Row label="วันคืน">{formatDate(booking.endDate)}</Row>
          <Row label="สถานที่รับ">{booking.pickupLocation || '-'}</Row>
          <Row label="สถานที่คืน">{booking.returnLocation || '-'}</Row>
          <Row label="เงินมัดจำ">฿{booking.deposit?.toLocaleString() ?? 0}</Row>
          <Row label="ยอดรวม"><span style={{ color: '#F5A623', fontWeight: 700 }}>฿{booking.totalPrice?.toLocaleString() ?? 0}</span></Row>
          {booking.notes && <Row label="หมายเหตุ">{booking.notes}</Row>}
        </Section>

        {/* Change status */}
        <Section label="เปลี่ยนสถานะ">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {STATUS_LIST.map(st => {
              const isActive = st === localStatus; const sc = SC[st]
              return (
                <button key={st} disabled={updating || isActive} onClick={() => handleChange(st)} style={{
                  padding: '6px 14px', borderRadius: '999px', cursor: isActive ? 'default' : 'pointer',
                  border: `1px solid ${isActive ? sc.border : '#1f2937'}`,
                  background: isActive ? sc.bg : 'transparent',
                  color: isActive ? sc.color : '#6b7280',
                  fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.05em', textTransform: 'capitalize',
                  transition: 'all 0.15s', opacity: updating ? 0.6 : 1,
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = sc.border; e.currentTarget.style.color = sc.color; e.currentTarget.style.background = sc.bg } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = 'transparent' } }}>
                  {st}
                </button>
              )
            })}
          </div>
        </Section>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Booking | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch] = useState('')

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bookings')
      const data = await res.json()
      setBookings(Array.isArray(data) ? data : data.bookings ?? [])
    } catch { setBookings([]) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b))
      if (selected?._id === id) setSelected(prev => prev ? { ...prev, status } : null)
    } catch {}
  }

  const filtered = bookings.filter(b => {
    const matchStatus = filterStatus === 'all' || b.status === filterStatus
    const q = search.toLowerCase()
    const matchSearch = !q || (
      b.rentalCode?.toLowerCase().includes(q) ||
      b.vehicleId?.brand?.toLowerCase().includes(q) ||
      b.vehicleId?.model?.toLowerCase().includes(q) ||
      b.customerId?.firstName?.toLowerCase().includes(q) ||
      b.customerId?.lastName?.toLowerCase().includes(q) ||
      b.customerId?.email?.toLowerCase().includes(q)
    )
    return matchStatus && matchSearch
  })

  const thStyle: React.CSSProperties = {
    fontFamily: 'Fira Code, monospace', fontSize: '9px', fontWeight: 600,
    letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4b5563',
    padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #1f2937',
    whiteSpace: 'nowrap',
  }

  const tdStyle: React.CSSProperties = {
    padding: '14px 16px', borderBottom: '1px solid #111827',
    fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#d1d5db',
    verticalAlign: 'middle',
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080c12' }}>
      <AdminSidebar />

      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', overflowY: 'auto' }}>
        {/* Page header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623', marginBottom: '8px' }}>
            ระบบ
          </div>
          <h1 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '28px', fontWeight: 700, color: '#f9fafb', margin: 0, letterSpacing: '-0.02em' }}>
            การจอง
          </h1>
          <p style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#4b5563', marginTop: '6px' }}>
            {bookings.length} รายการจองทั้งหมด
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="ค้นหารหัส, รถ, ลูกค้า..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: '#0d1117', border: '1px solid #1f2937', borderRadius: '8px',
              padding: '9px 14px', fontFamily: 'Fira Sans, sans-serif', fontSize: '13px',
              color: '#f9fafb', outline: 'none', width: '260px', transition: 'border-color 0.15s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#1f2937' }}
          />

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['all', ...STATUS_LIST].map(st => {
              const isActive = filterStatus === st
              const sc = st !== 'all' ? SC[st] : null
              const label = st === 'all' ? 'ทั้งหมด' : (STATUS_LABELS[st] ?? st)
              return (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  style={{
                    padding: '6px 12px', borderRadius: '999px', cursor: 'pointer',
                    border: `1px solid ${isActive && sc ? sc.border : isActive ? 'rgba(245,166,35,0.4)' : '#1f2937'}`,
                    background: isActive && sc ? sc.bg : isActive ? 'rgba(245,166,35,0.1)' : 'transparent',
                    color: isActive && sc ? sc.color : isActive ? '#F5A623' : '#6b7280',
                    fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.05em', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.color = '#9ca3af' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.color = '#6b7280' } }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '64px', textAlign: 'center', fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#4b5563', letterSpacing: '0.1em' }}>
              กำลังโหลด...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '64px', textAlign: 'center', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#4b5563' }}>
              ไม่พบการจอง
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#080c12' }}>
                    <th style={thStyle}>รหัส</th>
                    <th style={thStyle}>รถ</th>
                    <th style={thStyle}>ลูกค้า</th>
                    <th style={thStyle}>ช่วงเวลา</th>
                    <th style={thStyle}>รวม</th>
                    <th style={thStyle}>สถานะ</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(booking => (
                    <tr
                      key={booking._id}
                      style={{ transition: 'background 0.1s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <td style={tdStyle}>
                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#F5A623', fontWeight: 600 }}>
                          #{booking.rentalCode}
                        </span>
                      </td>

                      <td style={tdStyle}>
                        {booking.vehicleId ? (
                          <div>
                            <div style={{ color: '#f9fafb', fontWeight: 600, fontSize: '13px' }}>
                              {booking.vehicleId.brand} {booking.vehicleId.model}
                            </div>
                            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>
                              {booking.vehicleId.year} · {booking.vehicleId.licensePlate}
                            </div>
                          </div>
                        ) : <span style={{ color: '#4b5563' }}>—</span>}
                      </td>

                      <td style={tdStyle}>
                        {booking.customerId ? (
                          <div>
                            <div style={{ color: '#f9fafb', fontWeight: 500 }}>
                              {booking.customerId.firstName} {booking.customerId.lastName}
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                              {booking.customerId.email}
                            </div>
                          </div>
                        ) : <span style={{ color: '#4b5563' }}>—</span>}
                      </td>

                      <td style={tdStyle}>
                        <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                          {formatDate(booking.startDate)}
                        </div>
                        <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
                          → {formatDate(booking.endDate)}
                        </div>
                      </td>

                      <td style={tdStyle}>
                        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '13px', fontWeight: 700, color: '#f9fafb' }}>
                          ฿{booking.totalPrice?.toLocaleString() ?? 0}
                        </span>
                      </td>

                      <td style={tdStyle}>
                        <StatusDropdown
                          bookingId={booking._id}
                          current={booking.status}
                          onChange={handleStatusChange}
                        />
                      </td>

                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        <button
                          onClick={() => setSelected(booking)}
                          style={{
                            padding: '6px 14px', background: 'transparent',
                            border: '1px solid #1f2937', borderRadius: '8px',
                            cursor: 'pointer', fontFamily: 'Fira Sans, sans-serif',
                            fontSize: '12px', fontWeight: 500, color: '#9ca3af',
                            transition: 'all 0.15s', whiteSpace: 'nowrap',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)'; e.currentTarget.style.color = '#F5A623' }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.color = '#9ca3af' }}
                        >
                          ดูรายละเอียด
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {selected && (
        <BookingModal
          booking={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}
