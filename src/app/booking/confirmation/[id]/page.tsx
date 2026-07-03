'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Rental {
  _id: string
  rentalCode: string
  startDate: string
  endDate: string
  totalPrice: number
  deposit: number
  status: string
  pickupLocation?: string
  vehicleId: {
    brand: string
    model: string
    year: number
    images: string[]
  }
}

export default function BookingConfirmationPage() {
  const { id } = useParams()
  const [rental, setRental] = useState<Rental | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/bookings/${id}`)
      .then((r) => r.json())
      .then((d) => { setRental(d.rental); setLoading(false) })
  }, [id])

  if (loading) return <div className="text-center py-20 text-gray-400">กำลังโหลด...</div>
  if (!rental) return <div className="text-center py-20 text-gray-500">ไม่พบข้อมูลการจอง</div>

  const fmt = (d: string) => new Date(d).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">✅</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">จองรถสำเร็จ!</h1>
        <p className="text-gray-500">รอการยืนยันจากเจ้าหน้าที่ภายใน 24 ชั่วโมง</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-5">
        <div className="text-center pb-5 border-b">
          <p className="text-sm text-gray-500 mb-1">รหัสการจอง</p>
          <p className="text-2xl font-bold text-blue-600 tracking-wide">{rental.rentalCode}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">รถที่จอง</p>
            <p className="font-semibold text-gray-800">{rental.vehicleId?.brand} {rental.vehicleId?.model} ({rental.vehicleId?.year})</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">สถานะ</p>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">รอยืนยัน</span>
          </div>
          <div>
            <p className="text-gray-400 mb-1">วันรับรถ</p>
            <p className="font-medium text-gray-800">{fmt(rental.startDate)}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">วันคืนรถ</p>
            <p className="font-medium text-gray-800">{fmt(rental.endDate)}</p>
          </div>
          {rental.pickupLocation && (
            <div className="col-span-2">
              <p className="text-gray-400 mb-1">สถานที่รับรถ</p>
              <p className="font-medium text-gray-800">{rental.pickupLocation}</p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border-t mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">ราคาทั้งหมด</span>
            <span className="font-bold text-blue-700 text-lg">฿{rental.totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">มัดจำ (30%)</span>
            <span className="text-gray-700">฿{rental.deposit.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Link href="/customer/bookings" className="flex-1 py-3 text-center border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium">
          ดูประวัติการจอง
        </Link>
        <Link href="/vehicles" className="flex-1 py-3 text-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
          จองรถเพิ่ม
        </Link>
      </div>
    </div>
  )
}
