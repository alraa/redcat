import * as Api from '@/api'
export default {
  namespaced: true,

  state: {
    card: [],
    deliveryTypes: {
      stdExpress_EXPRESS: {
        name: 'STD + CDEK Эксресс',
        days: '6-10'
      },
      stdExpress_STANDART: {
        name: 'STD + CDEK Стандарт',
        days: '12- 18'
      },
      ePacket: {
        name: 'ePacket',
        days: '10-20'
      },
      ems: {
        name: 'EMS',
        days: '7-20'
      },
      dhl: {
        name: 'DHL',
        days: '3-5'
      },
      postNl: {
        name: 'PostNl',
        days: '10-20'
      }
    },
    selectedDelivery: 'stdExpress_EXPRESS',
    totalPrice: 0
  },
  mutations: {
    setCard(state, card) {
      state.card = card
      state.totalPrice = 0
      for (let item of card) {
        state.totalPrice += item.price * item.count
      }
    },

    setSelectedDelivery(state, type) {
      state.selectedDelivery = type
    },

    setCardItemCount(state, { index, count }) {
      state.card[index].count = count
    }
  },

  actions: {
    getCard(ctx) {
      return Api.getCard()
        .then(res => ctx.commit('setCard', res))
    },

    deleteCardItem(ctx, id) {
      return Api.deleteCardItem(id)
        .then(res => ctx.dispatch('getCard'))
    },

    updateCard(ctx) {
      return Api.updateCard(ctx.state.card)
        .then(res => ctx.dispatch('getCard'))
    },

    addItemToBasket(ctx, params) {
      // return Api.addItemToBasket(params)
      // .then(res => ctx.dispatch('getCard'))

      if (process.browser) {
        let b = localStorage.getItem('redcatbasket')

        let basket = b ? JSON.parse(b) : []

        let index = basket.findIndex(({ item_id, size }) => item_id === params.item_id && size === params.size)

        if (index !== -1) {
          basket[index].count++
        } else {
          basket.push(params)
        }

        localStorage.setItem('redcatbasket', JSON.stringify(basket))
      }
      // let basket
    },
  }
}
