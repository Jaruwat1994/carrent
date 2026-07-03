'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '',
    idCardNumber: '', drivingLicenseNumber: '', drivingLicenseExpiry: '',
  })

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน')
      return
    }
    setLoading(true)
    const res = await fetch('/api/customers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'เกิดข้อผิดพลาด'); return }
    router.push('/login?registered=1')
  }

  const Field = ({ label, name, type = 'text', placeholder }: { label: string; name: string; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={form[name as keyof typeof form]}
        onChange={(e) => update(name, e.target.value)}
        required
        placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">สมัครสมาชิก</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">กรอกข้อมูลเพื่อสร้างบัญชีใหม่</p>

          {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="ชื่อ" name="firstName" placeholder="สมชาย" />
              <Field label="นามสกุล" name="lastName" placeholder="ใจดี" />
            </div>
            <Field label="อีเมล" name="email" type="email" placeholder="example@email.com" />
            <Field label="เบอร์โทรศัพท์" name="phone" type="tel" placeholder="08X-XXX-XXXX" />
            <Field label="เลขบัตรประชาชน" name="idCardNumber" placeholder="X-XXXX-XXXXX-XX-X" />
            <Field label="เลขใบขับขี่" name="drivingLicenseNumber" placeholder="XXXXXXXXXXXXXXX" />
            <Field label="วันหมดอายุใบขับขี่" name="drivingLicenseExpiry" type="date" />
            <Field label="รหัสผ่าน" name="password" type="password" placeholder="อย่างน้อย 8 ตัวอักษร" />
            <Field label="ยืนยันรหัสผ่าน" name="confirmPassword" type="password" placeholder="••••••••" />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            มีบัญชีอยู่แล้ว?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">เข้าสู่ระบบ</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
