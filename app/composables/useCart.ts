import type {
  AddToCartInput,
  CartItem,
} from '~/types/shop'

const STORAGE_KEY = 'rhenania-fanartikel-cart'

export const useCart = () => {
  const items = useState<CartItem[]>(
    'fanartikel-cart',
    () => [],
  )

  const isCartOpen = useState<boolean>(
    'fanartikel-cart-open',
    () => false,
  )

  const isInitialized = useState<boolean>(
    'fanartikel-cart-initialized',
    () => false,
  )

  const createCartId = (
    productId: string,
    size?: string,
    color?: string,
  ) => {
    return [
      productId,
      size ?? 'no-size',
      color ?? 'no-color',
    ].join('::')
  }

  const saveCart = () => {
    if (!import.meta.client) {
      return
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items.value),
    )
  }

  const initializeCart = () => {
    if (
      !import.meta.client
      || isInitialized.value
    ) {
      return
    }

    try {
      const storedCart =
        localStorage.getItem(STORAGE_KEY)

      if (storedCart) {
        const parsedCart: unknown =
          JSON.parse(storedCart)

        if (Array.isArray(parsedCart)) {
          items.value = parsedCart as CartItem[]
        }
      }
    }
    catch (error) {
      console.error(
        'Die gespeicherte Bestellliste konnte nicht geladen werden:',
        error,
      )
    }
    finally {
      isInitialized.value = true
    }
  }

  const addItem = ({
    product,
    quantity = 1,
    size,
    color,
    image,
  }: AddToCartInput) => {
    const selectedImage =
      image || product.image

    const cartId = createCartId(
      product.id,
      size,
      color,
    )

    const existingItem = items.value.find(
      item => item.cartId === cartId,
    )

    if (existingItem) {
      existingItem.quantity += quantity
      existingItem.image = selectedImage

      saveCart()
      isCartOpen.value = true
      return
    }

    items.value.push({
      cartId,
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      quantity,
      size,
      color,
      image: selectedImage,
    })

    saveCart()
    isCartOpen.value = true
  }

  const removeItem = (
    cartId: string,
  ) => {
    items.value = items.value.filter(
      item => item.cartId !== cartId,
    )

    saveCart()
  }

  const setQuantity = (
    cartId: string,
    quantity: number,
  ) => {
    const item = items.value.find(
      currentItem =>
        currentItem.cartId === cartId,
    )

    if (!item) {
      return
    }

    if (quantity <= 0) {
      removeItem(cartId)
      return
    }

    item.quantity = quantity
    saveCart()
  }

  const increaseQuantity = (
    cartId: string,
  ) => {
    const item = items.value.find(
      currentItem =>
        currentItem.cartId === cartId,
    )

    if (!item) {
      return
    }

    setQuantity(
      cartId,
      item.quantity + 1,
    )
  }

  const decreaseQuantity = (
    cartId: string,
  ) => {
    const item = items.value.find(
      currentItem =>
        currentItem.cartId === cartId,
    )

    if (!item) {
      return
    }

    setQuantity(
      cartId,
      item.quantity - 1,
    )
  }

  const clearCart = () => {
    items.value = []
    saveCart()
  }

  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  const toggleCart = () => {
    isCartOpen.value =
      !isCartOpen.value
  }

  const itemCount = computed(() => {
    return items.value.reduce(
      (sum, item) =>
        sum + item.quantity,
      0,
    )
  })

  const subtotal = computed(() => {
    return items.value.reduce(
      (sum, item) =>
        sum
        + item.price
        * item.quantity,
      0,
    )
  })

  const formattedSubtotal = computed(() => {
    return new Intl.NumberFormat(
      'de-DE',
      {
        style: 'currency',
        currency: 'EUR',
      },
    ).format(subtotal.value)
  })

  return {
    items,
    itemCount,
    subtotal,
    formattedSubtotal,
    isCartOpen,
    initializeCart,
    addItem,
    removeItem,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  }
}