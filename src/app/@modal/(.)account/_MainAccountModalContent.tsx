import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { User } from '@/store/authStore'
import React from 'react'
import { AccountFormField } from '@/app/@modal/(.)account/_AccountFormField'
import { AccountActions } from './_AccountActions'

interface MainAccountModalProps {
  profileInfo: User
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

export const MainAccountModalContent = React.memo(
  ({ profileInfo, onEdit, onDelete, onClose }: MainAccountModalProps) => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center justify-center">
          계정 관리
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6 p-6">
        <div className="space-y-4">
          <AccountFormField label="이름" isRequired>
            <Input value={profileInfo.name} disabled />
          </AccountFormField>
          <AccountFormField label="이메일" isRequired>
            <Input value={profileInfo.email} disabled />
          </AccountFormField>
        </div>
        <AccountActions onEdit={onEdit} onClose={onClose} onDelete={onDelete} />
      </div>
    </>
  ),
)

MainAccountModalContent.displayName = 'MainAccountModalContent'
