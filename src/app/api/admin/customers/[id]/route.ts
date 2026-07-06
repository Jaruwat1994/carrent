import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Customer } from '@/lib/models/Customer'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()
    const customer = await Customer.findByIdAndUpdate(id, body, { new: true }).select('-password')
    if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ customer })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
