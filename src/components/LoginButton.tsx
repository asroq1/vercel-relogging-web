import React from 'react'
import { Button } from './ui/button'
import { useStatusModal } from '@/hooks/useStatusModal'

const LoginButton = () => {
  const { openModal } = useStatusModal({ type: 'auth', mode: 'login' }) //

  return (
    <>
      <Button
        onClick={openModal}
        className="rounded-md bg-white px-3 py-2 text-sm font-medium text-text"
      >
        로그인
      </Button>
    </>
  )
}

export default LoginButton
