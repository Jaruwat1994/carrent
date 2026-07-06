'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (result?.error) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    } else {
      const callbackUrl = searchParams.get('callbackUrl')
      router.push(callbackUrl || '/customer/dashboard')
    }
  }

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative' }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(245,166,35,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: '24px', color: 'var(--accent)', letterSpacing: '-0.03em' }}>CAR</span>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 300, fontSize: '24px', color: 'var(--text-primary)', letterSpacing: '0.08em' }}>RENT</span>
          </Link>
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '8px' }}>Member Access</p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '40px 36px' }}>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '6px' }}>เข้าสู่ระบบ</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>ยินดีต้อนรับกลับมา</p>

          {registered && (
            <div style={{ background: 'rgba(110,224,138,0.1)', border: '1px solid rgba(110,224,138,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: '#6EE08A' }}>สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ</p>
            </div>
          )}

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: '#F87171' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="field-label">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="field-label">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          <div style={{ borderTop: '1px solid var(--border)', marginTop: '28px', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-muted)' }}>
              ยังไม่มีบัญชี?{' '}
              <Link href="/register" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>สมัครสมาชิกฟรี</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '90vh' }} />}>
      <LoginForm />
    </Suspense>
  )
}
