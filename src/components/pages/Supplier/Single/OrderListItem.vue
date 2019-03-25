<template>
    <li class="inf-order-list__item" :class="{'edit-row': isChecked}" v-click-outside="closeChckod">
        <div class="inf-order-list__title">
            <span>{{nameList}}</span>
            <ul class="order-links">
                <li class="order-links__item order-links__item_edit">
                    <a href="#" class="order-links__link js-edit-row" @click.prevent="openChecked">
                      <i class="icon-edit"></i>
                    </a>
                </li>
                <li class="order-links__item order-links__item_save">
                    <a href="#" class="order-links__link js-save-row" @click.prevent="closeChckod">
                      <i class="icon-checked"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="inf-order-list__text" @dblclick="openChecked">
            <input type="text" class="change-input" :value="values" @keyup.enter="closeChckod" :disabled="!isChecked" ref="input">
        </div>
    </li>
</template>
<script>
import ClickOutside from 'vue-click-outside'
export default {
  name: 'order-list-item',
  directives: {
    ClickOutside
  },
  props: {
    nameList: '',
    value: '',
    pref: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isChecked: false
    }
  },
  computed: {
    values: {
      get () {
        return `${this.$props.value} ${this.pref}`
      },
      set (newValue) {
        this.value = newValue
      }
    }
  },
  methods: {
    openChecked () {
      this.isChecked = true
      setTimeout(() => {
        this.$refs.input.focus()
        this.$refs.input.value = this.value
      }, 10)
    },
    closeChckod () {
      if (this.isChecked === true) {
        this.isChecked = false
        this.$emit('input', parseFloat(this.$refs.input.value))
      }
    }
  }
}
</script>
