<script setup lang="ts">
const {
  items,
  itemCount,
  formattedSubtotal,
  isCartOpen,
  initializeCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  closeCart,
} = useCart()

const currentStep = ref<'cart' | 'order' | 'success'>('cart')

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

const itemTotal = (
  price: number,
  quantity: number,
) => {
  return formatPrice(price * quantity)
}

const openOrderForm = () => {
  if (!items.value.length) {
    return
  }

  currentStep.value = 'order'
}

const showCart = () => {
  currentStep.value = 'cart'
}

const showSuccess = () => {
  currentStep.value = 'success'
}

const finishOrder = () => {
  currentStep.value = 'cart'
  closeCart()
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeCart()
  }
}

onMounted(() => {
  initializeCart()
  window.addEventListener('keydown', handleEscape)
})

watch(isCartOpen, (open) => {
  if (!import.meta.client) {
    return
  }

  document.body.style.overflow = open ? 'hidden' : ''

  if (!open) {
    currentStep.value = 'cart'
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)

  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <!-- Hintergrund -->
    <Transition name="cart-overlay">
      <button
        v-if="isCartOpen"
        type="button"
        class="fixed inset-0 z-[90] bg-slate-950/60 backdrop-blur-sm"
        aria-label="Bestellliste schließen"
        @click="closeCart"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="cart-drawer">
      <aside
        v-if="isCartOpen"
        class="fixed bottom-0 right-0 top-0 z-[100] flex w-full max-w-xl flex-col bg-white shadow-2xl"
        aria-label="Bestellliste"
      >
        <!-- Kopfzeile -->
        <header
          class="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-7"
        >
          <div>
            <p
              class="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700"
            >
              Fanartikel
            </p>

            <h2 class="mt-1 text-2xl font-black text-slate-950">
              {{
                currentStep === 'cart'
                  ? 'Bestellliste'
                  : currentStep === 'order'
                    ? 'Bestellung'
                    : 'Bestellung abgeschlossen'
              }}
            </h2>
          </div>

          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-700 transition hover:bg-slate-200"
            aria-label="Bestellliste schließen"
            @click="closeCart"
          >
            ×
          </button>
        </header>

        <!-- Inhalt -->
        <div class="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          <!-- Bestellliste -->
          <template v-if="currentStep === 'cart'">
            <div v-if="items.length">
              <div class="space-y-5">
                <article
                  v-for="item in items"
                  :key="item.cartId"
                  class="grid grid-cols-[5rem_1fr] gap-4 border-b border-slate-200 pb-5"
                >
                  <!-- Produktbild -->
                  <div
                    class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-slate-100 p-2"
                  >
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="h-full w-full object-contain"
                    >
                  </div>

                  <!-- Produktdaten -->
                  <div class="min-w-0">
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <h3 class="font-black text-slate-950">
                          {{ item.name }}
                        </h3>

                        <p
                          v-if="item.subtitle"
                          class="mt-1 text-sm text-slate-500"
                        >
                          {{ item.subtitle }}
                        </p>
                      </div>

                      <button
                        type="button"
                        class="shrink-0 text-sm font-bold text-slate-400 transition hover:text-red-600"
                        @click="removeItem(item.cartId)"
                      >
                        Entfernen
                      </button>
                    </div>

                    <!-- Varianten -->
                    <div
                      v-if="item.size || item.color"
                      class="mt-3 flex flex-wrap gap-2 text-xs font-bold text-slate-600"
                    >
                      <span
                        v-if="item.size"
                        class="rounded-full bg-slate-100 px-3 py-1"
                      >
                        Größe: {{ item.size }}
                      </span>

                      <span
                        v-if="item.color"
                        class="rounded-full bg-slate-100 px-3 py-1"
                      >
                        Farbe: {{ item.color }}
                      </span>
                    </div>

                    <!-- Menge und Preis -->
                    <div
                      class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div
                        class="flex w-fit items-center overflow-hidden rounded-lg border border-slate-300"
                      >
                        <button
                          type="button"
                          class="flex h-9 w-9 items-center justify-center font-black text-slate-700 transition hover:bg-slate-100"
                          aria-label="Menge verringern"
                          @click="decreaseQuantity(item.cartId)"
                        >
                          −
                        </button>

                        <span
                          class="flex h-9 min-w-9 items-center justify-center border-x border-slate-300 text-sm font-black text-slate-950"
                        >
                          {{ item.quantity }}
                        </span>

                        <button
                          type="button"
                          class="flex h-9 w-9 items-center justify-center font-black text-slate-700 transition hover:bg-slate-100"
                          aria-label="Menge erhöhen"
                          @click="increaseQuantity(item.cartId)"
                        >
                          +
                        </button>
                      </div>

                      <div class="text-left sm:text-right">
                        <p class="text-xs text-slate-500">
                          {{ formatPrice(item.price) }} je Stück
                        </p>

                        <p class="font-black text-slate-950">
                          {{ itemTotal(item.price, item.quantity) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <button
                type="button"
                class="mt-6 text-sm font-bold text-slate-500 underline transition hover:text-red-600"
                @click="clearCart"
              >
                Bestellliste leeren
              </button>
            </div>

            <!-- Leere Bestellliste -->
            <div
              v-else
              class="flex min-h-[60vh] flex-col items-center justify-center text-center"
            >
              <div
                class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100"
                aria-hidden="true"
              >
                <svg
                  class="h-8 w-8 text-slate-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="19" cy="20" r="1" />
                  <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" />
                </svg>
              </div>

              <h3 class="mt-5 text-2xl font-black text-slate-950">
                Deine Bestellliste ist leer
              </h3>

              <p class="mt-3 max-w-sm leading-7 text-slate-600">
                Wähle einen Fanartikel aus und lege ihn in die Bestellliste.
              </p>

              <button
                type="button"
                class="mt-6 font-bold text-blue-700 transition hover:underline"
                @click="closeCart"
              >
                Weiter einkaufen
              </button>
            </div>
          </template>

          <!-- Bestellformular -->
          <OrderForm
            v-else-if="currentStep === 'order'"
            @back="showCart"
            @success="showSuccess"
          />

          <!-- Erfolg -->
          <div
            v-else
            class="flex min-h-[70vh] flex-col items-center justify-center text-center"
          >
            <div
              class="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700"
              aria-hidden="true"
            >
              <svg
                class="h-10 w-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <h2 class="mt-6 text-3xl font-black text-slate-950">
              Vielen Dank für deine Bestellung
            </h2>

            <p class="mt-4 max-w-sm leading-7 text-slate-600">
              Deine Bestellung wurde übermittelt. Wir melden uns wegen
              Abholung und Bezahlung bei dir.
            </p>

            <button
              type="button"
              class="mt-8 min-h-12 rounded-xl bg-blue-700 px-6 font-black text-white transition hover:bg-blue-800"
              @click="finishOrder"
            >
              Schließen
            </button>
          </div>
        </div>

        <!-- Zusammenfassung -->
        <footer
          v-if="items.length && currentStep === 'cart'"
          class="border-t border-slate-200 bg-slate-50 px-5 py-5 sm:px-7"
        >
          <div class="flex items-center justify-between gap-5">
            <div>
              <p class="text-sm font-semibold text-slate-500">
                {{ itemCount }}
                {{ itemCount === 1 ? 'Artikel' : 'Artikel' }}
              </p>

              <p class="mt-1 text-sm text-slate-500">
                Gesamtsumme
              </p>
            </div>

            <p class="text-2xl font-black text-slate-950">
              {{ formattedSubtotal }}
            </p>
          </div>

          <button
            type="button"
            class="mt-5 flex min-h-14 w-full items-center justify-center rounded-xl bg-blue-700 px-6 font-black text-white transition hover:bg-blue-800"
            @click="openOrderForm"
          >
            Anfrage fortsetzen
          </button>

          <p class="mt-3 text-center text-xs leading-5 text-slate-500">
            Die Bestellung ist erst nach dem Absenden des Formulars
            verbindlich.
          </p>
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cart-overlay-enter-active,
.cart-overlay-leave-active {
  transition: opacity 200ms ease;
}

.cart-overlay-enter-from,
.cart-overlay-leave-to {
  opacity: 0;
}

.cart-drawer-enter-active,
.cart-drawer-leave-active {
  transition: transform 300ms ease;
}

.cart-drawer-enter-from,
.cart-drawer-leave-to {
  transform: translateX(100%);
}
</style>