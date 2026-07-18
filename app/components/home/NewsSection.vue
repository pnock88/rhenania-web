<script setup lang="ts">
type NewsItem = {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  to: string
}

const featuredNews: NewsItem = {
  title: 'Aktionstag ein voller Erfolg',
  excerpt:
    'Tolles Wetter, viele Besucher und jede Menge Fußball: Unser Aktionstag war ein voller Erfolg für den gesamten Verein.',
  image: '/images/news/news-1.jpg',
  category: 'Verein',
  date: '18. Mai 2025',
  to: '/news/aktionstag',
}

const newsItems: NewsItem[] = [
  {
    title: 'Stadtmeisterschaft gewonnen',
    excerpt:
      'Unsere erste Mannschaft sichert sich nach einer starken Saison den Titel.',
    image: '/images/news/news-2.jpg',
    category: '1. Mannschaft',
    date: '12. Mai 2025',
    to: '/news/stadtmeisterschaft',
  },
  {
    title: 'Neue Trikots für die E-Jugend',
    excerpt:
      'Unsere E-Jugend bedankt sich bei ihrem Sponsor für die neuen Trikots.',
    image: '/images/news/news-3.jpg',
    category: 'Jugend',
    date: '8. Mai 2025',
    to: '/news/neue-trikots',
  },
  {
    title: 'Mitgliederversammlung 2025',
    excerpt:
      'Alle Informationen und Ergebnisse der diesjährigen Mitgliederversammlung.',
    image: '/images/news/news-4.jpg',
    category: 'Verein',
    date: '3. Mai 2025',
    to: '/news/mitgliederversammlung',
  },
  {
    title: 'Trainerinnen und Trainer gesucht',
    excerpt:
      'Wir suchen Verstärkung für unsere Jugendmannschaften und freuen uns auf dich.',
    image: '/images/news/news-5.jpg',
    category: 'Ehrenamt',
    date: '28. April 2025',
    to: '/news/trainer-gesucht',
  },
]
</script>

<template>
  <BaseSection class="bg-white">
    <div
      class="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Aus dem Vereinsleben
        </p>

        <h2
          class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Aktuelles
        </h2>
      </div>

      <NuxtLink
        to="/news"
        class="inline-flex items-center gap-2 font-bold text-blue-700 transition hover:text-blue-500"
      >
        Zur News-Übersicht
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <div class="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <!-- Hauptmeldung -->
      <article
        class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <NuxtLink
          :to="featuredNews.to"
          class="block h-full"
        >
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-200">
            <img
              :src="featuredNews.image"
              :alt="featuredNews.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            >

            <span
              class="absolute left-5 top-5 rounded-full bg-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
            >
              {{ featuredNews.category }}
            </span>
          </div>

          <div class="p-6 sm:p-8">
            <time class="text-sm font-medium text-slate-500">
              {{ featuredNews.date }}
            </time>

            <h3
              class="mt-3 text-2xl font-black leading-tight text-slate-950 transition group-hover:text-blue-700 sm:text-3xl"
            >
              {{ featuredNews.title }}
            </h3>

            <p class="mt-4 leading-7 text-slate-600">
              {{ featuredNews.excerpt }}
            </p>

            <span
              class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
            >
              Weiterlesen
              <span
                class="transition group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </div>
        </NuxtLink>
      </article>

      <!-- Kleine Meldungen -->
      <div class="grid gap-5 sm:grid-cols-2">
        <article
          v-for="item in newsItems"
          :key="item.to"
          class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <NuxtLink
            :to="item.to"
            class="block h-full"
          >
            <div class="relative aspect-[16/9] overflow-hidden bg-slate-200">
              <img
                :src="item.image"
                :alt="item.title"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              >

              <span
                class="absolute left-3 top-3 rounded-full bg-blue-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
              >
                {{ item.category }}
              </span>
            </div>

            <div class="p-5">
              <time class="text-xs font-medium text-slate-500">
                {{ item.date }}
              </time>

              <h3
                class="mt-2 text-lg font-black leading-tight text-slate-950 transition group-hover:text-blue-700"
              >
                {{ item.title }}
              </h3>

              <p class="mt-3 text-sm leading-6 text-slate-600">
                {{ item.excerpt }}
              </p>

              <span
                class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
              >
                Weiterlesen
                <span
                  class="transition group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </BaseSection>
</template>