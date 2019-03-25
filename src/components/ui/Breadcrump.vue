<template>
  <div class="breadcramps">
    <div class="wrapper">
      <div class="box-bread-crumbs">
        <ul class="bread-crumbs">
          <li class="bread-crambs__item">
            <router-link to="/" class="bread-crambs__link home-img"></router-link>
          </li>
          <li v-for="(item, index) in info" :key="index" class="bread-crambs__item">
            <router-link v-if="item.link" :to="item.link" class="bread-crambs__link">
              {{item.name}}
            </router-link>
            <span v-else>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['info']
}
</script>

<style scoped>

</style>
