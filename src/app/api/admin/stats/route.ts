import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Vehicle } from '@/lib/models/Vehicle'
import { Customer } from '@/lib/models/Customer'
import { Rental } from '@/lib/models/Rental'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectDB()
    const [vehicles, bookings, customers, revenueData] = await Promise.all([
      Vehicle.countDocuments({ isActive: true }),
      Rental.countDocuments({}),
      Customer.countDocuments({}),
      Rental.aggregate([
        { $match: { status: { $in: ['confirmed', 'active', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),
    ])
    return NextResponse.json({ vehicles, bookings, customers, revenue: revenueData[0]?.total ?? 0 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
