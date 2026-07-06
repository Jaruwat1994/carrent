import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Customer } from '@/lib/models/Customer'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const customers = await Customer.find({}, '-password').sort({ createdAt: -1 })
    return NextResponse.json({ customers })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
