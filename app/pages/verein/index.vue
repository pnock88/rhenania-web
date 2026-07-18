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
    <section
      class="relative overflow-hidden bg-slate-950 pb-24 pt-36 text-white md:pb-32 md:pt-44"
    >
      <img
        src="/images/home/hero-team.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-35"
      >

      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/45"
      />

      <BaseContainer>
        <div class="relative max-w-4xl">
          <p
            class="text-sm font-extrabold uppercase tracking-[0.3em] text-blue-400"
          >
            Unser Verein
          </p>

          <h1
            class="mt-5 text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            Mehr als Fußball
            <span class="block text-blue-500">
              seit 1925.
            </span>
          </h1>

          <p class="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
            Der SC Rhenania Hochdahl steht für sportliche Leidenschaft,
            nachhaltige Nachwuchsarbeit und eine starke Gemeinschaft.
          </p>
        </div>
      </BaseContainer>
    </section>

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
        <article
          v-for="value in values"
          :key="value.title"
          class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            class="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
          >
            <svg
              v-if="value.icon === 'heart'"
              class="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
              />
            </svg>

            <svg
              v-else-if="value.icon === 'ball'"
              class="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="m9 8 3-2 3 2-1 4h-4z" />
              <path d="m10 12-3 2M14 12l3 2M9 8 7 6M15 8l2-2M9 18l1-3M15 18l-1-3" />
            </svg>

            <svg
              v-else-if="value.icon === 'shield'"
              class="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>

            <svg
              v-else
              class="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            </svg>
          </div>

          <h3 class="mt-6 text-xl font-black text-slate-950">
            {{ value.title }}
          </h3>

          <p class="mt-3 leading-7 text-slate-600">
            {{ value.description }}
          </p>
        </article>
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
        <article
          v-for="member in boardMembers"
          :key="member.email"
          class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div class="aspect-[4/3] bg-slate-200">
            <img
              :src="member.image"
              :alt="member.name"
              class="h-full w-full object-cover"
            >
          </div>

          <div class="p-6">
            <h3 class="text-xl font-black text-slate-950">
              {{ member.name }}
            </h3>

            <p class="mt-1 font-semibold text-blue-700">
              {{ member.role }}
            </p>

            <a
              :href="`mailto:${member.email}`"
              class="mt-5 inline-flex text-sm font-bold text-slate-600 transition hover:text-blue-700"
            >
              {{ member.email }}
            </a>
          </div>
        </article>
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