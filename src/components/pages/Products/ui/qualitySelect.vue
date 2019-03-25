<template>
  <div class="box-field box-field-last">
    <label class="box-field__label">Качество</label>
    <div class="box-field__input box-field__input_flex">
      <div class="cust-select cust-select-xs" @click.prevent="open = !open" :class="{'open-select': open}">
        <div class="cust-select-title js-cust-select">
          <span><span>{{selected || ''}}</span></span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item" :class="{'active': selected === item}"  v-for="(item, index) in items" :key="index">
              <a @click.prevent="selected = item" href="#" class="cust-select-list__link">{{item}}</a>
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
  name: 'qualitySelect',
  props: ['def'],
  data () {
    return {
      open: false,
      selected: '',
      items: ['middle', 'high', 'premium']
    }
  },
  watch: {
    selected: {
      handler (val) {
        if (val) {
          this.open = false
          this.$emit('input', val || '')
        }
      }
    },
    def: {
      handler (val) {
        if (val) {
          let index = this.items.map(function (img) { return img }).indexOf(val)
          this.selected = this.items[index]
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
