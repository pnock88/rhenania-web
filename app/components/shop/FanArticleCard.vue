<script setup lang="ts">
import type { FanArticle } from '~/types/shop'

const props = defineProps<{
  article: FanArticle
}>()

const emit = defineEmits<{
  select: [article: FanArticle]
  preview: [image: string]
}>()

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(props.article.price)
})

const formattedOldPrice = computed(() => {
  if (props.article.oldPrice === undefined) {
    return ''
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(props.article.oldPrice)
})

const activeImageIndex = ref(0)

const productImages = computed(() => {
  if (props.article.images?.length) {
    return props.article.images
  }

  return [
    {
      src: props.article.image,
      alt: props.article.name,
    },
  ]
})

const activeImage = computed(() => {
  return productImages.value[activeImageIndex.value]
})

const showPreviousImage = () => {
  activeImageIndex.value =
    activeImageIndex.value === 0
      ? productImages.value.length - 1
      : activeImageIndex.value - 1
}

const showNextImage = () => {
  activeImageIndex.value =
    activeImageIndex.value === productImages.value.length - 1
      ? 0
      : activeImageIndex.value + 1
}

const badgeClasses = (badge: string) => {
  switch (badge.toLowerCase()) {
    case 'neu':
      return 'bg-emerald-600 text-white'

    case 'sonderpreis':
    case 'sale':
      return 'bg-red-600 text-white'

    case 'jubiläum':
      return 'bg-blue-700 text-white'

    case 'limitiert':
      return 'bg-amber-400 text-slate-950'

    default:
      return 'bg-slate-800 text-white'
  }
}
</script>

<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
  >
    <div
      class="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-50 p-3"
    >
      <div
        class="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-50 p-3"
      >
        <Transition
          name="product-image"
          mode="out-in"
        >
          <img
            :key="activeImage.src"
            :src="activeImage.src"
            :alt="activeImage.alt || article.name"
            loading="lazy"
            class="h-full w-full cursor-pointer object-contain transition duration-300 group-hover:scale-[1.03]"
            @click="emit('preview', activeImage.src)"
          >
        </Transition>

        <!--<span
          v-if="article.badge"
          class="absolute left-3 top-3 rounded-md bg-blue-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white"
        >
          {{ article.badge }}
        </span>-->

        <template v-if="productImages.length > 1">
          <button
            type="button"
            class="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white hover:text-blue-700"
            aria-label="Vorheriges Produktbild"
            @click.stop="showPreviousImage"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            class="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-white hover:text-blue-700"
            aria-label="Nächstes Produktbild"
            @click.stop="showNextImage"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div
            class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/90 px-2.5 py-2 shadow-sm"
          >
            <button
              v-for="(image, index) in productImages"
              :key="image.src"
              type="button"
              class="h-2 rounded-full transition-all"
              :class="
                activeImageIndex === index
                  ? 'w-5 bg-blue-900'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              "
              :aria-label="`Produktbild ${index + 1} anzeigen`"
              @click.stop="activeImageIndex = index"
            />
          </div>
        </template>
      </div>

     <div
        v-if="article.badges?.length"
        class="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5"
      >
        <span
          v-for="badge in article.badges"
          :key="badge"
          class="rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wide shadow-sm"
          :class="badgeClasses(badge)"
        >
          {{ badge }}
        </span>
      </div>
    </div>

    <div class="flex flex-1 flex-col border-t border-slate-100 p-4">
      <p
        v-if="article.subtitle"
        class="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-900"
      >
        {{ article.subtitle }}
      </p>

      <h3 class="mt-1.5 text-lg font-black leading-6 text-slate-950">
        {{ article.name }}
      </h3>

      <p
        v-if="article.description"
        class="mt-2 line-clamp-2 text-sm leading-6 text-slate-600"
      >
        {{ article.description }}
      </p>

      <p
        v-if="article.material"
        class="mt-2 text-xs leading-5 text-slate-500"
      >
        {{ article.material }}
      </p>

      <div class="mt-auto flex items-end justify-between gap-4 pt-5">
        <div>
          <p
            v-if="article.oldPrice"
            class="text-xs font-bold text-slate-400 line-through"
          >
            {{ formattedOldPrice }}
          </p>

          <p class="text-xl font-black text-slate-950">
            {{ formattedPrice }}
          </p>
        </div>

        <button
          type="button"
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-white transition hover:bg-blue-800"
          :aria-label="`${article.name} auswählen`"
          :title="`${article.name} auswählen`"
          @click="emit('select', article)"
        >
          <svg
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5.25H7.5A2.25 2.25 0 0 0 5.25 7.5v11.25A2.25 2.25 0 0 0 7.5 21h9A2.25 2.25 0 0 0 18.75 18.75V7.5A2.25 2.25 0 0 0 16.5 5.25H15m-6 0a2.25 2.25 0 1 0 6 0m-6 0a2.25 2.25 0 0 1 6 0"
            />
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>
<style>
.product-image-enter-active,
.product-image-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.product-image-enter-from {
  opacity: 0;
  transform: translateX(8px);
}

.product-image-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>