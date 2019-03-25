<template>
  <div class="box-field">
    <label class="box-field__label">Цвет</label>
    <div class="box-field__input">
      <div @click.prevent="open = !open" class="cust-select cust-select-xs" :class="{'open-select': open}">
        <div class="cust-select-title js-cust-select">
          <span>{{list.length ? 'Выбранно цветов: ' + list.length : 'Выберете Цвет(a)'}}</span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown" @click.stop="open = true">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item" :class="{'active': list.indexOf(item._id) + 1}" v-for="(item, index) in items" :key="index">
              <a @click.prevent="addItem(item._id)" href="#" class="cust-select-list__link">{{item.name}}</a>
              <img class="trash" src="@/assets/img/trash.png" alt="X" @click.prevent="inRemoveColor(item._id)">
            </li>
            <li class="custom-add">
              <a href="#" class="cust-select-list__link" @click.prevent="$emit('showAlert')">Добавить Цвет</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'customSelect',
  props: ['items', 'def'],
  data () {
    return {
      open: false,
      selected: [],
      list: [],
    }
  },
  methods: {
    ...mapActions('products', ['removeColor']),
    addItem(id) {
      let index = this.list.indexOf(id) 
      if(index + 1) {
        this.list.splice(index, 1)
      } else {
        this.list.push(id)
      }
    },
    inRemoveColor(id) {
      this.removeColor(id)
        .then(() => {
          let index = this.list.indexOf(id)
          if( index + 1 ) {
            this.list.splice(index, 1)
          }
        })
    }
  },
  watch: {
    list: {
      handler(val) {
         this.$emit('input', val)
      },
      immediate: true
    },
    /*selected: {
      handler(val) {
        if(val) {
          this.open = false
          this.$emit('input', val._id || '')
        }
      },
    },*/
    def: {
      handler(val) {
        if(val) {
          this.list = val
        }
        
      },
      immediate: true
    },
  },
}
</script>

<style scoped lang="scss">
.custom-add {
  text-align: center;
  a{
    font-weight: bold;
    padding: 10px;
    font-size: 12px;
  }
}

.cust-select-list__item {
    position: relative;
  }
.trash {
    padding: 1px;
    position: absolute;
    right: 10px;
    top: 4px;
    height: 11px;
    cursor: pointer;
    &:hover {
      transform: rotate(10deg);
    }
  }
.nowrap {
    white-space: nowrap;
  }
</style>
