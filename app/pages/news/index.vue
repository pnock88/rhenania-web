<script setup lang="ts">
import type { StrapiArticle } from '~/types/strapi'

useSeoMeta({
  title: 'Aktuelles | SC Rhenania Hochdahl',
  description:
    'Neuigkeiten, Spielberichte und Informationen aus dem Vereinsleben des SC Rhenania Hochdahl.',
})

const {
  articles,
  pending,
  error,
  refresh,
} = useNewsData()

const currentYear = new Date().getFullYear()
const selectedYear = ref(currentYear)

const getArticleYear = (
  article: StrapiArticle,
): number | null => {
  if (!article.date) {
    return null
  }

  const parsedDate = new Date(article.date)

  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return parsedDate.getFullYear()
}

const availableYears = computed<number[]>(() => {
  const years = new Set<number>()

  articles.value.forEach((article) => {
    const year = getArticleYear(article)

    if (year) {
      years.add(year)
    }
  })

  // Das aktuelle Jahr bleibt immer als Filter sichtbar,
  // auch wenn noch keine Meldung veröffentlicht wurde.
  years.add(currentYear)

  return Array.from(years).sort((a, b) => b - a)
})

const filteredArticles = computed<StrapiArticle[]>(() => {
  return articles.value
    .filter(article => getArticleYear(article) === selectedYear.value)
    .sort((a, b) => {
      const firstDate = a.date
        ? new Date(a.date).getTime()
        : 0

      const secondDate = b.date
        ? new Date(b.date).getTime()
        : 0

      return secondDate - firstDate
    })
})

const resultLabel = computed(() => {
  const count = filteredArticles.value.length

  return count === 1
    ? '1 Meldung'
    : `${count} Meldungen`
})
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Aus dem Vereinsleben"
      title="Aktuelles"
      description="Neuigkeiten, Spielberichte und Geschichten rund um den SC Rhenania Hochdahl."
      image="/images/herobanner/aktuelles.jpg"
      :breadcrumbs="[
        {
          label: 'Aktuelles',
        },
      ]"
    />

    <!-- Ladezustand -->
    <BaseSection
      v-if="pending"
      class="bg-white"
    >
      <div class="py-20 text-center">
        <p class="font-bold text-slate-600">
          Neuigkeiten werden geladen …
        </p>
      </div>
    </BaseSection>

    <!-- Fehlerzustand -->
    <BaseSection
      v-else-if="error"
      class="bg-white"
    >
      <BaseAlert variant="error">
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
    </BaseSection>

    <!-- News-Übersicht -->
    <BaseSection
      v-else
      class="bg-slate-50"
    >
      <!-- Überschrift und Jahresfilter -->
      <div
        class="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-900"
          >
            Aus dem Vereinsleben
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Neuigkeiten {{ selectedYear }}
          </h2>

          <p class="mt-4 text-slate-600">
            {{ resultLabel }} aus dem gewählten Jahr
          </p>
        </div>

        <div>
          <p class="mb-3 text-sm font-bold text-slate-500">
            Jahr auswählen
          </p>

          <div
            class="flex max-w-full flex-wrap gap-2"
            role="group"
            aria-label="Neuigkeiten nach Jahr filtern"
          >
            <button
              v-for="year in availableYears"
              :key="year"
              type="button"
              class="rounded-full px-5 py-2.5 text-sm font-bold transition"
              :class="
                selectedYear === year
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900'
              "
              :aria-pressed="selectedYear === year"
              @click="selectedYear = year"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>

      <!-- Karten -->
      <div
        v-if="filteredArticles.length"
        class="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
      >
        <NewsCard
          v-for="article in filteredArticles"
          :key="article.documentId"
          :article="article"
        />
      </div>

      <!-- Keine News im ausgewählten Jahr -->
      <div
        v-else
        class="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
      >
        <h2 class="text-2xl font-black text-slate-950">
          Keine Neuigkeiten für {{ selectedYear }}
        </h2>

        <p class="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
          Für dieses Jahr sind derzeit keine Meldungen veröffentlicht.
          Wähle ein anderes Jahr aus oder schau später noch einmal vorbei.
        </p>

        <button
          v-if="selectedYear !== currentYear"
          type="button"
          class="mt-6 font-bold text-blue-900 transition hover:text-blue-500"
          @click="selectedYear = currentYear"
        >
          Zum aktuellen Jahr {{ currentYear }}
        </button>
      </div>
    </BaseSection>
  </main>
</template>