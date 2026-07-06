import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { CarouselSlide } from '@/lib/models/CarouselSlide'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const slides = await CarouselSlide.find({ isActive: true }).sort({ order: 1, createdAt: 1 })
  return NextResponse.json({ slides })
}
