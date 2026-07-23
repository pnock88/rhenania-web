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
    class="fixed bottom-5 right-5 z-40 flex min-h-14 items-center gap-3 rounded-full bg-slate-950 px-5 font-black text-white shadow-2xl transition hover:-translate-y-1 hover:bg-blue-800 border border-white/60"
    aria-label="Bestellliste öffnen"
    @click="openCart"
  >
    <svg
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 5.25H7.5A2.25 2.25 0 0 0 5.25 7.5v11.25A2.25 2.25 0 0 0 7.5 21h9A2.25 2.25 0 0 0 18.75 18.75V7.5A2.25 2.25 0 0 0 16.5 5.25H15m-6 0a2.25 2.25 0 1 0 6 0m-6 0a2.25 2.25 0 0 1 6 0"
      />
    </svg>

    <span>
      Bestellliste
    </span>

    <span
      class="flex h-7 min-w-7 items-center justify-center rounded-full bg-blue-900 px-2 text-xs group-hover:bg-white group-hover:text-blue-900"
    >
      {{ itemCount }}
    </span>
  </button>
</template>