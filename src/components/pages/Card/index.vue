<template>
  <div class="mycart cart-scroll">

    <div class="cataloge-nav-wrapper">
      <div class="wrapper">
        <div class="help__header">Моя корзина</div>
      </div>
    </div>

    <breadcrumb :info="[{name: 'Моя корзина', link: false}]"/>

    <div>
      <div class="wrapper">
        <div class="cart__header cart__header_scroll">Моя корзина</div>
        <div class="cart-wrapper">
          <div class="cart-left cart-left_cart-scroll" v-if="basket.length">
            <cardItem v-for="(item, index) in items" @remove="items.splice($event, 1)" v-model="items[index].count" :item="item" :index="index" :key="index" />
          </div>

          <div class="cart_bottom-block">
            <div class="cart_bottom-block__img">
              <span class="icon-delivery-truck icon icon_black"></span>
            </div>
            <div class="cart_bottom-block__text">
              <div class="cart_bottom-block__header">БЕСПЛАТНАЯ ДОСТАВКА ПОЧТОЙ</div>
              <div class="cart_bottom-block__descr">от <span>8,000</span> руб</div>
            </div>
          </div>

          <div class="cart_bottom-block">
            <div class="cart_bottom-block__img">
              <span class="icon-arrow-circle icon icon_black"></span>
            </div>
            <div class="cart_bottom-block__text">
              <div class="cart_bottom-block__header">14 дней</div>
              <div class="cart_bottom-block__descr">для того, чтобы вернуть товар</div>
            </div>
          </div>

        </div>
        <div class="cart-right">
          <div class="cart-right__header">Итого</div>
          <div class="cart-right__total">
            <div class="cart-right__total-text">Всего:</div>
            <div class="cart-right__total-amount"><span>
              {{items.reduce((acc, item) => acc + item.count * item.original.qualities[item.quality].site, 0)}}
            </span> руб</div>
          </div>
          <div class="cart-right__delivery">
            <div class="cart-right__delivery-header">Доставка</div>
            <div class="dropdwn-cont dropdwn-cont_delivery" @click="showSelect = !showSelect">
              <div class="dropdwn"><span>{{deliveryTypes[selectedDelivery].name}}</span>
                <ul class="dropdwn__list" v-if="showSelect">
                  <li class="dropdwn__item" :class="{'active': selectedDelivery === key}" @click.prevent = "setSelectedDelivery(key)" v-for="({name}, key) in deliveryTypes" :key=key>
                    <a href="#">{{name}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul class="delivery-list">
            <li class="delivery-list__item">Цена рассчитывается в зависимости от веса</li>
            <li v-if="selectedDelivery" class="delivery-list__item">Срок доставки {{deliveryTypes[selectedDelivery].days}} дней</li>
            <li class="delivery-list__item">Доставка почтой</li>
            <li class="delivery-list__item">Помимо доставки пару дней занимает оформление заказа</li>
          </ul>
          <div class="cart-right__button">
            <router-link v-if="token" to="/cart/submit" class="button">Оплатить</router-link>
            <a v-else @click.prevent="openModal({type: 'authorization'})" href="#" class="button">Авторизация</a>
          </div>

          <div class="creditcard-icons__header">Мы принимаем:</div>
          <div class="creditcard-icons">

            <div class="creditcard-icons__item">
              <img src="~@/assets/img/creditcard_icon_1.png" alt="">
            </div>

            <div class="creditcard-icons__item">
              <img src="~@/assets/img/creditcard_icon_2.png" alt="">
            </div>

            <div class="creditcard-icons__item">
              <img src="~@/assets/img/creditcard_icon_3.png" alt="">
            </div>

            <div class="creditcard-icons__item">
              <img src="~@/assets/img/creditcard_icon_4.png" alt="">
            </div>

            <div class="creditcard-icons__item">
              <img src="~@/assets/img/creditcard_icon_5.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="youMightLike.length" class="you-can-like you-can-like_card">
      <div class="wrapper">
        <div class="bye-look__header">ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ</div>
        <div class="megalike-slider-wrapper">
          <div class="megalike-slider js-megalike-slider">
            <router-link v-for="item of youMightLike" :key="item._id" :to="'/catalog/' + _(item, 'original.alt')" class="bye-look__block">
              <div class="bye-look__img">
                <img :src="_(item, `original.qualities[${item.quality}].images[0]`) || nullImage" alt>
                <div class="bye-look__heart">
                  <img src="~@/assets/img/heart_bye.png" alt>
                </div>
              </div>
              <div class="bye-look__item name">{{item.original.name}}</div>
              <div class="bye-look__item price" v-if="_(item, `original.qualities[${item.quality}].site`)">
                <span>{{_(item, `original.qualities[${item.quality}].site`)}}</span> руб.
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!--
    <div class="cart-scroll-favorite">
      <div class="you-can-like you-can-like_cart favorite">
        <div class="wrapper">
          <div class="bye-look__header bye-look__header_cart">
            ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ
          </div>
          <div class="megalike-slider-wrapper">
            <div class="megalike-slider megalike-slider_mod js-megalike-slider">

              <router-link v-for="n in 7" :key="n" to="/catalog/item" class="bye-look__block">
                <div class="bye-look__img">
                  <img src="~@/assets/img/bye_man.png" alt="">
                  <div class="bye-look__heart">
                    <img src="~@/assets/img/heart_bye.png" alt="">
                  </div>
                </div>
                <div class="bye-look__item name">Рубашка Polo</div>
                <div class="bye-look__item price"><span>4 800</span> руб.</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import numeral from 'numeral'
import _ from 'object-get'
import cardItem from './cardItem'
import * as Api from '@/api'
// import shopItemVue from '../Shop/shopItem.vue'
export default {
  name: 'index',
  components: {
    cardItem
  },
  data () {
    return {
      showSelect: false,
      items: [],
      // totalPrice: 0,
      youMightLike: [],
      nullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
    }
  },
  computed: {
    ...mapState('card', ['deliveryTypes', 'selectedDelivery', 'totalPrice']),
    ...mapState(['basket', 'showBasket', 'token'])
  },
  watch: {
    // items: {
    //   handler() {
    //     let res = 0
    //     this.items.map(i => {
    //       res += i.count * i.original.qualities[i.quality].site
    //     })
    //     this.totalPrice = res
    //   },
    //   deep: true,
    // }
  },
  mounted () {
    this.$nextTick(() => {
      $(document).trigger('ready')
      if (this.basket.length) {
        this.setBasketList()
      }
    })
  },
  methods: {
    _: _,
    log: console.log,
    // ...mapActions('card', []),
    ...mapMutations('card', ['setSelectedDelivery']),
    ...mapMutations('modals', ['openModal']),
    setBasketList () {
      // this.getCard()
      let inBasketIds = this.basket.map(item => item.item_id)

      // console.log({ inBasketIds })

      Api.getProductsByIds(inBasketIds)
        .then(({ items }) => {
          // console.log({ items })

          this.items = items.map(item => ({ ...this.basket.find(i => i.item_id === item._id), original: item }))

          let youMightLikeItems = items
            .map(item => item.youMightLike)
            .reduce((acc, items) => [...acc, ...items], [])
            .reduce((acc, item) =>
              acc.find(_item => _item.item_id === item.item_id) ? acc : [...acc, item], [])

          // console.log({ youMightLikeItems })

          // console.log('counting ids')

          let youMightLikeIds = youMightLikeItems
            .map(item => item.item_id)

          // console.log({ youMightLikeIds })

          Api.getProductsByIds(youMightLikeIds)
            .then(({ items }) => {
              // console.log({ items })
              this.youMightLike = youMightLikeItems.reduce((acc, item) => {
                let original = items.find(o => o._id === item.item_id)
                // console.log('original:', original)
                return original ? [...acc, { item, original }] : acc
              }, [])

              this.$nextTick(() => {
                $(document).trigger('ready')
              })
            })
            .catch(err => { console.log(err) })
        })
        .catch(err => { console.log(err) })
    }
  }
}
</script>

<style scoped>
.delivery-list {
  padding: 15px 0 0 20px;
}
.delivery-list__item {
  padding: 3px 0;
}
</style>
