<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'outline'

interface Props {
  to?: string
  variant?: ButtonVariant
  external?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  variant: 'primary',
  external: false,
  disabled: false,
})

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600',
  secondary:
    'bg-white text-slate-950 hover:bg-slate-100 focus-visible:outline-white',
  outline:
    'border border-white/70 bg-transparent text-white hover:bg-white hover:text-slate-950 focus-visible:outline-white',
}

const component = computed(() => {
  if (!props.to) {
    return 'button'
  }

  if (props.external) {
    return 'a'
  }

  return resolveComponent('NuxtLink')
})
</script>

<template>
  <component
    :is="component"
    :to="!external ? to : undefined"
    :href="external ? to : undefined"
    :disabled="!to ? disabled : undefined"
    :aria-disabled="disabled || undefined"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-wide transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
    :class="variantClasses[variant]"
  >
    <slot />
  </component>
</template>