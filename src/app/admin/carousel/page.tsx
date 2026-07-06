'use client'

import { useState, useEffect, useRef } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import Image from 'next/image'

interface Slide {
  _id: string
  title: string
  subtitle: string
  imageUrl: string
  priceLabel: string
  order: number
  isActive: boolean
}

const empty = (): Omit<Slide, '_id'> => ({
  title: '', subtitle: '', imageUrl: '', priceLabel: '', order: 0, isActive: true,
})

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', background: '#111827',
  border: '1px solid #1f2937', borderRadius: '6px', color: '#f9fafb',
  fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600,
  letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#6b7280',
  marginBottom: '6px', display: 'block',
}

export default function AdminCarouselPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(empty())
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchSlides = async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/carousel')
      const d = await r.json()
      setSlides(d.slides ?? [])
    } catch { setSlides([]) } finally { setLoading(false) }
  }

  useEffect(() => { fetchSlides() }, [])

  const openAdd = () => { setEditingId(null); setForm(empty()); setModalOpen(true) }
  const openEdit = (s: Slide) => {
    setEditingId(s._id)
    setForm({ title: s.title, subtitle: s.subtitle, imageUrl: s.imageUrl, priceLabel: s.priceLabel, order: s.order, isActive: s.isActive })
    setModalOpen(true)
  }
  const closeModal = () => { setModalOpen(false); setEditingId(null); setForm(empty()) }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('file', file)
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await r.json()
      if (d.url) setForm(prev => ({ ...prev, imageUrl: d.url }))
    } finally { setUploading(false); if (fileRef.current) fileRef.current.value = '' }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        await fetch(`/api/admin/carousel/${editingId}`, {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
        })
      } else {
        await fetch('/api/admin/carousel', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
        })
      }
      closeModal(); fetchSlides()
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/carousel/${id}`, { method: 'DELETE' })
    setDeleteConfirm(null); fetchSlides()
  }

  const toggleActive = async (s: Slide) => {
    await fetch(`/api/admin/carousel/${s._id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !s.isActive }),
    })
    fetchSlides()
  }

  const field = (k: keyof typeof form, v: string | number | boolean) =>
    setForm(prev => ({ ...prev, [k]: v }))

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080c12' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623', marginBottom: '8px' }}>หน้าแรก</div>
            <h1 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '28px', fontWeight: 700, color: '#f9fafb', margin: 0, letterSpacing: '-0.02em' }}>Carousel Slider</h1>
            <p style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#4b5563', marginTop: '6px' }}>{slides.length} สไลด์ในระบบ</p>
          </div>
          <button
            onClick={openAdd}
            style={{ padding: '10px 20px', background: '#F5A623', border: 'none', borderRadius: '8px', color: '#000', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >+ เพิ่มสไลด์</button>
        </div>

        {/* Slides grid */}
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center', fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#4b5563' }}>กำลังโหลด...</div>
        ) : slides.length === 0 ? (
          <div style={{ padding: '80px', textAlign: 'center', background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px' }}>
            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '32px', color: '#1f2937', marginBottom: '12px' }}>◎</div>
            <p style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '15px', color: '#4b5563' }}>ยังไม่มีสไลด์ กด <span style={{ color: '#F5A623' }}>+ เพิ่มสไลด์</span> เพื่อเริ่มต้น</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {slides.map((s) => (
              <div key={s._id} style={{ background: '#0d1117', border: `1px solid ${s.isActive ? '#1f2937' : '#0f1419'}`, borderRadius: '12px', overflow: 'hidden', opacity: s.isActive ? 1 : 0.55, transition: 'all 0.2s' }}>
                {/* Preview */}
                <div style={{ height: '160px', background: '#111827', position: 'relative', overflow: 'hidden' }}>
                  {s.imageUrl ? (
                    s.imageUrl.endsWith('.svg') || s.imageUrl.startsWith('/') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.imageUrl} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Image src={s.imageUrl} alt={s.title} fill style={{ objectFit: 'cover' }} />
                    )
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#374151' }}>ไม่มีรูปภาพ</div>
                  )}
                  <div style={{ position: 'absolute', top: '8px', right: '8px', padding: '3px 8px', borderRadius: '4px', background: s.isActive ? 'rgba(16,185,129,0.15)' : 'rgba(107,114,128,0.15)', border: `1px solid ${s.isActive ? 'rgba(16,185,129,0.3)' : 'rgba(107,114,128,0.3)'}`, fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, color: s.isActive ? '#10b981' : '#6b7280' }}>
                    {s.isActive ? 'เปิด' : 'ปิด'}
                  </div>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(13,13,20,0.8)', fontFamily: 'Fira Code, monospace', fontSize: '10px', color: '#F5A623' }}>#{s.order}</div>
                </div>

                {/* Info */}
                <div style={{ padding: '16px' }}>
                  <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '15px', fontWeight: 700, color: '#f9fafb', marginBottom: '4px' }}>{s.title || <span style={{ color: '#374151' }}>ไม่มีชื่อ</span>}</div>
                  {s.subtitle && <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', color: '#4b5563', marginBottom: '4px' }}>{s.subtitle}</div>}
                  {s.priceLabel && <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#F5A623', fontWeight: 700 }}>{s.priceLabel}</div>}

                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                    <button onClick={() => openEdit(s)} style={{ flex: 1, padding: '7px', background: 'transparent', border: '1px solid #F5A623', borderRadius: '6px', color: '#F5A623', fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.12s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,166,35,0.1)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >แก้ไข</button>
                    <button onClick={() => toggleActive(s)} style={{ flex: 1, padding: '7px', background: 'transparent', border: `1px solid ${s.isActive ? '#6b7280' : '#10b981'}`, borderRadius: '6px', color: s.isActive ? '#6b7280' : '#10b981', fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.12s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >{s.isActive ? 'ปิดใช้' : 'เปิดใช้'}</button>
                    <button onClick={() => setDeleteConfirm(s._id)} style={{ padding: '7px 12px', background: 'transparent', border: '1px solid #ef4444', borderRadius: '6px', color: '#ef4444', fontFamily: 'Fira Sans, sans-serif', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.12s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >ลบ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
          <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', padding: '32px', maxWidth: '360px', width: '90%' }}>
            <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '18px', fontWeight: 700, color: '#f9fafb', marginBottom: '10px' }}>ลบสไลด์?</div>
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
          <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', padding: '32px', maxWidth: '540px', width: '95%', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623', marginBottom: '4px' }}>{editingId ? 'แก้ไข' : 'เพิ่มใหม่'}</div>
                <h2 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '20px', fontWeight: 700, color: '#f9fafb', margin: 0 }}>{editingId ? 'แก้ไขสไลด์' : 'เพิ่มสไลด์ใหม่'}</h2>
              </div>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', color: '#4b5563', fontSize: '22px', cursor: 'pointer', padding: '4px 8px', lineHeight: 1 }}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>ชื่อสไลด์ *</label>
                <input style={inputStyle} value={form.title} onChange={e => field('title', e.target.value)} required placeholder="เช่น SUV พรีเมียม" />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>คำอธิบาย</label>
                <input style={inputStyle} value={form.subtitle} onChange={e => field('subtitle', e.target.value)} placeholder="เช่น นั่งสบาย 7 ที่นั่ง" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>ป้ายราคา</label>
                  <input style={inputStyle} value={form.priceLabel} onChange={e => field('priceLabel', e.target.value)} placeholder="เช่น ฿1,200/วัน" />
                </div>
                <div>
                  <label style={labelStyle}>ลำดับ</label>
                  <input style={inputStyle} type="number" value={form.order} onChange={e => field('order', Number(e.target.value))} min={0} />
                </div>
              </div>

              {/* Image */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>รูปภาพ</label>
                {form.imageUrl && (
                  <div style={{ marginBottom: '10px', borderRadius: '8px', overflow: 'hidden', height: '120px', background: '#111827' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.imageUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input style={{ ...inputStyle, flex: 1 }} value={form.imageUrl} onChange={e => field('imageUrl', e.target.value)} placeholder="URL รูปภาพ หรืออัปโหลด" />
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                    style={{ padding: '10px 14px', background: 'transparent', border: '1px solid #374151', borderRadius: '6px', color: uploading ? '#4b5563' : '#9ca3af', fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', transition: 'all 0.12s' }}
                    onMouseEnter={e => { if (!uploading) { e.currentTarget.style.borderColor = '#F5A623'; e.currentTarget.style.color = '#F5A623' } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.color = uploading ? '#4b5563' : '#9ca3af' }}
                  >{uploading ? 'กำลังอัปโหลด...' : 'อัปโหลด'}</button>
                </div>
              </div>

              {/* Active toggle */}
              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button type="button" onClick={() => field('isActive', !form.isActive)}
                  style={{ width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: form.isActive ? '#10b981' : '#374151', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                  <span style={{ position: 'absolute', top: '3px', left: form.isActive ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                </button>
                <span style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: form.isActive ? '#10b981' : '#6b7280' }}>{form.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</span>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid #1f2937', paddingTop: '20px' }}>
                <button type="button" onClick={closeModal} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #1f2937', borderRadius: '8px', color: '#9ca3af', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', cursor: 'pointer' }}>ยกเลิก</button>
                <button type="submit" disabled={saving} style={{ padding: '10px 24px', background: saving ? '#92400e' : '#F5A623', border: 'none', borderRadius: '8px', color: '#000', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
                  {saving ? 'กำลังบันทึก...' : editingId ? 'บันทึก' : 'เพิ่มสไลด์'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
