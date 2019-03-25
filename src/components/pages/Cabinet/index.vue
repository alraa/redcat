<template>
 <div class="cabinet">
    <banner />
    <div>
      <div class="wrapper">
        <div class="tab-wrap">
          <div class="box-tab-cont">
            <!-- buy with us -->
            <li v-if="selectedMenu === 0" class="nav-tab-list__item nav-tab-list__title">
              <a class="nav-tab-list__link">Покупай в Red Cat Store</a>
            </li>
            <div v-if="selectedMenu === 0" class="tab-cont">
              <div class="content-wrapper buy-withus">
                <div class="content__subheader">Муррр</div>
                <div class="content__header">Я готов покупать, а ты?</div>
                <router-link to="/catalog" href="#" class="more__btn btn">Посмотреть каталог
                  <div class="more__btn_topline"></div>
                  <div class="more__btn_rightline"></div>
                  <div class="more__btn_bottomline"></div>
                  <div class="more__btn_leftline"></div>
                </router-link>
                <div class="big-cat">
                  <img src="~@/assets/img/big_cat_rozn.png" alt="">
                </div>
              </div>
            </div>

            <li v-if="selectedMenu === 1" class="nav-tab-list__item nav-tab-list__title">
              <a class="nav-tab-list__link">Мои заказы</a>
            </li>
            <!-- my purchases -->
            <div v-if="selectedMenu === 1" class="tab-cont">
              <div class="content-wrapper purchases">
                <div class="content__header">Мои заказы</div>
                <div class="content__info">
                  <offerItem v-for="order in orders" :key="order._id" :info="order"/>
                </div>
                <!-- <div class="purchases-pagination">
                  <ul class="purchases-pagination__list">
                    <li class="purchases-pagination__item">
                      <a href="#" class="purchases-pagination__link active">1</a>
                    </li>
                    <li class="purchases-pagination__item">
                      <a href="#" class="purchases-pagination__link">2</a>
                    </li>
                    <li class="purchases-pagination__item">
                      <a href="#" class="purchases-pagination__link">3</a>
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>

            <li v-if="selectedMenu === 2" class="nav-tab-list__item nav-tab-list__title">
              <a class="nav-tab-list__link">Моя информация</a>
            </li>
            <!-- my info -->
            <div v-if="selectedMenu === 2" class="tab-cont">
              <div class="content-wrapper creditcard my-info">
                <div class="content__header">Моя информация</div>
                <div class="content__subheader">Вы в любой момент можете обновить вашу учетную запись Red Cat и внести любые изменения в приведенные ниже данные.
                </div>
                <div class="content__info content__info_edit">
                  <form class="my-info-form" @submit.prevent="submit">
                    <div class="my-info-form__inner">
                      <div class="creditcard-name">
                        <div class="creditcard__header">Фамилия</div>
                        <input v-model="personMeta.surname" type="text" placeholder="">
                      </div>
                      <div class="creditcard-name">
                        <div class="creditcard__header">Имя</div>
                        <input v-model="personMeta.name" type="text" placeholder="">
                      </div>
                      <div class="creditcard-name">
                        <div class="creditcard__header">Очество</div>
                        <input v-model="personMeta.patronymic" type="text" placeholder="">
                      </div>
                      <div class="creditcard-name">
                        <div class="creditcard__header">Рост, вес</div>
                        <input v-model="personMeta.growthWeight" type="text" placeholder="">
                      </div>

                      <div class="creditcard-name" style="margin-right: 50px;">
                        <div class="creditcard__header">Размер ноги в см</div>
                        <input type="text" v-model="personMeta.footSize" placeholder="">
                      </div>

                        <div class="creditcard-name">
                          <div class="creditcard__header">Дата рождения</div>
                          <input type="date" v-model="personMeta.birthDate">
                        </div>

                    </div>
                    <div class="messaging-submit">
                      <input type="submit" value="ОБНОВИТЬ" placeholder="">
                    </div>
                  </form>

                </div>

              </div>

            </div>
            <!-- adress book -->

            <!--end  soc-profile -->
            <!-- returt and exchange -->
            <li class="nav-tab-list__item nav-tab-list__title">
              <a class="nav-tab-list__link nav-tab-list__link_9">Нужна помощь?</a>
            </li>
          </div>

          <ul class="nav-tab-list">
            <li class="all-left-content">
              <div class="hallo-block">
                <div class="hallo-block__img">
                  <img src="~@/assets/img/logo-mail.png" alt="">
                </div>
                <div class="hallo-block__text">
                  <div class="hallo-block__name">{{userinfo.personMeta.name || ''}} {{userinfo.personMeta.surname || ''}}</div>
                  <div class="hallo-block__summ">Доступная сумма: <span>{{userinfo.balance}}</span> руб.
                    <div class="hallo-block__summ-tooltip">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-tab-list__item" :class="{'active': selectedMenu === 0}">
              <a @click.prevent="changeMenu(0)" class="nav-tab-list__link">Покупай в Red Cat Store</a>
            </li>
            <li class="nav-tab-list__item" :class="{'active': selectedMenu === 1}">
              <a @click.prevent="changeMenu(1)" class="nav-tab-list__link">Мои заказы</a>
            </li>
            <li class="nav-tab-list__item" :class="{'active': selectedMenu === 2}">
              <a @click.prevent="changeMenu(2)" class="nav-tab-list__link">Моя информация</a>
            </li>
            <!--<li class="nav-tab-list__item">
              <a href="#tab_4" class="nav-tab-list__link">Адресная книга</a>
            </li>
            <li class="nav-tab-list__item">
              <a href="#tab_5" class="nav-tab-list__link">Способы оплаты</a>
            </li>
            <li class="nav-tab-list__item">
              <a href="#tab_6" class="nav-tab-list__link">Способы уведомления</a>
            </li>
            <li class="nav-tab-list__item">
              <a href="#tab_7" class="nav-tab-list__link">Профили в соц.сетях</a>
            </li>
            <li class="nav-tab-list__item active">
              <a href="#tab_8" class="nav-tab-list__link">Замена/Возврат</a>
            </li>-->
            <li class="nav-tab-list__item">
              <router-link to="/help" class="nav-tab-list__link">Нужна помощь?</router-link>
            </li>
            <li class="cabinet-exit__btn">
              <a href="#" @click.prevent="logoutIn()" class="cabinet-exit">Выйти</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api'
import { mapState, mapActions, mapMutations } from 'vuex'
import offerItem from './offerItem'
export default {
  name: 'index',
  components: {
    offerItem
  },

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
        surname: ''
      },
      orders: [],
      selectedMenu: 0
    }
  },
  computed: {
    ...mapState('userinfo', ['userinfo'])
  },
  mounted () {
    this.getUserinfo()
      .then(res => {
        this.personMeta = JSON.parse(JSON.stringify(this.userinfo.personMeta))
        let d = new Date(this.personMeta.birthDate)
        this.personMeta.birthDate = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1).toString() : d.getMonth() + 1) + '-' + d.getDate()
      })
    this.$nextTick(() => {
      $(document).trigger('ready')
      Api.getUserOrders().then(res => { this.orders = res })
    })
  },
  watch: {
    selectedMenu (val) {
      console.log(val)
    }
  },
  created () {

  },
  methods: {
    ...mapActions('userinfo', ['getUserinfo']),
    ...mapMutations(['logout']),
    logoutIn () {
      this.logout()
      this.$router.push({ path: '/' })
    },
    changeMenu (id) {
      this.selectedMenu = id
    },
    submit () {
      Api.setNewUserData(this.personMeta)
        .then(() => {
          this.getUserinfo()
            .then(res => {
              this.personMeta = JSON.parse(JSON.stringify(this.userinfo.personMeta))
              let d = new Date(this.personMeta.birthDate)
              this.personMeta.birthDate = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1).toString() : d.getMonth() + 1) + '-' + d.getDate()
            })
        })
    }
  }
}
</script>

<style scoped>
.nav-tab-list__link {
  cursor: pointer;
}
</style>
