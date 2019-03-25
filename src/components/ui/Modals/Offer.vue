<template>
  <div class="order-popup popup" id="js-order-popup">
    <div class="popup__overlay"></div>
    <div class="popup__cont">
      <div class="popup__wrap">
        <div class="order-popup__header">Вы успешно заказали товар!</div>
        <div class="order-popup__img">
          <img src="~@/assets/img/bag_icon.png" alt="">
        </div>
        <div class="order-popup__text">Вы можете оплтить заказ на <b>"Яндекс Кассе"</b></div>
        <a :href="modal.data" target="_blank" class="order-popup__btn" @click="cancel">Оплатить</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    modal: [Object, Boolean],
    success: Function,
    cancel: Function
  },

  data () {
	  return {
		  form: {
        fullname: '',
		    phone: ''
      },
      showSuccess: false
	  }
  },

  methods: {
    ...mapActions(['postCallbackForm']),

    submit () {
      this.postAuthorizationForm(this.form)
        .then(() => {
          this.showSuccess = true
        })
    }
  }
}
</script>

<style>

</style>
