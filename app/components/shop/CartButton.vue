<script setup lang="ts">
const {
  itemCount,
  openCart,
  initializeCart,
} = useCart()

onMounted(() => {
  initializeCart()
})
</script>

<template>
  <button
    type="button"
    class="fixed bottom-5 right-5 z-40 flex min-h-14 items-center gap-3 rounded-full bg-slate-950 px-5 font-black text-white shadow-2xl transition hover:-translate-y-1 hover:bg-blue-700"
    aria-label="Warenkorb öffnen"
    @click="openCart"
  >
    <svg
      class="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="19" cy="20" r="1" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>

    <span>
      Warenkorb
    </span>

    <span
      class="flex h-7 min-w-7 items-center justify-center rounded-full bg-blue-900 px-2 text-xs group-hover:bg-white group-hover:text-blue-900"
    >
      {{ itemCount }}
    </span>
  </button>
</template>