<template>
  <div class="layout__cont add-product-wrap">
    <form>
      <div class="add-product add-discount">
        <div class="add-product__col add-product__col_1">
          <discount-category/>
        </div>
        <div class="add-product__col add-product__col_2">
          <div class="white-item">
            <div class="box-field">
              <label class="box-field__label">Выберите тип</label>
              <div class="box-field__input">
                <div class="cust-select cust-select-xs">
                  <div class="cust-select-title js-cust-select">
                    <span>Все скидки и бонусы</span>
                    <i class="icon-bottom-arrow"></i>
                  </div>
                  <div class="cust-select-dropdown">
                    <ul class="cust-select-list js-select-list">
                      <li class="cust-select-list__item">
                        <a href="#" class="cust-select-list__link">Одежда</a>
                      </li>
                      <li class="cust-select-list__item ">
                        <a href="#" class="cust-select-list__link">Кепки</a>
                      </li>
                      <li class="cust-select-list__item">
                        <a href="#" class="cust-select-list__link">Носки</a>
                      </li>
                      <li class="cust-select-list__item active">
                        <a href="#" class="cust-select-list__link">Обувь</a>
                      </li>
                      <li class="cust-select-list__item ">
                        <a href="#" class="cust-select-list__link">Парки</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-field">
              <label class="box-field__label">Название акции</label>
              <div class="box-field__input">
                <input type="text" class="form-control">
              </div>
            </div>
            <div class="box-form-row">
              <div class="box-form-row__col box-form-row__col_1">
                <label class="box-field__label">Скидка %</label>
                <div class="box-field__input">
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="box-form-row__col box-form-row__col_2">
                <label class="box-field__label">Создайте промо-код</label>
                <div class="box-field__input">
                  <input type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="box-field">
              <label class="box-field__label">Выберите бонус</label>
              <div class="box-field__input">
                <div class="cust-select cust-select-xs">
                  <div class="cust-select-title js-cust-select">
                    <span></span>
                    <i class="icon-bottom-arrow"></i>
                  </div>
                  <div class="cust-select-dropdown">
                    <ul class="cust-select-list js-select-list">
                      <li class="cust-select-list__item">
                        <a href="#" class="cust-select-list__link">Все розничные клиенты</a>
                      </li>
                      <li class="cust-select-list__item ">
                        <a href="#" class="cust-select-list__link">Только новые (розница)</a>
                      </li>
                      <li class="cust-select-list__item">
                        <a href="#" class="cust-select-list__link">Все оптовые клиенты</a>
                      </li>
                      <li class="cust-select-list__item active">
                        <a href="#" class="cust-select-list__link">Дропшиппинг</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-field">
              <label class="box-field__label">Группа клиентов</label>
              <div class="box-field__input">
                <div class="cust-select cust-select-xs">
                  <div class="cust-select-title js-cust-select">
                    <span></span>
                    <i class="icon-bottom-arrow"></i>
                  </div>
                  <div class="cust-select-dropdown">
                    <ul class="cust-select-list js-select-list">
                      <li class="cust-select-list__item">
                        <a href="#" class="cust-select-list__link">Все розничные клиенты</a>
                      </li>
                      <li class="cust-select-list__item active">
                        <a href="#" class="cust-select-list__link">Только новые (розница)</a>
                      </li>
                      <li class="cust-select-list__item">
                        <a href="#" class="cust-select-list__link">Все оптовые клиенты</a>
                      </li>
                      <li class="cust-select-list__item ">
                        <a href="#" class="cust-select-list__link">Дропшиппинг</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-field">
              <label class="box-field__label">Изображение акции</label>
              <div class="box-field__input img-discount">
                <label class="load-img-discount" @change="addFile($event.target.files[0])">
                  <span class="load-img-discount__preview"></span>
                  <span class="load-img-discount__text">Размер изображение не должен превышать 999 мб.</span>
                  <input type="file">
                </label>
                <a href="#" class="img-discount__delete"><i class="icon-delete-button"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div class="add-product__col add-product__col_3">
          <div class="white-item">
            <div class="box-field period-discount">
              <label class="box-field__label">Период акции</label>
              <div class="box-field__input">
                <datepicker
                  class="datepicker-my"
                  v-model="date.to"
                  :language="ru"
                  :monday-first="true"
                  :inline="true"/>
                <datepicker
                  class="datepicker-my"
                  v-model="date.from"
                  :language="ru"
                  :monday-first="true"
                  :inline="true"/>
              </div>
            </div>
            <div class="text-center">
              <button class="btn-black">Добавить скидку</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DiscountCategory from '@/components/pages/Discount/Add/DiscountCategory'
import Datepicker from 'vuejs-datepicker'
import { ru } from 'vuejs-datepicker/dist/locale'
export default {
  name: 'index',
  metaInfo: {
    title: 'Добавление скидки',
    titleTemplate: '%s | Red Cat STORE'
  },
  components: { DiscountCategory, Datepicker },
  data () {
    return {
      ru: ru,
      date: {
        to: new Date(),
        from: new Date()
      },
      images: []
    }
  },
  methods: {
    addFile (files) {
      const {size} = files
      if (size <= 1022976) {
        const reader = new FileReader()
        reader.onload = () => {
          this.images = [...this.images, reader.result]
        }
        reader.readAsDataURL(files)
      } else {
        alert('Размер изображение не должен превышать 999 мб.')
      }
    }
  }
}
</script>
<style lang="scss">
  .rtl {
    direction: rtl;
  }
  .vdp-datepicker {
    position: relative;
    text-align: left;
  }
  .vdp-datepicker * {
    box-sizing: border-box;
  }

  .datepicker-my {
    width: 50%;
    padding: 0 15px;

    .vdp-datepicker__calendar {
      position: absolute;
      z-index: 100;
      background: #fff;
      border: 1px solid gainsboro;
      -webkit-border-radius: 2px;
      border-radius: 2px;
      width: 100%;
      padding: 2.6px 2.6px 0;
    }
    .vdp-datepicker__calendar header {
      display: block;
      line-height: 33px;
      overflow: hidden;
      border-bottom: 1px solid gainsboro;
      color: #191919;
      font-size: 14px;
      font-weight: 400;
      text-transform: uppercase;
      font-family: Arial,Helvetica,sans-serif;
    }
    .vdp-datepicker__calendar header span {
      display: inline-block;
      text-align: center;
      width: 71.42857142857143%;
      float: left;
    }
    .vdp-datepicker__calendar header .prev,
    .vdp-datepicker__calendar header .next {
      width: 14.285714285714286%;
      float: left;
      text-indent: -10000px;
      position: relative;
      font-size: 0;
    }
    .vdp-datepicker__calendar header .prev:after,
    .vdp-datepicker__calendar header .next:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      border: 6px solid transparent;
      display: none;
    }
    .vdp-datepicker__calendar header .prev:after {
      margin-left: -5px;

    }
    .vdp-datepicker__calendar header .prev.disabled:after {
      border-right: 10px solid #ddd;
    }
    .vdp-datepicker__calendar header .next:after {
      margin-left: 5px;
    }
    .vdp-datepicker__calendar header .next.disabled:after {
      border-left: 10px solid #ddd;
    }

    .vdp-datepicker__calendar header .prev:before,
    .vdp-datepicker__calendar header .next:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 11px;
      height: 11px;
      display: block;
    }

    .vdp-datepicker__calendar header .prev:before {
      background: transparent url('~@/assets/img/chevron-left.svg') center no-repeat;
    }

    .vdp-datepicker__calendar header .next:before {
      background: transparent url('~@/assets/img/chevron-right.svg') center no-repeat;
    }

    .vdp-datepicker__calendar header .prev:not(.disabled),
    .vdp-datepicker__calendar header .next:not(.disabled),
    .vdp-datepicker__calendar header .up:not(.disabled) {
      cursor: pointer;
    }
    .vdp-datepicker__calendar header .prev:not(.disabled):hover,
    .vdp-datepicker__calendar header .next:not(.disabled):hover,
    .vdp-datepicker__calendar header .up:not(.disabled):hover {
      background: transparent;
    }
    .vdp-datepicker__calendar .disabled {
      color: #ddd;
      cursor: default;
    }
    .vdp-datepicker__calendar .flex-rtl {
      display: flex;
      width: inherit;
      flex-wrap: wrap;
    }
    .vdp-datepicker__calendar .cell {
      text-align: center;
      color: #555;
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      text-transform: uppercase;
      background-color: transparent;
      height: auto;
      padding: 5px 0 5px;
      border: 1px solid transparent;

    }
    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day,
    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month,
    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year {
      cursor: pointer;
    }
    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
    .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
      border: 1px solid #e66b6b;
    }
    .vdp-datepicker__calendar .cell.selected {
      color: #e66b6b;
      border: 1px solid #e66b6b;
    }
    .vdp-datepicker__calendar .cell.selected:hover {
      background: transparent;
    }
    .vdp-datepicker__calendar .cell.selected.highlighted {
      background: transparent;
    }
    .vdp-datepicker__calendar .cell.highlighted {
      background: transparent;
    }
    .vdp-datepicker__calendar .cell.highlighted.disabled {
      color: #a3a3a3;
    }
    .vdp-datepicker__calendar .cell.grey {
      color: #888;
    }
    .vdp-datepicker__calendar .cell.grey:hover {
      background: inherit;
    }
    .vdp-datepicker__calendar .cell.day-header {
      white-space: nowrap;
      cursor: inherit;
      color: #e66b6b;
      font-family: "Open Sans", sans-serif;
      font-size: 10px;
      font-weight: 600;
      line-height: 12px;
      text-transform: uppercase;
    }
    .vdp-datepicker__calendar .cell.day-header:hover {
      background: inherit;
    }
    .vdp-datepicker__calendar .month,
    .vdp-datepicker__calendar .year {
      width: 33.333%;
    }
    .vdp-datepicker__clear-button,
    .vdp-datepicker__calendar-button {
      cursor: pointer;
      font-style: normal;
    }
    .vdp-datepicker__clear-button.disabled,
    .vdp-datepicker__calendar-button.disabled {
      color: #999;
      cursor: default;
    }
  }

</style>
