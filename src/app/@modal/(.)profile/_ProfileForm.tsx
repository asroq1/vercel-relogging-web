import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/store/authStore'
import React from 'react'

interface ProfileFormProps {
  isEditing: boolean
  userInfo: User | null
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// components/profile/ProfileForm.tsx
export const ProfileForm = React.memo(
  ({ isEditing, userInfo, onNicknameChange }: ProfileFormProps) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        닉네임 <span className="text-green">*</span>
      </Label>
      <Input
        className="h-10 w-full"
        value={userInfo?.nickname}
        name="nickname"
        onChange={onNicknameChange}
        disabled={!isEditing}
      />
    </div>
  ),
)
ProfileForm.displayName = 'ProfileForm'
