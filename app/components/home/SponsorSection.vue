<script setup lang="ts">
const sponsors = [
  {
    name: 'Sponsor 1',
    logo: '/images/sponsors/sponsor-1.png',
    url: '#',
  },
  {
    name: 'Sponsor 2',
    logo: '/images/sponsors/sponsor-2.png',
    url: '#',
  },
  {
    name: 'Sponsor 3',
    logo: '/images/sponsors/sponsor-3.png',
    url: '#',
  },
  {
    name: 'Sponsor 4',
    logo: '/images/sponsors/sponsor-4.png',
    url: '#',
  },
  {
    name: 'Sponsor 5',
    logo: '/images/sponsors/sponsor-5.png',
    url: '#',
  },
  {
    name: 'Sponsor 6',
    logo: '/images/sponsors/sponsor-6.png',
    url: '#',
  },
]
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

    <div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.name"
        :href="sponsor.url"
        :aria-label="sponsor.name"
        class="group flex min-h-32 items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
      >
        <img
          :src="sponsor.logo"
          :alt="sponsor.name"
          class="max-h-16 w-full object-contain grayscale opacity-70 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
        >
      </a>
    </div>

    <div class="mt-10 flex justify-center">
      <BaseButton to="/sponsoren">
        Sponsor werden
      </BaseButton>
    </div>
  </BaseSection>
</template>