import Link from 'next/link'

const promos = [
  { num: '01', title: 'เช่า 7 วัน ฟรี 1 วัน', desc: 'เช่ารถ 7 วัน ลดทันที 1 วัน สำหรับรถทุกรุ่น', badge: 'ยอดนิยม' },
  { num: '02', title: 'ลูกค้าใหม่ ลด 15%', desc: 'สมัครสมาชิกใหม่รับส่วนลดทันที 15% สำหรับการจองครั้งแรก', badge: 'ใหม่' },
  { num: '03', title: 'เช่ารายเดือน ราคาพิเศษ', desc: 'เช่าระยะยาว 1 เดือนขึ้นไป รับราคาพิเศษสุดคุ้ม', badge: 'ดีลพิเศษ' },
  { num: '04', title: 'แพ็กเกจครอบครัว', desc: 'รถ 7 ที่นั่งขึ้นไป เหมาะสำหรับท่องเที่ยวกับครอบครัว', badge: 'ครอบครัว' },
]

export default function PromotionsPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Promotions</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '16px' }}>โปรโมชั่น</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '17px', color: 'var(--text-secondary)' }}>ข้อเสนอพิเศษสำหรับลูกค้าของเรา</p>
        </div>
      </section>

      {/* Promos */}
      <section style={{ paddingTop: '64px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '48px' }}>
            {promos.map((p) => (
              <div key={p.title} className="card" style={{ padding: '32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--accent)' }}>{p.num}</span>
                  <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', padding: '4px 10px', border: '1px solid var(--border-accent)', borderRadius: '20px', background: 'var(--accent-muted)' }}>{p.badge}</span>
                </div>
                <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', letterSpacing: '-0.01em' }}>{p.title}</h2>
                <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>{p.desc}</p>
                <Link href="/vehicles" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>
                  ดูรถที่ร่วมรายการ →
                </Link>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-card)', padding: '48px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Stay Updated</p>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', letterSpacing: '-0.02em' }}>รับข่าวสารโปรโมชั่นก่อนใคร</h2>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '28px' }}>สมัครสมาชิกเพื่อรับส่วนลดพิเศษและข่าวสารล่าสุด</p>
            <Link href="/register" className="btn-primary">สมัครสมาชิกฟรี</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
