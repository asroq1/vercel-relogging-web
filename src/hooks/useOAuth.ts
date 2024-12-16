import { setToken } from '@/app/actions/auth'
import { useAuthStore } from '@/store/authStore'
import { OAuthRequest } from '@/types/IAuth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useOAuth = () => {
  const router = useRouter()
  const { setAuth, clearAuth } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: async ({ authCode, socialType, redirectUri }: OAuthRequest) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ code: authCode, redirectUri, socialType }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '인증 오류가 발생했습니다.')
      }

      return response.json()
    },
    onSuccess: async (data) => {
      // Server Action 호출
      await setToken(data.accessToken)
      console.log('✅data.userResponse', data.userResponse)
      setAuth(data.userResponse)
      router.replace('/')
    },
    onError: (error) => {
      console.error('로그인 실패:', error)
      clearAuth()
      router.replace('/login?error=login_failed')
    },
  })

  return {
    login: loginMutation.mutate,
    logout: clearAuth,
    isLoading: loginMutation?.isPending,
  }
}
