import { useAuthStore } from '@/store/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface UpdateAccountRequest {
  name: string
}

// interface UpdateAccountResponse {
//   name: string
//   nickname: string
//   email: string
//   image: string
// }

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setAuth, clearAuth } = useAuthStore()
  // 계정 정보 수정
  const updateAccount = useMutation({
    mutationFn: async (data: UpdateAccountRequest) => {
      const response = await fetch('/api/user/account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      // 리다이렉트 응답 처리
      if (response.redirected) {
        window.location.href = response.url
        return
      }

      if (!response.ok) {
        throw new Error('계정 수정에 실패했습니다.')
      }

      return response.json()
    },
    onSuccess: (updatedUser) => {
      if (updatedUser) {
        setAuth(updatedUser)
        queryClient.invalidateQueries({ queryKey: ['user'] })
      }
    },
    onError: (error) => {
      console.error('계정 수정 오류:', error)
    },
  })

  // 계정 삭제
  const deleteAccount = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/user/account', {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('회원 탈퇴에 실패했습니다.')
      }

      return response.json()
    },
    onSuccess: () => {
      clearAuth()
      queryClient.clear()
      router.push('/')
    },
  })
  return {
    updateAccount,
    deleteAccount,
  }
}
