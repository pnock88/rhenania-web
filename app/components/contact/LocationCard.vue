<script setup lang="ts">
type Location = {
  id: string
  name: string
  street: string
  zip: string
  city: string
  latitude: number
  longitude: number
  mapBbox: string
}

const props = defineProps<{
  location: Location
}>()

const embedMapUrl = computed(() => {
  const bbox = encodeURIComponent(props.location.mapBbox)

  return [
    'https://www.openstreetmap.org/export/embed.html',
    `?bbox=${bbox}`,
    '&layer=mapnik',
    `&marker=${props.location.latitude}%2C${props.location.longitude}`,
  ].join('')
})

const openStreetMapUrl = computed(() => {
  return [
    'https://www.openstreetmap.org/',
    `?mlat=${props.location.latitude}`,
    `&mlon=${props.location.longitude}`,
    `#map=17/${props.location.latitude}/${props.location.longitude}`,
  ].join('')
})

const googleMapsRouteUrl = computed(() => {
  const destination = encodeURIComponent(
    `${props.location.street}, ${props.location.zip} ${props.location.city}`,
  )

  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
})
</script>

<template>
  <article
    class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
  >
    <iframe
      :title="`Karte: ${location.name}`"
      class="h-100 w-full"
      loading="lazy"
      :src="embedMapUrl"
      style="border: 0"
    />

    <div class="border-t border-slate-200 p-6">
      <h3 class="text-xl font-black text-slate-950">
        {{ location.name }}
      </h3>

      <p class="mt-1 text-slate-600">
        {{ location.street }} · {{ location.zip }} {{ location.city }}
      </p>

      <div class="mt-5 flex flex-wrap gap-3">
        <BaseButton
          :to="openStreetMapUrl"
          external
          variant="outline"
          class="!border-slate-300 !bg-white !text-slate-950 hover:!border-blue-700 hover:!bg-blue-50 hover:!text-blue-700"
        >
          OpenStreetMap
        </BaseButton>

        <BaseButton
          :to="googleMapsRouteUrl"
          external
        >
          Route planen
        </BaseButton>
      </div>
    </div>
  </article>
</template>