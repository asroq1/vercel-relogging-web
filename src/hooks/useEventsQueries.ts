import { IEventsQueries, IPloggingEventContentList } from '@/types/IEvent'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export async function fetchEventsArticle(page: number, size: number) {
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('size', size.toString())
  params.append('sort', 'desc')

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvents/list?${params.toString()}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const fetchEventDetail = async (eventId: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvents/${eventId}`,
    {
      method: 'get',
    },
  ).then((res) => {
    return res.json()
  })
  return data
}

export const useEventsQueries = ({
  currentPage,
  pageSize,
  eventId,
}: IEventsQueries) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const eventsListQuery = useQuery<IPloggingEventContentList>({
    queryKey: ['eventsList', currentPage, pageSize],
    queryFn: () => fetchEventsArticle(currentPage ?? 0, pageSize ?? 15),
    // staleTime: 5 * 60 * 1000, // 데이터가 "신선"하다고 간주되는 시간 (5분)
    // gcTime: 30 * 60 * 1000, // 데이터가 캐시에 유지되는 시간 (30분)
  })

  const eventDetailQuery = useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: async () => {
      try {
        const response = await fetchEventDetail(eventId ?? '')
        if (!response) {
          throw new Error('이벤트를 찾을 수 없습니다.')
        }
        return response
      } catch (error: unknown) {
        // 에러 객체 강화
        throw {
          message:
            error instanceof Error
              ? error.message
              : '이벤트를 불러오는데 실패했습니다.',
          status: (error as any)?.status || 404,
        }
      }
    },
    enabled: !!eventId,
    retry: false, // 404 에러의 경우 재시도하지 않음
  })

  // 이전/다음 이벤트 네비게이션
  const navigationMutation = useMutation({
    mutationFn: async ({
      type,
      currentId,
    }: {
      type: 'prev' | 'next'
      currentId: string
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingEvents/${currentId}/${type}`,
      )

      const nextEvent = await response.json()
      if (!response.ok)
        throw {
          ...nextEvent,
          type,
        }
      // 응답에서 받은 이벤트 데이터를 바로 캐시에 저장
      queryClient.setQueryData(['eventDetail', nextEvent.id], nextEvent)

      return { nextEvent, type }
    },
    onSuccess: (result) => {
      // URL 업데이트
      router.push(`/events/${result.nextEvent.id}`)
    },
  })

  return {
    // 이벤트 리스트
    eventsList: eventsListQuery.data,
    eventsListIsLoading: eventsListQuery.isLoading,
    evnetListError: eventsListQuery.error,
    eventListIsError: eventsListQuery.isError,
    // 이벤트 디테일
    eventDetail: eventDetailQuery.data,
    eventDetailIsLoading: eventDetailQuery.isLoading,
    eventDetailIsError: eventDetailQuery.isError,
    eventDetailError: eventDetailQuery.error,

    navigate: navigationMutation.mutate,
    isNavigating: navigationMutation.isPending,
    isNavigationError: navigationMutation.isError,
    isNaviationPending: navigationMutation.isPending,
    isNavigatingPrev:
      navigationMutation.isPending &&
      navigationMutation.variables?.type === 'prev',
    isNavigatingNext:
      navigationMutation.isPending &&
      navigationMutation.variables?.type === 'next',

    refetchEventDetail: eventDetailQuery.refetch,
  }
}
