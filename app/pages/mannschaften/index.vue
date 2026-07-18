<script setup lang="ts">
useSeoMeta({
  title: 'Mannschaften | SC Rhenania Hochdahl',
  description:
    'Alle Mannschaften des SC Rhenania Hochdahl – Herren, Jugend, Alte Herren und weitere Teams.',
})

type Team = {
  name: string
  category: string
  description: string
  image: string
  to: string
  training?: string
  league?: string
}

const seniorTeams: Team[] = [
  {
    name: 'I. Mannschaft',
    category: 'Herren',
    description:
      'Unsere erste Herrenmannschaft steht für ambitionierten Fußball, Teamgeist und eine starke Verbindung zum Verein.',
    image: '/images/teams/first-team.jpg',
    to: '/mannschaften/erste',
    training: 'Dienstag und Donnerstag',
    league: 'Kreisliga A',
  },
  {
    name: 'II. Mannschaft',
    category: 'Herren',
    description:
      'Unsere zweite Mannschaft verbindet sportlichen Ehrgeiz mit Gemeinschaft und unterstützt den gesamten Seniorenbereich.',
    image: '/images/teams/second-team.jpg',
    to: '/mannschaften/zweite',
    training: 'Dienstag und Donnerstag',
    league: 'Kreisliga C',
  },
]

const otherTeams: Team[] = [
  {
    name: 'Jugend',
    category: 'Nachwuchs',
    description:
      'Von den Bambini bis zur A-Jugend fördern wir unsere Nachwuchsspieler altersgerecht und mit viel Freude am Fußball.',
    image: '/images/teams/youth.jpg',
    to: '/jugend',
  },
  {
    name: 'Alte Herren',
    category: 'Tradition',
    description:
      'Fußball, Freundschaft und Vereinsleben stehen bei unseren Alten Herren gleichermaßen im Mittelpunkt.',
    image: '/images/teams/old-boys.jpg',
    to: '/mannschaften/alte-herren',
  },
  {
    name: 'Frauen und Mädchen',
    category: 'Fußball für alle',
    description:
      'Unser Angebot für fußballbegeisterte Frauen und Mädchen soll nachhaltig weiterentwickelt werden.',
    image: '/images/teams/women.jpg',
    to: '/mannschaften/frauen',
  },
]

const benefits = [
  {
    title: 'Qualifiziertes Training',
    description:
      'Unsere Trainerinnen und Trainer fördern sportliche und persönliche Entwicklung.',
  },
  {
    title: 'Starke Gemeinschaft',
    description:
      'Bei uns zählen Zusammenhalt, Respekt und gegenseitige Unterstützung.',
  },
  {
    title: 'Für jedes Alter',
    description:
      'Vom ersten Ballkontakt bis zum Seniorenfußball bieten wir passende Mannschaften.',
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
        src="/images/teams/first-team.jpg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover opacity-30"
      >

      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40"
      />

      <BaseContainer>
        <div class="relative max-w-4xl">
          <p
            class="text-sm font-extrabold uppercase tracking-[0.3em] text-blue-400"
          >
            Unsere Teams
          </p>

          <h1
            class="mt-5 text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            Gemeinsam auf
            <span class="block text-blue-500">
              dem Platz.
            </span>
          </h1>

          <p class="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
            Entdecke die Mannschaften des SC Rhenania Hochdahl und finde das
            passende Team für dich.
          </p>

          <div class="mt-9 flex flex-col gap-3 sm:flex-row">
            <BaseButton to="/probetraining">
              Probetraining vereinbaren
            </BaseButton>

            <BaseButton
              to="/kontakt"
              variant="outline"
            >
              Ansprechpartner
            </BaseButton>
          </div>
        </div>
      </BaseContainer>
    </section>

    <!-- Herren -->
    <BaseSection class="bg-white">
      <div class="mb-10 max-w-3xl">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Senioren
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Unsere Herrenmannschaften
        </h2>

        <p class="mt-5 text-lg leading-8 text-slate-600">
          Zwei Mannschaften, ein Verein: Unsere Senioren vertreten Rhenania
          Hochdahl im regelmäßigen Spielbetrieb.
        </p>
      </div>

      <div class="grid gap-7 lg:grid-cols-2">
        <article
          v-for="team in seniorTeams"
          :key="team.to"
          class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <NuxtLink
            :to="team.to"
            class="block"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-slate-200">
              <img
                :src="team.image"
                :alt="team.name"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              >

              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
              />

              <span
                class="absolute left-5 top-5 rounded-full bg-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
              >
                {{ team.category }}
              </span>

              <h3
                class="absolute bottom-5 left-5 right-5 text-3xl font-black text-white"
              >
                {{ team.name }}
              </h3>
            </div>

            <div class="p-6 sm:p-8">
              <p class="leading-7 text-slate-600">
                {{ team.description }}
              </p>

              <dl class="mt-6 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
                <div>
                  <dt class="text-sm font-semibold text-slate-500">
                    Liga
                  </dt>

                  <dd class="mt-1 font-bold text-slate-950">
                    {{ team.league }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-semibold text-slate-500">
                    Training
                  </dt>

                  <dd class="mt-1 font-bold text-slate-950">
                    {{ team.training }}
                  </dd>
                </div>
              </dl>

              <span
                class="mt-7 inline-flex items-center gap-2 font-bold text-blue-700"
              >
                Zur Mannschaft

                <span
                  class="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>
    </BaseSection>

    <!-- Weitere Mannschaften -->
    <BaseSection class="bg-slate-50">
      <div
        class="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Der ganze Verein
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Weitere Mannschaften
          </h2>
        </div>

        <NuxtLink
          to="/kontakt"
          class="font-bold text-blue-700 transition hover:text-blue-500"
        >
          Team nicht gefunden? →
        </NuxtLink>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="team in otherTeams"
          :key="team.to"
          :to="team.to"
          class="group relative min-h-[420px] overflow-hidden rounded-3xl bg-slate-900 shadow-lg"
        >
          <img
            :src="team.image"
            :alt="team.name"
            class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          >

          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent"
          />

          <div class="absolute inset-x-0 bottom-0 p-7 text-white">
            <p
              class="text-sm font-bold uppercase tracking-[0.2em] text-blue-300"
            >
              {{ team.category }}
            </p>

            <h3 class="mt-3 text-3xl font-black">
              {{ team.name }}
            </h3>

            <p class="mt-3 leading-7 text-slate-200">
              {{ team.description }}
            </p>

            <div class="mt-6 inline-flex items-center gap-2 font-bold">
              Mehr erfahren

              <span
                class="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </div>

          <div
            class="absolute bottom-0 left-0 h-1 w-0 bg-blue-500 transition-all duration-500 group-hover:w-full"
          />
        </NuxtLink>
      </div>
    </BaseSection>

    <!-- Vorteile -->
    <BaseSection class="bg-white">
      <div class="mx-auto max-w-3xl text-center">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Teil der Rhenania werden
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Dein Platz in unserem Verein
        </h2>

        <p class="mt-5 text-lg leading-8 text-slate-600">
          Ob Anfänger, erfahrener Spieler oder Wiedereinsteiger: Bei uns steht
          die Freude am Fußball im Mittelpunkt.
        </p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="rounded-2xl border border-slate-200 bg-slate-50 p-7"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-xl font-black text-white"
            aria-hidden="true"
          >
            ✓
          </div>

          <h3 class="mt-6 text-xl font-black text-slate-950">
            {{ benefit.title }}
          </h3>

          <p class="mt-3 leading-7 text-slate-600">
            {{ benefit.description }}
          </p>
        </article>
      </div>

      <div class="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
        <BaseButton to="/probetraining">
          Probetraining vereinbaren
        </BaseButton>

        <BaseButton
          to="/mitglied-werden"
          variant="outline"
          class="border-slate-300 text-slate-950 hover:bg-slate-950 hover:text-white"
        >
          Mitglied werden
        </BaseButton>
      </div>
    </BaseSection>
  </main>
</template>