<template>
    <div class="user" :class="{'open-nav': isOpenUser}" v-click-outside="close" v-if="!loading">
        <div class="user-title" @click.prevent="toggleUserInfo">
            <div class="user-title__img">
              <img :src="notUserImg" :alt="userInfo.personMeta.name">
            </div>
            <div class="user-title__name">{{userInfo.personMeta.name}}</div>
            <div class="user-title__icon"><i class="icon-bottom-arrow"></i></div>
        </div>
        <ul class="user-nav" @click.prevent="toggleUserInfo">
            <li class="user-nav__item">
                <a href="#" class="user-nav__link" @click.prevent="passwordReset">Сменить пароль</a>
            </li>
            <li class="user-nav__item">
                <a href="#" class="user-nav__link" @click.prevent="logoUt">Выход</a>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'userInfo',
  data () {
    return {
      isOpenUser: false,
      loading: true
    }
  },
  computed: {
    ...mapState(['userInfo', 'notUserImg'])
  },
  methods: {
    ...mapActions(['logout', 'fetchUser', 'resetPassword']),
    toggleUserInfo () {
      this.isOpenUser = !this.isOpenUser
    },
    logoUt () {
      this.logout()
      this.$router.push('/login')
    },
    close () {
      this.isOpenUser = false
    },
    passwordReset () {
      this.resetPassword({email: this.userInfo.email})
    }
  },
  mounted () {
    this.fetchUser()
      .then(() => { this.loading = false })
  }
}
</script>
<style scoped>
  .user-title__img img{
    height: 100%;
  }
</style>
