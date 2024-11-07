'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useLoginModal = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isOpen = searchParams.get('auth') === 'login'

  const openModal = () => {
    const params = new URLSearchParams(searchParams)
    params.set('auth', 'login')
    router.push(`${pathname}?${params.toString()}`)
  }
  const closeModal = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('auth')
    router.push(`${pathname}?${params.toString()}`)
  }

  return { isOpen, openModal, closeModal }
}
