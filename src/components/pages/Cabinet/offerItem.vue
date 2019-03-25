<template>
  <div class="purchases-block-wrapper">

    <div class="purchases-block">
      <div v-if="!showInfo" @click.prevent="showInfo = true" class="purchases-block_visible">
        <div class="purchases-date">{{date}}</div>
        <div class="purchases__item number">#{{info._id}}</div>
        <div class="purchases__item name">Рубашка Polo, штаны Jack&Jones, футболка.</div>
        <div class="purchases__item amount">Товаров: <span>{{items.length}}</span></div>
        <div class="purchases__item price"><span>{{info.onCaptureSumPrice}} </span> руб</div>

      </div>
      <div v-else class="purchases-block_inner">
        <div class="purchases-block_inner_top">
          <div class="purchases__item number">#{{info._id}}</div>
          <div class="purchases__item fio">{{info.surname}} {{info.name}} {{info.patronimic}} </div>
          <div class="purchases__item delivery">{{info.code}}, {{info.address}}</div>
          <div class="purchases__item treck-code">{{info.trackNumber}}</div>
          <div @click.prevent="showInfo = false" class="purchases__item print"></div>

        </div>
        <div class="purchases-block_inner_middle">
          <div class="scroll-bar js-scroll">
            <div class="scroll-bar__item" v-for="item in basket" :key="item.info._id">
              <div class="purchases-name">
                <div class="purchases-name__img">
                  <img :src="item.info.qualities[item.product.selectedQuality].images[0] || nullImage" alt="">
                </div>
                <div class="purchases-name__descr">
                  <div class="purchases-name__header">{{item.info.name}}</div>
                  <div class="purchases-name__size">{{item.product.selectedSize || '-'}}</div>
                </div>
              </div>
              <div class="purchases-amount"><span>{{item.count}}</span> шт.</div>
              <div class="purchases-price"><span>{{item.info.qualities[item.product.selectedQuality].site * item.count}}</span> руб.</div>
            </div>
          </div>
          <div class="order-show">
            <div class="order-show__icon">
              <i class="icon-status_map"></i>
            </div>
            <span>Показать статус заказа</span>
          </div>
        </div>
        <div class="purchases-block_inner_bottom">
          <div class="purchases-discount_date">{{date}}</div>
          <div class="purchases-discount_goods">Товаров: {{items.length}}</div>
          <div class="purchases-discount">
            <div class="purchases-discount_procent">Скидка: <span>-</span></div>
            <div class="purchases-discount_money"><span>0</span> руб.</div>
          </div>
          <div class="purchases-total">
            <div class="purchases-total_text">Всего к оплате:</div>
            <div class="purchases-total_money"><span>{{info.onCaptureSumPrice}}</span> руб.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Api from '@/api'
import {mapState} from 'vuex'
export default {
  props: ['info'],
  data() {
    return {
      date: '',
      items: '',
      showInfo: false,
      basket: [],
      nullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
    }
  },
  watch: {
    showInfo(val) {
      if(val) {
        this.$nextTick(() => {
          $(".js-scroll").mCustomScrollbar({
            axis: "y",
            theme: "dark-thin",
            autoExpandScrollbar: true,
            //            scrollInertia: 50,
            advanced: {
              autoExpandHorizontalScroll: true
            }
          });
        }) 
      }
    }
  },
  computed: {
    ...mapState('nav_info', ['colors'])
  },
  mounted() {
    let d = new Date(this.info.createdAt)
    this.date = d.getDate() + '/' +  (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1).toString() : d.getMonth() + 1) + '/' + d.getFullYear()

    Api.getUserOrder(this.info._id).then(res => {
      this.items = res.items
      let basket = []
      for(let product of this.items){
        let index = basket.findIndex(item => product.item_id === item.product.item_id)
        if(index === -1){
          basket.push({product: product, count: 1})
        } else {
          basket[index].count += 1
        }
      }

      let itemsIds = []
      for(let item of basket) {
        itemsIds.push(item.product.item_id)
      }



      Api.getProductsByIds(itemsIds)
            .then(({items}) => {
              for(let item of items) {
                let index = basket.findIndex(itemI => itemI.product.item_id === item._id)
                basket[index].info = item
              }
            })
            .catch(err => {})
      this.basket = basket
    })
  }
  
}
</script>

<style scoped>
.purchases-block_inner {
  display: block !important;
}

.number {
  display: inline-block !important;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>
