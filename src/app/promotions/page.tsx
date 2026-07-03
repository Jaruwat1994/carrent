export default function PromotionsPage() {
  const promos = [
    { title: 'เช่า 7 วัน ฟรี 1 วัน', desc: 'เช่ารถ 7 วัน ลดทันที 1 วัน สำหรับรถทุกรุ่น', badge: 'ยอดนิยม', color: 'bg-blue-600' },
    { title: 'ลูกค้าใหม่ ลด 15%', desc: 'สมัครสมาชิกใหม่รับส่วนลดทันที 15% สำหรับการจองครั้งแรก', badge: 'ใหม่', color: 'bg-green-600' },
    { title: 'เช่ารายเดือน ราคาพิเศษ', desc: 'เช่าระยะยาว 1 เดือนขึ้นไป รับราคาพิเศษสุดคุ้ม', badge: 'ดีลพิเศษ', color: 'bg-purple-600' },
    { title: 'แพ็กเกจครอบครัว', desc: 'รถ 7 ที่นั่งขึ้นไป เหมาะสำหรับท่องเที่ยวกับครอบครัว', badge: 'ครอบครัว', color: 'bg-orange-500' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">โปรโมชั่น</h1>
      <p className="text-gray-500 mb-10">ข้อเสนอพิเศษสำหรับลูกค้าของเรา</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {promos.map((p) => (
          <div key={p.title} className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className={`${p.color} px-6 py-4 flex items-center justify-between`}>
              <span className="text-white font-bold text-lg">{p.title}</span>
              <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">{p.badge}</span>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{p.desc}</p>
              <a href="/vehicles" className="text-blue-600 text-sm font-medium hover:underline">
                ดูรถที่ร่วมรายการ →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">ต้องการรับข่าวสารโปรโมชั่น?</h2>
        <p className="text-gray-500 mb-6 text-sm">สมัครสมาชิกเพื่อรับข่าวสารและส่วนลดพิเศษก่อนใคร</p>
        <a href="/register" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          สมัครสมาชิกฟรี
        </a>
      </div>
    </div>
  )
}
