<script setup lang="ts">
const isMenuOpen = ref(false)

const navigation = [
  { label: 'Start', to: '/' },
  { label: 'Verein', to: '/verein' },
  { label: 'Mannschaften', to: '/mannschaften' },
  { label: 'Aktuelles', to: '/news' },
  { label: 'Termine', to: '/termine' },
  { label: 'Sponsoren', to: '/sponsoren' },
  { label: 'Kontakt', to: '/kontakt' },
]

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header
    class="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 text-white backdrop-blur-md"
  >
    <BaseContainer>
      <div class="flex h-20 items-center justify-between">
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
          aria-label="SC Rhenania Hochdahl – Startseite"
          @click="closeMenu"
        >
          <div
            class="flex size-12 items-center justify-center rounded-full border-2 border-blue-400 bg-blue-700 text-xs font-black"
          >
            SCR
          </div>

          <div class="leading-tight">
            <p class="font-bold">
              SC Rhenania
            </p>

            <p class="text-xs text-slate-300">
              Hochdahl 1925 e.V.
            </p>
          </div>
        </NuxtLink>

        <nav
          class="hidden lg:block"
          aria-label="Hauptnavigation"
        >
          <ul class="flex items-center gap-7">
            <li
              v-for="item in navigation"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="text-sm font-semibold text-slate-200 transition hover:text-blue-400"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <BaseButton
          to="/mitglied-werden"
          class="hidden lg:inline-flex"
        >
          Mitglied werden
        </BaseButton>

        <button
          type="button"
          class="flex size-11 items-center justify-center rounded-lg border border-white/20 lg:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
          :aria-label="isMenuOpen ? 'Menü schließen' : 'Menü öffnen'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="sr-only">
            {{ isMenuOpen ? 'Menü schließen' : 'Menü öffnen' }}
          </span>

          <svg
            v-if="!isMenuOpen"
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <svg
            v-else
            class="size-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              d="M6 6l12 12M18 6 6 18"
            />
          </svg>
        </button>
      </div>

      <nav
        v-if="isMenuOpen"
        id="mobile-navigation"
        class="border-t border-white/10 py-5 lg:hidden"
        aria-label="Mobile Navigation"
      >
        <ul class="flex flex-col gap-1">
          <li
            v-for="item in navigation"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              class="block rounded-lg px-3 py-3 font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
              @click="closeMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <BaseButton
          to="/mitglied-werden"
          class="mt-5 w-full"
          @click="closeMenu"
        >
          Mitglied werden
        </BaseButton>
      </nav>
    </BaseContainer>
  </header>
</template>