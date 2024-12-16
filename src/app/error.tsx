'use client'

import IconSad from '@/assets/icon_sad.svg'
import DirectionButton from '@/components/ui/DircetionButton'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex h-dvh w-dvw items-center justify-center">
      <div className="flex h-dvh max-h-[432px] w-dvw flex-col items-center justify-evenly bg-background">
        <div className="flex w-4/5 flex-col items-center gap-6">
          <h1 className="flex items-center gap-4 text-xl font-bold laptop:text-5xl">
            <span>
              <IconSad />
            </span>
            예상치 못한 오류가 발생했습니다.
          </h1>
          <p className="text-sm text-textLight laptop:text-base">
            지속적으로 발생 시 관리자에게 문의해주세요.
          </p>
          <Link
            href="mailto:reloggingofficial@gmail.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-textLight hover:text-text hover:underline laptop:text-base"
          >
            reloggingofficial@gmail.com
          </Link>
        </div>
        <div className="gap- flex flex-col gap-4">
          <DirectionButton
            to="/"
            className={'h-[48px] w-[240px] bg-green text-base text-white'}
          >
            홈으로 가기
          </DirectionButton>
        </div>
      </div>
    </main>
  )
}
