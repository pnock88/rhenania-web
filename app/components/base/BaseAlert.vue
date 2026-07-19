<script setup lang="ts">
type Variant =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'

interface Props {
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
})

const classes = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'border-emerald-200 bg-emerald-50 text-emerald-800'

    case 'error':
      return 'border-red-200 bg-red-50 text-red-800'

    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-900'

    default:
      return 'border-blue-200 bg-blue-50 text-blue-800'
  }
})
</script>

<template>
  <div
    class="rounded-xl border p-4"
    :class="classes"
  >
    <slot />
  </div>
</template>