export type StrapiMedia = {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  url: string
  formats?: {
    thumbnail?: {
      url: string
    }
    small?: {
      url: string
    }
    medium?: {
      url: string
    }
    large?: {
      url: string
    }
  } | null
}

export type StrapiArticle = {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  featured: boolean
  publishedAt: string
  date: string | null
  createdAt: string
  updatedAt: string
  image: StrapiMedia | null
  card: StrapiMedia | null
}

export type StrapiSponsor = {
  id: number
  documentId: string
  name: string
  url: string | null
  level: 'Hauptpartner' | 'Teampartner' | 'Vereinspartner'
  order: number
  active: boolean
  logo: StrapiMedia | null
  publishedAt: string
  createdAt: string
  updatedAt: string
}

eexport type TrainingDay =
  | 'Montag'
  | 'Dienstag'
  | 'Mittwoch'
  | 'Donnerstag'
  | 'Freitag'
  | 'Samstag'
  | 'Sonntag'

export type StrapiTrainingSession = {
  id: number
  day: TrainingDay
  startTime: string | null
  endTime: string | null
  location: string
  note: string | null
}

export type StrapiTeam = {
  id: number
  documentId: string
  name: string
  slug: string
  category: TeamCategory
  section: TeamSection
  description: string
  league: string | null
  order: number
  active: boolean
  image: StrapiMedia | null
  trainingSessions: StrapiTrainingSession[]
  coaches: StrapiCoach[]
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export type StrapiCoach = {
  id: number
  name: string
  role: string
  email: string | null
  phone: string | null
  order: number
  active: boolean
  image: StrapiMedia | null
}

export type StrapiCollectionResponse<T> = {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type StrapiSingleResponse<T> = {
  data: T
  meta: Record<string, unknown>
}

export type StrapiTextNode = {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export type StrapiLinkNode = {
  type: 'link'
  url: string
  children: StrapiTextNode[]
}

export type StrapiBlock = {
  type:
    | 'paragraph'
    | 'heading'
    | 'list'
    | 'list-item'
    | 'quote'
    | 'code'
  level?: number
  format?: 'ordered' | 'unordered'
  children: Array<StrapiTextNode | StrapiLinkNode | StrapiBlock>
}