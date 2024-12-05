export interface NewsArticleCard {
  id: string
  title: string
  aiSummary: string
  publishedAt: string // 'YYYY-MM-DD' 형식의 날짜 문자열
  imagePath?: string
}

export interface NewsArticleSimpleResponse {
  newsArticleSimpleResponseList: NewsArticleCard[]
  totalPage: number
  totalElements: number
}

export interface NewsArticle {
  id: number
  title: string
  content: string
  aiSummary: string
  source: string
  author: string
  publishedAt: string
  hits: number
  imageCaption: string
}
