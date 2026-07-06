'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Upload, CheckCircle } from 'lucide-react'

interface Rental {
  _id: string
  rentalCode: string
  startDate: string
  endDate: string
  totalPrice: number
  deposit: number
  status: string
  paymentStatus: string
  vehicleId: { brand: string; model: string; year: number; color: string; images: string[] }
}

interface PaymentMethod {
  _id: string
  type: 'bank_transfer' | 'promptpay'
  bankName?: string
  accountNumber: string
  accountName: string
  qrCodeUrl?: string
}

export default function CheckoutPage() {
  const { id } = useParams()
  const router = useRouter()
  const [rental, setRental] = useState<Rental | null>(null)
  const [payments, setPayments] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [type, setType] = useState<'deposit' | 'full'>('deposit')

  useEffect(() => {
    if (!id) return
    Promise.all([
      fetch(`/api/bookings/${id}`).then((r) => r.json()),
      fetch('/api/payments').then((r) => r.json()),
    ]).then(([bookingData, paymentData]) => {
      setRental(bookingData.rental)
      setPayments(paymentData.methods || [])
      setLoading(false)
    })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !rental) return
    setUploading(true)
    const form = new FormData()
    form.append('slip', file)
    form.append('type', type)
    const r = await fetch(`/api/bookings/${rental._id}/pay`, { method: 'POST', body: form })
    setUploading(false)
    if (r.ok) {
      router.push('/customer/dashboard')
    } else {
      const err = await r.json()
      alert(err.error || 'เกิดข้อผิดพลาด')
    }
  }

  const fmt = (d: string) => new Date(d).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-muted)' }}>กำลังโหลด...</span>
    </div>
  )
  if (!rental) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-secondary)' }}>ไม่พบการจอง</span>
    </div>
  )
  if (rental.status !== 'confirmed') return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <span style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-secondary)' }}>การจองยังไม่ได้รับการยืนยัน</span>
      <Link href="/customer/dashboard" className="btn-primary" style={{ padding: '10px 20px' }}>กลับไปแดชบอร์ด</Link>
    </div>
  )

  const isDepositPaid = rental.paymentStatus === 'deposit_paid' || rental.paymentStatus === 'fully_paid'
  const isFullyPaid = rental.paymentStatus === 'fully_paid'

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        <Link href="/customer/dashboard"
          style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '32px' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
          <ChevronLeft size={15} strokeWidth={2} />กลับไปแดชบอร์ด
        </Link>

        <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '8px' }}>ชำระเงิน</h1>
        <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '32px' }}>อัปโหลดสลิปการโอนเงินเพื่อยืนยันการชำระเงิน</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }}>
          {/* Left: payment form */}
          <div>
            {/* Payment type selector */}
            {!isFullyPaid && (
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px', marginBottom: '24px' }}>
                <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>เลือกประเภทการชำระ</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { key: 'deposit' as const, label: 'มัดจำ', amount: rental.deposit, disabled: isDepositPaid },
                    { key: 'full' as const, label: 'เต็มจำนวน', amount: rental.totalPrice, disabled: isFullyPaid },
                  ].map((opt) => (
                    <button key={opt.key} type="button"
                      disabled={opt.disabled}
                      onClick={() => setType(opt.key)}
                      style={{
                        padding: '16px', borderRadius: '10px', cursor: opt.disabled ? 'not-allowed' : 'pointer', textAlign: 'left',
                        border: type === opt.key ? '1px solid var(--accent)' : '1px solid var(--border)',
                        background: type === opt.key ? 'var(--accent-muted)' : 'var(--bg-elevated)',
                        opacity: opt.disabled ? 0.4 : 1, transition: 'all 0.2s',
                      }}>
                      {opt.disabled && <CheckCircle size={14} color="#6EE08A" style={{ marginBottom: '6px' }} />}
                      <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>{opt.label}</p>
                      <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', fontWeight: 900, color: type === opt.key ? 'var(--accent)' : 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                        ฿{opt.amount.toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Payment methods */}
            {payments.length > 0 && (
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-card)', padding: '24px', marginBottom: '24px' }}>
                <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>โอนเงินไปยัง</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {payments.map((pm) => (
                    <div key={pm._id} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '14px', background: 'var(--bg-elevated)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                      {pm.qrCodeUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={pm.qrCodeUrl} alt="QR" style={{ width: '72px', height: '72px', objectFit: 'contain', borderRadius: '6px', background: '#fff', padding: '4px', flexShrink: 0 }} />
                      )}
                      <div>
                        <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>
                          {pm.type === 'bank_transfer' ? (pm.bankName || 'โอนธนาคาร') : 'PromptPay'}
                        </p>
                        <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '17px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.03em', marginBottom: '2px' }}>{pm.accountNumber}</p>
                        <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>{pm.accountName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload slip */}
            {!isFullyPaid && (
              <form onSubmit={handleSubmit}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px', marginBottom: '16px' }}>
                  <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>แนบสลิปการโอนเงิน</p>
                  <label style={{ display: 'block', border: `2px dashed ${file ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '10px', padding: '32px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s', background: file ? 'var(--accent-muted)' : 'transparent' }}>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                    <Upload size={28} style={{ margin: '0 auto 10px', color: file ? 'var(--accent)' : 'var(--text-muted)' }} />
                    <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: file ? 'var(--accent)' : 'var(--text-secondary)', fontWeight: file ? 600 : 400 }}>
                      {file ? file.name : 'คลิกเพื่อเลือกรูปสลิป'}
                    </p>
                    {!file && <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>PNG, JPG สูงสุด 10MB</p>}
                  </label>
                </div>
                <button type="submit" disabled={!file || uploading} className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '15px', opacity: !file || uploading ? 0.6 : 1 }}>
                  {uploading ? 'กำลังอัปโหลด...' : `ยืนยันการชำระ${type === 'deposit' ? 'มัดจำ' : 'เต็มจำนวน'} ฿${(type === 'deposit' ? rental.deposit : rental.totalPrice).toLocaleString()}`}
                </button>
              </form>
            )}

            {isFullyPaid && (
              <div style={{ background: 'rgba(110,224,138,0.08)', border: '1px solid rgba(110,224,138,0.25)', borderRadius: 'var(--radius-card)', padding: '24px', textAlign: 'center' }}>
                <CheckCircle size={36} color="#6EE08A" style={{ margin: '0 auto 12px' }} />
                <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px', fontWeight: 700, color: '#6EE08A', marginBottom: '4px' }}>ชำระเงินครบแล้ว</p>
                <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>รอเจ้าหน้าที่ยืนยันและติดต่อกลับ</p>
              </div>
            )}
          </div>

          {/* Right: booking summary */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>สรุปการจอง</p>
            {rental.vehicleId?.images?.[0] && (
              <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '14px', aspectRatio: '16/9', background: 'var(--bg-elevated)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={rental.vehicleId.images[0]} alt={rental.vehicleId.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
              {rental.vehicleId?.brand} {rental.vehicleId?.model}
            </p>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              {rental.vehicleId?.year} · {rental.vehicleId?.color}
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
              {[
                { label: 'วันรับรถ', value: fmt(rental.startDate) },
                { label: 'วันคืนรถ', value: fmt(rental.endDate) },
                { label: 'รหัสจอง', value: rental.rentalCode },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px', marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>มัดจำ (30%)</span>
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 700, color: isDepositPaid ? '#6EE08A' : 'var(--text-primary)' }}>
                  {isDepositPaid ? '✓ ' : ''}฿{rental.deposit.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>รวมทั้งหมด</span>
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', fontWeight: 900, color: 'var(--accent)' }}>฿{rental.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
