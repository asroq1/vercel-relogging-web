import { clearAllToken } from '@/app/actions/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  image: string
  email: string
  nickname: string
  name: string
  userId?: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
}

interface AuthStore extends AuthState {
  setAuth: (user: User) => void
  clearAuth: () => void
  initializeAuth: (hasToken: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // 초기 상태
      user: null, // 사용자 정보
      accessToken: null, // 토큰
      isAuthenticated: false, // 인증 상태
      isLoading: true, // 초기화 중
      isInitialized: false, // 초기화 상태

      initializeAuth: (hasToken: boolean) => {
        set({
          isAuthenticated: hasToken,
          isLoading: true,
          isInitialized: true,
        })
      },

      setAuth: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      clearAuth: async () => {
        try {
          await clearAllToken()
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        } catch (error) {
          console.error('로그아웃 실패:', error)
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
