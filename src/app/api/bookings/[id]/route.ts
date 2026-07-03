import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { Rental } from '@/lib/models/Rental'
import { Customer } from '@/lib/models/Customer'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const customer = await Customer.findOne({ email: session.user?.email })
    if (!customer) return NextResponse.json({ error: 'ไม่พบลูกค้า' }, { status: 404 })

    const rental = await Rental.findOne({ _id: id, customerId: customer._id }).populate(
      'vehicleId',
      'brand model year images'
    )
    if (!rental) return NextResponse.json({ error: 'ไม่พบการจอง' }, { status: 404 })

    return NextResponse.json({ rental })
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const customer = await Customer.findOne({ email: session.user?.email })
    if (!customer) return NextResponse.json({ error: 'ไม่พบลูกค้า' }, { status: 404 })

    const rental = await Rental.findOne({ _id: id, customerId: customer._id })
    if (!rental) return NextResponse.json({ error: 'ไม่พบการจอง' }, { status: 404 })

    const { action } = await req.json()
    if (action !== 'cancel') return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

    if (!['pending', 'confirmed'].includes(rental.status)) {
      return NextResponse.json({ error: 'ไม่สามารถยกเลิกการจองนี้ได้' }, { status: 400 })
    }

    const hoursUntilPickup = (rental.startDate.getTime() - Date.now()) / (1000 * 60 * 60)
    if (hoursUntilPickup < 48) {
      return NextResponse.json({ error: 'ต้องยกเลิกก่อนวันรับรถอย่างน้อย 48 ชั่วโมง' }, { status: 400 })
    }

    rental.status = 'cancelled'
    await rental.save()

    return NextResponse.json({ message: 'ยกเลิกการจองสำเร็จ' })
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}
