export default function ContactPage() {
  const info = [
    { num: '01', title: 'โทรศัพท์', detail: '02-xxx-xxxx', sub: 'จันทร์-ศุกร์ 08:00-18:00' },
    { num: '02', title: 'อีเมล', detail: 'info@carrent.th', sub: 'ตอบกลับภายใน 24 ชม.' },
    { num: '03', title: 'ที่อยู่', detail: 'กรุงเทพมหานคร', sub: 'สำนักงานใหญ่' },
  ]

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Contact</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '16px' }}>ติดต่อเรา</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '480px' }}>
            มีคำถามหรือต้องการความช่วยเหลือ? ทีมงานพร้อมให้บริการ
          </p>
        </div>
      </section>

      <section style={{ paddingTop: '64px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '40px', alignItems: 'start' }}>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {info.map((c) => (
                <div key={c.title} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '24px 28px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--accent)', paddingTop: '2px' }}>{c.num}</span>
                  <div>
                    <h3 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{c.title}</h3>
                    <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--accent)', marginBottom: '2px' }}>{c.detail}</p>
                    <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', padding: '40px 36px' }}>
              <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '28px', letterSpacing: '-0.02em' }}>ส่งข้อความหาเรา</h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="field-label">ชื่อ-นามสกุล</label>
                    <input type="text" className="input-field" placeholder="สมชาย ใจดี" />
                  </div>
                  <div>
                    <label className="field-label">อีเมล</label>
                    <input type="email" className="input-field" placeholder="example@email.com" />
                  </div>
                </div>
                <div>
                  <label className="field-label">หัวข้อ</label>
                  <input type="text" className="input-field" placeholder="เรื่องที่ต้องการติดต่อ" />
                </div>
                <div>
                  <label className="field-label">ข้อความ</label>
                  <textarea
                    rows={5}
                    className="input-field"
                    placeholder="รายละเอียด..."
                    style={{ resize: 'none', height: 'auto' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
                  ส่งข้อความ
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
