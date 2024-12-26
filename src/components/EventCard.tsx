import { IEventContentCard } from '@/types/IEvent'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import dayjs from 'dayjs'
import IconTime from '@/assets/icon_time.svg'
import IconLocation from '@/assets/icon_location.svg'
import { DEFAULT_IMAGES } from '@/constans/images'

interface IEventCardProps {
  eventData: IEventContentCard
  styleType: 'grid' | 'side'
  currentPage: number
}

export const EventCard = ({
  eventData,
  styleType,
  currentPage,
}: IEventCardProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const eventDetailId = pathname.split('/').pop()?.toString()
  const isClicked = eventDetailId === eventData.id.toString()

  const onClickEventDetail = (id: string) => {
    switch (styleType) {
      case 'side':
        router.push(`/events/${id}?index=${currentPage}`, {
          scroll: false,
        })
        break

      default:
        router.push(`/events/${id}`, {
          scroll: false,
        })
    }
  }

  return (
    <Card
      className={`flex aspect-[378/175] min-h-[200px] w-full cursor-pointer flex-col overflow-hidden p-4 transition-shadow duration-300 hover:shadow-lg laptop:min-h-[200px] laptop:max-w-[378px] ${
        isClicked
          ? 'border-2 border-green bg-green/5 shadow-md'
          : 'hover:shadow-lg'
      } `}
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
          <h3 className="line-clamp-2 w-full text-lg font-bold text-text md:flex-[6]">
            {eventData.title}
          </h3>
          {/* 이미지 - 모바일에서는 전체 너비, 데스크톱에서는 40% */}

          <div className="relative h-[100px] w-full rounded-lg md:flex-[4]">
            <Image
              id={eventData.image?.id.toString()}
              src={eventData.image?.url ?? DEFAULT_IMAGES.THUMBNAIL}
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
