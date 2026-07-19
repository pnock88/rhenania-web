<script setup lang="ts">
interface Props {
  label: string
  required?: boolean
  hint?: string
  error?: string
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-2">
    <label class="block">
      <span class="text-sm font-bold text-slate-700">
        {{ label }}

        <span
          v-if="required"
          class="text-red-500"
        >
          *
        </span>
      </span>

      <slot />
    </label>

    <p
      v-if="hint && !error"
      class="text-sm text-slate-500"
    >
      {{ hint }}
    </p>

    <p
      v-if="error"
      class="text-sm font-semibold text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>