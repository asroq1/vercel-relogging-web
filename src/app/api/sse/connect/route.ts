/* eslint-disable no-constant-condition */

import { cookies } from 'next/headers'

export async function GET() {
  const token = cookies().get('accessToken')?.value

  if (!token) {
    return Response.json(
      {
        message: '로그인이 필요한 서비스입니다.',
        redirect: '/?auth=login',
      },
      { status: 302 },
    )
  }

  try {
    // SSE 스트림 설정
    const stream = new ReadableStream({
      start: async (controller) => {
        try {
          // SSE 연결 시도
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/sse/connect`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          if (!response.ok) {
            throw new Error('SSE connection failed')
          }

          // 응답을 ReadableStream으로 변환
          const reader = response.body?.getReader()
          if (!reader) throw new Error('No reader available')

          // 스트림 읽기
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            controller.enqueue(value)
          }
        } catch (error) {
          controller.error(error)
        }
      },
    })

    console.log('SSE 연결 성공')
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Stream error:', error)
    return Response.json({ error: 'Stream failed' }, { status: 500 })
  }
}
