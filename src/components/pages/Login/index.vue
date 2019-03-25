<template>
  <main class="content login">
    <div class="login-popup">
      <a href="#" class="logo"><img :src="require('@/assets/img/logo-light.png')" alt=""></a>
      <div class="login-form">
        <i class="icon-padlock"></i>
        <form @submit.prevent="loginForm">
          <div class="login-field">
            <label class="login-field__label">Введите e-mail</label>
            <div class="login-field__input" :class="isEmailValid">
              <div class="login-field__icon"><i class="icon-man-user"></i></div>
              <input type="email" v-model="form.email" required class="login-form-control">
            </div>
          </div>
          <div class="login-field">
            <label class="login-field__label">Введите пароль</label>
            <div class="login-field__input" :class="isPassLimit">
              <div class="login-field__icon"><i class="icon-lock"></i></div>
              <input type="password" v-model="form.password" required class="login-form-control">
            </div>
          </div>
          <div class="text-right">
            <a href="#" class="dark-link">Забыли пароль</a>
          </div>
          <div class="text-center">
            <input type="submit" class="btn btn-dark" value="Войти">
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  metaInfo: {
    title: 'Вход',
    titleTemplate: '%s | Red Cat STORE'
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      /*eslint-disable */
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      /* eslint-enable */
    }
  },

  computed: {
    isEmailValid () {
      return (this.form.email === '') ? '' : (this.reg.test(this.form.email)) ? 'has-success' : 'has-error'
    },
    isPassLimit () {
      return (this.form.password.length === 0) ? '' : (this.form.password.length >= 4) ? 'has-success' : 'has-error'
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    loginForm () {
      if (this.isEmailValid && this.isPassLimit === 'has-success') {
        this.loginUser(this.form)
          .then(() => {
            if (localStorage.getItem('redCatToken') !== null) {
              if (window.history.length) {
                // this.$router.go(-1)
                this.$router.push('/products')
              }
              this.$router.push('/products')
            }
          })
      }
    }
  }
}
</script>

<style scoped>
  .login {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 12;
  }
  .has-error {
    border: 1px solid red;
  }

</style>
