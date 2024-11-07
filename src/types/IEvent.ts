// 개별 플로깅 이벤트 타입 정의
export interface EventContentCard {
  id: string
  title: string
  location: string
  region: string
  hits: number
  imagePath: string
  startDate: string
  endDate: string
  caption: string
}

// 컨텐츠 배열 타입 정의
export interface PloggingEventContentList {
  content: EventContentCard[]
}
