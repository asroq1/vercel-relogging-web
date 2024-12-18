'use client'

import dayjs from 'dayjs'
import HomeButton from '@/components/HomeButton'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import CommentSection from '@/components/comment/CommentSection'
import LabeledContent from '@/components/LabeledContent'
import { ErrorAlert } from '@/components/status/ErrorAlert'
import { LoadingSkeleton } from '@/components/status/LoadingSkeleton'
import { useMeetupQueries } from '@/hooks/useMeetupList'
import { useParams, usePathname } from 'next/navigation'

export const MeetupDetailSection = () => {
  const pageSize = 5 // 페이지 당 아이템 수
  const params = useParams()
  const path = usePathname()
  const meetupId = path.split('/').pop() || ''

  const {
    // 이벤트 디테일
    meetupDetail,
    meetupDetailiIsLoading,
    meetupDetailError,
    meetupDetailIsError,
    //이벤트 페이지네이션

    // 이전 이벤트, 다음 이벤트
    // navigate,
    // isNavigatingNext,
    // isNavigatingPrev,
    refetchMeetupDetail,
  } = useMeetupQueries({
    // currentPage,
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

  if (meetupDetailiIsLoading) {
    return (
      <section className="flex flex-col gap-10 md:col-span-6 laptop:flex-[8]">
        <LoadingSkeleton columns={1} rows={1} />
      </section>
    )
  }

  if (meetupDetailIsError || !meetupDetail) {
    return (
      <section className="flex flex-[8] flex-col gap-10 md:col-span-6">
        <ErrorAlert
          error={
            meetupDetailError?.message || '데이터를 불러오는데 실패했습니다'
          }
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
              <span className="text-sm">{meetupDetail?.location}</span>
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
        {meetupDetail?.imageUrl && (
          <Image
            src={meetupDetail?.imageUrl}
            alt="플로깅 모임 설명 이미지"
            width={1920}
            height={1080}
            priority
            className="h-auto max-h-[568px] w-full rounded-lg object-cover"
          />
        )}
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
            linkLabel="링크 바로가기"
            type="link"
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
      <CommentSection
        eventId={params.id as string}
        eventDetail={meetupDetail}
        refetchEventDetail={refetchMeetupDetail}
        contentType="ploggingMeetups"
      />
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
