import * as Api from '@/api'
export default {
  namespaced: true,

  state: {
    categories: [],
    subcategories: [],
    brands: [],
    colors: [],
  },
  mutations: {
    setCategories(state, data){
      state.categories = data
    },
    setSubcategories(state, data){
      state.subcategories = data.reverse()
    },
    setBrands(state, data){
      state.brands = data.reverse()
    },
    setColors(state, data){
      state.colors = data
    }
  },
  actions: {
    getAllCategories(ctx) {
      return Api.getCategories()
        .then(res => {
          ctx.commit('setCategories', res)
        })
    },
    getAllSubcategories(ctx) {
      return Api.getSubcategories()
        .then(res => ctx.commit('setSubcategories', res))
    },
    getAllBrands(ctx) {
      return Api.getBrands()
        .then(res => ctx.commit('setBrands', res))
    },
    getAllColors(ctx) {
      return Api.getColors()
        .then(res => ctx.commit('setColors', res))
    },
  },
}
