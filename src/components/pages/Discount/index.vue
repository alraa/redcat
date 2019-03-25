<template>
  <div class="layout__cont discount-list">
    <div class="top-sales">
      <discountCategory/>
      <div class="top-sales__table discount-table-wrap">
        <div class="white-item">
          <div class="order-filter">
            <div class="order-filter__left">
              <router-link to="discount/add" class="btn-filter">Добавить</router-link>
              <a href="#" class="btn-filter btn-filter-remove"><i class="icon-rubbish-bin"></i></a>
            </div>
            <div class="order-filter__right">
              <div class="paging-filter">
                <div class="paging-filter__counter">1/38</div>
                <a href="#" class="paging-filter__btn btn-filter"><i class="icon-left-arrow"></i></a>
                <a href="#" class="paging-filter__btn btn-filter"><i class="icon-right-arrow_2"></i></a>
              </div>
              <div class="box-search">
                <form>
                  <div class="search__row">
                    <div class="search__btn">
                      <button><i class="icon-search"></i></button>
                    </div>
                    <div class="search__input">
                      <input type="text" class="form-control" placeholder="Поиск по таблице">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <discountTable/>
        </div>
      </div>
    </div>
    <div class="top-sales">
      <div class="top-sales__category top-sales__category_empty"></div>
      <div class="top-sales__table">
        <div class="box-paging">
          <pagination
            :current="2"
            :total="10"
            :perPage="3"
            :pagePange="3"/>
          <div class="paging-select">
            <div class="paging-select__title">Показать <span class="hide-mob">на странице</span> по:</div>
            <select-dropdown :selects="[1, 5, 10, 15, 20]" :active="5"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiscountCategory from '@/components/pages/Discount/DiscountCategory'
import DiscountTable from '@/components/pages/Discount/DiscountTable'
import Pagination from '@/components/ui/Pagination/index'
import SelectDropdown from '@/components/ui/SelectDropdown/index'

export default {
  name: 'index',
  metaInfo: {
    title: 'Скидки',
    titleTemplate: '%s | Red Cat STORE'
  },
  components: { SelectDropdown, Pagination, DiscountTable, DiscountCategory }
}
</script>
