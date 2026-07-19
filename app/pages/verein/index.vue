<script setup lang="ts">
useSeoMeta({
  title: 'Unser Verein | SC Rhenania Hochdahl',
  description:
    'Geschichte, Werte, Ehrenamt und Vereinsleben des SC Rhenania Hochdahl 1925 e.V.',
})

const values = [
  {
    title: 'Gemeinschaft',
    description:
      'Unser Verein verbindet Menschen verschiedener Generationen und Hintergründe.',
    icon: 'heart',
  },
  {
    title: 'Leidenschaft',
    description:
      'Wir leben Fußball mit Einsatz, Freude und Begeisterung – auf und neben dem Platz.',
    icon: 'ball',
  },
  {
    title: 'Fairplay',
    description:
      'Respekt, Verlässlichkeit und ein faires Miteinander bestimmen unser Handeln.',
    icon: 'shield',
  },
  {
    title: 'Ehrenamt',
    description:
      'Engagierte Mitglieder machen Training, Spielbetrieb und Vereinsleben möglich.',
    icon: 'users',
  },
]

const boardMembers = [
  {
    name: 'Max Mustermann',
    role: '1. Vorsitzender',
    email: 'vorsitz@rhenania-hochdahl.de',
    image: '/images/club/board-1.jpg',
  },
  {
    name: 'Erika Musterfrau',
    role: '2. Vorsitzende',
    email: 'vorstand@rhenania-hochdahl.de',
    image: '/images/club/board-2.jpg',
  },
  {
    name: 'Peter Beispiel',
    role: 'Geschäftsführer',
    email: 'geschaeftsstelle@rhenania-hochdahl.de',
    image: '/images/club/board-3.jpg',
  },
]
</script>

<template>
  <main>
    <!-- Seiten-Hero -->
    <BasePageHero
      eyebrow="Unser Verein"
      title="Mehr als Fußball"
      highlight="seit 1925."
      description="Der SC Rhenania Hochdahl steht für sportliche Leidenschaft, nachhaltige Nachwuchsarbeit und eine starke Gemeinschaft."
      image="/images/home/hero-team.jpg"
    />

    <!-- Geschichte -->
    <BaseSection class="bg-white">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Unsere Geschichte
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Verwurzelt in Hochdahl
          </h2>

          <div class="mt-7 space-y-5 text-lg leading-8 text-slate-600">
            <p>
              Seit seiner Gründung im Jahr 1925 ist der SC Rhenania Hochdahl
              ein fester Bestandteil des sportlichen und gesellschaftlichen
              Lebens in Hochdahl.
            </p>

            <p>
              Was als Fußballverein begann, entwickelte sich über viele
              Jahrzehnte zu einer Gemeinschaft, in der Kinder, Jugendliche
              und Erwachsene gemeinsam Sport erleben.
            </p>

            <p>
              Dabei stehen nicht nur Ergebnisse und Tabellenplätze im
              Mittelpunkt. Mindestens genauso wichtig sind Teamgeist,
              persönliche Entwicklung und gegenseitiger Respekt.
            </p>
          </div>
        </div>

        <div
          class="relative min-h-[440px] overflow-hidden rounded-3xl bg-slate-200 shadow-2xl"
        >
          <img
            src="/images/home/hero-team.jpg"
            alt="Spieler des SC Rhenania Hochdahl"
            class="absolute inset-0 h-full w-full object-cover"
          >

          <div
            class="absolute bottom-6 left-6 right-6 rounded-2xl bg-slate-950/85 p-6 text-white backdrop-blur"
          >
            <p class="text-4xl font-black text-blue-400">
              1925
            </p>

            <p class="mt-1 font-bold">
              Gründung des SC Rhenania Hochdahl
            </p>
          </div>
        </div>
      </div>
    </BaseSection>

    <!-- Werte -->
    <BaseSection class="bg-slate-50">
      <div class="mx-auto max-w-3xl text-center">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Wofür wir stehen
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Unsere Werte
        </h2>

        <p class="mt-5 text-lg leading-8 text-slate-600">
          Diese Grundsätze prägen unseren Umgang miteinander und unsere
          tägliche Vereinsarbeit.
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ContactPersonCard
          v-for="contact in contacts"
          :key="contact.email"
          v-bind="contact"
        />
      </div>
    </BaseSection>

    <!-- Vorstand -->
    <BaseSection class="bg-white">
      <div
        class="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Ansprechpartner
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Unser Vorstand
          </h2>
        </div>

        <NuxtLink
          to="/kontakt"
          class="font-bold text-blue-700 transition hover:text-blue-500"
        >
          Alle Ansprechpartner →
        </NuxtLink>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <ContactPersonCard
          v-for="member in boardMembers"
          :key="member.email"
          v-bind="member"
        />
      </div>
    </BaseSection>

    <!-- Gelände -->
    <BaseSection class="bg-slate-950 text-white">
      <div class="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-400"
          >
            Unser Zuhause
          </p>

          <h2 class="mt-4 text-4xl font-black sm:text-5xl">
            Sportanlage Sandheide
          </h2>

          <p class="mt-6 text-lg leading-8 text-slate-300">
            Hier finden Training, Heimspiele und ein großer Teil unseres
            Vereinslebens statt.
          </p>

          <address class="mt-7 not-italic text-slate-300">
            <p class="font-bold text-white">
              SC Rhenania Hochdahl 1925 e.V.
            </p>

            <p class="mt-2">
              Sandheide<br>
              40699 Erkrath
            </p>
          </address>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton to="/kontakt">
              Kontakt
            </BaseButton>

            <BaseButton
              to="https://maps.google.com"
              external
              variant="outline"
            >
              Route planen
            </BaseButton>
          </div>
        </div>

        <div
          class="flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
        >
          <p class="px-8 text-center text-slate-400">
            Hier kann später eine Karte oder ein Luftbild des Vereinsgeländes
            eingebunden werden.
          </p>
        </div>
      </div>
    </BaseSection>
  </main>
</template>