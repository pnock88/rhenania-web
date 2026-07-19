<script setup lang="ts">
  useSeoMeta({
    title: 'Aktuelles | SC Rhenania Hochdahl',
    description:
      'Neuigkeiten, Spielberichte und Informationen aus dem Vereinsleben des SC Rhenania Hochdahl.',
  })

  const {
    featuredArticle: featuredNews,
    remainingArticles: remainingNews,
    pending,
    error,
    refresh,
  } = useNewsData()

  const { getStrapiMediaUrl } = useStrapiMedia()
</script>


<template>
  <main>
    <BasePageHero
      eyebrow="Aus dem Vereinsleben"
      title="Aktuelles"
      description="Neuigkeiten, Spielberichte und Geschichten rund um den SC Rhenania Hochdahl."
      image="/images/news/news-1.jpg"
    />

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

    <BaseSection
      v-else-if="error"
      class="bg-white"
    >
      <BaseAlert variant="error">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

    <BaseSection
      v-if="featuredNews"
      class="bg-white"
    >
      <BaseCard
        hover
        :padded="false"
        class="group"
      >
        <NuxtLink
          :to="`/news/${featuredNews.slug}`"
          class="grid h-full lg:grid-cols-2"
        >
          <div class="min-h-80 overflow-hidden bg-slate-200">
            <img
              :src="getStrapiMediaUrl(featuredNews.card)"
              :alt="featuredNews.title"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            >
          </div>

          <div class="flex flex-col justify-center p-7 sm:p-10">
            <div class="flex flex-wrap items-center gap-3">
              <BaseBadge>
                {{ featuredNews.category }}
              </BaseBadge>

              <time
                :datetime="featuredNews.date"
                class="text-sm font-semibold text-slate-500"
              >
                {{
                  new Intl.DateTimeFormat('de-DE', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  }).format(new Date(featuredNews.date))
                }}
              </time>
            </div>

            <h2
              class="mt-5 text-3xl font-black tracking-tight text-slate-950 transition group-hover:text-blue-700 sm:text-4xl"
            >
              {{ featuredNews.title }}
            </h2>

            <p class="mt-5 text-lg leading-8 text-slate-600">
              {{ featuredNews.excerpt }}
            </p>

            <span
              class="mt-7 inline-flex items-center gap-2 font-bold text-blue-700"
            >
              Artikel lesen

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
    </BaseSection>

    <BaseSection class="bg-slate-50">
      <div class="mb-10">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Weitere Meldungen
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Alle Neuigkeiten
        </h2>
      </div>

      <div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <NewsCard
          v-for="article in remainingNews"
          :key="article.documentId"
          :article="article"
        />
      </div>
    </BaseSection>
  </main>
</template>