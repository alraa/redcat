<template>
  <div class="layout__cont add-product-wrap">
    <div class="add-product users">
      <div class="add-product__col add-product__col_1">
        <ul class="user-list">
          <userItem v-for="(user, index) in allUsers" :info="user" :key="index" @delete-user="getAllUsers" />
        </ul>
      </div>
      <div class="add-product__col add-product__col_2">
        <userForm @form-update="getAllUsers"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import userItem from './userItem'
import userForm from './userForm'

export default {
  name: 'index',
  metaInfo: {
    title: 'Пользователи',
    titleTemplate: '%s | Red Cat STORE'
  },
  components: {
    userItem,
    userForm
  },
  computed: {
    ...mapState('users', ['allUsers'])
  },
  created () {
    this.getAllUsers()
  },
  methods: {
    ...mapActions('users', ['getAllUsers'])
  }
}
</script>

<style scoped>

</style>
