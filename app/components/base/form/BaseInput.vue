<script setup lang="ts">
interface Props {
  modelValue: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  autocomplete?: string
  hint?: string
  error?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <BaseField
    :label="label"
    :required="required"
    :hint="hint"
    :error="error"
  >
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </BaseField>
</template>