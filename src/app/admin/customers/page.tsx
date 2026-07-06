'use client'

import { useState, useEffect, useMemo } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

interface Customer {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'blacklisted'
  createdAt: string
  idCardNumber: string
  drivingLicenseNumber: string
  address: string
  city: string
  province: string
}

const statusColors: Record<Customer['status'], { color: string; bg: string }> = {
  active:      { color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
  inactive:    { color: '#6b7280', bg: 'rgba(107,114,128,0.08)' },
  blacklisted: { color: '#f87171', bg: 'rgba(248,113,113,0.08)' },
}

const allStatuses: Customer['status'][] = ['active', 'inactive', 'blacklisted']

const statusLabels: Record<Customer['status'], string> = {
  active: 'ใช้งาน',
  inactive: 'ไม่ใช้งาน',
  blacklisted: 'บัญชีดำ',
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })

function DetailModal({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  const s = statusColors[customer.status]

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: '#0d1117', border: '1px solid #1f2937', borderRadius: '16px',
        width: '100%', maxWidth: '560px', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px', borderBottom: '1px solid #1f2937',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623',
              marginBottom: '6px',
            }}>
              ข้อมูลลูกค้า
            </div>
            <div style={{
              fontFamily: 'Fira Sans, sans-serif', fontSize: '20px', fontWeight: 700,
              color: '#f9fafb', letterSpacing: '-0.01em',
            }}>
              {customer.firstName} {customer.lastName}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: '1px solid #1f2937', borderRadius: '8px',
              color: '#6b7280', cursor: 'pointer', padding: '6px 12px',
              fontFamily: 'Fira Code, monospace', fontSize: '12px', transition: 'all 0.15s',
              marginTop: '2px',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.color = '#9ca3af' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.color = '#6b7280' }}
          >
            ปิด
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 28px 28px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{
              padding: '4px 12px', borderRadius: '6px',
              fontFamily: 'Fira Code, monospace', fontSize: '11px', fontWeight: 600,
              background: s.bg, color: s.color,
            }}>
              {statusLabels[customer.status]}
            </span>
          </div>

          {([
            { label: 'อีเมล',           value: customer.email },
            { label: 'โทรศัพท์',        value: customer.phone || '—' },
            { label: 'เลขบัตรประชาชน',  value: customer.idCardNumber || '—' },
            { label: 'ใบขับขี่',         value: customer.drivingLicenseNumber || '—' },
            { label: 'ที่อยู่',           value: customer.address || '—' },
            { label: 'เมือง',            value: customer.city || '—' },
            { label: 'จังหวัด',          value: customer.province || '—' },
            { label: 'วันที่สมัคร',      value: fmt(customer.createdAt) },
          ] as { label: string; value: string }[]).map(({ label, value }) => (
            <div key={label} style={{
              display: 'flex', gap: '16px', padding: '10px 0',
              borderBottom: '1px solid #111827',
            }}>
              <div style={{
                fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 500,
                letterSpacing: '0.06em', color: '#4b5563', minWidth: '148px',
                textTransform: 'uppercase', paddingTop: '1px',
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#d1d5db',
                flex: 1, wordBreak: 'break-all',
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')
  const [selected, setSelected]   = useState<Customer | null>(null)

  useEffect(() => {
    fetch('/api/admin/customers')
      .then(r => r.json())
      .then(d => { setCustomers(d.customers || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleStatusChange = async (id: string, status: Customer['status']) => {
    await fetch(`/api/admin/customers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setCustomers(prev => prev.map(c => c._id === id ? { ...c, status } : c))
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return customers
    return customers.filter(c =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    )
  }, [customers, search])

  const totalCount       = customers.length
  const activeCount      = customers.filter(c => c.status === 'active').length
  const blacklistedCount = customers.filter(c => c.status === 'blacklisted').length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080c12' }}>
      <AdminSidebar />

      <main style={{ flex: 1, marginLeft: '240px', padding: '40px 48px', overflowY: 'auto' }}>

        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5A623',
            marginBottom: '8px',
          }}>
            บัญชีผู้ใช้
          </div>
          <h1 style={{
            fontFamily: 'Fira Sans, sans-serif', fontSize: '28px', fontWeight: 700,
            color: '#f9fafb', margin: 0, letterSpacing: '-0.02em',
          }}>
            ลูกค้า
          </h1>
          <p style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#4b5563', marginTop: '6px' }}>
            จัดการบัญชีลูกค้าและสถานะ
          </p>
        </div>

        {/* Stats Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {[
            { label: 'ทั้งหมด',  value: totalCount,       color: '#f9fafb' },
            { label: 'ใช้งาน',   value: activeCount,      color: '#34d399' },
            { label: 'บัญชีดำ',  value: blacklistedCount, color: '#f87171' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#0d1117', border: '1px solid #1f2937', borderRadius: '10px',
              padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px',
              minWidth: '140px',
            }}>
              <div style={{
                fontFamily: 'Fira Code, monospace', fontSize: '28px', fontWeight: 700,
                color: stat.color, letterSpacing: '-0.02em', lineHeight: 1,
              }}>
                {loading ? '—' : stat.value}
              </div>
              <div style={{
                fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4b5563',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="ค้นหาด้วยชื่อหรืออีเมล..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', maxWidth: '420px',
              padding: '10px 16px', background: '#0d1117',
              border: '1px solid #1f2937', borderRadius: '8px',
              color: '#f9fafb', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px',
              outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#1f2937' }}
          />
        </div>

        {/* Table Card */}
        <div style={{ background: '#0d1117', border: '1px solid #1f2937', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{
            padding: '16px 24px', borderBottom: '1px solid #1f2937',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4b5563', letterSpacing: '0.05em' }}>
              ลูกค้าทั้งหมด
            </span>
            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#374151' }}>
              {loading ? '...' : `${filtered.length} รายการ`}
            </span>
          </div>

          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', fontFamily: 'Fira Code, monospace', fontSize: '13px', color: '#374151' }}>
              กำลังโหลด...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '64px', textAlign: 'center', fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', color: '#374151' }}>
              {search ? 'ไม่พบลูกค้าที่ค้นหา' : 'ไม่พบลูกค้าในระบบ'}
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #1f2937' }}>
                    {['ชื่อ', 'อีเมล', 'โทรศัพท์', 'สถานะ', 'วันที่สมัคร', 'จัดการ'].map(h => (
                      <th key={h} style={{
                        padding: '12px 20px', textAlign: 'left',
                        fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600,
                        letterSpacing: '0.1em', textTransform: 'uppercase', color: '#374151',
                        whiteSpace: 'nowrap',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => {
                    const s = statusColors[c.status] ?? { color: '#6b7280', bg: 'transparent' }
                    return (
                      <tr
                        key={c._id}
                        style={{ borderBottom: i < filtered.length - 1 ? '1px solid #111827' : 'none', transition: 'background 0.1s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#0a0f16' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                      >
                        {/* Name */}
                        <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontFamily: 'Fira Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#f9fafb' }}>
                            {c.firstName} {c.lastName}
                          </div>
                        </td>

                        {/* Email */}
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#9ca3af' }}>
                            {c.email}
                          </div>
                        </td>

                        {/* Phone */}
                        <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '12px', color: '#6b7280' }}>
                            {c.phone || '—'}
                          </div>
                        </td>

                        {/* Status badge */}
                        <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '6px',
                            fontFamily: 'Fira Code, monospace', fontSize: '10px', fontWeight: 600,
                            background: s.bg, color: s.color,
                          }}>
                            {statusLabels[c.status]}
                          </span>
                        </td>

                        {/* Joined */}
                        <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '11px', color: '#4b5563' }}>
                            {fmt(c.createdAt)}
                          </div>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 20px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Inline status dropdown */}
                            <select
                              value={c.status}
                              onChange={e => handleStatusChange(c._id, e.target.value as Customer['status'])}
                              style={{
                                padding: '5px 10px', background: '#111827',
                                border: '1px solid #1f2937', borderRadius: '6px',
                                color: '#9ca3af', fontFamily: 'Fira Code, monospace',
                                fontSize: '11px', cursor: 'pointer', outline: 'none',
                              }}
                            >
                              {allStatuses.map(st => (
                                <option key={st} value={st}>{statusLabels[st]}</option>
                              ))}
                            </select>

                            {/* View Detail */}
                            <button
                              onClick={() => setSelected(c)}
                              style={{
                                padding: '5px 14px', background: 'transparent',
                                border: '1px solid #1f2937', borderRadius: '6px',
                                color: '#9ca3af', fontFamily: 'Fira Sans, sans-serif',
                                fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap',
                                transition: 'all 0.15s',
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)'
                                e.currentTarget.style.color = '#F5A623'
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.borderColor = '#1f2937'
                                e.currentTarget.style.color = '#9ca3af'
                              }}
                            >
                              ดูรายละเอียด
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {selected && (
        <DetailModal customer={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
