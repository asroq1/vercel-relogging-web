import { Metadata } from 'next'
import EventDetailContent from './EventArticle'

// 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvents/${params.id}`,
  )

  const eventDetail = await response.json()
  // 서버 사이드 로깅
  console.log('[Server] News Detail:', JSON.stringify(eventDetail, null, 2))
  return {
    title: `${eventDetail.title} | 리로깅`,
    description: eventDetail.content,
    openGraph: {
      title: eventDetail.title,
      description: eventDetail.content,
      images: [
        {
          url: eventDetail.imageList[0],
          width: 1200,
          height: 630,
          alt: '플로깅 이벤트 이미지',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: eventDetail.title,
      description: eventDetail.content,
      images: [eventDetail.imageList[0]],
    },
  }
}

export default function EventDetailPage() {
  return <EventDetailContent />
}
