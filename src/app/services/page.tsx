import Link from 'next/link'

const services = [
  {
    icon: '🚗',
    title: 'เช่ารถระยะสั้น',
    desc: 'เหมาะสำหรับการเดินทางระยะสั้น ท่องเที่ยว หรือใช้งานชั่วคราว เริ่มต้นเพียงวันละ 800 บาท',
    features: ['เช่าขั้นต่ำ 1 วัน', 'ประกันภัยครอบคลุม', 'รับ-ส่งรถได้', 'ไม่มีค่าใช้จ่ายแอบแฝง'],
    href: '/vehicles',
    cta: 'ดูรถพร้อมเช่า',
    color: 'blue',
  },
  {
    icon: '📅',
    title: 'เช่ารถระยะยาว',
    desc: 'ประหยัดกว่าเช่าระยะสั้น เหมาะสำหรับการเดินทางธุรกิจหรือใช้งานต่อเนื่อง',
    features: ['เช่าตั้งแต่ 1 เดือนขึ้นไป', 'ราคาพิเศษ', 'ฟรีบำรุงรักษา', 'เปลี่ยนรถได้เมื่อต้องการ'],
    href: '/vehicles',
    cta: 'ดูแพ็กเกจระยะยาว',
    color: 'green',
  },
  {
    icon: '👨‍✈️',
    title: 'เช่ารถพร้อมคนขับ',
    desc: 'บริการคนขับมืออาชีพ สะดวก ปลอดภัย ไม่ต้องกังวลเรื่องเส้นทาง',
    features: ['คนขับมืออาชีพ', 'รู้จักเส้นทางดี', 'บริการตลอด 24 ชม.', 'รับ-ส่งสนามบิน'],
    href: '/contact',
    cta: 'สอบถามราคา',
    color: 'purple',
  },
  {
    icon: '🏢',
    title: 'บริการองค์กร',
    desc: 'แพ็กเกจพิเศษสำหรับองค์กรและบริษัท พร้อมใบกำกับภาษีและการจัดการฝูงรถ',
    features: ['ราคาพิเศษสำหรับองค์กร', 'ใบกำกับภาษี VAT', 'ระบบจัดการฝูงรถ', 'Account Manager'],
    href: '/contact',
    cta: 'ติดต่อทีมงาน',
    color: 'orange',
  },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-green-50 text-green-700 border-green-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
}

const btnMap: Record<string, string> = {
  blue: 'bg-blue-600 hover:bg-blue-700',
  green: 'bg-green-600 hover:bg-green-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
  orange: 'bg-orange-500 hover:bg-orange-600',
}

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">บริการของเรา</h1>
      <p className="text-gray-500 mb-12">เลือกบริการที่เหมาะกับคุณ</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s) => (
          <div key={s.title} className={`rounded-2xl border p-8 ${colorMap[s.color]} shadow-sm hover:shadow-md transition-shadow`}>
            <div className="text-4xl mb-4">{s.icon}</div>
            <h2 className="text-xl font-bold mb-3">{s.title}</h2>
            <p className="text-sm leading-relaxed mb-5 opacity-80">{s.desc}</p>
            <ul className="space-y-2 mb-6">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="text-xs">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href={s.href} className={`inline-block px-6 py-3 text-white rounded-xl font-medium text-sm transition-colors ${btnMap[s.color]}`}>
              {s.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
