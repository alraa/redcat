import $ from 'jquery'
export default {
  mounted () {
    this.$nextTick(() => {
      const $datepicker = $('#datepicker')
      if ($datepicker.length) {
        $datepicker.datepicker()
      }
    })
  }
}
