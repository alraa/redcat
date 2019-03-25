<template>
  <div class="main-login__log-popup popup">
    <div class="popup__overlay"></div>
    <div class="popup__cont">
      <div class="popup__wrap">
        <div class="popup__close" @click="cancel">
          <i class="icon-close-popup"></i>
        </div>
        <form @submit.prevent="submit" class="main-login__log-form">
          <div class="log-form__title">
            Регистрация нового пользователя
          </div>

          <div class="log-form__input-container">
            <label class="log-form__input-label">
              Введите e-mail
            </label>
            <input type="text" v-model="form.email" class="log-form__input log-form__input-email" name="email" required="" placeholder="Email...">
          </div>

          <div class="log-form__input-container">
            <label class="log-form__input-label">
              Введите пароль
            </label>
            <input type="password" v-model="form.password" class="log-form__input log-form__input-password" name="email" required="" placeholder="********">
            <i class="log-form__icon fa-eyes"></i>
          </div>

          <div class="log-form__input-container">
            <label class="log-form__input-label">
              Повторите пароль
            </label>
            <input type="password" v-model="rePassword" class="log-form__input log-form__input-password" name="email" required="" placeholder="********">
            <i class="log-form__icon fa-eyes"></i>
          </div>

          <div class="log-form__submit-container">
            <input type="submit" class="log-form__submit" value="Создать">
          </div>
        </form>
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
          email: '',
          password: ''
        },
        rePassword: '',
        showSuccess: false
      }
    },

    methods: {
      ...mapActions(['createUser']),

      submit () {
        this.createUser(this.form)
          .then((res) => {
            this.cancel()
            alert(res.message)
          })
      }
    }
  }
</script>

<style>

</style>
