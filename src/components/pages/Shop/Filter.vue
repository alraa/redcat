<template>
  <div class="cataloge-nav-wrapper">
    <div v-if="params.name" id="search-term-banner" class="_1UL_oeJ">
      <p class="_3l16dhH">Результаты поиска по</p>
      <p class="NvorkQI">{{params.name}}</p>
    </div>
    <div class="wrapper">
      <nav class="cataloge-nav js-cataloge-nav">
        <ul class="cataloge-nav__list" v-click-outside="hide">
          <li @click.prevent="selectFilter('sex')"  class="cataloge-nav__item">{{sort.sex ? getSexName(sort.sex) : 'Пол'}}
            <div class="cataloge-sex-popup" @click.stop :class="{'open': selectedFilter === 'sex'}">
              <div class="cataloge-nav-popup_top">
                <div class="cataloge-nav-popup-text">Выберите пол</div>
                <div class="js-cataloge-sex-cleanBtn cataloge-sex-cleanBtn" @click.stop="sort.sex = ''">Очистить</div>
              </div>
              <div class="cataloge-nav-popup_bottom">
                <input type="radio" v-model="sort.sex" value="male" id="sex_1" name="sex">
                <label for="sex_1">Мужской</label>

                <input type="radio" v-model="sort.sex" value="female" id="sex_2" name="sex">
                <label for="sex_2">Женский</label>

                <input type="radio" v-model="sort.sex" value="unisex" id="sex_3" name="sex">
                <label for="sex_3">Унисекс</label>
              </div>
            </div>
          </li>
          <li @click.prevent="selectFilter('cat')" class="cataloge-nav__item">
            {{sort.category_id.length ? 'Катеогрий: ' + sort.category_id.length : 'Категория'}}
            <div class="cataloge-filter-wrapper-outer" @click.stop :class="{'open': selectedFilter === 'cat'}">
              <div class="cataloge-filter-top">
                <div class="cataloge-filter__result">Выбрано: <span>{{sort.category_id.length}}</span></div>
                <div class="cataloge-filter__btn" @click.stop="sort.category_id = []">Очистить</div>
              </div>
              <div class="cataloge-filter-wrapper">

                <div class="cataloge-filter-bottom">
                  <div class="content-info__checkbox">
                    <div class="content-checkbox__block" v-for="(cat, index) in info.cats" :key="cat._id">
                      <input type="checkbox" :value="cat._id" v-model="sort.category_id" :id="'item_' + index + 1">
                      <label :for="'item_' + index + 1">{{cat.name}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li @click.prevent="selectFilter('subcat')" class="cataloge-nav__item" style="width: 160px;">
            {{sort.subcategory_id.length ? 'Подкатегорий: ' + sort.subcategory_id.length : 'Подкатегория'}}
            <div class="cataloge-filter-wrapper-outer" @click.stop :class="{'open': selectedFilter === 'subcat'}">
              <div class="cataloge-filter-top">
                <div class="cataloge-filter__result">Выбрано: <span>{{sort.subcategory_id.length}}</span></div>
                <div class="cataloge-filter__btn" @click.stop="sort.subcategory_id = []">Очистить</div>
              </div>
              <div class="cataloge-filter-wrapper">

                <div class="cataloge-filter-bottom">
                  <div class="content-info__checkbox">
                    <div class="content-checkbox__block" v-for="(cat, index) in info.subcats" :key="cat._id">
                      <input type="checkbox" :value="cat._id" v-model="sort.subcategory_id" :id="'item_' + index + 3">
                      <label :for="'item_' + index + 3">{{cat.name}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="cataloge-nav__item" @click.prevent="selectFilter('brand')">
          {{sort.brand_id.length ? 'Брендов: ' + sort.brand_id.length : 'Бренд'}}
            <div class="cataloge-filter-wrapper-outer" @click.stop :class="{'open': selectedFilter === 'brand'}">
              <div class="cataloge-filter-top">
                <div class="cataloge-filter__result">Выбрано: <span>{{sort.brand_id.length}}</span></div>
                <div class="cataloge-filter__btn" @click.stop="sort.brand_id = []">Очистить</div>
              </div>
              <div class="cataloge-filter-wrapper">

                <div class="cataloge-filter-bottom">
                  <div class="content-info__checkbox">
                    <div class="content-checkbox__block" v-for="(brand, index) in info.brands" :key="brand._id">
                      <input type="checkbox" :value="brand._id" v-model="sort.brand_id" :id="'item_' + index + 7">
                      <label :for="'item_' + index + 7">{{brand.name}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li @click.prevent="selectFilter('color')" class="cataloge-nav__item">
            {{sort.color.length ? 'Цветов: ' + sort.color.length : 'Цвет'}}
            <div class="cataloge-filter-wrapper-outer" @click.stop :class="{'open': selectedFilter === 'color'}">
              <div class="cataloge-filter-top">
                <div class="cataloge-filter__result">Выбрано: <span>{{sort.color.length}}</span></div>
                <div class="cataloge-filter__btn" @click.stop="sort.color = []">Очистить</div>
              </div>
              <div class="cataloge-filter-wrapper">

                <div class="cataloge-filter-bottom">
                  <div class="content-info__checkbox">
                    <div class="content-checkbox__block" v-for="(color, index) in info.colors" :key="color._id">
                      <input type="checkbox" :value="color._id" v-model="sort.color" :id="'item_' + index + 5">
                      <label :for="'item_' + index + 5">{{color.name}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li @click.prevent="selectFilter('season')" class="cataloge-nav__item">
            Сезоны
            <div class="cataloge-filter-wrapper-outer" @click.stop :class="{'open': selectedFilter === 'season'}">
              <div class="cataloge-filter-top">
                <div class="cataloge-filter__result"></div>
                <div class="cataloge-filter__btn" @click.prevent="clearSeasons">Очистить</div>
              </div>
              <div class="cataloge-filter-wrapper">

                <div class="cataloge-filter-bottom">
                  <div class="content-info__checkbox">
                    <div class="content-checkbox__block" v-for="(season, index) in seasons" :key="index">
                      <input type="checkbox" v-model="sort[season]" :id="'item_' + index + 9">
                      <label :for="'item_' + index + 9">{{getSeasonName(season)}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li @click.prevent="selectFilter('price')" class="cataloge-nav__item">Цена
            <div class="cataloge-nav-popup" @click.stop :class="{'open': selectedFilter === 'price'}">
              <div class="cataloge-nav-popup_top">
                <div class="ion-cleanBtn-text">Ценовой диапазон</div>
                <div class="js-cleanBtn ion-cleanBtn" @click.prevent="clearFilterPrice([0, 100000])">Очистить</div>
              </div>
              <div class="cataloge-nav-popup_bottom">
                <no-ssr>
                  <vue-slider ref="slider" class="slide-price" v-bind="sliderOptions" v-model="sliderOptions.value"></vue-slider>
                </no-ssr>
              </div>
            </div>
          </li>
          <!--<li @click.prevent="changeArchive" class="cataloge-nav__item clean-filter__btn js-clean-filter__btn">Применить фильтры</li>-->
          <li @click.prevent="clearArchive" class="cataloge-nav__item clean-filter__btn js-clean-filter__btn">очистить фильтры</li>
        </ul>

      </nav>
    </div>
  </div>
</template>

<script>
// import qs from 'querystring'
// import { switchCase } from 'babel-types'
import ClickOutside from 'vue-click-outside'

let components = {}
if (process.browser) {
  let VueSlider = require('vue-slider-component')
  components['vue-slider'] = VueSlider
}
let clearSort = {
  sex: '',
  name: '',
  color: [],
  category_id: [],
  brand_id: [],
  subcategory_id: [],
  subcat: [],
  winter: false,
  summer: false,
  autumn: false,
  spring: false,
  minPrice: '',
  maxPrice: ''
}

export default {
  name: 'FilterItem',
  props: ['info', 'params'],
  components,
  watch: {
    // params: {
    //   handler(val) {
    //     this.clearSort()
    //     for (let key in val){
    //       if(key === 'limit' || key === 'skip')
    //         continue
    //       console.log(typeof this.sort[key])
    //       if(typeof this.sort[key] === 'object' && typeof val[key] !== 'object'){
    //         this.sort[key].push(val[key])
    //       } else {
    //         this.sort[key] = val[key]
    //       }
    //     }
    //   },
    // },
    'sort': {
      handler () {
        clearTimeout(this.timeId)
        this.timeId = setTimeout(() => {
          this.changeArchive()
        }, 300)
      },
      deep: true
    }
  },
  directives: {
    ClickOutside
  },
  data () {
    return {
      timeId: null,
      sliderOptions: {
        value: [0, 100000],
        width: '100%',
        height: 6,
        dotSize: 16,
        min: 0,
        max: 100000,
        disabled: false,
        show: true,
        tooltip: 'always',
        formatter (value) {
          return `${value} руб`
        },
        enableCross: false,
        // mergeFormatter (value1, value2) {
        //   return `${value1} руб - ${value2} руб`
        // },
        bgStyle: {
          backgroundColor: '#e8e8e8',
          boxShadow: 'none'
        },
        tooltipStyle: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: '#3f3f3f',
          fontSize: '12px'
        },
        processStyle: {
          backgroundColor: '#f7002c'
        }
      },
      showSlider: false,
      selectedFilter: '',
      seasons: ['winter', 'summer', 'autumn', 'spring'],
      sort: {
        sex: '',
        name: '',
        color: [],
        category_id: [],
        brand_id: [],
        subcategory_id: [],
        subcat: [],
        winter: false,
        summer: false,
        autumn: false,
        spring: false,
        minPrice: '',
        maxPrice: ''
      },
      filterString: ''
    }
  },
  methods: {
    getSexName (key) {
      switch (key) {
        case 'male':
          return 'Мужской'
        case 'female':
          return 'Женский'
        case 'unisex':
          return 'Унисекс'
        default:
          return 'Пол'
      }
    },

    hide () {
      this.selectedFilter = ''
      // this.changeArchive()
    },

    clearSort () {
      for (let key in this.sort) {
        switch (typeof this.sort[key]) {
          case 'object':
            this.sort[key] = []
            break
          case 'boolean':
            this.sort[key] = false
            break
          case 'string':
            this.sort[key] = ''
            break
          case 'number':
            this.sort[key] = 0
            break
          default:
            alert('Я таких значений не знаю')
        }
      }
    },

    clearSeasons () {
      this.sort.winter = false
      this.sort.summer = false
      this.sort.autumn = false
      this.sort.spring = false
    },

    clearFilterPrice (value) {
      // this.sliderOptions.value = [this.sliderOptions.min, this.sliderOptions.max]
      this.sliderOptions.value = value
    },

    getSeasonName (key) {
      switch (key) {
        case 'winter':
          return 'Зима'
        case 'summer':
          return 'Лето'
        case 'autumn':
          return 'Осень'
        case 'spring':
          return 'Весна'
        default:
          return 'Сезон'
      }
    },

    selectFilter (filterName) {
      this.selectedFilter === filterName ? this.selectedFilter = '' : this.selectedFilter = filterName
    },
    changeArchive () {
      // this.selectedFilter = ''
      let sortMS = {}
      for (let key in this.sort) {
        if (!this.empty(this.sort[key])) {
          sortMS[key] = this.sort[key]
        }
      }
      if (this.$route.query.name) {
        sortMS.name = this.$route.query.name
      }
      this.$router.push({ path: 'catalog', query: sortMS })
      // this.sort = clearSort
    },
    clearArchive () {
      this.sort.sex = ''
      this.sort.name = ''
      this.sort.color = []
      this.sort.category_id = []
      this.sort.brand_id = []
      this.sort.subcategory_id = []
      this.sort.subcat = []
      this.sort.winter = false
      this.sort.summer = false
      this.sort.autumn = false
      this.sort.spring = false
      this.clearFilterPrice([0, 100000])
      if (this.$route.query.name) {
        this.$router.push({ path: 'catalog', query: { name: this.$route.query.name } })
      } else {
        this.$router.push({ path: 'catalog' })
      }
    },
    empty (val) {
      if (val === undefined) { return true }

      if (typeof (val) === 'boolean') { return !val }

      if (typeof (val) === 'function' || typeof (val) === 'number' || Object.prototype.toString.call(val) === '[object Date]') { return false }

      if (val == null || val.length === 0) { return true }

      if (typeof (val) === 'object') {
        var r = true
        for (var f in val) { r = false }
        return r
      }

      return false
    }
  },
  updated () {
    this.$nextTick(function () {
      this.$refs.slider.refresh()
      this.sort.minPrice = this.sliderOptions.value[0]
      this.sort.maxPrice = this.sliderOptions.value[1]
    })
  }

}
</script>

<style scoped lang="scss">
.open {
  display: block !important;
}
._1UL_oeJ {
  background: #f8f8f8;
  text-align: center;
  padding: 10px;
  margin-bottom: 35px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

._3l16dhH, .NvorkQI {
    color: #2d2d2d;
    padding: 0;
}
._3l16dhH {
    font-size: 14px;
    line-height: 1.57;
    letter-spacing: .4px;
}
._3l16dhH, .NvorkQI {
    margin: 0;
}

@media (min-width: 768px){
  .NvorkQI {
      font-size: 24px;
  }
}
.NvorkQI {
    font-size: 22px;
    font-weight: 900;
    line-height: 1.45;
    letter-spacing: 1.8px;
    text-transform: capitalize;
}
._3l16dhH, .NvorkQI {
    color: #2d2d2d;
    padding: 0;
}
._3l16dhH, .NvorkQI {
    margin: 0;
}

  .slide-price {
    margin-top: 20px;
  }

</style>
