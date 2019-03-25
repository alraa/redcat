import $ from 'jquery'

export default {
  mounted () {
    this.$nextTick(() => {
      if ($('.js-scroll-horizont').length) {
        $('.js-scroll-horizont').mCustomScrollbar({
          axis: 'x',
          theme: 'dark-thin',
          autoExpandScrollbar: true,
          // scrollInertia: 50,
          advanced: {
            autoExpandHorizontalScroll: true
          }
        })
      }
      if ($('.js-scroll').length) {
        $('.js-scroll').mCustomScrollbar({
          axis: 'y',
          theme: 'dark-thin',
          autoExpandScrollbar: true,
          advanced: {
            autoExpandHorizontalScroll: true
          }
        })
      }
      if ($('.js-scroll-horizont').length) {
        $('.js-scroll-horizont').mCustomScrollbar({
          axis: 'x',
          theme: 'dark-thin',
          autoExpandScrollbar: true,
          setWidth: '100%'
        })
      }
    })
  }
}
