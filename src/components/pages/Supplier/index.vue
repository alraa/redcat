<template xmlns:v-drag-and-drop="http://www.w3.org/1999/xhtml">
  <div class="layout__cont table-list-scroll">
    <div class="supplier js-scroll-horizont">
      <div>
        <ul class="supplier-list" v-drag-and-drop:options="optionsDrop">
          <statusField v-for="(status, key, index) in statuses" :index="index" :status="status" :name="key" :key="status._id"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import statusField from './statusField'
import customScrollBar from '@/mixins/custom-scrollbar.js'
export default {
  name: 'Supplier',
  metaInfo: {
    title: 'Поставщики',
    titleTemplate: '%s | Red Cat STORE'
  },
  components: {statusField},
  mixins: [customScrollBar],
  data () {
    const self = this
    return {
      statuses: {
        new: [],
        process: [],
        // agreed: [],
        // paid: [],
        out_of_stock: [],
        sent: [],
        canceled: []
      },
      orderIds: [],
      orderItem: [],
      optionsDrop: {
        dropzoneSelector: 'li.supplier-list__item .supplier-order',
        draggableSelector: 'div.supplier-order__item',
        onDragend (event) {
          if (event.owner.dataset.name === 'sent') {
            event.stop()
            return
          }
          if (event.droptarget.dataset.name === 'sent') {
            if (!window.confirm('Обратно нельзя перетащить')) {
              event.stop()
              return
            }
          }
          const orderItem = {
            order: event.items[0].dataset.order,
            id: event.items[0].dataset.id,
            status: event.droptarget.dataset.name
          }
          self.changeProductStatus(orderItem).then(() => self.fachOrder())
        }
      }
    }
  },
  computed: {
    ...mapState('suppliers', ['allOrders', 'itemOrders'])
  },
  methods: {
    ...mapActions('suppliers', ['getOrders', 'changeProductStatus', 'getOrdersByIds']),
    sortOrders () {
      for (let item in this.statuses) {
        this.statuses[item] = this.allOrders.filter(order => order.status === item) // && order.origin.paid === true
      }
    },
    fachOrder () {
      this.getOrders()
        .then(() => this.getOrdersByIds(this.allOrders.map(id => id.item_id)))
        .then(() => this.sortOrders())
    }
  },
  created () {
    if (!this.allOrders.length) {
      this.fachOrder()
    } else {
      this.sortOrders()
    }
  }
}
</script>

<style>
.supplier-list__item:hover .supplier-order {
  box-shadow: 0 0 0 !important;
  border-color: transparent !important;
}
.supplier-list {
  margin: 5px 0 103px;
}
</style>
