<template>
  <div class="box-field">
    <label class="box-field__label">Подактегория</label>
    <div class="box-field__input">
      <div @click.prevent="open = !open" class="cust-select cust-select-xs" :class="{'open-select': open}">
        <div class="cust-select-title js-cust-select">
          <span>{{selected.name || ''}}</span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item" :class="{'active': selected._id === item._id}" v-if="item.category_id === parent" v-for="(item, index) in items" :key="index">
              <a @click.prevent="selected = item" href="#" class="cust-select-list__link">{{item.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'customSelect',
    props: ['items', 'parent', 'def'],
    data () {
      return {
        open: false,
        selected: {}
      }
    },
    mounted() {
      if(this.def) {
        this.$emit('input', this.def || '')
      }
    },
    watch: {
      selected: {
        handler(val) {
          if(val) {
            this.open = false
            this.$emit('input', val._id || '')
          }
        },
      },
      def: {
        handler(val) {
          if(val) {
            let index = this.items.map(function (img) { return img._id; }).indexOf(val);
            this.selected = this.items[index]
          }
          
        },
        immediate: true
      },
    },
  }
</script>

<style scoped>

</style>
