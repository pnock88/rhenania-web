<script setup lang="ts">
const route = useRoute()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navigation = [
  { label: 'Start', to: '/' },
  { label: 'Verein', to: '/verein' },
  { label: 'Mannschaften', to: '/mannschaften' },
  { label: 'News', to: '/news' },
  { label: 'Spielplan', to: '/spielplan' },
  { label: 'Sponsoren', to: '/sponsoren' },
  { label: 'Kontakt', to: '/kontakt' },
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  if (import.meta.client) {
    isScrolled.value = window.scrollY > 30
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  },
)

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      isScrolled || isMenuOpen
        ? 'bg-slate-950/95 shadow-xl backdrop-blur-lg'
        : 'bg-transparent'
    "
  >
    <BaseContainer>
      <div class="flex h-20 items-center justify-between gap-4">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex shrink-0 items-center gap-3"
          aria-label="Zur Startseite"
          @click="closeMenu"
        >
          <img
            src="/images/logos/rhenania.png"
            alt="SC Rhenania Hochdahl"
            class="h-14 w-14 object-contain"
          >

          <div class="hidden leading-tight text-white sm:block">
            <p class="font-black">
              SC Rhenania
            </p>

            <p class="text-xs text-slate-300">
              Hochdahl 1925 e.V.
            </p>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav
          class="hidden xl:block"
          aria-label="Hauptnavigation"
        >
          <ul class="flex items-center gap-6">
            <li
              v-for="item in navigation"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="relative whitespace-nowrap font-semibold transition"
                :class="
                  isActive(item.to)
                    ? 'text-blue-400'
                    : 'text-white hover:text-blue-400'
                "
              >
                {{ item.label }}

                <span
                  v-if="isActive(item.to)"
                  class="absolute -bottom-2 left-0 h-0.5 w-full bg-blue-500"
                  aria-hidden="true"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Desktop Actions -->
        <div class="hidden items-center gap-3 xl:flex">
          <NuxtLink
            to="/suche"
            aria-label="Website durchsuchen"
            title="Suche"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-blue-400 hover:bg-white/10 hover:text-blue-300"
            :class="
              isActive('/suche')
                ? 'border-blue-400 bg-white/10 text-blue-300'
                : ''
            "
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />
              <path d="m20 20-4-4" />
            </svg>
          </NuxtLink>

          <BaseButton to="/mitglied-werden">
            Mitglied werden
          </BaseButton>
        </div>

        <!-- Mobile Actions -->
        <div class="flex items-center gap-2 xl:hidden">
          <NuxtLink
            to="/suche"
            aria-label="Website durchsuchen"
            class="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10"
            @click="closeMenu"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />
              <path d="m20 20-4-4" />
            </svg>
          </NuxtLink>

          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-navigation"
            :aria-label="
              isMenuOpen
                ? 'Navigation schließen'
                : 'Navigation öffnen'
            "
            @click="isMenuOpen = !isMenuOpen"
          >
            <svg
              v-if="!isMenuOpen"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>

            <svg
              v-else
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>
    </BaseContainer>

    <!-- Mobile Navigation -->
    <div
      v-if="isMenuOpen"
      id="mobile-navigation"
      class="border-t border-white/10 bg-slate-950/98 xl:hidden"
    >
      <BaseContainer>
        <nav
          class="py-5"
          aria-label="Mobile Navigation"
        >
          <ul class="space-y-2">
            <li
              v-for="item in navigation"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="block rounded-lg px-4 py-3 font-semibold transition"
                :class="
                  isActive(item.to)
                    ? 'bg-blue-700 text-white'
                    : 'text-white hover:bg-white/10'
                "
                @click="closeMenu"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>

          <div class="mt-5 border-t border-white/10 pt-5">
            <NuxtLink
              to="/suche"
              class="flex items-center gap-3 rounded-lg px-4 py-3 font-semibold text-white transition hover:bg-white/10"
              @click="closeMenu"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />
                <path d="m20 20-4-4" />
              </svg>

              Website durchsuchen
            </NuxtLink>

            <BaseButton
              to="/mitglied-werden"
              class="mt-3 w-full"
            >
              Mitglied werden
            </BaseButton>
          </div>
        </nav>
      </BaseContainer>
    </div>
  </header>
</template>