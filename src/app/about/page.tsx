export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">เกี่ยวกับเรา</h1>
      <p className="text-gray-500 mb-12">บริษัทเช่ารถที่เชื่อถือได้มากว่า 10 ปี</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">พันธกิจของเรา</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            CarRent มุ่งมั่นให้บริการเช่ารถที่มีคุณภาพ ปลอดภัย และราคาคุ้มค่า ด้วยทีมงานมืออาชีพ
            พร้อมให้บริการตลอด 24 ชั่วโมง เพื่อตอบสนองทุกความต้องการในการเดินทางของลูกค้า
          </p>
          <p className="text-gray-600 leading-relaxed">
            เราให้ความสำคัญกับความพึงพอใจของลูกค้าเป็นอันดับหนึ่ง
            ด้วยรถยนต์ที่ผ่านการตรวจสภาพและบำรุงรักษาอย่างสม่ำเสมอ
          </p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-10 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <p className="text-2xl font-bold text-blue-700">10+ ปี</p>
          <p className="text-gray-500 text-sm">ประสบการณ์ในการให้บริการ</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
        {[
          { num: '500+', label: 'รถในฝูงบิน' },
          { num: '50,000+', label: 'ลูกค้าที่ไว้วางใจ' },
          { num: '99%', label: 'ความพึงพอใจ' },
          { num: '24/7', label: 'บริการตลอดเวลา' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600 mb-1">{s.num}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
