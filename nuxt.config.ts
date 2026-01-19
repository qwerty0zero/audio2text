// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/scripts',
    'nuxt-i18n-micro',
    '@nuxtjs/google-fonts',
    'nuxt-svgo',
    'lenis/nuxt',
    '@nuxtjs/color-mode',
  ],
    app: {
        header: {
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
        },
    },
    css: [
        "@/assets/css/main.css"
    ],
    i18n: {
        locales: [
            // { code: 'en', iso: 'en-US', dir: 'ltr' },
            { code: 'ru', iso: 'ru-RU', dir: 'ltr',  displayName: 'Русский'  },
            // { code: 'pl', iso: 'pl-PL', dir: 'rtl' },
        ],
        defaultLocale: 'ru',
        strategy: 'prefix',
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