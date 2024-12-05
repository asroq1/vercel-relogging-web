'use client'

// hooks/useDialog.ts
import { useState } from 'react'

export function useCommonModal(initialState = true) {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  }
}
