<script setup lang="ts">
type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'

interface Props {
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const classes = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-slate-100 text-slate-700'

    case 'success':
      return 'bg-emerald-100 text-emerald-700'

    case 'warning':
      return 'bg-amber-100 text-amber-700'

    case 'danger':
      return 'bg-red-100 text-red-700'

    case 'neutral':
      return 'bg-slate-200 text-slate-700'

    default:
      return 'bg-blue-700 text-white'
  }
})
</script>

<template>
  <span
    class="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
    :class="classes"
  >
    <slot />
  </span>
</template>