import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { Admin } from '@/lib/models/Admin'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'fallback-secret')

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบ' }, { status: 400 })

    await connectDB()
    const admin = await Admin.findOne({ email: email.toLowerCase() })
    if (!admin) return NextResponse.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 })

    const isValid = await bcrypt.compare(password, admin.password)
    if (!isValid) return NextResponse.json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }, { status: 401 })

    const token = await new SignJWT({ id: admin._id.toString(), email: admin.email, name: admin.name, role: admin.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .sign(secret)

    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
