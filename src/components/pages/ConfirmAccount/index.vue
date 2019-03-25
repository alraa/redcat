<template>
	<div></div>
</template>

<script>
import * as Api from '@/api'
import {mapMutations} from 'vuex'
export default {
  name: 'index',
  created () {
    Api.confirmUser(this.$route.query.secret)
      .then((res) => {
        alert('Успешно')
        this.setToken(res)
        this.$router.push('/set-userdata')
      })
      .catch(() => {
        alert('Ошибка')
        this.$router.push('/')
      })
  },
  methods: {
    ...mapMutations(['setToken'])
  }
}
</script>

<style scoped>

</style>
