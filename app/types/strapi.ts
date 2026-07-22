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
  description: string
  league: string | null
  order: number
  active: boolean
  image: StrapiMedia | null
  trainingSessions: StrapiTrainingSession[]
  coaches: StrapiPerson[]
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

export type MatchStatus =
  | 'upcoming'
  | 'finished'
  | 'cancelled'
  | 'postponed'

export type StrapiMatch = {
  id: number
  documentId: string
  competition: string
  dateTime: string
  location: string | null
  matchStatus: MatchStatus
  homeTeamName: string
  awayTeamName: string
  homeLogo: StrapiMedia | null
  awayLogo: StrapiMedia | null
  homeScore: number | null
  awayScore: number | null
  featured: boolean
  team: StrapiTeam | null
  publishedAt: string
  createdAt: string
  updatedAt: string
  matchday: number | null
  season: string | null
  venueType: MatchVenueType
}

export type MatchVenueType =
  | 'home'
  | 'away'
  | 'neutral'

export type StrapiPerson = {
  id: number
  documentId: string
  name: string
  slug: string
  function: string | null
  email: string | null
  phone: string | null
  mobile: string | null
  description: string | null
  order: number | null
  active: boolean
  board: boolean | null
  youth: boolean | null
  coach: boolean | null
  contact: boolean | null
  instagram: string | null
  facebook: string | null
  linkedin: string | null
  image?: StrapiMedia | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type StrapiClub = {
  id: number
  documentId: string
  name: string
  founded: number | null
  slogan: string | null
  description: StrapiContentBlock[] | null
  history: StrapiContentBlock[] | null
  historyEntries: StrapiHistoryEntry[]
  street: string | null
  zip: string | null
  city: string | null
  email: string | null
  phone: string | null
  website: string | null
  facebook: string | null
  instagram: string | null
  youtube: string | null
  clubhouseName: string | null
  clubhouseDescription: string | null
  heroImage: StrapiMedia | null
  historyImage: StrapiMedia | null
  chairman: StrapiPerson | null
  viceChairman: StrapiPerson | null
  youthManager: StrapiPerson | null
  viceYouthManager: StrapiPerson | null
  membershipContact: StrapiPerson | null
  sponsorContact: StrapiPerson | null
  managingDirector: StrapiPerson | null
  cashier: StrapiPerson | null
  viceCashier: StrapiPerson | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type StrapiSingleResponse<T> = {
  data: T | null
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

export type StrapiBlockNode =
  | StrapiTextNode
  | StrapiLinkNode
  | StrapiContentBlock

export type StrapiContentBlock = {
  type:
    | 'paragraph'
    | 'heading'
    | 'list'
    | 'list-item'
    | 'quote'
    | 'code'
  level?: number
  format?: 'ordered' | 'unordered'
  children: StrapiBlockNode[]
}

export type StrapiHistoryEntry = {
  id: number
  year: number | null
  yearLabel: string | null
  title: string
  content: StrapiContentBlock[] | null
  image: StrapiMedia | null
  imageAlt: string | null
  order: number | null
  featured: boolean
}