<script setup lang="ts">
useSeoMeta({
  title: 'Kontakt | SC Rhenania Hochdahl',
  description:
    'Kontakt, Ansprechpartner und Vereinsadressen des SC Rhenania Hochdahl 1925 e.V.',
})

type ContactForm = {
  name: string
  email: string
  subject: string
  message: string
  privacyAccepted: boolean
}

type ContactPerson = {
  name: string
  role: string
  email: string
  image: string
}

type Location = {
  id: string
  name: string
  street: string
  zip: string
  city: string
  latitude: number
  longitude: number
  mapBbox: string
}

const createInitialForm = (): ContactForm => ({
  name: '',
  email: '',
  subject: '',
  message: '',
  privacyAccepted: false,
})

const form = reactive<ContactForm>(createInitialForm())

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const contacts: ContactPerson[] = [
  {
    name: 'Max Mustermann',
    role: '1. Vorsitzender',
    email: 'vorsitz@rhenania-hochdahl.de',
    image: '/images/club/board-1.jpg',
  },
  {
    name: 'Erika Musterfrau',
    role: 'Jugendleitung',
    email: 'jugend@rhenania-hochdahl.de',
    image: '/images/club/board-2.jpg',
  },
  {
    name: 'Peter Beispiel',
    role: 'Geschäftsstelle',
    email: 'info@rhenania-hochdahl.de',
    image: '/images/club/board-3.jpg',
  },
]

const locations: Location[] = [
  {
    id: 'gruenstrasse',
    name: 'Sportplatz Grünstraße',
    street: 'Grünstraße 17',
    zip: '40699',
    city: 'Erkrath',
    latitude: 51.206278,
    longitude: 6.951715,
    mapBbox: '6.949715,51.204278,6.953715,51.208278',
  },
  {
    id: 'kemperdick',
    name: 'Sportplatz Kemperdick',
    street: 'Max-Planck-Straße 101',
    zip: '40699',
    city: 'Erkrath',
    latitude: 51.200639,
    longitude: 6.944023,
    mapBbox: '6.941023,51.197639,6.947023,51.203639',
  },
]

const subjectOptions = [
  {
    label: 'Allgemeine Anfrage',
    value: 'Allgemeine Anfrage',
  },
  {
    label: 'Mitgliedschaft',
    value: 'Mitgliedschaft',
  },
  {
    label: 'Jugend',
    value: 'Jugend',
  },
  {
    label: 'Sponsoring',
    value: 'Sponsoring',
  },
  {
    label: 'Spielbetrieb',
    value: 'Spielbetrieb',
  },
]

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!form.privacyAccepted) {
    errorMessage.value = 'Bitte bestätige die Datenschutzerklärung.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch<{ message: string }>('/api/contact', {
      method: 'POST',
      body: {
        ...form,
      },
    })

    successMessage.value = response.message
    Object.assign(form, createInitialForm())
  }
  catch (error: any) {
    console.error('Kontaktformular:', error)

    errorMessage.value =
      error?.data?.statusMessage
      || error?.statusMessage
      || error?.message
      || 'Die Nachricht konnte nicht gesendet werden.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Wir sind für dich da"
      title="Kontakt"
      description="Du hast Fragen zu unseren Mannschaften, einer Mitgliedschaft oder zum Vereinsleben? Schreibe uns eine Nachricht."
      image="/images/herobanner/kontakt2.png"
      image-alt="Sportanlage des SC Rhenania Hochdahl"
      :breadcrumbs="[
        {
          label: 'Kontakt',
        },
      ]"
      :anchors="[
        {
          label: 'Kontaktformular',
          href: '#formular',
        },
        {
          label: 'Sportanlagen',
          href: '#sportanlagen',
        },
        {
          label: 'Ansprechpartner',
          href: '#ansprechpartner',
        },
      ]"
    />

    <!-- Kontakt und Formular -->
    <BaseSection class="scroll-mt-12 bg-slate-50" id="formular">
      <div class="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <!-- Vereinsdaten -->
        <aside
          class="rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-8"
        >
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-400"
          >
            Vereinsadresse
          </p>

          <h2 class="mt-4 text-3xl font-black">
            Sportplatz Grünstraße
          </h2>

          <address class="mt-5 not-italic leading-7 text-slate-300">
            <p class="font-bold text-white">
              SC Rhenania Hochdahl 1925 e.V.
            </p>

            <p class="mt-2">
              Grünstraße 17<br>
              40699 Erkrath
            </p>
          </address>

          <dl class="mt-6 space-y-4">
            <div>
              <dt class="text-xs font-bold uppercase tracking-wide text-slate-400">
                E-Mail
              </dt>

              <dd class="mt-1">
                <a
                  href="mailto:info@rhenania-hochdahl.de"
                  class="font-bold text-blue-300 transition hover:text-white"
                >
                  info@rhenania-hochdahl.de
                </a>
              </dd>
            </div>

            <div>
              <dt class="text-xs font-bold uppercase tracking-wide text-slate-400">
                Telefon
              </dt>

              <dd class="mt-1">
                <a
                  href="tel:+49210446823"
                  class="font-bold text-blue-300 transition hover:text-white"
                >
                  02104 46823
                </a>
              </dd>
            </div>
          </dl>
        </aside>

        <!-- Formular -->
        <section
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Nachricht senden
          </p>

          <h2 class="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
            Wie können wir helfen?
          </h2>

          <p class="mt-3 leading-6 text-slate-600">
            Schreibe uns einfach eine Nachricht – wir melden uns
            schnellstmöglich bei dir.
          </p>

          <form
            class="mt-7 space-y-5"
            @submit.prevent="submitForm"
          >
            <BaseFormRow>
              <BaseInput
                v-model="form.name"
                label="Name"
                required
                autocomplete="name"
              />

              <BaseInput
                v-model="form.email"
                label="E-Mail-Adresse"
                type="email"
                required
                autocomplete="email"
              />
            </BaseFormRow>

            <BaseSelect
              v-model="form.subject"
              label="Betreff"
              :options="subjectOptions"
              required
            />

            <BaseTextarea
              v-model="form.message"
              label="Nachricht"
              placeholder="Wie können wir dir helfen?"
              :rows="5"
              required
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
              {{
                isSubmitting
                  ? 'Wird gesendet …'
                  : 'Nachricht absenden'
              }}
            </BaseButton>
          </form>
        </section>
      </div>
    </BaseSection>

    <!-- Sportanlagen -->
    <BaseSection class="scroll-mt-12 bg-white" id="sportanlagen">
      <div class="mb-10">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Unsere Sportanlagen
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          So findest du uns
        </h2>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <LocationCard
          v-for="location in locations"
          :key="location.id"
          :location="location"
        />
      </div>
    </BaseSection>

    <!-- Ansprechpartner -->
    <BaseSection class="scroll-mt-12 bg-slate-50" id="ansprechpartner">
      <div class="mb-10">
        <p
          class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
        >
          Direkter Kontakt
        </p>

        <h2
          class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
        >
          Unsere Ansprechpartner
        </h2>
      </div>

      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ContactPersonCard
          v-for="contact in contacts"
          :key="contact.email"
          v-bind="contact"
        />
      </div>
    </BaseSection>
  </main>
</template>