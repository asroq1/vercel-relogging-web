'use client'

import React, { useCallback, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useAuthStore, User } from '@/store/authStore'
import { EditAccountModalContent } from './_EditAccountModalContent'
import { DeleteAccountModalContent } from './_DeleteAccountModalContent'
import { MainAccountModalContent } from './_MainAccountModalContent'
import { useStatusModal } from '@/hooks/useStatusModal'

const AccountModalContent = React.memo(
  ({
    modalType,
    user,
    onTypeChange,
    onCancel,
  }: {
    modalType: 'main' | 'edit' | 'delete'
    setModalType: (type: 'main' | 'edit' | 'delete') => void
    user: User
    onTypeChange: (type: 'main' | 'edit' | 'delete') => void
    onCancel: () => void
  }) => {
    const renderContent = () => {
      switch (modalType) {
        case 'main':
          return (
            <MainAccountModalContent
              profileInfo={user}
              onEdit={() => onTypeChange('edit')}
              onDelete={() => onTypeChange('delete')}
              onClose={onCancel}
            />
          )
        case 'edit':
          return (
            <EditAccountModalContent
              profileInfo={user}
              onTypeChange={onTypeChange}
              onCancel={onCancel}
            />
          )
        case 'delete':
          return (
            <DeleteAccountModalContent
              onCancel={onCancel}
              onTypeChange={onTypeChange}
            />
          )
        default:
          return null
      }
    }

    return (
      <DialogContent className="h-dvh w-full max-w-[580px] bg-white laptop:max-h-[689px]">
        {renderContent()}
      </DialogContent>
    )
    // 1. 정적인 타이틀은 여기서 렌더링.
    // 2. 하단에서 스위치로 컨텐츠 내용 다르게 렌더링
  },
)

AccountModalContent.displayName = 'AccountModalContent'
// pages/account/ProfileModalRoute.tsx
export default function AccountModalPage() {
  // const router = useRouter()
  const { isOpen, closeModal } = useStatusModal({
    type: 'auth',
    mode: 'account',
  })

  const [modalType, setModalType] = useState<'main' | 'edit' | 'delete'>('main')
  const { user } = useAuthStore()

  const handleClose = useCallback(() => {
    closeModal()
  }, [closeModal])

  const handleTypeChange = useCallback((type: 'main' | 'edit' | 'delete') => {
    setModalType(type)
  }, [])

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <AccountModalContent
        modalType={modalType}
        setModalType={setModalType}
        user={user}
        onTypeChange={handleTypeChange}
        onCancel={handleClose}
      />
    </Dialog>
  )
}
