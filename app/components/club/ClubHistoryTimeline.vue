<script setup lang="ts">
import type { StrapiHistoryEntry } from '~/types/strapi'

const props = defineProps<{
  entries: StrapiHistoryEntry[]
}>()

const { getStrapiMediaUrl } = useStrapiMedia()

const openEntries = ref<number[]>([])

const sortedEntries = computed(() => {
  return [...props.entries].sort((a, b) => {
    const orderA = a.order ?? a.year ?? 0
    const orderB = b.order ?? b.year ?? 0

    return orderA - orderB
  })
})

const displayYear = (entry: StrapiHistoryEntry) => {
  return entry.yearLabel || entry.year?.toString() || ''
}

const isOpen = (entryId: number) => {
  return openEntries.value.includes(entryId)
}

const toggleEntry = (entryId: number) => {
  if (isOpen(entryId)) {
    openEntries.value = openEntries.value.filter(id => id !== entryId)
    return
  }

  openEntries.value.push(entryId)
}

const openAll = () => {
  openEntries.value = sortedEntries.value.map(entry => entry.id)
}

const closeAll = () => {
  openEntries.value = []
}
</script>

<template>
  <div>
    <div
      v-if="sortedEntries.length > 1"
      class="mb-8 flex flex-wrap gap-3"
    >
      <button
        type="button"
        class="rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-800"
        @click="openAll"
      >
        Alle öffnen
      </button>

      <button
        type="button"
        class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-700 hover:text-blue-700"
        @click="closeAll"
      >
        Alle schließen
      </button>
    </div>

    <div class="relative">
      <div
        class="absolute bottom-0 left-5 top-0 hidden w-px bg-slate-200 md:block"
        aria-hidden="true"
      />

      <div class="space-y-6">
        <article
          v-for="entry in sortedEntries"
          :key="entry.id"
          class="relative md:pl-16"
        >
            <div
                class="absolute left-[13px] top-7 hidden h-4 w-4 rounded-full border-2 border-blue-600 bg-white md:block"
            />

          <div
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            :class="{
              'ring-2 ring-blue-200': entry.featured,
              'shadow-lg': isOpen(entry.id),
            }"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between gap-5 px-6 py-3 text-left sm:px-8"
              :aria-expanded="isOpen(entry.id)"
              :aria-controls="`history-entry-${entry.id}`"
              @click="toggleEntry(entry.id)"
            >
              <div class="flex min-w-0 items-center gap-4">
                <span
                    class="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700"
                    >
                    {{ displayYear(entry) }}
                </span>

                <div class="min-w-0">
                  <p
                    v-if="entry.featured"
                    class="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700"
                  >
                    Meilenstein
                  </p>

                  <h3
                    class="mt-1 text-sm font-bold leading-tight text-slate-900"
                  >
                    {{ entry.title }}
                  </h3>
                </div>
              </div>

              <span
                class="text-slate-400 transition"
                :class="{
                  'rotate-180 bg-blue-900 text-white': isOpen(entry.id),
                }"
                aria-hidden="true"
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            <div
              v-show="isOpen(entry.id)"
              :id="`history-entry-${entry.id}`"
              class="border-t border-slate-200"
            >
              <div
                class="grid gap-0"
                :class="
                  entry.image
                    ? 'lg:grid-cols-[0.72fr_1.28fr]'
                    : 'grid-cols-1'
                "
              >
                <div
                  v-if="entry.image"
                  class="flex min-h-64 items-center justify-center bg-slate-100 p-6"
                >
                  <img
                    :src="getStrapiMediaUrl(entry.image)"
                    :alt="entry.imageAlt || entry.title"
                    loading="lazy"
                    class="h-auto max-h-[440px] max-w-full object-contain"
                  >
                </div>

                <div class="p-6 sm:p-8">
                  <StrapiBlocks
                    v-if="entry.content?.length"
                    :blocks="entry.content"
                  />

                  <p
                    v-else
                    class="text-slate-500"
                  >
                    Für diesen Abschnitt wurde noch kein Inhalt hinterlegt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>