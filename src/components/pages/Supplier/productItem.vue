<template>
  <div class="supplier-order__item" :data-id="item._id" :data-order="item.order_id">
    <div class="supplier-order__cont">
      <div class="supplier-order__title">
        <span>#R{{item.origin.code}}</span>
        <span>{{fullName}}</span>
      </div>
      <div class="supplier-order-name">
        <router-link :to="`/supplier/${item._id}`" class="supplier-order-name__img" :style="{backgroundImage: `url(${img})`}"></router-link>
        <div class="supplier-order-name__col">
          <span>{{info.name}}</span>
        </div>
      </div>
      <ul class="supplier-order-characteristic">
        <li class="supplier-order-characteristic__item">
          <span>Доставка:</span>
          <span>{{delivery}}</span>
        </li>
        <li class="supplier-order-characteristic__item">
          <span>Себестоимость:</span>
          <span>{{overprice}} руб.</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'productItem',
  props: ['item'],
  computed: {
    ...mapState('suppliers', ['allOrders', 'itemOrders']),
    ...mapState(['nullImage']),
    info () {
      return this.itemOrders.items.find(id => id._id === this.item.item_id)
    },
    img () {
      return this.info.qualities[this.item.selectedQuality].images[0] || this.nullImage
    },
    fullName () {
      return this.info.provider.name.length >= 12 ? `${this.info.provider.name.slice(0, 12)}...` : this.info.provider.name
    },
    delivery () {
      return this.item.origin.deliveryType.length >= 14 ? `${this.item.origin.deliveryType.slice(0, 14)}...` : this.item.origin.deliveryType
    },
    quality () {
      return this.item.selectedQuality
    },
    overprice () {
      return this.info.qualities[this.quality].overprice
    }
  }
}
</script>

<style scoped>
.supplier-order-name__img {
  width: 25px;
  height: 25px;
  display: block;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.supplier-order__item {
  cursor: grab;
}
.supplier-order__item:focus {
  cursor: grabbing;
}
</style>
