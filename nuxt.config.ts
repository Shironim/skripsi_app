// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "@tailvue/nuxt",
    "@nuxt/image",
  ],

  ssr: false,

  alias: {
    "@assets": "/assets",
    "@plugins": "/plugins",
    "@comps": "/composables",
  },

  css: ["@/assets/stylesheets/index.scss"],
  runtimeConfig: {
    // Config within public will be also exposed to the client
    public: {
      BASE_API_URL: process.env.BASE_API_URL,
      IMAGE_URL: process.env.IMAGE_URL,
      API_RASA: process.env.API_RASA
    },
  },

  googleFonts: {
    families: {
      Roboto: true,
      "Open+Sans": true,
      Montserrat: [400, 500],
      Poppins: {
        wght: [300, 400, 500],
        ital: [400],
      },
    },
    display: "swap",
    prefetch: false,
    preconnect: false,
    preload: false,
    download: true,
    base64: false,
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },

  devtools: {
    enabled: false,
  },
});
