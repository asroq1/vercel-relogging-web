'use server'

import { cookies } from 'next/headers'

export async function setToken(token: string) {
  cookies().set('accessToken', token, {
    httpOnly: true, //  JavaScript에서 접근 차단
    secure: process.env.NODE_ENV === 'production', // 배포 환경에서 HTTPS만 허용
    sameSite: 'lax', //  CSRF 공격 방지
    path: '/', // 모든 경로에서 접근 가능
    maxAge: 10800, //3시간
  })
}

export async function clearToken() {
  cookies().delete('accessToken')
}

export async function clearAllToken() {
  cookies().delete('accessToken')
  cookies().delete('refreshToken')
}
