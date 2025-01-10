'use client'

import { useStatusModal } from '@/hooks/useStatusModal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import KakaoOauthButton from '@/components/KakaoOauthButton'
import GoogleOauthButton from '@/components/GoogleOauthButton'
import { DialogDescription } from '@radix-ui/react-dialog'

export function LoginModal() {
  const { isOpen, closeModal } = useStatusModal({ type: 'auth', mode: 'login' })

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogOverlay className="z-[10000]" />
      <DialogContent className="z-[10001] h-dvh items-center gap-0 rounded-lg bg-white p-0 tablet:h-auto tablet:max-h-[320px] tablet:max-w-[560px] laptop:max-h-[320px] laptop:max-w-[560px] laptop:items-start">
        <DialogHeader className="hidden space-y-6 p-6 laptop:block">
          <div className="flex items-center justify-center">
            <DialogTitle className="text-2xl font-bold text-text">
              로그인
            </DialogTitle>
            <DialogDescription />
          </div>
        </DialogHeader>
        <div className="margin-auto flex w-full max-w-[400px] flex-col items-center space-y-4 p-6 pt-2">
          <p className="flex self-start text-xs laptop:mx-0">소셜로그인</p>
          <GoogleOauthButton />
          <KakaoOauthButton />
        </div>
      </DialogContent>
    </Dialog>
  )
}
