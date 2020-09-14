require("dotenv").config();
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Launchpad" || process.env.npm_package_name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    script: [],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
      },
      {
        rel: "stylesheet",
        href:
          "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/main.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["~/plugins/apiLogic.js"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      "nuxt-vue-material",
      {
        theme: "default",
      },
    ],
    [
      "nuxt-mq",
      {
        // Default breakpoint for SSR
        defaultBreakpoint: "default",
        breakpoints: {
          sm: 450,
          md: 1250,
          lg: Infinity,
        },
      },
    ],
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/dotenv",
  ],

  auth: {
    redirect: {
      login: "/register", // User will be redirected to this path if login is required.
      home: "/", // User will be redirect to this path after login. (rewriteRedirects will rewrite this path)
      logout: "/register", // User will be redirected to this path if after logout, current route is protected.
      user: "/user",
      callback: "/",
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token",
          },
          logout: { url: "/logout", method: "post" },
          user: { url: "/user", method: "get", propertyName: "user" },
        },
        tokenRequired: false, //True by default
        tokenType: false, // "bearer"
      },
    },
  },
  axios: {
    baseURL:
      "http://" + process.env.API_HOST + ":" + process.env.API_PORT + "/",
    credentials: true,
    init(axios) {
      axios.defaults.withCredentials = true;
    },
  },

  build: {},
  //Uncomment below property when deploying to EC2
  // server: {
  //   host: '0.0.0.0' // default: localhost
  // }
};
