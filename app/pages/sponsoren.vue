<script setup lang="ts">
useSeoMeta({
  title: 'Sponsoren | SC Rhenania Hochdahl',
  description:
    'Sponsoring beim SC Rhenania Hochdahl – Partnerschaften, Sichtbarkeit und Unterstützung unserer Vereinsarbeit.',
})

type SponsorRequest = {
  company: string
  contactPerson: string
  email: string
  phone: string
  package: string
  message: string
  privacyAccepted: boolean
}

const createInitialForm = (): SponsorRequest => ({
  company: '',
  contactPerson: '',
  email: '',
  phone: '',
  package: '',
  message: '',
  privacyAccepted: false,
})

const form = reactive<SponsorRequest>(createInitialForm())

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const packages = [
  {
    name: 'Hauptpartner',
    description:
      'Maximale Sichtbarkeit auf Website, Vereinsmedien, Veranstaltungen und ausgewählten Werbeflächen.',
    benefits: [
      'Prominente Platzierung',
      'Logo auf der Website',
      'Präsenz bei Veranstaltungen',
      'Individuelle Aktivierungen',
    ],
  },
  {
    name: 'Teampartner',
    description:
      'Unterstützung einer Mannschaft mit direkter Verbindung zum sportlichen Vereinsleben.',
    benefits: [
      'Zuordnung zu einer Mannschaft',
      'Logo auf Teamseiten',
      'Social-Media-Erwähnungen',
      'Gemeinsame Aktionen',
    ],
  },
  {
    name: 'Vereinspartner',
    description:
      'Flexible Partnerschaft zur Unterstützung unserer Vereins- und Nachwuchsarbeit.',
    benefits: [
      'Logo im Partnerbereich',
      'Verlinkung zur Unternehmensseite',
      'Nennung in Vereinsmedien',
      'Langfristige Zusammenarbeit',
    ],
  },
]

const packageOptions = [
  {
    label: 'Hauptpartner',
    value: 'Hauptpartner',
  },
  {
    label: 'Teampartner',
    value: 'Teampartner',
  },
  {
    label: 'Vereinspartner',
    value: 'Vereinspartner',
  },
  {
    label: 'Individuelle Partnerschaft',
    value: 'Individuelle Partnerschaft',
  },
]

const {
  data: sponsorResponse,
  pending: sponsorsPending,
  error: sponsorsError,
  refresh: refreshSponsors,
} = useStrapiSponsors()

const partners = computed(() => sponsorResponse.value?.data ?? [])

const groupedSponsors = computed(() => ({
  main: partners.value.filter(
    sponsor => sponsor.level === 'Hauptpartner',
  ),

  team: partners.value.filter(
    sponsor => sponsor.level === 'Teampartner',
  ),

  club: partners.value.filter(
    sponsor => sponsor.level === 'Vereinspartner',
  ),

  club: partners.value.filter(
    sponsor => sponsor.level === 'Sponsoren',
  ),
}))

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!form.privacyAccepted) {
    errorMessage.value = 'Bitte bestätige die Datenschutzerklärung.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch<{ message: string }>(
      '/api/sponsor-request',
      {
        method: 'POST',
        body: form,
      },
    )

    successMessage.value = response.message
    Object.assign(form, createInitialForm())
  }
  catch (error: any) {
    console.error('Sponsoring-Anfrage:', error)

    errorMessage.value =
      error?.data?.statusMessage
      || error?.statusMessage
      || error?.message
      || 'Die Anfrage konnte nicht gesendet werden.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Gemeinsam erfolgreich"
      title="Partner der"
      highlight="Rhenania werden."
      description="Unterstütze unsere Mannschaften, unsere Nachwuchsarbeit und das Vereinsleben in Hochdahl."
      image="/images/home/hero-team.jpg"
    >
      <template #actions>
        <BaseButton to="#anfrage">
          Partnerschaft anfragen
        </BaseButton>
      </template>
    </BasePageHero>

    <!-- Vorteile -->
    <BaseSection class="bg-white">
      <div class="mx-auto max-w-3xl text-center">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Warum Sponsoring?
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Sichtbarkeit mit Wirkung
        </h2>

        <p class="mt-5 text-lg leading-8 text-slate-600">
          Eine Partnerschaft verbindet lokale Präsenz mit gesellschaftlichem
          Engagement und direkter Nähe zu Mitgliedern, Familien und Fans.
        </p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <BaseCard
          v-for="item in [
            {
              title: 'Lokale Reichweite',
              text: 'Erreiche Menschen aus Hochdahl, Erkrath und der Region.',
            },
            {
              title: 'Soziales Engagement',
              text: 'Unterstütze Nachwuchsarbeit, Ehrenamt und Vereinsleben.',
            },
            {
              title: 'Individuelle Pakete',
              text: 'Wir entwickeln gemeinsam eine passende Partnerschaft.',
            },
          ]"
          :key="item.title"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 font-black text-white"
            aria-hidden="true"
          >
            ✓
          </div>

          <h3 class="mt-6 text-xl font-black text-slate-950">
            {{ item.title }}
          </h3>

          <p class="mt-3 leading-7 text-slate-600">
            {{ item.text }}
          </p>
        </BaseCard>
      </div>
    </BaseSection>

    <!-- Sponsoring-Pakete -->
    <BaseSection class="bg-slate-50">
      <div class="mb-10">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Möglichkeiten
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Sponsoring-Pakete
        </h2>

        <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Die Leistungen sind zunächst als Beispiel angelegt und können später
          an die offiziellen Sponsoring-Angebote angepasst werden.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <BaseCard
          v-for="item in packages"
          :key="item.name"
          hover
          class="flex flex-col"
        >
          <p
            class="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-700"
          >
            Partnerschaft
          </p>

          <h3 class="mt-4 text-2xl font-black text-slate-950">
            {{ item.name }}
          </h3>

          <p class="mt-4 leading-7 text-slate-600">
            {{ item.description }}
          </p>

          <ul class="mt-7 space-y-3">
            <li
              v-for="benefit in item.benefits"
              :key="benefit"
              class="flex gap-3 text-slate-700"
            >
              <span
                class="font-black text-blue-700"
                aria-hidden="true"
              >
                ✓
              </span>

              <span>
                {{ benefit }}
              </span>
            </li>
          </ul>

          <BaseButton
            to="#anfrage"
            class="mt-8 w-full"
          >
            Interesse anmelden
          </BaseButton>
        </BaseCard>
      </div>
    </BaseSection>

    <!-- Partner aus Strapi -->
    <BaseSection class="bg-white">
      <div class="mx-auto max-w-3xl text-center">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Danke für die Unterstützung
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Unsere Partner
        </h2>

        <p class="mt-5 text-lg leading-8 text-slate-600">
          Wir bedanken uns bei allen Unternehmen, die unseren Verein und unsere
          Nachwuchsarbeit unterstützen.
        </p>
      </div>

      <div
        v-if="sponsorsPending"
        class="py-16 text-center"
      >
        <p class="font-bold text-slate-600">
          Partner werden geladen …
        </p>
      </div>

      <BaseAlert
        v-else-if="sponsorsError"
        variant="error"
        class="mt-10"
      >
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            Die Partner konnten nicht geladen werden.
          </span>

          <button
            type="button"
            class="font-bold underline"
            @click="refreshSponsors"
          >
            Erneut versuchen
          </button>
        </div>
      </BaseAlert>

      <div
        v-else-if="partners.length"
        class="mt-12 space-y-16"
      >
        <section v-if="groupedSponsors.main.length">
          <div
            class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <BaseBadge>
                Premium
              </BaseBadge>

              <h3 class="mt-4 text-3xl font-black text-slate-950">
                Hauptpartner
              </h3>
            </div>

            <p class="max-w-xl text-slate-600">
              Unsere wichtigsten Partner mit besonderem Engagement für den
              gesamten Verein.
            </p>
          </div>

          <div class="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <SponsorCard
              v-for="sponsor in groupedSponsors.main"
              :key="sponsor.documentId"
              :sponsor="sponsor"
            />
          </div>
        </section>

        <section v-if="groupedSponsors.team.length">
          <div>
            <BaseBadge variant="secondary">
              Mannschaften
            </BaseBadge>

            <h3 class="mt-4 text-3xl font-black text-slate-950">
              Teampartner
            </h3>
          </div>

          <div class="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <SponsorCard
              v-for="sponsor in groupedSponsors.team"
              :key="sponsor.documentId"
              :sponsor="sponsor"
            />
          </div>
        </section>

        <section v-if="groupedSponsors.club.length">
          <div>
            <BaseBadge variant="secondary">
              Gemeinschaft
            </BaseBadge>

            <h3 class="mt-4 text-3xl font-black text-slate-950">
              Vereinspartner
            </h3>
          </div>

          <div
            class="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            <SponsorCard
              v-for="sponsor in groupedSponsors.club"
              :key="sponsor.documentId"
              :sponsor="sponsor"
            />
          </div>
        </section>
      </div>

      <div
        v-else
        class="mt-12 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center"
      >
        <h3 class="text-2xl font-black text-slate-950">
          Noch keine Partner veröffentlicht
        </h3>

        <p class="mt-3 text-slate-600">
          Sobald Sponsoren in Strapi veröffentlicht wurden, erscheinen sie
          hier.
        </p>
      </div>
    </BaseSection>

    <!-- Anfrageformular -->
    <BaseSection
      id="anfrage"
      class="scroll-mt-24 bg-slate-950 text-white"
    >
      <div class="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <aside>
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-400"
          >
            Persönlicher Austausch
          </p>

          <h2 class="mt-4 text-4xl font-black sm:text-5xl">
            Lass uns über eine Partnerschaft sprechen.
          </h2>

          <p class="mt-6 text-lg leading-8 text-slate-300">
            Sende uns eine unverbindliche Anfrage. Wir melden uns mit weiteren
            Informationen und entwickeln gemeinsam ein passendes Modell.
          </p>

          <div class="mt-8 border-t border-white/10 pt-7">
            <p class="text-sm text-slate-400">
              Direkter Kontakt
            </p>

            <a
              href="mailto:sponsoring@rhenania-hochdahl.de"
              class="mt-2 inline-flex font-bold text-blue-300 transition hover:text-white"
            >
              sponsoring@rhenania-hochdahl.de
            </a>
          </div>
        </aside>

        <section
          class="rounded-3xl bg-white p-6 text-slate-950 shadow-2xl sm:p-9"
        >
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Sponsoring-Anfrage
          </p>

          <h3 class="mt-4 text-4xl font-black">
            Interesse anmelden
          </h3>

          <form
            class="mt-9 space-y-6"
            @submit.prevent="submitForm"
          >
            <BaseFormRow>
              <BaseInput
                v-model="form.company"
                label="Unternehmen"
                required
                autocomplete="organization"
              />

              <BaseInput
                v-model="form.contactPerson"
                label="Ansprechpartner"
                required
                autocomplete="name"
              />
            </BaseFormRow>

            <BaseFormRow>
              <BaseInput
                v-model="form.email"
                label="E-Mail-Adresse"
                type="email"
                required
                autocomplete="email"
              />

              <BaseInput
                v-model="form.phone"
                label="Telefonnummer"
                type="tel"
                autocomplete="tel"
                hint="Optional, erleichtert aber die Abstimmung."
              />
            </BaseFormRow>

            <BaseSelect
              v-model="form.package"
              label="Interesse an"
              :options="packageOptions"
              required
            />

            <BaseTextarea
              v-model="form.message"
              label="Nachricht"
              placeholder="Welche Ziele oder Vorstellungen haben Sie?"
              :rows="6"
            />

            <BaseCheckbox
              v-model="form.privacyAccepted"
              required
            >
              Ich stimme der Verarbeitung meiner Angaben gemäß der

              <NuxtLink
                to="/datenschutz"
                class="font-bold text-blue-700 hover:underline"
              >
                Datenschutzerklärung
              </NuxtLink>

              zu.
            </BaseCheckbox>

            <BaseAlert
              v-if="successMessage"
              variant="success"
              role="status"
            >
              {{ successMessage }}
            </BaseAlert>

            <BaseAlert
              v-if="errorMessage"
              variant="error"
              role="alert"
            >
              {{ errorMessage }}
            </BaseAlert>

            <BaseButton
              type="submit"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Wird gesendet …' : 'Anfrage absenden' }}
            </BaseButton>
          </form>
        </section>
      </div>
    </BaseSection>
  </main>
</template>