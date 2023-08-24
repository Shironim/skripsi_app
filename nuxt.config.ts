// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
  ],
  alias:{
    '@assets' : '/assets',
    '@plugins' : '/plugins',
  },
  css : [
    '@/assets/stylesheets/index.scss'
  ],
  googleFonts: {
    families: {
      Roboto: true,
      'Open+Sans': true,
      Montserrat: [400, 500],
      Poppins: {
        wght: [300, 400, 500],
        ital: [400]
      },
    },
    display: 'swap',
    prefetch: false,
    preconnect: false,
    preload: true
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
}
  
  // plugins: ['@/plugins/vue-carousel.js']
})
