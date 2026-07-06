import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { jwtVerify } from 'jose'

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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()
    const admin = await verifyAdminToken(req)
    if (!admin) return NextResponse.redirect(new URL('/admin/login', req.url))
    return NextResponse.next()
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  const isAuth = !!token
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
