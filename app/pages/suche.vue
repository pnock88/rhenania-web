<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const query = ref(String(route.query.q ?? ''))

const {
  data: articleResponse,
  pending: articlesPending,
} = useStrapiArticles()

const {
  data: teamResponse,
  pending: teamsPending,
} = useStrapiTeams()

const normalizedQuery = computed(() => query.value.trim().toLowerCase())

const articles = computed(() => articleResponse.value?.data ?? [])
const teams = computed(() => teamResponse.value?.data ?? [])

const filteredArticles = computed(() => {
  if (!normalizedQuery.value) {
    return []
  }

  return articles.value.filter((article) => {
    const searchableText = [
      article.title,
      article.excerpt,
      article.category,
      article.content,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return searchableText.includes(normalizedQuery.value)
  })
})

const filteredTeams = computed(() => {
  if (!normalizedQuery.value) {
    return []
  }

  return teams.value.filter((team) => {
    const searchableText = [
      team.name,
      team.description,
      team.category,
      team.section,
      team.league,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return searchableText.includes(normalizedQuery.value)
  })
})

const resultCount = computed(() => {
  return filteredArticles.value.length + filteredTeams.value.length
})

const isPending = computed(() => {
  return articlesPending.value || teamsPending.value
})

const submitSearch = async () => {
  const value = query.value.trim()

  await router.push({
    path: '/suche',
    query: value ? { q: value } : {},
  })
}

watch(
  () => route.query.q,
  value => {
    query.value = String(value ?? '')
  },
)

useSeoMeta({
  title: () =>
    normalizedQuery.value
      ? `Suche nach „${query.value}“ | SC Rhenania Hochdahl`
      : 'Suche | SC Rhenania Hochdahl',
  description:
    'Durchsuche Neuigkeiten und Mannschaften des SC Rhenania Hochdahl.',
})
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Website durchsuchen"
      title="Suche"
      description="Finde Neuigkeiten, Mannschaften und weitere Inhalte."
      size="compact"
    />

    <BaseSection class="bg-slate-50">
      <form
        class="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row"
        @submit.prevent="submitSearch"
      >
        <label class="sr-only" for="site-search">
          Suchbegriff
        </label>

        <input
          id="site-search"
          v-model="query"
          type="search"
          placeholder="Zum Beispiel Jugend, Probetraining oder I. Mannschaft"
          autocomplete="off"
          class="min-h-14 flex-1 rounded-xl border border-slate-300 bg-white px-5 text-lg outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        >

        <BaseButton type="submit">
          Suchen
        </BaseButton>
      </form>

      <div
        v-if="isPending"
        class="py-20 text-center"
      >
        <p class="font-bold text-slate-600">
          Inhalte werden durchsucht …
        </p>
      </div>

      <div
        v-else-if="!normalizedQuery"
        class="mx-auto mt-12 max-w-3xl rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"
      >
        <h2 class="text-2xl font-black text-slate-950">
          Suchbegriff eingeben
        </h2>

        <p class="mt-3 text-slate-600">
          Die Suche umfasst aktuell Neuigkeiten und Mannschaften.
        </p>
      </div>

      <div
        v-else-if="resultCount"
        class="mt-14 space-y-16"
      >
        <p class="font-bold text-slate-600">
          {{ resultCount }}
          {{ resultCount === 1 ? 'Ergebnis' : 'Ergebnisse' }}
          für „{{ query }}“
        </p>

        <section v-if="filteredArticles.length">
          <div class="mb-7 flex items-end justify-between gap-4">
            <h2 class="text-3xl font-black text-slate-950">
              Neuigkeiten
            </h2>

            <BaseBadge variant="secondary">
              {{ filteredArticles.length }}
            </BaseBadge>
          </div>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <NewsCard
              v-for="article in filteredArticles"
              :key="article.documentId"
              :article="article"
            />
          </div>
        </section>

        <section v-if="filteredTeams.length">
          <div class="mb-7 flex items-end justify-between gap-4">
            <h2 class="text-3xl font-black text-slate-950">
              Mannschaften
            </h2>

            <BaseBadge variant="secondary">
              {{ filteredTeams.length }}
            </BaseBadge>
          </div>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TeamCard
              v-for="team in filteredTeams"
              :key="team.documentId"
              :team="team"
            />
          </div>
        </section>
      </div>

      <div
        v-else
        class="mx-auto mt-12 max-w-3xl rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"
      >
        <h2 class="text-2xl font-black text-slate-950">
          Keine Ergebnisse gefunden
        </h2>

        <p class="mt-3 text-slate-600">
          Für „{{ query }}“ wurden keine passenden Inhalte gefunden.
        </p>
      </div>
    </BaseSection>
  </main>
</template>