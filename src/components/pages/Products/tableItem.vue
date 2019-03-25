<template>
  <li v-if="item" class="table-list__item" @dblclick="$router.push({path: '/products/edit/' + item._id})" :class="[{'check-row': check}, {'hidden-item': !item.published}]">
    <div class="col col_1">
      <label class="check-table">
        <input v-model="check" type="checkbox">
        <span class="check-table__icon"></span>
      </label>
    </div>
    <div class="col col_2">
      <div class="flex-row">
        <a href="#photo-1" class="brand-img js-tip img-bg-box" >
          <!--<img class="fixed-width-image" :src="firstImage" alt="">-->
          <span class="img-bg" :style="{backgroundImage: `url(${firstImage})`}"></span>
        </a>
        <span class="flex-row__col">
          <span>{{item.name}}</span>
        </span>
      </div>
    </div>
    <div class="col col_3">
      <div class="cust-select cust-select-xs cust-select-width-1">
        <div class="cust-select-title js-cust-select">
          <span>{{item.category ? item.category.name : 'нет'}}</span>
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
    <div class="col col_4">
      <div class="cust-select cust-select-xs cust-select-width-2">
        <div class="cust-select-title js-cust-select">
          <span>{{item.subcategory ? item.subcategory.name : 'нет'}}</span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item ">
              <a href="#" class="cust-select-list__link">Обувь</a>
            </li>
            <li class="cust-select-list__item ">
              <a href="#" class="cust-select-list__link">Одежда</a>
            </li>
            <li class="cust-select-list__item">
              <a href="#" class="cust-select-list__link">Аксессуары</a>
            </li>
            <li class="cust-select-list__item active">
              <a href="#" class="cust-select-list__link">Кроссовки</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col col_5">
      <div class="cust-select cust-select-xs cust-select-width-3">
        <div class="cust-select-title js-cust-select">
          <span>{{item.brand_ids.length ? item.brand_ids.length : 'нет'}}</span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item ">
              <a href="#" class="cust-select-list__link">Balenciaga</a>
            </li>
            <li class="cust-select-list__item ">
              <a href="#" class="cust-select-list__link">Supreme</a>
            </li>
            <li class="cust-select-list__item active">
              <a href="#" class="cust-select-list__link">Nike</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col col_6 nowrap"><span>{{item.sizes.length}} размеров</span></div>
    <div class="col col_8"><input type="text" class="change-input" v-model="item.sizeX" disabled></div>
    <div class="col col_9"><input type="text" class="change-input" v-model="item.sizeY" disabled></div>
    <div class="col col_7"><input type="text" class="change-input" v-model="item.sizeZ" disabled></div>
    <div class="col col_10 nowrap"><input type="text" class="change-input" v-model="item.weight" disabled></div>
    <div class="col col_11">
      <span v-if="item.weight" class="nowrap">STD_Standart: {{ countStd('russia', 'standart', item.weight / 1000) + 'руб.' }}</span>
      <span v-if="item.weight" class="nowrap">STD_Express: {{ countStd('russia', 'express', item.weight / 1000) + 'руб.' }}</span>
    </div>
    <div class="col col_11">
      <span v-if="item.weight" class="nowrap">STD_Standart: {{ countStd('belarus', 'standart', item.weight / 1000) + 'руб.' }}</span>
      <span v-if="item.weight" class="nowrap">STD_Express: {{ countStd('belarus', 'express', item.weight / 1000) + 'руб.' }}</span>
    </div>
    <div class="col col_11">
      <span v-if="item.weight" class="nowrap">STD_Express: {{ countStd('kazakhstan', 'standart', item.weight / 1000) + 'руб.' }}</span>
    </div>
    <div class="col col_11">
      <span v-if="item.weight" class="nowrap">Epacket: {{ countEpacket(item.weight / 1000) + 'руб.' }}</span>
      <span v-if="item.weight" class="nowrap">EMS: {{ countEms(item.weight / 1000) + 'руб.' }}</span>
      <span v-if="item.weight" class="nowrap">DHL: {{ countDhl(item.weight / 1000) + 'руб.' }}</span>
    </div>
    <!-- <div class="col col_13">
      <span>Epacket: 120 р.</span>
      <span>EMS: 156 р.</span>
      <span>Cargo: 26 р.</span>
    </div> -->
    <!-- <div class="col col_14"><input type="text" class="change-input" value="280" disabled><span class="currency">р.</span></div> -->
    <!-- <div class="col col_15"><input type="text" class="change-input" value="280" disabled><span class="currency">р.</span></div> -->
    <!-- <div class="col col_16"><input type="text" class="change-input" value="280" disabled><span class="currency">р.</span></div> -->
    <div class="col col_17">
      <span class="nowrap">средний: {{_(item, 'qualities.middle.self') || 'нет'}}</span> <br>
      <span class="nowrap">высокий: {{_(item, 'qualities.high.self') || 'нет'}}</span> <br>
      <span class="nowrap">премиум: {{_(item, 'qualities.premium.self') || 'нет'}}</span>
    </div>
    <div class="col col_18">
      <span class="nowrap">средний: {{_(item, 'qualities.middle.overprice') || 'нет'}}</span> <br>
      <span class="nowrap">высокий: {{_(item, 'qualities.high.overprice') || 'нет'}}</span> <br>
      <span class="nowrap">премиум: {{_(item, 'qualities.premium.overprice') || 'нет'}}</span>
    </div>
    <div class="col col_19">
      <span class="nowrap">средний: {{_(item, 'qualities.middle.site') || 'нет'}}</span> <br>
      <span class="nowrap">высокий: {{_(item, 'qualities.high.site') || 'нет'}}</span> <br>
      <span class="nowrap">премиум: {{_(item, 'qualities.premium.site') || 'нет'}}</span>
    </div>
    <!-- <div class="col col_20">
      <span>Epacket: 120 р.</span>
      <span>EMS: 156 р.</span>
      <span>Cargo: 26 р.</span>
    </div> -->
    <!-- <div class="col col_21">
      <div class="cust-select cust-select-xs cust-select-width-4">
        <div class="cust-select-title js-cust-select">
          <span>Бонус за...</span>
          <i class="icon-bottom-arrow"></i>
        </div>
        <div class="cust-select-dropdown">
          <ul class="cust-select-list js-select-list">
            <li class="cust-select-list__item ">
              <a href="#" class="cust-select-list__link">Balenciaga</a>
            </li>
            <li class="cust-select-list__item ">
              <a href="#" class="cust-select-list__link">Supreme</a>
            </li>
            <li class="cust-select-list__item active">
              <a href="#" class="cust-select-list__link">Nike</a>
            </li>
          </ul>
        </div>
      </div>
    </div> -->
    <div class="col col_22" v-if="item.provider.photos.length">
      <div class="flex-row">
        <!--<a href="#qr-code-1" class="qr-img js-tip">-->
        <!--<img :src="item.provider.photos[0]" alt="" @click.prevent="showQrs = !showQrs">-->
        <!--</a>-->
        <a class="qr-img img-bg-box js-tip"
           v-for="(img, index) of item.provider.photos"
           :key="img"
           :data-fancybox="item._id"
           :href="img" :style="{display: index === 0 ? 'block' : 'none'}">
          <span class="img-bg" :style="{backgroundImage: `url(${img})`}" :src="img" ></span>
        </a>
        <span v-if="item.provider.photos.length" class="flex-row__col">
          <span v-if="item.provider.photos.length" class="qr-code-counter" @click.prevent="showQrs = !showQrs">+{{item.provider.photos.length}}</span>
        </span>
        <!-- <div :class="{'qr-code-viewer': true, 'active': showQrs}"></div> -->
      </div>
    </div>
    <div class="col col_23">
      <input type="text" class="change-input" v-model="item.provider.name" disabled>
    </div>
    <div class="col col_23" v-if="!item.provider.photos.length"></div>
    <div class="col col_24">
      <ul class="order-links">
        <li class="order-links__item order-links__item_edit">
          <a href="#" class="order-links__link js-edit-row"><i class="icon-edit"></i></a>
        </li>
        <li class="order-links__item order-links__item_save">
          <a href="#" class="order-links__link js-save-row"><i class="icon-checked"></i></a>
        </li>
        <li class="order-links__item order-links__item_eye">
          <a href="#" class="order-links__link js-save-row"><i class="icon-eye"></i></a>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
import _ from 'object-get'
import countDeliveryCost from '../../../countDeliveryCost'
import fancybox from '@/mixins/fancybox'
export default {
  name: 'tableItem',
  props: ['item', 'checkAll'],
  mixins: [fancybox],
  data () {
    return {
      firstImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
      check: false,
      showQrs: false,
      showQrIndex: 0
    }
  },
  watch: {
    check (val) {
      if (val) {
        this.$emit('addToArray', this.item._id)
      } else {
        this.$emit('delFromArray', this.item._id)
      }
    },
    checkAll (val) {
      this.check = val
    },

    'item.published' () {
      this.check = false
    }
  },
  created () {
    for (let q of ['middle', 'high', 'premium']) {
      if (this.item.qualities[q] && this.item.qualities[q].images && this.item.qualities[q].images.length) {
        this.firstImage = this.item.qualities[q].images[0]
        return
      }
    }
    console.log(this.item)
  },
  methods: {
    _: _,
    countEms: countDeliveryCost.ems,
    countStd: countDeliveryCost.std,
    countDhl: countDeliveryCost.dhl,
    countEpacket: countDeliveryCost.ePacket
  }
}
</script>

<style scoped>
  .table-list__item{
    cursor: pointer
  }
  .nowrap {
    white-space: nowrap
  }
  .fixed-width-image {
    width: 50px
  }
  .col.col_11 > span {
    white-space: nowrap;
  }
  .img-bg-box {
    position: relative;
  }
  .img-bg {
    display: block;
    width: 100%;
    height: 100%;
    -webkit-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    top: 0;
    left: 0;
  }
  /* .qr-code-viewer {
    display: none;
    position: absolute;
    left: 10vh;
    top: 10vh;
    width: 80vh;
    height: 80vh;
    background: lightgray;
    z-index: 10;
  }
  .qr-code-viewer.active {
    display: block;
  } */
</style>
