import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCroppie from 'vue-croppie'
import VueDraggable from 'vue-draggable' // NOTE: host url here
import jQuery from 'jquery'

import ClickOutside from 'vue-click-outside'

Vue.use(VueCroppie)
Vue.use(VueDraggable)
Vue.directive('click-outside', ClickOutside)
Vue.config.productionTip = false
Vue.prototype.$baseLink = 'http://localhost:8000/'
window.jQuery = jQuery
window.$ = jQuery
require('jquery-mousewheel')
require('malihu-custom-scrollbar-plugin')
require('@fancyapps/fancybox')
require('@fancyapps/fancybox/dist/jquery.fancybox.css')
require('slick-carousel')
require(['jquery-ui/ui/widgets/datepicker', 'jquery-ui/ui/i18n/datepicker-ru'])

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
