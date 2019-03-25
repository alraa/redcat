<template>
  <div class="layout__sidebar">
    <div class="sidebar-top">
      <a href="#" @click.prevent="toggleMenu(!menu)" class="btn btn-humb js-btn-sidebar" :class="{'active': !menu}">
        <span></span>
        <span></span>
        <span></span>
      </a>
      <a href="#" class="logo"><img src="@/assets/img/logo_2.png" alt=""><img src="@/assets/img/logo.png" class="logo-sm" alt=""></a>
    </div>
    <nav class="main-nav">
      <ul class="main-nav-list">
        <menuItem v-for="(item, index) in menuItems" :info="item" :key="index"/>
      </ul>
    </nav>
  </div>
</template>

<script>
import menuItem from './menuItem'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Sidebar',
  components: {
    menuItem
  },
  data () {
    return {
      menuItems: [
        {
          path: '/products',
          name: 'Товары',
          icon: 'icon-document'
        },
        {
          path: '/order',
          name: 'Заказы',
          icon: 'icon-shopping-cart'
        },
        {
          path: '/supplier',
          name: 'Поставщик',
          icon: 'icon-postavshik_2'
        },
        {
          path: '/users',
          name: 'Пользователи',
          icon: 'icon-connection'
        },
        {
          path: '/discount',
          name: 'Скидки',
          icon: 'icon-percentage'
        }
      ]
    }
  },
  computed: {
    ...mapState(['menu'])
  },
  methods: {
    ...mapMutations(['toggleMenu'])
  }
}
</script>

<style scoped>

</style>
