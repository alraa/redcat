<template>
  <div class="cart-left-block">
    {{item._id}}
    <a @click.prevent="deleteFromBasketNative(index)" href="#" class="cart-left-block__remove">+</a>
    <div class="cart-left-block__img">
      <img :src="item.original.qualities[item.quality].images[0] ? item.original.qualities[item.quality].images[0] : nullImage" alt="" style="width: 85px; height: 85px">
    </div>
    <div class="cart-left-block__item">
      <div class="item__name">{{item.original.name}}</div>
      <div class="item__color">желтый</div>
      <div class="item__size" style="text-transform: uppercase">{{item.size}}</div>
    </div>
    <div class="cart-left-block__amount">
      <div class="dropdwn-cont" @click="showSelect = !showSelect">
        <div class="dropdwn"><span style="white-space: nowrap; text transform: lowercase;">{{selected}} шт</span>
          <ul class="dropdwn__list" v-if="showSelect">
            <li class="dropdwn__item" :class="{'active': n === selected}" v-for="n in 10" :key="n" @click.prevent="setCount(n)">
              <a href="#" style="white-space: nowrap"> {{n}} шт </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="cart-left-block__price">{{item.original.qualities[item.quality].site * this.selected}}<span>руб.</span></div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import numeral from 'numeral'
import * as Api from '@/api'
export default {
  name: 'cardItem',
  props: ['item', 'index'],
  data () {
    return {
      selected: 0,
      nullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      selectedQuality: 'high',
      showSelect: false
    }
  },
  mounted () {
    this.selected = this.item.count
  },
  watch: {
    selected (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    ...mapActions('card', ['updateCard']),
    ...mapMutations('card', ['setCardItemCount']),
    ...mapMutations(['deleteFromBasket', 'updateBasketItemCount']),
    setCount (n) {
      this.selected = n
      this.updateBasketItemCount({
        index: this.index,
        count: n
      })
    },
    deleteFromBasketNative (index) {
      this.$emit('remove', index)
      this.deleteFromBasket(index)
    }
  },
  computed: {
    ...mapState('nav_info', ['categories', 'subcategories', 'brands', 'colors'])
  }
}
</script>

<style scoped>

</style>
