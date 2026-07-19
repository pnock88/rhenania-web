<script setup lang="ts">
  const {
    featuredArticle: featuredNews,
    homepageArticles: newsItems,
    pending,
    error,
    refresh,
  } = useNewsData()

  const { getStrapiMediaUrl } = useStrapiMedia()
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

        <span aria-hidden="true">
          →
        </span>
      </NuxtLink>
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

    <!-- News -->
    <div
      v-else-if="featuredNews"
      class="grid gap-6 lg:grid-cols-[1.15fr_1fr]"
    >
      <!-- Hauptmeldung -->
      <BaseCard
        hover
        :padded="false"
        class="group h-full"
      >
        <NuxtLink
          :to="`/news/${featuredNews.slug}`"
          class="flex h-full flex-col"
        >
          <div
            class="relative aspect-[16/10] overflow-hidden bg-slate-200"
          >
            <img
              :src="
                getStrapiMediaUrl(
                  featuredNews.card ?? featuredNews.image,
                )
              "
              :alt="featuredNews.title"
              loading="lazy"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            >

            <div class="absolute left-5 top-5">
              <BaseBadge>
                {{ featuredNews.category }}
              </BaseBadge>
            </div>
          </div>

          <div class="flex flex-1 flex-col p-6 sm:p-8">
            <time
              v-if="featuredNews.date"
              :datetime="featuredNews.date"
              class="text-sm font-medium text-slate-500"
            >
              {{ formatArticleDate(featuredNews.date) }}
            </time>

            <h3
              class="mt-3 text-2xl font-black leading-tight text-slate-950 transition group-hover:text-blue-700 sm:text-3xl"
            >
              {{ featuredNews.title }}
            </h3>

            <p class="mt-4 flex-1 leading-7 text-slate-600">
              {{ featuredNews.excerpt }}
            </p>

            <span
              class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
            >
              Weiterlesen

              <span
                class="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </div>
        </NuxtLink>
      </BaseCard>

      <!-- Weitere Meldungen -->
      <div class="grid gap-5 sm:grid-cols-2">
        <NewsCard
          v-for="article in newsItems"
          :key="article.documentId"
          :article="article"
        />
      </div>
    </div>

    <!-- Keine News vorhanden -->
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