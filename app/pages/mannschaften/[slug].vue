<script setup lang="ts">
const route = useRoute()
const { getStrapiMediaUrl } = useStrapiMedia()

const slug = computed(() => String(route.params.slug))

const {
  data: response,
  pending,
  error,
  refresh,
} = useStrapiTeam(slug)

const team = computed(() => response.value?.data?.[0] ?? null)

const teamDocumentId = computed(() => team.value?.documentId)

const {
  data: matchResponse,
  pending: matchesPending,
  error: matchesError,
  refresh: refreshMatches,
  execute: loadMatches,
} = useStrapiTeamMatches(teamDocumentId)

watch(
  teamDocumentId,
  async (documentId) => {
    if (documentId) {
      await loadMatches()
    }
  },
  {
    immediate: true,
  },
)

const teamMatches = computed(() => {
  return matchResponse.value?.data ?? []
})

const upcomingMatches = computed(() => {
  return teamMatches.value
    .filter(match =>
      match.matchStatus === 'upcoming'
      || match.matchStatus === 'postponed',
    )
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime()
        - new Date(b.dateTime).getTime(),
    )
})

const finishedMatches = computed(() => {
  return teamMatches.value
    .filter(match =>
      match.matchStatus === 'finished'
      || match.matchStatus === 'cancelled',
    )
    .sort(
      (a, b) =>
        new Date(b.dateTime).getTime()
        - new Date(a.dateTime).getTime(),
    )
})

const visibleUpcomingMatches = computed(() => {
  return upcomingMatches.value.slice(0, 3)
})

const visibleFinishedMatches = computed(() => {
  return finishedMatches.value.slice(0, 3)
})

watchEffect(() => {
  if (!pending.value && !error.value && !team.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Mannschaft nicht gefunden',
    })
  }
})

const formatTime = (time?: string | null) => {
  if (!time) {
    return ''
  }

  return time.slice(0, 5)
}

const formatTrainingTime = (
  startTime?: string | null,
  endTime?: string | null,
) => {
  const start = formatTime(startTime)
  const end = formatTime(endTime)

  if (start && end) {
    return `${start}–${end} Uhr`
  }

  if (start) {
    return `${start} Uhr`
  }

  return ''
}

const activeCoaches = computed(() => {
  return [...(team.value?.coaches ?? [])]
    .filter(coach => coach.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
})

useSeoMeta({
  title: () =>
    team.value
      ? `${team.value.name} | SC Rhenania Hochdahl`
      : 'Mannschaft | SC Rhenania Hochdahl',

  description: () => team.value?.description ?? '',

  ogTitle: () => team.value?.name ?? '',

  ogDescription: () => team.value?.description ?? '',

  ogImage: () =>
    team.value?.image
      ? getStrapiMediaUrl(team.value.image)
      : '',
})
</script>

<template>
  <main>
    <BaseSection
      v-if="pending"
      class="min-h-screen bg-slate-50 pt-32"
    >
      <div class="py-20 text-center">
        <p class="font-bold text-slate-600">
          Mannschaft wird geladen …
        </p>
      </div>
    </BaseSection>

    <BaseSection
      v-else-if="error"
      class="min-h-screen bg-slate-50 pt-32"
    >
      <BaseAlert variant="error">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            Die Mannschaft konnte nicht geladen werden.
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

    <template v-else-if="team">
      <BasePageHero
        :eyebrow="team.category"
        :title="team.name"
        :description="team.description"
        :image="
          getStrapiMediaUrl(
            team.image,
            '/images/teams/first-team.jpg',
          )
        "
      >
        <template #actions>
          <BaseButton to="/probetraining">
            Probetraining anfragen
          </BaseButton>

          <BaseButton
            to="/kontakt"
            variant="outline"
          >
            Ansprechpartner
          </BaseButton>
        </template>
      </BasePageHero>

      <section class="border-b border-slate-200 bg-white">
        <BaseContainer>
          <div
            class="grid gap-5 py-6 sm:grid-cols-2"
            :class="
              team.league
                ? 'lg:grid-cols-3'
                : 'lg:grid-cols-2'
            "
          >
            <div
              v-if="team.league"
              class="rounded-2xl bg-slate-50 p-5"
            >
              <p
                class="text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Liga
              </p>

              <p class="mt-2 text-lg font-black text-slate-950">
                {{ team.league }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-5">
              <p
                class="text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Bereich
              </p>

              <p class="mt-2 text-lg font-black text-slate-950">
                {{ team.section }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-5">
              <p
                class="text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Mannschaftstyp
              </p>

              <p class="mt-2 text-lg font-black text-slate-950">
                {{ team.category }}
              </p>
            </div>
          </div>
        </BaseContainer>
      </section>

      <BaseSection class="bg-white">
        <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
            >
              Über die Mannschaft
            </p>

            <h2
              class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
            >
              {{ team.name }}
            </h2>

            <p
              v-if="team.description"
              class="mt-6 text-lg leading-8 text-slate-600"
            >
              {{ team.description }}
            </p>

            <div
              v-if="team.image"
              class="mt-10 flex justify-center rounded-3xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200"
            >
              <img
                :src="getStrapiMediaUrl(team.image)"
                :alt="team.name"
                class="h-auto max-w-full object-contain"
              >
            </div>
          </section>

          <aside>
            <BaseCard>
              <p
                class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
              >
                Trainingszeiten
              </p>

              <h2 class="mt-4 text-3xl font-black text-slate-950">
                Training
              </h2>

              <div
                v-if="team.trainingSessions?.length"
                class="mt-7 space-y-4"
              >
                <article
                  v-for="session in team.trainingSessions"
                  :key="session.id"
                  class="rounded-2xl bg-slate-50 p-5"
                >
                  <div
                    class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <h3 class="font-black text-slate-950">
                      {{ session.day }}
                    </h3>

                    <span
                      v-if="session.startTime"
                      class="font-bold text-blue-700"
                    >
                      {{
                        formatTrainingTime(
                          session.startTime,
                          session.endTime,
                        )
                      }}
                    </span>
                  </div>

                  <p
                    v-if="session.location"
                    class="mt-3 text-slate-600"
                  >
                    {{ session.location }}
                  </p>

                  <p
                    v-if="session.note"
                    class="mt-2 text-sm font-semibold text-slate-500"
                  >
                    {{ session.note }}
                  </p>
                </article>
              </div>

              <div
                v-else
                class="mt-7 rounded-2xl bg-slate-50 p-5 text-slate-600"
              >
                Für diese Mannschaft wurden noch keine Trainingszeiten
                hinterlegt.
              </div>

              <BaseButton
                to="/probetraining"
                class="mt-7 w-full"
              >
                Probetraining anfragen
              </BaseButton>
            </BaseCard>
          </aside>
        </div>
      </BaseSection>

      <BaseSection
        v-if="activeCoaches.length"
        class="bg-slate-50"
        >
        <div class="mb-10">
            <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
            >
            Verantwortliche
            </p>

            <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
            >
            Trainerteam
            </h2>

            <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Deine Ansprechpartner für Training, Spielbetrieb und Fragen rund um
            die Mannschaft.
            </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <TeamCoachCard
                v-for="coach in activeCoaches"
                :key="coach.id"
                :coach="coach"
            />
        </div>
      </BaseSection>

      <BaseSection class="bg-white">
        <div
          class="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
            >
              Spielbetrieb
            </p>

            <h2
              class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
            >
              Spiele der {{ team.name }}
            </h2>

            <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Kommende Partien und die letzten Ergebnisse dieser Mannschaft.
            </p>
          </div>

          <BaseButton
            to="/spielplan"
            variant="outline"
            class="border-slate-300 text-slate-950 hover:bg-slate-950 hover:text-white"
          >
            Gesamten Spielplan öffnen
          </BaseButton>
        </div>

        <div
          v-if="matchesPending"
          class="py-16 text-center"
        >
          <p class="font-bold text-slate-600">
            Spiele werden geladen …
          </p>
        </div>

        <BaseAlert
          v-else-if="matchesError"
          variant="error"
        >
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              Die Spiele konnten nicht geladen werden.
            </span>

            <button
              type="button"
              class="font-bold underline"
              @click="refreshMatches"
            >
              Erneut versuchen
            </button>
          </div>
        </BaseAlert>

        <div
          v-else-if="
            visibleUpcomingMatches.length
            || visibleFinishedMatches.length
          "
          class="space-y-14"
        >
          <section v-if="visibleUpcomingMatches.length">
            <div class="mb-6 flex items-center justify-between gap-4">
              <h3 class="text-2xl font-black text-slate-950">
                Kommende Spiele
              </h3>

              <BaseBadge>
                {{ upcomingMatches.length }}
              </BaseBadge>
            </div>

            <div class="space-y-5">
              <MatchCard
                v-for="match in visibleUpcomingMatches"
                :key="match.documentId"
                :match="match"
              />
            </div>
          </section>

          <section v-if="visibleFinishedMatches.length">
            <div class="mb-6 flex items-center justify-between gap-4">
              <h3 class="text-2xl font-black text-slate-950">
                Letzte Ergebnisse
              </h3>

              <BaseBadge variant="secondary">
                {{ finishedMatches.length }}
              </BaseBadge>
            </div>

            <div class="space-y-5">
              <MatchCard
                v-for="match in visibleFinishedMatches"
                :key="match.documentId"
                :match="match"
              />
            </div>
          </section>
        </div>

        <div
          v-else
          class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center"
        >
          <h3 class="text-2xl font-black text-slate-950">
            Noch keine Spiele veröffentlicht
          </h3>

          <p class="mt-3 text-slate-600">
            Sobald Spiele dieser Mannschaft in Strapi veröffentlicht sind,
            erscheinen sie hier.
          </p>
        </div>
      </BaseSection>

      <section class="bg-blue-700 py-16 text-white md:py-20">
        <BaseContainer>
          <div
            class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div class="max-w-3xl">
              <p
                class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-200"
              >
                Mitmachen
              </p>

              <h2 class="mt-4 text-4xl font-black sm:text-5xl">
                Interesse an dieser Mannschaft?
              </h2>

              <p class="mt-5 text-lg leading-8 text-blue-100">
                Melde dich für ein unverbindliches Probetraining oder nimm
                direkt Kontakt mit uns auf.
              </p>
            </div>

            <div class="flex shrink-0 flex-col gap-3 sm:flex-row">
              <BaseButton
                to="/probetraining"
                variant="secondary"
              >
                Probetraining
              </BaseButton>

              <BaseButton
                to="/kontakt"
                variant="outline"
              >
                Kontakt
              </BaseButton>
            </div>
          </div>
        </BaseContainer>
      </section>
    </template>
  </main>
</template>