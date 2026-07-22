<script setup lang="ts">
import type {
  StrapiHistoryEntry,
  StrapiPerson,
} from '~/types/strapi'

const {
  data: clubResponse,
  pending,
  error,
  refresh,
} = useStrapiClub()

const { getStrapiMediaUrl } = useStrapiMedia()

const club = computed(() => {
  return clubResponse.value?.data ?? null
})

const historyEntries = computed<StrapiHistoryEntry[]>(() => {
  return club.value?.historyEntries ?? []
})

const boardMembers = computed<StrapiPerson[]>(() => {
  if (!club.value) {
    return []
  }

  return [
    club.value.chairman,
    club.value.viceChairman,
    club.value.managingDirector,
    club.value.cashier,
    club.value.viceCashier,
  ]
    .filter((person): person is StrapiPerson => Boolean(person))
    .filter(person => person.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
})

const youthLeadership = computed<StrapiPerson[]>(() => {
  if (!club.value) {
    return []
  }

  return [
    club.value.youthManager,
    club.value.viceYouthManager,
  ]
    .filter((person): person is StrapiPerson => Boolean(person))
    .filter(person => person.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
})

const address = computed(() => {
  return [
    club.value?.street,
    [club.value?.zip, club.value?.city]
      .filter(Boolean)
      .join(' '),
  ].filter(Boolean)
})

useSeoMeta({
  title: () =>
    club.value?.name
      ? `Verein | ${club.value.name}`
      : 'Verein | SC Rhenania Hochdahl',

  description: () =>
    club.value?.slogan
    ?? 'Informationen über den SC Rhenania Hochdahl.',
})
</script>

<template>
  <main>
    <BaseSection
      v-if="pending"
      class="min-h-screen bg-slate-50 pt-32"
    >
      <div class="py-20 text-center">
        <p class="font-bold text-slate-600">
          Vereinsinformationen werden geladen …
        </p>
      </div>
    </BaseSection>

    <BaseSection
      v-else-if="error"
      class="min-h-screen bg-slate-50 pt-32"
    >
      <BaseAlert variant="error">
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            Die Vereinsinformationen konnten nicht geladen werden.
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

    <template v-else-if="club">
      <BasePageHero
        eyebrow="Unser Verein"
        :title="club.name"
        :highlight="
          club.founded && club.founded > 0
            ? `seit ${club.founded}.`
            : undefined
        "
        :description="
          club.slogan
          ?? club.description
          ?? 'Tradition, Gemeinschaft und Fußball in Hochdahl.'
        "
        :image="
          getStrapiMediaUrl(
            club.heroImage,
            '/images/home/hero-team.jpg',
          )
        "
      />

      <BaseSection class="bg-white">
        <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
            >
              Über uns
            </p>

            <h2
              class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
            >
              Mehr als Fußball
            </h2>

            <StrapiBlocks
              v-if="club.description?.length"
              :blocks="club.description"
              class="mt-6"
            />

            <p
              v-else
              class="mt-6 text-lg leading-8 text-slate-600"
            >
              Der SC Rhenania Hochdahl steht für sportliche Leidenschaft,
              Nachwuchsarbeit und ein starkes Vereinsleben.
            </p>
          </div>

          <div
            v-if="club.historyImage"
            class="flex justify-center"
          >
            <img
              :src="getStrapiMediaUrl(club.historyImage)"
              :alt="club.name"
              class="h-auto max-w-full rounded-3xl object-contain shadow-xl"
            >
          </div>
        </div>
      </BaseSection>

      <BaseSection
        v-if="historyEntries"
        class="bg-slate-50"
      >
        <div class="mb-12 max-w-3xl">
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Seit den Anfängen
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Unsere Vereinsgeschichte
          </h2>

          <p class="mt-5 text-lg leading-8 text-slate-600">
            Wichtige Ereignisse, sportliche Erfolge und besondere Geschichten aus
            der Entwicklung des SC Rhenania Hochdahl.
          </p>
        </div>

        <ClubHistoryTimeline :entries="historyEntries" />
      </BaseSection>

      <BaseSection
        v-if="boardMembers.length"
        class="bg-white"
      >
        <div class="mb-10">
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Verantwortung
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Vorstand
          </h2>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <TeamCoachCard
            v-for="person in boardMembers"
            :key="person.documentId"
            :coach="person"
          />
        </div>
      </BaseSection>

      <BaseSection
        v-if="youthLeadership.length"
        class="bg-slate-50"
      >
        <div class="mb-10">
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Nachwuchs
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Jugendleitung
          </h2>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <TeamCoachCard
            v-for="person in youthLeadership"
            :key="person.documentId"
            :coach="person"
          />
        </div>
      </BaseSection>

      <BaseSection class="bg-white">
        <div class="grid gap-8 lg:grid-cols-2">
          <BaseCard>
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
            >
              Kontakt
            </p>

            <h2 class="mt-4 text-3xl font-black text-slate-950">
              Vereinsdaten
            </h2>

            <dl class="mt-7 space-y-5">
              <div v-if="address.length">
                <dt class="text-sm font-semibold text-slate-500">
                  Anschrift
                </dt>

                <dd class="mt-1 font-bold text-slate-950">
                  <span
                    v-for="line in address"
                    :key="line"
                    class="block"
                  >
                    {{ line }}
                  </span>
                </dd>
              </div>

              <div v-if="club.phone">
                <dt class="text-sm font-semibold text-slate-500">
                  Telefon
                </dt>

                <dd class="mt-1">
                  <a
                    :href="`tel:${club.phone}`"
                    class="font-bold text-blue-700 hover:underline"
                  >
                    {{ club.phone }}
                  </a>
                </dd>
              </div>

              <div v-if="club.email">
                <dt class="text-sm font-semibold text-slate-500">
                  E-Mail
                </dt>

                <dd class="mt-1">
                  <a
                    :href="`mailto:${club.email}`"
                    class="font-bold text-blue-700 hover:underline"
                  >
                    {{ club.email }}
                  </a>
                </dd>
              </div>

              <div v-if="club.website">
                <dt class="text-sm font-semibold text-slate-500">
                  Website
                </dt>

                <dd class="mt-1">
                  <a
                    :href="club.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-bold text-blue-700 hover:underline"
                  >
                    {{ club.website }}
                  </a>
                </dd>
              </div>
            </dl>
          </BaseCard>

          <BaseCard>
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
            >
              Social Media
            </p>

            <h2 class="mt-4 text-3xl font-black text-slate-950">
              Folge uns
            </h2>

            <div class="mt-7 flex flex-col gap-3">
              <a
                v-if="club.facebook"
                :href="club.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-xl bg-slate-100 px-5 py-4 font-bold text-slate-950 transition hover:bg-blue-50 hover:text-blue-700"
              >
                Facebook
              </a>

              <a
                v-if="club.instagram"
                :href="club.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-xl bg-slate-100 px-5 py-4 font-bold text-slate-950 transition hover:bg-blue-50 hover:text-blue-700"
              >
                Instagram
              </a>

              <a
                v-if="club.youtube"
                :href="club.youtube"
                target="_blank"
                rel="noopener noreferrer"
                class="rounded-xl bg-slate-100 px-5 py-4 font-bold text-slate-950 transition hover:bg-blue-50 hover:text-blue-700"
              >
                YouTube
              </a>
            </div>
          </BaseCard>
        </div>
      </BaseSection>
    </template>
  </main>
</template>

<style scoped>
.article-content {
  color: #475569;
  font-size: 1.125rem;
  line-height: 2;
}

.article-content :deep(p) {
  margin-top: 1.25rem;
}

.article-content :deep(p:first-child) {
  margin-top: 0;
}

.article-content :deep(strong) {
  font-weight: 900;
  color: #0f172a;
}

.article-content :deep(h2),
.article-content :deep(h3) {
  margin-top: 2rem;
  font-weight: 900;
  color: #0f172a;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-top: 1rem;
  padding-left: 1.75rem;
}

.article-content :deep(ul) {
  list-style-type: disc;
}

.article-content :deep(ol) {
  list-style-type: decimal;
}
</style>