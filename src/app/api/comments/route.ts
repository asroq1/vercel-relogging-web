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

  const { content } = await request.json()
  const { searchParams } = new URL(request.url)
  const contentType = searchParams.get('contentType')
  const eventId = searchParams.get('eventId')
  const commentId = searchParams.get('commentId')

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${contentType}/${eventId}/comments${commentId ? `/${commentId}/replies` : ''}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({ content }),
      },
    )

    // ... 나머지 토큰 갱신 로직은 동일
    if (response.status === 401) {
      try {
        // 1. 토큰 재발급 시도
        const newToken = await refreshToken()
        // 2. 원래 요청 재시도
        const retryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/${contentType}/${eventId}/comments${commentId ? `/${commentId}/replies` : ''}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify({ content }),
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
        console.error('토큰 갱신 후 재요청3', error)
        return Response.redirect(new URL('/?auth=login', request.url))
      }
    }
    const responseData = await response.json()
    console.error('responseData', responseData)
    return Response.json(responseData)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
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

  const { searchParams } = new URL(request.url)
  const eventId = searchParams.get('eventId')
  const commentId = searchParams.get('commentId')
  const contentType = searchParams.get('contentType')

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${contentType}/${eventId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
      },
    )

    // ... 나머지 토큰 갱신 로직은 동일
    if (response.status === 401) {
      try {
        console.error('✅ step3')
        // 1. 토큰 재발급 시도
        const newToken = await refreshToken()
        // 2. 원래 요청 재시도
        const retryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/${contentType}/${eventId}/comments/${commentId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newToken}`,
            },
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
        console.error('토큰 갱신 후 재요청3', error)
        return Response.redirect(new URL('/?auth=login', request.url))
      }
    }

    if (response.status === 204 || response.ok) {
      return new Response(null, { status: 204 })
    }

    return Response.json({ error: 'Request failed' }, { status: 500 })
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: 'Request failed' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
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

  const { content } = await request.json()
  const { searchParams } = new URL(request.url)
  const eventId = searchParams.get('eventId')
  const commentId = searchParams.get('commentId')
  const contentType = searchParams.get('contentType')

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${contentType}/${eventId}/comments/${commentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.value}`,
        },
        body: JSON.stringify({ content }),
      },
    )

    if (!response.ok) {
      throw new Error('댓글 수정에 실패했습니다.')
    }

    if (response.status === 401) {
      try {
        // 1. 토큰 재발급 시도
        const newToken = await refreshToken()
        // 2. 원래 요청 재시도
        const retryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/${contentType}/${eventId}/comments/${commentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newToken}`,
            },
            body: JSON.stringify({ content }),
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
        console.error('토큰 갱신 후 재요청3', error)
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
