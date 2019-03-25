<template>

    <transition name="slide-fade" mode="out-in">
      <div v-if="!isOpen">
        <div class="box-akcii-banner"
             v-if="akcii"
             :key="'open'">
          <div class="box-akcii-banner__top">Акция действует с 09.07.18 до 09.10.18</div>
          <div class="box-akcii-banner__middle">
            <div class="box-akcii-banner__first">Купи 1</div>
            <div class="box-akcii-banner__second">Получи 2</div>
          </div>
          <a href="#" class="box-akcii-banner__link" @click.prevent="open">Подробнее
            <div class="box-akcii-banner__icon">
              <i class="icon-right-arrow"></i>
            </div>
          </a>
        </div>
        <div class="box-akcii-banner box-akcii-banner_bottom"
             v-if="!akcii"
             :key="'open-two'">
          <div class="box-akcii-banner__top">Акция действует с 09.07.18 до 09.10.18</div>
          <div class="box-akcii-banner__middle">
            <div class="box-akcii-banner__second">Получи бесплатно!</div>
          </div>
          <a href="#" class="box-akcii-banner__link" @click.prevent="open">
            <div class="box-akcii-banner__icon">
              <i class="icon-right-arrow"></i>
            </div>
          </a>
        </div>
      </div>
      <div class="box-akcii-banner box-akcii-banner_top" v-else :key="'close'">
        <div class="box-akcii-banner__top">Акция действует с 09.07.18 до 09.10.18
          <div class="box-akcii-banner__close">
            <i class="icon-banner-close" @click.prevent="close"></i>
          </div>
        </div>
        <div class="box-akcii-banner__title">Купи 1 - Получи 2!</div>
        <div class="box-akcii-banner__middle">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
        </div>
        <a href="#" @click.prevent class="box-akcii-banner__link">Перейти к товарам
          <div class="box-akcii-banner__icon">
            <i class="icon-right-arrow"></i>
          </div>
        </a>
      </div>
    </transition>

</template>
<script>
export default {
  name: 'stock-banner',
  props: {
    akcii: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>
<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
