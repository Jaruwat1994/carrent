const sections = [
  { title: '1. การยอมรับเงื่อนไข', body: 'การใช้บริการของ Carallcar ถือว่าท่านได้อ่านและยอมรับเงื่อนไขการใช้บริการฉบับนี้ทั้งหมด' },
  { title: '2. คุณสมบัติผู้เช่า', body: 'ผู้เช่าต้องมีอายุไม่ต่ำกว่า 21 ปี มีใบขับขี่ที่ยังไม่หมดอายุ และบัตรประชาชนที่ถูกต้อง' },
  { title: '3. การจองและชำระเงิน', body: 'การจองจะสมบูรณ์เมื่อได้รับการยืนยันจากเจ้าหน้าที่ ต้องชำระมัดจำ 30% ของราคารวมก่อนรับรถ' },
  { title: '4. นโยบายการยกเลิก', body: 'สามารถยกเลิกการจองได้ก่อนวันรับรถอย่างน้อย 48 ชั่วโมง หากยกเลิกน้อยกว่า 48 ชั่วโมง อาจมีค่าธรรมเนียม' },
  { title: '5. ความรับผิดชอบของผู้เช่า', body: 'ผู้เช่ารับผิดชอบต่อความเสียหายที่เกิดขึ้นระหว่างการเช่า รวมถึงการปฏิบัติตามกฎจราจรและกฎหมาย' },
  { title: '6. ประกันภัย', body: 'รถทุกคันมีประกันภัยชั้น 1 ครอบคลุมความเสียหายพื้นฐาน ลูกค้าสามารถซื้อความคุ้มครองเพิ่มเติมได้' },
]

export default function TermsPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <section style={{ paddingTop: '64px', paddingBottom: '48px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Legal</p>
          <h1 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '10px' }}>เงื่อนไขการใช้บริการ</h1>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-muted)' }}>อัปเดตล่าสุด: 1 กรกฎาคม 2026</p>
        </div>
      </section>

      <section style={{ paddingTop: '48px' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
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
