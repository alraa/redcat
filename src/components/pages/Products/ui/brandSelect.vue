<template>
  <div class="box-field" v-click-outside="hideSelect">
    <label class="box-field__label">Бренд</label>
    <div class="box-field__input">
      <div class="cust-select cust-select-xs cust-select-right" @click.prevent="open = true" :class="{'open-select': open}">
        <div class="cust-select-title js-cust-select">
          <span>{{list.length ? 'Выбранно брендов: ' + list.length : 'Выберете бренд(ы)'}}</span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item" :class="{'active': list.indexOf(item._id) + 1}" v-for="(item, index) in items" :key="index">
              <a @click.prevent="addItem(item._id)" href="#" class="cust-select-list__link">{{item.name}}</a>
              <img class="trash" src="@/assets/img/trash.png" alt="X" @click.prevent="inRemoveBrand(item._id)">
            </li>
            <li class="cust-select-list__item">
              <span class="cust-select-list__link">
                <form @submit.prevent="inCreateSubcategory">
                   <input type="text" ref="input" v-if="showInput" v-model="subcategoryName" class="form-control">
                </form>
                <a href="#" @click.prevent="addBrand" v-if="!showInput" style="margin-top: 10px" class="btn-create js-not-select">+ Созать</a>
                <a href="#" @click.prevent="inCreateSubcategory" v-else style="margin-top: 10px" class="btn-create js-not-select">+ Созать</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ClickOutside from 'vue-click-outside'
export default {
  name: 'customSelect',
  props: ['items', 'def'],
  data () {
    return {
      open: false,
      selected: {},
      showInput: false,
      subcategoryName: '',
      list: []
    }
  },
  watch: {
    list: {
      handler (val) {
        this.$emit('input', val)
      },
      immediate: true
    },
    def: {
      handler (val) {
        if (val) {
          this.list = val
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('products', ['createBrand', 'removeBrand']),
    inCreateSubcategory () {
      this.createBrand({name: this.subcategoryName})
        .then(res => {
          this.subcategoryName = ''
          this.showInput = false
        })
    },
    addItem (id) {
      let index = this.list.indexOf(id)
      if (index + 1) {
        this.list.splice(index, 1)
      } else {
        this.list.push(id)
      }
    },
    inRemoveBrand (id) {
      this.removeBrand(id)
        .then(() => {
          let index = this.list.indexOf(id)
          if (index + 1) {
            this.list.splice(index, 1)
          }
        })
    },
    addBrand () {
      this.showInput = !this.showInput
      setTimeout(() => this.$refs.input.focus(), 0)
    },
    hideSelect () {
      this.open = false
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

<style lang="scss" scoped>
  .cust-select-list__item {
    position: relative;
  }
  .trash {
    padding: 2px;
    position: absolute;
    right: 10px;
    top: 6px;
    height: 16px;
    cursor: pointer;
    &:hover {
      transform: rotate(10deg);
    }
  }
  .nowrap {
    white-space: nowrap;
  }
</style>
