import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Rental } from '@/lib/models/Rental'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()
    const { paymentStatus } = body

    if (!['unpaid', 'deposit_paid', 'fully_paid'].includes(paymentStatus)) {
      return NextResponse.json({ error: 'Invalid payment status' }, { status: 400 })
    }

    const rental = await Rental.findByIdAndUpdate(id, { paymentStatus }, { new: true })
    if (!rental) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ rental })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
