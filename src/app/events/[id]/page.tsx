import EventSidebar from '@/app/events/[id]/_EventSidebar'
import { Metadata } from 'next'
import { EventDetailSection } from '@/app/events/[id]/_EventDetailSection'

// event 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvents/${params.id.toString()}`,
  )
  const eventDetail = await response.json()
  return {
    title: `리로깅 - ${eventDetail.title ?? ''} `,
    description: `리로깅 - ${eventDetail.content ?? ''} `,
    openGraph: {
      title: `리로깅 - ${eventDetail.title ?? ''} `,
      description: `리로깅 - ${eventDetail.content ?? ''} `,
      images: [
        {
          url: eventDetail.imageList?.[0]?.url ?? '',
          width: 1200,
          height: 630,
          alt: '플로깅 이벤트 이미지',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `리로깅 - ${eventDetail.title ?? ''} `,
      description: `리로깅 - ${eventDetail.content ?? ''} `,
      images: eventDetail.imageList?.[0]?.url ?? '',
    },
  }
}

export default function EventDetailPage() {
  // const path = usePathname()
  // const eventId = path.split('/').pop() ?? ''
  // // const { toast } = useToast()
  // const {
  //   // 이벤트 디테일
  //   eventDetail,
  //   eventDetailIsError,
  //   eventDetailIsLoading,
  //   eventDetailError,
  //   //이벤트 페이지네이션

  //   // 이전 이벤트, 다음 이벤트
  //   // navigate,
  //   isNavigatingPrev,
  //   isNavigatingNext,

  //   refetchEventDetail,
  // } = useEventsQueries({
  //   eventId,
  // })

  // const onChangeEventDetail = (type: 'prev' | 'next') => {
  //   if (!eventDetail?.id) return

  //   navigate(
  //     { type, currentId: eventDetail.id },
  //     {
  //       onError: (error: Error) => {
  //         toast({
  //           title: '이동 실패',
  //           description: `${error.message}`,
  //           variant: 'destructive',
  //           duration: 1500,
  //         })
  //       },
  //     },
  //   )
  // }

  return (
    <article className="m-auto mt-16 flex h-auto w-full max-w-7xl gap-6 bg-white p-5">
      {/* // 이벤트 이미지 밎 상세 정보 */}
      <div className="flex w-full gap-6">
        {/* 왼쪽 뉴스 디테일 */}
        <div className="w-full min-w-0 laptop:flex-[8]">
          <EventDetailSection />
        </div>

        {/* 중앙 Divider */}
        <div className="hidden h-auto w-[1px] bg-gray-200 laptop:block" />

        {/* 오른쪽 사이드바 */}
        <div className="hidden min-w-0 laptop:block laptop:flex-[4]">
          <EventSidebar />
        </div>
      </div>
    </article>
  )
}
