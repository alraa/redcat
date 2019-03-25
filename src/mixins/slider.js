import $ from 'jquery'

export default {
  mounted () {
    this.$nextTick(() => {
      var $slickReview2 = $('.js-photo-slider-two')
      var $numberReview2 = $('.js-photo-slider-two').next('.number-slide')
      if ($('.js-photo-slider').length && $('.js-photo-slider-2').length) {
        var $numberReview = $('.number-slide')
        var $slickReview = $('.js-photo-slider')
        $slickReview.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
          var i = (currentSlide || 0) + 1
          $numberReview.html('<span class="curr-number">' + i + '</span> <span class="curr-number_arr">/</span> ' + slick.slideCount)
        })
        $slickReview.not('.slick-initialized').slick({
          dots: false,
          infinite: false,
          fade: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: '.js-photo-slider-2',
          prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><i class="icon-right-arrow"></i></button>',
          nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><i class="icon-right-arrow"></i></button>'
        })

        $('.js-photo-slider-2').not('.slick-initialized').slick({
          dots: false,
          infinite: false,
          fade: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          asNavFor: '.js-photo-slider'
        })
      }
      if ($slickReview2) {
        $slickReview2.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
          var i = (currentSlide || 0) + 1
          $numberReview2.html('<span class="curr-number">' + i + '</span> <span class="curr-number_arr">/</span> ' + slick.slideCount)
        })
        $slickReview2.not('.slick-initialized').slick({
          dots: false,
          infinite: false,
          fade: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><i class="icon-right-arrow"></i></button>',
          nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><i class="icon-right-arrow"></i></button>'
        })
      }
    })
  }
}
