'use client'

import HomeButton from '@/components/HomeButton'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useEventsQueries } from '@/hooks/useEventsQueries'
import LabeledContent from '@/components/LabeledContent'
import { ErrorAlert } from '@/components/status/ErrorAlert'
import { LoadingSkeleton } from '@/components/status/LoadingSkeleton'
import ContentList from '@/components/ContentList'
import LocationIcon from '@/assets/icon_location.svg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import {
  IEventContentCarouselProps,
  IEventDetailSectionProps,
} from '@/types/IEvent'
import { DEFAULT_IMAGES } from '@/constans/images'

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
                    src={image.url ?? DEFAULT_IMAGES.THUMBNAIL}
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

const EventDetailSection = ({
  eventDetail,
  isLoading,
  isError,
  error,
  // onChangeEventDetail,
  // isNavigatingPrev,
  // isNavigatingNext,
}: IEventDetailSectionProps) => {
  if (isLoading) {
    return (
      <section className="flex flex-col gap-10 md:col-span-6 laptop:flex-[8]">
        <LoadingSkeleton />
      </section>
    )
  }

  if (isError || error || eventDetail?.status === 404 || !eventDetail) {
    const errorMessage =
      eventDetail?.message || '데이터를 불러오는데 실패했습니다.'
    console.error('Event Detail Error:', { isError, error, eventDetail })

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
      <div className="relative w-full">
        {eventDetail?.imageList?.length <= 1 ? (
          <Image
            src={
              eventDetail?.imageList.length > 0
                ? eventDetail?.imageList[0]?.url
                : DEFAULT_IMAGES.THUMBNAIL
            }
            alt={eventDetail?.imageList[0]?.caption ?? '플로깅 이미지'}
            width={1920}
            height={1080}
            quality={80}
            className="h-auto w-full rounded-lg"
          />
        ) : (
          <ImageListCarousel imageList={eventDetail.imageList} />
        )}
      </div>
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
            {eventDetail?.content ?? '-'}
          </p>
        </div>
      </div>
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

export default function EventDetailContent() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정

  const pageSize = 6 // 페이지 당 아이템 수
  // const path = usePathname()
  // const { toast } = useToast()

  const path = usePathname()
  const eventId = path.split('/').pop() || ''

  const handlePageChange = async (newPage: number) => {
    if (newPage < 0) return
    if (eventsList?.totalPages && newPage >= eventsList.totalPages) return
    setCurrentPage(newPage)
  }

  const {
    // 이벤트 디테일
    eventDetail,
    eventDetailIsError,
    eventDetailIsLoading,
    eventDetailError,
    //이벤트 페이지네이션
    eventsList,
    eventListIsError,
    eventsListIsLoading,

    // 이전 이벤트, 다음 이벤트
    // navigate,
    // isNavigatingPrev,
    // isNavigatingNext,
  } = useEventsQueries({
    currentPage,
    pageSize,
    eventId,
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
    <article className="m-auto mt-16 flex max-h-[1355px] w-full max-w-7xl gap-6 bg-white p-5">
      {/* // 이벤트 이미지 밎 상세 정보 */}
      <div className="flex w-full gap-6">
        {/* 왼쪽 뉴스 디테일 */}
        <div className="w-full min-w-0 laptop:flex-[8]">
          <EventDetailSection
            eventDetail={eventDetail}
            isLoading={eventDetailIsLoading}
            isError={eventDetailIsError}
            error={eventDetailError}
            // onChangeEventDetail={onChangeEventDetail}
            // isNavigatingPrev={isNavigatingPrev}
            // isNavigatingNext={isNavigatingNext}
          />
        </div>

        {/* 중앙 Divider */}
        <div className="hidden h-auto w-[1px] bg-gray-200 laptop:block" />

        {/* 오른쪽 사이드바 */}
        <div className="hidden min-w-0 laptop:block laptop:flex-[4]">
          <ContentList
            contentData={eventsList?.content ?? []}
            totalPage={eventsList?.totalPages ?? 0}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            cotentListIsLoading={eventsListIsLoading}
            contentListIsError={eventListIsError}
            eventType={'events'}
            styleType={'side'}
          />
        </div>
      </div>
    </article>
  )
}
