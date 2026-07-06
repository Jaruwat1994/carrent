'use client'

const articles = [
  { num: '01', title: 'Carallcar เปิดตัวบริการเช่ารถไฟฟ้า EV', date: '1 กรกฎาคม 2026', excerpt: 'Carallcar ขยายฝูงบินด้วยรถยนต์ไฟฟ้ารุ่นใหม่ล่าสุด ตอบรับกระแสรักษ์โลก' },
  { num: '02', title: 'โปรโมชั่นพิเศษเดือนกรกฎาคม ลดสูงสุด 20%', date: '28 มิถุนายน 2026', excerpt: 'รับส่วนลดพิเศษเมื่อจองรถผ่านแอปออนไลน์ในเดือนกรกฎาคมนี้' },
  { num: '03', title: 'Carallcar ขยายสาขาใหม่ภาคเหนือ', date: '20 มิถุนายน 2026', excerpt: 'เปิดสาขาใหม่ที่เชียงใหม่และเชียงราย เพื่อรองรับนักท่องเที่ยวภาคเหนือ' },
]

export default function NewsPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>News</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '16px' }}>ข่าวสาร</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '17px', color: 'var(--text-secondary)' }}>ข่าวสารและกิจกรรมล่าสุดจาก Carallcar</p>
        </div>
      </section>

      <section style={{ paddingTop: '64px' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {articles.map((a, i) => (
              <div key={a.title} style={{
                padding: '32px 0',
                borderBottom: i < articles.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'grid', gridTemplateColumns: '48px 1fr', gap: '24px', alignItems: 'start',
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--accent)', paddingTop: '4px' }}>{a.num}</span>
                <div>
                  <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '8px' }}>{a.date}</p>
                  <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', letterSpacing: '-0.01em' }}>{a.title}</h2>
                  <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{a.excerpt}</p>
                  <span style={{ display: 'inline-block', marginTop: '12px', fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--accent)', cursor: 'pointer' }}>อ่านต่อ →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
