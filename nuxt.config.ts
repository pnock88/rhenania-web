import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      strapiUrl: 'http://localhost:1338',
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: [
    '~/assets/css/main.css',
  ],
})