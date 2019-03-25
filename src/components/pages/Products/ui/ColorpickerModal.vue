<template>
  <div class="modal">
    <form class="form" @submit.prevent="submitColor()">
      <div class="close" @click.prevent="$emit('close')">+</div>
      <label class="box-field__label">Название</label>
      <div class="box-field__input">
        <input style="margin-bottom: 15px" v-model="form.name" required type="text" class="form-control">
      </div>
      <photoshop-picker v-model="color" />
      <button class="btn-big-black">Добавить</button>
    </form>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import { mapActions } from 'vuex'

export default {
  components: {
    'photoshop-picker': Chrome
  },
  data () {
    return {
      color: {hex: '#000000'},
      form: {
        hex: '',
        name: ''
      }
    }
  },

  watch: {
    color: {
      handler (val) {
        this.form.hex = val.hex
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('products', ['createColor']),

    submitColor () {
      this.createColor(this.form)
        .then(res => this.$emit('close'))
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999999999;
  display: flex;
  left: 0;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0, 0.8);
  .form {
    position: relative;
    max-width: 400px;
    padding: 10px;
    background: #fff;
    .close {
      cursor: pointer;
      width: 20px;
      height: 20px;
      font-size: 20px;
      text-align: center;
      color: red;
      transform: rotate(45deg);
      position: absolute;
      border-radius: 50%;
      background: #fff;
      top: -10px;
      right: -10px;
    }
  }
}
</style>
