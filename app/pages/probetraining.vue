<script setup lang="ts">
useSeoMeta({
  title: 'Probetraining | SC Rhenania Hochdahl',
  description:
    'Jetzt ein unverbindliches Probetraining beim SC Rhenania Hochdahl anfragen.',
})

type FormState = {
  firstName: string
  lastName: string
  birthDate: string
  email: string
  phone: string
  team: string
  experience: string
  message: string
  parentName: string
  parentEmail: string
  privacyAccepted: boolean
}

const initialForm = (): FormState => ({
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  phone: '',
  team: '',
  experience: '',
  message: '',
  parentName: '',
  parentEmail: '',
  privacyAccepted: false,
})

const form = reactive<FormState>(initialForm())

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const teamOptions = [
  { label: 'Bambini / F-Jugend', value: 'Bambini / F-Jugend' },
  { label: 'E-Jugend', value: 'E-Jugend' },
  { label: 'D-Jugend', value: 'D-Jugend' },
  { label: 'C-Jugend', value: 'C-Jugend' },
  { label: 'B-Jugend', value: 'B-Jugend' },
  { label: 'A-Jugend', value: 'A-Jugend' },
  { label: 'I. Mannschaft', value: 'I. Mannschaft' },
  { label: 'II. Mannschaft', value: 'II. Mannschaft' },
  { label: 'Alte Herren', value: 'Alte Herren' },
  { label: 'Noch unsicher', value: 'Noch unsicher' },
]

const experienceOptions = [
  {
    label: 'Noch keine Vereinserfahrung',
    value: 'Noch keine Vereinserfahrung',
  },
  {
    label: 'Weniger als 1 Jahr',
    value: 'Weniger als 1 Jahr',
  },
  {
    label: '1–3 Jahre',
    value: '1–3 Jahre',
  },
  {
    label: 'Mehr als 3 Jahre',
    value: 'Mehr als 3 Jahre',
  },
]

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!form.privacyAccepted) {
    errorMessage.value =
      'Bitte bestätige zunächst die Datenschutzerklärung.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch<{ message: string }>(
      '/api/trial-training',
      {
        method: 'POST',
        body: form,
      },
    )

    successMessage.value = response.message
    Object.assign(form, initialForm())
  }
  catch (error) {
    console.error(error)

    errorMessage.value =
      'Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.'
  }
  finally {
    isSubmitting.value = false
  }
}

const isMinor = computed(() => {
  if (!form.birthDate) {
    return false
  }

  const birthDate = new Date(form.birthDate)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  const birthdayHasNotOccurred =
    today.getMonth() < birthDate.getMonth()
    || (
      today.getMonth() === birthDate.getMonth()
      && today.getDate() < birthDate.getDate()
    )

  if (birthdayHasNotOccurred) {
    age--
  }

  return age < 18
})
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Mitmachen"
      title="Dein Probetraining"
      highlight="bei Rhenania."
      description="Sende uns eine unverbindliche Anfrage. Wir melden uns anschließend mit einer passenden Mannschaft und einem möglichen Termin."
      image="/images/teams/youth.jpg"
    />
  
    <BaseSection class="bg-slate-50">
      <div class="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <aside>
          <div
            class="sticky top-28 rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-9"
          >
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-400"
            >
              So funktioniert es
            </p>

            <h2 class="mt-4 text-3xl font-black">
              In drei Schritten zum Training
            </h2>

            <ol class="mt-8 space-y-7">
              <li class="flex gap-4">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black"
                >
                  1
                </div>

                <div>
                  <h3 class="font-black">
                    Anfrage senden
                  </h3>

                  <p class="mt-1 leading-7 text-slate-300">
                    Fülle das Formular mit den wichtigsten Angaben aus.
                  </p>
                </div>
              </li>

              <li class="flex gap-4">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black"
                >
                  2
                </div>

                <div>
                  <h3 class="font-black">
                    Rückmeldung erhalten
                  </h3>

                  <p class="mt-1 leading-7 text-slate-300">
                    Die zuständige Mannschaft meldet sich bei dir.
                  </p>
                </div>
              </li>

              <li class="flex gap-4">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black"
                >
                  3
                </div>

                <div>
                  <h3 class="font-black">
                    Training besuchen
                  </h3>

                  <p class="mt-1 leading-7 text-slate-300">
                    Komm vorbei und lerne Mannschaft und Trainerteam kennen.
                  </p>
                </div>
              </li>
            </ol>

            <div class="mt-9 border-t border-white/10 pt-7">
              <p class="text-sm text-slate-400">
                Noch Fragen?
              </p>

              <a
                href="mailto:info@rhenania-hochdahl.de"
                class="mt-2 inline-flex font-bold text-blue-300 transition hover:text-white"
              >
                info@rhenania-hochdahl.de
              </a>
            </div>
          </div>
        </aside>

        <section
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
        >
          <div>
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
            >
              Anfrage
            </p>

            <h2 class="mt-4 text-4xl font-black text-slate-950">
              Probetraining vereinbaren
            </h2>

            <p class="mt-4 leading-7 text-slate-600">
              Die mit einem Stern gekennzeichneten Felder sind erforderlich.
            </p>
          </div>

          <form
  class="mt-10 space-y-7"
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
      v-model="form.birthDate"
      label="Geburtsdatum"
      type="date"
      required
    />

    <BaseSelect
      v-model="form.team"
      label="Gewünschte Mannschaft"
      :options="teamOptions"
      required
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
      hint="Optional, erleichtert aber die Terminabsprache."
    />
  </BaseFormRow>

  <div
  v-if="isMinor"
  class="space-y-6 rounded-2xl border border-blue-200 bg-blue-50 p-5"
>
  <div>
    <h3 class="font-black text-slate-950">
      Erziehungsberechtigte Person
    </h3>

    <p class="mt-1 text-sm leading-6 text-slate-600">
      Bei minderjährigen Spielerinnen und Spielern benötigen wir die
      Kontaktdaten einer erziehungsberechtigten Person.
    </p>
  </div>

  <BaseFormRow>
    <BaseInput
      v-model="form.parentName"
      label="Name der erziehungsberechtigten Person"
      :required="isMinor"
      autocomplete="name"
    />

    <BaseInput
      v-model="form.parentEmail"
      label="E-Mail der erziehungsberechtigten Person"
      type="email"
      :required="isMinor"
      autocomplete="email"
    />
  </BaseFormRow>
</div>

  <BaseSelect
    v-model="form.experience"
    label="Fußballerfahrung"
    :options="experienceOptions"
    required
  />

  <BaseTextarea
    v-model="form.message"
    label="Nachricht"
    placeholder="Gibt es etwas, das wir vorab wissen sollten?"
    :rows="5"
  />

  <BaseCheckbox
    v-model="form.privacyAccepted"
    required
  >
    Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet
    werden. Weitere Informationen stehen in der

    <NuxtLink
      to="/datenschutz"
      class="font-bold text-blue-700 hover:underline"
    >
      Datenschutzerklärung
    </NuxtLink>.
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
    class="w-full sm:w-auto"
  >
    {{ isSubmitting ? 'Wird gesendet …' : 'Anfrage absenden' }}
  </BaseButton>
</form>
        </section>
      </div>
    </BaseSection>
  </main>
</template>