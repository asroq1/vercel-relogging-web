import { Loader2 } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

interface ILoadingSkeletonProps {
  className?: string
  rows?: number // 행 개수
  columns?: number // 열 개수
  showLoader?: boolean // 로더 표시 여부
}

// 원하는 스타일에 따라서 로딩 스켈레톤을 row, column으로 나눠서 보여줄 수 있습니다.

export function LoadingSkeleton({
  // className,
  rows = 2, // 기본값 설정
  columns = 3, // 기본값 설정
  showLoader = true, // 기본값 설정
}: ILoadingSkeletonProps) {
  // 전체 아이템 개수 계산
  const totalItems = rows * columns

  return (
    <div className="space-y-6">
      <div
        className={`grid gap-6 ${
          columns === 1
            ? 'grid-cols-1'
            : columns === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-3'
        }`}
      >
        {Array.from({ length: totalItems }).map((_, index) => (
          <div key={index} className="space-y-4 rounded-lg border p-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
      {showLoader && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          <span className="ml-2 text-sm text-gray-500">로딩 중...</span>
        </div>
      )}
    </div>
  )
}
