import React from 'react'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  style?: React.CSSProperties
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 8, style }: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  )
}

export function SkeletonCard() {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
      <Skeleton height={180} borderRadius={0} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Skeleton height={18} width="60%" />
        <Skeleton height={13} width="40%" />
        <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
          <Skeleton height={22} width={60} borderRadius={20} />
          <Skeleton height={22} width={60} borderRadius={20} />
          <Skeleton height={22} width={60} borderRadius={20} />
        </div>
        <Skeleton height={28} width="50%" style={{ marginTop: '8px' }} />
      </div>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', borderBottom: '1px solid #111827' }}>
      <Skeleton height={14} width="30%" />
      <Skeleton height={14} width="15%" />
      <Skeleton height={14} width="20%" />
      <Skeleton height={22} width={70} borderRadius={6} />
      <Skeleton height={22} width={50} borderRadius={6} />
    </div>
  )
}

export function SkeletonText({ lines = 3, gap = 8 }: { lines?: number; gap?: number }) {
  const widths = ['100%', '80%', '60%', '90%', '70%']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={14} width={widths[i % widths.length]} />
      ))}
    </div>
  )
}
