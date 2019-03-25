<template>
  <div class="layout__cont white-item-cont">
    <div class="white-item">
      <div class="order-filter">
        <div class="order-filter__left">
          <router-link to="/products/add" class="btn-filter btn-filter-dark-text" title="Добавить товар">Добавить товар</router-link>

          <a href="#" @click.prevent="hideIds" title="Скрыть" style="margin-left: 10px; margin-right: 0px; color: red" class="btn-filter btn-item-hidden"><i class="icon-eye"></i></a>
          <a href="#" @click.prevent="showIds" title="Показать" style="margin-left: 10px" class="btn-filter btn-item-hidden"><i class="icon-eye"></i></a>
          <a href="#popup-delete" title="Удалить" @click.prevent="deleteIds" class="btn-filter btn-filter-remove js-popup"><i class="icon-rubbish-bin"></i></a>
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
                  <input type="text" class="form-control" v-model="searchQuery" placeholder="Поиск по таблице">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="table-list-wrap">
        <div class="table-list-scroll js-scroll-horizont">
          <ul class="table-list table-order table-products">
            <li class="table-list__item table-list__item_title">
              <div class="col col_1"></div>
              <div class="col col_2">Товар</div>
              <div class="col col_3"></div>
              <div class="col col_4"></div>
              <div class="col col_5"></div>
              <div class="col col_6"></div>
              <div class="col col_7">Габариты</div>
              <div class="col col_8"></div>
              <div class="col col_9"></div>
              <div class="col col_10"></div>
              <div class="col col_11">Стоимость</div>
              <!-- <div class="col col_12"></div> -->
              <!-- <div class="col col_13"></div> -->
              <div class="col col_14"></div>
              <div class="col col_15"></div>
              <div class="col col_16"></div>
              <div class="col col_17"></div>
              <div class="col col_18"></div>
              <div class="col col_19"></div>
              <div class="col col_20"></div>
              <div class="col col_21"></div>
              <div class="col col_22"></div>
              <div class="col col_23"></div>
              <div class="col col_24"></div>
            </li>
            <li class="table-list__item">
              <div class="col col_1">
                <label class="check-table">
                  <input type="checkbox" v-model="checkAll">
                  <span class="check-table__icon"></span>
                </label>
              </div>
              <div class="col col_2">Название</div>
              <div class="col col_3">Категория</div>
              <div class="col col_4">Подкатегория</div>
              <div class="col col_5">Брендов</div>
              <div class="col col_6">Размеров</div>
              <div class="col col_8">Ширина<br> см.</div>
              <div class="col col_9">Высота<br> см.</div>
              <div class="col col_7">Длина<br> см.</div>
              <div class="col col_10">Вес<br> г.</div>
              <div class="col col_11">Цена доставки<br> Россия</div>
              <div class="col col_11">Цена доставки<br> Беларусь</div>
              <div class="col col_11">Цена доставки<br> Казахстан</div>
              <div class="col col_11">Другие доставки</div>
              <!-- <div class="col col_12">Цена доставки<br> Москва</div> -->
              <!-- <div class="col col_13">Итого<br> доставка</div> -->
              <!-- <div class="col col_14">Налоги</div> -->
              <!-- <div class="col col_15">Эквайринг</div> -->
              <!-- <div class="col col_16">Себестоимость товара </div> -->
              <div class="col col_17">Себестоимость</div>
              <div class="col col_18">Наценка</div>
              <div class="col col_19">Цена товара<br> на сайте</div>
              <!-- <div class="col col_20">Прибыль<br> с 1 продажи</div> -->
              <!-- <div class="col col_21">Скидка</div> -->
              <div class="col col_22">Поставщик</div>
              <div class="col col_23"></div>
              <div class="col col_24"></div>
            </li>
            <tableItem @delFromArray="delFromMas" @addToArray="masAction.push($event)" v-for="item in allProducts" :checkAll="checkAll" :key="item._id" :item="item"/>

          </ul>
        </div>
        <div class="table-list-tip">

          <div class="tip tip-img-popup" id="photo-1">
            <a href="#" class="tip-close js-tip-close">
              <span></span>
              <span></span>
            </a>
            <div class="photo-slider js-photo-slider">
              <div class="photo-slider__item">
                <div class="photo-slider__img"><img src="img/tip-photo.jpg" alt=""></div>
              </div>
              <div class="photo-slider__item">
                <div class="photo-slider__img"><img src="img/tip-photo.jpg" alt=""></div>
              </div>
              <div class="photo-slider__item">
                <div class="photo-slider__img"><img src="img/tip-photo.jpg" alt=""></div>
              </div>
            </div>
            <div class="number-slide"></div>
          </div>
          <div class="tip tip-img-popup" id="qr-code-1">
            <a href="#" class="tip-close js-tip-close">
              <span></span>
              <span></span>
            </a>
            <div class="photo-slider js-photo-slider">
              <div class="photo-slider__item">
                <div class="photo-slider__img"><img src="img/qr-code.jpg" alt=""></div>
              </div>
            </div>
            <div class="number-slide"></div>
          </div>
        </div>
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
import {mapActions, mapState, mapMutations} from 'vuex'
import tableItem from './tableItem'
import Pagination from '@/components/ui/Pagination/index.vue'
import Select from '@/components/ui/SelectDropdown/index.vue'
import * as Api from '@/api'

export default {
  name: 'index',
  metaInfo: {
    title: 'Товары',
    titleTemplate: '%s | Red Cat STORE'
  },
  mixins: [customScrollbar],
  data () {
    return {
      searchQuery: '',
      showLimit: false,
      masAction: [],
      checkAll: false
    }
  },
  components: { tableItem, Pagination, Select },
  computed: {
    ...mapState('products', ['allProducts', 'totalsPages', 'limit', 'currentPage'])
  },
  methods: {
    ...mapActions('products', ['getAllProducts']),
    ...mapMutations('products', ['checkLimit', 'checkCurrentPage']),
    getFetch (page = 1) {
      const options = {
        limit: this.limit,
        skip: Math.max(--page * this.limit, 0),
        name: this.searchQuery
      }
      this.getAllProducts(options)
        .then(() => { this.checkCurrentPage(Math.max(++page, 1)) })
    },
    checkPage (perPage) {
      this.checkLimit(perPage)
      this.getFetch()
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
    delFromMas (id) {
      let index = this.masAction.indexOf(id)
      if (index !== -1) this.masAction.splice(index, 1)
    },
    reset () {
      this.masAction = []
      this.checkAll = false
      // this.pages = 0
      this.getFetch()
    },
    hideIds () {
      Api.hideFromTable(this.masAction)
        .then(() => { this.reset() })
    },
    showIds () {
      Api.showFromTable(this.masAction)
        .then(() => { this.reset() })
    },
    deleteIds () {
      Api.deleteFromTable(this.masAction)
        .then(() => { this.reset() })
    }
  },
  created () {
    if (this.allProducts.length <= 0 || this.allProducts.length !== this.limit || this.$route.query.fetch) this.getFetch()
  }
}
</script>

<style scoped>
  .showLimit {
    display: block
  }
</style>
