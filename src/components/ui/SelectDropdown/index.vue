<template>
  <div class="cust-select cust-select-sm" v-click-outside="close">
    <div class="cust-select-title js-cust-select" @click.prevent="toggleSelect">
      <span>{{isActive}}</span>
      <i class="icon-bottom-arrow"></i>
    </div>
    <div class="cust-select-dropdown" :style="{display: isOpen ? 'block': 'none'}">
      <ul class="cust-select-list js-select-list">
        <li class="cust-select-list__item"
            v-for="select in selects"
            :key="select"
            :class="{active: select === isActive}">
          <a href="#" class="cust-select-list__link" @click.prevent="checkSelect(select)">{{select}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-dropdown',
  props: {
    selects: {
      type: Array,
      default: () => []
    },
    active: ''
  },

  data () {
    return {
      isOpen: false,
      isActive: this.active
    }
  },
  methods: {
    toggleSelect () {
      this.isOpen = !this.isOpen
    },
    checkSelect (select) {
      this.isActive = select
      this.$emit('check-select', select)
      this.toggleSelect()
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>

<style scoped>
.cust-select-dropdown {
  z-index: 2;
}
</style>
