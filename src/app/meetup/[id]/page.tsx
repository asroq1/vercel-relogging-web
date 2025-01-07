import MeetupSidebar from '@/app/meetup/[id]/_MeetupSidebar'
import { Metadata } from 'next'
import { MeetupDetailSection } from '@/app/meetup/[id]/_MeetupDetailSection'

// meetup 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingMeetups/${params.id}`,
  )
  const meetupDetail = await response.json()
  const keywords = [
    '플로깅',
    meetupDetail.region,
    '환경보호',
    '러닝',
    meetupDetail.title,
    '플로깅모임',
    meetupDetail.location,
    meetupDetail.participantTarget,
    '플로깅크루',
    '환경운동',
    '지역봉사',
  ].filter(Boolean)
  // 설명 텍스트 구성
  const description = `
   ${meetupDetail.region}에서 진행되는 플로깅 모임 "${meetupDetail.title}"
   📍 활동장소: ${meetupDetail.location}
   👥 참가대상: ${meetupDetail.participantTarget}
   ⏰ 활동시간: ${meetupDetail.activityHours}
   💝 지원내용: ${meetupDetail.supportDetails}
 `.trim()

  return {
    title: `${meetupDetail.title} | ${meetupDetail.region} 플로깅 모임 | 리로깅`,
    description,
    keywords,
    openGraph: {
      title: `${meetupDetail.title} - ${meetupDetail.region} 플로깅 모임`,
      description,
      type: 'article',
      url: `https://re-logging.com/meetup/${params.id}`,
      images: [
        {
          url: meetupDetail?.imageUrl ?? '',
          width: 720,
          height: 377,
          alt: `${meetupDetail.region} ${meetupDetail.title} 플로깅 모임`,
        },
      ],
      locale: 'ko_KR',
      siteName: '리로깅',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${meetupDetail.title} | ${meetupDetail.region} 플로깅`,
      description: `${meetupDetail.region} 플로깅 모임에 참여하세요!
       📍 ${meetupDetail.location}
       👥 ${meetupDetail.participantTarget}`,
      images: [meetupDetail?.imageUrl ?? ''],
      creator: '@리로깅',
      site: '@리로깅',
    },

    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      nocache: true,
    },

    other: {
      'og:updated_time': meetupDetail.updatedAt,
      'article:published_time': meetupDetail.createdAt,
      'article:modified_time': meetupDetail.updatedAt,
      'article:publisher': 'https://re-logging.com',
      'article:category': '플로깅',
      'article:region': meetupDetail.region,
    },
  }
}

export default function MeetupDetailPage() {
  return (
    <article className="m-auto mt-16 flex h-auto w-full max-w-7xl gap-6 bg-white p-5">
      {/* // 이벤트 이미지 밎 상세 정보 */}
      <div className="flex w-full gap-6">
        {/* 왼쪽 뉴스 디테일 */}
        <div className="w-full min-w-0 laptop:flex-[8]">
          <MeetupDetailSection />
        </div>
        {/* 중앙 Divider */}
        <div className="hidden h-auto w-[1px] bg-gray-200 laptop:block" />
        {/* 오른쪽 사이드바 */}
        <div className="hidden min-w-0 laptop:block laptop:flex-[4]">
          <MeetupSidebar />
        </div>
      </div>
    </article>
  )
}
