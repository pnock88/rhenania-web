<script setup lang="ts">
const route = useRoute()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navigation = [
  { label: 'Start', to: '/' },
  { label: 'Verein', to: '/verein' },
  { label: 'Mannschaften', to: '/mannschaften' },
  { label: 'Aktuelles', to: '/news' },
  { label: 'Spielplan', to: '/spielplan' },
  { label: 'Sponsoren', to: '/sponsoren' },
  { label: 'Kontakt', to: '/kontakt' },
]

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 24
}

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}

watch(
  () => route.path,
  () => {
    closeMenu()
  },
)

watch(isMenuOpen, (isOpen) => {
  if (!import.meta.client) {
    return
  }

  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 text-white transition-all duration-300"
    :class="[
      isScrolled || isMenuOpen
        ? 'border-b border-white/10 bg-slate-950/95 shadow-lg backdrop-blur-xl'
        : 'border-b border-white/10 bg-slate-950/35 backdrop-blur-sm',
    ]"
  >
    <BaseContainer>
      <div
        class="flex items-center justify-between transition-all duration-300"
        :class="isScrolled ? 'h-16' : 'h-20'"
      >
        <NuxtLink
          to="/"
          class="flex min-w-0 items-center gap-3"
          aria-label="SC Rhenania Hochdahl – Startseite"
          @click="closeMenu"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-400 bg-white p-1 shadow-md"
          >
            <img
              src="/images/logos/rhenania.png"
              alt=""
              class="h-full w-full object-contain"
            >
          </div>

          <div class="min-w-0 leading-tight">
            <p class="truncate font-black">
              SC Rhenania
            </p>

            <p class="truncate text-xs text-slate-300">
              Hochdahl 1925 e.V.
            </p>
          </div>
        </NuxtLink>

        <nav
          class="hidden lg:block"
          aria-label="Hauptnavigation"
        >
          <ul class="flex items-center gap-6">
            <li
              v-for="item in navigation"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="group relative block py-3 text-sm font-semibold transition"
                :class="
                  isActive(item.to)
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white'
                "
              >
                {{ item.label }}

                <span
                  class="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-blue-400 transition-transform duration-300"
                  :class="
                    isActive(item.to)
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  "
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="hidden lg:block">
          <BaseButton to="/mitglied-werden">
            Mitglied werden
          </BaseButton>
        </div>

        <button
          type="button"
          class="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition hover:bg-white/20 lg:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
          :aria-label="isMenuOpen ? 'Menü schließen' : 'Menü öffnen'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg
            v-if="!isMenuOpen"
            class="h-6 w-6"
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
            class="h-6 w-6"
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
    </BaseContainer>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-4 opacity-0"
    >
      <nav
        v-if="isMenuOpen"
        id="mobile-navigation"
        class="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-slate-950 px-5 py-6 lg:hidden"
        aria-label="Mobile Navigation"
      >
        <ul class="space-y-1">
          <li
            v-for="item in navigation"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              class="flex items-center justify-between rounded-xl px-4 py-3.5 font-bold transition"
              :class="
                isActive(item.to)
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              "
              @click="closeMenu"
            >
              {{ item.label }}

              <span aria-hidden="true">
                →
              </span>
            </NuxtLink>
          </li>
        </ul>

        <BaseButton
          to="/mitglied-werden"
          class="mt-6 w-full"
          @click="closeMenu"
        >
          Mitglied werden
        </BaseButton>
      </nav>
    </Transition>
  </header>
</template>