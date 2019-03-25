<template>
    <div class="select-country" v-click-outside="isHide">
      <div class="select-country__head" v-if="head">{{head}}</div>
        <div class="select-country__value"
             :class="{'open': isOpen}"
             @click.prevent="open">{{ active }}</div>
        <ul class="list-select select-country__list" v-show="isOpen">
            <li class="list-select__item"
                v-for="item in array"
                :key="item.name"
                :class="{'active': value === item.value}"
                @click.prevent="close(item)">{{ item.name }}</li>
        </ul>
    </div>
</template>
<script>
  import '@/assets/css/select-app.css'
  import ClickOutside from 'vue-click-outside'
  export default {
    name: 'select-app',
    props: {
      array: {
        type: Array,
        default: () => []
      },
      value: '',
      head: ''
    },
    data() {
      return {
        isOpen: false,
        active: this.array.find(item => item.value === this.value).name
      }
    },
    methods: {
      open() {
        this.isOpen = true
      },
      close(item) {
        this.isOpen = false
        this.active = item.name
        this.$emit('input', item.value)
      },
      isHide () {
        this.isOpen = false
      }

    },
    mounted () {
      this.popupItem = this.$el
    },
    directives: {
      ClickOutside
    }
  }
</script>

