<script setup lang="ts">
useSeoMeta({
  title: 'Mitglied werden | SC Rhenania Hochdahl',
  description:
    'Mitglied beim SC Rhenania Hochdahl werden und Teil unserer Vereinsgemeinschaft sein.',
})

type MembershipForm = {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  membershipType: string
  message: string
  privacyAccepted: boolean
}

const createInitialForm = (): MembershipForm => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  membershipType: '',
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

const membershipOptions = memberships.map(item => ({
  label: item.name,
  value: item.name,
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
      '/api/membership-request',
      {
        method: 'POST',
        body: form,
      },
    )

    successMessage.value = response.message
    Object.assign(form, createInitialForm())
  }
  catch (error: any) {
    console.error('Mitgliedsanfrage:', error)

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
  class="mt-9 space-y-6"
  @submit.prevent="submitForm"
>
  <BaseFormRow>
    <BaseInput
      v-model="form.firstName"
      label="Vorname"
      required
      autocomplete="given-name"
    />

    <BaseInput
      v-model="form.lastName"
      label="Nachname"
      required
      autocomplete="family-name"
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
      hint="Optional, erleichtert aber die Rückmeldung."
    />
  </BaseFormRow>

  <BaseFormRow>
    <BaseInput
      v-model="form.birthDate"
      label="Geburtsdatum"
      type="date"
      required
    />

    <BaseSelect
      v-model="form.membershipType"
      label="Mitgliedschaft"
      :options="membershipOptions"
      required
    />
  </BaseFormRow>

  <BaseTextarea
    v-model="form.message"
    label="Nachricht"
    placeholder="Gibt es Fragen oder Hinweise zu deiner Mitgliedschaft?"
    :rows="5"
  />

  <BaseCheckbox
    v-model="form.privacyAccepted"
    required
  >
    Ich stimme der Verarbeitung meiner Daten gemäß der

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
  >
    {{ successMessage }}
  </BaseAlert>

  <BaseAlert
    v-if="errorMessage"
    variant="error"
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