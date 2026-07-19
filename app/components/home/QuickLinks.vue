<script setup lang="ts">
const links = [
  {
    label: 'Mannschaften',
    description: 'Alle Teams im Überblick',
    to: '/mannschaften',
    icon: 'teams',
  },
  {
    label: 'Spielplan',
    description: 'Spiele und Ergebnisse',
    to: '/spielplan',
    icon: 'calendar',
  },
  {
    label: 'Aktuelles',
    description: 'News aus dem Verein',
    to: '/news',
    icon: 'news',
  },
  {
    label: 'Jugend',
    description: 'Unsere Nachwuchsarbeit',
    to: '/jugend',
    icon: 'youth',
  },
  {
    label: 'Mitglied werden',
    description: 'Werde Teil der Gemeinschaft',
    to: '/mitglied-werden',
    icon: 'heart',
  },
  {
    label: 'Kontakt',
    description: 'Ansprechpartner finden',
    to: '/kontakt',
    icon: 'mail',
  },
]
</script>

<template>
  <section class="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8">
    <BaseContainer>
      <div
        class="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        <NuxtLink
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          class="group relative flex min-h-36 items-center gap-4 border-b border-r border-slate-200 px-5 py-6 transition duration-300 hover:z-10 hover:bg-blue-50/70 xl:min-h-32 xl:border-b-0"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition duration-300 group-hover:scale-110 group-hover:bg-blue-700 group-hover:text-white"
          >
            <!-- Mannschaften -->
            <svg
              v-if="item.icon === 'teams'"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="8" r="3" />
              <circle cx="17" cy="9" r="2.5" />
              <path d="M3.5 19c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5" />
              <path d="M14.5 15.2c2.8-.4 5 .9 6 3.8" />
            </svg>

            <!-- Spielplan -->
            <svg
              v-else-if="item.icon === 'calendar'"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18" />
              <path d="M8 14h2M14 14h2M8 18h2M14 18h2" />
            </svg>

            <!-- News -->
            <svg
              v-else-if="item.icon === 'news'"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z" />
              <path d="M19 8h2v10a2 2 0 0 1-2 2" />
              <path d="M8 8h7M8 12h7M8 16h4" />
            </svg>

            <!-- Jugend -->
            <svg
              v-else-if="item.icon === 'youth'"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="5" r="2" />
              <path d="m10 8-2 5 3 2-1 5" />
              <path d="m14 8 2 4 3 1" />
              <path d="m12 11 3 4 3 4" />
              <circle cx="5" cy="18" r="2" />
            </svg>

            <!-- Mitglied werden -->
            <svg
              v-else-if="item.icon === 'heart'"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
              />
            </svg>

            <!-- Kontakt -->
            <svg
              v-else
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </div>

          <div class="min-w-0 flex-1">
            <h2
              class="whitespace-nowrap text-sm font-black text-slate-950 transition group-hover:text-blue-700"
            >
              {{ item.label }}
            </h2>

            <p
              class="mt-1 hidden text-xs leading-5 text-slate-500 2xl:block"
            >
              {{ item.description }}
            </p>
          </div>

          <svg
            class="h-4 w-4 shrink-0 text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-blue-700"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </NuxtLink>
      </div>
    </BaseContainer>
  </section>
</template>