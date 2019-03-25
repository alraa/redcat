export default {
  namespaced: true,

  state: {
    list: []
  },

  mutations: {
    clearModal (state) {
      state.list = []
    },
    openModal (state, config) {
      state.list.push(config)
    },

    closeModal (state, index) {
      state.list.splice(index, 1)
    }
  }
}
