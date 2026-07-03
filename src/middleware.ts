import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl
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
