<template>
  <div class="layout__cont one-order">
    <div class="top-sales">
      <div class="top-sales__category">
        <div class="scroll scroll-dark js-scroll">
          <ul class="category-list order-list">
            <router-link class="order-list__item" v-for="order in orders" :key="order._id"
                         tag="li"
                         :to="`/order/${order._id}`"
                         :active-class="'active'"
            >
                <a class="order-list__link">
                  <span class="order-list__row">
                    <span class="order-list__number">
                      #R{{order.code}}
                    </span>
                    <span class="order-list__price">
                      {{order.onCaptureSumPrice}} р.
                    </span>
                  </span>
                  <span class="order-list__row">
                    <span class="order-list__name">{{ order.name }}</span>
                    <span class="order-list__date">{{new Date(order.createdAt).toLocaleDateString()}}</span>
                  </span>
                </a>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="top-sales__table">
        <order-table :products="products" :order="order" :products-order="orderProducts"/>
        <div class="user-inf">
          <div class="user-inf__col user-inf__col_1">
            <div class="white-item">
              <div class="user-inf__title-row">
                <div class="user-inf__title">Информация о клиенте</div>
                <div class="user-inf__name">{{order.name}}</div>
              </div>
              <ul class="table-list">
                <li class="table-list__item">
                  <div class="col col_1">Адрес</div>
                  <div class="col col_2">{{order.city}} <br> {{order.address}}</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">Телефон</div>
                  <div class="col col_2"><a :href="`tel:${order.phone}`">{{order.phone}}</a></div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">E-mail</div>
                  <div class="col col_2"><a :href="order.email">{{order.email}}</a></div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">Соц. сети:</div>
                  <div class="col col_2">
                    <ul class="social-list">
                      <li class="social-list__item">
                        <a href="#" class="social-list__link"><i class="icon-vk"></i></a>
                      </li>
                      <li class="social-list__item">
                        <a href="#" class="social-list__link"><i class="icon-instagram-bg"></i></a>
                      </li>
                      <li class="social-list__item">
                        <a href="#" class="social-list__link"><i class="icon-facebook"></i></a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="user-inf__col user-inf__col_2">
            <div class="white-item">
              <div class="user-inf__title-row">
                <div class="user-inf__title">Информация о доставке</div>
                <a href="#" class="user-inf__language"><i class="icon-language"></i></a>
              </div>
              <ul class="table-list">
                <li class="table-list__item">
                  <div class="col col_1">Адрес</div>
                  <div class="col col_2">{{order.city}} <br> {{order.address}}</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">ФИО</div>
                  <div class="col col_2">{{order.name}}</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">Индекс</div>
                  <div class="col col_2">256587</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">Телефон</div>
                  <div class="col col_2"><a :href="`tel:${order.phone}`">{{order.phone}}</a></div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">E-mail</div>
                  <div class="col col_2"><a :href="order.email">{{order.email}}</a></div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">Рост и вес/<br> размер одежды </div>
                  <div class="col col_2">{{order.growthWeight}}см, S</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">Длина стопы/<br> размер обуви</div>
                  <div class="col col_2">{{order.footSize}}см</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="user-inf__col user-inf__col_3">
            <div class="white-item">
              <div class="user-inf__title-row">
                <div class="user-inf__title">Трек - код</div>
              </div>
              <form @submit.prevent="editCodeClose">
                <div v-if="order.deliveryType === 'stdExpress_STANDART' || order.deliveryType === 'stdExpress_EXPRESS'"
                      class="input-edits"
                     @dblclick.prevent="editCodeOpen"
                     :class="{'is-edit':isEditCode}">
                  <i class="input-edits__icon icon-checked" v-if="isEditCode" @click.prevent="editCodeClose"></i>
                  <i class="input-edits__icon icon-edit" v-else  @click.prevent="editCodeOpen"></i>
                  <input
                      ref="trackCode"
                      type="text"
                      :disabled="!isEditCode"
                      class='treck-code-field'
                      v-model="order.trackNumber">
                </div>
                <input v-else
                       :value="order.trackNumber"
                       disabled
                       type="text"
                       class='treck-code-field'>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customScrollbar from '@/mixins/custom-scrollbar'
import OrderTable from './OrderTable'
import ClickOutside from 'vue-click-outside'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'order-item',
  metaInfo () {
    return {
      title: `Заказ #${this.order.code}`
    }
  },
  directives: {
    ClickOutside
  },
  data () {
    return {
      isEditCode: false
    }
  },
  components: { OrderTable },
  mixins: [customScrollbar],
  methods: {
    ...mapActions('orders', ['getOrders', 'ordersId', 'getOrderId', 'getOrderProducts', 'getOrdersByIds', 'updateOrder']),
    getFetch () {
      const options = {
        params: {
          limit: 1000
        }
      }
      this.getOrders(options)
        .then(() => this.getOrderId(this.$route.params.id))
        .then(() => this.getOrderProducts(this.$route.params.id))
        .then(() => this.getOrdersByIds(this.orderProducts.map(id => id.item_id)))
    },
    editCodeOpen () {
      this.isEditCode = true
      setTimeout(() => {
        this.$refs.trackCode.focus()
      }, 30)
    },
    editCodeClose () {
      this.isEditCode = false
      this.updateOrder({data: this.order, id: this.order._id})
    }
  },
  computed: {
    ...mapState('orders', ['orders', 'order', 'orderProducts', 'productsItem', 'productsCount', 'products']),
    products () {
      let array = this.productsItem.filter(item => this.orderProducts.find(el => el.item_id === item._id)) // filter array origin
      return array.map(item => ({
        ...item,
        origin: this.orderProducts.find(el => el.item_id === item._id),
        quantity: this.orderProducts.filter(el => item._id === el.item_id).length
      }))
    }
  },
  watch: {
    '$route.params.id': {
      handler () {
        this.getFetch()
      }
    }
  },
  created () {
    this.getFetch()
  }
}
</script>
<style lang="scss">
  .input-edits {
    display: block;
    position: relative;

    &__icon{
      position: absolute;
      top: 0;
      right: 0;
      color: #222;
      font-size: 10px;
      cursor: pointer;
      opacity: 0;
    }

    &:hover{
      .icon-edit {
        opacity: 1;
      }
    }

    &.is-edit {
      .icon-checked{
        opacity: 1;
      }
      .icon-edit {
        opacity: 0;
      }
    }
  }
</style>
