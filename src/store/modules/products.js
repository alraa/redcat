import * as Api from '@/api'
export default {
  namespaced: true,

  state: {
    productCategories: [],
    productSubCategories: [],
    productBrands: [],
    allProducts: [],
    totalsPages: 0,
    colors: [],
    limit: 10,
    currentPage: 0
  },

  mutations: {
    setCategories (state, categories) {
      state.productCategories = []
      state.productCategories = categories
    },
    setSubCategories (state, categories) {
      state.productSubCategories = categories
    },
    setBrands (state, brands) {
      state.productBrands = brands
    },
    setAllProducts (state, products) {
      state.allProducts = products
    },
    setTotalProductsCount (state, total) {
      state.totalsPages = total
    },
    setColors (state, colors) {
      state.colors = colors
    },
    checkLimit (state, payload) {
      state.limit = payload
    },
    checkCurrentPage (state, payload) {
      state.currentPage = payload
    }
  },
  actions: {
    getCategories (ctx) {
      return Api.getCategories()
        .then(res => ctx.commit('setCategories', res))
    },

    getSubCategories (ctx) {
      return Api.getSubCategories()
        .then(res => ctx.commit('setSubCategories', res))
    },

    getBrands (ctx) {
      return Api.getBrands()
        .then(res => ctx.commit('setBrands', res))
    },

    createProduct (ctx, form) {
      return Api.createProduct(form)
    },

    updateProduct (ctx, form) {
      return Api.updateProduct(form)
    },

    createSubcategory (ctx, name) {
      return Api.createSubcategory(name)
        .then(res => ctx.dispatch('getSubCategories'))
    },

    removeSubcategory (ctx, _id) {
      if (confirm('Удалить подкатегорию?')) {
        return Api.removeSubcategory(_id)
          .then(res => ctx.dispatch('getSubCategories'))
      }
    },

    createBrand (ctx, name) {
      return Api.createBrand(name)
        .then(res => ctx.dispatch('getBrands'))
    },

    removeBrand (ctx, _id) {
      if (confirm('Удалить бренд?')) {
        return Api.removeBrand(_id)
          .then(res => ctx.dispatch('getBrands'))
      }
    },

    getColors (ctx) {
      return Api.getColors()
        .then(res => ctx.commit('setColors', res))
    },

    createColor (ctx, form) {
      return Api.createColor(form)
        .then(res => ctx.dispatch('getColors'))
    },

    removeColor (ctx, _id) {
      if (confirm('Удалить цвет?')) {
        return Api.removeColor(_id)
          .then(res => ctx.dispatch('getColors'))
      }
    },

    getAllProducts (ctx, searchQuery) {
      return Api.getAllProducts(searchQuery)
        .then(res => {
          ctx.commit('setAllProducts', res.items)
          ctx.commit('setTotalProductsCount', res.total)
        })
    },

    getAllProductsForSelect (ctx, params) {
      return Api.getAllProductsForSelect(params)
    },

    getProductById (ctx, id) {
      return Api.getProductById(id)
    }
  }
}
