<script setup lang="ts">
interface Props {
  modelValue: boolean
  required?: boolean
  error?: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <div>
    <label class="flex cursor-pointer items-start gap-3">
      <input
        :checked="modelValue"
        type="checkbox"
        :required="required"
        class="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
        @change="
          emit(
            'update:modelValue',
            ($event.target as HTMLInputElement).checked,
          )
        "
      >

      <span class="text-sm leading-6 text-slate-600">
        <slot />
      </span>
    </label>

    <p
      v-if="error"
      class="mt-2 text-sm font-semibold text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>