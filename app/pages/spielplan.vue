<script setup lang="ts">
import type { StrapiMatch } from '~/types/strapi'

useSeoMeta({
  title: 'Spielplan | SC Rhenania Hochdahl',
  description:
    'Kommende Spiele und Ergebnisse der Mannschaften des SC Rhenania Hochdahl.',
})

type StatusFilter = 'upcoming' | 'finished'
type TeamFilter = 'all' | string
type VenueFilter = 'all' | 'home' | 'away'

const statusFilter = ref<StatusFilter>('upcoming')
const teamFilter = ref<TeamFilter>('all')
const venueFilter = ref<VenueFilter>('all')

const {
  data: matchResponse,
  pending,
  error,
  refresh,
} = useStrapiMatches()

const matches = computed<StrapiMatch[]>(() => {
  return matchResponse.value?.data ?? []
})

const teams = computed(() => {
  const uniqueTeams = new Map<string, string>()

  matches.value.forEach((match) => {
    if (match.team?.documentId && match.team.name) {
      uniqueTeams.set(match.team.documentId, match.team.name)
    }
  })

  return Array.from(uniqueTeams, ([documentId, name]) => ({
    documentId,
    name,
  }))
})

const filteredMatches = computed(() => {
  return matches.value
    .filter((match) => {
      const matchesTeam =
        teamFilter.value === 'all'
        || match.team?.documentId === teamFilter.value

      const matchesStatus =
        statusFilter.value === 'upcoming'
          ? match.matchStatus === 'upcoming'
            || match.matchStatus === 'postponed'
          : match.matchStatus === 'finished'
            || match.matchStatus === 'cancelled'

      const matchesVenue =
        venueFilter.value === 'all'
        || match.venueType === venueFilter.value

      return matchesTeam && matchesStatus && matchesVenue
    })
    .sort((a, b) => {
      const firstDate = new Date(a.dateTime).getTime()
      const secondDate = new Date(b.dateTime).getTime()

      return statusFilter.value === 'upcoming'
        ? firstDate - secondDate
        : secondDate - firstDate
    })
})
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Spielbetrieb"
      title="Spiele und"
      highlight="Ergebnisse."
      description="Alle kommenden Partien und vergangenen Ergebnisse unserer Mannschaften."
      image="/images/teams/first-team.jpg"
    />

    <BaseSection class="bg-slate-50">
      <!-- Filter -->
      <BaseCard>
        <div class="grid gap-6 lg:grid-cols-[1fr_auto_auto] lg:items-end">
          <div>
            <p class="text-sm font-bold text-slate-500">
              Mannschaft
            </p>

            <div class="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                class="rounded-full px-4 py-2 text-sm font-bold transition"
                :class="
                  teamFilter === 'all'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                "
                @click="teamFilter = 'all'"
              >
                Alle
              </button>

              <button
                v-for="team in teams"
                :key="team.documentId"
                type="button"
                class="rounded-full px-4 py-2 text-sm font-bold transition"
                :class="
                  teamFilter === team.documentId
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                "
                @click="teamFilter = team.documentId"
              >
                {{ team.name }}
              </button>
            </div>
          </div>

          <div>
            <p class="text-sm font-bold text-slate-500">
              Spielort
            </p>

            <div class="mt-3 flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-bold transition"
                :class="
                  venueFilter === 'all'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                "
                @click="venueFilter = 'all'"
              >
                Alle
              </button>

              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-bold transition"
                :class="
                  venueFilter === 'home'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                "
                @click="venueFilter = 'home'"
              >
                Heim
              </button>

              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-bold transition"
                :class="
                  venueFilter === 'away'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                "
                @click="venueFilter = 'away'"
              >
                Auswärts
              </button>
            </div>
          </div>

          <div>
            <p class="text-sm font-bold text-slate-500">
              Zeitraum
            </p>

            <div class="mt-3 flex rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-bold transition"
                :class="
                  statusFilter === 'upcoming'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600'
                "
                @click="statusFilter = 'upcoming'"
              >
                Kommende Spiele
              </button>

              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-bold transition"
                :class="
                  statusFilter === 'finished'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600'
                "
                @click="statusFilter = 'finished'"
              >
                Ergebnisse
              </button>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Ladezustand -->
      <div
        v-if="pending"
        class="py-20 text-center"
      >
        <p class="font-bold text-slate-600">
          Spiele werden geladen …
        </p>
      </div>

      <!-- Fehlerzustand -->
      <BaseAlert
        v-else-if="error"
        variant="error"
        class="mt-8"
      >
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            Der Spielplan konnte nicht geladen werden.
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

      <!-- Spiele -->
      <div
        v-else-if="filteredMatches.length"
        class="mt-8 space-y-5"
      >
        <MatchCard
          v-for="match in filteredMatches"
          :key="match.documentId"
          :match="match"
        />
      </div>

      <!-- Keine Ergebnisse -->
      <div
        v-else
        class="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
      >
        <h2 class="text-2xl font-black text-slate-950">
          Keine Spiele gefunden
        </h2>

        <p class="mt-3 text-slate-600">
          Für diese Auswahl sind derzeit keine Spiele veröffentlicht.
        </p>
      </div>
    </BaseSection>
  </main>
</template>