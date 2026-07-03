const sections = [
  { title: '1. ข้อมูลที่เก็บรวบรวม', body: 'เราเก็บข้อมูลส่วนบุคคลที่จำเป็น เช่น ชื่อ อีเมล เบอร์โทร เลขบัตรประชาชน และเลขใบขับขี่ เพื่อการให้บริการเช่ารถ' },
  { title: '2. วัตถุประสงค์การใช้ข้อมูล', body: 'ข้อมูลของท่านถูกใช้เพื่อการยืนยันตัวตน การจัดการการจอง และการติดต่อสื่อสารที่เกี่ยวข้องกับบริการเท่านั้น' },
  { title: '3. การรักษาความปลอดภัย', body: 'เราใช้การเข้ารหัสข้อมูลและมาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของท่าน' },
  { title: '4. การเปิดเผยข้อมูล', body: 'เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สาม ยกเว้นตามที่กฎหมายกำหนดหรือได้รับความยินยอมจากท่าน' },
  { title: '5. สิทธิของเจ้าของข้อมูล', body: 'ท่านมีสิทธิ์ขอดู แก้ไข หรือลบข้อมูลส่วนบุคคลของท่านได้ตลอดเวลา โดยติดต่อผ่านช่องทางที่ระบุในหน้าติดต่อเรา' },
  { title: '6. การเปลี่ยนแปลงนโยบาย', body: 'เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงนโยบายนี้ การเปลี่ยนแปลงจะแจ้งให้ทราบผ่านเว็บไซต์' },
]

export default function PrivacyPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <section style={{ paddingTop: '64px', paddingBottom: '48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Legal</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '10px' }}>นโยบายความเป็นส่วนตัว</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-muted)' }}>อัปเดตล่าสุด: 1 กรกฎาคม 2026</p>
        </div>
      </section>

      <section style={{ paddingTop: '48px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sections.map((s, i) => (
              <div key={s.title} style={{ padding: '28px 0', borderBottom: i < sections.length - 1 ? '1px solid var(--border)' : 'none', display: 'grid', gridTemplateColumns: '40px 1fr', gap: '20px' }}>
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--accent)', paddingTop: '3px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{s.title}</h2>
                  <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
