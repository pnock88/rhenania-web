<script setup lang="ts">
interface Props {
  modelValue: string
  label: string
  placeholder?: string
  required?: boolean
  rows?: number
  hint?: string
  error?: string
}

withDefaults(defineProps<Props>(), {
  rows: 5,
  placeholder: undefined,
  hint: undefined,
  error: undefined,
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
    <textarea
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      :required="required"
      class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
      :class="error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''"
      @input="
        emit(
          'update:modelValue',
          ($event.target as HTMLTextAreaElement).value,
        )
      "
    />
  </BaseField>
</template>