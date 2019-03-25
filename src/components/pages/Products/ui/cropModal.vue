<template>
  <div class="modal">
    <div class="form">
      <div class="close" @click.prevent="$emit('close')">+</div>
      <vue-croppie 
        ref="croppieRef"
        :enableOrientation="true"
        @result="result"
      >
      </vue-croppie>
      <button style="margin-top: 55px" class="btn-big-black" @click.prevent="submit()">Обрезать</button>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api'
export default {
  props: ['img', 'id'],

  mounted() {
    this.$refs.croppieRef.bind({
      url: this.img,
    })
  },
  data() {
    return {
      res: ''
    }
  },

  created() {
    var img = new Image()
    let vm = this
    img.onload = function() {
      vm.imageWidth = this.width
      vm.imageHeight = this.height
      let el = document.getElementsByClassName('croppie-container')[0]
      el.style.width = (this.width > 500 ? 500 : this.width) + 'px'
      el.style.height = (this.height > 500 ? 500 : this.height) + 'px'
    }
    img.src = this.img
  },

  methods: {
    submit() {
      this.$refs.croppieRef.result();
    },

    result(output) {
      Api.uploadFile64({base64: output.split(',')[1] })
        .then((res) => {
          this.$emit('update', {link : res.link, index: this.id})
        })
    },
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
    max-width: 600px;
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

