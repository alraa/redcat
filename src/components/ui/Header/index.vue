<template>
  <div>
    <div class="layout__main-overlay js-hide-sidebar"></div>
    <div class="layout__title layout__title_header">
      <header>
        <div class="cust-select">
          <div class="cust-select-title js-cust-select">
            <span>Red Cat Store (опт)</span>
            <i class="icon-bottom-arrow"></i>
          </div>
          <div class="cust-select-dropdown">
            <ul class="cust-select-list js-select-list">
              <li class="cust-select-list__item">
                <a href="#" class="cust-select-list__link">Red Cat Store (розница)</a>
              </li>
              <li class="cust-select-list__item active">
                <a href="#" class="cust-select-list__link">Red Cat Store (опт)</a>
              </li>
              <li class="cust-select-list__item">
                <a href="#" class="cust-select-list__link">Red Cat Store (дропишиппинг)</a>
              </li>
              <li class="cust-select-list__item">
                <a href="#" class="cust-select-list__link">Все</a>
              </li>
            </ul>
          </div>
        </div>
        <ul class="header-nav">
          <li class="header-nav__item">
            <a href="http://5.63.153.57:8000" target="_blank" class="header-nav__link">Сайт</a>
          </li>
          <li class="header-nav__item">
            <a href="#" class="header-nav__link yellow-point">Бек-офис</a>
          </li>
        </ul>
        <userInfo/>
      </header>
    </div>
    <div class="layout__title">
      <div class="title-flex ">
        <h2 class="bottom-line">
          <router-link to="/supplier" class="link-back" v-if="$route.name === 'Информация о заказе'">
            <i class="icon-right-arrow_1"></i>
          </router-link>
          <router-link to="/discount" class="link-back" v-if="$route.name === 'Добавление скидки'">
            <i class="icon-right-arrow_1"></i>
          </router-link>
          {{this.$route.name}}
          <span v-if="$route.name === 'Информация о заказе'">(#{{code}})</span>
        </h2>
        <!--<div class="partner-list__count" v-if="$route.name === 'Поставщики'">+{{statusLast}}</div>-->
      </div>
    </div>
  </div>
</template>

<script>

import { EventBus } from '@/mixins/event-bus.js'
import UserInfo from '@/components/ui/Header/UserInfo'

export default {
  name: 'Header',
  components: { UserInfo },
  data () {
    return {
      code: ''
    }
  },
  created () {
    EventBus.$on('zak-code', code => {
      this.code = code
    })
  }
}
</script>
