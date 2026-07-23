<script setup lang="ts">
useSeoMeta({
  title: 'Fanartikel | SC Rhenania Hochdahl',
  description:
    'Fanartikel des SC Rhenania Hochdahl – Kleidung, Accessoires und Geschenkideen für echte Rhenanen.',
})

import type { FanArticle } from '~/types/shop'
import { fanArticles } from '~/data/fanArticles'

const selectedArticle = ref<FanArticle | null>(null)
const isProductModalOpen = ref(false)

const openProductModal = (article: FanArticle) => {
  selectedArticle.value = article
  isProductModalOpen.value = true
}

const closeProductModal = () => {
  isProductModalOpen.value = false
}

const orderEmail = 'bestellung@rhenania-hochdahl.de'

const createMailLink = (article: FanArticle) => {
  const subject = encodeURIComponent(
    `Fanartikel-Bestellung: ${article.name}`,
  )

  const body = encodeURIComponent(
    [
      'Hallo SC Rhenania Hochdahl,',
      '',
      `ich interessiere mich für folgenden Fanartikel:`,
      '',
      `Artikel: ${article.name}`,
      `Preis: ${article.price}`,
      article.sizes ? `Größe: ` : '',
      'Anzahl: 1',
      '',
      'Name:',
      'Telefon:',
      '',
      'Viele Grüße',
    ]
      .filter(line => line !== '')
      .join('\n'),
  )

  return `mailto:${orderEmail}?subject=${subject}&body=${body}`
}

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

          <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Lege deine gewünschten Fanartikel einfach in die Bestellliste und sende deine Anfrage bequem über das integrierte Formular ab. 
            Wir melden uns anschließend zeitnah bei dir, um Abholung und Bezahlung am Vereinsheim an der Grünstraße mit dir abzustimmen.
          </p>

          <p class="mt-4 max-w-3xl leading-7 text-slate-600">
            Viele Fanartikel sind auch in weiteren Größen oder Farben erhältlich. Sollte deine Wunschvariante nicht auswählbar sein, 
            kannst du sie uns einfach im Bemerkungsfeld der Anfrage mitteilen.
          </p>
        </div>

        <div
          class="flex flex-col justify-center border-t border-slate-200 bg-white p-7 lg:min-w-80 lg:border-l lg:border-t-0"
        >
          <p class="text-sm font-bold text-slate-500">
            Ihr habt fragen?<br/><br/>
            Dann kontaktiert uns per Mail
          </p>

          <!--<a
            :href="`mailto:${orderEmail}`"
            class="mt-2 break-all text-lg font-black text-blue-900 transition hover:text-blue-500"
          >
            {{ orderEmail }}
          </a>-->

          <a
            :href="`mailto:${orderEmail}?subject=${encodeURIComponent('Fanartikel-Anfrage')}`"
            class="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-900 px-6 text-sm font-black text-white transition hover:bg-blue-900"
          >
            Anfrage senden
          </a>
        </div>
      </div>
    </BaseSection>

    <!-- Sortiment -->
    <BaseSection
      id="sortiment"
      class="scroll-mt-24 bg-slate-50"
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

          <p class="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Kleidung, Accessoires und kleine Geschenkideen in den Farben
            unseres Vereins.
          </p>
        </div>

        <BaseBadge variant="secondary">
          {{ fanArticles.length }} Artikel
        </BaseBadge>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <FanArticleCard
          v-for="article in fanArticles"
          :key="article.id"
          :article="article"
          @select="openProductModal"
          @preview="openPreview"
        />
      </div>
    </BaseSection>

    <!-- Abschluss -->
    <section class="bg-slate-950 py-16 text-white md:py-20">
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

            <h2 class="mt-4 text-4xl font-black sm:text-5xl">
              Sprich uns einfach an.
            </h2>

            <p class="mt-5 text-lg leading-8 text-slate-300">
              Viele Produkte können auch in weiteren Größen, Farben oder
              Ausführungen bestellt werden.
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

    <CartButton />
    <CartDrawer />
  </main>
</template>