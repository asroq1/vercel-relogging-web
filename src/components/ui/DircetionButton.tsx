'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface DirectionButtonProps {
  to: string
  children: React.ReactNode
  className?: string
}

export default function DirectionButton({
  to,
  children,
  className,
}: DirectionButtonProps) {
  const router = useRouter()

  const handleDirection = () => {
    router.push(`${to}`)
  }

  return (
    <Button onClick={handleDirection} className={className}>
      {children}
    </Button>
  )
}
