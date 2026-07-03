import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Vehicle } from '@/lib/models/Vehicle'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await connectDB()
    const vehicle = await Vehicle.findById(id)
    if (!vehicle) return NextResponse.json({ error: 'ไม่พบรถ' }, { status: 404 })
    return NextResponse.json({ vehicle })
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}
