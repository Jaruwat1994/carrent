'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Profile {
  firstName: string
  lastName: string
  email: string
  phone: string
  idCardNumber: string
  drivingLicenseNumber: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
}

export default function CustomerProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status !== 'authenticated') return
    fetch('/api/customers/profile')
      .then((r) => r.json())
      .then((d) => { setProfile(d.customer); setLoading(false) })
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    const res = await fetch('/api/customers/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
    setSaving(false)
    setMsg(res.ok ? 'บันทึกข้อมูลสำเร็จ' : 'เกิดข้อผิดพลาด')
  }

  if (status === 'loading' || loading) return <div className="text-center py-20 text-gray-400">กำลังโหลด...</div>
  if (!profile) return <div className="text-center py-20 text-gray-500">ไม่พบข้อมูล</div>

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ข้อมูลส่วนตัว</h1>
        <Link href="/customer/dashboard" className="text-sm text-blue-600 hover:underline">← แดชบอร์ด</Link>
      </div>

      {msg && (
        <div className={`px-4 py-3 rounded-lg mb-6 text-sm ${msg.includes('สำเร็จ') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-8 shadow-sm space-y-5">
        <div className="grid grid-cols-2 gap-5">
          {[
            { label: 'ชื่อ', key: 'firstName' },
            { label: 'นามสกุล', key: 'lastName' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type="text"
                value={profile[key as keyof Profile] ?? ''}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
          <input type="email" value={profile.email} disabled
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
          <input type="tel" value={profile.phone ?? ''}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เลขบัตรประชาชน</label>
            <input type="text" value={profile.idCardNumber} disabled
              className="w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เลขใบขับขี่</label>
            <input type="text" value={profile.drivingLicenseNumber} disabled
              className="w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่</label>
          <input type="text" value={profile.address ?? ''}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            placeholder="บ้านเลขที่ ถนน ซอย"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'เมือง/อำเภอ', key: 'city', placeholder: 'กรุงเทพมหานคร' },
            { label: 'จังหวัด', key: 'province', placeholder: 'กรุงเทพมหานคร' },
            { label: 'รหัสไปรษณีย์', key: 'postalCode', placeholder: '10200' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type="text" value={profile[key as keyof Profile] ?? ''}
                onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60">
          {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
        </button>
      </form>
    </div>
  )
}
