'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Vehicle {
  _id: string
  brand: string
  model: string
  year: number
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
  images: string[]
}

export function BookingCreateForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const vehicleId = searchParams.get('vehicleId')

  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')
  const [returnLocation, setReturnLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (!vehicleId) return
    fetch(`/api/vehicles/${vehicleId}`)
      .then((r) => r.json())
      .then((d) => setVehicle(d.vehicle))
  }, [vehicleId])

  const calcPrice = () => {
    if (!vehicle || !startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    if (days < 1) return 0
    if (days >= 30) return Math.ceil(days / 30) * vehicle.pricePerMonth
    if (days >= 7) return Math.ceil(days / 7) * vehicle.pricePerWeek
    return days * vehicle.pricePerDay
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicleId, startDate, endDate, pickupLocation, returnLocation, notes }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'เกิดข้อผิดพลาด'); return }
    router.push(`/booking/confirmation/${data.rental._id}`)
  }

  const totalPrice = calcPrice()
  const today = new Date().toISOString().split('T')[0]

  if (status === 'loading') return <div className="text-center py-20 text-gray-400">กำลังโหลด...</div>

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link href={vehicleId ? `/vehicles/${vehicleId}` : '/vehicles'} className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← กลับ
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">จองรถ</h1>

      {vehicle && (
        <div className="bg-blue-50 rounded-2xl p-5 mb-8 flex gap-4 items-center">
          <div className="w-20 h-14 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
            {vehicle.images?.[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={vehicle.images[0]} alt={vehicle.model} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">🚗</span>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{vehicle.brand} {vehicle.model} ({vehicle.year})</p>
            <p className="text-sm text-blue-600">฿{vehicle.pricePerDay.toLocaleString()}/วัน</p>
          </div>
        </div>
      )}

      {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-sm border p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">วันรับรถ</label>
            <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">วันคืนรถ</label>
            <input
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">สถานที่รับรถ</label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="ระบุสถานที่รับรถ"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">สถานที่คืนรถ</label>
          <input
            type="text"
            value={returnLocation}
            onChange={(e) => setReturnLocation(e.target.value)}
            placeholder="ระบุสถานที่คืนรถ (ถ้าต่างจากรับรถ)"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">หมายเหตุ</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="ข้อมูลเพิ่มเติม..."
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {totalPrice > 0 && (
          <div className="bg-gray-50 rounded-xl p-4 border">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>ราคารวมโดยประมาณ</span>
              <span className="font-bold text-lg text-blue-700">฿{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>มัดจำ (30%)</span>
              <span>฿{Math.round(totalPrice * 0.3).toLocaleString()}</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 text-lg"
        >
          {loading ? 'กำลังส่งคำขอ...' : 'ยืนยันการจอง'}
        </button>
      </form>
    </div>
  )
}
