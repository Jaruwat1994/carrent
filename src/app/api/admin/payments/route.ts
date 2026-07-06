import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { PaymentMethod } from '@/lib/models/PaymentMethod'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const methods = await PaymentMethod.find({}).sort({ displayOrder: 1, createdAt: -1 })
    return NextResponse.json({ methods })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const method = await PaymentMethod.create(body)
    return NextResponse.json({ method }, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
