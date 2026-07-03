import Link from 'next/link'

export default function HomePage() {
  const services = [
    { icon: '🚗', title: 'เช่ารถระยะสั้น', desc: 'เช่ารายวัน เริ่มต้น 800 บาท/วัน' },
    { icon: '📅', title: 'เช่ารถระยะยาว', desc: 'เช่ารายเดือน ราคาพิเศษ ประหยัดกว่า' },
    { icon: '👨‍✈️', title: 'เช่าพร้อมคนขับ', desc: 'สะดวก ปลอดภัย มีคนขับบริการ' },
    { icon: '🏢', title: 'บริการองค์กร', desc: 'แพ็กเกจพิเศษสำหรับองค์กรและบริษัท' },
  ]

  const features = [
    { icon: '✅', title: 'รถใหม่ทุกคัน', desc: 'ฟลีทรถใหม่ได้มาตรฐาน ตรวจสภาพก่อนทุกครั้ง' },
    { icon: '💰', title: 'ราคาโปร่งใส', desc: 'ไม่มีค่าใช้จ่ายซ่อน ราคาตามที่ตกลง' },
    { icon: '📞', title: 'ซัพพอร์ต 24 ชม.', desc: 'ทีมงานพร้อมช่วยเหลือตลอด 24 ชั่วโมง' },
    { icon: '🔒', title: 'ประกันภัยครอบคลุม', desc: 'คุ้มครองครบทุกรูปแบบ อุ่นใจทุกเส้นทาง' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            เช่ารถง่าย ราคาดี <br />
            <span className="text-yellow-300">พร้อมให้บริการทั่วประเทศ</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            รถสะอาด ใหม่ บริการดี ราคาเป็นธรรม จองง่ายผ่านออนไลน์ได้เลย
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vehicles"
              className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-colors text-lg shadow-lg"
            >
              ดูรถทั้งหมด
            </Link>
            <Link
              href="/booking/create"
              className="px-8 py-4 bg-white/10 border-2 border-white text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-lg"
            >
              จองรถเลย
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">บริการของเรา</h2>
          <p className="text-center text-gray-500 mb-10">เลือกบริการที่ตรงกับความต้องการของคุณ</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">รถยนต์คัดสรรพร้อมให้เช่า</h2>
          <p className="text-gray-500 mb-8">รถหลากหลายรุ่น ราคาหลากหลายระดับ</p>
          <Link
            href="/vehicles"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            ดูรถทั้งหมด →
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">ทำไมต้องเลือก CarRent?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 px-4 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">พร้อมเช่ารถแล้วหรือยัง?</h2>
        <p className="text-blue-100 mb-8 text-lg">สมัครสมาชิกฟรี จองง่าย ได้รถไว</p>
        <Link
          href="/register"
          className="inline-block px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg"
        >
          สมัครสมาชิกฟรี
        </Link>
      </section>
    </div>
  )
}
