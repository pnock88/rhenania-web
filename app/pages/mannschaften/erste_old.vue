<script setup lang="ts">
useSeoMeta({
  title: 'I. Mannschaft | SC Rhenania Hochdahl',
  description:
    'Kader, Trainerteam, Trainingszeiten und aktuelle Informationen zur I. Mannschaft des SC Rhenania Hochdahl.',
})

const coaches = [
  {
    name: 'Max Mustermann',
    role: 'Cheftrainer',
    image: '/images/teams/coaches/coach-1.jpg',
    email: 'trainer1@rhenania-hochdahl.de',
  },
  {
    name: 'Peter Beispiel',
    role: 'Co-Trainer',
    image: '/images/teams/coaches/coach-2.jpg',
    email: 'trainer2@rhenania-hochdahl.de',
  },
]

const players = [
  { number: 1, name: 'Spieler Eins', position: 'Tor' },
  { number: 4, name: 'Spieler Zwei', position: 'Abwehr' },
  { number: 6, name: 'Spieler Drei', position: 'Mittelfeld' },
  { number: 9, name: 'Spieler Vier', position: 'Angriff' },
  { number: 10, name: 'Spieler Fünf', position: 'Mittelfeld' },
  { number: 11, name: 'Spieler Sechs', position: 'Angriff' },
]

const nextMatch = {
  homeTeam: 'SC Rhenania Hochdahl',
  awayTeam: 'TSV 05 Ratingen',
  date: 'Samstag, 24. Mai 2025',
  time: '15:00 Uhr',
  location: 'Sandheide, Hochdahl',
}
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Herren"
      title="I. Mannschaft"
      description="Unsere erste Herrenmannschaft vertritt den SC Rhenania Hochdahl mit Leidenschaft, Teamgeist und sportlichem Ehrgeiz."
      image="/images/teams/first-team.jpg"
    />

    <TeamInfoBar
      league="Kreisliga A"
      training-days="Dienstag & Donnerstag"
      training-time="20:00–21:30 Uhr"
      location="Sportanlage Grünstrasse"
    />

    <BaseSection class="bg-white">
      <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <article
          class="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-7 text-white shadow-2xl sm:p-9"
        >
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-300"
          >
            Nächstes Spiel
          </p>

          <div
            class="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center"
          >
            <div>
              <img
                src="/images/logos/rhenania.png"
                alt="SC Rhenania Hochdahl"
                class="mx-auto h-24 w-24 rounded-full bg-white p-3 object-contain"
              >

              <p class="mt-4 font-black">
                {{ nextMatch.homeTeam }}
              </p>
            </div>

            <div
              class="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 font-black"
            >
              VS
            </div>

            <div>
              <img
                src="/images/logos/opponent.png"
                alt="TSV 05 Ratingen"
                class="mx-auto h-24 w-24 rounded-full bg-white p-3 object-contain"
              >

              <p class="mt-4 font-black">
                {{ nextMatch.awayTeam }}
              </p>
            </div>
          </div>

          <dl class="mt-8 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-3">
            <div>
              <dt class="text-sm text-slate-400">
                Datum
              </dt>

              <dd class="mt-1 font-bold">
                {{ nextMatch.date }}
              </dd>
            </div>

            <div>
              <dt class="text-sm text-slate-400">
                Anstoß
              </dt>

              <dd class="mt-1 font-bold">
                {{ nextMatch.time }}
              </dd>
            </div>

            <div>
              <dt class="text-sm text-slate-400">
                Spielort
              </dt>

              <dd class="mt-1 font-bold">
                {{ nextMatch.location }}
              </dd>
            </div>
          </dl>
        </article>

        <aside
          class="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-9"
        >
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Trainingszeiten
          </p>

          <h2 class="mt-4 text-3xl font-black text-slate-950">
            Training
          </h2>

          <dl class="mt-7 space-y-5">
            <div>
              <dt class="text-sm font-semibold text-slate-500">
                Dienstag
              </dt>

              <dd class="mt-1 font-black text-slate-950">
                19:30–21:00 Uhr
              </dd>
            </div>

            <div>
              <dt class="text-sm font-semibold text-slate-500">
                Donnerstag
              </dt>

              <dd class="mt-1 font-black text-slate-950">
                19:30–21:00 Uhr
              </dd>
            </div>

            <div>
              <dt class="text-sm font-semibold text-slate-500">
                Ort
              </dt>

              <dd class="mt-1 font-black text-slate-950">
                Sportanlage Sandheide
              </dd>
            </div>
          </dl>

          <BaseButton
            to="/probetraining"
            class="mt-8 w-full"
          >
            Probetraining anfragen
          </BaseButton>
        </aside>
      </div>
    </BaseSection>

    <BaseSection class="bg-slate-50">
      <div class="mb-10">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Verantwortliche
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Trainerteam
        </h2>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <ContactPersonCard
          v-for="coach in coaches"
          :key="coach.email"
          v-bind="coach"
        />
      </div>
    </BaseSection>

    <BaseSection class="bg-white">
      <div class="mb-10">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Saisonkader
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Unsere Spieler
        </h2>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="player in players"
          :key="`${player.number}-${player.name}`"
          class="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50"
        >
          <div
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-xl font-black text-white"
          >
            {{ player.number }}
          </div>

          <div>
            <h3 class="font-black text-slate-950">
              {{ player.name }}
            </h3>

            <p class="mt-1 text-sm font-semibold text-slate-500">
              {{ player.position }}
            </p>
          </div>
        </article>
      </div>
    </BaseSection>
  </main>
</template>