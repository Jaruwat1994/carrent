import Link from 'next/link'

const services = [
  {
    num: '01',
    title: 'เช่ารถระยะสั้น',
    desc: 'เหมาะสำหรับการเดินทางระยะสั้น ท่องเที่ยว หรือใช้งานชั่วคราว เริ่มต้นเพียงวันละ 800 บาท',
    features: ['เช่าขั้นต่ำ 1 วัน', 'ประกันภัยครอบคลุม', 'รับ-ส่งรถได้', 'ไม่มีค่าใช้จ่ายแอบแฝง'],
    href: '/vehicles',
    cta: 'ดูรถพร้อมเช่า',
    price: 'เริ่มต้น ฿800/วัน',
  },
  {
    num: '02',
    title: 'เช่ารถระยะยาว',
    desc: 'ประหยัดกว่าเช่าระยะสั้น เหมาะสำหรับการเดินทางธุรกิจหรือใช้งานต่อเนื่อง',
    features: ['เช่าตั้งแต่ 1 เดือนขึ้นไป', 'ราคาพิเศษ', 'ฟรีบำรุงรักษา', 'เปลี่ยนรถได้เมื่อต้องการ'],
    href: '/vehicles',
    cta: 'ดูแพ็กเกจระยะยาว',
    price: 'ราคาพิเศษ/เดือน',
  },
  {
    num: '03',
    title: 'เช่ารถพร้อมคนขับ',
    desc: 'บริการคนขับมืออาชีพ สะดวก ปลอดภัย ไม่ต้องกังวลเรื่องเส้นทาง',
    features: ['คนขับมืออาชีพ', 'รู้จักเส้นทางดี', 'บริการตลอด 24 ชม.', 'รับ-ส่งสนามบิน'],
    href: '/contact',
    cta: 'สอบถามราคา',
    price: 'สอบถามราคา',
  },
  {
    num: '04',
    title: 'บริการองค์กร',
    desc: 'แพ็กเกจพิเศษสำหรับองค์กรและบริษัท พร้อมใบกำกับภาษีและการจัดการฝูงรถ',
    features: ['ราคาพิเศษสำหรับองค์กร', 'ใบกำกับภาษี VAT', 'ระบบจัดการฝูงรถ', 'Account Manager'],
    href: '/contact',
    cta: 'ติดต่อทีมงาน',
    price: 'แพ็กเกจพิเศษ',
  },
]

export default function ServicesPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ paddingTop: '64px', paddingBottom: '64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Services</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '16px' }}>บริการของเรา</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '480px' }}>เลือกบริการที่เหมาะกับทุกการเดินทาง</p>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ paddingTop: '64px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {services.map((s) => (
              <div key={s.title} className="card" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.15em', color: 'var(--accent)' }}>{s.num}</span>
                  <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)', padding: '4px 12px', border: '1px solid var(--border)', borderRadius: '20px' }}>{s.price}</span>
                </div>
                <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', letterSpacing: '-0.01em' }}>{s.title}</h2>
                <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>{s.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
                      <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={s.href} className="btn-primary" style={{ justifyContent: 'center', padding: '12px 24px', fontSize: '13px' }}>{s.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
