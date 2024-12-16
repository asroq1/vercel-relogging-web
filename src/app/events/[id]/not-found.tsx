import IconSad from '@/assets/icon_sad.svg'
import DirectionButton from '@/components/ui/DircetionButton'

export default function NotFound() {
  return (
    <main className="flex h-dvh w-dvw items-center justify-center">
      <div className="flex h-dvh max-h-[432px] w-dvw flex-col items-center justify-evenly bg-background">
        <div className="flex w-4/5 flex-col items-center gap-6">
          <h1 className="flex items-center gap-4 text-xl font-bold laptop:text-5xl">
            <span>
              <IconSad />
            </span>
            원하시는 페이지를 찾을 수 없어요.
          </h1>
          <p className="text-sm text-textLight laptop:text-base">
            찾으시려던 페이지가 이동되었거나 삭제되었을 수 있어요. 불편을 드려
            죄송합니다.
          </p>
        </div>
        <div className="gap- flex flex-col gap-4">
          <DirectionButton
            to="/"
            className={'h-[48px] w-[240px] bg-green text-base text-white'}
          >
            이전 페이지로 돌아가기
          </DirectionButton>
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
