import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { getRandomDefaultImage } from '@/constans/images'
import { IMeetupContentCard } from '@/types/IMeetup'
import IconTime from '@/assets/icon_time.svg'
import IconLocation from '@/assets/icon_location.svg'
import dayjs from 'dayjs'

interface IMeetupCardProps {
  meetupData: IMeetupContentCard
  styleType: 'grid' | 'side'
  currentPage: number
}
export const MeetupCard = ({
  meetupData,
  styleType,
  currentPage,
}: IMeetupCardProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const meetupDetailId = pathname.split('/').pop()?.toString()
  const isClicked = meetupDetailId === meetupData.id.toString()

  const onClickMeeupDetail = (id: string) => {
    switch (styleType) {
      case 'side':
        router.push(`/meetup/${id}?index=${currentPage}`, {
          scroll: false,
        })
        break

      default:
        router.push(`/meetup/${id}`, {
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
      onClick={() => onClickMeeupDetail(meetupData.id.toString())}
    >
      {/* <CardContent className="p-6"> */}
      {/* 상단 정보 */}
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-orange"> {meetupData.region}</span>
        </div>
        <div className="flex items-center gap-4 md:flex-row">
          {/* 제목 - 모바일에서는 전체 너비, 데스크톱에서는 60% */}
          <h3 className="line-clamp-2 w-full text-lg font-bold text-text md:flex-[6]">
            {meetupData.title}
          </h3>
          {/* 이미지 - 모바일에서는 전체 너비, 데스크톱에서는 40% */}

          <div className="relative h-[100px] w-full rounded-lg md:flex-[4]">
            <Image
              src={meetupData.imageUrl ?? getRandomDefaultImage()}
              alt={meetupData.title}
              fill
              priority
              sizes="w-100 h-100"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div>
          {/* 위치 정보 */}
          <div className="flex items-center justify-between gap-2 text-text">
            <div className="flex gap-2">
              <IconLocation className="min-w-[12px]" />
              <span className="text-sm"> {meetupData.location}</span>
            </div>
            {/* <span className="text-sm text-gray-400">
              조회수 {meetupData.hits}
            </span> */}
          </div>

          {/* 날짜 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-text">
              <IconTime className="min-w-[12px]" />
              <p className="text-sm">
                {dayjs(meetupData.startDate).format('YYYY-MM-DD')} ~
                {dayjs(meetupData.endDate).format('YYYY-MM-DD')}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-400">
                조회수 {meetupData.hits}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* </CardContent> */}
    </Card>
  )
}
