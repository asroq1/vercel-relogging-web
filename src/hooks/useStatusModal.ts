'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

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

  const openModal = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    if (mode) {
      params.set(type, mode)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [searchParams, type, mode, router, pathname])

  const closeModal = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    params.delete(type)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [searchParams, type, router, pathname])

  return {
    isOpen: isOpen ?? false,
    openModal,
    closeModal,
  } as const
}
