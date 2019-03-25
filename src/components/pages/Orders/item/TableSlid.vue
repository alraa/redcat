<template>
  <div v-click-outside="closeModal">
    <a class="brand-img js-tip"
       @click="openModal"
       :style="{backgroundImage: `url(${images[0] || nullImage})`}"></a>
    <div class="table-list-tip" v-if="images.length">
      <div class="tip tip-size" id="size-1">
        <a href="#" class="tip-close js-tip-close">
          <span></span>
          <span></span>
        </a>
        <ul class="table-list table-size">
          <li class="table-list__item">
            <div class="col col_1">#</div>
            <div class="col col_2">Название</div>
            <div class="col col_3">Размер</div>
            <div class="col col_3">Кол-во</div>
          </li>
          <li class="table-list__item">
            <div class="col col_1">1</div>
            <div class="col col_2">Футболка Adidas</div>
            <div class="col col_3">XL</div>
            <div class="col col_4">4</div>
          </li>
          <li class="table-list__item">
            <div class="col col_1">2</div>
            <div class="col col_2">Футболка Adidas</div>
            <div class="col col_3">S</div>
            <div class="col col_4">2</div>
          </li>
          <li class="table-list__item">
            <div class="col col_1">3</div>
            <div class="col col_2">Футболка Adidas</div>
            <div class="col col_3">M</div>
            <div class="col col_4">6</div>
          </li>
          <li class="table-list__item">
            <div class="col col_1">4</div>
            <div class="col col_2">Футболка Adidas</div>
            <div class="col col_3">XL</div>
            <div class="col col_4">4</div>
          </li>
          <li class="table-list__item">
            <div class="col col_1">5</div>
            <div class="col col_2">Футболка Adidas</div>
            <div class="col col_3">S</div>
            <div class="col col_4">2</div>
          </li>
          <li class="table-list__item">
            <div class="col col_1">6</div>
            <div class="col col_2">Футболка Adidas</div>
            <div class="col col_3">M</div>
            <div class="col col_4">6</div>
          </li>
        </ul>
      </div>
      <div class="tip tip-size" id="size-2">
        <a href="#" class="tip-close js-tip-close">
          <span></span>
          <span></span>
        </a>
        <ul class="table-list table-size">
          <li class="table-list__item">
            <div class="col col_1">#</div>
            <div class="col col_2">Название</div>
            <div class="col col_3">Размер</div>
            <div class="col col_3">Кол-во</div>
          </li>
          <li class="table-list__item">
            <div class="col col_1">1</div>
            <div class="col col_2">Футболка Adidas</div>
            <div class="col col_3">XL</div>
            <div class="col col_4">4</div>
          </li>
          <li class="table-list__item">
            <div class="col col_1">2</div>
            <div class="col col_2">Футболка Adidas</div>
            <div class="col col_3">S</div>
            <div class="col col_4">2</div>
          </li>
        </ul>
      </div>
      <div class="tip tip-size" id="size-3">
        <a href="#" class="tip-close js-tip-close">
          <span></span>
          <span></span>
        </a>
        <ul class="table-list table-size">
          <li class="table-list__item">
            <div class="col col_1">#</div>
            <div class="col col_2">Название</div>
            <div class="col col_3">Размер</div>
            <div class="col col_3">Кол-во</div>
          </li>
          <li class="table-list__item">
            <div class="col col_1">1</div>
            <div class="col col_2">Футболка Adidas</div>
            <div class="col col_3">XL</div>
            <div class="col col_4">4</div>
          </li>
        </ul>
      </div>
      <div class="tip tip-img-popup tip-img-popup-slid tip tip-img-popup" :class="{'show-tip':isOpenModal}">
        <a href="#" class="tip-close js-tip-close" @click.prevent="closeModal">
          <span></span>
          <span></span>
        </a>
        <div class="photo-slider js-photo-slider-two">
          <div class="photo-slider__item" v-for="img of images" :key="img">
            <div class="photo-slider__img" :style="{backgroundImage: `url(${img})`}"></div>
          </div>
        </div>
        <div class="number-slide"></div>
      </div>
    </div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import slid from '@/mixins/slider'
import { mapState } from 'vuex'
export default {
  name: 'tableSlid',
  directives: {
    ClickOutside
  },
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isOpenModal: false
    }
  },
  computed: {
    ...mapState(['nullImage'])
  },
  mixins: [slid],
  methods: {
    openModal () {
      this.isOpenModal = true
    },
    closeModal () {
      this.isOpenModal = false
    }
  }
}

</script>
<style scoped>
  .photo-slider__img,
  .brand-img {
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .photo-slider__img {
    width: 100%;
    height: 306px;
    margin: -5px 0;
  }
  .tip-img-popup-slid {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
