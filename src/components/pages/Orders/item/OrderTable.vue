<template>
    <div class="white-item one-order-item">
        <order-table-filter/>
        <div class="table-list-wrap">
            <div class="table-list-scroll js-scroll-horizont">
                <ul class="table-list table-one-order">
                    <li class="table-list__item table-list__item_title">
                        <div class="col col_1"></div>
                        <div class="col col_2">Фото</div>
                        <div class="col col_3">Код товара</div>
                        <div class="col col_4">Наименование</div>
                        <div class="col col_5">Размеры</div>
                        <div class="col col_6">Вес</div>
                        <div class="col col_7">Цена</div>
                        <div class="col col_8">Кол-во</div>
                        <div class="col col_9">Cебестоимость<br> товара</div>
                        <div class="col col_10">Доставка</div>
                        <div class="col col_11">Доход</div>
                        <div class="col col_12"></div>
                    </li>

                  <orderTableItem v-for="(product, index) in products"
                                  :key="product._id"
                                  :product="product"
                                  :order="order"
                                  :index="index"/>
                </ul>
                <ul class="table-list-total">
                    <li class="table-list-total__item">
                        <i class="icon-right-arrow_1"></i>
                        <div class="table-list-total__title">Итого доход:</div>
                        <div class="table-list-total__number">{{ allPrice.toLocaleString() }}</div>
                    </li>
                    <li class="table-list-total__item">
                        <i class="icon-right-arrow_1 icon-down-arrow"></i>
                        <div class="table-list-total__title">Итого расход:</div>
                        <div class="table-list-total__number">{{ allConsumption.toLocaleString() }}</div>
                    </li>
                  <li class="table-list-total__item">
                    <div class="table-list-total__title">Цена доставки:</div>
                    <div class="table-list-total__number">{{ parseFloat(order.deliveryPrice).toLocaleString() }}</div>
                  </li>
                    <li class="table-list-total__item">
                        <div class="table-list-total__title">Итого прибыль:</div>
                        <div class="table-list-total__number">{{ qualitiesSum.toLocaleString() }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import OrderTableFilter from './OrderTableFilter'
import OrderTableItem from '@/components/pages/Orders/item/OrderTableItem'
import TableSlid from '@/components/pages/Orders/item/TableSlid'
export default {
  name: 'order-table',
  props: {
    products: {
      type: Array,
      default: () => []
    },
    order: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      productSelf: 0
    }
  },
  computed: {
    allPrice () {
      return this.products.reduce((a, b) => a + (b.qualities[b.origin.selectedQuality].site * b.quantity), 0)
    },
    allConsumption () {
      return this.products.reduce((a, b) => a + (b.qualities[b.origin.selectedQuality].overprice * b.quantity), 0)
    },
    qualitiesSum () {
      return this.allPrice - this.allConsumption - this.order.deliveryPrice
    }
  },
  components: { TableSlid, OrderTableItem, OrderTableFilter }
}
</script>
