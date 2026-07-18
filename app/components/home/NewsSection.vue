<script setup lang="ts">
const newsItems = [
  {
    title: 'Gemeinsam in die neue Saison',
    excerpt:
      'Unsere Mannschaften starten mit viel Energie, Teamgeist und neuen Zielen in die kommende Spielzeit.',
    image: '/images/news/news-1.jpg',
    category: 'Verein',
    date: '18. Juli 2026',
    to: '/news/gemeinsam-in-die-neue-saison',
  },
  {
    title: 'Probetraining für unsere Jugend',
    excerpt:
      'Fußballbegeisterte Kinder und Jugendliche sind herzlich eingeladen, unseren Verein kennenzulernen.',
    image: '/images/news/news-2.jpg',
    category: 'Jugend',
    date: '14. Juli 2026',
    to: '/news/probetraining-jugend',
  },
  {
    title: 'Unterstützung auf und neben dem Platz',
    excerpt:
      'Wir suchen engagierte Menschen, die sich als Trainer, Betreuer oder Helfer im Vereinsleben einbringen möchten.',
    image: '/images/news/news-3.jpg',
    category: 'Ehrenamt',
    date: '9. Juli 2026',
    to: '/news/ehrenamt',
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

        <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Neuigkeiten, Veranstaltungen und Geschichten rund um den
          SC Rhenania Hochdahl.
        </p>
      </div>

      <NuxtLink
        to="/news"
        class="inline-flex items-center gap-2 font-bold text-blue-700 transition hover:text-blue-500"
      >
        Alle Neuigkeiten
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      <NewsCard
        v-for="item in newsItems"
        :key="item.to"
        v-bind="item"
      />
    </div>
  </BaseSection>
</template>