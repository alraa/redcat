import * as Api from '@/api'
export default {
  namespaced: true,
  state: {
    offers: []
  },
  actions: {
    addOffer(ctx, form) {
      return Api.addOffer(form)
    }
  }
}
