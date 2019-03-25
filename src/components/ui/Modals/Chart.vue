<template>
  <div class="popup">
    <div class="popup-size-chart">
      <div class="popup__overlay"></div>
      <div class="popup__cont popup__cont_size-chart">
        <div class="popup__wrap popup__wrap_size-chart">
          <div class="popup__close popup__close_size-chart" @click.prevent="cancel">
            <span class="icon-close-popup"></span>
          </div>
          <div class="popup-size-chart__info">
            <div class="popup-size-chart__title">
              Размерная сетка
            </div>
            <p class="popup-size-chart__text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
            </p>
          </div>
          <div class="size-chart-table">
            <div class="size-chart-table__item">
              <div class="size-chart-table__title">
                Размеры сетка  для одежды
              </div>
              <ul class="table-list">
                <li class="table-list__item">
                  <div class="col col_1">Рост (см)</div>
                  <div class="col col_2">Размер</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">150-159</div>
                  <div class="col col_2">S</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">160-170</div>
                  <div class="col col_2">M</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">171-175</div>
                  <div class="col col_2">L</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">176-180</div>
                  <div class="col col_2">XL</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">181-185</div>
                  <div class="col col_2">XXL</div>
                </li>
              </ul>

            </div>
            <div class="size-chart-table__item">
              <div class="size-chart-table__title">
                Размеры сетка  для обуви
              </div>
              <ul class="table-list">
                <li class="table-list__item">
                  <div class="col col_1">Размер</div>
                  <div class="col col_2">Длина стопы (см)</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">36 EUR</div>
                  <div class="col col_2">22.5СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">37 EUR</div>
                  <div class="col col_2">23СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">38 EUR</div>
                  <div class="col col_2">24СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">39 EUR</div>
                  <div class="col col_2">24.5СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">40 EUR</div>
                  <div class="col col_2">25СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">41 EUR</div>
                  <div class="col col_2">26СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">42 EUR</div>
                  <div class="col col_2">26.5СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">43 EUR</div>
                  <div class="col col_2">27СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">44 EUR</div>
                  <div class="col col_2">28СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">45 EUR</div>
                  <div class="col col_2">29СМ</div>
                </li>
                <li class="table-list__item">
                  <div class="col col_1">46 EUR</div>
                  <div class="col col_2">30СМ</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!--popup -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    modal: [Object, Boolean],
    success: Function,
    cancel: Function
  },

  data () {
	  return {
		  form: {
        fullname: '',
		    phone: ''
      },
      showSuccess: false
	  }
  },

  methods: {
    ...mapActions(['postCallbackForm']),

    submit () {
      this.postAuthorizationForm(this.form)
        .then(() => {
          this.showSuccess = true
        })
    }
  }
}
</script>

<style>

</style>
