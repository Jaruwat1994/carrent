import { Clock, CalendarDays, User, Building2, Shield, Headphones, Star, Smartphone, MapPin, CheckCircle, ChevronRight, Quote, Zap, Award, Car } from 'lucide-react'
import { HeroCarousel } from '@/components/ui/HeroCarousel'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { TiltCard } from '@/components/ui/TiltCard'
import { Marquee } from '@/components/ui/Marquee'
import { MagneticButton } from '@/components/ui/MagneticButton'

export default function HomePage() {
  const services = [
    { icon: Clock, title: 'เช่าระยะสั้น', desc: 'เช่ารายวัน เริ่มต้น 800 บาท/วัน', tag: 'Daily', href: '/services' },
    { icon: CalendarDays, title: 'เช่าระยะยาว', desc: 'เช่ารายเดือน ราคาพิเศษ ประหยัดกว่า', tag: 'Monthly', href: '/services' },
    { icon: User, title: 'พร้อมคนขับ', desc: 'สะดวก ปลอดภัย มีคนขับบริการ', tag: 'Chauffeur', href: '/services' },
    { icon: Building2, title: 'บริการองค์กร', desc: 'แพ็กเกจพิเศษสำหรับองค์กร', tag: 'Corporate', href: '/services' },
  ]

  const stats = [
    { value: 500, suffix: '+', label: 'รถในฝูงบิน' },
    { value: 20, suffix: 'K+', label: 'ลูกค้าพึงพอใจ' },
    { value: 24, suffix: '/7', label: 'ซัพพอร์ต' },
    { value: 15, suffix: '+', label: 'สาขาทั่วไทย' },
  ]

  const features = [
    { title: 'รถใหม่ทุกคัน', desc: 'ฟลีทรถใหม่ได้มาตรฐาน ตรวจสภาพก่อนทุกครั้ง' },
    { title: 'ราคาโปร่งใส', desc: 'ไม่มีค่าใช้จ่ายซ่อน ราคาตามที่ตกลง' },
    { title: 'ซัพพอร์ต 24 ชม.', desc: 'ทีมงานพร้อมช่วยเหลือตลอด 24 ชั่วโมง' },
    { title: 'ประกันครอบคลุม', desc: 'คุ้มครองครบทุกรูปแบบ อุ่นใจทุกเส้นทาง' },
    { title: 'จองง่ายออนไลน์', desc: 'ระบบจองออนไลน์ 24 ชม. ได้รับการยืนยันทันที' },
    { title: 'รับ-ส่งฟรี', desc: 'บริการรับ-ส่งรถถึงที่ในรัศมีที่กำหนด' },
  ]

  const brands = ['TOYOTA', 'HONDA', 'MAZDA', 'NISSAN', 'MITSUBISHI', 'ISUZU', 'FORD', 'MG', 'BYD', 'TESLA']

  const testimonials = [
    { name: 'คุณสมชาย', role: 'นักธุรกิจ', text: 'บริการดีมาก รถสะอาด รับ-ส่งตรงเวลา จองง่ายผ่านออนไลน์ ได้รถไวไม่ต้องรอ', rating: 5 },
    { name: 'คุณนภา', role: 'นักท่องเที่ยว', text: 'ราคาเป็นธรรม ไม่มีค่าใช้จ่ายซ่อน พนักงานแนะนำดี ประกันครบ อุ่นใจทุกเส้นทาง', rating: 5 },
    { name: 'คุณวิชัย', role: 'เจ้าของกิจการ', text: 'ใช้บริการองค์กร ทีมงานดูแลครบวงจร รถใหม่หมด วางใจได้เลย จะใช้ซ้ำ', rating: 5 },
  ]

  const steps = [
    { icon: Smartphone, title: 'เลือกรถ', desc: 'เลือกรถที่ใช่จากฝูงบิน พร้อมราคาโปร่งใส' },
    { icon: CalendarDays, title: 'เลือกวัน', desc: 'เลือกวันรับ-ส่ง กรอกข้อมูลง่าย ๆ' },
    { icon: CheckCircle, title: 'ยืนยัน', desc: 'ชำระเงินปลอดภัย รับการยืนยันทันที' },
    { icon: Car, title: 'รับรถ', desc: 'รับรถถึงที่ หรือมารับที่สาขา พร้อมขับ' },
  ]

  return (
    <div style={{ overflow: 'hidden' }}>
      <ScrollProgress />

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
        {/* Floating decorative blobs */}
        <div className="float-y" style={{ position: 'absolute', top: '18%', left: '8%', width: '110px', height: '110px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)', filter: 'blur(8px)', pointerEvents: 'none' }} />
        <div className="float-y-slow" style={{ position: 'absolute', bottom: '14%', right: '6%', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)', filter: 'blur(12px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            {/* Left — text */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', borderRadius: '20px', marginBottom: '32px' }} className="animate-fade-in">
                <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>Premium Car Rental Thailand</span>
              </div>

              <h1 className="animate-fade-up" style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', fontFamily: 'Raleway, sans-serif', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                ขับทุกเส้นทาง<br />
                <span className="gradient-text">ด้วยสไตล์</span>
                <span style={{ color: 'var(--text-secondary)' }}> ที่คุณเลือก</span>
              </h1>

              <p className="animate-fade-up delay-100" style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '40px' }}>
                รถสะอาด ใหม่ บริการดี ราคาเป็นธรรม จองง่ายผ่านออนไลน์ ยืนยันทันที ไม่ต้องรอ
              </p>

              <div className="animate-fade-up delay-200" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <MagneticButton href="/vehicles" className="btn-primary" style={{ fontSize: '15px', padding: '16px 32px' }}>
                  ดูรถทั้งหมด
                  <span style={{ fontSize: '18px' }}>→</span>
                </MagneticButton>
                <MagneticButton href="/booking/create" className="btn-outline" style={{ fontSize: '15px', padding: '16px 32px' }}>
                  จองรถเลย
                </MagneticButton>
              </div>

              {/* Trust row */}
              <div className="animate-fade-up delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '48px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[0,1,2,3,4].map(i => <Star key={i} size={14} className="star-fill" fill="currentColor" />)}
                  </div>
                  <span style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>4.9/5 จากลูกค้าจริง</span>
                </div>
                <div style={{ width: '1px', height: '16px', background: 'var(--border)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <Shield size={14} style={{ color: 'var(--accent)' }} />
                  ประกันครอบคลุมทุกทริป
                </div>
              </div>
            </div>

            {/* Right — car carousel */}
            <div className="animate-fade-in delay-200" style={{ position: 'relative' }}>
              <HeroCarousel />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
          <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Scroll</span>
          <div style={{ width: '22px', height: '36px', border: '1.5px solid var(--text-muted)', borderRadius: '12px', position: 'relative' }}>
            <span className="float-y-slow" style={{ position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', width: '3px', height: '6px', borderRadius: '2px', background: 'var(--accent)' }} />
          </div>
        </div>
      </section>

      {/* ─── BRAND MARQUEE ─── */}
      <section style={{ padding: '40px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Trusted Brands in Our Fleet</span>
        </div>
        <Marquee items={brands} />
      </section>

      {/* ─── STATS ─── */}
      <section style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
            {stats.map((s, i) => (
              <ScrollReveal
                key={s.label}
                delay={i * 100}
                style={{
                  textAlign: 'center',
                  padding: '24px 16px',
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '38px', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>{s.label}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '56px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Services</p>
            <h2 className="accent-line" style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', paddingBottom: '14px' }}>บริการของเรา</h2>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', marginTop: '28px' }}>เลือกบริการที่ตรงกับความต้องการของคุณ</p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80}>
                <TiltCard
                  href={s.href}
                  className="card glow-card"
                  style={{ padding: '32px 28px', textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <div style={{ color: 'var(--accent)', lineHeight: 1 }}>
                        <s.icon size={28} />
                      </div>
                      <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '3px 8px', border: '1px solid var(--border)', borderRadius: '12px' }}>{s.tag}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
                    <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Raleway, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.8 }}>
                      <span>รายละเอียด</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '56px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>How It Works</p>
            <h2 className="accent-line" style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', paddingBottom: '14px' }}>จองง่าย 4 ขั้นตอน</h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', position: 'relative' }}>
            {steps.map((st, i) => (
              <ScrollReveal key={st.title} delay={i * 120}>
                <div style={{ position: 'relative', padding: '32px 24px' }}>
                  <div style={{ position: 'absolute', top: '0', left: '0', fontFamily: 'Raleway, sans-serif', fontSize: '64px', fontWeight: 900, color: 'var(--accent)', opacity: 0.08, lineHeight: 1, letterSpacing: '-0.05em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '20px' }}>
                      <st.icon size={24} />
                    </div>
                    <h3 style={{ fontFamily: 'Raleway, sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{st.title}</h3>
                    <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{st.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VEHICLES CTA ─── */}
      <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="container">
          <ScrollReveal direction="left" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'center', flexWrap: 'wrap', padding: '48px', borderRadius: 'var(--radius-card)', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 100% at 80% 50%, rgba(245,166,35,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Fleet</p>
              <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '12px' }}>รถยนต์คัดสรรพร้อมให้เช่า</h2>
              <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '16px', color: 'var(--text-secondary)' }}>รถหลากหลายรุ่น ราคาหลากหลายระดับ ทุกคันผ่านการตรวจสภาพ</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <MagneticButton href="/vehicles" className="btn-primary">ดูรถทั้งหมด →</MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '56px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Why Carallcar</p>
            <h2 className="accent-line" style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', paddingBottom: '14px' }}>ทำไมต้องเลือกเรา?</h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 80}>
                <div className="glow-card" style={{ padding: '32px 28px', background: 'var(--bg-primary)', height: '100%', borderRadius: 0 }}>
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '56px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>Testimonials</p>
            <h2 className="accent-line" style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', paddingBottom: '14px' }}>ลูกค้าพูดถึงเรา</h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 120}>
                <div className="card glow-card" style={{ padding: '32px 28px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                  <Quote size={40} style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--accent)', opacity: 0.12 }} />
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '20px' }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={16} className={j < t.rating ? 'star-fill' : 'star-empty'} fill="currentColor" />
                    ))}
                  </div>
                  <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '50%',
                      background: 'var(--accent-muted)', border: '1px solid var(--border-accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Raleway, sans-serif', fontWeight: 900, fontSize: '16px', color: 'var(--accent)',
                    }}>
                      {t.name.charAt(t.name.length - 1)}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</div>
                      <div style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '100px', paddingBottom: '100px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(245,166,35,0.08) 0%, transparent 70%)' }} />
        {/* Floating accent */}
        <div className="float-y" style={{ position: 'absolute', top: '20%', left: '12%', width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)', filter: 'blur(8px)', pointerEvents: 'none' }} />
        <div className="float-y-slow" style={{ position: 'absolute', bottom: '20%', right: '15%', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.1) 0%, transparent 70%)', filter: 'blur(10px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <ScrollReveal direction="scale">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', borderRadius: '20px', marginBottom: '24px' }}>
              <Zap size={12} style={{ color: 'var(--accent)' }} />
              <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>Get Started Today</span>
            </div>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '16px' }}>
              พร้อมเช่ารถแล้วหรือยัง?
            </h2>
            <p style={{ fontFamily: 'Sarabun, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
              สมัครสมาชิกฟรี จองง่าย ได้รถไว ไม่ต้องรอนาน
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <MagneticButton href="/register" className="btn-primary" style={{ fontSize: '15px', padding: '16px 36px' }}>สมัครสมาชิกฟรี</MagneticButton>
              <MagneticButton href="/contact" className="btn-outline" style={{ fontSize: '15px', padding: '16px 36px' }}>ติดต่อเรา</MagneticButton>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', justifyContent: 'center', marginTop: '48px' }}>
              {[
                { icon: Headphones, label: 'ซัพพอร์ต 24/7' },
                { icon: Award, label: 'รถใหม่ได้มาตรฐาน' },
                { icon: MapPin, label: 'รับ-ส่งฟรี' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Sarabun, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <b.icon size={16} style={{ color: 'var(--accent)' }} />
                  {b.label}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
