<template>
  <div class="layout__cont white-item-cont">
    <div class="white-item">
      <div class="order-filter">
        <div class="order-filter__left">
          <a href="#" class="btn-filter order-filter__btn-filter" title="Экспорт">Экспорт</a>
          <a href="#" class="btn-filter btn-filter-remove" title="Удалить"><i class="icon-rubbish-bin"></i></a>
        </div>
        <div class="order-filter__right">
          <div class="paging-filter" v-if="totalsPages > limit">
            <div class="paging-filter__counter"> {{currentPage}}/{{Math.ceil(totalsPages / limit)}}</div>
            <a href="#"
               class="paging-filter__btn btn-filter"
               @click.prevent="pagePrev"
               v-if="hasPrev()">
              <i class="icon-left-arrow"></i>
            </a>
            <a class="paging-filter__btn btn-filter"
               v-else>
              <i class="icon-left-arrow"></i>
            </a>
            <a href="#"
               class="paging-filter__btn btn-filter"
               @click.prevent="pageNext"
               v-if="hasNext()">
              <i class="icon-right-arrow_2"></i>
            </a>
            <a class="paging-filter__btn btn-filter"
               v-else>
              <i class="icon-right-arrow_2"></i>
            </a>
          </div>
          <div class="box-search">
            <form @submit.prevent="getFetch">
              <div class="search__row">
                <div class="search__btn">
                  <button><i class="icon-search"></i></button>
                </div>
                <div class="search__input">
                  <input type="text" class="form-control" v-model="search" placeholder="Поиск по таблице">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="table-list-wrap" v-if="!loading">
        <div class="table-list-scroll js-scroll-horizont">
          <ul class="table-list table-order">
            <li class="table-list__item table-list__item_title">
              <div class="col col_1">
                <label class="check-table">
                  <input type="checkbox" @click='checkAll()' v-model='isCheckAll'>
                  <span class="check-table__icon"></span>
                </label>
              </div>
              <div class="col col_2"><i class="icon-danger"></i>#Заказа</div>
              <div class="col col_3">Создан</div>
              <div class="col col_4">Трек-код</div>
              <div class="col col_5">Сумма</div>
              <div class="col col_6">ФИО</div>
              <div class="col col_7">Статус</div>
              <div class="col col_8">Оплата</div>
              <div class="col col_9">Доставка</div>
            </li>

            <li class="table-list__item"
                v-for="order of orders"
                :key="order._id"
                :class="{'check-row': isCheckOrders.includes(order._id),
                'order-not-available': order.hasOutOfStock && order.paid,
                'order-canceled': order.statusHistory.length && order.paid && order.statusHistory[0].status === 'canceled'}"
            >
              <div class="col col_1">
                <label class="check-table">
                  <input type="checkbox"  v-model='isCheckOrders' @change='updateCheckAll()' :value="order._id">
                  <span class="check-table__icon"></span>
                </label>
              </div>
              <div class="col col_2">
                <div style="width: 22px; display: inline-block">
                  <i class="icon-close" v-if="order.statusHistory.length && order.paid && order.statusHistory[0].status === 'canceled'"></i>
                  <i class="icon-danger" v-if="order.hasOutOfStock"></i>
                </div>
                <router-link :to="`/order/${order._id}`">#R{{order.code}}</router-link>
              </div>
              <div class="col col_3">{{new Date(order.createdAt).toLocaleDateString()}}</div>
              <div class="col col_4">
                <ul class="track-code">
                  <li>{{order.trackNumber}}</li>
                  <!--<li>CHI38515</li>-->
                  <!--<li><i class="icon-right-arrow_1"></i></li>-->
                  <!--<li>RUS25916</li>-->
                </ul>
              </div>
              <div class="col col_5">{{order.onCaptureSumPrice}} р.</div>
              <div class="col col_6">{{order.name}}</div>
              <div class="col col_7">
                  <span class="status" v-if="order.statusHistory.length && order.paid">

                    <span class="status__icon status__icon_orange"
                          :class="{
                          'status__icon_light-green': order.hasOutOfStock && order.paid,
                          'status__icon_grey': order.statusHistory.length && order.paid && order.statusHistory[0].status === 'canceled',
                          'status__icon_dark-blue': order.statusHistory.length && !order.hasOutOfStock && order.statusHistory[0].status === 'process'
                          }"></span>

                    <span class="status__text" v-if="order.statusHistory[0].status === 'new'">Новый</span>

                    <span class="status__text" v-if="!order.hasOutOfStock && order.statusHistory[0].status === 'process'">В обработке</span>

                    <span class="status__text" v-if="order.statusHistory[0].status === 'canceled'">Отменен</span>

                    <span class="status__text" v-if="order.hasOutOfStock && order.paid">Нет в наличии</span>

                  </span>
                  <span v-else></span>
              </div>
              <div class="col col_8">
                <span class="paid" v-if="order.paid">Оплачен</span>
                <span v-else>Не оплачен</span>
              </div>
              <div class="col col_9">
                {{order.deliveryType}}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else style="height: 400px; width: 100%; display: flex; align-items: center; justify-content: center;">
        <img src="~@/assets/img/loading.svg" alt="loading...">
      </div>
    </div>
    <div class="box-paging">
      <div>
        <Pagination
          v-if="totalsPages > limit"
          :current='currentPage'
          :total='totalsPages'
          :perPage='limit'
          @page-changed='getFetch'/>
      </div>
      <div class="paging-select">
        <div class="paging-select__title">Показать <span class="hide-mob">на странице</span> по:</div>
        <Select :selects="[1, 5, 10, 15, 20]" @check-select="checkPage" :active="limit"/>
      </div>
    </div>
  </div>
</template>

<script>
import customScrollbar from '@/mixins/custom-scrollbar'
import Pagination from '@/components/ui/Pagination/index.vue'
import Select from '@/components/ui/SelectDropdown/index.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Orders',
  metaInfo: {
    title: 'Заказы',
    titleTemplate: '%s | Red Cat STORE'
  },
  mixins: [customScrollbar],
  components: {
    Pagination,
    Select
  },
  data () {
    return {
      isCheckOrders: [],
      isCheckAll: false,
      search: '',
      loading: false
    }
  },
  computed: {
    ...mapState('orders', ['orders', 'totalsPages', 'limit', 'currentPage'])
  },
  methods: {
    ...mapActions('orders', ['getOrders']),
    ...mapMutations('orders', ['checkLimit', 'checkCurrentPage']),
    getFetch (page = 1) {
      this.loading = true
      const options = {
        params: {
          limit: this.limit,
          skip: Math.max(--page * this.limit, 0),
          name: this.search
        }
      }
      this.getOrders(options)
        .then(() => {
          this.loading = false
          this.checkCurrentPage(Math.max(++page, 1))
          this.isCheckOrders = []
          this.isCheckAll = false
        })
    },
    pageNext () {
      this.checkCurrentPage(this.currentPage + 1)
      this.getFetch(this.currentPage)
    },
    pagePrev () {
      this.checkCurrentPage(this.currentPage - 1)
      this.getFetch(this.currentPage)
    },
    hasPrev () {
      return this.currentPage > 1
    },
    hasNext () {
      return this.currentPage < Math.ceil(this.totalsPages / this.limit)
    },
    checkAll () {
      this.isCheckAll = !this.isCheckAll
      this.isCheckOrders = []
      if (this.isCheckAll) this.isCheckOrders = this.orders.map(order => order._id)
    },
    updateCheckAll () {
      this.isCheckOrders.length === this.orders.length ? this.isCheckAll = true : this.isCheckAll = false
    },
    checkPage (perPage) {
      this.checkLimit(perPage)
      this.getFetch()
    }
  },
  mounted () {
    if (this.orders.length <= 0 || this.orders.length !== this.limit) this.getFetch()
  }
}
</script>
<style scoped>
  .order-filter__btn-filter {
    margin: 0 10px;
  }
</style>
