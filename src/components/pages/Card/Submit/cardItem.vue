<template>
  <div class="scroll-bar__item">
    <div class="purchases-name">
      <div class="purchases-name__img" :style="{backgroundImage: 'url(' + (_(item, `origin.qualities[${item.quality}].images[0]`) || nullImage) + ')'}">

      </div>
      <div class="purchases-name__descr">
        <div class="purchases-name__header">{{item.origin.name}}</div>
        <div class="purchases-name__text">{{color}}</div>
        <div class="purchases-name__size">{{item.size}}</div>
      </div>
    </div>
    <div class="purchases-amount"><span>{{item.count}}</span> шт.</div>
    <div class="purchases-price"><span>{{ item.origin.qualities[item.quality].site * item.count}}</span> руб.</div>
  </div>
</template>

<script>
import numeral from 'numeral'
import _ from 'object-get'
export default {
  name: 'cardItem',
  props: ['item'],
  computed: {
    color () {
      const color = this.item.colors.find( item => item._id === this.item.origin.color_ids[0])
      return color ? color.name : ''
    }
  },
  data() {
    return {
      nullImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png',
    }
  },
  methods: {
    _:_,

  }
}
</script>

<style scoped>
.purchases-name__img {
  -webkit-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.purchases-name__size {
  text-transform: uppercase;
}
</style>
