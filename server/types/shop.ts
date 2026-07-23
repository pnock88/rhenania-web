export type ServerOrderCustomer = {
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

export type ServerOrderItem = {
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

export type ServerShopOrder = {
  customer: ServerOrderCustomer
  items: ServerOrderItem[]
  total: number
}

export type PreparedShopOrder = ServerShopOrder & {
  orderNumber: string
  createdAt: Date
  calculatedTotal: number
}