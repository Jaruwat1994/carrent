import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { PaymentMethod } from '@/lib/models/PaymentMethod'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const methods = await PaymentMethod.find({ isActive: true }).sort({ displayOrder: 1 })
    return NextResponse.json({ methods })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
