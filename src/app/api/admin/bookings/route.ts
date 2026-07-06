import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Rental } from '@/lib/models/Rental'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const bookings = await Rental.find({})
      .populate('vehicleId', 'brand model year licensePlate')
      .populate('customerId', 'firstName lastName email phone')
      .sort({ createdAt: -1 })
    return NextResponse.json({ bookings })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
