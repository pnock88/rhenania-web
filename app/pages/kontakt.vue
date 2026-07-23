<script setup lang="ts">
useSeoMeta({
  title: 'Kontakt | SC Rhenania Hochdahl',
  description:
    'Kontakt, Ansprechpartner und Vereinsadresse des SC Rhenania Hochdahl 1925 e.V.',
})

type ContactForm = {
  name: string
  email: string
  subject: string
  message: string
  privacyAccepted: boolean
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

const contacts = [
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
      body: form,
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
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Wir sind für dich da"
      title="Kontakt"
      description="Du hast Fragen zu unseren Mannschaften, einer Mitgliedschaft oder zum Vereinsleben? Schreibe uns eine Nachricht."
      image="/images/home/hero-team.jpg"
    />

    <BaseSection class="bg-slate-50">
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <aside class="space-y-6">
          <section
            class="rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-9"
          >
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-400"
            >
              Vereinsadresse
            </p>

            <h2 class="mt-4 text-3xl font-black">
              Sportplatz Grünstrasse
            </h2>

            <address class="mt-6 not-italic leading-8 text-slate-300">
              <p class="font-bold text-white">
                SC Rhenania Hochdahl 1925 e.V.
              </p>

              <p class="mt-2">
                Grünstrasse 17<br>
                40699 Erkrath
              </p>
            </address>

            <div class="mt-7 space-y-3">
              Mail: <a
                href="mailto:info@rhenania-hochdahl.de"
                class="block font-bold text-blue-300 transition hover:text-white"
              >
                info@rhenania-hochdahl.de
              </a>

              Tel: <a
                href="tel:+49210446823"
                class="block font-bold text-blue-300 transition hover:text-white"
              >
                02104 - 46823
              </a>
            </div>
          </section>

          <section
            class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <iframe
              title="SC Rhenania Hochdahl"
              class="h-[420px] w-full"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=6.949715%2C51.204278%2C6.953715%2C51.208278&layer=mapnik&marker=51.206278%2C6.951715"
              style="border:0"
            />

            <div
              class="relative z-10 border-t border-slate-200 bg-slate-50 p-6"
            >
              <div>
                <h3 class="text-lg font-black text-slate-950">
                  Sportplatz Grünstraße
                </h3>

                <p class="mt-1 text-slate-600">
                  Grünstraße 17 · 40699 Erkrath
                </p>
              </div>

              <div class="mt-5 flex flex-wrap gap-3">
                <BaseButton
                  to="https://www.openstreetmap.org/?mlat=51.206278&mlon=6.951715#map=17/51.206278/6.951715"
                  external
                  variant="outline"
                  class="!border-slate-300 !bg-white !text-slate-950 hover:!border-blue-700 hover:!bg-blue-50 hover:!text-blue-700"
                >
                  OpenStreetMap
                </BaseButton>

                <BaseButton
                  to="https://www.google.com/maps/dir/?api=1&destination=Grünstraße+17,+40699+Erkrath"
                  external
                >
                  Route planen
                </BaseButton>
              </div>
            </div>
          </section>
        </aside>

        <section
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
        >
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Nachricht senden
          </p>

          <h2 class="mt-4 text-4xl font-black text-slate-950">
            Wie können wir helfen?
          </h2>

          <form
  class="mt-9 space-y-6"
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
    :rows="7"
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
    {{ isSubmitting ? 'Wird gesendet …' : 'Nachricht absenden' }}
  </BaseButton>
</form>
        </section>
      </div>
    </BaseSection>

    <BaseSection class="bg-white">
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