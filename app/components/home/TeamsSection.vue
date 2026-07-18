<script setup lang="ts">
type TeamCard = {
  title: string
  subtitle: string
  image: string
  to: string
}

const teams: TeamCard[] = [
  {
    title: 'I. Mannschaft',
    subtitle: 'Unsere erste Herrenmannschaft',
    image: '/images/teams/first-team.jpg',
    to: '/mannschaften/erste',
  },
  {
    title: 'II. Mannschaft',
    subtitle: 'Unsere zweite Herrenmannschaft',
    image: '/images/teams/second-team.jpg',
    to: '/mannschaften/zweite',
  },
  {
    title: 'Jugend',
    subtitle: 'Nachwuchsarbeit mit Zukunft',
    image: '/images/teams/youth.jpg',
    to: '/jugend',
  },
  {
    title: 'Alte Herren',
    subtitle: 'Fußball, Gemeinschaft und Tradition',
    image: '/images/teams/old-boys.jpg',
    to: '/mannschaften/alte-herren',
  },
]
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
          Unsere Teams
        </p>

        <h2
          class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Mannschaften
        </h2>

        <p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Von unseren Senioren bis zum Nachwuchs: Entdecke die Mannschaften
          des SC Rhenania Hochdahl.
        </p>
      </div>

      <NuxtLink
        to="/mannschaften"
        class="inline-flex items-center gap-2 font-bold text-blue-700 transition hover:text-blue-500"
      >
        Alle Mannschaften
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <div class="grid gap-6 sm:grid-cols-2">
      <NuxtLink
        v-for="team in teams"
        :key="team.to"
        :to="team.to"
        class="group relative min-h-[360px] overflow-hidden rounded-3xl bg-slate-900 shadow-lg"
      >
        <img
          :src="team.image"
          :alt="team.title"
          class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        >

        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent"
        />

        <div
          class="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"
        >
          <p class="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
            SC Rhenania Hochdahl
          </p>

          <h3 class="mt-3 text-3xl font-black">
            {{ team.title }}
          </h3>

          <p class="mt-2 text-slate-200">
            {{ team.subtitle }}
          </p>

          <div
            class="mt-6 inline-flex items-center gap-2 font-bold text-white"
          >
            Mannschaft ansehen

            <span
              class="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>

        <div
          class="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-500 group-hover:w-full"
        />
      </NuxtLink>
    </div>
  </BaseSection>
</template>