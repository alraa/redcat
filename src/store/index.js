import Vue from 'vue'
import Vuex from 'vuex'
import * as Api from '@/api'
import axios from 'axios'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  state: {
    token: false,
    menu: true,
    userInfo: [],
    notUserImg: require('@/assets/img/user-secret-solid.svg'),
    nullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
  },

  mutations: {
    toggleMenu (state, status) {
      state.menu = status
    },
    setToken (state, token) {
      state.token = token
      axios.defaults.headers.common['token'] = token // for all requests
      if (process.browser) {
        localStorage.setItem('redCatToken', token)
      }
    },
    logout (state) {
      state.token = false
      if (process.browser) {
        localStorage.removeItem('redCatToken')
      }
      axios.defaults.headers.common['token'] = ''
    },
    getUser (state, user) {
      state.userInfo = user
    }
  },
  actions: {
    loginUser (ctx, form) {
      return Api.loginUser(form)
        .then(res => ctx.commit('setToken', res.token))
    },
    logout (ctx) {
      return ctx.commit('logout')
    },
    uploadFile (ctx, file) {
      return Api.uploadFile(file)
    },
    fetchUser ({commit}) {
      return Api.userInfo()
        .then(res => commit('getUser', res))
    },
    resetPassword ({commit}, data) {
      return Api.resetPassword(data)
    }
  }
})

export default store
