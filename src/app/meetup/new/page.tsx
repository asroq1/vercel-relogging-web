'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const MeetupForm = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/?tab=meetup')
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <div>로딩 중...</div>
    </div>
  )
}

export default MeetupForm
