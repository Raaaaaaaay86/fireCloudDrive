export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'cloudDrive',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: 'https://kit.fontawesome.com/1af9f69884.js', crossorigin: 'anonymous' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/firebase.js',
    '~/plugins/timestamp.js',
    '~/plugins/size.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  env: {
    SDK_APIKEY: 'AIzaSyDqBvTzi_xsk-7lQhmKtdYIvfCtZBe1juc',
    SDK_AUTHDOMAIN: 'clouddrive-3cbb9.firebaseapp.com',
    SDK_DATABASEURL: 'https://clouddrive-3cbb9.firebaseio.com',
    SDK_PROJECTID: 'clouddrive-3cbb9',
    SDK_STORAGEBUCKET: 'clouddrive-3cbb9.appspot.com',
    SDK_MESSAGINGSENDERID: '856072363107',
    SDK_APPID: '1:856072363107:web:58d82817bf9ae57fbd6c56',
    SDK_MEASUREMENTID: 'G-5CX3L16TQW',
  },
};
