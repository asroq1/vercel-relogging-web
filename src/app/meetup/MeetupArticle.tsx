'use client'

import HomeButton from '@/components/HomeButton'
// import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LabeledContent from '@/components/LabeledContent'
import { ErrorAlert } from '@/components/status/ErrorAlert'
import { LoadingSkeleton } from '@/components/status/LoadingSkeleton'
import ContentList from '@/components/ContentList'
import { useMeetupQueries } from '@/hooks/useMeetupList'
import { IMeetupDetailSectionProps } from '@/types/IMeetup'
import { getRandomDefaultImage } from '@/constans/images'
// import { useToast } from '@/hooks/use-toast'
// import LoadingSpinner from '@/components/LoadingSpinner'
import dayjs from 'dayjs'

const MeetupDetailSection = ({
  meetupDetail,
  isLoading,
  isError,
  error,
  // handleMeetupChange,
  // isNavigatingPrev,
  // isNavigatingNext,
}: IMeetupDetailSectionProps) => {
  if (isLoading) {
    return (
      <section className="flex flex-col gap-10 md:col-span-6 laptop:flex-[8]">
        <LoadingSkeleton />
      </section>
    )
  }

  if (isError || !meetupDetail) {
    return (
      <section className="flex flex-[8] flex-col gap-10 md:col-span-6">
        <ErrorAlert
          error={error?.message || '데이터를 불러오는데 실패했습니다'}
        />
      </section>
    )
  }
  return (
    <section className="flex flex-[8] flex-col gap-10 pb-10 md:col-span-6">
      {/* 이벤트 상단 제목 */}
      <div className="flex w-full flex-col gap-10">
        <HomeButton returnPath="/?tab=meetup" />
        <header className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <span className="text-sm font-bold text-orange">
              {meetupDetail?.region}
            </span>
          </div>
          <h1 className="text-3xl font-bold">{meetupDetail?.title}</h1>
          <div className="flex justify-between">
            <div className="flex items-center">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm text-textLight">
                조회수 {meetupDetail?.hits}
              </p>
            </div>
          </div>
        </header>
      </div>
      <div>
        <Image
          src={meetupDetail?.imageUrl ?? getRandomDefaultImage()}
          alt="Plogging meetupDetail main image"
          width={1920}
          height={1080}
          priority
          className="h-auto max-h-[568px] w-full rounded-lg object-cover"
        />
      </div>
      {/* 이벤트 상세 정보 */}
      <div className="rounded-lg bg-background p-6">
        {/* 상세 내용 제외 */}
        <div className="mb-4 grid grid-cols-1 gap-4 rounded-lg text-sm laptop:grid-cols-2">
          <LabeledContent
            label="활동 기간"
            content={`${dayjs(meetupDetail.startDate).format('YYYY-MM-DD HH:mm')} ~ ${dayjs(meetupDetail.endDate).format('YYYY-MM-DD HH:mm')}`}
          />
          <LabeledContent
            label="모임 이름"
            content={meetupDetail?.title ?? '-'}
          />
          <LabeledContent
            label="활동지역"
            content={meetupDetail?.region ?? '-'}
          />
          <LabeledContent
            label="지원 내용"
            content={meetupDetail?.supportDetails ?? '-'}
          />
          <LabeledContent
            label="활동 장소"
            content={meetupDetail?.location ?? '-'}
          />
          <LabeledContent
            label="자격사항"
            content={meetupDetail?.participantTarget ?? '-'}
          />
          <LabeledContent
            label="활동 시간"
            content={meetupDetail?.activityHours ?? '-'}
          />
          <LabeledContent
            label="담당자"
            content={meetupDetail?.contactPerson ?? '-'}
          />{' '}
          <LabeledContent
            label="연락처"
            content={meetupDetail?.contactNumber ?? '-'}
          />{' '}
          <LabeledContent
            label="지원링크"
            content={meetupDetail?.registrationLink ?? '-'}
          />
        </div>
        <div className="prose max-w-none space-y-4 text-sm">
          <p className="flex min-h-[22px] w-[53px] items-center justify-center whitespace-nowrap rounded-sm border bg-green p-1 text-xs font-medium text-white">
            모임소개
          </p>
          <p className="mb-4 whitespace-pre-wrap p-1 text-xs text-text">
            {meetupDetail?.content ?? '-'}
          </p>
        </div>
      </div>
      {/* <div className="flex items-center justify-between">
        <Button
          className="min-w-[120px] bg-solid"
          onClick={() => {
            handleMeetupChange('prev')
          }}
        >
          {isNavigatingPrev ? (
            <LoadingSpinner color="grey" />
          ) : (
            '이전 모임 보기'
          )}
        </Button>
        <Button
          className="min-w-[120px] bg-solid"
          onClick={() => {
            handleMeetupChange('next')
          }}
        >
          {isNavigatingNext ? (
            <LoadingSpinner color="grey" />
          ) : (
            '다음 모임 보기'
          )}
        </Button>
      </div> */}
    </section>
  )
}

export default function MeetupDetailContent() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정

  const pageSize = 6 // 페이지 당 아이템 수
  const path = usePathname()
  const meetupId = path.split('/').pop() || ''
  // const { toast } = useToast()

  const handlePageChange = async (newPage: number) => {
    if (newPage < 0) return
    if (meetupList?.totalPage && newPage >= meetupList.totalPage) return
    setCurrentPage(newPage)
  }

  const {
    // 이벤트 디테일
    meetupDetail,
    meetupDetailiIsLoading,
    meetupDetailError,
    //이벤트 페이지네이션
    meetupList,
    meetupListIsError,
    meetupListIsLoading,

    // 이전 이벤트, 다음 이벤트
    // navigate,
    // isNavigatingNext,
    // isNavigatingPrev,
  } = useMeetupQueries({
    currentPage,
    pageSize,
    meetupId,
  })

  // const onChangeMeetupDetail = (type: MeetupDetailType) => {
  //   if (!meetupDetail?.id) return

  //   navigate(
  //     { type, currentId: meetupDetail.id },
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
          <MeetupDetailSection
            meetupDetail={meetupDetail}
            isLoading={meetupDetailiIsLoading}
            isError={meetupDetailiIsLoading}
            error={meetupDetailError}
            // handleMeetupChange={onChangeMeetupDetail}
            // isNavigatingPrev={isNavigatingPrev}
            // isNavigatingNext={isNavigatingNext}
          />
        </div>

        {/* 중앙 Divider */}
        <div className="hidden h-auto w-[1px] bg-gray-200 laptop:block" />

        {/* 오른쪽 사이드바 */}
        <div className="hidden min-w-0 laptop:block laptop:flex-[4]">
          <ContentList
            contentData={meetupList?.ploggingMeetupSimpleResponseList ?? []}
            totalPage={meetupList?.totalPage ?? 0}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            cotentListIsLoading={meetupListIsLoading}
            contentListIsError={meetupListIsError}
            eventType={'meetup'}
            styleType={'side'}
          />
        </div>
      </div>
    </article>
  )
}
