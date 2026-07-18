<script setup lang="ts">
const nextMatch = {
  competition: 'Meisterschaft',
  date: 'Samstag, 24. Mai 2025',
  time: '15:00 Uhr',
  location: 'Sandheide, Hochdahl',

  homeTeam: {
    name: 'SC Rhenania Hochdahl',
    shortName: 'Rhenania',
    logo: '/images/logos/rhenania.png',
  },

  awayTeam: {
    name: 'TSV 05 Ratingen',
    shortName: 'Ratingen',
    logo: '/images/logos/opponent.png',
  },
}
</script>

<template>
  <BaseSection
    spacing="small"
    class="bg-slate-50"
  >
    <article
      class="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white shadow-2xl"
    >
      <div class="border-b border-white/10 px-6 py-5 sm:px-8">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p
              class="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-300"
            >
              Nächstes Heimspiel
            </p>

            <p class="mt-1 text-sm text-slate-400">
              {{ nextMatch.competition }}
            </p>
          </div>

          <NuxtLink
            to="/spielplan"
            class="text-sm font-bold text-blue-300 transition hover:text-white"
          >
            Alle Spiele →
          </NuxtLink>
        </div>
      </div>

      <div
        class="grid items-center gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.25fr_1px_1fr]"
      >
        <!-- Mannschaften -->
        <div
          class="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8"
        >
          <div class="text-center">
            <div
              class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white p-3 shadow-lg sm:h-28 sm:w-28"
            >
              <img
                :src="nextMatch.homeTeam.logo"
                :alt="`Logo ${nextMatch.homeTeam.name}`"
                class="h-full w-full object-contain"
              >
            </div>

            <p class="mt-4 text-sm font-black sm:text-base">
              {{ nextMatch.homeTeam.name }}
            </p>
          </div>

          <div
            class="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg font-black"
          >
            VS
          </div>

          <div class="text-center">
            <div
              class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white p-3 shadow-lg sm:h-28 sm:w-28"
            >
              <img
                :src="nextMatch.awayTeam.logo"
                :alt="`Logo ${nextMatch.awayTeam.name}`"
                class="h-full w-full object-contain"
              >
            </div>

            <p class="mt-4 text-sm font-black sm:text-base">
              {{ nextMatch.awayTeam.name }}
            </p>
          </div>
        </div>

        <!-- Trennlinie Desktop -->
        <div class="hidden h-full bg-white/15 lg:block" />

        <!-- Spieldaten -->
        <div>
          <div class="space-y-5">
            <div>
              <p class="text-sm font-semibold text-slate-400">
                Datum
              </p>

              <p class="mt-1 font-bold">
                {{ nextMatch.date }}
              </p>
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-400">
                Anstoß
              </p>

              <p class="mt-1 text-4xl font-black tracking-tight">
                {{ nextMatch.time }}
              </p>
            </div>

            <div>
              <p class="text-sm font-semibold text-slate-400">
                Spielort
              </p>

              <p class="mt-1 font-bold">
                {{ nextMatch.location }}
              </p>
            </div>
          </div>

          <div class="mt-7 flex flex-col gap-3 sm:flex-row">
            <BaseButton to="/spielplan">
              Zum Spielplan
            </BaseButton>

            <BaseButton
              to="/livestream"
              variant="outline"
            >
              Livestream
            </BaseButton>
          </div>
        </div>
      </div>
    </article>
  </BaseSection>
</template>