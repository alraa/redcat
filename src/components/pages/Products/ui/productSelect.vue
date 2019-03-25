<template>
  <div class="box-field box-field-last">
    <label class="box-field__label">Товар</label>
    <div class="box-field__input box-field__input_flex">
      <div class="cust-select cust-select-xs" @click.prevent="open = !open" :class="{'open-select': open}">
        <div class="cust-select-title js-cust-select">
          <span><span>{{(selected ? selected.name : 'Не выбрано')}}</span></span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item" :class="{'active': (selected && (selected._id === item._id))}"  v-for="(item, index) in items" :key="index">
              <a @click.prevent="selected = item" href="#" class="cust-select-list__link">{{item.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'productSelect',
  props: ['category', 'subCategory', 'def'],
  data () {
    return {
      open: false,
      selected: null,
      sort: {
        category_id: '',
        subcategory_id: ''
      },
      items: []
    }
  },
  watch: {
    category: {
      handler (val) {
        this.sort.category_id = val || ''
      },
      immediate: true
    },
    subCategory: {
      handler (val) {
        this.sort.subcategory_id = val || ''
      },
      immediate: true
    },
    sort: {
      handler (val) {
        let sortLink = '?'
        for (let field in val) {
          if (val[field]) {
            sortLink += field + '=' + val[field] + '&'
          }
        }
        let res = sortLink.slice(0, -1)
        this.getAllProductsForSelect(res)
          .then(res => { this.items = res.items })
      },
      deep: true,
      immediate: true
    },
    selected: {
      handler (val) {
        if (val) {
          this.open = false
          this.$emit('input', val._id || '')
          this.$emit('product', this.selected.qualities)
        }
      }
    },
    def: {
      handler (val) {
        if (val) {
          setTimeout(() => {
            let index = this.items.map(img => img._id).indexOf(val)
            this.selected = this.items[index]
            console.log(this.items)
          }, 500)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('products', ['getAllProductsForSelect'])
  }
}
</script>

<style scoped>

</style>
