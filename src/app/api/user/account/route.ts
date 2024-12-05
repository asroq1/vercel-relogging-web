import { refreshToken } from '@/utils/api'
import { cookies } from 'next/headers'

export async function PUT(request: Request) {
  const token = cookies().get('accessToken')
  const data = await request.json()
  console.log('계정 수정 토큰 token:', token)

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/account`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify(data),
      },
    )
    // 액세스 토큰 만료
    if (response.status === 401) {
      try {
        // 1. 토큰 재발급 시도
        const newToken = await refreshToken()
        // 2. 원래 요청 재시도
        const retryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/account`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify(data),
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
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}

export async function DELETE() {
  const token = cookies().get('accessToken') || null
  console.log('계정 삭제 토큰 token:', token)
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/withdrawal`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    )

    if (response.status === 401) {
      try {
        // 1. 토큰 재발급 시도
        const newToken = await refreshToken()
        // 2. 원래 요청 재시도
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/withdrawal`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          },
        )
        console.log('토큰 갱신 후 재요청1:', response)
        if (!response.ok) {
          console.log('토큰 갱신 후 재요청2', response)

          return Response.redirect(new URL('/?auth=login'))
        }
      } catch (error) {
        console.log('토큰 갱신 후 재요청3', error)
        return Response.redirect(new URL('/?auth=login'))
      }
    }

    const responseData = await response.json()
    return Response.json(responseData)
  } catch (error) {
    console.error('계정 삭제 에러:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}
