import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // API 요청 처리
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const accessToken = request.cookies.get('access_token')?.value

    // API 인증이 필요한 엔드포인트 처리
    if (request.nextUrl.pathname.startsWith('/api/notifications')) {
      if (!accessToken) {
        return new NextResponse(
          JSON.stringify({ message: 'Authentication required!' }),
          { status: 401 },
        )
      }

      const response = NextResponse.next()
      response.headers.set('Authorization', `Bearer ${accessToken}`)
      // CORS 헤더 추가
      response.headers.set('Access-Control-Allow-Credentials', 'true')
      response.headers.set('Access-Control-Allow-Headers', 'Authorization')

      return response
    }
  }

  // 기존 페이지 라우팅 처리
  const token = request.cookies.get('accessToken')?.value
  // 현재 URL에서 auth 쿼리 파라미터 확인
  const authParam = request.nextUrl.searchParams.get('auth')

  // auth 쿼리 파라미터가 없는 경우는 체크하지 않음
  if (!authParam) {
    return NextResponse.next()
  }
  const protectedAuthParams = ['mypage', 'profile', 'account']
  const isProtectedAuth = protectedAuthParams.includes(authParam)

  // 보호된 auth 파라미터 접근 시 토큰 체크
  if (isProtectedAuth && !token) {
    return NextResponse.redirect(new URL('/?auth=login', request.url))
  }

  // 로그인 상태에서 로그인 페이지 접근 시 메인으로 리다이렉트
  if (token && authParam === 'login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // ONLY auth 쿼리 파라미터가 있는 요청만 매칭
  matcher: [
    '/',
    '/api/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
