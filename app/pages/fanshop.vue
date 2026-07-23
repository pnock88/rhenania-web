<script setup lang="ts">
import type { FanArticle } from '~/types/shop'

useSeoMeta({
  title: 'Fanartikel | SC Rhenania Hochdahl',
  description:
    'Fanartikel des SC Rhenania Hochdahl – Kleidung, Accessoires und Geschenkideen für echte Rhenanen.',
})

const {
  articles: fanArticles,
  status,
  error,
  refresh,
} = useFanArticles()

const selectedArticle =
  ref<FanArticle | null>(null)

const isProductModalOpen = ref(false)

const openProductModal = (
  article: FanArticle,
) => {
  selectedArticle.value = article
  isProductModalOpen.value = true
}

const closeProductModal = () => {
  isProductModalOpen.value = false
}

const orderEmail =
  'bestellung@rhenania-hochdahl.de'

const previewImage = ref('')
const previewOpen = ref(false)

const openPreview = (image: string) => {
  previewImage.value = image
  previewOpen.value = true
}
</script>

<template>
  <main>
    <BasePageHero
      eyebrow="Blau und Weiß"
      title="Fanartikel für"
      highlight="echte Rhenanen."
      description="Zeige deine Verbundenheit zum SC Rhenania Hochdahl – auf dem Sportplatz, unterwegs und zu Hause."
      image="/images/herobanner/fanshop.jpg"
      :breadcrumbs="[
        {
          label: 'Fanshop',
        },
      ]"
      :anchors="[
        {
          label: 'Fanartikel',
          href: '#sortiment',
        },
      ]"
    >
      <template #actions>
        <BaseButton to="#sortiment">
          Sortiment entdecken
        </BaseButton>

        <BaseButton
          :to="`mailto:${orderEmail}`"
          external
          variant="outline"
        >
          Bestellung anfragen
        </BaseButton>
      </template>
    </BasePageHero>

    <!-- Bestellinformationen -->
    <BaseSection class="bg-white">
      <div
        class="grid overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm lg:grid-cols-[1fr_auto]"
      >
        <div class="p-7 sm:p-10">
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            So funktioniert die Bestellung
          </p>

          <h2
            class="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
          >
            Bestellen, absprechen und am Vereinsheim abholen
          </h2>

          <p
            class="mt-5 max-w-3xl text-lg leading-8 text-slate-600"
          >
            Lege deine gewünschten Fanartikel einfach in die
            Bestellliste und sende deine Anfrage bequem über
            das integrierte Formular ab. Wir melden uns
            anschließend zeitnah bei dir, um Abholung und
            Bezahlung am Vereinsheim an der Grünstraße mit
            dir abzustimmen.
          </p>

          <p
            class="mt-4 max-w-3xl leading-7 text-slate-600"
          >
            Viele Fanartikel sind auch in weiteren Größen
            oder Farben erhältlich. Sollte deine
            Wunschvariante nicht auswählbar sein, kannst du
            sie uns einfach im Bemerkungsfeld der Anfrage
            mitteilen.
          </p>
        </div>

        <div
          class="flex flex-col justify-center border-t border-slate-200 bg-white p-7 lg:min-w-80 lg:border-l lg:border-t-0"
        >
          <p class="text-sm font-bold text-slate-500">
            Ihr habt Fragen?
            <br>
            <br>
            Dann kontaktiert uns per Mail
          </p>

          <a
            :href="`mailto:${orderEmail}?subject=${encodeURIComponent('Fanartikel-Anfrage')}`"
            class="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-900 px-6 text-sm font-black text-white transition hover:bg-blue-800"
          >
            Anfrage senden
          </a>
        </div>
      </div>
    </BaseSection>

    <!-- Sortiment -->
    <BaseSection
      id="sortiment"
      class="scroll-mt-12 bg-slate-50"
    >
      <div
        class="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p
            class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700"
          >
            Unser Sortiment
          </p>

          <h2
            class="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl"
          >
            Fanartikel
          </h2>

          <p
            class="mt-5 max-w-2xl text-lg leading-8 text-slate-600"
          >
            Kleidung, Accessoires und kleine Geschenkideen
            in den Farben unseres Vereins.
          </p>
        </div>

        <BaseBadge variant="secondary">
          {{ fanArticles.length }}
          {{ fanArticles.length === 1 ? 'Artikel' : 'Artikel' }}
        </BaseBadge>
      </div>

      <!-- Ladezustand -->
      <div
        v-if="status === 'pending'"
        class="rounded-3xl border border-slate-200 bg-white py-24 text-center shadow-sm"
      >
        <div
          class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-900"
        />

        <p class="mt-4 font-bold text-slate-600">
          Fanartikel werden geladen …
        </p>
      </div>

      <!-- Fehlerzustand -->
      <div
        v-else-if="error"
        class="rounded-3xl border border-red-200 bg-red-50 p-8"
      >
        <p class="text-lg font-black text-red-900">
          Die Fanartikel konnten nicht geladen werden.
        </p>

        <p class="mt-2 text-sm leading-6 text-red-700">
          Bitte versuche es erneut oder kontaktiere uns
          direkt per E-Mail.
        </p>

        <button
          type="button"
          class="mt-5 rounded-xl bg-red-800 px-5 py-3 font-black text-white transition hover:bg-red-700"
          @click="refresh()"
        >
          Erneut versuchen
        </button>
      </div>

      <!-- Vorhandenes 4er-Grid -->
      <div
        v-else-if="fanArticles.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <FanArticleCard
          v-for="article in fanArticles"
          :key="article.id"
          :article="article"
          @select="openProductModal"
          @preview="openPreview"
        />
      </div>

      <!-- Leerer Zustand -->
      <div
        v-else
        class="rounded-3xl border border-slate-200 bg-white py-20 text-center shadow-sm"
      >
        <p class="text-lg font-black text-slate-900">
          Derzeit sind keine Fanartikel verfügbar.
        </p>

        <p class="mt-2 text-sm text-slate-600">
          Schau später noch einmal vorbei oder sende uns
          eine individuelle Anfrage.
        </p>
      </div>
    </BaseSection>

    <!-- Abschluss -->
    <section
      class="bg-slate-950 py-16 text-white md:py-20"
    >
      <BaseContainer>
        <div
          class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="max-w-3xl">
            <p
              class="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-300"
            >
              Dein Wunsch ist nicht dabei?
            </p>

            <h2
              class="mt-4 text-4xl font-black sm:text-5xl"
            >
              Sprich uns einfach an.
            </h2>

            <p
              class="mt-5 text-lg leading-8 text-slate-300"
            >
              Viele Produkte können auch in weiteren
              Größen, Farben oder Ausführungen bestellt
              werden.
            </p>
          </div>

          <a
            :href="`mailto:${orderEmail}?subject=${encodeURIComponent('Individuelle Fanartikel-Anfrage')}`"
            class="inline-flex min-h-14 shrink-0 items-center justify-center rounded-xl bg-blue-700 px-7 font-black text-white transition hover:bg-blue-600"
          >
            Individuelle Anfrage
          </a>
        </div>
      </BaseContainer>
    </section>

    <ProductSelectionModal
      :article="selectedArticle"
      :open="isProductModalOpen"
      @close="closeProductModal"
    />

    <BaseImageLightbox
      :open="previewOpen"
      :src="previewImage"
      @close="previewOpen = false"
    />

    <!-- Bestehender rechter Bestelllisten-Drawer -->
    <CartButton />
    <CartDrawer />
  </main>
</template>