<script setup lang="ts">
interface Props {
  league: string
  trainingDays: string
  trainingTime: string
  location: string
}

defineProps<Props>()
</script>

<template>
  <section class="border-b border-slate-200 bg-white">
    <BaseContainer>
      <dl
        class="grid gap-5 py-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
            aria-hidden="true"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z" />
              <path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4" />
            </svg>
          </div>

          <div>
            <dt class="text-xs font-bold uppercase tracking-wide text-slate-500">
              Liga
            </dt>

            <dd class="mt-1 font-black text-slate-950">
              {{ league }}
            </dd>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
            aria-hidden="true"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18" />
            </svg>
          </div>

          <div>
            <dt class="text-xs font-bold uppercase tracking-wide text-slate-500">
              Trainingstage
            </dt>

            <dd class="mt-1 font-black text-slate-950">
              {{ trainingDays }}
            </dd>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
            aria-hidden="true"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>

          <div>
            <dt class="text-xs font-bold uppercase tracking-wide text-slate-500">
              Uhrzeit
            </dt>

            <dd class="mt-1 font-black text-slate-950">
              {{ trainingTime }}
            </dd>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
            aria-hidden="true"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </div>

          <div>
            <dt class="text-xs font-bold uppercase tracking-wide text-slate-500">
              Trainingsort
            </dt>

            <dd class="mt-1 font-black text-slate-950">
              {{ location }}
            </dd>
          </div>
        </div>
      </dl>
    </BaseContainer>
  </section>
</template>