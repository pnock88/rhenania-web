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
      isScrolled
        ? 'bg-slate-950/95 shadow-xl backdrop-blur-lg'
        : 'bg-transparent'
    "
  >
    <BaseContainer>
      <div class="flex h-20 items-center justify-between">

        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
        >
          <img
            src="/images/logos/rhenania.png"
            alt="SC Rhenania Hochdahl"
            class="h-14 w-14 object-contain"
          >

          <div class="leading-tight text-white">
            <p class="font-black">
              SC Rhenania
            </p>

            <p class="text-xs text-slate-300">
              Hochdahl 1925 e.V.
            </p>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:block">
          <ul class="flex items-center gap-8">
            <li
              v-for="item in navigation"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="relative font-semibold transition"
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
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- CTA -->
        <div class="hidden lg:block">
          <BaseButton to="/mitglied-werden">
            Mitglied werden
          </BaseButton>
        </div>

        <!-- Mobile Button -->
        <button
          class="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white lg:hidden"
          @click="isMenuOpen = !isMenuOpen"
        >
          ☰
        </button>

      </div>
    </BaseContainer>

    <!-- Mobile Navigation -->
    <div
      v-if="isMenuOpen"
      class="border-t border-white/10 bg-slate-950 lg:hidden"
    >
      <BaseContainer>
        <nav class="py-5">
          <ul class="space-y-2">
            <li
              v-for="item in navigation"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                class="block rounded-lg px-4 py-3 text-white hover:bg-white/10"
                @click="closeMenu"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>

          <BaseButton
            to="/mitglied-werden"
            class="mt-5 w-full"
          >
            Mitglied werden
          </BaseButton>
        </nav>
      </BaseContainer>
    </div>
  </header>
</template>