<script setup lang="ts">
const stats = [
  {
    value: '1925',
    label: 'Gründungsjahr',
    description: 'Tradition und Gemeinschaft in Hochdahl',
  },
  {
    value: '15+',
    label: 'Mannschaften',
    description: 'Von der Jugend bis zu den Senioren',
  },
  {
    value: '500+',
    label: 'Mitglieder',
    description: 'Gemeinsam für unseren Verein',
  },
  {
    value: '200+',
    label: 'Jugendspieler',
    description: 'Nachwuchsförderung mit Leidenschaft',
  },
]
</script>

<template>
  <section class="relative overflow-hidden bg-slate-950 py-20 text-white md:py-28">
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.3),_transparent_40%)]"
    />

    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.04)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[size:48px_48px]"
    />

    <BaseContainer>
      <div class="relative">
        <div class="mx-auto max-w-3xl text-center">
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-400"
          >
            Unser Verein
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight sm:text-5xl"
          >
            Gemeinsam stark seit 1925
          </h2>

          <p class="mt-5 text-lg leading-8 text-slate-300">
            Der SC Rhenania Hochdahl verbindet sportliche Leidenschaft,
            Nachwuchsarbeit und ein lebendiges Vereinsleben.
          </p>
        </div>

        <dl
          class="mt-14 grid overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur sm:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="relative px-6 py-9 text-center"
            :class="{
              'border-b border-white/10 sm:border-r':
                index === 0,
              'border-b border-white/10 lg:border-r':
                index === 1,
              'border-b border-white/10 sm:border-b-0 sm:border-r':
                index === 2,
            }"
          >
            <dt class="text-sm font-bold uppercase tracking-wider text-blue-300">
              {{ stat.label }}
            </dt>

            <dd class="mt-3 text-5xl font-black tracking-tight">
              {{ stat.value }}
            </dd>

            <p class="mt-3 text-sm leading-6 text-slate-400">
              {{ stat.description }}
            </p>
          </div>
        </dl>

        <div class="mt-10 flex justify-center">
          <BaseButton
            to="/verein"
            variant="outline"
          >
            Mehr über den Verein
          </BaseButton>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>