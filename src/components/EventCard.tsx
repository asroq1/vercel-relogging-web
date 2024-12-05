import { IEventContentCard } from '@/types/IEvent'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { getRandomDefaultImage } from '@/constans/images'
import dayjs from 'dayjs'
import IconTime from '@/assets/icon_time.svg'
import IconLocation from '@/assets/icon_location.svg'

export const EventCard = ({ eventData }: { eventData: IEventContentCard }) => {
  const router = useRouter()

  const onClickEventDetail = (id: string) => {
    router.push(`/events/${id}`)
  }

  return (
    <Card
      className="flex aspect-[378/175] min-h-[200px] w-full cursor-pointer flex-col overflow-hidden p-4 transition-shadow duration-300 hover:shadow-lg laptop:min-h-[200px] laptop:max-w-[378px]"
      onClick={() => onClickEventDetail(eventData.id)}
    >
      {/* 상단 정보 */}
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="line-clamp-1 text-xs text-orange">
            {eventData.region}
          </span>
        </div>
        <div className="flex items-center gap-4 md:flex-row">
          {/* 제목 - 모바일에서는 전체 너비, 데스크톱에서는 60% */}
          <h3 className="line-clamp-1 w-full text-lg font-bold text-text md:flex-[6]">
            {eventData.title}
          </h3>
          {/* 이미지 - 모바일에서는 전체 너비, 데스크톱에서는 40% */}

          <div className="relative h-[100px] w-full rounded-lg md:flex-[4]">
            <Image
              id={eventData.image?.id.toString()}
              src={eventData.image?.url ?? getRandomDefaultImage()}
              alt={eventData.caption ?? '플로깅 이미지'}
              fill
              priority
              sizes="w-100 h-100"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div>
          {/* 위치 정보 */}
          <div className="flex items-center gap-2 text-text">
            <div className="flex w-4/5 items-center gap-2">
              <IconLocation className="min-w-[12px]" />
              <span className="line-clamp-1 text-sm">{eventData.location}</span>
            </div>
          </div>

          {/* 날짜 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <IconTime className="min-w-[12px]" />
              <span className="line-clamp-1 text-sm">
                {dayjs(eventData.startDate).format('YYYY-MM-DD')} ~{' '}
                {dayjs(eventData.endDate).format('YYYY-MM-DD')}
              </span>
            </div>
            <div>
              <span className="w-1/5 text-sm text-gray-400">
                조회수 {eventData.hits}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
