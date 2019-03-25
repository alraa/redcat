<template>
    <li class="table-list__item" :class="itemClass" v-click-outside="closeChecked">
        <div class="col col_1">{{parseInt(index) + 1}}</div>
        <div class="col col_2">
          <table-slid :images="qualities.images"/>
        </div>
        <div class="col col_3">{{product.code}}</div>
        <div class="col col_4">{{product.name}}</div>
        <div class="col col_5">
            <a href="#" class="black-link js-tip" v-if="product.origin.selectedSize">{{product.origin.selectedSize.toUpperCase()}} размеров</a>
        </div>
        <div class="col col_6">{{product.weight}} г.</div>
        <div class="col col_7">{{qualities.site.toLocaleString()}} р.</div>
        <div class="col col_8" @dblclick="openChecked">
            <input type="text"
                   class="change-input"
                   v-model="product.quantity"
                   @keyup.enter="closeChckod"
                   ref="input"
                   :disabled="!isChecked" />
        </div>
        <div class="col col_9">{{qualities.overprice.toLocaleString()}} р.</div>
        <div class="col col_10">{{delivery}}</div>
        <div class="col col_11">{{sum}} .р</div>
        <div class="col col_12">
            <ul class="order-links">
                <li class="order-links__item order-links__item_edit" @click.prevent="openChecked">
                    <a href="#"
                       class="order-links__link js-edit-row">
                        <i class="icon-edit"></i>
                    </a>
                </li>
                <li class="order-links__item order-links__item_save" @click.prevent="closeChecked">
                    <a href="#" class="order-links__link js-save-row">
                        <i class="icon-checked"></i>
                    </a>
                </li>
                <li class="order-links__item">
                    <a href="#" class="order-links__link">
                        <i class="icon-close-not-radius"></i>
                    </a>
                </li>
            </ul>
        </div>
      <a href="#" class="one-order-warning" @click.prevent="confirmMessage"><i class="icon-danger"></i><span>Сообщить об отсутствии товара</span></a>
    </li>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import TableSlid from '@/components/pages/Orders/item/TableSlid'
import { mapActions } from 'vuex'
export default {
  name: 'orderTableItem',
  components: { TableSlid },
  directives: {
    ClickOutside
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    order: {
      type: Object,
      default: () => {}
    },
    index: 0
  },
  data () {
    return {
      isChecked: false
    }
  },
  computed: {
    qualities () {
      return this.product.qualities[this.product.origin.selectedQuality]
    },
    delivery () {
      return this.order.deliveryType.length > 14 ? `${this.order.deliveryType.slice(0, 14)}... ` : this.order.deliveryType
    },
    itemClass () {
      return {
        'edit-row': this.isChecked,
        'one-order-disabled': this.product.origin.status === 'out_of_stock'
      }
    },
    sum () {
      return (parseFloat(this.qualities.site) * this.product.quantity) - (parseFloat(this.qualities.overprice) * this.product.quantity)
    }
  },
  methods: {
    ...mapActions('suppliers', ['confirm']),
    openChecked () {
      this.isChecked = true
      setTimeout(() => {
        this.$refs.input.focus()
      }, 10)
    },
    closeChecked () {
      this.isChecked = false
      this.$emit('input', this.$refs.input.value)
    },
    confirmMessage () {
      this.confirm({orderId: this.product.origin.order_id, itemId: this.product.origin._id})
    }
  }
}
</script>
<style scoped>
    .change-input {
      max-width: 100%;
      cursor: pointer;
    }
    .one-order-warning {
      display: none;
    }
    .one-order-disabled .one-order-warning {
      display: block;
    }
</style>
