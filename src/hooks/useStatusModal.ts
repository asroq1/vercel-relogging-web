'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export type ModalMode = 'login' | 'mypage' | 'profile'

interface useStatusModalProps {
  type: string
  mode: ModalMode
}

export const useStatusModal = ({ type, mode }: useStatusModalProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentMode = searchParams.get(type)

  const isOpen = currentMode === mode

  const openModal = () => {
    const params = new URLSearchParams(searchParams)
    if (mode) {
      params.set(type, mode.toString())
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }
  const closeModal = () => {
    const params = new URLSearchParams(searchParams)
    params.delete(type)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return { isOpen, openModal, closeModal }
}
