import * as Api from '@/api'
export default {
  namespaced: true,
  state: {
    orders: [],
    order: {},
    orderProducts: [],
    productsItem: [],
    productsCount: [],
    products: [],
    totalsPages: 0,
    limit: 10,
    currentPage: 0
  },
  mutations: {
    getOrders (state, payload) {
      state.orders = payload.result
      // .filter(order => order.statusHistory.length)
      state.totalsPages = payload.total
    },
    ordersId (state, payload) {
      state.order = payload
    },
    getOrderId (state, payload) {
      state.orderId = payload
    },
    productsOrder (state, payload) {
      state.orderProducts = payload.orderedItems
    },
    productsItem (state, payload) {
      state.productsItem = payload
    },
    checkLimit (state, payload) {
      state.limit = payload
    },
    checkCurrentPage (state, payload) {
      state.currentPage = payload
    }
  },
  actions: {
    getOrders (ctx, options) {
      Api.getOrder(options)
        .then(res => ctx.commit('getOrders', res))
    },

    getOrderId (ctx, id) {
      Api.getOrderId(id)
        .then((res) => ctx.commit('ordersId', res.result))
    },
    getOrderProducts (ctx, id) {
      Api.getOrderProducts(id)
        .then(res => ctx.commit('productsOrder', res.result))
    },
    getOrdersByIds (ctx, ids) {
      Api.getOrdersByIds([])
        .then((res) => ctx.commit('productsItem', res.result.items))
    },
    updateOrder (ctx, {data, id}) {
      Api.updateOrder(data, id)
    }
  }
}
