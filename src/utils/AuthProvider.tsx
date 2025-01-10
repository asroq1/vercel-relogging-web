
'use client'

import OAuthSuccessPage from '@/components/layouts/LoadingScreen'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

interface AuthProviderProps {
  hasToken: boolean
  children: React.ReactNode
}
export function AuthProvider({ children, hasToken }: AuthProviderProps) {
  const { initializeAuth, isInitialized } = useAuthStore()

  useEffect(() => {
    // hasToken 상태를 기반으로 초기화
    initializeAuth(hasToken)
  }, [hasToken, initializeAuth])

  // 초기화되기 전에는 로딩 상태 표시
  if (!isInitialized) {
    return <OAuthSuccessPage />
  }

  return <>{children}</>
}
