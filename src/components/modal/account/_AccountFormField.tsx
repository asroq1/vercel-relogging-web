import { Label } from '@/components/ui/label'
import React from 'react'

interface AccountFormFieldProps {
  label: string
  isRequired?: boolean
  children: React.ReactNode
}

export const AccountFormField = React.memo(
  ({ label, isRequired, children }: AccountFormFieldProps) => (
    <div className="space-y-2">
      <Label>
        {label}
        {isRequired && <span className="text-green">*</span>}
      </Label>
      {children}
    </div>
  ),
)

AccountFormField.displayName = 'AccountFormField'
