// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/scripts',
      'nuxt-i18n-micro',
      '@nuxtjs/google-fonts'
  ],
    css: [
        "@/assets/css/main.css"
    ],
    i18n: {
        locales: [
            // { code: 'en', iso: 'en-US', dir: 'ltr' },
            { code: 'ru', iso: 'ru-RU', dir: 'ltr',  displayName: 'English'  },
            // { code: 'pl', iso: 'pl-PL', dir: 'rtl' },
        ],
        defaultLocale: 'ru',
        strategy: 'prefix_and_default',
        translationDir: 'locales',
        meta: true,
    },
    googleFonts: {
        families: {
            Montserrat: [400, 500, 600, 700, 800, 900]
        },
        display: "swap",
        preconnect: true,
        preload: true
    },
})