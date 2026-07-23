<script setup lang="ts">

  /*<const buttons = [
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
  ] as const*/

</script>

<template>
  <section
    class="relative min-h-[700px] overflow-hidden bg-slate-950 pt-20 text-white lg:min-h-[625px]"
  >
    <img
      src="/images/herobanner/hero-team.jpg"
      alt="Fußballmannschaft auf dem Vereinsgelände"
      class="absolute inset-0 h-full w-full object-cover object-center"
    >

    <div
      class="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/65 to-slate-950/10"
    />

    <div
      class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20"
    />

    <BaseContainer>
      <div
        class="relative z-10 flex min-h-[620px] items-center py-20 lg:min-h-[400px]"
      >
        <div class="max-w-3xl">
          <p
            class="mb-5 text-sm font-extrabold uppercase tracking-[0.28em] text-blue-400"
          >
            SC Rhenania Hochdahl 1925 e.V.
          </p>

          <h1
            class="text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Mehr als Fußball.
            <span class="block">
              Eine Gemeinschaft
            </span>
            <span class="block text-blue-500">
              seit 1925
            </span>
          </h1>

          <p class="mt-7 max-w-xl text-lg leading-8 text-slate-200">
            Leidenschaft, Teamgeist und Zusammenhalt – auf dem Platz und
            darüber hinaus.
          </p>

          <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BaseButton
              v-for="button in buttons"
              :key="button.to"
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