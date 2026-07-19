<script setup lang="ts">
import type { StrapiTeam } from '~/types/strapi'

const props = defineProps<{
  team: StrapiTeam
}>()

const { getStrapiMediaUrl } = useStrapiMedia()

const teamUrl = computed(() => {
  return `/mannschaften/${props.team.slug}`
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
</script>

<template>
  <BaseCard
    hover
    :padded="false"
    class="group h-full"
  >
    <NuxtLink
      :to="teamUrl"
      class="flex h-full flex-col"
    >
      <!-- Mannschaftsbild -->
      <div class="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <img
          :src="
            getStrapiMediaUrl(
              team.image,
              '/images/teams/first-team.jpg',
            )
          "
          :alt="team.name"
          loading="lazy"
          class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        >

        <div
          class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"
        />

        <div class="absolute left-5 top-5">
          <BaseBadge>
            {{ team.category }}
          </BaseBadge>
        </div>

        <h3
          class="absolute bottom-5 left-5 right-5 text-3xl font-black text-white"
        >
          {{ team.name }}
        </h3>
      </div>

      <!-- Inhalt -->
      <div class="flex flex-1 flex-col p-6 sm:p-7">
        <p
          v-if="team.description"
          class="flex-1 leading-7 text-slate-600"
        >
          {{ team.description }}
        </p>

        <dl
          v-if="team.league || team.trainingSessions?.length"
          class="mt-6 space-y-5 border-t border-slate-200 pt-6"
        >
          <!-- Liga -->
          <div v-if="team.league">
            <dt class="text-sm font-semibold text-slate-500">
              Liga
            </dt>

            <dd class="mt-1 font-black text-slate-950">
              {{ team.league }}
            </dd>
          </div>

          <!-- Trainingszeiten -->
          <div v-if="team.trainingSessions?.length">
            <dt class="text-sm font-semibold text-slate-500">
              Training
            </dt>

            <dd class="mt-3 space-y-3">
              <div
                v-for="session in team.trainingSessions"
                :key="session.id"
                class="rounded-xl bg-slate-50 p-4"
              >
                <div
                  class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span class="font-black text-slate-950">
                    {{ session.day }}
                  </span>

                  <span
                    v-if="session.startTime"
                    class="text-sm font-bold text-blue-700"
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
                  class="mt-2 text-sm text-slate-600"
                >
                  {{ session.location }}
                </p>

                <p
                  v-if="session.note"
                  class="mt-1 text-xs font-semibold text-slate-500"
                >
                  {{ session.note }}
                </p>
              </div>
            </dd>
          </div>
        </dl>

        <span
          class="mt-7 inline-flex items-center gap-2 font-bold text-blue-700"
        >
          Zur Mannschaft

          <span
            class="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </NuxtLink>
  </BaseCard>
</template>