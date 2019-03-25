<template>
  <div>
    <banner />
    <FilterItem :params="$route.query" :info="allProducts" />
    <breadcrumb :info="bread"/>

    <div>
      <div class="wrapper">
        <div class="cataloge-container">
          <div class="cataloge-wrapper">
            <shopItem v-for="(item) in allProducts.items" :item="item" :key="item._id" />
          </div>

          <div class="cataloge-result-wrapper">
            <div class="cataloge-result">Вы просмотрели <span>{{_(allProducts, 'items.length')}}</span> из <span>{{allProducts.total}}</span> товаров</div>
            <div class="cataloge-range-wrapper">
              <div class="cataloge-range" :style="'width:' + ((_(allProducts, 'items.length') || 1) / (_(allProducts, 'total') || 1)) * 100 + '%' "></div>
            </div>
            <div class="cataloge-load__btn" @click.prevent="moreItems" v-if="(_(allProducts, 'items.length') || 0) !== allProducts.total">Загрузить еще</div>
          </div>

          <div class="cataloge_bottom-nav">
            <router-link :to="{path: 'catalog', query: {category_id: cat._id}}" class="cataloge_bottom__btn" v-for="cat in allProducts.cats" :key="cat._id">{{cat.name}}</router-link>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shopItem from './shopItem'
import FilterItem from './Filter'
import { mapActions } from 'vuex'
import _ from 'object-get'
export default {
  name: 'index',
  components: { shopItem, FilterItem },
  data () {
    return {
      allProducts: [],
      limit: 12,
      page: 0,
      bread: []
    }
  },
  created () {
    let str = this.$route.query
    str.limit = this.limit
    str.skip = this.page * this.limit
    this.getAllProducts(str)
      .then(res => {
        this.allProducts = res
        this.bread = []
        if (this.$route.query.category_id) {
          this.bread.push({ link: false, name: res.cats[res.cats.findIndex(i => i._id === this.$route.query.category_id)].name })
        }
        if (this.$route.query.subcategory_id) {
          this.bread.push({ link: false, name: res.subcats[res.subcats.findIndex(i => i._id === this.$route.query.subcategory_id)].name })
        }
      })
  },
  watch: {
    '$route.query': {
      handler (val) {
        this.page = 0
        let str = val
        str.limit = this.limit
        str.skip = this.page * this.limit
        this.getAllProducts(str)
          .then(res => {
            this.allProducts = res
            this.bread = []

            if (val.category_id !== undefined && val.category_id.length) {
              this.bread.push({ link: false, name: res.cats[res.cats.findIndex(i => i._id === val.category_id[0])].name })
            }
            if (val.subcategory_id !== undefined && val.subcategory_id.length) {
              this.bread.push({ link: false, name: res.subcats[res.subcats.findIndex(i => i._id === val.subcategory_id[0])].name })
            }
          })
      },
      deep: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      $(document).trigger('ready')
    })
  },

  methods: {
    ...mapActions('shop', ['getAllProducts']),
    _: _,
    moreItems () {
      let str = this.$route.query
      str.limit = 12
      this.page += 1
      str.skip = this.page * this.limit
      this.getAllProducts(str)
        .then(res => {
          this.allProducts.items = [...this.allProducts.items, ...res.items]
        })
    }
  }

}
</script>

<style scoped>
.cataloge-wrapper {
  justify-content: flex-start;
}
.cataloge-nav-wrapper {
  padding: 25px 0 10px 0;
}

.cataloge_bottom-nav {
  justify-content: center
}

.cataloge_bottom-nav a {
  margin: 0 5px;
}
</style>
