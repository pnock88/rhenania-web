<script setup lang="ts">
const navigation = [
  { label: 'Verein', to: '/verein' },
  { label: 'Mannschaften', to: '/mannschaften' },
  { label: 'Jugend', to: '/jugend' },
  { label: 'News', to: '/news' },
  { label: 'Spielplan', to: '/spielplan' },
  { label: 'Kontakt', to: '/kontakt' },
]

const legalLinks = [
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-slate-950 text-white">
    <BaseContainer>
      <div
        class="grid gap-12 border-b border-white/10 py-16 md:grid-cols-2 lg:grid-cols-4"
      >
        <div class="lg:col-span-2">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-4"
            aria-label="SC Rhenania Hochdahl – Startseite"
          >
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-blue-400 bg-blue-700 text-sm font-black"
            >
              SCR
            </div>

            <div>
              <p class="text-lg font-black">
                SC Rhenania Hochdahl
              </p>

              <p class="text-sm text-slate-400">
                1925 e.V.
              </p>
            </div>
          </NuxtLink>

          <p class="mt-6 max-w-md leading-7 text-slate-400">
            Mehr als Fußball. Eine Gemeinschaft, die Menschen jeden Alters
            zusammenbringt.
          </p>

          <div class="mt-6 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
            >
              IG
            </a>

            <a
              href="#"
              aria-label="Facebook"
              class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
            >
              FB
            </a>
          </div>
        </div>

        <div>
          <h2 class="font-black">
            Navigation
          </h2>

          <ul class="mt-5 space-y-3">
            <li
              v-for="item in navigation"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="text-sm text-slate-400 transition hover:text-white"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="font-black">
            Kontakt
          </h2>

          <address class="mt-5 space-y-3 not-italic text-sm text-slate-400">
            <p>
              SC Rhenania Hochdahl 1925 e.V.
            </p>

            <p>
              Sandheide<br>
              40699 Erkrath
            </p>

            <p>
              <a
                href="mailto:info@rhenania-hochdahl.de"
                class="transition hover:text-white"
              >
                info@rhenania-hochdahl.de
              </a>
            </p>
          </address>
        </div>
      </div>

      <div
        class="flex flex-col gap-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>
          © {{ currentYear }} SC Rhenania Hochdahl 1925 e.V.
        </p>

        <nav aria-label="Rechtliche Navigation">
          <ul class="flex flex-wrap gap-5">
            <li
              v-for="item in legalLinks"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="transition hover:text-white"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </BaseContainer>
  </footer>
</template>