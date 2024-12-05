import { clearToken } from '@/app/actions/auth'
import { cookies } from 'next/headers'

export async function refreshToken() {
  try {
    const refreshToken = cookies().get('refreshToken') || null
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reissue`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken?.value}`, // 리프레시 토큰 전달 (Next서버라 credentials 옵션이 동작하지 않음.)
        },
      },
    )

    if (!response.ok) {
      throw new Error('토큰 갱신 실패')
    }

    const data = await response.json()

    // 새 액세스 토큰 저장
    cookies().set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return data.accessToken
  } catch (error) {
    clearToken()
    console.error('리프레쉬 토큰으로 액세스 갱신 실패.', error)
    throw error
  }
}
