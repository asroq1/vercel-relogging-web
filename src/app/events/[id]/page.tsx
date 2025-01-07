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

  const keywords = [
    '플로깅',
    eventDetail.region,
    '환경보호',
    '러닝',
    eventDetail.title,
    '플로깅모임',
    '환경운동',
    '지역봉사',
  ].filter(Boolean)

  return {
    title: `${eventDetail.title} | ${eventDetail.region} 플로깅 모임 | 리로깅`,
    description: `${eventDetail.region}에서 진행되는 플로깅 모임 "${eventDetail.title}" - ${eventDetail.content}`,
    keywords: keywords,
    // openGraph: {
    //   title: `리로깅 - ${eventDetail.title ?? ''} `,
    //   description: `리로깅 - ${eventDetail.content ?? ''} `,
    //   images: [
    //     {
    //       url: eventDetail.imageList?.[0]?.url ?? '',
    //       width: 1200,
    //       height: 630,
    //       alt: '플로깅 이벤트 이미지',
    //     },
    //   ],
    // },

    openGraph: {
      title: `${eventDetail.title} - ${eventDetail.region} 플로깅 모임`,
      description: `${eventDetail.content}\n📍위치: ${eventDetail.location}\n 참가대상: ${eventDetail.participantTarget}`,
      type: 'article', // 뉴스나 블로그 글처럼 취급
      url: `https://re-logging.com/events/${params.id}`,
      images: [
        {
          url: eventDetail.imageList?.[0]?.url ?? '',
          width: 720,
          height: 377,
          alt: `${eventDetail.region} ${eventDetail.title} 플로깅 모임 이미지`,
        },
      ],
      locale: 'ko_KR', // 한국어 컨텐츠임을 명시
      siteName: '리로깅',
    },

    twitter: {
      card: 'summary_large_image', // 큰 이미지 카드 사용
      title: `${eventDetail.title} | ${eventDetail.region} 플로깅`,
      description: `${eventDetail.region}에서 진행되는 플로깅 모임에 참여하세요! 📍${eventDetail.location}`,
      images: eventDetail.imageList?.[0]?.url ?? '',
    },
    // 크롤릿 설정
    robots: {
      index: true, // 페이지 인덱싱 허용
      follow: true, // 링크 따라가기 허용
      'max-video-preview': -1, // 비디오 미리보기 제한 없음
      'max-image-preview': 'large', // 큰 이미지 미리보기 허용
      'max-snippet': -1, // 스니펫 길이 제한 없음
    },

    // 추가 메타데이터
    other: {
      'og:updated_time': eventDetail.updatedAt, // 마지막 수정 시간
      'article:published_time': eventDetail.createdAt, // 최초 발행 시간
      'article:modified_time': eventDetail.updatedAt, // 수정 시간
      'article:publisher': 'https://re-logging.com', // 발행자 정보
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
