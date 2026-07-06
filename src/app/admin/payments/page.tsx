'use client'

import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, CreditCard, Building2 } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

interface PaymentMethod {
  _id: string
  type: 'bank_transfer' | 'promptpay'
  bankName?: string
  accountNumber: string
  accountName: string
  qrCodeUrl?: string
  isActive: boolean
  displayOrder: number
}

type FormState = {
  type: 'bank_transfer' | 'promptpay'
  bankName: string
  accountNumber: string
  accountName: string
  qrCodeUrl: string
  isActive: boolean
  displayOrder: number
}

const emptyForm: FormState = {
  type: 'bank_transfer',
  bankName: '',
  accountNumber: '',
  accountName: '',
  qrCodeUrl: '',
  isActive: true,
  displayOrder: 0,
}

export default function AdminPaymentsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  const load = () => {
    fetch('/api/admin/payments')
      .then((r) => r.json())
      .then((d) => { setMethods(d.methods); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditId(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (m: PaymentMethod) => {
    setEditId(m._id)
    setForm({
      type: m.type,
      bankName: m.bankName ?? '',
      accountNumber: m.accountNumber,
      accountName: m.accountName,
      qrCodeUrl: m.qrCodeUrl ?? '',
      isActive: m.isActive,
      displayOrder: m.displayOrder,
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    const payload = {
      type: form.type,
      bankName: form.type === 'bank_transfer' ? form.bankName : undefined,
      accountNumber: form.accountNumber,
      accountName: form.accountName,
      qrCodeUrl: form.qrCodeUrl || undefined,
      isActive: form.isActive,
      displayOrder: form.displayOrder,
    }

    if (editId) {
      await fetch(`/api/admin/payments/${editId}`, { method: 'PATCH', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
    } else {
      await fetch('/api/admin/payments', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
    }
    setShowModal(false)
    load()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('ต้องการลบช่องทางนี้?')) return
    await fetch(`/api/admin/payments/${id}`, { method: 'DELETE' })
    load()
  }

  if (loading) return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080c12' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px' }}>
        <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#6b7280' }}>กำลังโหลด...</span>
      </main>
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080c12' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', overflowY: 'auto' }}>
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '24px', fontWeight: 700, color: '#f9fafb', marginBottom: '4px' }}>จัดการช่องทางชำระเงิน</h1>
          <p style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#6b7280' }}>บัญชีธนาคารและ PromptPay</p>
        </div>
        <button onClick={openNew} style={{ padding: '10px 18px', background: '#F5A623', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#000' }}>
          <Plus size={16} />
          เพิ่มช่องทาง
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1f2937', background: '#161b22' }}>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280' }}>ประเภท</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280' }}>ธนาคาร</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280' }}>เลขบัญชี</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280' }}>ชื่อบัญชี</th>
              <th style={{ padding: '14px 16px', textAlign: 'center', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280' }}>สถานะ</th>
              <th style={{ padding: '14px 16px', textAlign: 'center', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280' }}>ลำดับ</th>
              <th style={{ padding: '14px 16px', width: '100px' }} />
            </tr>
          </thead>
          <tbody>
            {methods.map((m) => (
              <tr key={m._id} style={{ borderBottom: '1px solid #1f2937' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {m.type === 'bank_transfer' ? <Building2 size={16} color="#6b7280" /> : <CreditCard size={16} color="#6b7280" />}
                    <span style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#f9fafb' }}>
                      {m.type === 'bank_transfer' ? 'โอนธนาคาร' : 'PromptPay'}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#9ca3af' }}>{m.bankName || '-'}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#f9fafb' }}>{m.accountNumber}</td>
                <td style={{ padding: '14px 16px', fontFamily: 'Fira Sans, sans-serif', fontSize: '13px', color: '#f9fafb' }}>{m.accountName}</td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', background: m.isActive ? 'rgba(110,224,138,0.12)' : 'rgba(239,68,68,0.12)', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 700, color: m.isActive ? '#6EE08A' : '#EF4444' }}>
                    {m.isActive ? 'เปิด' : 'ปิด'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center', fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#9ca3af' }}>{m.displayOrder}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                    <button onClick={() => openEdit(m)} style={{ padding: '6px', background: 'transparent', border: '1px solid #1f2937', borderRadius: '6px', cursor: 'pointer' }}>
                      <Pencil size={14} color="#6b7280" />
                    </button>
                    <button onClick={() => handleDelete(m._id)} style={{ padding: '6px', background: 'transparent', border: '1px solid #1f2937', borderRadius: '6px', cursor: 'pointer' }}>
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {methods.length === 0 && (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#6b7280' }}>ยังไม่มีช่องทางชำระเงิน</span>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '24px' }} onClick={() => setShowModal(false)}>
          <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', padding: '28px', width: '100%', maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '20px', fontWeight: 700, color: '#f9fafb', marginBottom: '20px' }}>{editId ? 'แก้ไข' : 'เพิ่ม'}ช่องทางชำระเงิน</h2>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '6px' }}>ประเภท</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'bank_transfer' | 'promptpay' })} style={{ width: '100%', padding: '10px 12px', background: '#161b22', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px' }}>
                  <option value="bank_transfer">โอนธนาคาร</option>
                  <option value="promptpay">PromptPay</option>
                </select>
              </div>

              {form.type === 'bank_transfer' && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '6px' }}>ธนาคาร</label>
                  <input type="text" value={form.bankName} onChange={(e) => setForm({ ...form, bankName: e.target.value })} style={{ width: '100%', padding: '10px 12px', background: '#161b22', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px' }} />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '6px' }}>เลขบัญชี</label>
                <input type="text" value={form.accountNumber} onChange={(e) => setForm({ ...form, accountNumber: e.target.value })} required style={{ width: '100%', padding: '10px 12px', background: '#161b22', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb', fontFamily: 'Fira Code, monospace', fontSize: '14px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '6px' }}>ชื่อบัญชี</label>
                <input type="text" value={form.accountName} onChange={(e) => setForm({ ...form, accountName: e.target.value })} required style={{ width: '100%', padding: '10px 12px', background: '#161b22', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '6px' }}>QR Code URL (optional)</label>
                <input type="text" value={form.qrCodeUrl} onChange={(e) => setForm({ ...form, qrCodeUrl: e.target.value })} style={{ width: '100%', padding: '10px 12px', background: '#161b22', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb', fontFamily: 'Fira Code, monospace', fontSize: '13px' }} placeholder="https://..." />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '6px' }}>ลำดับแสดง</label>
                  <input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value) || 0 })} style={{ width: '100%', padding: '10px 12px', background: '#161b22', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb', fontFamily: 'Fira Code, monospace', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '6px' }}>สถานะ</label>
                  <select value={form.isActive ? 'active' : 'inactive'} onChange={(e) => setForm({ ...form, isActive: e.target.value === 'active' })} style={{ width: '100%', padding: '10px 12px', background: '#161b22', border: '1px solid #1f2937', borderRadius: '8px', color: '#f9fafb', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px' }}>
                    <option value="active">เปิดใช้งาน</option>
                    <option value="inactive">ปิดใช้งาน</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '12px', background: 'transparent', border: '1px solid #1f2937', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#9ca3af' }}>
                ยกเลิก
              </button>
              <button onClick={handleSave} style={{ padding: '12px', background: '#F5A623', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#000' }}>
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      </main>
    </div>
  )
}
