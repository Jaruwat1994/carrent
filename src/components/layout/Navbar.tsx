'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CarRent
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/vehicles" className="hover:text-blue-600 transition-colors">รถทั้งหมด</Link>
            <Link href="/services" className="hover:text-blue-600 transition-colors">บริการ</Link>
            <Link href="/promotions" className="hover:text-blue-600 transition-colors">โปรโมชั่น</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">เกี่ยวกับเรา</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">ติดต่อ</Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <Link href="/customer/dashboard" className="text-sm text-gray-700 hover:text-blue-600">
                  สวัสดี, {session.user?.name?.split(' ')[0]}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-100 transition-colors"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  เข้าสู่ระบบ
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="block w-6 h-0.5 bg-gray-600 mb-1" />
            <span className="block w-6 h-0.5 bg-gray-600 mb-1" />
            <span className="block w-6 h-0.5 bg-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3 text-sm font-medium text-gray-700">
          <Link href="/vehicles" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>รถทั้งหมด</Link>
          <Link href="/services" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>บริการ</Link>
          <Link href="/promotions" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>โปรโมชั่น</Link>
          <Link href="/about" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>เกี่ยวกับเรา</Link>
          <Link href="/contact" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>ติดต่อ</Link>
          {session ? (
            <>
              <Link href="/customer/dashboard" className="block hover:text-blue-600" onClick={() => setMenuOpen(false)}>แดชบอร์ด</Link>
              <button onClick={() => { signOut({ callbackUrl: '/' }); setMenuOpen(false) }} className="block text-red-500">ออกจากระบบ</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-blue-600" onClick={() => setMenuOpen(false)}>เข้าสู่ระบบ</Link>
              <Link href="/register" className="block text-blue-600 font-semibold" onClick={() => setMenuOpen(false)}>สมัครสมาชิก</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
