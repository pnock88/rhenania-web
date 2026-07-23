<script setup lang="ts">
import type { FanArticle } from '~/types/shop'

const props = defineProps<{
  article: FanArticle | null
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { addItem } = useCart()

const selectedSize = ref('')
const selectedColor = ref('')
const quantity = ref(1)

const formattedPrice = computed(() => {
  if (!props.article) {
    return ''
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(props.article.price)
})

const hasRequiredSelection = computed(() => {
  if (!props.article) {
    return false
  }

  const hasSize =
    !props.article.sizes?.length
    || Boolean(selectedSize.value)

  const hasColor =
    !props.article.colors?.length
    || Boolean(selectedColor.value)

  return hasSize && hasColor
})

const resetSelection = () => {
  const article = props.article

  selectedSize.value =
    article?.sizes?.length === 1
      ? article.sizes[0]
      : ''

  selectedColor.value =
    article?.colors?.length === 1
        ? article.colors[0].name
        : ''

  quantity.value = 1
}

watch(
  () => props.article,
  resetSelection,
  {
    immediate: true,
  },
)

watch(
  () => props.open,
  (open) => {
    if (open) {
      resetSelection()
    }
  },
)

const decreaseQuantity = () => {
  quantity.value = Math.max(1, quantity.value - 1)
}

const increaseQuantity = () => {
  quantity.value += 1
}

const addSelectedItem = () => {
  if (!props.article || !hasRequiredSelection.value) {
    return
  }

  addItem({
    product: props.article,
    quantity: quantity.value,
    size: selectedSize.value || undefined,
    color: selectedColor.value || undefined,
    image: modalImage.value,
  })

  emit('close')
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.open) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
})

watch(
  () => props.open,
  (open) => {
    if (!import.meta.client) {
      return
    }

    document.body.style.overflow = open ? 'hidden' : ''
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})

const modalImage = computed(() => {
  if (!props.article) {
    return ''
  }

  const matchingImage = props.article.images?.find(
    image => image.color === selectedColor.value,
  )

  return matchingImage?.src ?? props.article.image
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open && article"
        class="fixed inset-0 z-[110] flex items-end justify-center bg-slate-950/60 p-4 backdrop-blur-sm sm:items-center"
        role="dialog"
        aria-modal="true"
        :aria-label="article.name"
        @click.self="emit('close')"
      >
        <div
          class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
        >
          <div class="flex items-start justify-between gap-5 border-b border-slate-200 p-6">
            <div>
              <p
                v-if="article.subtitle"
                class="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-700"
              >
                {{ article.subtitle }}
              </p>

              <h2 class="mt-1 text-2xl font-black text-slate-950">
                {{ article.name }}
              </h2>

              <p class="mt-2 text-xl font-black text-blue-700">
                {{ formattedPrice }}
              </p>
            </div>

            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-700 transition hover:bg-slate-200"
              aria-label="Auswahl schließen"
              @click="emit('close')"
            >
              ×
            </button>
          </div>

          <div class="p-6">
            <div class="grid gap-6 sm:grid-cols-[0.7fr_1fr]">
              <div
                class="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-4"
              >
                <img
                  :src="modalImage"
                  :alt="article.name"
                  class="h-full w-full object-contain"
                >
              </div>

              <div>
                <p
                  v-if="article.description"
                  class="text-sm leading-6 text-slate-600"
                >
                  {{ article.description }}
                </p>

                <p
                  v-if="article.material"
                  class="mt-3 text-xs leading-5 text-slate-500"
                >
                  {{ article.material }}
                </p>
              </div>
            </div>

            <div
              v-if="article.sizes?.length"
              class="mt-6"
            >
              <p class="text-sm font-bold text-slate-700">
                Größe
              </p>

              <div class="mt-3 flex flex-wrap gap-2">
                <button
                  v-for="size in article.sizes"
                  :key="size"
                  type="button"
                  class="min-w-12 rounded-xl border px-4 py-2 text-sm font-bold transition"
                  :class="
                    selectedSize === size
                      ? 'border-blue-900 bg-blue-900 text-white'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400'
                  "
                  @click="selectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <div
                v-if="article.colors?.length"
                class="mt-6"
                >
                <p class="text-sm font-bold text-slate-700">
                    Farbe
                </p>

                <div class="mt-3 flex flex-wrap gap-3">
                    <button
                        v-for="color in article.colors"
                        :key="color.name"
                        type="button"
                        class="relative h-9 w-9 rounded-full border-2 transition"
                        :class="
                            selectedColor === color.name
                            ? 'border-blue-900 ring-2 ring-blue-200'
                            : 'border-slate-300 hover:border-blue-400'
                        "
                        :style="{ backgroundColor: color.value }"
                        :title="color.name"
                        :aria-label="color.name"
                        :aria-pressed="selectedColor === color.name"
                        @click="selectedColor = color.name"
                    >
                    <svg
                        v-if="selectedColor === color.name"
                        class="absolute inset-0 m-auto h-4 w-4"
                        :class="
                        color.value.toLowerCase() === '#ffffff'
                            ? 'text-slate-900'
                            : 'text-white'
                        "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m5 12 4 4L19 6" />
                    </svg>
                    </button>
                </div>
                </div>

            <div class="mt-6">
              <p class="text-sm font-bold text-slate-700">
                Menge
              </p>

              <div
                class="mt-3 flex w-fit items-center overflow-hidden rounded-xl border border-slate-300"
              >
                <button
                  type="button"
                  class="flex h-11 w-11 items-center justify-center font-black text-slate-700 transition hover:bg-slate-100"
                  @click="decreaseQuantity"
                >
                  −
                </button>

                <span
                  class="flex h-11 min-w-11 items-center justify-center border-x border-slate-300 font-black text-slate-950"
                >
                  {{ quantity }}
                </span>

                <button
                  type="button"
                  class="flex h-11 w-11 items-center justify-center font-black text-slate-700 transition hover:bg-slate-100"
                  @click="increaseQuantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              class="mt-8 flex min-h-13 w-full items-center justify-center rounded-xl bg-blue-900 px-6 font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              :disabled="!hasRequiredSelection"
              @click="addSelectedItem"
            >
              In den Warenkorb
            </button>

            <p
              v-if="!hasRequiredSelection"
              class="mt-3 text-center text-sm font-semibold text-amber-700"
            >
              Bitte Größe und Farbe auswählen.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 200ms ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>