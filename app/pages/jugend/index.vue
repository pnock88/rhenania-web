<script setup lang="ts">
useSeoMeta({
  title: 'Jugend | SC Rhenania Hochdahl',
  description:
    'Jugendfußball beim SC Rhenania Hochdahl – Mannschaften, Trainingszeiten, Probetraining und Ansprechpartner.',
})

type YouthTeam = {
  name: string
  age: string
  years: string
  training: string
  contact: string
  image: string
}

const youthTeams: YouthTeam[] = [
  {
    name: 'A-Jugend',
    age: 'U19',
    years: 'Jahrgänge 2007–2008',
    training: 'Montag und Mittwoch, 19:00–20:30 Uhr',
    contact: 'Max Mustermann',
    image: '/images/youth/a-jugend.jpg',
  },
  {
    name: 'B-Jugend',
    age: 'U17',
    years: 'Jahrgänge 2009–2010',
    training: 'Dienstag und Donnerstag, 18:30–20:00 Uhr',
    contact: 'Erika Musterfrau',
    image: '/images/youth/b-jugend.jpg',
  },
  {
    name: 'C-Jugend',
    age: 'U15',
    years: 'Jahrgänge 2011–2012',
    training: 'Montag und Mittwoch, 17:30–19:00 Uhr',
    contact: 'Peter Beispiel',
    image: '/images/youth/c-jugend.jpg',
  },
  {
    name: 'D-Jugend',
    age: 'U13',
    years: 'Jahrgänge 2013–2014',
    training: 'Dienstag und Donnerstag, 17:00–18:30 Uhr',
    contact: 'Anna Beispiel',
    image: '/images/youth/d-jugend.jpg',
  },
  {
    name: 'E-Jugend',
    age: 'U11',
    years: 'Jahrgänge 2015–2016',
    training: 'Montag und Mittwoch, 16:30–18:00 Uhr',
    contact: 'Tom Muster',
    image: '/images/youth/e-jugend.jpg',
  },
  {
    name: 'F-Jugend & Bambini',
    age: 'U9 / U7',
    years: 'Jahrgänge 2017 und jünger',
    training: 'Freitag, 16:00–17:30 Uhr',
    contact: 'Lisa Beispiel',
    image: '/images/youth/bambini.jpg',
  },
]

const benefits = [
  {
    title: 'Freude am Fußball',
    description:
      'Spielerische Entwicklung und Spaß stehen besonders bei den jüngeren Jahrgängen im Mittelpunkt.',
  },
  {
    title: 'Gemeinschaft',
    description:
      'Kinder und Jugendliche lernen Teamgeist, Respekt und Verlässlichkeit.',
  },
  {
    title: 'Altersgerechtes Training',
    description:
      'Unsere Einheiten orientieren sich an Alter, Erfahrung und Entwicklungsstand.',
  },
  {
    title: 'Engagierte Trainer',
    description:
      'Ehrenamtliche Trainer und Betreuer begleiten die Mannschaften mit viel Einsatz.',
  },
]

const contacts = [
  {
    name: 'Max Mustermann',
    role: 'Jugendleiter',
    email: 'jugend@rhenania-hochdahl.de',
    phone: '02104 000000',
    image: '/images/youth/contacts/youth-director.jpg',
  },
  {
    name: 'Erika Musterfrau',
    role: 'Koordination Kinderfußball',
    email: 'kinderfussball@rhenania-hochdahl.de',
    phone: '02104 000001',
    image: '/images/youth/contacts/kids-coordinator.jpg',
  },
  {
    name: 'Max Mustermann',
    role: 'Jugendleiter',
    email: 'jugend@rhenania-hochdahl.de',
    phone: '02104 000000',
    image: '/images/youth/contacts/youth-director.jpg',
  },
  {
    name: 'Erika Musterfrau',
    role: 'Koordination Kinderfußball',
    email: 'kinderfussball@rhenania-hochdahl.de',
    phone: '02104 000001',
    image: '/images/youth/contacts/kids-coordinator.jpg',
  },
]
</script>

<template>
  <main>
    <!-- Hero -->
    <BasePageHero
      eyebrow="Nachwuchs"
      title="Gemeinsam wachsen."
      highlight="Gemeinsam spielen."
      description="Bei uns lernen Kinder und Jugendliche nicht nur Fußball, sondern auch Teamgeist, Verantwortung und gegenseitigen Respekt."
      image="/images/teams/youth.jpg"
    >
      <template #actions>
        <BaseButton to="/probetraining">
          Probetraining vereinbaren
        </BaseButton>

        <BaseButton
          to="/kontakt"
          variant="outline"
        >
          Ansprechpartner
        </BaseButton>
      </template>
    </BasePageHero>

    <!-- Einstieg -->
    <BaseSection class="bg-white">
      <div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Jugendfußball
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Ein sportliches Zuhause für junge Menschen
          </h2>

          <div class="mt-7 space-y-5 text-lg leading-8 text-slate-600">
            <p>
              Unsere Jugendabteilung begleitet Kinder und Jugendliche von den
              ersten Ballkontakten bis in den leistungsorientierten
              Jugendfußball.
            </p>

            <p>
              Dabei achten wir darauf, dass sportliche Entwicklung und Freude
              am Spiel zusammengehören.
            </p>
          </div>
        </div>

        <div
          class="relative min-h-[420px] overflow-hidden rounded-3xl bg-slate-200 shadow-2xl"
        >
          <img
            src="/images/teams/youth.jpg"
            alt="Jugendspieler des SC Rhenania Hochdahl"
            class="absolute inset-0 h-full w-full object-cover"
          >

          <div
            class="absolute bottom-6 left-6 right-6 rounded-2xl bg-slate-950/85 p-6 text-white backdrop-blur"
          >
            <p class="text-4xl font-black text-blue-400">
              U7–U19
            </p>

            <p class="mt-1 font-bold">
              Fußballangebote für viele Altersklassen
            </p>
          </div>
        </div>
      </div>
    </BaseSection>

    <!-- Vorteile -->
    <BaseSection class="bg-slate-50">
      <div class="mx-auto max-w-3xl text-center">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Unser Anspruch
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Mehr als Training
        </h2>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-lg font-black text-white"
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
    </BaseSection>

    <!-- Mannschaften -->
    <BaseSection class="bg-white">
      <div class="mb-10">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Altersklassen
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Unsere Jugendmannschaften
        </h2>

        <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Trainingszeiten und Jahrgänge sind zunächst Platzhalter und können
          später leicht durch die offiziellen Vereinsdaten ersetzt werden.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="team in youthTeams"
          :key="team.name"
          class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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
              {{ team.age }}
            </span>

            <h3
              class="absolute bottom-5 left-5 right-5 text-3xl font-black text-white"
            >
              {{ team.name }}
            </h3>
          </div>

          <div class="p-6">
            <dl class="space-y-5">
              <div>
                <dt class="text-sm font-semibold text-slate-500">
                  Jahrgänge
                </dt>

                <dd class="mt-1 font-black text-slate-950">
                  {{ team.years }}
                </dd>
              </div>

              <div>
                <dt class="text-sm font-semibold text-slate-500">
                  Training
                </dt>

                <dd class="mt-1 font-black text-slate-950">
                  {{ team.training }}
                </dd>
              </div>

              <div>
                <dt class="text-sm font-semibold text-slate-500">
                  Ansprechpartner
                </dt>

                <dd class="mt-1 font-black text-slate-950">
                  {{ team.contact }}
                </dd>
              </div>
            </dl>

            <BaseButton
              to="/probetraining"
              class="mt-7 w-full"
            >
              Probetraining anfragen
            </BaseButton>
          </div>
        </article>
      </div>
    </BaseSection>

    <!-- Probetraining -->
    <section class="bg-blue-700 py-16 text-white md:py-20">
      <BaseContainer>
        <div
          class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="max-w-3xl">
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-200"
            >
              Mitmachen
            </p>

            <h2 class="mt-4 text-4xl font-black sm:text-5xl">
              Lust auf ein Probetraining?
            </h2>

            <p class="mt-5 text-lg leading-8 text-blue-100">
              Melde dich bei uns und wir finden gemeinsam die passende
              Mannschaft und einen geeigneten Trainingstermin.
            </p>
          </div>

          <BaseButton
            to="/probetraining"
            variant="secondary"
            class="shrink-0"
          >
            Jetzt anfragen
          </BaseButton>
        </div>
      </BaseContainer>
    </section>

    <!-- Ansprechpartner -->
    <BaseSection class="bg-slate-950 text-white">
      <div class="mb-10">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-400"
        >
          Kontakt
        </p>

        <h2 class="mt-4 text-4xl font-black sm:text-5xl">
          Ansprechpartner Jugend
        </h2>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <ContactPersonCard
          v-for="contact in contacts"
          :key="contact.email"
          v-bind="contact"
        />
      </div>
    </BaseSection>
  </main>
</template>