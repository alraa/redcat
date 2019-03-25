<template>
  <div id="app" class="main-wrapper">
    <!-- BEGIN CONTENT -->

    <main class="content">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </main>

    <!-- CONTENT EOF   -->
    <Header />
    <Footer />
    <Modals />
  </div>
</template>

<script>
import 'assets/css/magic.css'
import 'assets/css/ion.rangeSlider.css'
import 'assets/css/ion.rangeSlider.skinHTML5.css'
import 'assets/css/animate.min.css'
import 'assets/css/style.css'

import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import Modals from '@/components/ui/Modals'

if (process.browser) {
  let $ = require('jquery') // eslint-disable-line
  require('jquery-mousewheel')
  require('malihu-custom-scrollbar-plugin')
  require('assets/js/components/slick.js')
  require('assets/js/hover-css.js')
  require('assets/js/waypoints.min.js')
  require('assets/js/ion.rangeSlider.js')
  require('assets/js/animate-css.js')
  require('assets/js/components/jquery.formstyler.js')
  require('assets/js/components/jquery.maskedinput.min.js')
  require('assets/js/custom.js')
  require('assets/js/splice.js')
}
export default {
  components: {
    Header,
    Footer,
    Modals
  }
}
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  .dropdwn-cont,
  .dropdwn__item {
    text-transform: uppercase;
  }
  .vue-slider-component .vue-slider-tooltip {
    text-transform: none;
  }
  .vue-slider-component .vue-slider-dot .vue-slider-dot-handle {
    box-shadow: 0 0 4px rgba(177, 177, 177, 0.49)!important;
  }
  .cataloge-wrapper_start {
    justify-content: flex-start;
  }
  .content {
    z-index: 1;
  }
  .open {
    display: block !important;
  }
  .reset__submit-container .reset__submit[type="submit"]:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
  .reset__submit-container .reset__submit[type="submit"]:disabled:hover{
    background: #3b3b3b;
    color: #fff;
    border: 1px solid transparent;
  }
</style>
