'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Vehicle {
  _id: string
  brand: string
  model: string
  year: number
  seats: number
  color: string
  transmission: string
  fuelType: string
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
  description?: string
  images: string[]
  features: string[]
  status: string
  location?: string
}

export default function VehicleDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/vehicles/${id}`)
      .then((r) => r.json())
      .then((d) => { setVehicle(d.vehicle); setLoading(false) })
  }, [id])

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-20 text-center text-gray-400">กำลังโหลด...</div>
  if (!vehicle) return <div className="max-w-5xl mx-auto px-4 py-20 text-center text-gray-500">ไม่พบรถ</div>

  const fuelLabel: Record<string, string> = { gasoline: 'เบนซิน', diesel: 'ดีเซล', hybrid: 'ไฮบริด', electric: 'ไฟฟ้า' }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/vehicles" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← กลับไปรายการรถ
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden bg-gray-100 h-72 lg:h-96 flex items-center justify-center">
          {vehicle.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={vehicle.images[0]} alt={vehicle.model} className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl">🚗</span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{vehicle.brand} {vehicle.model}</h1>
          <p className="text-gray-400 mb-4">{vehicle.year} • {vehicle.color}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">{vehicle.seats} ที่นั่ง</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {vehicle.transmission === 'automatic' ? 'เกียร์ออโต้' : 'เกียร์ธรรมดา'}
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
              {fuelLabel[vehicle.fuelType] || vehicle.fuelType}
            </span>
            {vehicle.location && (
              <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm">📍 {vehicle.location}</span>
            )}
          </div>

          <div className="bg-blue-50 rounded-2xl p-5 mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">ราคาเช่า</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-blue-700">฿{vehicle.pricePerDay.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">ต่อวัน</p>
              </div>
              <div>
                <p className="text-xl font-bold text-blue-700">฿{vehicle.pricePerWeek.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">ต่อสัปดาห์</p>
              </div>
              <div>
                <p className="text-xl font-bold text-blue-700">฿{vehicle.pricePerMonth.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">ต่อเดือน</p>
              </div>
            </div>
          </div>

          {vehicle.description && (
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{vehicle.description}</p>
          )}

          {vehicle.features?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">คุณสมบัติ</h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((f) => (
                  <span key={f} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{f}</span>
                ))}
              </div>
            </div>
          )}

          {vehicle.status === 'available' ? (
            <button
              onClick={() => session ? router.push(`/booking/create?vehicleId=${vehicle._id}`) : router.push('/login')}
              className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-lg"
            >
              {session ? 'จองรถคันนี้' : 'เข้าสู่ระบบเพื่อจอง'}
            </button>
          ) : (
            <div className="w-full py-4 bg-gray-200 text-gray-500 font-semibold rounded-xl text-center text-lg">
              รถไม่ว่างในขณะนี้
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
