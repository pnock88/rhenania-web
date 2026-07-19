<script setup lang="ts">
    interface Props {
      eyebrow?: string
      title: string
      highlight?: string
      description?: string
      image?: string
      imageAlt?: string
      align?: 'left' | 'center'
      size?: 'default' | 'compact'
    }

    withDefaults(defineProps<Props>(), {
      eyebrow: undefined,
      highlight: undefined,
      description: undefined,
      image: undefined,
      imageAlt: '',
      align: 'left',
      size: 'default',
    })
</script>

<template>
  <section
    class="relative overflow-hidden bg-slate-950 text-white"
    :class="
      size === 'compact'
        ? 'pb-16 pt-32 md:pb-20 md:pt-36'
        : 'pb-24 pt-36 md:pb-32 md:pt-44'
    "
  >
    <img
      v-if="image"
      :src="image"
      :alt="imageAlt"
      class="absolute inset-0 h-full w-full object-cover opacity-30"
    >

    <div
      class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40"
    />

    <BaseContainer>
      <div
        class="relative"
        :class="[
          align === 'center'
            ? 'mx-auto max-w-4xl text-center'
            : 'max-w-4xl',
        ]"
      >
        <p
          v-if="eyebrow"
          class="text-sm font-extrabold uppercase tracking-[0.3em] text-blue-400"
        >
          {{ eyebrow }}
        </p>

        <h1
          class="mt-5 text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl"
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
          class="mt-7 max-w-2xl text-lg leading-8 text-slate-200"
          :class="align === 'center' ? 'mx-auto' : ''"
        >
          {{ description }}
        </p>

        <div
          v-if="$slots.actions"
          class="mt-9 flex flex-col gap-3 sm:flex-row"
          :class="align === 'center' ? 'justify-center' : ''"
        >
          <slot name="actions" />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>