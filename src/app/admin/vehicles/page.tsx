'use client'

import { useState, useEffect, useRef } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

interface Vehicle {
  _id: string
  brand: string
  model: string
  year: number
  licensePlate: string
  color: string
  status: 'available' | 'rented' | 'maintenance' | 'unavailable'
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
  isActive: boolean
  location: string
  description: string
  features: string[]
  images: string[]
  seats: number
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric'
  transmission: 'manual' | 'automatic'
}

const emptyForm = {
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  licensePlate: '',
  color: '',
  status: 'available' as Vehicle['status'],
  pricePerDay: 0,
  pricePerWeek: 0,
  pricePerMonth: 0,
  isActive: true,
  location: '',
  description: '',
  features: '',
  images: [] as string[],
  seats: 4,
  fuelType: 'gasoline' as Vehicle['fuelType'],
  transmission: 'automatic' as Vehicle['transmission'],
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: '6px',
  color: '#f9fafb',
  fontFamily: 'Fira Sans, sans-serif',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'Fira Code, monospace',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#6b7280',
  marginBottom: '6px',
  display: 'block',
}

const statusColors: Record<string, string> = {
  available: '#10b981',
  rented: '#F5A623',
  maintenance: '#6366f1',
  unavailable: '#ef4444',
}

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/vehicles')
      const data = await res.json()
      setVehicles(Array.isArray(data) ? data : data.vehicles ?? [])
    } catch {
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVehicles() }, [])

  const openAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (v: Vehicle) => {
    setEditingId(v._id)
    setForm({
      brand: v.brand,
      model: v.model,
      year: v.year,
      licensePlate: v.licensePlate,
      color: v.color ?? '',
      status: v.status,
      pricePerDay: v.pricePerDay,
      pricePerWeek: v.pricePerWeek,
      pricePerMonth: v.pricePerMonth,
      isActive: v.isActive,
      location: v.location,
      description: v.description,
      features: (v.features ?? []).join(', '),
      images: v.images ?? [],
      seats: v.seats,
      fuelType: v.fuelType,
      transmission: v.transmission,
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (data.url) {
          setForm(prev => ({ ...prev, images: [...prev.images, data.url] }))
        }
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const removeImage = (idx: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      licensePlate: form.licensePlate,
      color: form.color,
      status: form.status,
      pricePerDay: Number(form.pricePerDay),
      pricePerWeek: Number(form.pricePerWeek),
      pricePerMonth: Number(form.pricePerMonth),
      isActive: form.isActive,
      location: form.location,
      description: form.description,
      features: form.features.split(',').map(s => s.trim()).filter(Boolean),
      images: form.images,
      seats: Number(form.seats),
      fuelType: form.fuelType,
      transmission: form.transmission,
    }
    try {
      if (editingId) {
        await fetch(`/api/admin/vehicles/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        await fetch('/api/admin/vehicles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      closeModal()
      fetchVehicles()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/vehicles/${id}`, { method: 'DELETE' })
    setDeleteConfirm(null)
    fetchVehicles()
  }

  const field = (key: keyof typeof emptyForm, value: string | number) =>
    setForm(prev => ({ ...prev, [key]: value }))

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080c12' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623', marginBottom: '8px' }}>ฝูงรถ</div>
            <h1 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '28px', fontWeight: 700, color: '#f9fafb', margin: 0, letterSpacing: '-0.02em' }}>รถยนต์</h1>
            <p style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#4b5563', marginTop: '6px' }}>
              {vehicles.length} คันในระบบ
            </p>
          </div>
          <button
            onClick={openAdd}
            style={{ padding: '10px 20px', background: '#F5A623', border: 'none', borderRadius: '8px', color: '#000', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.01em', transition: 'opacity 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            + เพิ่มรถยนต์
          </button>
        </div>

        {/* Table */}
        <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', overflow: 'hidden' }}>
          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 148px', padding: '12px 20px', borderBottom: '1px solid #1f2937' }}>
            {['รถยนต์', 'ปี', 'ทะเบียน', 'สถานะ', 'ใช้งาน', 'ราคา/วัน', 'จัดการ'].map(h => (
              <div key={h} style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4b5563' }}>{h}</div>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#4b5563' }}>กำลังโหลด...</div>
          ) : vehicles.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#4b5563' }}>ไม่พบรถยนต์</div>
          ) : (
            vehicles.map((v, i) => (
              <div
                key={v._id}
                style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 148px', padding: '14px 20px', borderBottom: i < vehicles.length - 1 ? '1px solid #1f2937' : 'none', alignItems: 'center', transition: 'background 0.12s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#111827')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div>
                  <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#f9fafb' }}>{v.brand} {v.model}</div>
                  <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>{v.fuelType} · {v.transmission}</div>
                </div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#9ca3af' }}>{v.year}</div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#9ca3af', letterSpacing: '0.05em' }}>{v.licensePlate}</div>
                <div>
                  <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, color: statusColors[v.status] ?? '#9ca3af', background: `${statusColors[v.status] ?? '#9ca3af'}18`, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.04em' }}>
                    {{ available: 'พร้อมเช่า', rented: 'ถูกเช่า', maintenance: 'ซ่อมบำรุง', unavailable: 'ไม่พร้อม' }[v.status] ?? v.status}
                  </span>
                </div>
                <div>
                  <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, color: v.isActive ? '#10b981' : '#ef4444', background: v.isActive ? '#10b98118' : '#ef444418', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.04em' }}>
                    {v.isActive ? 'ใช้งาน' : 'ปิด'}
                  </span>
                </div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#F5A623' }}>฿{v.pricePerDay.toLocaleString()}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => openEdit(v)}
                    style={{ padding: '5px 12px', background: 'transparent', border: '1px solid #F5A623', borderRadius: '6px', color: '#F5A623', fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.12s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,166,35,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >แก้ไข</button>
                  <button
                    onClick={() => setDeleteConfirm(v._id)}
                    style={{ padding: '5px 12px', background: 'transparent', border: '1px solid #ef4444', borderRadius: '6px', color: '#ef4444', fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.12s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >ลบ</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Delete confirm dialog */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
          <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', padding: '32px', maxWidth: '380px', width: '90%' }}>
            <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '18px', fontWeight: 700, color: '#f9fafb', marginBottom: '10px' }}>ลบรถยนต์?</div>
            <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>การดำเนินการนี้ไม่สามารถย้อนกลับได้</div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '9px 20px', background: 'transparent', border: '1px solid #1f2937', borderRadius: '8px', color: '#9ca3af', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', cursor: 'pointer' }}>ยกเลิก</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '9px 20px', background: '#ef4444', border: 'none', borderRadius: '8px', color: '#fff', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>ลบ</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', padding: '32px', maxWidth: '600px', width: '95%', maxHeight: '85vh', overflowY: 'auto' }}>

            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623', marginBottom: '4px' }}>{editingId ? 'แก้ไข' : 'เพิ่มใหม่'}</div>
                <h2 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '20px', fontWeight: 700, color: '#f9fafb', margin: 0 }}>{editingId ? 'แก้ไขรถยนต์' : 'เพิ่มรถยนต์'}</h2>
              </div>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', color: '#4b5563', fontSize: '22px', cursor: 'pointer', padding: '4px 8px', lineHeight: 1 }}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* brand / model */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>ยี่ห้อ</label>
                  <input style={inputStyle} value={form.brand} onChange={e => field('brand', e.target.value)} required placeholder="เช่น Toyota" />
                </div>
                <div>
                  <label style={labelStyle}>รุ่น</label>
                  <input style={inputStyle} value={form.model} onChange={e => field('model', e.target.value)} required placeholder="เช่น Camry" />
                </div>
              </div>

              {/* year / seats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>ปี</label>
                  <input style={inputStyle} type="number" value={form.year} onChange={e => field('year', e.target.value)} required min={1990} max={2030} />
                </div>
                <div>
                  <label style={labelStyle}>จำนวนที่นั่ง</label>
                  <input style={inputStyle} type="number" value={form.seats} onChange={e => field('seats', e.target.value)} required min={1} max={20} />
                </div>
              </div>

              {/* licensePlate / color */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>ทะเบียนรถ</label>
                  <input style={inputStyle} value={form.licensePlate} onChange={e => field('licensePlate', e.target.value)} required placeholder="กข 1234" />
                </div>
                <div>
                  <label style={labelStyle}>สี</label>
                  <input style={inputStyle} value={form.color} onChange={e => field('color', e.target.value)} placeholder="เช่น ขาว, ดำ" />
                </div>
              </div>

              {/* location */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>สถานที่</label>
                <input style={inputStyle} value={form.location} onChange={e => field('location', e.target.value)} placeholder="เช่น กรุงเทพฯ" />
              </div>

              {/* fuelType / transmission */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>ประเภทเชื้อเพลิง</label>
                  <select style={inputStyle} value={form.fuelType} onChange={e => field('fuelType', e.target.value)}>
                    <option value="gasoline">เบนซิน</option>
                    <option value="diesel">ดีเซล</option>
                    <option value="hybrid">ไฮบริด</option>
                    <option value="electric">ไฟฟ้า</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>ประเภทเกียร์</label>
                  <select style={inputStyle} value={form.transmission} onChange={e => field('transmission', e.target.value)}>
                    <option value="automatic">ออโต้</option>
                    <option value="manual">ธรรมดา</option>
                  </select>
                </div>
              </div>

              {/* prices */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>ราคา / วัน (฿)</label>
                  <input style={inputStyle} type="number" value={form.pricePerDay} onChange={e => field('pricePerDay', e.target.value)} required min={0} />
                </div>
                <div>
                  <label style={labelStyle}>ราคา / สัปดาห์ (฿)</label>
                  <input style={inputStyle} type="number" value={form.pricePerWeek} onChange={e => field('pricePerWeek', e.target.value)} min={0} />
                </div>
                <div>
                  <label style={labelStyle}>ราคา / เดือน (฿)</label>
                  <input style={inputStyle} type="number" value={form.pricePerMonth} onChange={e => field('pricePerMonth', e.target.value)} min={0} />
                </div>
              </div>

              {/* status / isActive */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>สถานะ</label>
                  <select style={inputStyle} value={form.status} onChange={e => field('status', e.target.value)}>
                    <option value="available">พร้อมเช่า</option>
                    <option value="rented">ถูกเช่าแล้ว</option>
                    <option value="maintenance">ซ่อมบำรุง</option>
                    <option value="unavailable">ไม่พร้อมใช้งาน</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>เปิดใช้งาน</label>
                  <div style={{ display: 'flex', alignItems: 'center', height: '42px', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, isActive: !prev.isActive }))}
                      style={{ width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: form.isActive ? '#10b981' : '#374151', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
                    >
                      <span style={{ position: 'absolute', top: '3px', left: form.isActive ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                    </button>
                    <span style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: form.isActive ? '#10b981' : '#6b7280' }}>
                      {form.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                    </span>
                  </div>
                </div>
              </div>

              {/* description */}
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>รายละเอียด</label>
                <textarea
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' } as React.CSSProperties}
                  value={form.description}
                  onChange={e => field('description', e.target.value)}
                  placeholder="รายละเอียดสั้นๆ เกี่ยวกับรถยนต์..."
                />
              </div>

              {/* features */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>คุณสมบัติ (คั่นด้วยเครื่องหมายจุลภาค)</label>
                <input style={inputStyle} value={form.features} onChange={e => field('features', e.target.value)} placeholder="GPS, Bluetooth, หลังคาซันรูฟ, กล้องถอยหลัง" />
              </div>

              {/* images */}
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>รูปภาพ</label>
                {form.images.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    {form.images.map((url, idx) => (
                      <div key={idx} style={{ position: 'relative', width: '60px', height: '60px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #1f2937' }} />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          style={{ position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', border: 'none', color: '#fff', fontSize: '11px', lineHeight: '18px', textAlign: 'center', cursor: 'pointer', padding: 0 }}
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImageUpload} />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #374151', borderRadius: '6px', color: uploading ? '#4b5563' : '#9ca3af', fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', cursor: uploading ? 'not-allowed' : 'pointer', transition: 'all 0.12s' }}
                  onMouseEnter={e => { if (!uploading) { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.color = '#F5A623' } }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.color = uploading ? '#4b5563' : '#9ca3af' }}
                >
                  {uploading ? 'กำลังอัปโหลด...' : '+ อัปโหลดรูปภาพ'}
                </button>
              </div>

              {/* submit */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #1f2937', paddingTop: '20px' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #1f2937', borderRadius: '8px', color: '#9ca3af', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', cursor: 'pointer' }}
                >ยกเลิก</button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ padding: '10px 24px', background: saving ? '#92400e' : '#F5A623', border: 'none', borderRadius: '8px', color: '#000', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', transition: 'opacity 0.15s' }}
                >
                  {saving ? 'กำลังบันทึก...' : editingId ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มรถยนต์'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
