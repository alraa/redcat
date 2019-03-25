<template>
  <li class="supplier-list__item">
    <div class="supplier-list__title">
      <div class="supplier-list__name" :class="'supplier-list__name_' + (index + 1) ">
        <span v-if="name === 'new'">Новый</span>
        <span v-else-if="name === 'process'">В обработке</span>
        <span v-else-if="name === 'agreed'">Согласован</span>
        <span v-else-if="name === 'paid'">Оплачен</span>
        <span v-else-if="name === 'out_of_stock'">Нет в наличии</span>
        <span v-else-if="name === 'sent'">Отправлен</span>
        <span v-else-if="name === 'canceled'">Отменен</span>
      </div>
      <div class="supplier-list__row">
        <span class="supplier-list__product">
          <i class="icon-shopping-bag-2"></i>
          <span>{{status.length}} товаров</span>
        </span>
        <span class="supplier-list__price">
          <i class="icon-banknote"></i>
          <span>{{totalPrice}} руб.</span>
        </span>
      </div>
    </div>
    <div class="supplier-order" :data-name="name">
      <productItem v-for="order in status" :item="order" :key="order._id"/>
    </div>
  </li>
</template>

<script>
import productItem from './productItem'
import {mapState} from 'vuex'
export default {
  name: 'statusField',
  components: {
    productItem
  },
  props: {
    status: {
      type: Array,
      default: () => []
    },
    name: {
      type: String
    },
    index: {
      type: Number
    }
  },
  computed: {
    ...mapState('suppliers', ['itemOrders']),
    info () {
      return this.status.map(item => this.itemOrders.items.find(id => id._id === item.item_id))
    },
    totalPrice () {
      return this.status.map((item, index) => this.info[index].qualities[item.selectedQuality].overprice).reduce((a, b) => a + b, 0)
    }
  }
}
</script>

<style scoped>
  .supplier-order {
    height: 100%;
  }
</style>
