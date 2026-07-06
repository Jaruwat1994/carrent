import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { auth } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import { Rental } from '@/lib/models/Rental'
import { Customer } from '@/lib/models/Customer'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const customer = await Customer.findOne({ email: session.user?.email })
    if (!customer) return NextResponse.json({ error: 'ไม่พบลูกค้า' }, { status: 404 })

    const rental = await Rental.findOne({ _id: id, customerId: customer._id })
    if (!rental) return NextResponse.json({ error: 'ไม่พบการจอง' }, { status: 404 })

    if (rental.status !== 'confirmed') {
      return NextResponse.json({ error: 'การจองต้องได้รับการยืนยันก่อนชำระเงิน' }, { status: 400 })
    }

    const form = await req.formData()
    const type = form.get('type') as string // 'deposit' | 'full'
    const file = form.get('slip') as File | null

    if (!type || !['deposit', 'full'].includes(type)) {
      return NextResponse.json({ error: 'ประเภทการชำระเงินไม่ถูกต้อง' }, { status: 400 })
    }
    if (!file) return NextResponse.json({ error: 'กรุณาแนบสลิปการโอนเงิน' }, { status: 400 })

    const blob = await put(`slips/${rental.rentalCode}-${type}-${Date.now()}`, file, { access: 'public', addRandomSuffix: true })

    if (type === 'deposit') {
      if (rental.paymentStatus !== 'unpaid') {
        return NextResponse.json({ error: 'ชำระมัดจำไปแล้ว' }, { status: 400 })
      }
      rental.depositProofUrl = blob.url
      rental.depositPaidAt = new Date()
      rental.paymentStatus = 'deposit_paid'
    } else {
      rental.fullPaymentProofUrl = blob.url
      rental.fullPaymentPaidAt = new Date()
      rental.paymentStatus = 'fully_paid'
    }

    await rental.save()
    return NextResponse.json({ ok: true, paymentStatus: rental.paymentStatus })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
