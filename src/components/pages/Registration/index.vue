<template>
  <div>
    <banner />
    <breadcrumb :info="bread"/>
    <div>
      <div class="wrapper">
        <div class="succes-reg">
          <div class="succes-reg__header-block">
            <div class="succes-reg__header">Поздравляем с успешной регистрацией!</div>
            <router-link to="/catalog" class="succes-reg__miss">Пропустить</router-link>
          </div>
          <div class="succes-reg__subheader">Для дальнейших покупок, Вам необходимо заполнить информацию о себе</div>
          <form @submit.prevent="submit" >
            <div class="succes-reg__info">
              <div class="succes-reg__item">
                <div class="succes-reg__name">Фамилия</div>
                <input type="text" v-model="personMeta.surname" placeholder="Введите фамилию">
              </div>

              <div class="succes-reg__item">
                <div class="succes-reg__name">Имя</div>
                <input type="text"  v-model="personMeta.name" placeholder="Введите имя">
              </div>

              <div class="succes-reg__item">
                <div class="succes-reg__name">Отчество</div>
                <input type="text" v-model="personMeta.patronymic" placeholder="Введите отчество">
              </div>

              <div class="succes-reg__item">
                <div class="succes-reg__name">Город</div>
                <input type="text" v-model="personMeta.city" placeholder="Введите город">
              </div>

              <div class="succes-reg__item">
                <div class="succes-reg__name">Индекс</div>
                <input type="text" v-model="personMeta.index" placeholder="Введите индекс">
              </div>

              <div class="succes-reg__item">
                <div class="succes-reg__name">Адрес</div>
                <input type="text" v-model="personMeta.address" placeholder="Введите адрес">
              </div>

              <div class="succes-reg__item">
                <div class="succes-reg__name">Мобильный телефон</div>
                <input type="text" v-model="personMeta.phone" v-mask="'+7(###) ###-##-##'" placeholder="+7 (XXX) XXX-XX-XX">
              </div>

              <div class="succes-reg__item">
                <div class="succes-reg__name">Рост, вес</div>
                <input type="text" v-model="personMeta.growthWeight" placeholder="Например: 175см, 65кг">
              </div>

              <div class="succes-reg__item">
                <div class="succes-reg__name">Размер ноги в см</div>
                <input type="text" v-model="personMeta.footSize" placeholder="Например: 26.5">
              </div>
            </div>

            <div class="succes-reg__submit-container">
              <input type="submit" class="succes-reg__submit" value="Cохранить">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api'
export default {
  name: 'index',
  data () {
    return {
      personMeta: {
        address: '',
        birthDate: '',
        city: '',
        footSize: '',
        growthWeight: '',
        index: '',
        name: '',
        patronymic: '',
        surname: '',
        phone: ''
      }
    }
  },
  computed: {
    bread () {
      return [
        {
          link: false,
          name: this.$route.name
        }
      ]
    }
  },
  methods: {
    submit () {
      Api.setNewUserData(this.personMeta)
        .then()
        .cache(err => err)
    }
  }
}
</script>

<style scoped>

</style>
