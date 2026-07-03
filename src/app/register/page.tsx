'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Field({
  label, name, type = 'text', placeholder, value, onChange,
}: {
  label: string; name: string; type?: string; placeholder?: string
  value: string; onChange: (name: string, value: string) => void
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        required
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '',
    idCardNumber: '', drivingLicenseNumber: '', drivingLicenseExpiry: '',
  })

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน')
      return
    }
    setLoading(true)
    const res = await fetch('/api/customers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'เกิดข้อผิดพลาด'); return }
    router.push('/login?registered=1')
  }

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 30%, rgba(245,166,35,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '520px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: '24px', color: 'var(--accent)', letterSpacing: '-0.03em' }}>CAR</span>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 300, fontSize: '24px', color: 'var(--text-primary)', letterSpacing: '0.08em' }}>RENT</span>
          </Link>
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '8px' }}>New Account</p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '40px 36px' }}>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '6px' }}>สมัครสมาชิก</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>กรอกข้อมูลเพื่อสร้างบัญชีใหม่</p>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: '#F87171' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="ชื่อ" name="firstName" placeholder="สมชาย" value={form.firstName} onChange={update} />
              <Field label="นามสกุล" name="lastName" placeholder="ใจดี" value={form.lastName} onChange={update} />
            </div>
            <Field label="อีเมล" name="email" type="email" placeholder="example@email.com" value={form.email} onChange={update} />
            <Field label="เบอร์โทรศัพท์" name="phone" type="tel" placeholder="08X-XXX-XXXX" value={form.phone} onChange={update} />

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>ข้อมูลเอกสาร</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Field label="เลขบัตรประชาชน" name="idCardNumber" placeholder="X-XXXX-XXXXX-XX-X" value={form.idCardNumber} onChange={update} />
                <Field label="เลขใบขับขี่" name="drivingLicenseNumber" placeholder="XXXXXXXXXXXXXXX" value={form.drivingLicenseNumber} onChange={update} />
                <Field label="วันหมดอายุใบขับขี่" name="drivingLicenseExpiry" type="date" value={form.drivingLicenseExpiry} onChange={update} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>รหัสผ่าน</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Field label="รหัสผ่าน" name="password" type="password" placeholder="อย่างน้อย 8 ตัวอักษร" value={form.password} onChange={update} />
                <Field label="ยืนยันรหัสผ่าน" name="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={update} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '8px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
            </button>
          </form>

          <div style={{ borderTop: '1px solid var(--border)', marginTop: '28px', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-muted)' }}>
              มีบัญชีอยู่แล้ว?{' '}
              <Link href="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>เข้าสู่ระบบ</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
