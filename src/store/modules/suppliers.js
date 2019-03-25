import * as Api from '@/api'

export default {
  namespaced: true,
  state: {
    itemOrders: {
      items: []
    },
    allOrders: []
  },
  mutations: {
    setOrders (state, payload) {
      state.allOrders = payload.result.orderedItems
        .map(item => ({ ...item, origin: payload.result.orders.find(id => id._id === item.order_id) }))
        .filter(order => order.origin.paid === true)
    },
    setOrdersIds (state, payload) {
      state.itemOrders = payload.result
    }
  },
  actions: {
    getOrders (ctx) {
      return Api.ordersWith().then(res => ctx.commit('setOrders', res))
    },
    getOrdersByIds (ctx, ids) {
      return Api.getOrdersByIds(ids).then(res => ctx.commit('setOrdersIds', res))
    },
    changeProductStatus (ctx, {order, id, status}) {
      return Api.changeProductStatus(order, id, status)
    },
    updateProduct (ctx, form) {
      return Api.updateProduct(form)
    },
    confirm (ctx, {orderId, itemId}) {
      console.log(orderId, itemId)
      return Api.confirmMessage(orderId, itemId)
    }
  }
}
