<script setup lang="ts">
useSeoMeta({
  title: 'Mitglied werden | SC Rhenania Hochdahl',
  description:
    'Mitglied beim SC Rhenania Hochdahl werden und Teil unserer Vereinsgemeinschaft sein.',
})

type RegistrationType = 'initial' | 'transfer'
type Gender = 'male' | 'female' | 'diverse'

type MembershipForm = {
  registrationType: RegistrationType
  previousClub: string

  playerLastName: string
  playerFirstName: string
  gender: Gender | ''
  playerStreet: string
  playerZip: string
  playerCity: string
  birthDate: string
  birthPlace: string
  nationality: string

  guardianLastName: string
  guardianFirstName: string
  guardianStreet: string
  guardianZip: string
  guardianCity: string
  guardianEmail: string
  guardianPhone: string

  accountHolder: string
  iban: string
  bankName: string

  team: string
  message: string
  privacyAccepted: boolean
}

const createInitialForm = (): MembershipForm => ({
  registrationType: 'initial',
  previousClub: '',

  playerLastName: '',
  playerFirstName: '',
  gender: '',
  playerStreet: '',
  playerZip: '',
  playerCity: '',
  birthDate: '',
  birthPlace: '',
  nationality: '',

  guardianLastName: '',
  guardianFirstName: '',
  guardianStreet: '',
  guardianZip: '',
  guardianCity: '',
  guardianEmail: '',
  guardianPhone: '',

  accountHolder: '',
  iban: '',
  bankName: '',

  team: '',
  message: '',
  privacyAccepted: false,
})

const form = reactive<MembershipForm>(createInitialForm())

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const benefits = [
  {
    title: 'Teil einer Gemeinschaft',
    description:
      'Erlebe Fußball, Vereinsleben und Zusammenhalt gemeinsam mit Menschen aus Hochdahl.',
  },
  {
    title: 'Sportliche Angebote',
    description:
      'Nutze unsere Trainingsangebote und finde die passende Mannschaft für dein Alter.',
  },
  {
    title: 'Verein mitgestalten',
    description:
      'Bringe deine Ideen ein und unterstütze Veranstaltungen, Mannschaften oder Projekte.',
  },
]

const memberships = [
  {
    name: 'Kinder und Jugendliche',
    price: 'Beitrag folgt',
    description: 'Für aktive Mitglieder bis einschließlich 18 Jahre.',
  },
  {
    name: 'Erwachsene',
    price: 'Beitrag folgt',
    description: 'Für aktive Spielerinnen, Spieler und Vereinsmitglieder.',
  },
  {
    name: 'Passive Mitgliedschaft',
    price: 'Beitrag folgt',
    description: 'Für Förderer und Unterstützer des Vereins.',
  },
  {
    name: 'Familienmitgliedschaft',
    price: 'Beitrag folgt',
    description: 'Für mehrere Mitglieder eines gemeinsamen Haushalts.',
  },
]

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (
    form.registrationType === 'transfer'
    && !form.previousClub.trim()
  ) {
    errorMessage.value =
      'Bitte gib bei einem Vereinswechsel den bisherigen Verein an.'
    return
  }

  if (!form.privacyAccepted) {
    errorMessage.value =
      'Bitte bestätige die Datenschutzerklärung.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch<{
      message: string
      requestNumber: string
    }>(
      '/api/membership-request',
      {
        method: 'POST',
        body: {
          ...form,
          iban: form.iban.replace(/\s/g, '').toUpperCase(),
        },
      },
    )

    successMessage.value =`${response.message} Anmeldenummer: ${response.requestNumber}`
    Object.assign(form, createInitialForm())
  }
  catch (error: any) {
    console.error('Mitgliedsanmeldung fehlgeschlagen.')

    errorMessage.value =
      error?.data?.statusMessage
      || error?.statusMessage
      || error?.message
      || 'Die Anmeldung konnte nicht gesendet werden.'
  }
  finally {
    isSubmitting.value = false
  }
}

const teamOptions = [
  { label: 'Bitte Mannschaft auswählen', value: '' },
  { label: 'I. Mannschaft', value: 'erste' },
  { label: 'II. Mannschaft', value: 'zweite' },
  { label: 'A-Junioren', value: 'a-junioren' },
  { label: 'B1-Junioren', value: 'b1-junioren' },
  { label: 'B2-Junioren', value: 'b2-junioren' },
  { label: 'C1-Junioren', value: 'c1-junioren' },
  { label: 'C2-Junioren', value: 'c2-junioren' },
  { label: 'D1-Junioren', value: 'd1-junioren' },
  { label: 'D2-Junioren', value: 'd2-junioren' },
  { label: 'E1-Junioren', value: 'e1-junioren' },
  { label: 'E2-Junioren', value: 'e2-junioren' },
  { label: 'F1-Junioren', value: 'f1-junioren' },
  { label: 'F2-Junioren', value: 'f2-junioren' },
  { label: 'G-Junioren', value: 'g-junioren' },
  { label: 'U11-Juniorinnen', value: 'u11-juniorinnen' },
  { label: 'U13-Juniorinnen', value: 'u13-juniorinnen' },
  { label: 'U15-Juniorinnen', value: 'u15-juniorinnen' },
]

const normalizedIban = computed({
  get: () => form.iban,
  set: (value: string) => {
    form.iban = value
      .replace(/\s/g, '')
      .toUpperCase()
      .slice(0, 34)
  },
})
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Teil der Rhenania werden"
      title="Gemeinsam mehr"
      highlight="als Fußball."
      description="Werde Mitglied beim SC Rhenania Hochdahl und gestalte unsere sportliche Gemeinschaft aktiv mit."
      image="/images/home/hero-team.jpg"
    />
    
    <BaseSection class="bg-white">
      <div class="mx-auto max-w-3xl text-center">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Deine Vorteile
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Ein Verein. Viele Möglichkeiten.
        </h2>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="rounded-3xl border border-slate-200 bg-slate-50 p-7"
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

    <BaseSection class="bg-slate-50">
      <div class="mb-10">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Mitgliedsmodelle
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Die passende Mitgliedschaft
        </h2>

        <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Die offiziellen Beiträge tragen wir später anhand der aktuellen
          Beitragsordnung ein.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="membership in memberships"
          :key="membership.name"
          class="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
        >
          <h3 class="text-xl font-black text-slate-950">
            {{ membership.name }}
          </h3>

          <p class="mt-4 text-2xl font-black text-blue-700">
            {{ membership.price }}
          </p>

          <p class="mt-4 flex-1 leading-7 text-slate-600">
            {{ membership.description }}
          </p>
        </article>
      </div>
    </BaseSection>

    <BaseSection class="bg-white">
      <div class="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <aside>
          <div class="sticky top-28 rounded-3xl bg-slate-950 p-8 text-white">
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-400"
            >
              So geht es weiter
            </p>

            <h2 class="mt-4 text-3xl font-black">
              Mitgliedschaft anfragen
            </h2>

            <ol class="mt-8 space-y-6">
              <li class="flex gap-4">
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black"
                >
                  1
                </span>

                <div>
                  <h3 class="font-black">
                    Formular ausfüllen
                  </h3>

                  <p class="mt-1 leading-7 text-slate-300">
                    Sende uns deine Kontaktdaten und die gewünschte
                    Mitgliedschaft.
                  </p>
                </div>
              </li>

              <li class="flex gap-4">
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black"
                >
                  2
                </span>

                <div>
                  <h3 class="font-black">
                    Rückmeldung erhalten
                  </h3>

                  <p class="mt-1 leading-7 text-slate-300">
                    Wir melden uns mit allen erforderlichen Unterlagen.
                  </p>
                </div>
              </li>

              <li class="flex gap-4">
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black"
                >
                  3
                </span>

                <div>
                  <h3 class="font-black">
                    Teil des Vereins werden
                  </h3>

                  <p class="mt-1 leading-7 text-slate-300">
                    Nach Abschluss der Anmeldung bist du offiziell dabei.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </aside>

        <section
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
        >
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Unverbindliche Anfrage
          </p>

          <h2 class="mt-4 text-4xl font-black text-slate-950">
            Mitglied werden
          </h2>

          <form
            class="mt-9 space-y-10"
            @submit.prevent="submitForm"
          >
            <!-- Art der Anmeldung -->
            <fieldset>
              <legend class="text-xl font-black text-slate-950">
                Art der Anmeldung
              </legend>

              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <label
                  class="flex cursor-pointer items-center gap-3 rounded-2xl border p-5 transition"
                  :class="
                    form.registrationType === 'initial'
                      ? 'border-blue-700 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  "
                >
                  <input
                    v-model="form.registrationType"
                    type="radio"
                    value="initial"
                    class="h-5 w-5 accent-blue-700"
                  >

                  <span class="font-bold text-slate-950">
                    Erstanmeldung
                  </span>
                </label>

                <label
                  class="flex cursor-pointer items-center gap-3 rounded-2xl border p-5 transition"
                  :class="
                    form.registrationType === 'transfer'
                      ? 'border-blue-700 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  "
                >
                  <input
                    v-model="form.registrationType"
                    type="radio"
                    value="transfer"
                    class="h-5 w-5 accent-blue-700"
                  >

                  <span class="font-bold text-slate-950">
                    Vereinswechsel
                  </span>
                </label>
              </div>

              <div
                v-if="form.registrationType === 'transfer'"
                class="mt-5"
              >
                <BaseInput
                  v-model="form.previousClub"
                  label="Bisheriger Verein"
                  required
                  autocomplete="organization"
                />
              </div>
            </fieldset>

            <!-- Spielerdaten -->
            <fieldset class="border-t border-slate-200 pt-9">
              <legend class="text-2xl font-black text-slate-950">
                Daten des Mitglieds
              </legend>

              <p class="mt-2 text-sm leading-6 text-slate-500">
                Bitte trage die persönlichen Angaben des anzumeldenden Mitglieds ein.
              </p>

              <div class="mt-6 space-y-6">
                <BaseFormRow>
                  <BaseInput
                    v-model="form.playerFirstName"
                    label="Vorname"
                    required
                    autocomplete="given-name"
                  />

                  <BaseInput
                    v-model="form.playerLastName"
                    label="Nachname"
                    required
                    autocomplete="family-name"
                  />
                </BaseFormRow>

                <div>
                  <p class="text-sm font-bold text-slate-700">
                    Geschlecht *
                  </p>

                  <div class="mt-3 flex flex-wrap gap-4">
                    <label
                      v-for="option in [
                        { value: 'male', label: 'Männlich' },
                        { value: 'female', label: 'Weiblich' },
                        { value: 'diverse', label: 'Divers' },
                      ]"
                      :key="option.value"
                      class="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-3"
                    >
                      <input
                        v-model="form.gender"
                        type="radio"
                        name="gender"
                        :value="option.value"
                        required
                        class="h-4 w-4 accent-blue-700"
                      >

                      <span class="font-semibold text-slate-700">
                        {{ option.label }}
                      </span>
                    </label>
                  </div>
                </div>

                <BaseInput
                  v-model="form.playerStreet"
                  label="Straße und Hausnummer"
                  required
                  autocomplete="street-address"
                />

                <BaseFormRow>
                  <BaseInput
                    v-model="form.playerZip"
                    label="PLZ"
                    required
                    inputmode="numeric"
                    autocomplete="postal-code"
                  />

                  <BaseInput
                    v-model="form.playerCity"
                    label="Ort"
                    required
                    autocomplete="address-level2"
                  />
                </BaseFormRow>

                <BaseFormRow>
                  <BaseInput
                    v-model="form.birthDate"
                    label="Geburtsdatum"
                    type="date"
                    required
                    autocomplete="bday"
                  />

                  <BaseInput
                    v-model="form.birthPlace"
                    label="Geburtsort"
                    required
                  />
                </BaseFormRow>

                <BaseInput
                  v-model="form.nationality"
                  label="Nationalität"
                  required
                  autocomplete="country-name"
                />
              </div>
            </fieldset>

            <!-- Erziehungsberechtigte -->
            <fieldset class="border-t border-slate-200 pt-9">
              <legend class="text-2xl font-black text-slate-950">
                Daten der erziehungsberechtigten Person
              </legend>

              <p class="mt-2 text-sm leading-6 text-slate-500">
                Bei volljährigen Mitgliedern können hier die eigenen Kontaktdaten
                eingetragen werden.
              </p>

              <div class="mt-6 space-y-6">
                <BaseFormRow>
                  <BaseInput
                    v-model="form.guardianFirstName"
                    label="Vorname"
                    required
                    autocomplete="given-name"
                  />

                  <BaseInput
                    v-model="form.guardianLastName"
                    label="Nachname"
                    required
                    autocomplete="family-name"
                  />
                </BaseFormRow>

                <BaseInput
                  v-model="form.guardianStreet"
                  label="Straße und Hausnummer"
                  required
                  autocomplete="street-address"
                />

                <BaseFormRow>
                  <BaseInput
                    v-model="form.guardianZip"
                    label="PLZ"
                    required
                    inputmode="numeric"
                    autocomplete="postal-code"
                  />

                  <BaseInput
                    v-model="form.guardianCity"
                    label="Ort"
                    required
                    autocomplete="address-level2"
                  />
                </BaseFormRow>

                <BaseFormRow>
                  <BaseInput
                    v-model="form.guardianEmail"
                    label="E-Mail-Adresse"
                    type="email"
                    required
                    autocomplete="email"
                  />

                  <BaseInput
                    v-model="form.guardianPhone"
                    label="Telefonnummer"
                    type="tel"
                    required
                    autocomplete="tel"
                  />
                </BaseFormRow>
              </div>
            </fieldset>

            <!-- Kontodaten -->
            <fieldset class="border-t border-slate-200 pt-9">
              <legend class="text-2xl font-black text-slate-950">
                Kontodaten
              </legend>

              <p class="mt-2 text-sm leading-6 text-slate-500">
                Die Kontodaten werden für den Einzug der Mitgliedsbeiträge benötigt.
              </p>

              <div class="mt-6 space-y-6">
                <BaseInput
                  v-model="form.accountHolder"
                  label="Kontoinhaber"
                  required
                  autocomplete="name"
                />

                <BaseInput
                  v-model="normalizedIban"
                  label="IBAN"
                  required
                  autocomplete="off"
                  placeholder="DE00 0000 0000 0000 0000 00"
                />

                <BaseInput
                  v-model="form.bankName"
                  label="Kreditinstitut"
                  required
                  autocomplete="organization"
                />
              </div>
            </fieldset>

            <!-- Mannschaft -->
            <fieldset class="border-t border-slate-200 pt-9">
              <legend class="text-2xl font-black text-slate-950">
                Sportliche Zuordnung
              </legend>

              <div class="mt-6 space-y-6">
                <BaseSelect
                  v-model="form.team"
                  label="Mannschaft"
                  :options="teamOptions"
                  required
                />

                <BaseTextarea
                  v-model="form.message"
                  label="Bemerkung"
                  placeholder="Weitere Angaben oder Hinweise zur Anmeldung"
                  :rows="4"
                />
              </div>
            </fieldset>

            <!-- Datenschutz -->
            <div class="border-t border-slate-200 pt-9">
              <BaseCheckbox
                v-model="form.privacyAccepted"
                required
              >
                Ich stimme der Speicherung und Verarbeitung meiner Daten zum Zweck
                der Vereinsanmeldung gemäß der

                <NuxtLink
                  to="/datenschutz"
                  class="font-bold text-blue-700 hover:underline"
                >
                  Datenschutzerklärung
                </NuxtLink>

                zu.
              </BaseCheckbox>
            </div>

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
              {{
                isSubmitting
                  ? 'Anmeldung wird übermittelt …'
                  : 'Mitgliedsanmeldung absenden'
              }}
            </BaseButton>
          </form>
        </section>
      </div>
    </BaseSection>
  </main>
</template>