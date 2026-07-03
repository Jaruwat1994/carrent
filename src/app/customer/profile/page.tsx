'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Profile {
  firstName: string
  lastName: string
  email: string
  phone: string
  idCardNumber: string
  drivingLicenseNumber: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
}

export default function CustomerProfilePage() {
  const { status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/customers/profile')
      .then((r) => r.json())
      .then((d) => { setProfile(d.customer); setLoading(false) })
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    const res = await fetch('/api/customers/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
    setSaving(false)
    setMsg(res.ok ? 'บันทึกข้อมูลสำเร็จ' : 'เกิดข้อผิดพลาด')
  }

  if (status === 'loading' || loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-muted)' }}>กำลังโหลด...</span>
    </div>
  )
  if (!profile) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Sarabun, sans-serif', color: 'var(--text-secondary)' }}>ไม่พบข้อมูล</span>
    </div>
  )

  const Field = ({ label, fieldKey, type = 'text', placeholder, disabled = false }: {
    label: string; fieldKey: keyof Profile; type?: string; placeholder?: string; disabled?: boolean
  }) => (
    <div>
      <label className="field-label">{label}</label>
      <input
        type={type}
        value={profile[fieldKey] ?? ''}
        onChange={(e) => !disabled && setProfile({ ...profile, [fieldKey]: e.target.value })}
        disabled={disabled}
        placeholder={placeholder}
        className="input-field"
        style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'text' }}
      />
    </div>
  )

  return (
    <div style={{ minHeight: '80vh', paddingTop: '48px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Account</p>
            <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>ข้อมูลส่วนตัว</h1>
          </div>
          <Link href="/customer/dashboard" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
            ← แดชบอร์ด
          </Link>
        </div>

        {msg && (
          <div style={{
            padding: '12px 16px', borderRadius: '10px', marginBottom: '24px',
            background: msg.includes('สำเร็จ') ? 'rgba(110,224,138,0.1)' : 'rgba(248,113,113,0.1)',
            border: `1px solid ${msg.includes('สำเร็จ') ? 'rgba(110,224,138,0.2)' : 'rgba(248,113,113,0.2)'}`,
          }}>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: msg.includes('สำเร็จ') ? '#6EE08A' : '#F87171' }}>{msg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Personal info */}
          <div>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>ข้อมูลส่วนตัว</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Field label="ชื่อ" fieldKey="firstName" />
                <Field label="นามสกุล" fieldKey="lastName" />
              </div>
              <Field label="อีเมล" fieldKey="email" type="email" disabled />
              <Field label="เบอร์โทรศัพท์" fieldKey="phone" type="tel" placeholder="08X-XXX-XXXX" />
            </div>
          </div>

          {/* Documents */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>เอกสาร</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="เลขบัตรประชาชน" fieldKey="idCardNumber" disabled />
              <Field label="เลขใบขับขี่" fieldKey="drivingLicenseNumber" disabled />
            </div>
          </div>

          {/* Address */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>ที่อยู่</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Field label="ที่อยู่" fieldKey="address" placeholder="บ้านเลขที่ ถนน ซอย" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '12px' }}>
                <Field label="เมือง/อำเภอ" fieldKey="city" placeholder="กรุงเทพมหานคร" />
                <Field label="จังหวัด" fieldKey="province" placeholder="กรุงเทพมหานคร" />
                <Field label="รหัสไปรษณีย์" fieldKey="postalCode" placeholder="10200" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ justifyContent: 'center', padding: '14px', marginTop: '8px', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
          </button>
        </form>
      </div>
    </div>
  )
}
