'use client'

import { Button } from '@/components/ui/button'
import { useStatusModal } from '@/hooks/useStatusModal'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function MyPageButton() {
  const router = useRouter()
  const { clearAuth, isAuthenticated } = useAuthStore()
  const { openModal } = useStatusModal({
    type: 'auth',
    mode: 'mypage',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.refresh()
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleLogout = async () => {
    await clearAuth()

    router.refresh()
    router.push('/')
  }
  return (
    <>
      <Button
        onClick={openModal}
        className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
      >
        마이페이지
      </Button>
      <Button
        onClick={handleLogout}
        className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
      >
        로그아웃
      </Button>
    </>
  )
}
