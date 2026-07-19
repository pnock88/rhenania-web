<script setup lang="ts">
type SelectOption = {
  label: string
  value: string
}

interface Props {
  modelValue: string
  label: string
  options: SelectOption[]
  placeholder?: string
  required?: boolean
  hint?: string
  error?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Bitte auswählen',
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
    <select
      :value="modelValue"
      :required="required"
      class="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
      :class="error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''"
      @change="
        emit(
          'update:modelValue',
          ($event.target as HTMLSelectElement).value,
        )
      "
    >
      <option
        value=""
        disabled
      >
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </BaseField>
</template>