import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')
  const protedtedPaths = ['/profile', '/account']
  const isProtectedPath = protedtedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  )

  // 보호된 경로에 접근하려고 할 때 토큰이 없으면 로그인 페이지로 리다이렉트
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/?auth=login', request.url))
  }

  // 이미 로그인된 상태에서 로그인 페이지 접근 시 메인으로 리다이렉트
  if (
    token &&
    request.nextUrl.pathname === '/' &&
    request.nextUrl.searchParams.get('auth') === 'login'
  ) {
    return NextResponse.redirect(new URL('/', request.url))
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
