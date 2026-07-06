import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Vehicle } from '@/lib/models/Vehicle'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const vehicles = await Vehicle.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ vehicles })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const vehicle = await Vehicle.create(body)
    return NextResponse.json({ vehicle }, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
