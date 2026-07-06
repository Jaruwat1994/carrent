'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(data.error || 'Authentication failed')
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', background: '#080c12',
      fontFamily: 'Fira Sans, sans-serif',
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px', maxWidth: '480px',
      }}>
        <div style={{ width: '100%' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
            <div style={{
              width: '36px', height: '36px', background: '#F5A623', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Fira Code, monospace', fontSize: '16px', fontWeight: 700, color: '#000',
            }}>C</div>
            <div>
              <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '16px', fontWeight: 700, color: '#f9fafb' }}>Carallcar</div>
              <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '9px', color: '#F5A623', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin Console</div>
            </div>
          </div>

          <h1 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '26px', fontWeight: 700, color: '#f9fafb', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            เข้าสู่ระบบ
          </h1>
          <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '32px' }}>
            เข้าถึงแดชบอร์ดผู้ดูแลระบบ
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#6b7280', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'Fira Code, monospace' }}>
                อีเมล
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@carallcar.com"
                style={{
                  width: '100%', padding: '12px 14px', background: '#0d1117',
                  border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : '#1f2937'}`,
                  borderRadius: '8px', color: '#f9fafb',
                  fontFamily: 'Fira Sans, sans-serif', fontSize: '14px',
                  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(245,166,35,0.4)')}
                onBlur={e => (e.target.style.borderColor = error ? 'rgba(239,68,68,0.4)' : '#1f2937')}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#6b7280', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'Fira Code, monospace' }}>
                รหัสผ่าน
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '12px 14px', background: '#0d1117',
                  border: `1px solid ${error ? 'rgba(239,68,68,0.4)' : '#1f2937'}`,
                  borderRadius: '8px', color: '#f9fafb',
                  fontFamily: 'Fira Sans, sans-serif', fontSize: '14px',
                  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(245,166,35,0.4)')}
                onBlur={e => (e.target.style.borderColor = error ? 'rgba(239,68,68,0.4)' : '#1f2937')}
              />
            </div>

            {error && (
              <div style={{
                marginBottom: '20px', padding: '10px 14px',
                background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '8px',
              }}>
                <p style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#f87171', margin: 0 }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px', background: loading ? '#92400e' : '#F5A623',
                border: 'none', borderRadius: '8px', color: '#000',
                fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.15s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#f59e0b' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#F5A623' }}
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>
        </div>
      </div>

      {/* Right panel — decorative */}
      <div style={{
        flex: 1, background: '#0d1117', borderLeft: '1px solid #1f2937',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(245,166,35,0.06) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(245,166,35,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '320px' }}>
          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '48px', color: '#F5A623', marginBottom: '24px', lineHeight: 1 }}>◈</div>
          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4b5563', marginBottom: '16px' }}>
            ศูนย์ปฏิบัติการ
          </div>
          <p style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#374151', lineHeight: 1.6 }}>
            จัดการฝูงรถ การจอง และลูกค้าได้จากที่เดียว
          </p>
        </div>
      </div>
    </div>
  )
}
