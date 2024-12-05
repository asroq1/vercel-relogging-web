import { refreshToken } from '@/utils/api'
import { cookies } from 'next/headers'

export async function PUT(request: Request) {
  const token = cookies().get('accessToken')
  const formData = await request.formData()

  if (!formData.get('image')) {
    formData.append('image', 'null')
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
        body: formData,
      },
    )

    if (response.status === 401) {
      try {
        // 1. 토큰 재발급 시도
        const newToken = await refreshToken()
        // 2. 원래 요청 재시도
        const retryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
            body: formData,
          },
        )
        console.log('토큰 갱신 후 재요청1:', retryResponse)
        if (!retryResponse.ok) {
          console.log('토큰 갱신 후 재요청2', retryResponse)
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
    const responseData = await response.json()
    return Response.json(responseData)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error1: `${error}` }, { status: 500 })
  }
}
