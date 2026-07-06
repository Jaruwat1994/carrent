import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { auth } from '@/lib/auth'

const adminSecret = new TextEncoder().encode(process.env.AUTH_SECRET || 'fallback-secret')

async function verifyAdminToken(req: NextRequest) {
  const token = req.cookies.get('admin-token')?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, adminSecret)
    return payload
  } catch {
    return null
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()
    const admin = await verifyAdminToken(req)
    if (!admin) return NextResponse.redirect(new URL('/admin/login', req.url))
    return NextResponse.next()
  }

  const session = await auth()
  const isAuth = !!session
  const protectedPaths = ['/customer', '/booking/create']
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p))

  if (isProtected && !isAuth) {
    const url = new URL('/login', req.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuth && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/customer/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
