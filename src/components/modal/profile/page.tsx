'use client'

import { Dialog } from '@/components/ui/dialog'
import { useAuthStore } from '@/store/authStore'
import { ProfileForm } from './_ProfileForm'
import { useStatusModal } from '@/hooks/useStatusModal'

export default function ProfileModalPage() {
  const { user } = useAuthStore()
  const { isOpen, closeModal } = useStatusModal({
    type: 'auth',
    mode: 'profile',
  })

  if (!user) return null
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal()
      }}
    >
      <ProfileForm user={user} closeModal={closeModal} />
    </Dialog>
  )
}
