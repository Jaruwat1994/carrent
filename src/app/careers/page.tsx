'use client'

import Link from 'next/link'

const jobs = [
  { title: 'พนักงานดูแลลูกค้า (Customer Service)', type: 'Full-time', location: 'กรุงเทพฯ' },
  { title: 'พนักงานตรวจสภาพรถ', type: 'Full-time', location: 'กรุงเทพฯ / เชียงใหม่' },
  { title: 'นักพัฒนาซอฟต์แวร์ (Full Stack)', type: 'Full-time', location: 'Remote' },
  { title: 'พนักงานการตลาดออนไลน์', type: 'Full-time', location: 'กรุงเทพฯ' },
]

export default function CareersPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Careers</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '16px' }}>ร่วมงานกับเรา</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '17px', color: 'var(--text-secondary)' }}>มาเป็นส่วนหนึ่งของทีม CarRent ที่กำลังเติบโต</p>
        </div>
      </section>

      <section style={{ paddingTop: '64px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            {jobs.map((j, i) => (
              <div key={j.title} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-card)',
                padding: '24px 28px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flex: 1 }}>
                  <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--accent)', paddingTop: '2px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{j.title}</h2>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>{j.type}</span>
                      <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>{j.location}</span>
                    </div>
                  </div>
                </div>
                <Link href="/contact" className="btn-outline" style={{ padding: '8px 20px', fontSize: '13px', whiteSpace: 'nowrap' }}>
                  สมัครงาน
                </Link>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-card)', padding: '48px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Open Application</p>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', letterSpacing: '-0.02em' }}>ไม่เห็นตำแหน่งที่ใช่?</h2>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '28px' }}>ส่ง resume มาได้เลย เราติดต่อกลับเมื่อมีตำแหน่งที่เหมาะสม</p>
            <Link href="/contact" className="btn-primary">ติดต่อฝ่าย HR</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
