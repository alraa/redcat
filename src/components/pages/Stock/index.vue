<template>
  <main class="content akcii">
    <banner/>

    <breadcrumb :info="bread"/>

    <div class="wrapper">
      <div class="box-akcii">
        <stock-banner/>
        <stock-banner :akcii="false"/>
      </div>
    </div>

  </main>
</template>

<script>
import StockBanner from '@/components/pages/Stock/StockBanner'

export default {
  name: 'index',
  components: { StockBanner },
  computed: {
    bread () {
      return [
        {
          link: false,
          name: this.$route.name
        }
      ]
    }
  }
}
</script>
