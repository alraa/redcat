<template>
  <div class="box-field" style="width: 200px;" v-click-outside="close" ref="modal">
    <div class="box-field__input">
      <div class="cust-select cust-select-xs cust-select-right" :class="{'open-select': isOpen}">
        <div class="cust-select-title js-cust-select" @click.prevent="open">
          <span v-if="title">{{title}}</span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown">
          <ul class="cust-select-list">
            <li class="cust-select-list__item ">
              <form @submit.prevent="addSize">
                <input type="text" class="form-control" v-model="value" ref="input">
                <span class="cust-select-list__link">
                  <a href="#" class="btn-create js-not-select" @click.prevent="addSize">+ Созать</a>
                </span>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'select-size',
  props: ['title'],
  data () {
    return {
      active: 'name',
      isOpen: false,
      value: ''
    }
  },
  methods: {
    open () {
      this.isOpen = true
      setTimeout(() => this.$refs.input.focus(), 10)
    },
    close () {
      this.isOpen = false
    },
    addSize () {
      this.$emit('value', this.value)
      this.value = ''
    }
  },
  mounted () {
    this.popupItem = this.$refs.modal
  }
}
</script>

<style scoped>

</style>
