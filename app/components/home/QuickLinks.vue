<script setup lang="ts">

  import {
    Shirt,
    Newspaper,
    CalendarDays,
    Handshake,
    ShoppingBag,
  } from 'lucide-vue-next'

  const quickLinks = [
    {
      title: 'Verein',
      to: '/verein',
      image: '/images/logos/rhenania.png',
    },
    {
      title: 'Mannschaften',
      to: '/mannschaften',
      icon: Shirt,
    },
    {
      title: 'News',
      to: '/news',
      icon: Newspaper,
    },
    {
      title: 'Spielplan',
      to: '/spielplan',
      icon: CalendarDays,
    },
    {
      title: 'Sponsoren',
      to: '/sponsoren',
      icon: Handshake,
    },
    {
      title: 'Fanshop',
      to: '/fanshop',
      icon: ShoppingBag,
    },
  ]

</script>

<template>
  <section class="relative z-10 -mt-10">
    <BaseContainer>
      <div
        class="overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-slate-200"
      >
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-slate-200">
          <NuxtLink
            v-for="item in quickLinks"
            :key="item.to"
            :to="item.to"
            class="group flex flex-col items-center justify-center gap-1 px-6 py-3 transition-all duration-200 hover:bg-slate-100"
          >
            <div class="flex h-8 items-center justify-center">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                class="h-8 w-auto opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
              />
              <component
                :is="item.icon"
                class="size-6 text-slate-500 transition-all duration-300 group-hover:text-[var(--color-blue-500)] group-hover:scale-110"
                :stroke-width="2.2"
              />
            </div>

            <span
              class="text-center text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-[var(--color-blue-500)]"
            >
              {{ item.title }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>