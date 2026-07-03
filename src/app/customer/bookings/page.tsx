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
  vehicleId: { brand: string; model: string; year: number; images: string[] }
}

const statusLabel: Record<string, { text: string; cls: string }> = {
  pending:   { text: 'รอยืนยัน',   cls: 'bg-yellow-100 text-yellow-700' },
  confirmed: { text: 'ยืนยันแล้ว', cls: 'bg-blue-100 text-blue-700' },
  active:    { text: 'กำลังเช่า',  cls: 'bg-green-100 text-green-700' },
  completed: { text: 'เสร็จสิ้น',  cls: 'bg-gray-100 text-gray-600' },
  cancelled: { text: 'ยกเลิก',     cls: 'bg-red-100 text-red-500' },
  overdue:   { text: 'เกินกำหนด', cls: 'bg-orange-100 text-orange-700' },
}

export default function CustomerBookingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState<string | null>(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/bookings')
      .then((r) => r.json())
      .then((d) => { setRentals(d.rentals || []); setLoading(false) })
  }, [status])

  const handleCancel = async (id: string) => {
    if (!confirm('ยืนยันการยกเลิกการจองนี้?')) return
    setCancelling(id)
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'cancel' }),
    })
    const data = await res.json()
    setCancelling(null)
    if (!res.ok) { setMsg(data.error); return }
    setMsg('ยกเลิกการจองสำเร็จ')
    setRentals((prev) => prev.map((r) => r._id === id ? { ...r, status: 'cancelled' } : r))
  }

  const fmt = (d: string) => new Date(d).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })

  if (status === 'loading' || loading) return <div className="text-center py-20 text-gray-400">กำลังโหลด...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ประวัติการจอง</h1>
        <Link href="/customer/dashboard" className="text-sm text-blue-600 hover:underline">← แดชบอร์ด</Link>
      </div>

      {msg && (
        <div className={`px-4 py-3 rounded-lg mb-6 text-sm ${msg.includes('สำเร็จ') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {msg}
        </div>
      )}

      {rentals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-lg text-gray-500 mb-2">ยังไม่มีประวัติการจอง</p>
          <Link href="/vehicles" className="text-blue-600 hover:underline text-sm">จองรถเลย →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {rentals.map((r) => {
            const s = statusLabel[r.status] ?? { text: r.status, cls: 'bg-gray-100 text-gray-600' }
            const canCancel = ['pending', 'confirmed'].includes(r.status)
            return (
              <div key={r._id} className="bg-white rounded-2xl border p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-gray-800 text-lg">
                        {r.vehicleId?.brand} {r.vehicleId?.model} ({r.vehicleId?.year})
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.cls}`}>{s.text}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">รหัส: <span className="font-mono text-blue-600">{r.rentalCode}</span></p>
                    <p className="text-sm text-gray-500">{fmt(r.startDate)} — {fmt(r.endDate)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <p className="text-blue-700 font-bold text-xl">฿{r.totalPrice.toLocaleString()}</p>
                    {canCancel && (
                      <button
                        onClick={() => handleCancel(r._id)}
                        disabled={cancelling === r._id}
                        className="text-xs px-3 py-1.5 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {cancelling === r._id ? 'กำลังยกเลิก...' : 'ยกเลิกการจอง'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
