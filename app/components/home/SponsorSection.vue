<script setup lang="ts">
const {
  data: response,
  pending,
  error,
  refresh,
} = useStrapiSponsors()

const sponsors = computed(() => response.value?.data ?? [])
</script>

<template>
  <BaseSection class="bg-slate-50">
    <div class="text-center">
      <p
        class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
      >
        Gemeinsam erfolgreich
      </p>

      <h2
        class="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
      >
        Unsere Partner
      </h2>

      <p class="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Wir bedanken uns bei allen Unternehmen und Unterstützern, die unseren
        Verein und unsere Nachwuchsarbeit möglich machen.
      </p>
    </div>

    <div
      v-if="pending"
      class="py-16 text-center"
    >
      <p class="font-bold text-slate-600">
        Partner werden geladen …
      </p>
    </div>

    <BaseAlert
      v-else-if="error"
      variant="error"
      class="mt-10"
    >
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <span>
          Die Partner konnten nicht geladen werden.
        </span>

        <button
          type="button"
          class="font-bold underline"
          @click="refresh"
        >
          Erneut versuchen
        </button>
      </div>
    </BaseAlert>

    <div
      v-else-if="sponsors.length"
      class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
    >
      <SponsorCard
        v-for="sponsor in sponsors.slice(0, 6)"
        :key="sponsor.documentId"
        :sponsor="sponsor"
      />
    </div>

    <div
      v-else
      class="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"
    >
      <p class="font-bold text-slate-700">
        Aktuell sind noch keine Partner veröffentlicht.
      </p>
    </div>

    <div class="mt-10 flex justify-center">
      <BaseButton to="/sponsoren">
        Sponsor werden
      </BaseButton>
    </div>
  </BaseSection>
</template>