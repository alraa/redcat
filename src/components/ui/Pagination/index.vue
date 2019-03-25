<template>
  <ul class="paging-list">
    <li class="paging-list__item paging-prev" v-if="hasPrev()">
      <a class="paging-list__link" @click.prevent='changePage(prevPage)'>
        <i class="icon-left-arrow"></i>
      </a>
    </li>
    <li class="paging-list__item paging-prev" v-else>
      <a class="paging-list__link paging-list__item_disabled">
        <i class="icon-left-arrow"></i>
      </a>
    </li>

    <li class="paging-list__item paging-list__item_1 " v-if='hasFirst()' @click='changePage(1)'>
      <a class="paging-list__link paging-list__link_point">1</a>
    </li>
    <li class="paging-list__item" v-if='hasFirst()'>
      <a class="paging-list__link paging-list__link_point">•••</a>
    </li>

    <li class="paging-list__item"
        v-for='(page, index) in pages'
        :key="page"
        :class='{active: current === page, "paging-list__item_1": index === 0 && !hasFirst(), "paging-list__item_last": pages.length === ++index && !hasLast()}'>
      <a href="#" class="paging-list__link" @click.prevent='changePage(page)'>{{page}}</a>
    </li>

    <li class="paging-list__item" v-if='hasLast()'>
      <a class="paging-list__link paging-list__link_point">•••</a>
    </li>
    <li class="paging-list__item paging-list__item_last" v-if='hasLast()' @click='changePage(totalPages)'>
      <a class="paging-list__link paging-list__link_point">{{totalPages}}</a>
    </li>

    <li class="paging-list__item paging-prev" v-if='hasNext()'>
      <a class="paging-list__link" @click.prevent='changePage(nextPage)'>
        <i class="icon-right-arrow_2"></i>
      </a>
    </li>
    <li class="paging-list__item paging-prev" v-else>
      <a class="paging-list__link paging-list__item_disabled">
        <i class="icon-right-arrow_2"></i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 1
    },
    pagePange: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pages () {
      var pages = []
      for (var i = this.ranteStart; i <= this.ranteEnd; i++) {
        pages.push(i)
      }
      return pages
    },
    ranteStart () {
      const start = this.current - this.pagePange
      return (start > 0) ? start : 1
    },
    ranteEnd () {
      var end = this.current + this.pagePange
      return (end < this.totalPages) ? end : this.totalPages
    },
    totalPages () {
      return Math.ceil(this.total / this.perPage)
    },
    nextPage () {
      return this.current + 1
    },
    prevPage () {
      return this.current - 1
    }
  },
  methods: {
    hasFirst: function () {
      return this.ranteStart !== 1
    },
    hasLast: function () {
      return this.ranteEnd < this.totalPages
    },
    hasPrev: function () {
      return this.current > 1
    },
    hasNext: function () {
      return this.current < this.totalPages
    },
    changePage: function (page) {
      this.$emit('page-changed', page)
    }
  }
}
</script>

<style scoped>
.paging-list__item {
  cursor: pointer;
}
.paging-list__item_disabled {
  cursor: default;
  color: #bdc2c5!important;
}
</style>
