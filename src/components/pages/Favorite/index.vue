<template>
  <div>
    <banner />
    <breadcrumb :info="[{name: 'Избранное', link: false}]"/>
    <div class="wrapper">
      <div class="cataloge-container">
        <div class="cataloge-wrapper cataloge-wrapper_start">
          <favoriteItem v-for="wishItem in items" :key="wishItem._id" :item="wishItem" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapState, mapMutations} from 'vuex'
import favoriteItem from './favoriteItem'
import * as Api from '@/api'
export default {
  name: "index",
  components: {
    favoriteItem
  },
  data() {
    return {
      items: []
    }
  },

  watch: {
    wish(val) {
      if(val.length) {
      Api.getProductsByIds(this.wish)
          .then(({items}) => {
            this.items = items
          })
        }
    }

  },

  mounted() {
    this.$nextTick(() => {
      $(document).trigger('ready')
      if(this.wish.length) {
        Api.getProductsByIds(this.wish)
          .then(({items}) => {
            this.items = items
          })
        }
    })
  },
  computed: {
    ...mapState(['wish'])
  },
  methods: {
    ...mapMutations(['addToWish'])
  }
}
</script>

<style scoped>
  .cataloge-wrapper_start {
    justify-content: flex-start;
  }
</style>
