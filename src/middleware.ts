import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')
  const { searchParams } = request.nextUrl

  const protedtedPaths = ['/profile', '/account']
  const isProtectedPath = protedtedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  )

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (token && request.nextUrl.pathname === '/?auth=login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (searchParams.get('auth') === 'mypage' && !token) {
    return NextResponse.redirect(new URL('/?auth=login', request.url))
  }
  if (searchParams.get('auth') === 'profile' && !token) {
    return NextResponse.redirect(new URL('/?auth=login', request.url))
  }

  return NextResponse.next()
}

// 로그인 확인 미들웨어
export const config = {
  matcher: [
    '/profile',
    '/profile/:path*',
    '/account',
    '/account/:path*',
    {
      source: '/:path*',
      has: [
        {
          type: 'query',
          key: 'auth', // auth 쿼리 파라미터가 있는 모든 경로
        },
      ],
    },
  ],
}
