import * as Api from '@/api'
export default {
  namespaced: true,

  state: {
    userinfo: {
      personMeta: {
        name: '',
        surname: '',
        patronymic: '',
        city: '',
        index: '',
        address: '',
        birthDate: '',
        growthWeight: '',
        footSize: ''
      }
    },
  },
  mutations: {
    setUserinfo (state, info) {
      state.userinfo = info
    }
  },

  actions: {
    getUserinfo (ctx) {
      return Api.getUserinfo()
        .then(res => ctx.commit('setUserinfo', res))
    }
  }
}
