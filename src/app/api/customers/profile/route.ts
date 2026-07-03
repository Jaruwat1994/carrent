import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { Customer } from '@/lib/models/Customer'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const customer = await Customer.findOne({ email: session.user?.email }).select('-password')
    if (!customer) return NextResponse.json({ error: 'ไม่พบข้อมูล' }, { status: 404 })
    return NextResponse.json({ customer })
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    await connectDB()
    const { firstName, lastName, phone, address, city, province, postalCode } = await req.json()
    const customer = await Customer.findOneAndUpdate(
      { email: session.user?.email },
      { firstName, lastName, phone, address, city, province, postalCode },
      { new: true }
    ).select('-password')
    return NextResponse.json({ customer })
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}
