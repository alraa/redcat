<template>
  <li class="user-list__item" @click.prevent="editUser" :class="{'active': info._id === userToEdit._id}">
    <a href="#" class="user-list__link">
      <span class="user-list__name">{{info.personMeta.surname || ''}} {{info.personMeta.name || ''}} {{info.personMeta.patronymic || ''}}</span>
      <span>{{info.email.length > 35 ? `${info.email.slice(0, 35)}...` : info.email}}</span>
    </a>
    <ul class="order-links">
      <li class="order-links__item">
        <a href="#" class="order-links__link"><i class="icon-edit"></i></a>
      </li>
      <li class="order-links__item">
        <a href="#" class="order-links__link" @click.prevent="userDelete(info._id)"><i class="icon-close"></i></a>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  name: 'userItem',
  props: ['info'],
  computed: {
    ...mapState('users', ['userToEdit'])
  },
  methods: {
    ...mapMutations('users', ['setEditUser', 'setEdit']),
    ...mapActions('users', ['deleteUser']),
    editUser () {
      this.setEdit(false)
      this.setEditUser(this.info)
      setTimeout(() => this.setEdit(true), 1)
    },
    userDelete (id) {
      this.deleteUser(id)
        .then(() => this.$emit('delete-user'))
    }
  }
}
</script>

<style scoped>

</style>
