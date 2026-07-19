<script setup lang="ts">
import type {
  StrapiTeam,
  TeamSection,
} from '~/types/strapi'

useSeoMeta({
  title: 'Mannschaften | SC Rhenania Hochdahl',
  description:
    'Alle Mannschaften des SC Rhenania Hochdahl – Senioren, Nachwuchs und Freizeitfußball.',
})

const {
  data: teamResponse,
  pending,
  error,
  refresh,
} = useStrapiTeams()

const teams = computed<StrapiTeam[]>(() => {
  return teamResponse.value?.data ?? []
})

type TeamGroup = {
  section: TeamSection
  eyebrow: string
  title: string
  description: string
  teams: StrapiTeam[]
}

const groupDescriptions: Record<
  TeamSection,
  {
    eyebrow: string
    title: string
    description: string
  }
> = {
  Senioren: {
    eyebrow: 'Erwachsenenfußball',
    title: 'Senioren',
    description:
      'Unsere Herren-, Damen- und Altherrenmannschaften vertreten den Verein im regelmäßigen Spielbetrieb.',
  },

  Nachwuchs: {
    eyebrow: 'Jugendfußball',
    title: 'Nachwuchs',
    description:
      'Bei unseren Junioren, Juniorinnen und Soccer Girls stehen altersgerechte Förderung, Gemeinschaft und Freude am Fußball im Mittelpunkt.',
  },

  Freizeit: {
    eyebrow: 'Gemeinsam aktiv',
    title: 'Freizeitfußball',
    description:
      'Unsere Freizeitangebote richten sich an alle, die ohne Leistungsdruck gemeinsam Fußball spielen möchten.',
  },
}

const sectionOrder: TeamSection[] = [
  'Senioren',
  'Nachwuchs',
  'Freizeit',
]

const teamGroups = computed<TeamGroup[]>(() => {
  return sectionOrder
    .map((section) => {
      const information = groupDescriptions[section]

      return {
        section,
        eyebrow: information.eyebrow,
        title: information.title,
        description: information.description,
        teams: teams.value.filter(team => team.section === section),
      }
    })
    .filter(group => group.teams.length > 0)
})

const hasTeams = computed(() => teamGroups.value.length > 0)
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Unsere Teams"
      title="Gemeinsam auf"
      highlight="dem Platz."
      description="Entdecke alle Mannschaften des SC Rhenania Hochdahl und finde das passende Team für dich."
      image="/images/teams/first-team.jpg"
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

    <!-- Ladezustand -->
    <BaseSection
      v-if="pending"
      class="min-h-[400px] bg-white"
    >
      <div class="py-20 text-center">
        <p class="font-bold text-slate-600">
          Mannschaften werden geladen …
        </p>
      </div>
    </BaseSection>

    <!-- Fehlerzustand -->
    <BaseSection
      v-else-if="error"
      class="min-h-[400px] bg-white"
    >
      <BaseAlert variant="error">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            Die Mannschaften konnten nicht geladen werden.
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
    </BaseSection>

    <!-- Dynamische Mannschaftsgruppen -->
    <template v-else-if="hasTeams">
      <BaseSection
        v-for="(group, index) in teamGroups"
        :key="group.section"
        :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50'"
      >
        <div
          class="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div class="max-w-3xl">
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
            >
              {{ group.eyebrow }}
            </p>

            <h2
              class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
            >
              {{ group.title }}
            </h2>

            <p class="mt-5 text-lg leading-8 text-slate-600">
              {{ group.description }}
            </p>
          </div>

          <BaseBadge variant="secondary">
            {{ group.teams.length }}
            {{ group.teams.length === 1 ? 'Mannschaft' : 'Mannschaften' }}
          </BaseBadge>
        </div>

        <div
          class="grid gap-7 md:grid-cols-2"
          :class="
            group.teams.length >= 3
              ? 'xl:grid-cols-3'
              : 'xl:grid-cols-2'
          "
        >
          <TeamCard
            v-for="team in group.teams"
            :key="team.documentId"
            :team="team"
          />
        </div>
      </BaseSection>
    </template>

    <!-- Keine Mannschaften -->
    <BaseSection
      v-else
      class="min-h-[400px] bg-white"
    >
      <div
        class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center"
      >
        <h2 class="text-2xl font-black text-slate-950">
          Noch keine Mannschaften veröffentlicht
        </h2>

        <p class="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
          Sobald Mannschaften in Strapi veröffentlicht und einem Bereich
          zugeordnet wurden, erscheinen sie hier.
        </p>
      </div>
    </BaseSection>

    <!-- Abschluss-CTA -->
    <section class="bg-blue-700 py-16 text-white md:py-20">
      <BaseContainer>
        <div
          class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="max-w-3xl">
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-200"
            >
              Teil der Rhenania werden
            </p>

            <h2 class="mt-4 text-4xl font-black sm:text-5xl">
              Noch nicht das passende Team gefunden?
            </h2>

            <p class="mt-5 text-lg leading-8 text-blue-100">
              Melde dich bei uns. Gemeinsam finden wir die passende
              Mannschaft oder das geeignete Fußballangebot.
            </p>
          </div>

          <div class="flex shrink-0 flex-col gap-3 sm:flex-row">
            <BaseButton
              to="/probetraining"
              variant="secondary"
            >
              Probetraining anfragen
            </BaseButton>

            <BaseButton
              to="/kontakt"
              variant="outline"
            >
              Kontakt aufnehmen
            </BaseButton>
          </div>
        </div>
      </BaseContainer>
    </section>
  </main>
</template>