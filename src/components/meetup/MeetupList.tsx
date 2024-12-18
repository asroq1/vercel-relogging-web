import { useState } from 'react'
import ContentList from '@/components/ContentList'
import { useMeetupQueries } from '@/hooks/useMeetupList'
import { EmptyState } from '@/components/status/EmptyStatus'
import { ErrorAlert } from '@/components/status/ErrorAlert'
import { LoadingSkeleton } from '@/components/status/LoadingSkeleton'
import AddIcon from '@/assets/icon_add.svg'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { MeetupFilters } from '@/components/meetup/MeetupFilters'
import { IRegistNewMeetupButtonProps } from '@/types/IMeetup'

export const RegistNewMeetupButton = ({
  tabType,
}: IRegistNewMeetupButtonProps) => {
  return (
    <Link
      href={{
        pathname: '/meetup/new',
        query: { tab: tabType }, // 현재 탭 상태 유지
      }}
      scroll={false}
      className="flex h-10 min-w-[40px] items-center justify-center gap-2 rounded-md bg-green transition-all laptop:w-[200px]"
    >
      <AddIcon width={20} height={20} color="white"></AddIcon>
      <span className="hidden whitespace-nowrap text-white sm:inline">
        새 모임 등록하기
      </span>
    </Link>
  )
}

export default function MeetupList() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const [region, setRegion] = useState('전체') // 지역 선택
  const [sortBy, setSortBy] = useState('START_DATE') // 정렬 선택
  const [progressStatus, setProgressStatus] = useState(false) // 진행중인 모임만 보기
  const pageSize = 15 // 페이지 당 아이템 수
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')

  const {
    meetupList,
    meetupListIsLoading,
    meetupListIsError,
    meetupListError,
  } = useMeetupQueries({
    currentPage,
    pageSize,
    region,
    sortBy,
    progressStatus,
  })

  const handlePageChange = async (newPage: number) => {
    if (newPage < 0) return
    if (meetupList?.totalPage && newPage >= meetupList.totalPage) return
    setCurrentPage(newPage)
  }

  if (meetupListIsLoading) return <LoadingSkeleton />

  if (meetupListError || !meetupList || meetupListIsError) {
    return (
      <div className="flex flex-col gap-4">
        <div className="mb-4 mt-4 flex justify-between">
          <MeetupFilters
            setRegion={setRegion}
            setSortBy={setSortBy}
            setProgressStatus={setProgressStatus}
            region={region}
            sortBy={sortBy}
            progressStatus={progressStatus}
          />
          <RegistNewMeetupButton tabType={currentTab || ''} />
        </div>
        <ErrorAlert
          error={meetupListError?.message || '데이터를 불러오는데 실패했습니다'}
        />
      </div>
    )
  }

  if (meetupList.ploggingMeetupSimpleResponseList.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="mb-4 mt-4 flex justify-between">
          <MeetupFilters
            setRegion={setRegion}
            setSortBy={setSortBy}
            setProgressStatus={setProgressStatus}
            region={region}
            sortBy={sortBy}
            progressStatus={progressStatus}
          />
          <RegistNewMeetupButton tabType={currentTab || ''} />
        </div>
        <EmptyState
          title="플로깅 모임이 없습니다"
          description="현재 플로깅 모임이 없습니다."
        />
      </div>
    )
  }

  return (
    <>
      <div className="mb-4 mt-4 flex justify-between gap-4 overflow-x-auto pb-2 pt-2">
        <MeetupFilters
          setRegion={setRegion}
          setSortBy={setSortBy}
          setProgressStatus={setProgressStatus}
          region={region}
          sortBy={sortBy}
          progressStatus={progressStatus}
        />
        <div>
          <RegistNewMeetupButton tabType={currentTab || ''} />
        </div>
      </div>
      <ContentList
        contentData={meetupList?.ploggingMeetupSimpleResponseList}
        totalPage={meetupList?.totalPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        cotentListIsLoading={meetupListIsLoading}
        contentListIsError={meetupListIsError}
        eventType={'meetup'}
        styleType={'grid'}
      />
    </>
  )
}
