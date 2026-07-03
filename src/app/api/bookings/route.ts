import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { Rental } from '@/lib/models/Rental'
import { Vehicle } from '@/lib/models/Vehicle'
import { Customer } from '@/lib/models/Customer'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบก่อน' }, { status: 401 })

    await connectDB()
    const body = await req.json()
    const { vehicleId, startDate, endDate, pickupLocation, returnLocation, notes } = body

    const vehicle = await Vehicle.findById(vehicleId)
    if (!vehicle || vehicle.status !== 'available') {
      return NextResponse.json({ error: 'รถไม่ว่างในช่วงเวลาที่เลือก' }, { status: 400 })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    if (days < 1) return NextResponse.json({ error: 'ระยะเวลาเช่าไม่ถูกต้อง' }, { status: 400 })

    // Check no overlapping rentals
    const overlap = await Rental.findOne({
      vehicleId,
      status: { $in: ['pending', 'confirmed', 'active'] },
      $or: [{ startDate: { $lte: end }, endDate: { $gte: start } }],
    })
    if (overlap) return NextResponse.json({ error: 'รถไม่ว่างในช่วงเวลาที่เลือก' }, { status: 400 })

    const customer = await Customer.findOne({ email: session.user?.email })
    if (!customer) return NextResponse.json({ error: 'ไม่พบข้อมูลลูกค้า' }, { status: 404 })

    let totalPrice = 0
    if (days >= 30) totalPrice = Math.ceil(days / 30) * vehicle.pricePerMonth
    else if (days >= 7) totalPrice = Math.ceil(days / 7) * vehicle.pricePerWeek
    else totalPrice = days * vehicle.pricePerDay

    const rentalCode = `BK-${new Date().getFullYear()}-${nanoid(8).toUpperCase()}`
    const rental = await Rental.create({
      rentalCode,
      vehicleId,
      customerId: customer._id,
      startDate: start,
      endDate: end,
      totalPrice,
      deposit: totalPrice * 0.3,
      pickupLocation,
      returnLocation,
      notes,
      status: 'pending',
    })

    return NextResponse.json({ rental, rentalCode }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const customer = await Customer.findOne({ email: session.user?.email })
    if (!customer) return NextResponse.json({ rentals: [] })

    const rentals = await Rental.find({ customerId: customer._id })
      .populate('vehicleId', 'brand model year licensePlate images')
      .sort({ createdAt: -1 })

    return NextResponse.json({ rentals })
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}
