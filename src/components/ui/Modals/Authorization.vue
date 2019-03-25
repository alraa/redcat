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
                    Вход
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

                <div class="log-form__support-panel">
                    <label class="log-form__remember">
                        <span class="remember__tick"></span>
                        <input type="checkbox" name="remember" id="remember__title" class="remember__checkbox">
                        <label class="remember__title" for="remember__title">
                            Запомнить пароль
                        </label>
                    </label>
                    <!-- <div class="log-form__forgot">
                        <a href="#">
                            Забыли пароль?
                        </a>
                    </div> -->
                </div>

                <div class="log-form__no-account">
                    Нет аккаунта?
                    <a @click.prevent="goReg" href="#">
                        Зарегестрируйтесь
                    </a>
                    сейчас!
                </div>

                <div class="log-form__submit-container">
                    <input type="submit" class="log-form__submit" value="Войти">
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
        showSuccess: false
    }
  },

  methods: {
    ...mapActions(['loginUser']),
    ...mapMutations('modals', ['openModal']),
    ...mapActions('userinfo', ['getUserinfo']),

    submit () {
      this.loginUser(this.form)
        .then(() => {
            this.getUserinfo()
            this.cancel()
        })
    },
    goReg() {
      this.openModal({type: 'registration'})
    }
  }
}
</script>

<style>

</style>
