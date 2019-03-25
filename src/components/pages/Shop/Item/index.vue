<template>
  <div class="goods-item">
    <banner/>
    <breadcrumb
      :info="bread"
    />

    <div class="goods-item-wrapper goods-item-wrapper_card">
      <div class="wrapper wrapper_card">
        <div class="goods-right__code goods-right__code_mob">
          Код товара:
          <span>415-10</span>
        </div>
        <div class="goods-right__header goods-right__header_mob">Рубашка Polo</div>
        <div class="goods-slider">
          <div class="goods-left-wrapper">
            <div class="goods-slider__nav">
              <a
                v-for="n in productByAlt.qualities[activeQuality].images || []"
                :key="n"
                href="#"
                @click.prevent="setImage(n)"
                class="goods-left__img"
                :class="{'active': activeImage === n}"
              >
                <!-- TODO: add class active here, nado 4tob rabotalo normalno -->
                <!--<img :src="n" alt>-->
                <span class="goods-slider__bg" :style="{backgroundImage: `url(${n})`}"></span>
                <div class="goods-left_hover"></div>
              </a>
            </div>
            <div
              v-if="productByAlt.qualities[activeQuality].video"
              class="goods-left__youtube"
              :style="{ backgroundImage: `url(https://img.youtube.com/vi/${parseYlink(productByAlt.qualities[activeQuality].video)}/0.jpg)` }"
            >
              <a href="#" @click.prevent="showVideo" >
                <img src="~@/assets/img/youtube.png" alt>
              </a>
            </div>
            <!-- <div class="goods-left__rotate">
              <div class="rotator"></div>
            </div>-->

            <div class="goods-left__nav">
              <div class="goods-left__arrow left"></div>
              <div class="goods-left__arrow right"></div>
            </div>
          </div>

            <div class="goods-slider__img">
              <div class="goods-img-wrapper active">

                <div v-if="mainDisplay == 'img' && activeImage" class="goods-img-wrapper__img" :style="{backgroundImage: `url(${activeImage})`}"></div>

                <img v-if="mainDisplay == 'img'&& !activeImage" :src="nullImage" >
                <div v-if="mainDisplay == 'video'">
                  <youtube style="width: 100%" :video-id="videoId" ref="youtube" @playing="true"></youtube>
                </div>
              </div>
            </div>

        </div>
        <div class="goods-right-wrapper">
          <div class="goods-right__code">
            Код товара:
            <span>{{ productByAlt.code }}</span>
          </div>
          <div class="goods-right__header">{{ productByAlt.name }}</div>
          <div class="goods-right__subheader">{{ productByAlt.shortDescription }}</div>
          <form action="send.php" method="post">
            <div class="goods-right__charact-wrapper">
              <div class="goods-right__item goods-right__item_color">
                <div class="goods-right__color">
                  <span>Цвет:</span>
                  <span v-for="color_id in productByAlt.color_ids" :key="color_id">
                    <div class="goods-right-color" :style="'background-color:' + colors.find(color => color._id === color_id).hex + ';'"></div>
                    {{colors.find(color => color._id === color_id).name}}
                  </span>

                </div>
                <a
                  href="#"
                  @click.prevent="openModal({type: 'chart'})"
                  class="goods-right__size-link goods-right__size-link_card"
                >Таблица размеров</a>
              </div>
              <div class="goods-right__item goods-right__item_quality">
                <div class="cataloge-block__item quallity card" v-if="productByAlt.qualities">
                  <div class="goods-right__size-head">Выберите качество:</div>

                  <fieldset
                    v-for="(quality, key, index) in productByAlt.qualities"
                    :key="index"
                    class="fieldset-qualities"
                  >
                    <input
                      type="radio"
                      :id="key"
                      name="quality"
                      :checked="key === activeQuality ? 'checked' : false"
                      :value="key"
                      @click="changeQuality"
                    >
                    <label :for="key">{{qualities[key]}}</label>
                  </fieldset>
                </div>

                <div class="goods-right__size-wrapper clearfix">
                  <div class="goods-right__size-head near-check">Выберите к-во:</div>
                  <div data-v-1a71789b="" class="goods-right__size-check modify">
                    <div class="jq-number">
                      <div class="jq-number__field"><input v-model.number="productCount" type="number" value="1" min="0" max="40"></div>
                      <div class="jq-number__spin minus" @click="productCount -= 1"></div>
                      <div class="jq-number__spin plus" @click="productCount += 1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="productByAlt.sizes.length" class="goods-right__item goods-right__item_size">
                <div class="goods-right__size">
                  <div class="goods-right__size-title-mob"></div>
                  <div class="goods-right__size-head">Размер:</div>
                  <div class="goods-right__size-head goods-right__size-head_mob">Выберите размер:</div>
                  <div class="dropdwn-cont dropdwn-cont_min">
                    <div class="dropdwn" @click.prevent="openSizeSelect = !openSizeSelect">
                      <span>{{selectedSize}}</span>
                      <ul v-show="openSizeSelect" class="dropdwn__list">
                        <li
                          class="dropdwn__item"
                          v-for="(size, index) in productByAlt.sizes"
                          :key="index"
                          :class="selectedSize === size ? 'active': ''"
                          @click.prevent="selectedSize = size"
                        >
                          <a href="#" @click.prevent="">{{size}}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="goods-right__price goods-right__price">
                  <span>{{productByAlt.qualities[activeQuality].site * productCount}}</span> руб
                  <a href="#" class="red-heart red-heart_mob">
                    <img src="~@/assets/img/red-heart.png" alt>
                    <!-- <img src="~@/assets/img/red-heart_2.png" alt=""> -->
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="goods-right-wrapper_bottom">
          <a
            href="#"
            @click.prevent="openModal({type: 'calc'})"
            class="goods-right__size-know"
          >Узнайте, какой размер подходит покупателям с вашими параметрами</a>
          <div class="goods-right-btn-wrapper">
            <a @click.stop="addToWish(productByAlt._id)" href="#" class="red-heart">
              <img v-if="!wish.some(i => i === productByAlt._id)" src="~@/assets/img/red-heart_2.png" alt="">
              <img v-else src="~@/assets/img/red-heart.png" alt="">
            </a>
            <a href="#" class="add-to-cart__btn" @click.prevent="addToBasketNative()">Добавить в корзину</a>
            <!-- <a href="#" class="do-order__btn">Добавлено</a> -->
          </div>
        </div>
      </div>

      <no-ssr>
        <div class="tab-wrap js-tab-wrap">
          <ul class="nav-tab-list js-tabs">
            <li class="nav-tab-list__item active">
              <a href="#tab_1" class="nav-tab-list__link">О товаре</a>
            </li>

            <!-- <li class="nav-tab-list__item ">
              <a href="#tab_2" class="nav-tab-list__link ">Уход</a>
            </li>-->
          </ul>
          <div class="box-tab-cont">
            <!-- about goods -->
            <div class="tab-cont js-tab-cont" id="tab_1">
              <div class="goods-right__description">{{productByAlt.fullDescription}}</div>
            </div>

            <!-- care about -->
            <div class="tab-cont js-tab-cont hide" id="tab_2">
              <div
                class="goods-right__description"
              >{{productByAlt.fullDescription}}</div>
            </div>
          </div>
        </div>
      </no-ssr>

    </div>

    <div v-if="images.length" class="bye-look">
      <div class="wrapper">
        <div class="bye-look__header">КУПИТЬ ОБРАЗ</div>

        <no-ssr>
          <div class="megalike-slider-wrapper">
            <div class="bye-look-wrapper">
              <div class="bye-look-slider js-bye-look">

                <imageCarouselItem v-for="item in images" :key="item._id" :item="item" />

              </div>
            </div>
          </div>
        </no-ssr>

      </div>
    </div>
    <div v-if="youMightLike.length" class="you-can-like you-can-like_card">
      <div class="wrapper">
        <div class="bye-look__header">ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ</div>
        <div class="megalike-slider-wrapper">

          <no-ssr>
            <div class="megalike-slider js-megalike-slider">
              <router-link v-for="item of youMightLike" :key="item._id" :to="'/catalog/' + item.original.alt" class="bye-look__block">
                <div class="bye-look__img">
                  <img :src="_(item, `original.qualities[${item.quality}].images[0]`) || nullImage" alt>
                </div>
                <div class="bye-look__item name">{{item.original.name}}</div>
                <div class="bye-look__item price" v-if="_(item, `original.qualities[${item.quality}].site`)">
                  <span>{{_(item, `original.qualities[${item.quality}].site`)}}</span> руб.
                </div>
              </router-link>
            </div>
          </no-ssr>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import parseYlink from 'get-youtube-id'
import _ from 'object-get'
import * as Api from '@/api'
import imageCarouselItem from './imageCarouselItem'
export default {
  name: 'index',
  components: {
    imageCarouselItem
  },
  data () {
    return {
      activeImage: null,
      activeQuality: 'middle',
      productCount: 1,
      selectedSize: '',
      openSizeSelect: false,
      qualities: {
        high: 'Высокое',
        middle: 'Среднее',
        premium: 'Премиум'
      },
      nullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      mainDisplay: 'img',
      videoId: '',
      youMightLike: [],
      images: [],
      bread: []
    }
  },
  watch: {
    '$route' () {
      this.onCreated()
    }
  },
  // created () {
  //   console.log('created-1')
  //   let alt = this.$route.params.alt
  //   this.getAllColors()
  //   this.getProductByAlt(alt)
  //     .then((res) => {
  //       this.bread = []
  //       if (res.items.category_id) {
  //         this.bread.push({ link: false, name: res.items.category_id })
  //       }
  //       if (res.items.subcategory_id) {
  //         this.bread.push({ link: false, name: res.subcats[res.subcats.findIndex(i => i._id === res.subcategory_id)].name })
  //       }
  //       this.setQuality()
  //       this.setFirstQualityImage()
  //
  //       let ids = []
  //
  //       this.productByAlt.images.filter(item => item.item_id).map(item => ids.push(item.item_id))
  //       this.productByAlt.youMightLike.filter(item => item.item_id).map(item => ids.push(item.item_id))
  //
  //       // console.log(this.productByAlt.images)
  //       // console.log(this.productByAlt.youMightLike)
  //       // console.log(ids)
  //
  //       if (ids.length) {
  //         Api.getProductsByIds(ids)
  //           .then(({ items }) => {
  //             const imagesReducer = (acc, val) => {
  //               let original = items.find(item => item._id === val.item_id)
  //               // TODO: valid existing items
  //               if (original !== null) acc.push({ ...val, original, selectedSize: original.sizes.length ? original.sizes[0] : null })
  //               return acc
  //             }
  //
  //             this.images = [...this.productByAlt.images.reduce(imagesReducer, [])]
  //             this.youMightLike = this.productByAlt.youMightLike.reduce(imagesReducer, []).filter(item => _(item, `original.qualities[${item.quality}].site`))
  //
  //             this.$nextTick(() => $(document).trigger('ready')) // Огненный привет верстальщикам
  //           })
  //           .catch(err => err)
  //       }
  //     })
  // },
  created () {
    this.onCreated()
  },
  mounted () {
    this.$nextTick(() => {
      $(document).trigger('ready')
    })
  },
  computed: {
    ...mapState('shop', ['productByAlt']),
    ...mapState('nav_info', ['colors']),
    ...mapState(['wish']),
    player () {
      return this.$refs.youtube.player
    }
  },
  methods: {
    ...mapMutations('modals', ['openModal']),
    ...mapMutations(['addToBasket', 'addToWish']),
    ...mapActions('shop', ['getProductByAlt']),
    ...mapActions('card', ['addItemToBasket']),
    ...mapActions('nav_info', ['getAllColors']),
    _: _,
    onCreated () {
      this.images = []
      this.youMightLike = []

      let alt = this.$route.params.alt
      // alert('alt: ' + alt)
      this.getAllColors()
      this.getProductByAlt(alt)
        .then(() => {
          this.setQuality()
          this.setFirstQualityImage()

          let ids = []

          this.productByAlt.images.filter(item => item.item_id).map(item => ids.push(item.item_id))
          this.productByAlt.youMightLike.filter(item => item.item_id).map(item => ids.push(item.item_id))

          // console.log(this.productByAlt.images)
          // console.log(this.productByAlt.youMightLike)
          // console.log(ids)

          if (ids.length) {
            Api.getProductsByIds(ids)
              .then(({ items }) => {
                const imagesReducer = (acc, val) => {
                  let original = items.find(item => item._id === val.item_id)
                  // TODO: valid existing items
                  if (original !== null) acc.push({ ...val, original, selectedSize: original.sizes.length ? original.sizes[0] : null })
                  return acc
                }

                this.images = [...this.productByAlt.images.reduce(imagesReducer, [])]
                this.youMightLike = this.productByAlt.youMightLike.reduce(imagesReducer, []).filter(item => _(item, `original.qualities[${item.quality}].site`))

                this.$nextTick(() => $(document).trigger('ready')) // Огненный привет верстальщикам

              // setInterval(() => {
              //   try {
              //     console.log('ready')
              //     $(document).trigger("ready")
              //   } catch(err) {
              //     console.log('error')
              //   }
              // }, 1000)
              })
              .catch(err => err)
          }
        })
    },
    parseYlink: parseYlink,
    changeQuality (e) {
      this.activeQuality = e.target.value
    },
    addToBasketNative () {
      if (_(this, 'productByAlt.sizes.length') && !this.selectedSize) { return alert('Выберите размер!') }
      this.addToBasket({
        item_id: this.productByAlt._id,
        quality: this.activeQuality,
        size: this.selectedSize,
        count: this.productCount
      })
      alert('Добавлено')
    },
    setQuality () {
      this.activeQuality = _(this.productByAlt, `qualities[middle].site`) ? 'middle' : _(this.productByAlt, `qualities[high].site`) ? 'high' : 'premium'
    },
    setFirstQualityImage () {
      let img = _(this.productByAlt, `qualities[${this.activeQuality}].images[0]`)
      this.setImage(img)
    },
    setImage (url) {
      this.mainDisplay = 'img'
      this.activeImage = url
      // this.activeImage = url || this.nullImage
    },
    async playVideo () {
      await this.player.playVideo()
      this.setFirstQualityImage()
    },
    showVideo () {
      this.videoId = this.productByAlt.qualities[this.activeQuality].video
      if (this.videoId) {
        this.videoId = parseYlink(this.videoId)
        this.mainDisplay = 'video'
      }
    }
  }
}
</script>

<style lang="scss">
  .fieldset-qualities {
    display: inline-flex
  }

  .goods-left__arrow .left{
    background: url('~@/assets/img/left-arrow-spr.png') no-repeat 50% 100%
  }

  .goods-left__arrow .right{
    background: url('~@/assets/img/right-arrow-spr.png') no-repeat 50% 100%
  }

  .goods-left__youtube {
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-color: black;
  }

  .goods-slider__nav {
    width: 100%;
  }

  .goods-img-wrapper__img {
    display: block;
    max-width: 480px;
    height: 480px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .goods-left__img {
    border: 2px solid transparent;
    overflow: hidden;
  }

  .goods-slider__bg {
    width: 60px;
    height: 60px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: block;
  }

  .goods-right__description,
  .goods-item .goods-right-wrapper .goods-right__subheader {
    word-wrap: break-word;
  }
  .dropdwn-cont_min {
    width: auto;
    min-width: 80px;
    .dropdwn {
      padding-right: 30px;
      &-cont {
        width: auto;
        min-width: 80px;
      }
      &__list{
        width: auto;
        min-width: calc(100% + 2px);
      }
    }
  }

</style>
