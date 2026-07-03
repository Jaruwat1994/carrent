export default function AboutPage() {
  const stats = [
    { value: '500+', label: 'รถในฝูงบิน' },
    { value: '50K+', label: 'ลูกค้าที่ไว้วางใจ' },
    { value: '99%',  label: 'ความพึงพอใจ' },
    { value: '24/7', label: 'บริการตลอดเวลา' },
  ]

  const values = [
    { title: 'คุณภาพ', desc: 'รถทุกคันผ่านการตรวจสภาพและบำรุงรักษาตามมาตรฐานสูงสุด' },
    { title: 'ความปลอดภัย', desc: 'ประกันภัยครอบคลุม พร้อมระบบติดตามรถ GPS ทุกคัน' },
    { title: 'โปร่งใส', desc: 'ราคาชัดเจน ไม่มีค่าใช้จ่ายซ่อน ตรงไปตรงมาทุกรายการ' },
    { title: 'บริการ', desc: 'ทีมงานพร้อมช่วยเหลือ 24 ชั่วโมง ทุกวันไม่มีวันหยุด' },
  ]

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Hero */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>About Us</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '16px', maxWidth: '600px' }}>
            บริษัทเช่ารถที่เชื่อถือได้<br />
            <span style={{ color: 'var(--accent)' }}>มากว่า 10 ปี</span>
          </h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '560px' }}>
            CarRent มุ่งมั่นให้บริการเช่ารถที่มีคุณภาพ ปลอดภัย และราคาคุ้มค่า ด้วยทีมงานมืออาชีพ
            พร้อมให้บริการตลอด 24 ชั่วโมง เพื่อตอบสนองทุกความต้องการในการเดินทาง
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ paddingTop: '0', paddingBottom: '0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ padding: '40px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '40px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Our Mission</p>
              <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '20px' }}>พันธกิจของเรา</h2>
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
                CarRent มุ่งมั่นให้บริการเช่ารถที่มีคุณภาพ ปลอดภัย และราคาคุ้มค่า ด้วยทีมงานมืออาชีพ
                พร้อมให้บริการตลอด 24 ชั่วโมง เพื่อตอบสนองทุกความต้องการในการเดินทางของลูกค้า
              </p>
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                เราให้ความสำคัญกับความพึงพอใจของลูกค้าเป็นอันดับหนึ่ง
                ด้วยรถยนต์ที่ผ่านการตรวจสภาพและบำรุงรักษาอย่างสม่ำเสมอ
              </p>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-card)', padding: '48px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '64px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1 }}>10+</div>
              <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginTop: '12px' }}>ปีประสบการณ์</div>
              <div style={{ width: '40px', height: '2px', background: 'var(--accent)', margin: '16px auto', borderRadius: '2px' }} />
              <div style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>ให้บริการเช่ารถอย่างมีคุณภาพ<br />ทั่วประเทศไทย</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>Values</p>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>ค่านิยมองค์กร</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {values.map((v, i) => (
              <div key={v.title} className="card" style={{ padding: '28px 24px' }}>
                <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '12px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
