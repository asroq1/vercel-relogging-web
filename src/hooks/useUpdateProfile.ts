import { useAuthStore } from '@/store/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateProfileRequest {
  request: {
    nickname: string | null
  }
  image?: File | null
}

interface UpdateProfileResponse {
  name: string
  nickname: string
  email: string
  image: string
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const { setAuth } = useAuthStore()

  // 계정 정보 수정
  const updateProfile = useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      const formData = new FormData()

      formData.append('request', JSON.stringify(data.request))
      formData.append('image', data.image || 'null')

      const response = await fetch(`/api/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('프로필 수정에 실패했습니다.')
      }

      const result = await response.json()
      return result as UpdateProfileResponse // 타입 단언
    },
    onSuccess: (updatedUser: UpdateProfileResponse) => {
      setAuth(updatedUser)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('프로필 수정 오류:', error)
    },
  })

  return {
    updateProfile,
  }
}
