'use client'

import { useRouter } from 'next/navigation'
import HomeIcon from '@/assets/icon_home.svg'

interface HomeButtonProps {
  returnPath?: string
}

const HomeButton = ({ returnPath }: HomeButtonProps) => {
  const router = useRouter()

  return (
    <button
      className="hover:bg-hoverGray flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-md border-none bg-solid outline-none transition-all focus:outline-none"
      onClick={() => router.push(`${returnPath ?? '/'}`)}
    >
      <HomeIcon />
    </button>
  )
}

export default HomeButton
