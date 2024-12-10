import { Metadata } from 'next'
import MeetupDetailContent from '../MeetupArticle'

// 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingMeetups/${params.id}`,
  )
  const meetupDetail = await response.json()

  return {
    title: `${meetupDetail.title} | 리로깅`,
    description: meetupDetail.content,
    openGraph: {
      title: meetupDetail.title,
      description: meetupDetail.content,
      images: [
        {
          url: meetupDetail.imageUrl,
          width: 1200,
          height: 630,
          alt: '플로깅 모임 이미지',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meetupDetail.title,
      description: meetupDetail.content,
      images: [meetupDetail.imageUrl],
    },
  }
}

export default function MeetupDetailPage() {
  return <MeetupDetailContent />
}
