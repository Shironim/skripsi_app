// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    'nuxt-icon',
  ],
  alias:{
    '@assets' : '/assets',
    '@plugins' : '/plugins',
  },
  css : [
    '@/assets/stylesheets/index.scss'
  ],
  // plugins: ['@/plugins/vue-carousel.js']
})
