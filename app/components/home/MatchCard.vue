<script setup lang="ts">
type Team = {
  name: string
  logo: string
}

type Match = {
  teamLabel: string
  competition: string
  date: string
  time: string
  location: string
  homeTeam: Team
  awayTeam: Team
  scheduleUrl: string
  livestreamUrl?: string
}

const matches: Match[] = [
  {
    teamLabel: 'I. Mannschaft',
    competition: 'Kreisliga A',
    date: 'Samstag, 24. Mai 2025',
    time: '15:00 Uhr',
    location: 'Sandheide, Hochdahl',
    homeTeam: {
      name: 'SC Rhenania Hochdahl',
      logo: '/images/logos/rhenania.png',
    },
    awayTeam: {
      name: 'TSV 05 Ratingen',
      logo: '/images/logos/opponent.png',
    },
    scheduleUrl: '/spielplan',
    livestreamUrl: '/livestream',
  },
  {
    teamLabel: 'II. Mannschaft',
    competition: 'Kreisliga C',
    date: 'Sonntag, 25. Mai 2025',
    time: '13:00 Uhr',
    location: 'Sandheide, Hochdahl',
    homeTeam: {
      name: 'SC Rhenania Hochdahl II',
      logo: '/images/logos/rhenania.png',
    },
    awayTeam: {
      name: 'TuS 08 Langenberg II',
      logo: '/images/logos/opponent-2.png',
    },
    scheduleUrl: '/spielplan',
    livestreamUrl: '/livestream',
  },
]
</script>

<template>
  <BaseSection
    spacing="small"
    class="bg-slate-50"
  >
    <section
      class="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white shadow-2xl sm:p-8"
    >
      <div
        class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-300"
          >
            Nächste Heimspiele
          </p>

          <p class="mt-2 text-slate-300">
            Unsere Herren-Mannschaften
          </p>
        </div>

        <NuxtLink
          to="/spielplan"
          class="text-sm font-bold text-blue-300 transition hover:text-white"
        >
          Alle Spiele →
        </NuxtLink>
      </div>

      <div class="grid gap-5 lg:grid-cols-2">
        <article
          v-for="match in matches"
          :key="match.teamLabel"
          class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
        >
          <div>
            <p
              class="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-300"
            >
              {{ match.teamLabel }}
            </p>

            <p class="mt-2 text-slate-300">
              {{ match.competition }}
            </p>
          </div>

          <div
            class="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4"
          >
            <div class="text-center">
              <div
                class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white p-3 shadow-lg sm:h-28 sm:w-28"
              >
                <img
                  :src="match.homeTeam.logo"
                  :alt="`Logo ${match.homeTeam.name}`"
                  class="h-full w-full object-contain"
                >
              </div>

              <p class="mt-4 text-sm font-black sm:text-base">
                {{ match.homeTeam.name }}
              </p>
            </div>

            <div
              class="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 font-black"
            >
              VS
            </div>

            <div class="text-center">
              <div
                class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white p-3 shadow-lg sm:h-28 sm:w-28"
              >
                <img
                  :src="match.awayTeam.logo"
                  :alt="`Logo ${match.awayTeam.name}`"
                  class="h-full w-full object-contain"
                >
              </div>

              <p class="mt-4 text-sm font-black sm:text-base">
                {{ match.awayTeam.name }}
              </p>
            </div>
          </div>

          <div class="my-8 h-px bg-white/15" />

          <dl class="space-y-5">
            <div class="flex gap-4">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-300"
                aria-hidden="true"
              >
                📅
              </div>

              <div>
                <dt class="text-sm text-slate-400">
                  Datum
                </dt>

                <dd class="mt-1 font-bold">
                  {{ match.date }}
                </dd>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-300"
                aria-hidden="true"
              >
                🕒
              </div>

              <div>
                <dt class="text-sm text-slate-400">
                  Anstoß
                </dt>

                <dd class="mt-1 text-3xl font-black tracking-tight">
                  {{ match.time }}
                </dd>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-300"
                aria-hidden="true"
              >
                📍
              </div>

              <div>
                <dt class="text-sm text-slate-400">
                  Spielort
                </dt>

                <dd class="mt-1 font-bold">
                  {{ match.location }}
                </dd>
              </div>
            </div>
          </dl>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton
              :to="match.scheduleUrl"
              class="w-full"
            >
              Zum Spielplan
            </BaseButton>

            <BaseButton
              v-if="match.livestreamUrl"
              :to="match.livestreamUrl"
              variant="outline"
              class="w-full"
            >
              Livestream
            </BaseButton>
          </div>
        </article>
      </div>
    </section>
  </BaseSection>
</template>