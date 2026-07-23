export interface FanArticleImage {
  src: string
  alt: string
  color?: string
}

export interface FanArticleColor {
  name: string
  value: string
  image?: string
}

export interface FanArticleBadge {
  id: string
  label: string
  backgroundColor: string
  textColor: string
}

export interface FanArticleCategory {
  id: string
  name: string
  slug: string
}

export interface FanArticle {
  id: string
  slug: string
  name: string

  subtitle?: string
  description?: string
  material?: string

  price: number
  oldPrice?: number

  image: string
  images?: FanArticleImage[]

  sizes?: string[]
  colors?: FanArticleColor[]
  badges?: FanArticleBadge[]
  categories?: FanArticleCategory[]

  stock: number
  highlight: boolean
}

export interface CartItem {
  cartId: string
  productId: string
  name: string
  subtitle?: string
  image: string
  price: number
  quantity: number
  size?: string
  color?: string
}

export interface AddToCartInput {
  product: FanArticle
  quantity?: number
  size?: string
  color?: string
  image?: string
}