import Link from 'next/link'
import { Clock, CalendarDays, User, Building2, Shield, Headphones, Star, Smartphone, MapPin, CheckCircle, ChevronRight } from 'lucide-react'
import { HeroCarousel } from '@/components/ui/HeroCarousel'

export default function HomePage() {
  const services = [
    { icon: Clock, title: 'เช่าระยะสั้น', desc: 'เช่ารายวัน เริ่มต้น 800 บาท/วัน', href: '/services' },
    { icon: CalendarDays, title: 'เช่าระยะยาว', desc: 'เช่ารายเดือน ราคาพิเศษ ประหยัดกว่า', href: '/services' },
    { icon: User, title: 'พร้อมคนขับ', desc: 'สะดวก ปลอดภัย มีคนขับบริการ', href: '/services' },
    { icon: Building2, title: 'บริการองค์กร', desc: 'แพ็กเกจพิเศษสำหรับองค์กร', href: '/services' },
  ]

  const stats = [
    { value: '500+', label: 'รถในฝูงบิน' },
    { value: '20K+', label: 'ลูกค้าพึงพอใจ' },
    { value: '24/7', label: 'ซัพพอร์ต' },
    { value: '15+', label: 'สาขาทั่วไทย' },
  ]

  const features = [
    { title: 'รถใหม่ทุกคัน', desc: 'ฟลีทรถใหม่ได้มาตรฐาน ตรวจสภาพก่อนทุกครั้ง' },
    { title: 'ราคาโปร่งใส', desc: 'ไม่มีค่าใช้จ่ายซ่อน ราคาตามที่ตกลง' },
    { title: 'ซัพพอร์ต 24 ชม.', desc: 'ทีมงานพร้อมช่วยเหลือตลอด 24 ชั่วโมง' },
    { title: 'ประกันครอบคลุม', desc: 'คุ้มครองครบทุกรูปแบบ อุ่นใจทุกเส้นทาง' },
    { title: 'จองง่ายออนไลน์', desc: 'ระบบจองออนไลน์ 24 ชม. ได้รับการยืนยันทันที' },
    { title: 'รับ-ส่งฟรี', desc: 'บริการรับ-ส่งรถถึงที่ในรัศมีที่กำหนด' },
  ]

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Gradient bg */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(245,166,35,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 10% 80%, rgba(245,166,35,0.05) 0%, transparent 60%)',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '80px', paddingBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            {/* Left — text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', borderRadius: '20px', marginBottom: '32px' }} className="animate-fade-in">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>Premium Car Rental Thailand</span>
              </div>

              <h1 className="animate-fade-up" style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontFamily: 'Raleway, sans-serif', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                ขับทุกเส้นทาง<br />
                <span style={{ color: 'var(--accent)' }}>ด้วยสไตล์</span>
                <span style={{ color: 'var(--text-secondary)' }}> ที่คุณเลือก</span>
              </h1>

              <p className="animate-fade-up delay-100" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '40px' }}>
                รถสะอาด ใหม่ บริการดี ราคาเป็นธรรม จองง่ายผ่านออนไลน์ ยืนยันทันที ไม่ต้องรอ
              </p>

              <div className="animate-fade-up delay-200" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <Link href="/vehicles" className="btn-primary" style={{ fontSize: '15px', padding: '16px 32px' }}>
                  ดูรถทั้งหมด
                  <span style={{ fontSize: '18px' }}>→</span>
                </Link>
                <Link href="/booking/create" className="btn-outline" style={{ fontSize: '15px', padding: '16px 32px' }}>
                  จองรถเลย
                </Link>
              </div>
            </div>

            {/* Right — car carousel */}
            <div className="animate-fade-in delay-200" style={{ position: 'relative' }}>
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                textAlign: 'center',
                padding: '24px 16px',
                borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '32px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="container">
          <div style={{ marginBottom: '56px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Services</p>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>บริการของเรา</h2>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', marginTop: '12px' }}>เลือกบริการที่ตรงกับความต้องการของคุณ</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {services.map((s, i) => (
              <Link key={s.title} href={s.href} className="card" style={{
                padding: '32px 28px',
                textDecoration: 'none',
                display: 'block',
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{ color: 'var(--accent)', marginBottom: '20px', lineHeight: 1 }}>
                  <s.icon size={28} />
                </div>
                <h3 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Raleway, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.7 }}>
                  <span>รายละเอียด</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VEHICLES CTA ─── */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Fleet</p>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '12px' }}>รถยนต์คัดสรรพร้อมให้เช่า</h2>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '16px', color: 'var(--text-secondary)' }}>รถหลากหลายรุ่น ราคาหลากหลายระดับ ทุกคันผ่านการตรวจสภาพ</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link href="/vehicles" className="btn-primary">ดูรถทั้งหมด →</Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="container">
          <div style={{ marginBottom: '56px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Why Carallcar</p>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>ทำไมต้องเลือกเรา?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                padding: '32px 28px',
                background: 'var(--bg-primary)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '32px', height: '32px', minWidth: '32px',
                    borderRadius: '8px',
                    background: 'var(--accent-muted)',
                    border: '1px solid var(--border-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 900, fontSize: '13px', color: 'var(--accent)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{f.title}</h3>
                    <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '80px', paddingBottom: '80px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(245,166,35,0.06) 0%, transparent 70%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>Get Started</p>
          <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '16px' }}>
            พร้อมเช่ารถแล้วหรือยัง?
          </h2>
          <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
            สมัครสมาชิกฟรี จองง่าย ได้รถไว ไม่ต้องรอนาน
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/register" className="btn-primary" style={{ fontSize: '15px', padding: '16px 36px' }}>สมัครสมาชิกฟรี</Link>
            <Link href="/contact" className="btn-outline" style={{ fontSize: '15px', padding: '16px 36px' }}>ติดต่อเรา</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
