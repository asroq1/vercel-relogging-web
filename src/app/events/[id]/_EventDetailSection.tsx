'use client'

import { useParams, usePathname } from 'next/navigation'
import { IEventContentCarouselProps } from '@/types/IEvent'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ErrorAlert } from '@/components/status/ErrorAlert'
import { LoadingSkeleton } from '@/components/status/LoadingSkeleton'
import { Card, CardContent } from '@/components/ui/card'
import HomeButton from '@/components/HomeButton'
import Image from 'next/image'
import { getRandomDefaultImage } from '@/constans/images'
import { linkifyContent } from '@/utils/linkifyContent'
import LocationIcon from '@/assets/icon_location.svg'
import LabeledContent from '@/components/LabeledContent'
import CommentSection from '@/components/comment/CommentSection'
import { useEventsQueries } from '@/hooks/useEventsQueries'

function ImageListCarousel({ imageList }: IEventContentCarouselProps) {
  return (
    <Carousel className="mx-auto w-4/5">
      <CarouselContent className="max-h-dvh">
        {imageList?.map((image: any) => (
          <CarouselItem key={image.id} className="overflow-auto">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={image.url ?? getRandomDefaultImage()}
                    alt="Plogging eventDetail main image"
                    width={1920}
                    height={1080}
                    quality={100}
                    className="h-auto w-full rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export const EventDetailSection = () => {
  const params = useParams()
  const path = usePathname()
  const pageSize = 5
  const eventId = path.split('/').pop() ?? ''
  // const { toast } = useToast()
  const {
    // 이벤트 디테일
    eventDetail,
    eventDetailIsError,
    eventDetailIsLoading,
    eventDetailError,
    //이벤트 페이지네이션

    // 이전 이벤트, 다음 이벤트
    // navigate,
    // isNavigatingPrev,
    // isNavigatingNext,

    refetchEventDetail,
  } = useEventsQueries({
    eventId,
    pageSize,
  })
  if (eventDetailIsLoading) {
    return (
      <section className="flex flex-col gap-10 md:col-span-6 laptop:flex-[8]">
        <LoadingSkeleton columns={1} rows={1} />
      </section>
    )
  }

  if (
    eventDetailIsError ||
    eventDetailError ||
    eventDetail?.status === 404 ||
    !eventDetail
  ) {
    const errorMessage =
      eventDetail?.message || '데이터를 불러오는데 실패했습니다.'
    console.error('Event Detail Error:', {
      eventDetailIsError,
      eventDetailError,
      eventDetail,
    })
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
      <section className="flex flex-[8] flex-col gap-10 md:col-span-6">
        <ErrorAlert error={errorMessage} />
      </section>
    )
  }
  return (
    <section className="flex flex-[8] flex-col gap-10 pb-10 md:col-span-6">
      {/* 이벤트 상단 제목 */}
      <div className="flex w-full flex-col gap-10">
        <HomeButton returnPath="/?tab=ploggingEvent" />
        <header className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <span className="text-sm font-bold text-orange">
              {eventDetail?.region}
            </span>
          </div>
          <h1 className="text-3xl font-bold">{eventDetail?.title}</h1>
          <div className="flex justify-between">
            <div className="flex items-center">
              <LocationIcon className="h-4 w-4" />
              <p className="text-sm font-bold text-text">
                {eventDetail?.location}
              </p>
            </div>
            <div>
              <p className="text-sm text-textLight">
                조회수 {eventDetail?.hits}
              </p>
            </div>
          </div>
        </header>
      </div>
      {/* // 이미지  */}
      {eventDetail?.imageList?.length > 0 && (
        <div className="relative w-full">
          {eventDetail?.imageList?.length === 1 ? (
            <Image
              src={eventDetail?.imageList[0]?.url}
              alt={
                eventDetail?.imageList[0]?.caption ?? '플로깅 모임 설명 이미지'
              }
              width={1920}
              height={1080}
              quality={80}
              className="h-auto w-full rounded-lg"
            />
          ) : (
            <ImageListCarousel imageList={eventDetail.imageList} />
          )}
        </div>
      )}
      {/* 이벤트 상세 정보 */}
      <div className="rounded-lg bg-background p-6">
        {/* 상세 내용 제외 */}
        <div className="mb-4 grid grid-cols-1 gap-4 rounded-lg text-sm laptop:grid-cols-2">
          <LabeledContent
            label="참여기간"
            content={`${eventDetail.startDate} - ${eventDetail.endDate}`}
          />
          <LabeledContent
            label="참여장소"
            content={eventDetail?.location ?? '-'}
          />
          <LabeledContent
            label="참여방법"
            linkLabel="웹사이트 바로가기"
            type="link"
            content={eventDetail?.url ?? '-'}
          />
          <LabeledContent
            label="담당자명"
            content={eventDetail?.managerName ?? '-'}
          />
          <LabeledContent
            label="전화번호"
            content={eventDetail?.phoneNumber ?? '-'}
          />
        </div>
        <div className="prose max-w-none space-y-4 text-sm">
          <p className="flex min-h-[22px] w-[53px] items-center justify-center whitespace-nowrap rounded-sm border bg-green p-1 text-xs font-medium text-white">
            상세내용
          </p>
          <p className="mb-4 whitespace-pre-wrap text-xs text-text">
            {linkifyContent(eventDetail?.content) ?? '-'}
          </p>
        </div>
      </div>
      <CommentSection
        eventId={params.id as string}
        eventDetail={eventDetail}
        refetchEventDetail={refetchEventDetail}
        contentType="ploggingEvents"
      />
      {/* <div className="flex items-center justify-between">
        <Button
          className="min-w-[120px] bg-solid"
          onClick={() => {
            onChangeEventDetail('prev')
          }}
        >
          {isNavigatingPrev ? (
            <LoadingSpinner color="grey" />
          ) : (
            '이전 이벤트 보기'
          )}
        </Button>
        <Button
          className="min-w-[120px] bg-solid"
          onClick={() => {
            onChangeEventDetail('next')
          }}
        >
          {isNavigatingNext ? (
            <LoadingSpinner color="grey" />
          ) : (
            '다음 이벤트 보기'
          )}
        </Button>
      </div> */}
    </section>
  )
}
