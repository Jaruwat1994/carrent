'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Rental {
  _id: string
  rentalCode: string
  startDate: string
  endDate: string
  totalPrice: number
  status: string
  vehicleId: { brand: string; model: string; year: number }
}

const statusLabel: Record<string, { text: string; cls: string }> = {
  pending: { text: 'รอยืนยัน', cls: 'bg-yellow-100 text-yellow-700' },
  confirmed: { text: 'ยืนยันแล้ว', cls: 'bg-blue-100 text-blue-700' },
  active: { text: 'กำลังเช่า', cls: 'bg-green-100 text-green-700' },
  completed: { text: 'เสร็จสิ้น', cls: 'bg-gray-100 text-gray-600' },
  cancelled: { text: 'ยกเลิก', cls: 'bg-red-100 text-red-500' },
  overdue: { text: 'เกินกำหนด', cls: 'bg-orange-100 text-orange-700' },
}

export default function CustomerDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((d) => { setRentals(d.rentals || []); setLoading(false) })
  }, [status])

  const active = rentals.filter((r) => ['pending', 'confirmed', 'active'].includes(r.status))
  const past = rentals.filter((r) => ['completed', 'cancelled', 'overdue'].includes(r.status))
  const fmt = (d: string) => new Date(d).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })

  if (status === 'loading' || loading) {
    return <div className="text-center py-20 text-gray-400">กำลังโหลด...</div>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">สวัสดี, {session?.user?.name?.split(' ')[0]}</h1>
          <p className="text-gray-500 mt-1">ยินดีต้อนรับสู่แดชบอร์ดของคุณ</p>
        </div>
        <Link href="/vehicles" className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">
          จองรถ
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'จองทั้งหมด', value: rentals.length, color: 'text-blue-600' },
          { label: 'กำลังดำเนินการ', value: active.length, color: 'text-yellow-600' },
          { label: 'เสร็จสิ้น', value: rentals.filter(r => r.status === 'completed').length, color: 'text-green-600' },
          { label: 'ยกเลิก', value: rentals.filter(r => r.status === 'cancelled').length, color: 'text-red-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border shadow-sm text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Active Rentals */}
      {active.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">การจองปัจจุบัน</h2>
          <div className="space-y-3">
            {active.map((r) => (
              <RentalRow key={r._id} rental={r} fmt={fmt} />
            ))}
          </div>
        </section>
      )}

      {/* Past Rentals */}
      {past.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">ประวัติการจอง</h2>
          <div className="space-y-3">
            {past.map((r) => (
              <RentalRow key={r._id} rental={r} fmt={fmt} />
            ))}
          </div>
        </section>
      )}

      {rentals.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border">
          <p className="text-5xl mb-4">🚗</p>
          <p className="text-lg text-gray-500 mb-2">ยังไม่มีประวัติการจอง</p>
          <Link href="/vehicles" className="text-blue-600 hover:underline text-sm">เริ่มจองรถเลย →</Link>
        </div>
      )}
    </div>
  )
}

function RentalRow({ rental, fmt }: { rental: Rental; fmt: (d: string) => string }) {
  const s = statusLabel[rental.status] ?? { text: rental.status, cls: 'bg-gray-100 text-gray-600' }
  return (
    <div className="bg-white rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <p className="font-semibold text-gray-800">{rental.vehicleId?.brand} {rental.vehicleId?.model} ({rental.vehicleId?.year})</p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.cls}`}>{s.text}</span>
        </div>
        <p className="text-sm text-gray-400">{fmt(rental.startDate)} — {fmt(rental.endDate)}</p>
        <p className="text-xs text-gray-400 mt-0.5">รหัส: {rental.rentalCode}</p>
      </div>
      <p className="text-blue-700 font-bold text-lg whitespace-nowrap">฿{rental.totalPrice.toLocaleString()}</p>
    </div>
  )
}
