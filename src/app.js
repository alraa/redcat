import Vue from 'vue'
import App from './App.vue'

import { createStore } from '@/store'
import { createRouter } from '@/router'
import { sync } from 'vuex-router-sync'
import breadcrumb from '@/components/ui/Breadcrump.vue'
import banner from '@/components/ui/Banner.vue'
import VueYoutube from 'vue-youtube'
import VueMask from 'v-mask'
import VeeValidate, { Validator } from 'vee-validate'
import ruLocale from 'vee-validate/dist/locale/ru'
import ClickOutside from 'vue-click-outside'
import NoSSR from 'vue-no-ssr'
// import { get, set, remove } from 'tiny-cookie'
import { mapMutations, mapActions } from 'vuex'
Vue.directive('click-outside', ClickOutside)
Vue.component('breadcrumb', breadcrumb)
Vue.component('banner', banner)
Vue.component('no-ssr', NoSSR)

Vue.use(VueYoutube)
Vue.use(VueMask)
Validator.localize('ru', ruLocale)
Vue.use(VeeValidate, {
  locale: 'ru',
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    pristine: 'is-invalid'
  }
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp (ssrContext) {
  // create store and router instances
  const store = createStore()
  const router = createRouter()
  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)
  if (process.browser) {
    store.commit('setBasket')
    store.commit('setWish')
    if (localStorage.getItem('redCatToken')) {
      store.commit('setToken', (localStorage.getItem('redCatToken')))
    }
  }
  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    ssrContext,
    methods: {
      ...mapMutations(['setToken']),
      ...mapActions(['setBasket', 'setWish'])
    },
    mounted () {
      this.setBasket()
      this.setWish()
      if (process.browser) {
        if (localStorage.getItem('redCatToken')) {
          this.setToken(localStorage.getItem('redCatToken'))
        }
      }
    },
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
