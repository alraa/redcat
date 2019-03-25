<template>
  <div class="popup">
    <div class="size-popup">

      <div class="size-popup-wrapper">
        <div class="popup__close" @click="cancel">
          <span class="icon-close-popup"></span>
        </div>
        <form method="post">
          <div class="size-popup__header">Расчет Вашего размера</div>
          <div class="size-popup__subheader">Введите параметры, чтобы увидеть рекомендованный вам размер</div>
          <div class="size-popup__input-wrapper">
            <div class="size-popup__input-text">
              <input v-mask="'###'"
                     v-model="growth"
                     type="text"
                     placeholder="Введите рост в см">
              <input v-mask="'###'"
                     v-model="weight"
                     type="text"
                     placeholder="Введите вес в кг">
            </div>
          </div>
          <div class="size-popup__subheader_mod">Выберите посадку, который Вам нравится.</div>
          <div class="size-popup__range">
            <!--<div class="range">-->
              <!--<div class="range__line">-->
                <!--<div class="range__mark">-->
                  <!--<div class="range__text">-->
                    <!--<div>-->
                      <!--Очень свободный-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <!--<ul class="range-scale">-->
                <!--<li></li>-->
                <!--<li></li>-->
                <!--<li></li>-->
                <!--<li></li>-->
                <!--<li></li>-->
                <!--<li></li>-->
                <!--<li></li>-->
              <!--</ul>-->
            <!--</div>-->

            <no-ssr>
              <vue-slider ref="slider" class="slide-calc" v-bind="sliderOptions" v-model="sliderOptions.value"></vue-slider>
            </no-ssr>
            {{size}}
          </div>
          <div class="popup-button">
            <input
              class="button"
              type="submit"
              value="Найти размер"
              @click.prevent="calculateSize"
             />
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import NoSSR from 'vue-no-ssr'
let components = {
  'no-ssr': NoSSR
}
if (process.browser) {
  let VueSlider = require('vue-slider-component')
  components['vue-slider'] = VueSlider
}
export default {
  props: {
    modal: [Object, Boolean],
    success: Function,
    cancel: Function
  },
  data () {
    return {
      showSuccess: false,
      growth: null,
      weight: null,
      size: null,
      sliderOptions: {
        value: 'Приталеный',
        width: '100%',
        height: 6,
        dotSize: 16,
        padding: 0,
        data: [
          'Свободный',
          'Свободный',
          'Свободный',
          'Свободный',
          'Свободный',
          'Приталеный',
          'Приталеный',
          'Приталеный',
          'Приталеный',
          'Приталеный',
          'Приталеный'
        ],
        disabled: false,
        show: true,
        piecewise: true,
        piecewiseStyle: {
          backgroundColor: '#3b3b3b',
          // visibility: 'visible',
          width: '1px',
          top: '14px',
          height: '7px',
          borderRadius: 0,
          zIndex: -1
        },
        piecewiseActiveStyle: {
          backgroundColor: '#3b3b3b'
        },
        tooltip: 'always',
        // formatter (value) {
        //   return `${value} руб`
        // },
        enableCross: false,
        // mergeFormatter (value1, value2) {
        //   return `${value1} руб - ${value2} руб`
        // },
        bgStyle: {
          backgroundColor: '#fff',
          boxShadow: 'none',
          borderRadius: 0,
          // padding: 0,
          border: '1px solid black'
        },
        tooltipStyle: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: '#3f3f3f',
          fontSize: '12px',
          borderRadius: 0,
          border: '1px solid #6e6e6e',
          padding: '5px 6px 7px'
        },
        processStyle: {
          backgroundColor: 'transparent',
          margin: '0 -15px'
        },
        sliderStyle: {
          borderRadius: 0,
          backgroundColor: 'black',
          boxShadow: 'none',
          width: '14px',
          height: '14px'
        }
      },
      calcSize: {
        XS: {
          minGrowth: 145,
          maxGrowth: 149,
          weight: 50
        },
        S: {
          minGrowth: 150,
          maxGrowth: 159,
          weight: 55
        },
        M: {
          minGrowth: 160,
          maxGrowth: 170,
          weight: 65
        },
        L: {
          minGrowth: 171,
          maxGrowth: 175,
          weight: 75
        },
        XL: {
          minGrowth: 176,
          maxGrowth: 180,
          weight: 85
        },
        XXL: {
          minGrowth: 181,
          maxGrowth: 185,
          weight: 100
        },
        XXXL: {
          minGrowth: 185,
          maxGrowth: 190,
          weight: 110
        },
        XXXXL: {
          minGrowth: 190,
          maxGrowth: 195,
          weight: 120
        }
      }
    }
  },
  components,
  methods: {
    ...mapActions(['postCallbackForm']),
    ...mapMutations('modals', ['openModal']),

    submit () {
      this.postAuthorizationForm(this.form)
        .then(() => {
          this.showSuccess = true
        })
    },
    sizeCalculation () {
      const calcSizeKeys = Object.keys(this.calcSize)
      this.size = calcSizeKeys.filter(key => {
        return this.growth >= this.calcSize[key].minGrowth && this.growth <= this.calcSize[key].maxGrowth && this.weight <= this.calcSize[key].weight
      })[0] || 'Данного размена не найдено ('

      if (this.sliderOptions.value === 'Свободный') {
        let index = calcSizeKeys.indexOf(this.size)
        if (index !== -1) {
          this.size = calcSizeKeys[++index]
        }
      }
    },
    calculateSize () {
      this.sizeCalculation()
      this.cancel()
      this.openModal({ type: 'suitable', size: this.size })
    }
  }
}
</script>

<style scoped>
.slide-calc .vue-slider-piecewise:before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  height: 0;
  left: 0;
  background-color: red;
  width: 30px;
}
</style>
