<script setup lang="ts">
import type { StrapiSponsor } from '~/types/strapi'

const props = defineProps<{
  sponsor: StrapiSponsor
}>()

const { getStrapiMediaUrl } = useStrapiMedia()

const logoUrl = computed(() => {
  return getStrapiMediaUrl(
    props.sponsor.logo,
    '/images/sponsors/placeholder.png',
  )
})
</script>

<template>
  <component
    :is="sponsor.url ? 'a' : 'div'"
    :href="sponsor.url || undefined"
    :target="sponsor.url ? '_blank' : undefined"
    :rel="sponsor.url ? 'noopener noreferrer' : undefined"
    class="group flex min-h-40 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
  >
    <img
        :src="getStrapiMediaUrl(
            sponsor.logo,
            '/images/sponsors/placeholder.png',
        )"
        :alt="`Logo ${sponsor.name}`"
        loading="lazy"
        class="h-20 w-full object-contain"
    >

    <!--<BaseBadge
      variant="secondary"
      class="mt-5"
    >
      {{ sponsor.level }}
    </BaseBadge>-->
  </component>
</template>