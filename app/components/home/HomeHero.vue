<script setup lang="ts">
const buttons = [
  {
    label: 'Mitglied werden',
    to: '/mitglied-werden',
    variant: 'primary',
  },
  {
    label: 'Probetraining',
    to: '/probetraining',
    variant: 'outline',
  },
  {
    label: 'Spielplan',
    to: '/spielplan',
    variant: 'outline',
  },
]
</script>

<template>
  <section class="relative min-h-[760px] overflow-hidden">

    <!-- Hintergrund -->
    <img
      src="/images/home/hero-team.jpg"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
    >

    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20"
    />

    <div
      class="absolute inset-0 bg-black/20"
    />

    <BaseContainer>

      <div
        class="relative z-10 flex min-h-[760px] items-center"
      >

        <div class="max-w-3xl">

          <p
            class="mb-6 text-sm font-bold uppercase tracking-[0.35em] text-blue-400"
          >
            SC RHENANIA HOCHDAHL 1925 E.V.
          </p>

          <h1
            class="text-6xl font-black leading-none text-white lg:text-8xl"
          >
            Mehr als Fußball.

            <span class="block">
              Eine Gemeinschaft
            </span>

            <span class="text-blue-500">
              seit 1925.
            </span>

          </h1>

          <p
            class="mt-8 max-w-xl text-xl leading-8 text-slate-200"
          >
            Leidenschaft.
            Zusammenhalt.
            Gemeinschaft.

            Seit fast 100 Jahren ist unser Verein ein Zuhause
            für Fußballbegeisterte jeden Alters.
          </p>

          <div
            class="mt-12 flex flex-wrap gap-4"
          >

            <BaseButton
              v-for="button in buttons"
              :key="button.label"
              :to="button.to"
              :variant="button.variant"
            >
              {{ button.label }}
            </BaseButton>

          </div>

        </div>

      </div>

    </BaseContainer>

  </section>
</template>