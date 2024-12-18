import { IMeetupListResponse, ImeetupQueries } from '@/types/IMeetup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

export async function fetchMeetupingArticle(
  page: number,
  pageSize: number,
  region?: string,
  progressStatus = false,
  sortBy = 'START_DATE',
  sortDirection = 'DESC',
) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    isOpen: progressStatus.toString(),
    sortBy,
    sortDirection,
    ...(region && { region }), // region이 있을 때만 추가
  })

  // params.append('isOpen', progressStatus.toString())
  // params.append('sortBy', sortBy)
  // params.append('sortDirection', sortDirection)

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingMeetups/list?${params.toString()}`

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

const fetchMeetupDetail = async (meetupId: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingMeetups/${meetupId}`,
    {
      method: 'get',
    },
  ).then((res) => {
    return res.json()
  })
  return data
}

export const useMeetupQueries = ({
  currentPage,
  pageSize,
  meetupId,
  region,
  sortBy,
  progressStatus,
}: ImeetupQueries) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  if (region === '전체') region = undefined
  const meetupListQuery = useQuery<IMeetupListResponse>({
    queryKey: [
      'meetupList',
      currentPage,
      pageSize,
      currentPage,
      pageSize,
      region,
      sortBy,
      progressStatus,
    ],
    queryFn: () =>
      fetchMeetupingArticle(
        currentPage ?? 0,
        pageSize ?? 15,
        region,
        progressStatus,
        sortBy,
      ),
  })

  const meetupDetailQuery = useQuery({
    queryKey: ['meetupDetail', meetupId],
    queryFn: () => fetchMeetupDetail(meetupId ?? ''),
    enabled: !!meetupId,
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/ploggingMeetups/${currentId}/${type}`,
      )
      const data = await response.json()

      if (!response.ok)
        throw {
          ...data,
          type,
        }

      // 응답에서 받은 이벤트 데이터를 바로 캐시에 저장
      queryClient.setQueryData(['meetupDetail', data.id], data)

      return { data, type }
    },
    onSuccess: (result) => {
      // URL 업데이트
      router.push(`/meetup/${result.data.id}`)
    },
  })

  return {
    // 모임 리스트
    meetupList: meetupListQuery.data,
    meetupListIsLoading: meetupListQuery.isLoading,
    meetupListError: meetupListQuery.error,
    meetupListIsError: meetupListQuery.isError,
    // 모암 디테일
    meetupDetail: meetupDetailQuery.data,
    meetupDetailiIsLoading: meetupDetailQuery.isLoading,
    meetupDetailIsError: meetupDetailQuery.isError,
    meetupDetailError: meetupDetailQuery.error,

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
    refetchMeetupDetail: meetupDetailQuery.refetch,
  }
}

interface IMeetupFormData {
  title: string
  content: string
  location: string
  region: string
  startDate?: string
  endDate?: string
  participantTarget: string
  activityHours: string
  contactPerson: string
  contactNumber: string
  registrationLink: string
  supportDetails: string
  image?: File
}

interface IMeetupFormRequest {
  request: IMeetupFormData
  image?: File | null
}

export const useCreateMeetupQueries = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const createMeetupMutation = useMutation({
    mutationFn: async (data: IMeetupFormRequest) => {
      const formData = new FormData()

      formData.append('request', JSON.stringify(data.request))
      formData.append('image', data.image || 'null')

      const response = await fetch(`/api/ploggingMeetups`, {
        credentials: 'include',
        method: 'POST',
        body: formData,
      })
      if (response.status === 302)
        throw new Error('로그인이 필요한 서비스입니다.')
      if (!response.ok) throw new Error('모임 등록 실패')

      return response.json()
    },
    onSuccess: () => {
      console.log('모임 등록 성공')
      queryClient.invalidateQueries({ queryKey: ['meetups'] })
      toast({
        title: '모임 등록 성공',
        description: '모임이 성공적으로 등록되었습니다.',
        variant: 'default',
        duration: 1500,
      })
      router.back()
    },
    onError: (error: Error) => {
      toast({
        title: '모임 등록 실패',
        description: error.message || '모임 등록 중 오류가 발생했습니다.',
        variant: 'destructive',
        duration: 1500,
      })
      console.error('Error:', error)
      throw new Error('모임 등록 실패')
    },
  })

  return {
    createMeetup: createMeetupMutation,
    isCreatingMeetup: createMeetupMutation.isPending,
    isCreateMeetupError: createMeetupMutation.isError,
    createMeetupError: createMeetupMutation.error,
  }
}
