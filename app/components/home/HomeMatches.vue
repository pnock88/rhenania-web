<script setup lang="ts">
import type { StrapiMatch } from '~/types/strapi'

const {
  data: matchResponse,
  pending,
  error,
  refresh,
} = useStrapiMatches()

const matches = computed<StrapiMatch[]>(() => {
  return matchResponse.value?.data ?? []
})

const firstTeamMatches = computed(() => {
  return matches.value.filter(
    match => match.team?.slug === 'erste',
  )
})

const secondTeamMatches = computed(() => {
  return matches.value.filter(
    match => match.team?.slug === 'zweite',
  )
})

const getNextMatch = (teamMatches: StrapiMatch[]) => {
  return teamMatches
    .filter(
      match =>
        match.matchStatus === 'upcoming'
        || match.matchStatus === 'postponed',
    )
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime()
        - new Date(b.dateTime).getTime(),
    )[0] ?? null
}

const getLastMatch = (teamMatches: StrapiMatch[]) => {
  return teamMatches
    .filter(
      match =>
        match.matchStatus === 'finished'
        || match.matchStatus === 'cancelled',
    )
    .sort(
      (a, b) =>
        new Date(b.dateTime).getTime()
        - new Date(a.dateTime).getTime(),
    )[0] ?? null
}

const firstTeamNextMatch = computed(() => {
  return getNextMatch(firstTeamMatches.value)
})

const firstTeamLastMatch = computed(() => {
  return getLastMatch(firstTeamMatches.value)
})

const secondTeamNextMatch = computed(() => {
  return getNextMatch(secondTeamMatches.value)
})

const secondTeamLastMatch = computed(() => {
  return getLastMatch(secondTeamMatches.value)
})

const firstTeamHasMatches = computed(() => {
  return firstTeamNextMatch.value || firstTeamLastMatch.value
})

const secondTeamHasMatches = computed(() => {
  return secondTeamNextMatch.value || secondTeamLastMatch.value
})
</script>

<template>
  <BaseSection class="bg-slate-50">
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
          class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Spiele unserer Herren
        </h2>

        <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Das nächste und das letzte Spiel unserer ersten und zweiten
          Mannschaft.
        </p>
      </div>

      <BaseButton
        to="/spielplan"
        variant="outline"
        class="border-slate-300 text-slate-950 hover:bg-slate-950 hover:text-white"
      >
        Zum Spielplan
      </BaseButton>
    </div>

    <div
      v-if="pending"
      class="py-16 text-center"
    >
      <p class="font-bold text-slate-600">
        Spiele werden geladen …
      </p>
    </div>

    <BaseAlert
      v-else-if="error"
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
          @click="refresh"
        >
          Erneut versuchen
        </button>
      </div>
    </BaseAlert>

    <div
      v-else
      class="space-y-14"
    >
      <!-- I. Mannschaft -->
      <section>
        <div class="mb-6 flex items-center justify-between gap-4">
          <div>
            <p
              class="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700"
            >
              Herren
            </p>

            <h3 class="mt-2 text-3xl font-black text-slate-950">
              I. Mannschaft
            </h3>
          </div>

          <NuxtLink
            to="/mannschaften/erste"
            class="font-bold text-blue-700 transition hover:text-blue-500"
          >
            Zur Mannschaft →
          </NuxtLink>
        </div>

        <div
          v-if="firstTeamHasMatches"
          class="grid gap-6 xl:grid-cols-2"
        >
          <div v-if="firstTeamNextMatch">
            <p
              class="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500"
            >
              Nächstes Spiel
            </p>

            <MatchCard :match="firstTeamNextMatch" />
          </div>

          <div v-if="firstTeamLastMatch">
            <p
              class="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500"
            >
              Letztes Spiel
            </p>

            <MatchCard :match="firstTeamLastMatch" />
          </div>
        </div>

        <div
          v-else
          class="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center"
        >
          <p class="font-bold text-slate-600">
            Für die I. Mannschaft sind aktuell keine Spiele veröffentlicht.
          </p>
        </div>
      </section>

      <!-- II. Mannschaft -->
      <section>
        <div class="mb-6 flex items-center justify-between gap-4">
          <div>
            <p
              class="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700"
            >
              Herren
            </p>

            <h3 class="mt-2 text-3xl font-black text-slate-950">
              II. Mannschaft
            </h3>
          </div>

          <NuxtLink
            to="/mannschaften/zweite"
            class="font-bold text-blue-700 transition hover:text-blue-500"
          >
            Zur Mannschaft →
          </NuxtLink>
        </div>

        <div
          v-if="secondTeamHasMatches"
          class="grid gap-6 xl:grid-cols-2"
        >
          <div v-if="secondTeamNextMatch">
            <p
              class="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500"
            >
              Nächstes Spiel
            </p>

            <MatchCard :match="secondTeamNextMatch" />
          </div>

          <div v-if="secondTeamLastMatch">
            <p
              class="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500"
            >
              Letztes Spiel
            </p>

            <MatchCard :match="secondTeamLastMatch" />
          </div>
        </div>

        <div
          v-else
          class="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center"
        >
          <p class="font-bold text-slate-600">
            Für die II. Mannschaft sind aktuell keine Spiele veröffentlicht.
          </p>
        </div>
      </section>
    </div>
  </BaseSection>
</template>