import * as Api from '@/api'
export default {
  namespaced: true,
  state: {
    allUsers: [],
    userToEdit: [],
    edit: false
  },
  mutations: {
    setEditUser (state, userData) {
      state.userToEdit = userData
    },
    setAllUsers (state, users) {
      state.allUsers = users
    },

    setEdit (state, status) {
      state.edit = status
    },
    clearEdit (state) {
      state.userToEdit = []
    }

  },
  actions: {
    getAllUsers (ctx) {
      return Api.getAllUsers()
        .then(res => ctx.commit('setAllUsers', res))
    },
    deleteUser (ctx, id) {
      return Api.deleteUser(id)
        .then(() => {
          ctx.commit('setEdit')
          ctx.commit('clearEdit')
        })
    },
    createNewUser (ctx, form) {
      return Api.createUser(form)
    }
  }
}
