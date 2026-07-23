export interface StrapiCollectionResponse<T> {
  data: T[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiMediaFormat {
  url: string
  width?: number
  height?: number
}

export interface StrapiMedia {
  id: number
  documentId?: string
  name: string
  alternativeText?: string | null
  caption?: string | null
  width?: number | null
  height?: number | null
  url: string

  formats?: {
    thumbnail?: StrapiMediaFormat | null
    small?: StrapiMediaFormat | null
    medium?: StrapiMediaFormat | null
    large?: StrapiMediaFormat | null
  } | null
}

export interface StrapiFanArticleCategory {
  id: number
  documentId?: string
  Name: string
  Slug: string
  Beschreibung?: string | null
  Sortierung?: number | null
  Aktiv?: boolean
}

export interface StrapiFanArticleColor {
  id: number
  Name: string
  Farbwert: string
  Bild?: StrapiMedia | null
}

export interface StrapiFanArticleSize {
  id: number
  documentId?: string
  Bezeichnung: string
  Sortierung?: number | null
  Aktiv?: boolean
}

export interface StrapiFanArticleBadge {
  id: number
  documentId?: string
  Titel: string
  Farbe?: string | null
  Sortierung?: number | null
  Aktiv?: boolean
  Hintergrundfarbe?: string | null
  Textfarbe?: string | null
}

export interface StrapiFanArticle {
  id: number
  documentId?: string
  Name: string
  Slug: string
  Kurzbeschreibung?: string | null
  Beschreibung?: string | null
  Preis: number
  AlterPreis?: number | null
  Aktiv?: boolean
  Reihenfolge?: number | null
  Material?: string | null
  Lagerbestand?: number | null
  Highlight?: boolean
  images?: StrapiMedia[] | null
  categories?: StrapiFanArticleCategory[] | null
  colors?: StrapiFanArticleColor[] | null
  sizes?: StrapiFanArticleSize[] | null
  badges?: StrapiFanArticleBadge[] | null
}