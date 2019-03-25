import * as Api from '@/api'
export default {
  namespaced: true,

  state: {
    allProducts: [],
    productByAlt: [],
    userBasket: [],
  },
  mutations: {
    setProducts(state, products) {
      state.allProducts = products
    },
    setProductByAlt(state, product) {
      state.productByAlt = product
    }
  },
  actions: {
    getAllProducts(ctx, params) {
      return Api.getProducts(params)
    },
    getProductByAlt(ctx, params) {
      return Api.getProductByAlt(params)
        .then(res => { ctx.commit('setProductByAlt', res) })
    }
  }
}
