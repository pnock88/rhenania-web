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
    shopOrderEmail: process.env.SHOP_ORDER_EMAIL,

    smtp: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
      fromName:
        process.env.SMTP_FROM_NAME
        ?? 'SC Rhenania Hochdahl',
      fromEmail:
        process.env.SMTP_FROM_EMAIL
        ?? process.env.SMTP_USER,
    },

    public: {
      strapiUrl:
        process.env.NUXT_PUBLIC_STRAPI_URL
        ?? 'http://localhost:1338',
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