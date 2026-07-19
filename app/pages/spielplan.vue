<script setup lang="ts">
import type { MatchItem } from '~/data/matches'
import { matches } from '~/data/matches'

useSeoMeta({
  title: 'Spielplan | SC Rhenania Hochdahl',
  description:
    'Kommende Spiele und Ergebnisse der Herrenmannschaften des SC Rhenania Hochdahl.',
})

type TeamFilter = 'all' | 'first' | 'second'
type StatusFilter = 'upcoming' | 'finished'

const teamFilter = ref<TeamFilter>('all')
const statusFilter = ref<StatusFilter>('upcoming')

const filteredMatches = computed<MatchItem[]>(() => {
  return matches
    .filter((match) => {
      const matchesTeam =
        teamFilter.value === 'all'
        || match.team === teamFilter.value

      const matchesStatus =
        statusFilter.value === 'upcoming'
          ? match.status === 'upcoming'
          : match.status === 'finished'

      return matchesTeam && matchesStatus
    })
    .sort((a, b) => {
      const firstDate = new Date(a.date).getTime()
      const secondDate = new Date(b.date).getTime()

      return statusFilter.value === 'upcoming'
        ? firstDate - secondDate
        : secondDate - firstDate
    })
})

const teamLabel = (team: MatchItem['team']) => {
  return team === 'first' ? 'I. Mannschaft' : 'II. Mannschaft'
}
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Spielbetrieb"
      title="Spiele und"
      highlight="Ergebnisse."
      description="Alle kommenden Partien und vergangenen Ergebnisse unserer Herrenmannschaften."
      image="/images/teams/first-team.jpg"
    />

    <BaseSection class="bg-slate-50">
      <div
        class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <div
          class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
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
                type="button"
                class="rounded-full px-4 py-2 text-sm font-bold transition"
                :class="
                  teamFilter === 'first'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                "
                @click="teamFilter = 'first'"
              >
                I. Mannschaft
              </button>

              <button
                type="button"
                class="rounded-full px-4 py-2 text-sm font-bold transition"
                :class="
                  teamFilter === 'second'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                "
                @click="teamFilter = 'second'"
              >
                II. Mannschaft
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
      </div>

      <div
        v-if="filteredMatches.length"
        class="mt-8 space-y-5"
      >
        <BaseCard
          v-for="match in filteredMatches"
          :key="match.id"
          hover
          :padded="false"
        >
          <div
            class="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex flex-wrap items-center gap-3">
              <BaseBadge variant="secondary">
                {{ teamLabel(match.team) }}
              </BaseBadge>

              <span class="text-sm font-semibold text-slate-500">
                {{ match.competition }}
              </span>
            </div>

            <BaseBadge
              v-if="match.status === 'finished'"
              variant="success"
            >
              Beendet
            </BaseBadge>

            <BaseBadge
              v-else
              variant="primary"
            >
              Bevorstehend
            </BaseBadge>
          </div>

          <div class="grid gap-8 p-6 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-center">
            <div>
              <p class="text-sm font-semibold text-slate-500">
                Datum
              </p>

              <p class="mt-1 font-black text-slate-950">
                {{ match.dateLabel }}
              </p>

              <p class="mt-1 text-sm text-slate-600">
                {{ match.time }}
              </p>
            </div>

            <div
              class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center"
            >
              <div>
                <img
                  :src="match.homeTeam.logo"
                  :alt="`Logo ${match.homeTeam.name}`"
                  class="mx-auto h-16 w-16 rounded-full bg-white p-2 object-contain shadow-sm sm:h-20 sm:w-20"
                >

                <p class="mt-3 text-sm font-black text-slate-950 sm:text-base">
                  {{ match.homeTeam.name }}
                </p>
              </div>

              <div>
                <div
                  v-if="match.status === 'finished'"
                  class="text-3xl font-black text-slate-950"
                >
                  {{ match.homeScore }} : {{ match.awayScore }}
                </div>

                <div
                  v-else
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white"
                >
                  VS
                </div>
              </div>

              <div>
                <img
                  :src="match.awayTeam.logo"
                  :alt="`Logo ${match.awayTeam.name}`"
                  class="mx-auto h-16 w-16 rounded-full bg-white p-2 object-contain shadow-sm sm:h-20 sm:w-20"
                >

                <p class="mt-3 text-sm font-black text-slate-950 sm:text-base">
                  {{ match.awayTeam.name }}
                </p>
              </div>
            </div>

            <div class="lg:text-right">
              <p class="text-sm font-semibold text-slate-500">
                Spielort
              </p>

              <p class="mt-1 font-black text-slate-950">
                {{ match.location }}
              </p>

              <BaseButton
                v-if="match.status === 'upcoming'"
                to="/kontakt"
                variant="outline"
                class="mt-5 border-slate-300 text-slate-950 hover:bg-slate-950 hover:text-white"
              >
                Anfahrt & Kontakt
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>

      <div
        v-else
        class="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"
      >
        <h2 class="text-2xl font-black text-slate-950">
          Keine Spiele gefunden
        </h2>

        <p class="mt-3 text-slate-600">
          Für diese Auswahl sind derzeit keine Spiele hinterlegt.
        </p>
      </div>
    </BaseSection>
  </main>
</template>