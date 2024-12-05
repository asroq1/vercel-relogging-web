'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/?auth=mypage')
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div>로딩 중...</div>
    </div>
  )
}
