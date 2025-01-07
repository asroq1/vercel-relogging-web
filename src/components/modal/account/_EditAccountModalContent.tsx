import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { User } from '@/store/authStore'
import React, { useCallback, useState } from 'react'
import EditIcon from '@/assets/icon_edit.svg'
import { useUpdateAccount } from '@/hooks/useUpdateAccount'
import { AccountFormField } from './_AccountFormField'
import { EditAccountActions } from './_AccountActions'

// components/account/modal/EditAccountModalContent.tsx
interface EditAccountModalProps {
  onTypeChange: (type: 'main' | 'edit' | 'delete') => void
  profileInfo: User
  onCancel: () => void
}

export const EditAccountModalContent = React.memo(
  ({ profileInfo, onCancel, onTypeChange }: EditAccountModalProps) => {
    const [userInfo, setUserInfo] = useState<User>(profileInfo)
    const { updateAccount } = useUpdateAccount()
    const { toast } = useToast()

    const handleChangeInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({
          ...prev,
          [name]: value,
        }))
      },
      [],
    )

    const handleUpdateSubmit = async () => {
      if (updateAccount.isPending) return

      try {
        await updateAccount.mutateAsync({
          name: userInfo.name,
        })
        toast({
          title: '계정 정보 수정 완료',
          description: '계정 정보가 수정되었습니다.',
          duration: 1500,
          variant: 'default',
        })

        onCancel()
      } catch (error) {
        toast({
          title: `${error} | 계정 수정 실패 `,
          description: '계정 수정 중 오류가 발생했습니다.',
          variant: 'destructive',
          duration: 1500,
        })
      }
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <EditIcon />
            계정 정보 수정
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-6">
          <AccountFormField label="이름" isRequired>
            <Input
              className="radius-none border-b-1 rounded-none border-l-0 border-r-0 border-t-0 bg-white focus:outline-none"
              value={userInfo.name}
              name="name"
              onChange={handleChangeInput}
            />
          </AccountFormField>
          <EditAccountActions
            onSubmit={handleUpdateSubmit}
            onTypeChange={onTypeChange}
            isSubmitting={updateAccount.isPending}
            onCancel={onCancel}
          />
        </div>
      </>
    )
  },
)

EditAccountModalContent.displayName = 'EditAccountModalContent'
