<script setup lang="ts">
const links = [
  {
    label: 'Mannschaften',
    description: 'Alle Teams im Überblick',
    to: '/mannschaften',
    icon: '⚽',
  },
  {
    label: 'Spielplan',
    description: 'Spiele und Ergebnisse',
    to: '/spielplan',
    icon: '📅',
  },
  {
    label: 'Aktuelles',
    description: 'News aus dem Verein',
    to: '/news',
    icon: '📰',
  },
  {
    label: 'Jugend',
    description: 'Unsere Nachwuchsarbeit',
    to: '/jugend',
    icon: '🏃',
  },
  {
    label: 'Mitglied werden',
    description: 'Werde Teil der Gemeinschaft',
    to: '/mitglied-werden',
    icon: '💙',
  },
  {
    label: 'Kontakt',
    description: 'Ansprechpartner finden',
    to: '/kontakt',
    icon: '✉️',
  },
]
</script>

<template>
  <section class="relative z-20 -mt-14 pb-6">
    <BaseContainer>
      <div
        class="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="group flex items-center gap-4 border-b border-slate-200 p-6 transition hover:bg-blue-50 sm:border-r lg:min-h-32"
        >
          <div
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl transition group-hover:scale-105 group-hover:bg-blue-600"
          >
            <span class="group-hover:brightness-0 group-hover:invert">
              {{ link.icon }}
            </span>
          </div>

          <div>
            <h2
              class="font-bold text-slate-950 transition group-hover:text-blue-700"
            >
              {{ link.label }}
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              {{ link.description }}
            </p>
          </div>

          <span
            class="ml-auto text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
            aria-hidden="true"
          >
            →
          </span>
        </NuxtLink>
      </div>
    </BaseContainer>
  </section>
</template>