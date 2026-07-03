export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">ติดต่อเรา</h1>
      <p className="text-gray-500 mb-10">มีคำถามหรือต้องการความช่วยเหลือ? ทีมงานพร้อมให้บริการ</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: '📞', title: 'โทรศัพท์', detail: '02-xxx-xxxx', sub: 'จ-ศ 08:00-18:00' },
          { icon: '✉️', title: 'อีเมล', detail: 'info@carrent.th', sub: 'ตอบภายใน 24 ชม.' },
          { icon: '📍', title: 'ที่อยู่', detail: 'กรุงเทพมหานคร', sub: 'สำนักงานใหญ่' },
        ].map((c) => (
          <div key={c.title} className="bg-white rounded-2xl border p-6 text-center shadow-sm">
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="font-semibold text-gray-800 mb-1">{c.title}</h3>
            <p className="text-blue-600 text-sm">{c.detail}</p>
            <p className="text-gray-400 text-xs mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">ส่งข้อความหาเรา</h2>
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
              <input type="text" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="สมชาย ใจดี" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
              <input type="email" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="example@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">หัวข้อ</label>
            <input type="text" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="เรื่องที่ต้องการติดต่อ" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ข้อความ</label>
            <textarea rows={5} className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="รายละเอียด..." />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            ส่งข้อความ
          </button>
        </form>
      </div>
    </div>
  )
}
