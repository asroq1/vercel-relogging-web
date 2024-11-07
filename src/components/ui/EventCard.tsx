import { EventContentCard } from '@/types/IEvent'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { MapPin, Clock } from 'lucide-react'
import { DEFAULT_IMAGE } from '@/types/INews'

export const EventCard = ({ eventData }: { eventData: EventContentCard }) => {
  const router = useRouter()

  const onClickEventDetail = (id: string) => {
    router.push(`/events/${id}`)
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <Card
      className="flex aspect-[378/175] min-h-[200px] w-full cursor-pointer flex-col overflow-hidden p-4 transition-shadow duration-300 hover:shadow-lg laptop:min-h-[200px] laptop:max-w-[378px]"
      onClick={() => onClickEventDetail(eventData.id)}
    >
      {/* <CardContent className="p-6"> */}
      {/* 상단 정보 */}
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-orange">{eventData.region}</span>
        </div>
        <div className="flex items-center gap-4 md:flex-row">
          {/* 제목 - 모바일에서는 전체 너비, 데스크톱에서는 60% */}
          <h3 className="line-clamp-2 w-full text-lg font-bold text-text md:flex-[6]">
            {eventData.title}
          </h3>
          {/* 이미지 - 모바일에서는 전체 너비, 데스크톱에서는 40% */}

          <div className="relative h-[100px] w-full rounded-lg md:flex-[4]">
            <Image
              src={eventData.imagePath ?? DEFAULT_IMAGE}
              alt={eventData.caption || eventData.title}
              fill
              sizes="w-100 h-100"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div>
          {/* 위치 정보 */}
          <div className="flex items-center justify-between gap-2 text-text">
            <div className="flex gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{eventData.location}</span>
            </div>
            <span className="text-sm text-gray-400">
              조회수 {eventData.hits}
            </span>
          </div>

          {/* 날짜 정보 */}
          <div className="flex items-center gap-2 text-text">
            <Clock className="h-4 w-4" />
            <p className="text-sm">
              {formatDate(eventData.startDate)} ~{' '}
              {formatDate(eventData.endDate)}
            </p>
          </div>
        </div>
      </div>
      {/* </CardContent> */}
    </Card>
  )
}
