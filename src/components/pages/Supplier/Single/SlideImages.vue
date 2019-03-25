<template>
    <div class="inf-order__img tip-img-popup" v-if="images.length">
        <div class="inf-order-slider photo-slider js-photo-slider">
            <div class="inf-order-slider__item" v-for="img of images" :key="img">
                <a class="inf-order-slider__link js-tip-slider" @click.prevent="openTip">
                    <span class="inf-order-slider__img"
                          :style="{backgroundImage: `url(${img})`}"></span>
                </a>
            </div>
        </div>
        <div class="number-slide"></div>
        <div class="tip tip-img-popup" :class="{'show-tip':toggleTip}">
            <a class="tip-close js-tip-close" @click.prevent="closeTip">
                <span></span>
                <span></span>
            </a>
            <div class="photo-slider js-photo-slider-2">
                <div class="photo-slider__item" v-for="img of images" :key="img">
                    <div class="photo-slider__img" :style="{backgroundImage: `url(${img})`}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Slider from '@/mixins/slider.js'
export default {
  name: 'slideImages',
  props: {
    items: {},
    order: {}
  },
  mixins: [Slider],
  computed: {
    quality () {
      return this.items.selectedQuality
    },
    images () {
      return this.order.qualities[this.quality].images
    }
  },
  data () {
    return {
      toggleTip: false
    }
  },
  methods: {
    openTip () {
      this.toggleTip = true
    },
    closeTip () {
      this.toggleTip = false
    }
  }
}
</script>
<style scoped>
    .inf-order-slider__img {
        width: 173px;
        height: 173px;
        display: block;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }

    .photo-slider__img {
        display: block;
        width: 305px;
        height: 305px;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        overflow: hidden;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin: -3px 0;
    }
</style>
