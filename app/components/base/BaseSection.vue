<script setup lang="ts">
interface Props {
  as?: string
  spacing?: 'small' | 'default' | 'large'
}

withDefaults(defineProps<Props>(), {
  as: 'section',
  spacing: 'default',
})

const spacingClasses = {
  small: 'py-10 md:py-14',
  default: 'py-16 md:py-24',
  large: 'py-20 md:py-32',
}
</script>

<template>
  <component
    :is="as"
    :class="spacingClasses[spacing]"
  >
    <BaseContainer>
      <slot />
    </BaseContainer>
  </component>
</template>