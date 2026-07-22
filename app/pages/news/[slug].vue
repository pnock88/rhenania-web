<script setup lang="ts">
const route = useRoute()
const { getStrapiMediaUrl } = useStrapiMedia()

const slug = computed(() => String(route.params.slug))

const {
  data: response,
  pending,
  error,
  refresh,
} = useStrapiArticle(slug)

const article = computed(() => response.value?.data?.[0] ?? null)

watchEffect(() => {
  if (!pending.value && !error.value && !article.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Artikel nicht gefunden',
    })
  }
})

useSeoMeta({
  title: () =>
    article.value
      ? `${article.value.title} | SC Rhenania Hochdahl`
      : 'Aktuelles | SC Rhenania Hochdahl',

  description: () => article.value?.excerpt ?? '',

  ogTitle: () => article.value?.title ?? '',

  ogDescription: () => article.value?.excerpt ?? '',

  ogImage: () =>
    article.value
      ? getStrapiMediaUrl(
          article.value.image
          ?? article.value.card,
        )
      : '',
})
</script>

<template>
  <main>
    <!-- Ladezustand -->
    <BaseSection
      v-if="pending"
      class="min-h-screen bg-slate-50 pt-32"
    >
      <div class="py-20 text-center">
        <p class="font-bold text-slate-600">
          Artikel wird geladen …
        </p>
      </div>
    </BaseSection>

    <!-- Fehlerzustand -->
    <BaseSection
      v-else-if="error"
      class="min-h-screen bg-slate-50 pt-32"
    >
      <BaseAlert variant="error">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            Der Artikel konnte nicht geladen werden.
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

    <!-- Artikel -->
    <article v-else-if="article">
      <header
        class="relative overflow-hidden bg-slate-950 pb-24 pt-36 text-white md:pb-32 md:pt-44"
      >
        <img
          v-if="article.image || article.card"
          :src="
            getStrapiMediaUrl(
              article.image ?? article.card,
            )
          "
          alt=""
          class="absolute inset-0 h-full w-full object-cover opacity-30"
        >

        <div
          class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/45"
        />

        <BaseContainer>
          <div class="relative max-w-4xl">
            <NuxtLink
              to="/news"
              class="inline-flex items-center gap-2 text-sm font-bold text-blue-300 transition hover:text-white"
            >
              <span aria-hidden="true">←</span>
              Zurück zu Aktuelles
            </NuxtLink>

            <div class="mt-8 flex flex-wrap items-center gap-3">
              <BaseBadge>
                {{ article.category }}
              </BaseBadge>

              <time
                v-if="article.date"
                :datetime="article.date"
                class="text-sm font-semibold text-slate-300"
              >
                {{ formatArticleDate(article.date) }}
              </time>
            </div>

            <h1
              class="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            >
              {{ article.title }}
            </h1>

            <p
              v-if="article.excerpt"
              class="mt-7 max-w-2xl text-lg leading-8 text-slate-200"
            >
              {{ article.excerpt }}
            </p>
          </div>
        </BaseContainer>
      </header>

      <BaseSection class="bg-white">
        <div
          class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:gap-14"
        >
          <!-- Artikelbild links -->
          <div
            v-if="article.image"
            class="lg:sticky lg:top-28"
          >
            <figure
              class="flex justify-center"
            >
              <img
                :src="getStrapiMediaUrl(article.image)"
                :alt="article.title"
                class="h-auto max-w-full object-contain rounded-3xl"
              >
            </figure>
          </div>

          <!-- Artikelinhalt rechts -->
          <div :class="{ 'lg:col-span-2 mx-auto max-w-4xl': !article.image }">
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <BaseBadge>
                {{ article.category }}
              </BaseBadge>

              <time
                v-if="article.date"
                :datetime="article.date"
                class="text-sm font-semibold text-grey-700"
              >
                {{ formatArticleDate(article.date) }}
              </time>
            </div>

            <div
              class="mt-3 text-2xl font-bold"
            >
              {{ article.title }}
            </div>

            <p
              v-if="article.excerpt"
              class="article-content my-2"
            >
              {{ article.excerpt }}
            </p>

            <div
              v-if="article.content"
              class="article-content text-sm leading-5"
              v-html="renderMarkdown(article.content)"
            />

            <div
              v-else
              class="rounded-2xl bg-slate-50 p-6 text-slate-600"
            >
              Für diesen Artikel wurde noch kein ausführlicher Inhalt
              hinterlegt.
            </div>

            <div
              class="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <NuxtLink
                to="/news"
                class="inline-flex items-center gap-2 font-bold text-blue-700 transition hover:text-blue-500"
              >
                <span aria-hidden="true">←</span>
                Alle Neuigkeiten
              </NuxtLink>

              <span class="text-sm text-slate-500">
                SC Rhenania Hochdahl 1925 e.V.
              </span>
            </div>
          </div>
        </div>
      </BaseSection>
    </article>
  </main>
</template>

<style scoped>
.article-content {
  color: #334155;
  font-size: 1rem;
  line-height: 1.5;
}

.article-content :deep(p) {
  margin-top: 1.25rem;
}

.article-content :deep(p:first-child) {
  margin-top: 0;
}

.article-content :deep(strong) {
  font-weight: 900;
  color: #0f172a;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  color: #0f172a;
  font-weight: 900;
  line-height: 1.2;
}

.article-content :deep(h1) {
  margin-top: 3rem;
  font-size: 2.5rem;
}

.article-content :deep(h2) {
  margin-top: 2.5rem;
  font-size: 2rem;
}

.article-content :deep(h3) {
  margin-top: 2rem;
  font-size: 1.5rem;
}

.article-content :deep(ul) {
  margin-top: 1rem;
  list-style-type: disc;
  padding-left: 1.75rem;
}

.article-content :deep(ol) {
  margin-top: 1rem;
  list-style-type: decimal;
  padding-left: 1.75rem;
}

.article-content :deep(li) {
  margin-top: 0.35rem;
}

.article-content :deep(a) {
  color: #1d4ed8;
  font-weight: 700;
  text-decoration: underline;
}

.article-content :deep(blockquote) {
  margin-top: 2rem;
  border-left: 4px solid #2563eb;
  background: #eff6ff;
  padding: 1.25rem 1.5rem;
  font-style: italic;
}

.article-content :deep(code) {
  border-radius: 0.375rem;
  background: #f1f5f9;
  padding: 0.15rem 0.4rem;
  font-size: 0.9em;
}

.article-content :deep(pre) {
  margin-top: 2rem;
  overflow-x: auto;
  border-radius: 1rem;
  background: #020617;
  padding: 1.5rem;
  color: #f8fafc;
}

.article-content :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}
</style>