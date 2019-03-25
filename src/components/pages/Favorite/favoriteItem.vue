<template>
  <div class="cataloge-block">
    <div class="cataloge-block__img">
      <div class="privet-bg" :style="{backgroundImage: `url(${image || nullImage})`}"></div>
      <div @click.stop="addToWish(item._id)" class="cataloge-block__heart">
        <img v-if="!wish.some(i => i === item._id)" src="~@/assets/img/heart_bye.png" alt="">
        <img v-else src="~@/assets/img/red-heart.png" alt="">
      </div>
    </div>
    <div class="cataloge-block__info">
      <div class="cataloge-block__info-wrapper">
        <div class="cataloge-block__item name">{{item.name}}</div>
        <div class="cataloge-block__item price"><span>{{item.middlePrice}}</span> руб.</div>
      </div>

      <div class="cataloge-block__item quallity">
        <router-link :to="'/catalog/' + item.alt" class="add-to-cart__btn">Купить</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  props: ['item'],
  data() {
    return {
      image: '',
      nullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
    }
  },
  mounted() {
    for(let quality in this.item.qualities) {

      if(this.item.qualities[quality]) {
        this.image = this.item.qualities[quality].images[0]
        break
      }

    }
  },
  computed: {
    ...mapState(['wish'])
  },
  methods: {
    ...mapMutations(['addToWish'])
  }
}
</script>

<style scoped>

.add-to-cart__btn {
  width: 133px;
  font-size: 12px;
  font-family: "Cuprum";
  color: #3b3b3b;
  opacity: 0.25;
  border: 1px solid #3b3b3b;
  padding: 0px 3px;
  line-height: 28px;
  background: #fff;
  margin-top: 10px;
  cursor: pointer;
}
.cataloge-block:hover .add-to-cart__btn {
  opacity: 1;
  border-width: 2px;
  margin-top: 9px;
  margin-bottom: -1px;
}
.privet-bg {
  height: 260px;
  display: block;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
@media screen and (max-width: 786px) {
  .privet-bg {
    height: 195px;
  }
}
@media screen and (max-width: 419px) {
  .privet-bg {
    height: 122px;
  }
}
</style>

