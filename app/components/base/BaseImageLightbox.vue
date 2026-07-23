<script setup lang="ts">
const props = defineProps<{
  open: boolean
  src: string
  alt?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const close = () => emit('close')

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})

watch(
  () => props.open,
  (open) => {
    if (import.meta.client) {
      document.body.style.overflow = open ? 'hidden' : ''
    }
  },
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="open"
        class="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
        @click.self="close"
      >
        <button
          class="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg"
          @click="close"
        >
          ×
        </button>

        <img
          :src="src"
          :alt="alt"
          class="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        >
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity .2s;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>