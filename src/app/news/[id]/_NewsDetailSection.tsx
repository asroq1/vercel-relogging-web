'use client'

import { LoadingSkeleton } from '@/components/status/LoadingSkeleton'
import { ErrorAlert } from '@/components/status/ErrorAlert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GptIcon from '@/assets/icon_gpt.svg'
import HomeButton from '@/components/HomeButton'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useNewsQueries } from '@/hooks/useNewsQueries'
export const NewsDetailSection = () => {
  // 뉴스 디테일

  const path = usePathname()
  const articleId = path.split('/').pop()
  const pageSize = 5 // 페이지 당 아이템 수
  const {
    // 이벤트 디테일
    newsDetail,
    newsDetailIsError,
    newsListError,
    newsDetailIsLoading,

    //이벤트 페이지네이션
    // newsList,

    // 이전 이벤트, 다음 이벤트
    // navigate,
    // isNavigatingNext,
    // isNavigatingPrev,
    // isNavigating,
  } = useNewsQueries({
    // currentPage,
    pageSize,
    articleId: articleId ?? '',
  })

  //   const onChangeEventDetail = (type: 'prev' | 'next') => {
  //     if (!newsDetail?.id) return

  //     navigate(
  //       { type, currentId: newsDetail.id },
  //       {
  //         onError: (error: Error) => {
  //           toast({
  //             title: '이동 실패',
  //             description: `${error.message}`,
  //             variant: 'destructive',
  //             duration: 1500,
  //           })
  //         },
  //       },
  //     )
  //   }

  if (newsDetailIsLoading) {
    return (
      <section className="flex flex-col gap-10 md:col-span-6 laptop:flex-[8]">
        <LoadingSkeleton columns={1} rows={1} />
      </section>
    )
  }

  if (newsDetailIsError || !newsDetail) {
    return (
      <section className="flex flex-[8] flex-col gap-10 md:col-span-6">
        <ErrorAlert
          error={newsListError?.message || '데이터를 불러오는데 실패했습니다'}
        />
      </section>
    )
  }

  return (
    <section className="flex flex-[8] flex-col gap-10 md:col-span-6">
      {/* 상단 제목  */}
      <div className="flex w-full flex-col gap-10">
        <HomeButton returnPath="/?tab=news" />
        <header className="mb-6">
          {/* 뉴스 헤드라인 */}
          <h1 className="mb-2 text-2xl font-bold">{newsDetail?.title}</h1>
          {/* 뉴스 정보 */}
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-text">
              {newsDetail?.author}
            </p>
            <p className="text-sm text-gray-500">
              조회수 {newsDetail?.hits} | {newsDetail?.publishedAt} 발행
            </p>
          </div>
        </header>
      </div>
      <div className="mb-2">
        {newsDetail?.imagePath && (
          <Image
            src={newsDetail?.imagePath}
            alt="뉴스 설명 이미지"
            width={1920}
            height={1080}
            priority
            className="h-auto max-h-[568px] w-full rounded-lg"
          />
        )}

        {/* 뉴스 썸네일 설명 */}
        <p className="mt-2 text-sm text-textLight">
          {newsDetail?.imageCaption}
        </p>
      </div>
      <div className="flex flex-col gap-4 rounded-lg bg-background p-5">
        <div className="w-full rounded-lg">
          <div className="mb-6 flex items-center gap-3">
            <GptIcon />
            <div>
              <p className="font-semibold">ChatGPT</p>
              <p className="text-sm text-textLight">
                <span className="text-green">AI</span>가 기사를 아래와 같이
                <span className="text-green"> 요약</span>
                했어요.
              </p>
            </div>
          </div>
          <div className="mb-6">
            <p>{newsDetail?.aiSummary}</p>
          </div>
          <div>
            <Button
              asChild
              className="w-full border bg-background text-textLight hover:bg-hoverGray"
            >
              <Link
                href={`${newsDetail?.source}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                기사 전문 보기
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* 하단 기사 버튼 */}
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
            '이전 기사 보기'
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
            '다음 기사 보기'
          )}
        </Button>
      </div> */}
    </section>
  )
}
