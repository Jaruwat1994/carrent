'use client'

import { useEffect, useState, useCallback } from 'react'
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
  images: string[]
  status: string
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [brand, setBrand] = useState('')
  const [transmission, setTransmission] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchVehicles = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '12' })
    if (brand) params.set('brand', brand)
    if (transmission) params.set('transmission', transmission)

    const res = await fetch(`/api/vehicles?${params}`)
    const data = await res.json()
    setVehicles(data.vehicles || [])
    setTotalPages(data.totalPages || 1)
    setLoading(false)
  }, [page, brand, transmission])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">รถยนต์ทั้งหมด</h1>
      <p className="text-gray-500 mb-8">เลือกรถที่ใช่สำหรับคุณ</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="ค้นหายี่ห้อรถ..."
          value={brand}
          onChange={(e) => { setBrand(e.target.value); setPage(1) }}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
        />
        <select
          value={transmission}
          onChange={(e) => { setTransmission(e.target.value); setPage(1) }}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">เกียร์ทั้งหมด</option>
          <option value="automatic">เกียร์ออโต้</option>
          <option value="manual">เกียร์ธรรมดา</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-gray-200 animate-pulse h-72" />
          ))}
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">🚗</p>
          <p className="text-xl">ไม่พบรถที่ค้นหา</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((v) => (
            <VehicleCard key={v._id} vehicle={v} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                p === page ? 'bg-blue-600 text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const fuelLabel: Record<string, string> = { gasoline: 'เบนซิน', diesel: 'ดีเซล', hybrid: 'ไฮบริด', electric: 'ไฟฟ้า' }
  return (
    <Link href={`/vehicles/${vehicle._id}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
      <div className="h-44 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        {vehicle.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={vehicle.images[0]} alt={vehicle.model} className="h-full w-full object-cover" />
        ) : (
          <span className="text-6xl">🚗</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {vehicle.brand} {vehicle.model}
        </h3>
        <p className="text-sm text-gray-400 mb-3">{vehicle.year} • {vehicle.color}</p>
        <div className="flex gap-2 flex-wrap mb-3">
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">{vehicle.seats} ที่นั่ง</span>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            {vehicle.transmission === 'automatic' ? 'ออโต้' : 'ธรรมดา'}
          </span>
          <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
            {fuelLabel[vehicle.fuelType] || vehicle.fuelType}
          </span>
        </div>
        <p className="text-blue-600 font-bold text-lg">
          ฿{vehicle.pricePerDay.toLocaleString()}<span className="text-sm font-normal text-gray-400">/วัน</span>
        </p>
      </div>
    </Link>
  )
}
