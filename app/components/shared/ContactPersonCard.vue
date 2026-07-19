<script setup lang="ts">
interface Props {
  name: string
  role: string
  email: string
  image: string
  phone?: string
}

defineProps<Props>()
</script>

<template>
  <BaseCard
    :padded="false"
    class="h-full"
  >
    <div class="aspect-[4/3] bg-slate-200">
      <img
        :src="image"
        :alt="name"
        loading="lazy"
        class="h-full w-full object-cover"
      >
    </div>

    <div class="p-6">
      <BaseBadge variant="secondary">
        {{ role }}
      </BaseBadge>

      <h3 class="mt-4 text-xl font-black text-slate-950">
        {{ name }}
      </h3>

      <div class="mt-5 space-y-2">
        <a
          :href="`mailto:${email}`"
          class="block text-sm font-bold text-slate-600 transition hover:text-blue-700"
        >
          {{ email }}
        </a>

        <a
          v-if="phone"
          :href="`tel:${phone.replace(/\s/g, '')}`"
          class="block text-sm font-bold text-slate-600 transition hover:text-blue-700"
        >
          {{ phone }}
        </a>
      </div>
    </div>
  </BaseCard>
</template>