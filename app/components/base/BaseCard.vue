<script setup lang="ts">
interface Props {
  hover?: boolean
  padded?: boolean
  bordered?: boolean
}

withDefaults(defineProps<Props>(), {
  hover: false,
  padded: true,
  bordered: true,
})
</script>

<template>
  <article
    class="overflow-hidden rounded-3xl bg-white shadow-sm transition"
    :class="[
      bordered && 'border border-slate-200',
      padded && 'p-6 sm:p-8',
      hover && 'duration-300 hover:-translate-y-1 hover:shadow-xl',
    ]"
  >
    <slot />
  </article>
</template>