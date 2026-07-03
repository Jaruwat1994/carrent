import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">CarRent</h3>
            <p className="text-sm leading-relaxed">บริการเช่ารถที่เชื่อถือได้ ราคาคุ้มค่า พร้อมให้บริการทั่วประเทศ</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">บริการ</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">เช่ารถระยะสั้น</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">เช่ารถระยะยาว</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">เช่ารถพร้อมคนขับ</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">บริการองค์กร</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">ข้อมูล</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">เกี่ยวกับเรา</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">ข่าวสาร</Link></li>
              <li><Link href="/promotions" className="hover:text-white transition-colors">โปรโมชั่น</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">ร่วมงานกับเรา</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">ติดต่อเรา</h4>
            <ul className="space-y-2 text-sm">
              <li>โทร: 02-xxx-xxxx</li>
              <li>อีเมล: info@carrent.th</li>
              <li><Link href="/contact" className="hover:text-white transition-colors">แบบฟอร์มติดต่อ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} CarRent. สงวนลิขสิทธิ์</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-white transition-colors">เงื่อนไขการใช้บริการ</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
