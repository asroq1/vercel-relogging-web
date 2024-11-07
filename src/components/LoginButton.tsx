import React from 'react'
import { Button } from './ui/button'
import { useLoginModal } from '@/hooks/useLoginModal'

const LoginButton = () => {
  const { openModal } = useLoginModal()
  return (
    <Button
      onClick={openModal}
      className="text-text bg-white px-3 py-2 rounded-md text-sm font-medium"
    >
      로그인
    </Button>
  )
}

export default LoginButton
