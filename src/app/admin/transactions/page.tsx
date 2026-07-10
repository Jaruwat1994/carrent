'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { CheckCircle, XCircle, Eye, ExternalLink, Search } from 'lucide-react'

interface Transaction {
  _id: string
  rentalCode: string
  totalPrice: number
  deposit: number
  paymentStatus: 'unpaid' | 'deposit_paid' | 'fully_paid'
  depositProofUrl?: string
  depositPaidAt?: string
  fullPaymentProofUrl?: string
  fullPaymentPaidAt?: string
  status: string
  startDate: string
  endDate: string
  createdAt: string
  vehicleId: {
    brand: string
    model: string
    year: number
    licensePlate: string
    color: string
    images: string[]
  }
  customerId: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

const PAYMENT_LABELS: Record<string, string> = {
  unpaid: 'ยังไม่ชำระ',
  deposit_paid: 'ชำระมัดจำแล้ว',
  fully_paid: 'ชำระครบแล้ว',
}

const PAYMENT_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  unpaid:      { bg: 'rgba(248,113,113,0.12)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
  deposit_paid:{ bg: 'rgba(251,191,36,0.12)',  color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  fully_paid:  { bg: 'rgba(52,211,153,0.12)',  color: '#34d399', border: 'rgba(52,211,153,0.3)' },
}

function StatusBadge({ status }: { status: string }) {
  const s = PAYMENT_STYLES[status] ?? PAYMENT_STYLES.unpaid
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: '999px',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600,
      letterSpacing: '0.05em',
    }}>
      {PAYMENT_LABELS[status] ?? status}
    </span>
  )
}

function formatDate(iso: string) {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatDateTime(iso: string) {
  if (!iso) return '-'
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4b5563', width: '100px', flexShrink: 0, paddingTop: '1px' }}>{label}</span>
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

function TransactionModal({ tx, onClose, onVerify }: {
  tx: Transaction
  onClose: () => void
  onVerify: (id: string, status: 'unpaid' | 'deposit_paid' | 'fully_paid') => Promise<void>
}) {
  const [localStatus, setLocalStatus] = useState(tx.paymentStatus)
  const [updating, setUpdating] = useState(false)

  const handleVerify = async (st: 'unpaid' | 'deposit_paid' | 'fully_paid') => {
    setUpdating(true)
    await onVerify(tx._id, st)
    setLocalStatus(st)
    setUpdating(false)
  }

  const v = tx.vehicleId
  const c = tx.customerId
  const img = v?.images?.[0] ?? null
  const hasDeposit = tx.depositProofUrl || tx.paymentStatus === 'deposit_paid'
  const hasFull = tx.fullPaymentProofUrl || tx.paymentStatus === 'fully_paid'

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0d1117', border: '1px solid #1f2937', borderRadius: '16px',
        width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto',
        padding: '32px', position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'transparent', border: '1px solid #1f2937', borderRadius: '8px',
          color: '#6b7280', cursor: 'pointer', width: '32px', height: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fira Code, monospace', fontSize: '16px',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.color = '#f9fafb' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.color = '#6b7280' }}>
          ×
        </button>

        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623', marginBottom: '6px' }}>รายละเอียดรายการโอนเงิน</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '22px', fontWeight: 700, color: '#f9fafb', margin: 0, letterSpacing: '-0.02em' }}>#{tx.rentalCode}</h2>
            <StatusBadge status={localStatus} />
          </div>
        </div>

        <Section label="ลูกค้า">
          <Row label="ชื่อ">{c ? `${c.firstName} ${c.lastName}` : '-'}</Row>
          <Row label="อีเมล">{c?.email ?? '-'}</Row>
          <Row label="โทรศัพท์">{c?.phone ?? '-'}</Row>
        </Section>

        <Section label="รถยนต์">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            {img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={v ? `${v.brand} ${v.model}` : ''} style={{
                width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px',
                border: '1px solid #1f2937', flexShrink: 0,
              }} />
            )}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Row label="รุ่น">{v ? `${v.brand} ${v.model} (${v.year})` : '-'}</Row>
              <Row label="ทะเบียน">{v?.licensePlate ?? '-'}</Row>
              <Row label="สี">{v?.color ?? '-'}</Row>
            </div>
          </div>
        </Section>

        <Section label="ข้อมูลการจอง">
          <Row label="วันรับ">{formatDate(tx.startDate)}</Row>
          <Row label="วันคืน">{formatDate(tx.endDate)}</Row>
          <Row label="ยอดรวม"><span style={{ color: '#F5A623', fontWeight: 700 }}>฿{tx.totalPrice?.toLocaleString() ?? 0}</span></Row>
          <Row label="มัดจำ">฿{tx.deposit?.toLocaleString() ?? 0}</Row>
        </Section>

        <Section label="หลักฐานการโอน">
          {/* Deposit slip */}
          <div style={{
            padding: '16px', background: '#080c12', borderRadius: '10px',
            border: '1px solid #1f2937', marginBottom: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, color: '#fbbf24' }}>มัดจำ (30%)</div>
                <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                  ฿{tx.deposit?.toLocaleString() ?? 0}
                  {tx.depositPaidAt && ` · ${formatDateTime(tx.depositPaidAt)}`}
                </div>
              </div>
              {tx.depositProofUrl ? (
                <span style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(52,211,153,0.12)', color: '#34d399', fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600 }}>
                  แนบสลิปแล้ว
                </span>
              ) : (
                <span style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(248,113,113,0.12)', color: '#f87171', fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600 }}>
                  ยังไม่แนบสลิป
                </span>
              )}
            </div>
            {tx.depositProofUrl && (
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #1f2937' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tx.depositProofUrl} alt="สลิปมัดจำ" style={{ width: '100%', maxHeight: '320px', objectFit: 'contain', background: '#000' }} />
              </div>
            )}
            {tx.depositProofUrl && (
              <a href={tx.depositProofUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px',
                fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', color: '#60a5fa',
                textDecoration: 'none',
              }}>
                <ExternalLink size={12} /> เปิดในแท็บใหม่
              </a>
            )}
          </div>

          {/* Full payment slip */}
          <div style={{
            padding: '16px', background: '#080c12', borderRadius: '10px',
            border: '1px solid #1f2937',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, color: '#34d399' }}>เต็มจำนวน</div>
                <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                  ฿{tx.totalPrice?.toLocaleString() ?? 0}
                  {tx.fullPaymentPaidAt && ` · ${formatDateTime(tx.fullPaymentPaidAt)}`}
                </div>
              </div>
              {tx.fullPaymentProofUrl ? (
                <span style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(52,211,153,0.12)', color: '#34d399', fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600 }}>
                  แนบสลิปแล้ว
                </span>
              ) : (
                <span style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(248,113,113,0.12)', color: '#f87171', fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600 }}>
                  ยังไม่แนบสลิป
                </span>
              )}
            </div>
            {tx.fullPaymentProofUrl && (
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #1f2937' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tx.fullPaymentProofUrl} alt="สลิปเต็มจำนวน" style={{ width: '100%', maxHeight: '320px', objectFit: 'contain', background: '#000' }} />
              </div>
            )}
            {tx.fullPaymentProofUrl && (
              <a href={tx.fullPaymentProofUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '8px',
                fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', color: '#60a5fa',
                textDecoration: 'none',
              }}>
                <ExternalLink size={12} /> เปิดในแท็บใหม่
              </a>
            )}
          </div>
        </Section>

        {/* Verify actions */}
        <Section label="ยืนยันสถานะการชำระเงิน">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              { value: 'deposit_paid', label: 'ยืนยันมัดจำ', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
              { value: 'fully_paid', label: 'ยืนยันชำระเต็มจำนวน', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
              { value: 'unpaid', label: 'ยกเลิกการยืนยัน', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
            ].map(opt => {
              const isActive = opt.value === localStatus
              return (
                <button key={opt.value} disabled={updating || isActive} onClick={() => handleVerify(opt.value as 'unpaid' | 'deposit_paid' | 'fully_paid')} style={{
                  padding: '8px 16px', borderRadius: '999px', cursor: isActive ? 'default' : 'pointer',
                  border: `1px solid ${isActive ? opt.border : '#1f2937'}`,
                  background: isActive ? `rgba(${opt.value === 'deposit_paid' ? '251,191,36' : opt.value === 'fully_paid' ? '52,211,153' : '248,113,113'},0.1)` : 'transparent',
                  color: isActive ? opt.color : '#6b7280',
                  fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', fontWeight: 600,
                  transition: 'all 0.15s', opacity: updating ? 0.6 : 1,
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = opt.border; e.currentTarget.style.color = opt.color; e.currentTarget.style.background = `rgba(${opt.value === 'deposit_paid' ? '251,191,36' : opt.value === 'fully_paid' ? '52,211,153' : '248,113,113'},0.05)` } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = 'transparent' } }}>
                  {isActive && <span style={{ marginRight: '4px' }}>✓ </span>}
                  {opt.label}
                </button>
              )
            })}
          </div>
        </Section>
      </div>
    </div>
  )
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Transaction | null>(null)
  const [filterPayment, setFilterPayment] = useState('all')
  const [search, setSearch] = useState('')

  const fetchTransactions = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/transactions')
      const data = await res.json()
      setTransactions(Array.isArray(data) ? data : data.transactions ?? [])
    } catch { setTransactions([]) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchTransactions() }, [fetchTransactions])

  const handleVerify = async (id: string, paymentStatus: string) => {
    try {
      await fetch(`/api/admin/transactions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus }),
      })
      setTransactions(prev => prev.map(t => t._id === id ? { ...t, paymentStatus: paymentStatus as Transaction['paymentStatus'] } : t))
      if (selected?._id === id) setSelected(prev => prev ? { ...prev, paymentStatus: paymentStatus as Transaction['paymentStatus'] } : null)
    } catch {}
  }

  const filtered = transactions.filter(tx => {
    const matchPayment = filterPayment === 'all' || tx.paymentStatus === filterPayment
    const q = search.toLowerCase()
    const matchSearch = !q || (
      tx.rentalCode?.toLowerCase().includes(q) ||
      tx.vehicleId?.brand?.toLowerCase().includes(q) ||
      tx.vehicleId?.model?.toLowerCase().includes(q) ||
      tx.vehicleId?.licensePlate?.toLowerCase().includes(q) ||
      tx.customerId?.firstName?.toLowerCase().includes(q) ||
      tx.customerId?.lastName?.toLowerCase().includes(q) ||
      tx.customerId?.email?.toLowerCase().includes(q)
    )
    return matchPayment && matchSearch
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

  const PAYMENT_FILTERS = ['all', 'unpaid', 'deposit_paid', 'fully_paid']

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080c12' }}>
      <AdminSidebar />

      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623', marginBottom: '8px' }}>
            การเงิน
          </div>
          <h1 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '28px', fontWeight: 700, color: '#f9fafb', margin: 0, letterSpacing: '-0.02em' }}>
            รายการโอนเงิน
          </h1>
          <p style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#4b5563', marginTop: '6px' }}>
            {transactions.length} รายการ ทั้งหมด
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#4b5563', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="ค้นหารหัส, รถ, ลูกค้า..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                background: '#0d1117', border: '1px solid #1f2937', borderRadius: '8px',
                padding: '9px 14px 9px 34px', fontFamily: 'Fira Sans, sans-serif', fontSize: '13px',
                color: '#f9fafb', outline: 'none', width: '100%', boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)' }}
              onBlur={e => { e.currentTarget.style.borderColor = '#1f2937' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {PAYMENT_FILTERS.map(st => {
              const isActive = filterPayment === st
              const ps = st !== 'all' ? PAYMENT_STYLES[st] : null
              const label = st === 'all' ? 'ทั้งหมด' : (PAYMENT_LABELS[st] ?? st)
              return (
                <button key={st} onClick={() => setFilterPayment(st)} style={{
                  padding: '6px 12px', borderRadius: '999px', cursor: 'pointer',
                  border: `1px solid ${isActive && ps ? ps.border : isActive ? 'rgba(245,166,35,0.4)' : '#1f2937'}`,
                  background: isActive && ps ? ps.bg : isActive ? 'rgba(245,166,35,0.1)' : 'transparent',
                  color: isActive && ps ? ps.color : isActive ? '#F5A623' : '#6b7280',
                  fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.05em', transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.color = '#9ca3af' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.color = '#6b7280' } }}>
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '64px', textAlign: 'center', fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#4b5563', letterSpacing: '0.1em' }}>
              กำลังโหลด...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '64px', textAlign: 'center', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#4b5563' }}>
              ไม่พบรายการโอนเงิน
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#080c12' }}>
                    <th style={thStyle}>รหัสจอง</th>
                    <th style={thStyle}>ลูกค้า</th>
                    <th style={thStyle}>รถ</th>
                    <th style={thStyle}>ยอดรวม</th>
                    <th style={thStyle}>มัดจำ</th>
                    <th style={thStyle}>แนบสลิป</th>
                    <th style={thStyle}>สถานะชำระเงิน</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(tx => {
                    const hasDepositSlip = !!tx.depositProofUrl
                    const hasFullSlip = !!tx.fullPaymentProofUrl
                    const slipCount = [hasDepositSlip, hasFullSlip].filter(Boolean).length
                    return (
                      <tr key={tx._id} style={{ transition: 'background 0.1s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                        <td style={tdStyle}>
                          <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#F5A623', fontWeight: 600 }}>
                            #{tx.rentalCode}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <div style={{ color: '#f9fafb', fontWeight: 500 }}>
                            {tx.customerId ? `${tx.customerId.firstName} ${tx.customerId.lastName}` : '-'}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                            {tx.customerId?.email ?? ''}
                          </div>
                        </td>
                        <td style={tdStyle}>
                          {tx.vehicleId ? (
                            <div>
                              <div style={{ color: '#f9fafb', fontWeight: 500, fontSize: '13px' }}>
                                {tx.vehicleId.brand} {tx.vehicleId.model}
                              </div>
                              <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>
                                {tx.vehicleId.licensePlate || `${tx.vehicleId.year}`}
                              </div>
                            </div>
                          ) : <span style={{ color: '#4b5563' }}>—</span>}
                        </td>
                        <td style={{ ...tdStyle, fontFamily: 'Fira Code, monospace', fontSize: '13px', fontWeight: 700, color: '#f9fafb' }}>
                          ฿{tx.totalPrice?.toLocaleString() ?? 0}
                        </td>
                        <td style={{ ...tdStyle, fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#fbbf24' }}>
                          ฿{tx.deposit?.toLocaleString() ?? 0}
                        </td>
                        <td style={tdStyle}>
                          {slipCount === 0 ? (
                            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4b5563' }}>—</span>
                          ) : (
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {hasDepositSlip && (
                                <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600 }}>
                                  มัดจำ
                                </span>
                              )}
                              {hasFullSlip && (
                                <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(52,211,153,0.1)', color: '#34d399', fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600 }}>
                                  เต็ม
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td style={tdStyle}>
                          <StatusBadge status={tx.paymentStatus} />
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'right' }}>
                          <button onClick={() => setSelected(tx)} style={{
                            padding: '6px 14px', background: 'transparent',
                            border: '1px solid #1f2937', borderRadius: '8px',
                            cursor: 'pointer', fontFamily: 'Fira Sans, sans-serif',
                            fontSize: '12px', fontWeight: 500, color: '#9ca3af',
                            transition: 'all 0.15s', whiteSpace: 'nowrap',
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                          }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)'; e.currentTarget.style.color = '#F5A623' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.color = '#9ca3af' }}>
                            <Eye size={13} />
                            ตรวจสอบ
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {selected && (
        <TransactionModal
          tx={selected}
          onClose={() => setSelected(null)}
          onVerify={handleVerify}
        />
      )}
    </div>
  )
}
