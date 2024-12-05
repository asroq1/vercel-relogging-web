'use client'

import { useEffect, useState } from 'react'
import LoginButton from './LoginButton'
import MyPageButton from './MyPageButton'
import { useAuthStore } from '@/store/authStore'

interface AuthButtonsProps {
  initHasToken: boolean
}

export function AuthButtons({ initHasToken }: AuthButtonsProps) {
  const [hasToken, setHasToken] = useState(initHasToken)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // 서버와 클라이언트 상태 모두 true일 때만 로그인 상태로 인정
    const isValid = initHasToken && isAuthenticated
    if (!isValid) setHasToken(false)
    setHasToken(isValid)
  }, [isAuthenticated, initHasToken])

  return <div>{!hasToken ? <LoginButton /> : <MyPageButton />}</div>
}
