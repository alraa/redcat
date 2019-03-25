<template>
  <router-link tag="li" active-class="active" :to="info.path" class="main-nav-list__item">
    <a class="main-nav-list__link">
      <span class="main-nav-list__icon"><i :class="info.icon"></i></span>
      <span class="main-nav-list__text">{{info.name}}</span>
      <span class="main-nav-list__arrow"><i class="icon-right-arrow"></i></span>
    </a>
  </router-link>
</template>

<script>
export default {
  name: 'menuItem',
  props: ['info']
}
</script>

<style scoped>

</style>
