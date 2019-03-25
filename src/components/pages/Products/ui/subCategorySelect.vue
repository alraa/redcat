<template>
  <div class="box-field" v-click-outside="hideSelect">
    <label class="box-field__label">Подкатегория</label>
    <div class="box-field__input">
      <div class="cust-select cust-select-xs cust-select-right" @click.prevent="open = !open" :class="{'open-select': open}">
        <div class="cust-select-title js-cust-select">
          <span>{{selected.name || ''}}</span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown" @click.stop="">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item" :class="{'active': selected._id === item._id}" v-if="item.category_id === parent" v-for="(item, index) in items" :key="index">
              <a @click.prevent="selected = item" href="#" class="cust-select-list__link">{{item.name}}</a>
              <img class="trash" src="@/assets/img/trash.png" alt="X" @click.prevent="removeSubcategory(item._id)">
            </li>
            <li class="cust-select-list__item" v-if="parent">
              <span class="cust-select-list__link">
                <form @submit.prevent="inCreateSubcategory">
                   <input type="text" v-if="showInput" ref="input" v-model="subcategoryName" class="form-control">
                </form>
                <a href="#" @click.prevent="addSubcategory" v-if="!showInput" style="margin-top: 10px" class="btn-create js-not-select">+ Созать</a>
                <a href="#" @click.prevent="inCreateSubcategory" v-else style="margin-top: 10px" class="btn-create js-not-select">+ Созать</a>
              </span>
            </li>
            <li v-else>
              <p style="margin-left: 10px">Выберите категорию</p>
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
  props: ['items', 'parent', 'def'],
  data () {
    return {
      open: false,
      selected: {},
      showInput: false,
      subcategoryName: ''
    }
  },
  watch: {
    selected: {
      handler (val) {
        if (val) {
          this.open = false
          this.$emit('input', val._id || '')
        }
      }
    },
    def: {
      handler (val) {
        if (val) {
          let index = this.items.map(function (img) { return img._id }).indexOf(val)
          this.selected = this.items[index]
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('products', ['createSubcategory', 'removeSubcategory']),
    inCreateSubcategory () {
      this.createSubcategory({name: this.subcategoryName, category_id: this.parent})
        .then(res => {
          this.subcategoryName = ''
          this.showInput = false
        })
    },
    addSubcategory () {
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
