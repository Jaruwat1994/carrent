import Link from 'next/link'

export default function CareersPage() {
  const jobs = [
    { title: 'พนักงานดูแลลูกค้า (Customer Service)', type: 'Full-time', location: 'กรุงเทพฯ' },
    { title: 'พนักงานตรวจสภาพรถ', type: 'Full-time', location: 'กรุงเทพฯ / เชียงใหม่' },
    { title: 'นักพัฒนาซอฟต์แวร์ (Full Stack)', type: 'Full-time', location: 'Remote' },
    { title: 'พนักงานการตลาดออนไลน์', type: 'Full-time', location: 'กรุงเทพฯ' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">ร่วมงานกับเรา</h1>
      <p className="text-gray-500 mb-10">มาเป็นส่วนหนึ่งของทีม CarRent ที่กำลังเติบโต</p>
      <div className="space-y-4 mb-12">
        {jobs.map((j) => (
          <div key={j.title} className="bg-white rounded-2xl border p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-800 mb-1">{j.title}</h2>
              <div className="flex gap-3 text-sm text-gray-500">
                <span>🏢 {j.type}</span>
                <span>📍 {j.location}</span>
              </div>
            </div>
            <Link href="/contact" className="text-sm px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap">
              สมัครงาน
            </Link>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 rounded-2xl p-8 text-center">
        <p className="text-gray-600 mb-4">ไม่เห็นตำแหน่งที่ใช่? ส่ง resume มาได้เลย</p>
        <Link href="/contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
          ติดต่อฝ่าย HR
        </Link>
      </div>
    </div>
  )
}
