export default function NewsPage() {
  const articles = [
    { title: 'CarRent เปิดตัวบริการเช่ารถไฟฟ้า EV', date: '1 กรกฎาคม 2026', excerpt: 'CarRent ขยายฝูงบินด้วยรถยนต์ไฟฟ้ารุ่นใหม่ล่าสุด ตอบรับกระแสรักษ์โลก' },
    { title: 'โปรโมชั่นพิเศษเดือนกรกฎาคม ลดสูงสุด 20%', date: '28 มิถุนายน 2026', excerpt: 'รับส่วนลดพิเศษเมื่อจองรถผ่านแอปออนไลน์ในเดือนกรกฎาคมนี้' },
    { title: 'CarRent ขยายสาขาใหม่ภาคเหนือ', date: '20 มิถุนายน 2026', excerpt: 'เปิดสาขาใหม่ที่เชียงใหม่และเชียงราย เพื่อรองรับนักท่องเที่ยวภาคเหนือ' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">ข่าวสาร</h1>
      <p className="text-gray-500 mb-10">ข่าวสารและกิจกรรมล่าสุดจาก CarRent</p>
      <div className="space-y-6">
        {articles.map((a) => (
          <div key={a.title} className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-400 mb-2">{a.date}</p>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{a.title}</h2>
            <p className="text-gray-500 text-sm">{a.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
