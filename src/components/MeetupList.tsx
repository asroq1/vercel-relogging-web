import { useState } from 'react'
import ContentList from './ContentList'
import { useMeetupQueries } from '@/hooks/useMeetupList'
import { EmptyState } from './status/EmptyStatus'
import { ErrorAlert } from './status/ErrorAlert'
import { LoadingSkeleton } from './status/LoadingSkeleton'
import AddIcon from '@/assets/icon_add.svg'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function MeetupList() {
  const [currentPage, setCurrentPage] = useState(0) // 초기 페이지 1번으로 설정
  const pageSize = 15 // 페이지 당 아이템 수
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')
  const {
    meetupList,
    meetupListIsLoading,
    meetupListIsError,
    meetupListError,
  } = useMeetupQueries({ currentPage, pageSize })

  const handlePageChange = async (newPage: number) => {
    if (newPage < 0) return
    if (meetupList?.totalPage && newPage >= meetupList.totalPage) return
    setCurrentPage(newPage)
  }

  if (meetupListIsLoading) return <LoadingSkeleton />

  if (meetupListError || !meetupList || meetupListIsError) {
    return (
      <ErrorAlert
        error={meetupListError?.message || '데이터를 불러오는데 실패했습니다'}
      />
    )
  }

  if (meetupList.ploggingMeetupSimpleResponseList.length === 0) {
    return (
      <EmptyState
        title="플로깅 모임이 없습니다"
        description="현재 플로깅 모임이 없습니다."
      />
    )
  }

  return (
    <>
      <div className="mb-4 mt-4 flex justify-between">
        <div>
          {/* TODO: 지역 미지정, 등록순 버튼 추가 */}
          {/* <Button>지역 미지정</Button> // 
          <Button>등록순</Button> */}
        </div>

        <Link
          href={{
            pathname: '/meetup/new',
            query: { tab: currentTab }, // 현재 탭 상태 유지
          }}
          scroll={false}
          className="flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-green transition-all laptop:w-full laptop:max-w-[200px]"
        >
          <AddIcon width={20} height={20} color="white"></AddIcon>
          <span className="hidden whitespace-nowrap text-white sm:inline">
            새 모임 등록하기
          </span>
        </Link>
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
