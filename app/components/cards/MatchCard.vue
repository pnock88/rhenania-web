<script setup lang="ts">
import type { StrapiMatch } from '~/types/strapi'

const props = defineProps<{
  match: StrapiMatch
}>()

const { getStrapiMediaUrl } = useStrapiMedia()

const formattedDate = computed(() => {
  if (!props.match.dateTime) {
    return ''
  }

  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(props.match.dateTime))
})

const formattedTime = computed(() => {
  if (!props.match.dateTime) {
    return ''
  }

  return new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(props.match.dateTime))
})

const isFinished = computed(() => {
  return props.match.matchStatus === 'finished'
})

const statusLabel = computed(() => {
  switch (props.match.matchStatus) {
    case 'finished':
      return 'Beendet'

    case 'cancelled':
      return 'Abgesagt'

    case 'postponed':
      return 'Verschoben'

    default:
      return 'Bevorstehend'
  }
})

const statusVariant = computed<
  'primary' | 'success' | 'warning' | 'danger'
>(() => {
  switch (props.match.matchStatus) {
    case 'finished':
      return 'success'

    case 'cancelled':
      return 'danger'

    case 'postponed':
      return 'warning'

    default:
      return 'primary'
  }
})

const teamLabel = computed(() => {
  return props.match.team?.name ?? 'SC Rhenania Hochdahl'
})

const fallbackLogo = '/images/logos/opponent.png'
</script>

<template>
  <BaseCard
    hover
    :padded="false"
    class="h-full"
  >
    <!-- Kopfzeile -->
    <div
      class="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex flex-wrap items-center gap-3">
        <BaseBadge variant="secondary">
          {{ teamLabel }}
        </BaseBadge>

        <span
          v-if="match.competition"
          class="text-sm font-semibold text-slate-500"
        >
          {{ match.competition }}
        </span>

        <span
          v-if="match.matchday"
          class="text-sm font-semibold text-slate-500"
        >
          {{ match.matchday }}. Spieltag
        </span>
      </div>

      <BaseBadge :variant="statusVariant">
        {{ statusLabel }}
      </BaseBadge>
    </div>

    <!-- Karteninhalt -->
    <div
      class="grid gap-8 p-6 lg:grid-cols-[0.8fr_1.8fr_0.8fr] lg:items-center"
    >
      <!-- Termin -->
      <div>
        <p class="text-sm font-semibold text-slate-500">
          Termin
        </p>

        <p class="mt-1 font-black text-slate-950">
          {{ formattedDate }}
        </p>

        <p class="mt-1 text-sm text-slate-600">
          {{ formattedTime }} Uhr
        </p>

        <p
          v-if="match.season"
          class="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400"
        >
          Saison {{ match.season }}
        </p>
      </div>

      <!-- Begegnung -->
      <div class="min-w-0">
        <!-- Logos und Spielstand -->
        <div
          class="grid grid-cols-[minmax(0,1fr)_112px_minmax(0,1fr)] items-center gap-4"
        >
          <!-- Heimlogo -->
          <div class="flex justify-center">
            <div
              class="flex h-20 w-20 items-center justify-center bg-white"
            >
              <img
                :src="
                  getStrapiMediaUrl(
                    match.homeLogo,
                    fallbackLogo,
                  )
                "
                :alt="`Logo ${match.homeTeamName}`"
                loading="lazy"
                class="h-full w-full object-contain"
              >
            </div>
          </div>

          <!-- Spielstand / Status -->
          <div class="flex items-center justify-center">
            <div
              v-if="isFinished"
              class="flex min-w-28 items-center justify-center whitespace-nowrap text-3xl font-black tabular-nums text-slate-950 sm:text-4xl"
            >
              <span>{{ match.homeScore ?? 0 }}</span>

              <span class="mx-2">
                :
              </span>

              <span>{{ match.awayScore ?? 0 }}</span>
            </div>

            <div
              v-else-if="match.matchStatus === 'cancelled'"
              class="rounded-full bg-red-100 px-4 py-2 text-sm font-black text-red-700"
            >
              Abgesagt
            </div>

            <div
              v-else-if="match.matchStatus === 'postponed'"
              class="rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-700"
            >
              Verschoben
            </div>

            <div
              v-else
              class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white"
            >
              VS
            </div>
          </div>

          <!-- Auswärtslogo -->
          <div class="flex justify-center">
            <div
              class="flex h-20 w-20 items-center justify-center bg-white"
            >
              <img
                :src="
                  getStrapiMediaUrl(
                    match.awayLogo,
                    fallbackLogo,
                  )
                "
                :alt="`Logo ${match.awayTeamName}`"
                loading="lazy"
                class="h-full w-full object-contain"
              >
            </div>
          </div>
        </div>

        <!-- Mannschaftsnamen -->
        <div
          class="grid grid-cols-[minmax(0,1fr)_112px_minmax(0,1fr)] gap-4 text-center"
        >
          <div class="flex h-24 items-center justify-center px-2 text-center">
            <p class="text-base font-black leading-6 text-slate-950">
              {{ match.homeTeamName }}
            </p>
          </div>

          <div aria-hidden="true" />

          <div class="flex h-24 items-center justify-center px-2 text-center">
            <p class="text-base font-black leading-6 text-slate-950">
              {{ match.awayTeamName }}
            </p>
          </div>

        </div>
      </div>

      <!-- Spielort -->
      <div class="lg:text-right">
        <p class="text-sm font-semibold text-slate-500">
          Spielort
        </p>

        <p
          v-if="match.location"
          class="mt-1 font-black leading-6 text-slate-950"
        >
          {{ match.location }}
        </p>

        <p
          v-else
          class="mt-1 text-sm text-slate-500"
        >
          Noch nicht bekannt
        </p>

        <!--<BaseButton
          v-if="match.matchStatus === 'upcoming'"
          to="/kontakt"
          variant="outline"
          class="mt-5 border-slate-300 text-slate-950 hover:bg-slate-950 hover:text-white"
        >
          Anfahrt & Kontakt
        </BaseButton>-->
      </div>
    </div>
  </BaseCard>
</template>