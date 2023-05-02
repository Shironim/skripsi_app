// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],
  alias:{
    '@assets' : '/assets',
  },
  css : [
    '@/assets/stylesheets/index.scss'
  ]
})
