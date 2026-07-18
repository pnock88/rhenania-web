<script setup lang="ts">
interface Props {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  to: string
}

defineProps<Props>()
</script>

<template>
  <article
    class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <NuxtLink
      :to="to"
      class="block"
    >
      <div class="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <img
          :src="image"
          :alt="title"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        >

        <span
          class="absolute left-4 top-4 rounded-full bg-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
        >
          {{ category }}
        </span>
      </div>

      <div class="p-6">
        <time class="text-sm font-medium text-slate-500">
          {{ date }}
        </time>

        <h3
          class="mt-3 text-xl font-black leading-tight text-slate-950 transition group-hover:text-blue-700"
        >
          {{ title }}
        </h3>

        <p class="mt-3 line-clamp-3 leading-7 text-slate-600">
          {{ excerpt }}
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
  </article>
</template>