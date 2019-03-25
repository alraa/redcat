import Vue from 'vue'
import Vuex from 'vuex'
import * as Api from '@/api'
import modules from './modules'
import axios from 'axios'
Vue.use(Vuex)

function updateStorage(basket) {
  if (process.browser) {
    localStorage.removeItem('RCS_BASKET')
    localStorage.setItem('RCS_BASKET', JSON.stringify(basket))
  }
}

export function createStore () {
  return new Vuex.Store({
    state: {
      token: false,
      basket: [],
      wish: [],
      showBasket: false
    },
    mutations: {
      setToken(state, token) {
        state.token = token
        axios.defaults.headers.common['token'] = token // for all requests
        if (process.browser) {
          localStorage.setItem('redCatToken', token)
        }
      },

      logout(state) {
        console.log('call')
        state.token = false
        if (process.browser) {
          localStorage.removeItem('redCatToken')
        }
        axios.defaults.headers.common['token'] = ''
      },

      setBasket(state, basket) {
        state.basket = basket
        state.showBasket = true
      },

      updateBasketItemCount(state, {index, count}) {
        state.basket[index].count = count

        updateStorage(state.basket)
      },

      deleteFromBasket(state, index) {
        state.basket.splice(index, 1)

        updateStorage(state.basket)
      },

      addToBasket(state, item) {
        let index = state.basket.findIndex(({item_id, size}) => item_id === item.item_id && size === item.size)

        if(index !== -1) {
          state.basket[index].count++
        } else {
          state.basket.push(item)
        }

        updateStorage(state.basket)
      },

      addToWish(state, item_id) {
        console.log(item_id)
        let index = state.wish.indexOf(item_id)

        if(index === -1) {
          state.wish.push(item_id)
        } else {
          state.wish.splice(index, 1)
        }

        if (process.browser) {
          localStorage.removeItem('RCS_FAV')
          localStorage.setItem('RCS_FAV', JSON.stringify(state.wish))
        }
      },

      setWish(state, wish) {
        state.wish = wish
      },


    },
    actions: {
      loginUser(ctx, form) {
        return Api.loginUser(form)
          .then(res => ctx.commit('setToken', res.token))
      },

      createUser(ctx, form) {
        return Api.createUser(form)
      },

      setBasket(ctx) {
        if (process.browser) {
          let savedBasket = localStorage.getItem('RCS_BASKET') 
          if (savedBasket) {
            ctx.commit('setBasket', JSON.parse(savedBasket))
          }
        }
      },
      
      setWish(ctx) {
        if (process.browser) {
          let savedWish = localStorage.getItem('RCS_FAV') 
          if (savedWish) {
            ctx.commit('setWish', JSON.parse(savedWish))
          }
        }
      }
    },

    modules
  })
}
