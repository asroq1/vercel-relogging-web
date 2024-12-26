import { refreshToken } from '@/utils/api'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const token = cookies().get('accessToken')

  if (!token) {
    return Response.json(
      {
        message: '로그인이 필요한 서비스입니다.',
        redirect: '/?auth=login',
      },
      { status: 302 },
    )
  }

  const { reason } = await request.json()
  const { searchParams } = new URL(request.url)
  const commentId = searchParams.get('commentId')

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${commentId}/report`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({ reason }),
      },
    )
    if (!response.ok) {
      throw new Error('신고에 실패했습니다.')
    }
    console.error('✅ next row:', response)
    if (response.status === 401) {
      try {
        // 1. 토큰 재발급 시도
        const newToken = await refreshToken()
        // 2. 원래 요청 재시도
        const retryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/${commentId}/report`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify({ reason }),
          },
        )
        console.error('토큰 갱신 후 재요청1:', retryResponse)
        if (!retryResponse.ok) {
          console.error('토큰 갱신 후 재요청2', retryResponse)
          const url = request.url
          return Response.redirect(new URL('/?auth=login', url))
        }

        const responseData = await retryResponse.json()
        return Response.json(responseData)
      } catch (error) {
        console.log('토큰 갱신 후 재요청3', error)
        return Response.redirect(new URL('/?auth=login', request.url))
      }
    }
    return Response.json({ message: '신고가 완료되었습니다.' })
  } catch (error) {
    console.error('신고 오류:', error)
    return Response.json({ error: '신고 실패' }, { status: 500 })
  }
}
