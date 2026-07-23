<script setup lang="ts">
const route = useRoute()

const searchQuery = ref(
  typeof route.query.q === 'string'
    ? route.query.q
    : '',
)

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isSearchOpen = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

const navigation = [
  { label: 'Unser Verein', to: '/verein' },
  { label: 'Mannschaften', to: '/mannschaften' },
  { label: 'News', to: '/news' },
  { label: 'Spielplan', to: '/spielplan' },
  { label: 'Sponsoren', to: '/sponsoren' },
  { label: 'Fanshop', to: '/fanshop' },
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

const openSearch = async () => {
  isSearchOpen.value = true

  await nextTick()

  searchInput.value?.focus()
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}

const toggleSearch = () => {
  if (isSearchOpen.value) {
    closeSearch()
    return
  }

  openSearch()
}

const submitSearch = async () => {
  const query = searchQuery.value.trim()

  if (!query) {
    searchInput.value?.focus()
    return
  }

  closeMenu()
  isSearchOpen.value = false

  await navigateTo({
    path: '/suche',
    query: {
      q: query,
    },
  })
}

const handleScroll = () => {
  if (import.meta.client) {
    isScrolled.value = window.scrollY > 30
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
    closeSearch()
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()

    searchQuery.value =
      typeof route.query.q === 'string'
        ? route.query.q
        : ''

    isSearchOpen.value = route.path === '/suche'
  },
  {
    immediate: true,
  },
)

watch(isMenuOpen, (open) => {
  if (open) {
    closeSearch()
  }
})

onMounted(() => {
  handleScroll()

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      isScrolled || isMenuOpen || isSearchOpen
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
          <form
            class="relative flex items-center"
            role="search"
            @submit.prevent="submitSearch"
          >
            <div
              class="flex items-center overflow-hidden rounded-full border transition-all duration-300 ease-out"
              :class="
                isSearchOpen
                  ? 'w-[28rem] border-white/20 bg-white/10'
                  : 'w-11 border-white/15 bg-transparent'
              "
            >
              <input
                v-if="isSearchOpen"
                ref="searchInput"
                v-model="searchQuery"
                type="search"
                name="q"
                placeholder="Website durchsuchen …"
                autocomplete="off"
                class="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-slate-400"
                aria-label="Website durchsuchen"
              >

              <button
                v-if="isSearchOpen && searchQuery.trim()"
                type="submit"
                class="mr-1 flex h-9 shrink-0 items-center justify-center rounded-full bg-blue-700 px-4 text-xs font-black text-white transition hover:bg-blue-600"
              >
                Suchen
              </button>

              <button
                type="button"
                class="flex h-11 w-11 shrink-0 items-center justify-center text-white transition hover:text-blue-300"
                :aria-label="
                  isSearchOpen
                    ? 'Suche schließen'
                    : 'Suche öffnen'
                "
                :aria-expanded="isSearchOpen"
                @click="toggleSearch"
              >
                <svg
                  v-if="!isSearchOpen"
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

                <svg
                  v-else
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </form>

          <BaseButton
            v-if="!isSearchOpen"
            to="/mitglied-werden"
          >
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