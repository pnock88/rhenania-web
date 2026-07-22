<script setup lang="ts">
const {
  latestArticles: newsItems,
  pending,
  error,
  refresh,
} = useNewsData()

const slider = ref<HTMLElement | null>(null)

const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const updateScrollButtons = () => {
  const element = slider.value

  if (!element) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }

  canScrollLeft.value = element.scrollLeft > 5

  canScrollRight.value =
    element.scrollLeft + element.clientWidth
    < element.scrollWidth - 5
}

const scrollSlider = (direction: 'left' | 'right') => {
  const element = slider.value

  if (!element) {
    return
  }

  const card = element.querySelector<HTMLElement>('[data-news-card]')
  const gap = 20

  const distance = card
    ? card.offsetWidth + gap
    : element.clientWidth

  element.scrollBy({
    left: direction === 'right' ? distance : -distance,
    behavior: 'smooth',
  })
}

const handleResize = () => {
  updateScrollButtons()
}

onMounted(() => {
  nextTick(updateScrollButtons)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watch(
  newsItems,
  () => {
    nextTick(updateScrollButtons)
  },
  {
    flush: 'post',
  },
)
</script>

<template>
  <BaseSection class="overflow-hidden bg-white">
    <!-- Überschrift -->
    <div
      class="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-900"
        >
          Aus dem Vereinsleben
        </p>

        <h2
          class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Aktuelles
        </h2>

        <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Neuigkeiten, Veranstaltungen und Informationen aus unserem Verein.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Slider-Steuerung -->
        <div
          v-if="newsItems.length > 4"
          class="flex items-center gap-2"
        >
          <button
            type="button"
            aria-label="Vorherige Meldung"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-30"
            :disabled="!canScrollLeft"
            @click="scrollSlider('left')"
          >
            <svg
              class="h-5 w-5"
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
            aria-label="Nächste Meldung"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-30"
            :disabled="!canScrollRight"
            @click="scrollSlider('right')"
          >
            <svg
              class="h-5 w-5"
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
        </div>

        <NuxtLink
          to="/news"
          class="inline-flex items-center gap-2 whitespace-nowrap font-bold text-blue-900 transition hover:text-blue-500"
        >
          Alle News

          <span aria-hidden="true">
            →
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- Ladezustand -->
    <div
      v-if="pending"
      class="py-20 text-center"
    >
      <p class="font-bold text-slate-600">
        Neuigkeiten werden geladen …
      </p>
    </div>

    <!-- Fehlerzustand -->
    <BaseAlert
      v-else-if="error"
      variant="error"
      role="alert"
    >
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>
          Die Neuigkeiten konnten nicht geladen werden.
        </span>

        <button
          type="button"
          class="font-bold underline"
          @click="refresh"
        >
          Erneut versuchen
        </button>
      </div>
    </BaseAlert>

    <!-- Slider -->
    <div
      v-else-if="newsItems.length"
      class="relative"
    >
      <div
        ref="slider"
        class="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 scrollbar-hide sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        @scroll.passive="updateScrollButtons"
      >
        <div
          v-for="article in newsItems"
          :key="article.documentId"
          data-news-card
          class="w-[85%] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] xl:w-[calc((100%-60px)/4)]"
        >
          <NewsCard
            :article="article"
            class="h-full"
          />
        </div>
      </div>

      <!-- Mobile-Hinweis -->
      <p
        v-if="newsItems.length > 1"
        class="mt-1 text-center text-sm text-slate-400 sm:hidden"
      >
        Zum Durchblättern seitlich wischen
      </p>
    </div>

    <!-- Keine News -->
    <div
      v-else
      class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center"
    >
      <h3 class="text-2xl font-black text-slate-950">
        Noch keine Neuigkeiten
      </h3>

      <p class="mt-3 text-slate-600">
        Sobald Artikel in Strapi veröffentlicht sind, erscheinen sie hier.
      </p>
    </div>
  </BaseSection>
</template>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>