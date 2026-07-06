import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { PaymentMethod } from '@/lib/models/PaymentMethod'

export const dynamic = 'force-dynamic'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const method = await PaymentMethod.findByIdAndUpdate(params.id, body, { new: true })
    if (!method) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ method })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    await PaymentMethod.findByIdAndDelete(params.id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
