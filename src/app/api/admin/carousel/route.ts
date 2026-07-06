import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { CarouselSlide } from '@/lib/models/CarouselSlide'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const slides = await CarouselSlide.find({}).sort({ order: 1, createdAt: 1 })
  return NextResponse.json({ slides })
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const slide = await CarouselSlide.create(body)
    return NextResponse.json({ slide }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }
}
