<template>
  <div class="bye-look__block">
    <div class="bye-look__img">
      <img :src="_(item, `original.qualities[${item.quality}].images[0]`) || nullImage" alt="img">
      <a href="#" @click.prevent.stop="addToWish(item.item_id)" class="bye-look__heart">
        <img v-if="!isFavorites" src="~@/assets/img/heart_bye.png" alt="img">
        <img v-else src="~@/assets/img/red-heart.png" alt="img">
      </a>
      <!--<div @click.stop="addToWish(item._id)" class="cataloge-block__heart">-->
        <!--<img v-if="!wish.includes(i => i === item._id)" src="~@/assets/img/heart_bye.png" alt="">-->
        <!--<img v-else src="~@/assets/img/red-heart.png" alt="">-->
      <!--</div>-->
    </div>
    <div class="bye-look__item name">{{item.original.name}}</div>
    <div class="bye-look__item price" v-if="_(item, `original.qualities[${item.quality}].site`)">
      <span>{{_(item, `original.qualities[${item.quality}].site`)}}</span> руб.
    </div>

    <!-- TODO:
      Этот селект на jquery нужно переверстать -->

    <!-- <hr>
    <select class="styled" v-model="selectedSize">
      <option selected disabled>Размер</option>
      <option v-for="size of item.original.sizes" :value="size" :key="size">{{size.toUpperCase()}}</option>
    </select>
    <hr> -->
    <div @click="opened = !opened" class="jq-selectbox jqselect changed" style="z-index: 12; display: inline-block; position: relative; z-index: 100;">
      <div class="jq-selectbox__select" style="position: relative">
        <div class="jq-selectbox__select-text" style="text-transform: uppercase;">{{selectedSize || 'Размер'}}</div>
          <div class="jq-selectbox__trigger">
            <div class="jq-selectbox__trigger-arrow"></div>
          </div>
        </div>
        <div v-if="opened" class="jq-selectbox__dropdown" style="position: absolute; height: auto; bottom: 40px; top: auto;">
          <ul style="position: relative; list-style: none; overflow: hidden auto; max-height: 168px;">
            <li class="disabled" @click="selectedSize = null" style="">Размер</li>
            <li
              style="text-transform: uppercase;"
              v-for="size of item.original.sizes"
              :class="selectedSize === size ? 'selected sel' : ''"
              :key="size"
              @click="selectedSize = size"
            >{{size}}</li>
          </ul>
        </div>
    </div>

    <a href="#" class="add-to-cart__btn" @click.prevent="addToBasketNative">Добавить в корзину</a>
  </div>
</template>

<script>
import _ from 'object-get'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'item',
  props: ['item'],
  computed: {
    ...mapState(['wish']),
    isFavorites () {
      return this.wish.includes(this.item.item_id)
    }
  },
  data () {
    return {
      nullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      selectedSize: null,
      opened: false
    }
  },
  methods: {
    ...mapMutations(['addToWish', 'addToBasket']),
    _: _,
    addToBasketNative () {
      this.addToBasket({
        item_id: this.item.item_id,
        quality: this.item.quality,
        size: this.selectedSize,
        count: 1
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      $(document).trigger('ready')
    })
  },
  updated () {}
}
</script>

<style scoped>
</style>
