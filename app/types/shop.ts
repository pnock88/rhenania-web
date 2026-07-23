export type FanArticleImage = {
  src: string
  alt?: string
  color?: string
}

export type FanArticleColor = {
  name: string
  value: string
}

export type FanArticle = {
  id: string
  name: string
  subtitle?: string
  description?: string
  price: number
  oldPrice?: number
  image: string
  images?: FanArticleImage[]
  colors?: FanArticleColor[]
  material?: string
  sizes?: string[]
  badges?: string[]
}

export type CartItem = {
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

export type OrderCustomer = {
  firstName: string
  lastName: string
  street: string
  zip: string
  city: string
  email: string
  phone: string
  note?: string
  privacyAccepted: boolean
}

export type ShopOrder = {
  customer: OrderCustomer
  items: CartItem[]
  total: number
}

export type AddToCartInput = {
  product: FanArticle
  quantity?: number
  size?: string
  color?: string
  image?: string
}