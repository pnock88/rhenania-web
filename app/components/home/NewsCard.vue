<script setup lang="ts">
  import type { StrapiArticle } from '~/types/strapi'

  defineProps<{
    article: StrapiArticle
  }>()

  const { getStrapiMediaUrl } = useStrapiMedia()
</script>

<template>
  <BaseCard
    hover
    :padded="false"
    class="group h-full"
  >
    <NuxtLink
      :to="`/news/${article.slug}`"
      class="flex h-full flex-col"
    >
      <div class="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <img
          :src="getStrapiMediaUrl(article.card ?? article.image)"
          :alt="article.title"
          loading="lazy"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        >

        <div class="absolute left-4 top-4">
          <BaseBadge>
            {{ article.category }}
          </BaseBadge>
        </div>
      </div>

      <div class="flex flex-1 flex-col p-6">
        <time
          v-if="article.date"
          :datetime="article.date"
          class="text-sm font-medium text-slate-500"
        >
          {{ formatArticleDate(article.date) }}
        </time>

        <h3
          class="mt-3 text-xl font-black leading-tight text-slate-950 transition group-hover:text-blue-700"
        >
          {{ article.title }}
        </h3>

        <p class="mt-3 flex-1 leading-7 text-slate-600">
          {{ article.excerpt }}
        </p>

        <span
          class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
        >
          Weiterlesen

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