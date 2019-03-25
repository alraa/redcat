<template>
  <div id="app" class="web">
    <div class="main-wrapper">
      <!-- BEGIN CONTENT -->
      <main class="content">
        <div class="layout" :class="[{'hide-sidebar': !menu }, {'login': !token}]">
          <div v-if="!token" class="login-popup">
          <a href="#" class="logo"><img src="img/logo-light.png" alt=""></a>
          <div class="login-form">
            <i class="icon-padlock"></i>
            <form @submit.prevent="token = true">
              <div class="login-field">
                <label class="login-field__label">Введите e-mail</label>
                <div class="login-field__input">
                  <div class="login-field__icon"><i class="icon-man-user"></i></div>
                  <input type="text" class="login-form-control" placeholder="">
                </div>
              </div>
              <div class="login-field">
                <label class="login-field__label">Введите пароль</label>
                <div class="login-field__input">
                  <div class="login-field__icon"><i class="icon-lock"></i></div>
                  <input type="password" class="login-form-control">
                </div>
              </div>
              <div class="text-center">
                <input type="submit" class="btn btn-dark" value="Войти">
              </div>
            </form>
          </div>
        </div>
          <Aside v-if="token"/>
          <div v-if="token" class="layout__main">
            <Header />
            <router-view/>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/ui/Header'
import Aside from '@/components/ui/Aside'

import { mapState } from 'vuex'

export default {
  name: 'App',
  metaInfo: {
    title: 'ADMIN',
    titleTemplate: '%s | Red Cat STORE'
  },
  components: {
    Header,
    Aside
  },
  data () {
    return {
      token: true
    }
  },
  computed: {
    ...mapState(['menu'])
  }
}
</script>

<style lang="scss">
 @import "@/assets/scss/main.scss";
</style>
