import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { Customer } from '@/lib/models/Customer'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const { firstName, lastName, email, phone, password, idCardNumber, drivingLicenseNumber, drivingLicenseExpiry } = body

    if (!firstName || !lastName || !email || !phone || !password || !idCardNumber || !drivingLicenseNumber) {
      return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 })
    }

    const exists = await Customer.findOne({ $or: [{ email }, { idCardNumber }, { drivingLicenseNumber }] })
    if (exists) {
      return NextResponse.json({ error: 'อีเมล เลขบัตรประชาชน หรือใบขับขี่นี้ถูกใช้แล้ว' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const customer = await Customer.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: hashed,
      idCardNumber,
      drivingLicenseNumber,
      drivingLicenseExpiry: drivingLicenseExpiry ? new Date(drivingLicenseExpiry) : undefined,
    })

    return NextResponse.json(
      { message: 'ลงทะเบียนสำเร็จ', id: customer._id.toString() },
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }, { status: 500 })
  }
}
