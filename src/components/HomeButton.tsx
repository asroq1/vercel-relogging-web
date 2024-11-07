'use client'

import { useRouter } from 'next/navigation'
import HomeIcon from '@/assets/icon_home.svg'

const HomeButton = () => {
  const router = useRouter()

  return (
    <button
      className="// 포커스 시에도 테두리 제거 flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-md border-none bg-solid outline-none transition-all hover:bg-gray-100 focus:outline-none"
      onClick={() => router.push('/')}
    >
      <HomeIcon />
    </button>
  )
}

export default HomeButton
