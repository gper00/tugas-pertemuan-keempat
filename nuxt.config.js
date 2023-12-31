export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Belajar PWA dengan NuxtJS",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/node_modules/bootstrap/dist/css/bootstrap.min.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: ["@/plugins/axios.js"],
  plugins: [
    {
      src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      mode: "client",
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // additional
  pwa: {
    meta: {
      title: "Belajar PWA NuxtJS",
      author: "Gper",
    },
    manifest: {
      name: "Belajar PWA NuxtJS",
      short_name: "NuxtJS PWA",
      lang: "en",
    },
  },
};
