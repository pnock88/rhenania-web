<script setup lang="ts">
import type { StrapiCoach } from '~/types/strapi'

const props = defineProps<{
  coach: StrapiCoach
}>()

const { getStrapiMediaUrl } = useStrapiMedia()

const phoneHref = computed(() => {
  if (!props.coach.phone) {
    return undefined
  }

  return `tel:${props.coach.phone.replace(/[^\d+]/g, '')}`
})
</script>

<template>
  <BaseCard
    :padded="false"
    class="h-full"
  >
    <div class="aspect-[4/3] bg-slate-200">
      <img
        :src="
          getStrapiMediaUrl(
            coach.image,
            '/images/teams/coaches/placeholder.jpg',
          )
        "
        :alt="coach.name"
        loading="lazy"
        class="h-full w-full object-cover"
      >
    </div>

    <div class="p-6">
      <BaseBadge variant="secondary">
        {{ coach.role }}
      </BaseBadge>

      <h3 class="mt-4 text-2xl font-black text-slate-950">
        {{ coach.name }}
      </h3>

      <div
        v-if="coach.email || coach.phone"
        class="mt-5 space-y-2"
      >
        <a
          v-if="coach.email"
          :href="`mailto:${coach.email}`"
          class="block break-all text-sm font-bold text-slate-600 transition hover:text-blue-700"
        >
          {{ coach.email }}
        </a>

        <a
          v-if="coach.phone"
          :href="phoneHref"
          class="block text-sm font-bold text-slate-600 transition hover:text-blue-700"
        >
          {{ coach.phone }}
        </a>
      </div>
    </div>
  </BaseCard>
</template>