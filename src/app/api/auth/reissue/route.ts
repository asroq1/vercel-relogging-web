import { cookies } from 'next/headers'

export async function POST() {
  try {
    const refreshToken = cookies().get('refreshToken')

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reissue`,
      {
        method: 'POST',
        headers: {
          Cookie: `refreshToken=${refreshToken?.value}`,
        },
      },
    )

    if (!response.ok) {
      return Response.json({ error: '토큰 갱싱 실패3' }, { status: 401 })
    }

    const data = await response.json()

    cookies().set('accessToken', data.accessToken, {
      secure: process.env.NODE_ENV === 'production', // 배포 환경에서 HTTPS만 허용
      sameSite: 'lax', //  CSRF 공격 방지
      path: '/', // 모든 경로에서 접근 가능
      maxAge: 10800, // 3시간
    })

    return Response.json({ accessToken: data.accessToken })
  } catch (error: any) {
    console.error('토큰 갱신 실패', error)
    return Response.json({ error: 'Refresh failed' }, { status: 500 })
  }
}
