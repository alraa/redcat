<template>
  <div class="wrapper">
    <div class="succes-reg">
      <div class="succes-reg__header-block">
        <div class="succes-reg__header">Поздравляем с успешной регистрацией!</div>
        <router-link to="/cabinet" class="succes-reg__miss">Пропустить</router-link>
      </div>
      <div class="succes-reg__subheader">Для дальнейших покупок, Вам необходимо заполнить информацию о себе</div>
      <form @submit.prevent="submit" id="succes-reg">
        <div class="succes-reg__info">
          <div class="succes-reg__item">
            <div class="succes-reg__name">Фамилия</div>
            <input v-model="form.surname" type="text" placeholder="Введите фамилию">
          </div>

          <div class="succes-reg__item">
            <div class="succes-reg__name">Имя</div>
            <input v-model="form.name" type="text" placeholder="Введите имя">
          </div>

          <div class="succes-reg__item">
            <div class="succes-reg__name">Отчество</div>
            <input v-model="form.patronymic" type="text" placeholder="Введите отчество">
          </div>

          <div class="succes-reg__item">
            <div class="succes-reg__name">Город</div>
            <input v-model="form.city" type="text" placeholder="Введите город">
          </div>

          <div class="succes-reg__item">
            <div class="succes-reg__name">Индекс</div>
            <input v-model="form.index" type="text" placeholder="Введите индекс">
          </div>

          <div class="succes-reg__item">
            <div class="succes-reg__name">Адрес</div>
            <input v-model="form.address" type="text" placeholder="Введите адрес">
          </div>

          <div class="succes-reg__item">
            <div class="succes-reg__name">Рост, вес</div>
            <input v-model="form.growthWeight" type="text" placeholder="Например: 175см, 65кг">
          </div>

          <div class="succes-reg__item">
            <div class="succes-reg__name">Дата Рождения</div>
            <input v-model="form.birthDate" type="date" placeholder="Например: 175см, 65кг">
          </div>

          <div class="succes-reg__item">
            <div class="succes-reg__name">Размер ноги в см</div>
            <input v-model="form.footSize" type="text" placeholder="Например: 26.5">
          </div>
        </div>

        <div class="succes-reg__submit-container">
          <input type="submit" class="succes-reg__submit" value="Cохранить">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api'
export default {
  name: 'index',
  data() {
    return {
      form: {
        name: '',
        surname: '',
        patronymic: '',
        city: '',
        index: '',
        address: '',
        birthDate: '',
        growthWeight: '',
        footSize: '',
      }
    }
  },
  methods: {
    submit() {
      console.log(this.form)
      Api.setNewUserData(this.form)
        .then(() => {
          this.$router.push('/cabinet')
        })
    }
  },
}
</script>

<style scoped>

</style>
