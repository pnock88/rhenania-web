<script setup lang="ts">
import type {
  OrderCustomer,
  ShopOrder,
} from '~/types/shop'

const emit = defineEmits<{
  back: []
  success: []
}>()

const {
  items,
  subtotal,
  clearCart,
} = useCart()

const createInitialForm = (): OrderCustomer => ({
  firstName: '',
  lastName: '',
  street: '',
  zip: '',
  city: '',
  email: '',
  phone: '',
  note: '',
  privacyAccepted: false,
})

const form = reactive<OrderCustomer>(createInitialForm())

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const submitOrder = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!items.value.length) {
    errorMessage.value = 'Deine Bestellliste ist leer.'
    return
  }

  if (!form.privacyAccepted) {
    errorMessage.value = 'Bitte bestätige die Datenschutzerklärung.'
    return
  }

  const order: ShopOrder = {
    customer: {
      ...form,
    },
    items: items.value.map(item => ({
      ...item,
    })),
    total: subtotal.value,
  }

  isSubmitting.value = true

  try {
    const response = await $fetch<{
      message: string
      orderNumber: string
    }>('/api/shop/order', {
      method: 'POST',
      body: order,
    })

    successMessage.value =
      `${response.message} Bestellnummer: ${response.orderNumber}`

    clearCart()
    Object.assign(form, createInitialForm())

    emit('success')
  }
  catch (error: any) {
    console.error('Fanartikel-Bestellung:', error)

    errorMessage.value =
      error?.data?.statusMessage
      || error?.statusMessage
      || error?.message
      || 'Die Bestellung konnte nicht gesendet werden.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <button
      type="button"
      class="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-700"
      @click="emit('back')"
    >
      <span aria-hidden="true">←</span>
      Zurück zur Bestellliste
    </button>

    <div>
      <p
        class="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700"
      >
        Bestellung
      </p>

      <h2 class="mt-2 text-3xl font-black text-slate-950">
        Deine Kontaktdaten
      </h2>

      <p class="mt-3 leading-7 text-slate-600">
        Nach dem Absenden erhältst du eine Bestätigung. Wir melden uns
        anschließend wegen Abholung und Bezahlung.
      </p>
    </div>

    <form
      class="mt-8 space-y-5"
      @submit.prevent="submitOrder"
    >
      <div class="grid gap-5 sm:grid-cols-2">
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
      </div>

      <BaseInput
        v-model="form.street"
        label="Straße und Hausnummer"
        required
        autocomplete="street-address"
      />

      <div class="grid gap-5 sm:grid-cols-[0.4fr_0.6fr]">
        <BaseInput
          v-model="form.zip"
          label="PLZ"
          required
          inputmode="numeric"
          autocomplete="postal-code"
        />

        <BaseInput
          v-model="form.city"
          label="Ort"
          required
          autocomplete="address-level2"
        />
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
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
          required
          autocomplete="tel"
        />
      </div>

      <BaseTextarea
        v-model="form.note"
        label="Bemerkung"
        placeholder="Zum Beispiel Hinweise zu Größen, Farben oder Abholung"
        :rows="4"
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
        v-if="errorMessage"
        variant="error"
        role="alert"
      >
        {{ errorMessage }}
      </BaseAlert>

      <BaseAlert
        v-if="successMessage"
        variant="success"
        role="status"
      >
        {{ successMessage }}
      </BaseAlert>

      <button
        type="submit"
        class="flex min-h-14 w-full items-center justify-center rounded-xl bg-blue-700 px-6 font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        :disabled="isSubmitting"
      >
        {{
          isSubmitting
            ? 'Bestellung wird gesendet …'
            : 'Bestellung verbindlich absenden'
        }}
      </button>
    </form>
  </div>
</template>