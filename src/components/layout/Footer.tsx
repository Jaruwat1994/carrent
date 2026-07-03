'use client'

import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', paddingTop: '64px', paddingBottom: '32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: '20px', color: 'var(--accent)', letterSpacing: '-0.03em' }}>CAR</span>
              <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 300, fontSize: '20px', color: 'var(--text-primary)', letterSpacing: '0.08em' }}>RENT</span>
            </Link>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '220px' }}>
              บริการเช่ารถที่เชื่อถือได้ ราคาคุ้มค่า พร้อมให้บริการทั่วประเทศ
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {['FB', 'IG', 'TW'].map((s) => (
                <div key={s} style={{
                  width: '36px', height: '36px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>บริการ</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['เช่ารถระยะสั้น', 'เช่ารถระยะยาว', 'เช่ารถพร้อมคนขับ', 'บริการองค์กร'].map((item) => (
                <li key={item}>
                  <Link href="/services" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>ข้อมูล</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'เกี่ยวกับเรา', href: '/about' },
                { label: 'ข่าวสาร', href: '/news' },
                { label: 'โปรโมชั่น', href: '/promotions' },
                { label: 'ร่วมงานกับเรา', href: '/careers' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>ติดต่อเรา</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>โทร: 02-xxx-xxxx</li>
              <li style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>อีเมล: info@carrent.th</li>
              <li>
                <Link href="/contact" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                  แบบฟอร์มติดต่อ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>
            © {year} CarRent. สงวนลิขสิทธิ์
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[{ label: 'เงื่อนไขการใช้บริการ', href: '/terms' }, { label: 'นโยบายความเป็นส่วนตัว', href: '/privacy' }].map((item) => (
              <Link key={item.href} href={item.href} style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
