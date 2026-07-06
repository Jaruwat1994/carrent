'use client'

import { useState, useEffect } from 'react'
import { Car, CalendarDays, Users, TrendingUp } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

interface Stats { vehicles: number; bookings: number; customers: number; revenue: number }

const StatCard = ({
  label, value, sub, icon: Icon,
}: {
  label: string; value: string | number; sub?: string; icon: React.ComponentType<{ size?: number; color?: string }>
}) => (
  <div style={{
    background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px',
    transition: 'border-color 0.2s', cursor: 'default',
  }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(245,166,35,0.3)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1f2937')}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
      <Icon size={16} color="#4b5563" />
      <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4b5563' }}>{label}</div>
    </div>
    <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '32px', fontWeight: 700, color: '#f9fafb', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>{sub}</div>}
  </div>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(d => { setStats(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080c12' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623', marginBottom: '8px' }}>แดชบอร์ด</div>
          <h1 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '28px', fontWeight: 700, color: '#f9fafb', margin: 0, letterSpacing: '-0.02em' }}>ภาพรวม</h1>
          <p style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#4b5563', marginTop: '6px' }}>ข้อมูลธุรกิจแบบเรียลไทม์</p>
        </div>

        {/* Stats */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px', height: '100px', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            <StatCard icon={Car} label="ยานพาหนะทั้งหมด" value={stats?.vehicles ?? 0} sub="ในกองยาน" />
            <StatCard icon={CalendarDays} label="การจองทั้งหมด" value={stats?.bookings ?? 0} sub="ตลอดเวลา" />
            <StatCard icon={Users} label="ลูกค้า" value={stats?.customers ?? 0} sub="ลงทะเบียนแล้ว" />
            <StatCard icon={TrendingUp} label="รายได้" value={stats?.revenue ? `฿${stats.revenue.toLocaleString()}` : '฿0'} sub="การจองที่ยืนยันแล้ว" />
          </div>
        )}

        {/* Quick links */}
        <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4b5563', marginBottom: '16px' }}>การดำเนินการด่วน</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {[
            { href: '/admin/vehicles', title: 'จัดการยานพาหนะ', desc: 'แก้ไขสถานะกองยานและราคา', Icon: Car },
            { href: '/admin/bookings', title: 'จัดการการจอง', desc: 'อนุมัติและอัปเดตสถานะการเช่า', Icon: CalendarDays },
            { href: '/admin/customers', title: 'จัดการลูกค้า', desc: 'ดูบัญชีลูกค้าและสถานะ', Icon: Users },
          ].map(item => (
            <a key={item.href} href={item.href} style={{
              display: 'block', textDecoration: 'none', background: '#0d1117',
              border: '1px solid #1f2937', borderRadius: '12px', padding: '20px 24px', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.background = '#111827' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.background = '#0d1117' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <item.Icon size={16} color="#F5A623" />
                <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: '#f9fafb' }}>{item.title}</div>
              </div>
              <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#4b5563', marginBottom: '16px' }}>{item.desc}</div>
              <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#F5A623', letterSpacing: '0.05em' }}>ไป →</div>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}
