<template>
  <div class="layout__cont inf-order-cont">
    <div class="white-item" v-if="this.allOrders.length">
      <div class="inf-order">
        <slide-images :items="infoItem" :order="infoOrder"/>
        <div class="inf-order__cont">
          <div class="inf-order__attention" v-if="infoItem.status === 'out_of_stock'"><i class="icon-danger"></i></div>
          <div class="inf-order__col inf-order__col_1">
            <ul class="inf-order-list">
              <li class="inf-order-list__item">
                <div class="inf-order-list__title">#Заказа</div>
                <div class="inf-order-list__text">#{{code}}</div>
              </li>
              <li class="inf-order-list__item">
                <div class="inf-order-list__title">Дата создания</div>
                <div class="inf-order-list__text">{{new Date(infoItem.createdAt).toLocaleDateString()}}</div>
              </li>

              <li class="inf-order-list__item">
                <div class="inf-order-list__title">Вес</div>
                <div class="inf-order-list__text">{{`${infoOrder.weight.toLocaleString()} кг.`}}</div>
              </li>
            </ul>
          </div>
          <div class="inf-order__col inf-order__col_2">
            <ul class="inf-order-list">
              <li class="inf-order-list__item">
                <div class="inf-order-list__title">Размеры</div>
                <div class="inf-order-list__text">{{`${infoItem.origin.footSize.toLocaleString()} см.`}}</div>
              </li>
              <li class="inf-order-list__item">
                <div class="inf-order-list__title">Кол-во</div>
                <div class="inf-order-list__text">{{`${count.toLocaleString()} шт.`}}</div>
              </li>
              <li class="inf-order-list__item">
                <div class="inf-order-list__title">Поставщик</div>
                <div class="inf-order-list__text">
                  <img src="img/qr-code-2.png" alt="">
                  <span>{{infoOrder.provider.name}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="inf-order__col inf-order__col_3">
            <ul class="inf-order-list">
              <li class="inf-order-list__item">
                <div class="inf-order-list__title">Трек-код</div>
                <div class="inf-order-list__text">{{`${infoItem.origin.trackNumber}`}}</div>
              </li>
              <order-list-item :name-list="'Себестоимость товара'" v-model="infoOrder.qualities[infoItem.selectedQuality].overprice" @input="updateOrderProduct" :pref="'руб.'"/>
              <li class="inf-order-list__item">
                <div class="inf-order-list__title">Итого</div>
                <div class="inf-order-list__text">{{`${infoItem.origin.onCaptureSumPrice.toLocaleString()} руб.`}}</div>
              </li>
            </ul>
          </div>
          <div class="inf-order__col inf-order__col_4">
            <ul class="inf-order-list">
               <li class="inf-order-list__item">
                <div class="inf-order-list__title">Контактная информация</div>
                <div class="inf-order-list__text">
                  <p>
                    <span>{{infoItem.origin.city}}</span>
                    <span>{{infoItem.origin.address}}</span>
                    <span>{{infoItem.origin.province}}</span>
                    <span>{{infoItem.origin.name}}</span>
                    <span>{{infoItem.origin.email}}</span>
                    <span>{{infoItem.origin.phone}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Slider from '@/mixins/slider.js'
import SlideImages from './SlideImages'
import OrderListItem from './OrderListItem'
import { EventBus } from '@/mixins/event-bus.js'

export default {
  name: 'productSingle',
  deep: true,
  components: { OrderListItem, SlideImages },
  mixins: [Slider],
  data () {
    return {
      toggleTip: false,
      count: 1
    }
  },
  computed: {
    ...mapState('suppliers', ['allOrders', 'itemOrders']),
    infoItem () {
      return this.allOrders.find(id => id._id === this.$route.params.id)
    },
    orderId () {
      return this.allOrders.find(id => id._id === this.$route.params.id).item_id
    },
    infoOrder () {
      return this.itemOrders.items.find(item => item._id === this.orderId)
    },
    code () {
      EventBus.$emit('zak-code', this.infoItem.origin.code)
      return this.infoItem.origin.code
    }
  },
  methods: {
    ...mapActions('suppliers', ['getOrders', 'changeProductStatus', 'getOrdersByIds', 'updateProduct']),
    sortOrders () {
      for (let item in this.statuses) {
        this.statuses[item] = this.allOrders.filter(order => order.status === item)
      }
    },
    updateOrderProduct () {
      this.updateProduct(this.infoOrder)
    },
    // fachOrder () {
    //   this.getOrders()
    //     .then(() => this.getOrdersByIds(this.allOrders.map(id => id.item_id)))
    //     .then(() => this.sortOrders())
    // },
    // updateOrder () {
    //   Api.updateOrder(`growthWeight=${this.infoItem.origin.footSize}`, this.infoOrder._id).then(res => console.log(res))
    // },
    openTip () {
      this.toggleTip = true
    },
    closeTip () {
      this.toggleTip = false
    }
  },
  created () {
    if (!this.allOrders.length) {
      this.$router.push('/supplier')
    } else {
      this.sortOrders()
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
