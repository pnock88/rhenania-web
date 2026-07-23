<script setup lang="ts">
import {
  ChevronRightIcon,
  HomeIcon,
} from '@heroicons/vue/24/outline'

export type BreadcrumbItem = {
  label: string
  to?: string
}

export type BreadcrumbAnchor = {
  label: string
  href: string
}

const props = withDefaults(defineProps<{
  items?: BreadcrumbItem[]
  anchors?: BreadcrumbAnchor[]
}>(), {
  items: () => [],
  anchors: () => [],
})

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    label: '',
    to: '/',
  },
  ...props.items,
])
</script>

<template>
  <BaseContainer>
    <nav aria-label="Seitennavigation">
      <div
        class="flex min-w-0 items-center justify-between gap-6"
      >
        <!-- Breadcrumb -->
        <ol
          class="flex min-w-0 flex-wrap items-center gap-1 text-xs text-slate-500 sm:text-sm"
          aria-label="Breadcrumb"
        >
          <li
            v-for="(item, index) in breadcrumbs"
            :key="`${item.label}-${index}`"
            class="flex min-w-0 items-center"
          >
            <!-- Klickbarer Eintrag -->
            <NuxtLink
              v-if="
                item.to
                && index !== breadcrumbs.length - 1
              "
              :to="item.to"
              class="inline-flex items-center gap-1.5 font-medium text-slate-500 transition hover:text-[var(--color-blue-500)]"
            >
              <HomeIcon
                v-if="index === 0"
                class="size-6 shrink-0"
                aria-hidden="true"
              />

              <span
                v-if="item.label"
                class="truncate"
              >
                {{ item.label }}
              </span>

              <span
                v-if="index === 0"
                class="sr-only"
              >
                Startseite
              </span>
            </NuxtLink>

            <!-- Aktuelle Seite -->
            <span
              v-else
              class="inline-flex min-w-0 items-center gap-1.5 font-semibold text-slate-700"
              :aria-current="
                index === breadcrumbs.length - 1
                  ? 'page'
                  : undefined
              "
            >
              <HomeIcon
                v-if="index === 0"
                class="size-6 shrink-0"
                aria-hidden="true"
              />

              <span class="truncate">
                {{ item.label }}
              </span>
            </span>

            <!-- Trenner -->
            <ChevronRightIcon
              v-if="index < breadcrumbs.length - 1"
              class="mx-2 size-4 shrink-0 text-slate-300"
              aria-hidden="true"
            />
          </li>
        </ol>

        <!-- Sprungmarken -->
        <div
          v-if="anchors.length"
          class="hidden shrink-0 items-center gap-5 lg:flex"
          aria-label="Sprungmarken"
        >
          <a
            v-for="anchor in anchors"
            :key="anchor.href"
            :href="anchor.href"
            class="whitespace-nowrap text-sm font-medium text-slate-500 transition hover:text-[var(--color-blue-500)]"
          >
            {{ anchor.label }}
          </a>
        </div>
      </div>
    </nav>
  </BaseContainer>
</template>