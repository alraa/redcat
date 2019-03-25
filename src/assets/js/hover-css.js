(function ($) {
  $.fn.hover = function (inEffect, outEffect) {
    var textBlock = $(this).parent().parent().find('.animated_text').css('opacity', '0').addClass('animated')
    $('.main-slider-block').mouseover(function (e) {
      e.stopPropagation()
      var text = $(this).find('.main-slider__text').text()
      console.log($(this))
      console.log(textBlock)
      console.log(text)
      textBlock.addClass(inEffect).removeClass(outEffect).css('opacity', '1').text(text)
    })
    $('.main-slider-block').mouseout(function () {
      $('.animated_text').removeClass(inEffect).addClass(outEffect).css('opacity', '0')
    })
  }
})(jQuery)
