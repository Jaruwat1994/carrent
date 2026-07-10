import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Rental } from '@/lib/models/Rental'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const transactions = await Rental.find({
      $or: [
        { paymentStatus: { $ne: 'unpaid' } },
        { depositProofUrl: { $exists: true } },
        { fullPaymentProofUrl: { $exists: true } },
      ],
    })
      .populate('vehicleId', 'brand model year licensePlate color images')
      .populate('customerId', 'firstName lastName email phone')
      .sort({ updatedAt: -1 })

    return NextResponse.json({ transactions })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
