<template>
  <div class="mycart oformlenie">
    <banner />

    <div class="cataloge-nav-wrapper">
      <div class="wrapper">
        <div class="help__header">Моя корзина</div>
      </div>
    </div>

    <breadcrumb :info="[{name: 'Моя Корзина', link: '/cart'},{name: 'Оформление заказа', link: false}]"/>

    <div class="wrapper">
      <div class="cart__header">Оформление заказа</div>
      <div class="oformlenie-wrapper">
        <!-- <div class="cart-wrapper"> -->
        <div class="cart-left">
          <form @submit.prevent="submitData" class="oformlenie-form">
            <div class="content__info-wrapper">
              <div class="content__info__header js-info-header" :class="{'active': showAddress, 'closed': !showAddress}" @click="showAddress = !showAddress">Адрес доставки</div>
              <div class="content__info-outer" :class="{'show': showAddress}">
                <div class="content__info">
                  <div class="adres-field__item">
                    <div class="creditcard__header">Имя</div>
                    <input v-model="form.name" v-validate="'required'" ref="firstName" name="firstName" type="text" placeholder="" class="" value="Елена">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>

                  <div class="adres-field__item">
                    <div class="creditcard__header">Фамилия</div>
                    <input v-model="form.surname" v-validate="'required'" ref="surname" name="surname" type="text" placeholder="" class="">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>
                  <div class="adres-field__item">
                    <div class="creditcard__header">Отчество</div>
                    <input v-model="form.patronymic" v-validate="'required'" ref="patronymic" name="patronymic" type="text" placeholder="" class="">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>

                  <div class="adres-field__item">
                    <div class="creditcard__header">E-mail</div>
                    <input v-model="form.email" v-validate="'required|email'" ref="email" name="email" type="text">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>

                  <div v-if="selectedDelivery !== 'stdExpress_EXPRESS' && selectedDelivery !== 'stdExpress_STANDART'" class="adres-field__item">
                    <div class="creditcard__header">Страна</div>
                    <input v-model="form.country" v-validate="'required'" ref="country" name="country" type="text" placeholder="" class="">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>

                  <div v-else-if="form.country" class="adres-field__item">
                    <select-app
                      v-model="form.country"
                      v-validate="'required'"
                      @input="$refs.country.$el.classList.remove('is-invalid')"
                      ref="country"
                      name="country"
                      :head="'Страна'"
                      :array="[{name: 'Россия', value: 'russia' }, {name: 'Беларусь', value: 'belarus' }, {name: 'Казахстан', value: 'kazakhstan'}]"
                    />
                  </div>

                  <div class="adres-field__item">
                    <div class="creditcard__header">Мобильный телефон</div>
                    <input type="text" v-validate="'required'" name="phone" ref="phone" v-mask="maskPhone" :placeholder="maskPhonePlaceholder" v-model="form.phone">

                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>

                  <div class="adres-field__item">
                    <div class="creditcard__header">Адрес</div>
                    <input v-model="form.address" v-validate="'required'" ref="address" name="address" type="text" placeholder="" class="">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>

                  <div class="adres-field__item">
                    <div class="creditcard__header">Город</div>
                    <input v-model="form.city" v-validate="'required'"  ref="city" name="city" type="text" placeholder="" class="">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>

                  <div class="adres-field__item">
                    <div class="creditcard__header">Область</div>
                    <input v-model="form.province" v-validate="'required'" ref="province" name="province" type="text" placeholder="" class="">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>

                  <div class="adres-field__item">
                    <div  class="creditcard__header">Рост и вес</div>
                    <input  v-model="form.growthWeight" v-validate="'required'" ref="weigth" name="growthWeight" type="text" placeholder="" class="">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>

                  <div class="adres-field__item">
                    <div class="creditcard__header">Размер ноги в см</div>
                    <input v-model="form.footSize" v-validate="'required'" ref="footSize" name="footSize" type="text" placeholder="" class="">
                    <div class="adres-field__icon">
                      <i class="icon-info-edit"></i>
                    </div>
                  </div>
                </div>
                <div class="content-desc">
                  <div class="content-desc__title">Способ доставки</div>
                  <span class="content-desc__current">{{deliveryTypes[selectedDelivery].name}}</span>
                  <!--<span class="content-desc__place">Пункт выдачи «Кольцова»</span>-->
                </div>
              </div>
            </div>

            <!--<div class="content__info-wrapper promocodes">
              <div class="content__info__header js-info-header" :class="{'active': showPromo, 'closed': !showPromo}" @click="showPromo = !showPromo">Промокоды и сертификаты</div>
              <div class="content__info-outer" :class="{'show': showPromo}">
                <div class="content-outer-block content-outer-block_complete">
                  <div class="content-outer-header js-content-header">ПРОМОКОД ДОБАВЛЕН!</div>
                  <div class="content-outer-block__inner">
                    <div class="content-outer-block__input">
                      <input type="text" value="BONUS_ZA_REPOST" disabled>
                    </div>
                    <input type="submit" class="content-outer-block__btn" value="Успех!">
                    <div class="content-outer-block__text">Вы можете использовать только один промокод в одном заказе.</div>
                    <div class="content-outer-block__text">Это также касается наших кодов на бесплатную доставку. При покупке подарочных сертификатов применение кода на скидку/промокода невозможно.</div>
                    <div class="content-outer-block__proc">-25%</div>

                  </div>
                </div>

                <div class="content-outer-block">
                  <div class="content-outer-header js-content-header">ДОБАВИТЬ СЕРТИФИКАТ</div>
                  <div class="content-outer-block__inner">
                    <div class="content-outer-block__input">
                      <input type="text" placeholder="XXXX - XXXX - XXXX - XXXX" class="js-sertificate-input">
                    </div>
                    <input type="submit" class="content-outer-block__btn" value="Применить">
                    <div class="content-outer-block__text">У вас есть подарочная карточка? Зайдите в Личный кабинет, чтобы добавить ее к своим подарочным сертификатам и использовать при оформлении заказа.</div>

                  </div>
                </div>

                <div class="content-outer-block">
                  <div class="content-outer-header js-content-header">ДОБАВИТЬ СЕРТИФИКАТ</div>
                  <div class="content-outer-block__inner">
                    <div class="content-outer-block__input">
                      <input type="text" placeholder="XXXX - XXXX - XXXX - XXXX" class="js-sertificate-input">
                    </div>
                    <input type="submit" class="content-outer-block__btn" value="Применить">
                    <div class="content-outer-block__text">У вас есть подарочная карточка? Зайдите в Личный кабинет, чтобы добавить ее к своим подарочным сертификатам и использовать при оформлении заказа.</div>

                  </div>
                </div>

              </div>
            </div>-->
            <!---->
            <input type="submit" value="заказать" :disabled="!isFormValid">
          </form>
          <div class="oformlenie__text">
            Размещая заказ, вы принимаете наши Правила и условия, Политику конфиденциальности и Политику возврата товаров. Вы также даете свое согласие на то, что компания RedCat будет хранить некоторые ваши данные с целью улучшить качество вашего обслуживания, когда вы в следующий раз будете делать покупки на нашем сайте.
          </div>
        </div>
        <!-- </div> -->
        <div class="cart-right">
          <div class="cart-right-wrapper">
            <div class="cart-right__header">КОЛ-ВО ТОВАРОВ: <span>{{totalProducts}}</span></div>
            <div class="content-wrapper purchases">

              <div class="content__info">
                <div class="purchases-block-wrapper">
                  <div class="purchases-block">
                    <div class="purchases-block_inner">
                      <div class="purchases-block_inner_middle">
                        <div class="scroll-bar" :class="{'js-scroll': products.length}">
                            <cardItem v-if="products" v-for="(item, index) in products" :item="item" :key="index"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="cart-right__total">
                  <div class="cart-right__total-text">Итого:</div>
                    <div class="cart-right__total-amount"><span>
                      {{products.reduce((acc, val) => acc + val.origin.qualities[val.quality].site * val.count, 0)}}
                    </span> руб
                  </div>
                </div>

                <div class="cart-right__total">
                  <div class="cart-right__total-text">Стоимость доставки:</div>
                  <div class="cart-right__total-amount"><span>{{deliveryPrice}}</span> руб</div>
                </div>
<!--
                <div class="cart-right__total">
                  <div class="cart-right__total-text">Доступно бонусов:</div>
                  <div class="cart-right__total-amount"><span>14,000</span> руб</div>
                </div>

                <div class="cart-right__total">
                  <div class="cart-right__total-text">Оплатить бонусами:</div>
                  <input type="text" class="cart-bonus__btn" placeholder="Например 7800">
                </div>-->

              </div>
            </div>

          </div>
          <div class="cart-right__total-price">
            <div class="cart-right__total">
              <div class="cart-right__total-text">Всего к оплате:</div>
              <div class="cart-right__total-amount"><span>{{products.reduce((acc, val) => {
                let { origin, quality, count } = val

                let price = ( _(origin, `qualities[${quality}].site`) || 0 ) * count

                return price ? acc + price : acc
              }, +deliveryPrice)}}</span> руб</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import cardItem from './cardItem'
import _ from 'object-get'
import * as Api from '@/api'
// import { mapFields } from 'vee-validate'

import { setTimeout } from 'timers'
import SelectApp from './SelectApp'

export default {
  name: 'index',
  components: {
    SelectApp,
    cardItem
  },
  data () {
    return {
      showAddress: true,
      showPromo: false,
      products: [],
      totalProducts: null,
      deliveryPrice: 0,
      form: {
        name: '',
        surname: '',
        patronymic: '',
        province: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        deliveryType: '',
        growthWeight: '',
        footSize: '',
        basket: [],
        paymentType: 'yakassa-prepayment',
        yakassaPaymentType: 'bank_card'
      }
    }
  },
  computed: {
    ...mapState('card', ['card', 'deliveryTypes', 'selectedDelivery']),
    ...mapState('userinfo', ['userinfo']),
    ...mapState(['basket']),
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    },
    maskPhone () {
      switch (this.form.country) {
        case 'russia':
          return '+7#########'
        case 'belarus':
          return '+8#########'
        case 'kazakhstan':
          return '+7#########'
        default:
          return '+7#########'
      }
    },
    maskPhonePlaceholder () {
      switch (this.form.country) {
        case 'russia':
          return '+7999999999'
        case 'belarus':
          return '+8999999999'
        case 'kazakhstan':
          return '+7999999999'
        default:
          return '+7999999999'
      }
    },
    isDeliverySTD () {
      return this.selectedDelivery !== 'stdExpress_EXPRESS' && this.selectedDelivery !== 'stdExpress_STANDART'
    }
  },
  mounted () {
    this.$nextTick(() => {
      $(document).trigger('ready')
      for (let key in this.userinfo.personMeta) {
        this.form[key] = this.userinfo.personMeta[key]
      }
      this.form.email = this.userinfo.email
    })
  },

  watch: {
    products () {
      setTimeout(() => {
        $('.js-scroll').mCustomScrollbar({
          axis: 'y',
          theme: 'dark-thin',
          autoExpandScrollbar: true,
          // scrollInertia: 50,
          advanced: {
            autoExpandHorizontalScroll: true
          }
        })
      }, 10)
    },
    'form.country' () {
      if (!this.isDeliverySTD) {
        setTimeout(() => {
          this.form.phone = ''
        }, 0)
      }
    }
  },

  methods: {
    ...mapMutations('modals', ['openModal']),
    ...mapActions('offers', ['addOffer']),
    submitData () {
      this.$validator.validate().then(result => {
        if (result) {
          this.form.basket = this.basket
          this.form.deliveryType = this.selectedDelivery
          this.addOffer(this.form)
            .then((res) => {
              this.openModal({ type: 'offer', data: res.confirmation_url })
              localStorage.removeItem('RCS_BASKET')
              this.$store.state.basket = []
            })
            .catch(error => {
              this.openModal({ type: 'error', message: this.errorConfirm(error.response.data.code).msg })
              const input = this.errorConfirm(error.response.data.code).type
              if (input === 'country' && !this.isDeliverySTD) {
                this.$refs[input].$el.classList.add('is-invalid')
              } else {
                this.$refs[input].classList.add('is-invalid')
              }
            })
        }

        // this.form.basket = this.basket
        // this.form.deliveryType = this.selectedDelivery
        // this.addOffer(this.form)
        //   .then((res) => {
        //     this.openModal({type: 'offer', data: res.confirmation_url})
        //   })
        //   .catch(error => {
        //     console.log(error.response.data.code)
        //     this.errorConfir(error.response.data.code)
        //   })
      })
    },
    errorConfirm (message) {
      let errorMessage = ''
      switch (message) {
        case 'email_is_required':
          errorMessage = {
            msg: 'Поле email обезательно для заполнения',
            type: 'email'
          }
          break
        case 'phone_is_required':
          errorMessage = {
            msg: 'Телефон обезательный для заполнения',
            type: 'phone'
          }
          break
        case 'province_is_required':
          errorMessage = {
            msg: 'Поле области обезательно для заполнения',
            type: 'province'
          }
          break
        case 'city_is_required':
          errorMessage = {
            msg: 'Поле город обезательно для заполнения',
            type: 'city'
          }
          break
        case 'address_is_required':
          errorMessage = {
            msg: 'Поле адрес обезательный для заполнения',
            type: 'address'
          }
          break
        case 'phone_failed':
          errorMessage = {
            msg: 'Не верный формат телефона',
            type: 'phone'
          }
          break
        case 'country_failed':
          errorMessage = {
            msg: 'Страна не найдена',
            type: 'country'
          }
          break
        case 'province_failed':
          errorMessage = {
            msg: 'Область не найдена',
            type: 'province'
          }
          break
        case 'city_failed':
          errorMessage = {
            msg: 'Город не найден',
            type: 'city'
          }
          break
        case 'address_failed':
          errorMessage = {
            msg: 'Адрес не найден',
            type: 'address'
          }
          break
        case 'name_failed':
          errorMessage = {
            msg: 'Не верное Имя',
            type: 'firstName'
          }
          break
        case 'delivery_failed':
          errorMessage = {
            msg: 'Не верний тип доставки',
            type: ''
          }
          break
        default:
          errorMessage = {
            msg: message,
            type: ''
          }
          break
      }
      return errorMessage
    },
    getProducts () {
      const productId = JSON.parse(localStorage.RCS_BASKET).map(item => item.item_id)
      Api.getProductsByIds(productId).then(res => {
        this.products = JSON.parse(localStorage.RCS_BASKET).map(item => ({ ...item, origin: res.items.find(i => i._id === item.item_id), colors: res.colors }))

        this.totalProducts = res.total

        this.form.country = this.selectedDelivery === 'stdExpress_EXPRESS' || this.selectedDelivery === 'stdExpress_STANDART' ? 'russia' : ''

        this.getDeliveryPrice()
      })
    },
    getDeliveryPrice () {
      Api.countDeliveryPrice({
        weight: this.products.reduce((acc, val) => acc + val.origin.weight * val.count, 0),
        country: this.form.country,
        type: this.selectedDelivery
      }).then(res => {
        this.deliveryPrice = res.price
      })
    },
    _: _
  },
  created () {
    if (process.browser) {
      this.getProducts()
    }
  }
}
</script>

<style scoped>
.content__info-outer.show {
  display: block !important;
}
.is-invalid {
  border-bottom: 2px solid red!important;
  margin-bottom: -1px;
}
.oformlenie .oformlenie-form input[type="submit"]:disabled {
  cursor: not-allowed;
  opacity: .5;
}
.oformlenie .oformlenie-form input[type="submit"]:disabled:hover{
  background: #3b3b3b;
  color: #fff;
  border: 1px solid transparent;
}
</style>
