import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Rental } from '@/lib/models/Rental'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const { status } = await req.json()
    const booking = await Rental.findByIdAndUpdate(id, { status }, { new: true })
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ booking })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
