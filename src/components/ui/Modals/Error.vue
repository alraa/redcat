<template>
  <div class="number-success-popup popup">
    <div class="popup__overlay"></div>
    <div class="popup__cont">
      <div class="popup__wrap popup-center">
        <div class="number-success-popup__close" @click="cancel">х</div>
        <!--<div class="number-success-popup__img">-->
          <!--<img src="img/popup-success_img.svg" alt="">-->
        <!--</div>-->
        <div class="number-success-popup__title">{{modal.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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

<style scoped>
.popup-center {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
}
</style>
