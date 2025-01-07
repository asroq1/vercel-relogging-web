import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useUpdateAccount } from '@/hooks/useUpdateAccount'
import React, { useCallback, useState } from 'react'
import { AccountFormField } from './_AccountFormField'
import { DeleteAccountActions } from './_AccountActions'

// components/account/modal/DeleteAccountModalContent.tsx
interface DeleteAccountModalProps {
  onCancel: () => void
  onTypeChange: (type: 'main' | 'edit' | 'delete') => void
}

export const DeleteAccountModalContent = React.memo(
  ({ onCancel, onTypeChange }: DeleteAccountModalProps) => {
    const [reason, setReason] = useState('')
    const { deleteAccount } = useUpdateAccount()
    const { toast } = useToast()

    const handleReasonChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReason(e.target.value)
      },
      [],
    )

    const handleDeleteSubmit = async () => {
      if (deleteAccount.isPending) return

      try {
        await deleteAccount.mutateAsync()
        toast({
          title: '계정 삭제 완료',
          description: '계정 삭제가 완료되었습니다.',
          variant: 'default',
        })
        onCancel()
      } catch (error) {
        toast({
          title: `${error} | 계정 삭제 실패`,
          description: '계정 삭제가 실패하였습니다.',
          variant: 'destructive',
        })
      }
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            계정 탈퇴
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-6">
          <AccountFormField label="계정 탈퇴를 진행하시겠습니까?">
            <Textarea
              className="resize-none"
              placeholder="탈퇴를 결심하신 이유 또는 리로깅 서비스가 개선되었으면 하는 점이 있으면 적어주세요."
              value={reason}
              onChange={handleReasonChange}
              rows={4}
            />
          </AccountFormField>
          <DeleteAccountActions
            onSubmit={handleDeleteSubmit}
            onCancel={onCancel}
            onTypeChange={() => onTypeChange('main')}
            isSubmitting={deleteAccount.isPending}
          />
        </div>
      </>
    )
  },
)

DeleteAccountModalContent.displayName = 'DeleteAccountModalContent'
