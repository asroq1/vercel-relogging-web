'use client'

import { useLoginModal } from '@/hooks/useLoginModal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import OauthButton from './OauthButton'

export default function LoginModal() {
  const { isOpen, closeModal } = useLoginModal()

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogOverlay />
      <DialogContent className="h-[100vh] items-center gap-0 rounded-lg bg-white p-0 laptop:max-h-[408px] laptop:max-w-[560px] laptop:items-start">
        <DialogHeader className="hidden space-y-6 p-6 laptop:block">
          <div className="flex items-center justify-center">
            <DialogTitle className="text-2xl font-bold text-text">
              로그인
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="margin-auto flex w-full flex-col items-start space-y-4 p-6 pt-2 desktop:max-w-[400px]">
          <span className="margin-auto text-xs laptop:mx-0">소셜로그인</span>
          <OauthButton oauthType="google" />
          <OauthButton oauthType="kakao" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
