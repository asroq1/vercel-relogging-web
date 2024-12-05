// app/oauth/success/[provider]/page.tsx
'use client'

import LoadingScreen from '@/components/layouts/LoadingScreen'
import { useOAuth } from '@/hooks/useOAuth'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type SocialType = 'KAKAO' | 'GOOGLE'

export default function LoadingPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { login } = useOAuth()
  const currentProvider = params.id as string
  const redirectUri = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}/${currentProvider}`

  useEffect(() => {
    const handleOAuthLogin = async () => {
      try {
        const code = searchParams.get('code')
        if (!code) {
          console.error('인증 코드가 없습니다.')
          router.replace('/login?error=no_code')
          return
        }

        await login({
          authCode: code,
          redirectUri,
          socialType: currentProvider?.toUpperCase() as SocialType,
        })
      } catch (error) {
        console.error('OAuth 처리 중 오류 발생:', error)
        router.replace('/login?error=oauth_failed')
      }
    }

    handleOAuthLogin()
  }, [
    searchParams,
    currentProvider,
    router,
    login,
    params.provider,
    redirectUri,
  ])

  return <LoadingScreen />
}
