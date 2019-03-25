<template>
  <div class="cataloge-block">
    <div @click.stop="addToWish(item._id)" class="cataloge-block__heart">
      <img v-if="!wish.some(i => i === item._id)" src="~@/assets/img/heart_bye.png" alt="">
      <img v-else src="~@/assets/img/red-heart.png" alt="">
    </div>
    <router-link :to="'/catalog/' + item.alt" class="cataloge-block__img">
      <!--<img :src="getImage" alt="No image available">-->
      <span class="cataloge-block__bg" :style="{ backgroundImage: `url(${getImage})` }"></span>
      <!--<span class="cataloge-block__bg" :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1546015720-e7171de00439?ixlib=rb-1.2.1)' }"></span>-->
    </router-link>
    <div class="cataloge-block__info">
      <div class="cataloge-block__detail cataloge-detail">
        <div class="cataloge-detail__item">
          <router-link :to="'/catalog/' + item.alt" class="cataloge-block__item name">{{item.name}}</router-link>
        </div>
        <div class="cataloge-detail__item">
          <div class="cataloge-block__item9 price"><span>{{_(item, `qualities[${selectedQual}].site`)}}</span> руб.</div>
        </div>
      </div>
      <div class="cataloge-block__detail cataloge-block__detail_right cataloge-detail">
        <div class="cataloge-detail__item">
          <div class="cataloge-block__item text">Соотношение цена/качество</div>
        </div>
        <div class="cataloge-detail__item">
          <div class="cataloge-block__item quallity">
        <span v-if="item.qualities.middle">
          <input type="radio" :id="'qual_1' + item._id" v-model="selectedQual" value="middle" >
          <label :for="'qual_1' + item._id">Среднее
            <span class="tooltip">
              Среднее качетсво - оптимальный выбор при ограниченом бюджете
            </span>
          </label>
        </span>
        <span v-if="item.qualities.high">
          <input type="radio" :id="'qual_2' + item._id" v-model="selectedQual" value="high" >
          <label :for="'qual_2' + item._id">Высокое
            <span class="tooltip">
                Высокое качетсво - лучшее соотношение цена - качество
              </span>
          </label>
        </span>
        <span v-if="item.qualities.premium">
          <input type="radio" :id="'qual_3' + item._id" v-model="selectedQual" value="premium" >
          <label :for="'qual_3' + item._id">Премиум
            <span class="tooltip">
                Премиум качетсво - безкомпромисная подборка материалов и лучший контроль качества
              </span>
          </label>
        </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral'
import _ from 'object-get'
import { returnStatement } from 'babel-types'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'shopItem',
  props: ['item'],
  data () {
    return {
      selectedQual: 'middle',
      nullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
    }
  },
  computed: {
    ...mapState(['wish']),
    getImage () {
      let url = _(this.item, `qualities[${this.selectedQual}].images[0]`)
      return !url || this.nullImage
    }
  },
  watch: {
    selectedQual () {
      // console.log('selected qual changed')
    }
  },
  methods: {
    ...mapMutations(['addToWish']),
    _: _,
    aaa (id) {
      this.addToWish(id)
    },
    setDefaultQuality () {
      this.selectedQual = _(this, `item.qualities.middle.site`) ? 'middle' : _(this, `item.qualities.high.site`) ? 'high' : 'premium'
    }
  },
  created () {
    this.setDefaultQuality()
  }
}
</script>

<style scoped>
  .cataloge-block__detail {

  }
  .cataloge-block__detail_right {
    text-align: right;
  }

  .cataloge-detail {
    max-width: 47%;

  }

  .cataloge-detail:first-child {
    max-width: 38%;
  }

  .cataloge-detail:last-child {
    max-width: 62%;
  }

  .cataloge-detail__item {

  }

  .cataloge-detail__item:first-child {
    margin-bottom: 17px;
  }

  .cataloge-block__item {
    display: inline;
    word-break: break-all;
  }

  .cataloge-block__bg {
    display: block;
    width: 100%;
    height: 311px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }

  @media screen and (max-width: 1023px) {
    .cataloge-detail {
      max-width: 100%;
    }

    .cataloge-block__bg {
      display: block;
      width: 100%;
      height: 250px;
    }

    .cataloge-block__info {
      display: block;
    }

    .cataloge-block__detail_right {
      text-align: left;
    }

    .cataloge-detail__item{
      margin-bottom: 14px;
    }
  }

  @media screen and (max-width: 767px) {

    .cataloge-block__bg {
      height: 200px;
    }
  }

  @media screen and (max-width: 580px) {
    .cataloge-block__bg {
      height: 122px;
    }
  }

  .cataloge-block__heart {
    z-index: 9999;
    top: 25px;
    right: 13px;
  }
</style>
