<template>

  <div class="track-code-popup popup">
    <div class="popup__overlay"></div>
    <div class="popup__cont" v-click-outside="cancel">
      <div class="popup__wrap">
        <div class="popup__close">
          <i class="icon-close-popup" @click="cancel"></i>
        </div>
        <div class="track-code-popup__info">
          <div class="track-code-popup__title">{{modal.title}}</div>
          <div v-html="JSON.parse(modal.text)"></div>
        </div>
        <div class="track-code-popup__img">
          <img :src="modal.url" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Help',
  props: {
    modal: [Object, Boolean],
    success: Function,
    cancel: Function
  },
  data () {
    return {
      isOpen: false
    }
  }
}
</script>
