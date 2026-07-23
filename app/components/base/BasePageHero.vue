<script setup lang="ts">
import type {
  BreadcrumbAnchor,
  BreadcrumbItem,
} from '~/components/base/BaseBreadcrumb.vue'

interface Props {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  image?: string
  imageAlt?: string
  align?: 'left' | 'center'
  size?: 'default' | 'compact'
  breadcrumbs?: BreadcrumbItem[]
  anchors?: BreadcrumbAnchor[]
}

withDefaults(defineProps<Props>(), {
  eyebrow: undefined,
  highlight: undefined,
  description: undefined,
  image: undefined,
  imageAlt: '',
  align: 'left',
  size: 'default',
  breadcrumbs: () => [],
  anchors: () => [],
})
</script>

<template>
  <section
    class="relative flex max-h-[500px] min-h-[625px] items-center overflow-hidden bg-slate-950 text-white"
    :class="
      size === 'compact'
        ? 'py-28 md:py-32'
        : 'py-32 md:py-36'
    "
  >
    <img
      v-if="image"
      :src="image"
      :alt="imageAlt"
      class="absolute inset-0 h-full w-full object-cover"
    >

    <div
      class="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/20"
    />

    <BaseContainer>
      <div
        class="relative"
        :class="
          align === 'center'
            ? 'mx-auto max-w-4xl text-center'
            : 'max-w-4xl'
        "
      >
        <p
          v-if="eyebrow"
          class="text-sm font-extrabold uppercase tracking-[0.3em] text-blue-400"
        >
          {{ eyebrow }}
        </p>

        <h1
          class="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          {{ title }}

          <span
            v-if="highlight"
            class="block text-blue-500"
          >
            {{ highlight }}
          </span>
        </h1>

        <p
          v-if="description"
          class="mt-6 max-w-2xl text-lg leading-8 text-slate-100"
          :class="align === 'center' ? 'mx-auto' : ''"
        >
          {{ description }}
        </p>

        <div
          v-if="$slots.actions"
          class="mt-8 flex flex-col gap-3 sm:flex-row"
          :class="align === 'center' ? 'justify-center' : ''"
        >
          <slot name="actions" />
        </div>
      </div>
    </BaseContainer>
  </section>

  <section
    v-if="breadcrumbs.length"
    class="sticky top-20 z-40 border-b border-slate-200 bg-white/95 py-3 shadow-sm backdrop-blur"
  >
    <BaseBreadcrumb
      :items="breadcrumbs"
      :anchors="anchors"
    />
  </section>
</template>