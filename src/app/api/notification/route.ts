import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const token = cookies().get('accessToken')?.value

  try {
    if (!token) {
      return Response.json(
        {
          message: '로그인이 필요한 서비스입니다.',
          redirect: '/?auth=login',
        },
        { status: 302 },
      )
    }

    // 알림 목록 조회 API 호출
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/notification`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 401) {
      // 토큰 만료 처리 로직...
      return Response.redirect(new URL('/?auth=login', request.url))
    }

    const notifications = await response.json()
    return Response.json(notifications)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}
