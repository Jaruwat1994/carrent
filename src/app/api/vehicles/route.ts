import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Vehicle } from '@/lib/models/Vehicle'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)

    const filter: Record<string, unknown> = { isActive: true, status: 'available' }
    if (searchParams.get('brand')) filter.brand = new RegExp(searchParams.get('brand')!, 'i')
    if (searchParams.get('model')) filter.model = new RegExp(searchParams.get('model')!, 'i')
    if (searchParams.get('transmission')) filter.transmission = searchParams.get('transmission')
    if (searchParams.get('seats')) filter.seats = Number(searchParams.get('seats'))

    const page = Number(searchParams.get('page') || '1')
    const limit = Number(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const [vehicles, total] = await Promise.all([
      Vehicle.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Vehicle.countDocuments(filter),
    ])

    return NextResponse.json({ vehicles, total, page, totalPages: Math.ceil(total / limit) })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
