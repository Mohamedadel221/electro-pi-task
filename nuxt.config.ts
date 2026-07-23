// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/style/main.css", "~/assets/style/globalStyle.scss"],
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@pinia/nuxt"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      taskEndPoint: process.env.NUXT_PUBLIC_TASKS_ENDPOINT,
    },
  },
  ssr: true,
  nitro: {
    preset: "static",
  },

  sourcemap: {
    server: false,
    client: false,
  },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
