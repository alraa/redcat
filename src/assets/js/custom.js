$(window).on('load', function () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $('body').addClass('ios')
  } else {
    $('body').addClass('web')
  };
  $('body').removeClass('loaded')
})
/* viewport width */
function viewport () {
  var e = window

  var a = 'inner'
  if (!('innerWidth' in window)) {
    a = 'client'
    e = document.documentElement || document.body
  }
  return {
    width: e[a + 'Width'],
    height: e[a + 'Height']
  }
};
/* viewport width */
$(document).on('ready', function () {
  $(function () {
    /* placeholder */
    $('input, textarea').each(function () {
      var placeholder = $(this).attr('placeholder')
      $(this).focus(function () {
        $(this).attr('placeholder', '')
      })
      $(this).focusout(function () {
        $(this).attr('placeholder', placeholder)
      })
    })
    /* placeholder */

    $('.button-nav').click(function () {
      $(this).toggleClass('active'),
      $('.main-nav-list').slideToggle()
      return false
    })

    /* components */

    if ($('.styled').length) {
      $('.styled').styler({
        selectVisibleOptions: 6
      })
    };

    if ($('.modify input').length) {
      $('.modify input').styler()
    }
    ;

    /*

          if($('.fancybox').length) {
              $('.fancybox').fancybox({
                  margin  : 10,
                  padding  : 10
              });
          };
          */
    if ($('.js-main-slider').length) {
      $('.js-main-slider').not('.slick-initialized').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: '<button type="button" class="slick-prev"></button>',
        prevArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },

          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },

          {
            breakpoint: 479,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          }

        ]
      })
    }
    ;

    if ($('.js-megalike-slider').length) {
      $('.js-megalike-slider').not('.slick-initialized').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },

          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },

          {
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          }

        ]
      })
    }

    if ($('.js-bye-look').length) {
      $('.js-bye-look').not('.slick-initialized').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: false,
        prevArrow: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },

          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              prevArrow: '<button type="button" class="slick-prev"></button>',
              nextArrow: '<button type="button" class="slick-next"></button>',
              infinite: true,
              dots: false
            }
          },

          {
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              prevArrow: '<button type="button" class="slick-prev"></button>',
              nextArrow: '<button type="button" class="slick-next"></button>',
              infinite: true,
              dots: false
            }
          }

        ]
      })
    }
    ;

    if ($('.js-like-slider').length) {
      $('.js-like-slider').not('.slick-initialized').slick({
        dots: false,
        infinite: false,
        speed: 300,
        nextArrow: '<button type="button" class="slick-prev"></button>',
        prevArrow: '<button type="button" class="slick-next"></button>',
        slidesToShow: 4,
        slidesToScroll: 1

      })
    }
    ;

    if ($('.js-footer-slider').length) {
      $('.js-footer-slider').not('.slick-initialized').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1

      })
    }
    ;

    /*
      if($('.scroll').length) {
          $(".scroll").mCustomScrollbar({
              axis:"x",
              theme:"dark-thin",
              autoExpandScrollbar:true,
              advanced:{autoExpandHorizontalScroll:true}
          });
      };

      */

    /* components */

    if ($('.js-scroll').length) {
      $('.js-scroll').mCustomScrollbar({
        axis: 'y',
        theme: 'dark-thin',
        autoExpandScrollbar: true,
        //            scrollInertia: 50,
        advanced: {
          autoExpandHorizontalScroll: true
        }
      })
    }
    ;
  })

  var handler = function () {
    var height_footer = $('footer').height()
    var height_header = $('header').height()
    // $('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});

    var viewport_wid = viewport().width
    var viewport_height = viewport().height

    if ((viewport_wid <= 1023) && (viewport_wid >= 768)) {

    }

    // if ((viewport_wid <= 767) && (viewport_wid >= 320)){
    // 	$('.js-tab-cont').addClass('hide');
    // 	$('.nav-tab-list__item').removeClass('active');

    // }
  }
  $(window).bind('load', handler)
  $(window).bind('resize', handler)

  // mob step

  $('.js-cart-next').on('click', function () {
    $('.step_1').addClass('step-hide')
    $('.step_2').removeClass('step-hide')
    $('html, body').animate({
      scrollTop: 0
    }, 0)
    return false
  })
  $('.js-add-order').on('click', function () {
    $('.step_2').addClass('step-hide')
    $('.step_3').removeClass('step-hide')
    $('html, body').animate({
      scrollTop: 0
    }, 0)
    return false
  })
  $('.js-add-order_new').on('click', function () {
    $('.step_3').addClass('step-hide')
    $('.step_1').removeClass('step-hide')
    $('html, body').animate({
      scrollTop: 0
    }, 0)
    return false
  })
  // mob step

  // main nav active

  $('.bottom-nav__link').on('click', function () {
    $('.bottom-nav__link').removeClass('active')
    $(this).addClass('active')
  })

  if ($(window).width() <= 1023) {
    $('.left-transmen').find('.collection__header').removeClass('animate_3').addClass('animate_2')
    $('.left-transmen').find('.collection__text').removeClass('animate_3').addClass('animate_2')
  }

  if ($(window).width() <= 767) {
    $('.left-transmen').find('.collection__header').removeClass('animate_2').addClass('animate_3')
    $('.left-transmen').find('.collection__text').removeClass('animate_2').addClass('animate_3')

    $('.right-transmen').find('.collection__header').removeClass('animate_2').addClass('animate_3')
    $('.right-transmen').find('.collection__text').removeClass('animate_2').addClass('animate_3')
  }

  if ($('.animate_1').length) {
    $('.animate_1').hover('slideInLeft', 'slideInRight')
  }

  if ($('.animate_2').length) {
    $('.animate_2').animated('slideInRight', 'slideOutRight')
  }

  if ($('.animate_3').length) {
    $('.animate_3').animated('slideInLeft', 'slideInLeft')
  }

  // slideNav

  if ($('.js-burger').length) {
    $('.js-burger').on('click', function () {
      if ($(this).hasClass('opened')) {
        $(this).removeClass('opened')
      } else {
        $(this).addClass('opened')
      }

      if ($(this).hasClass('opened')) {
        $('.top-nav-wrapper').addClass('showed')
      } else {
        $('.top-nav-wrapper').removeClass('showed')
      }

      if ($('.top-nav-wrapper').hasClass('showed')) {
        $('.top-nav-wrapper').slideDown(600)
      } else {
        $('.top-nav-wrapper').slideUp(600)
      }

      if ($(window).width() < 1024) {
        if ($(this).hasClass('opened')) {
          $('.nav-tablet').addClass('tablet')
        } else {
          $('.nav-tablet').removeClass('tablet')
        }
        $('.top-nav-wrapper').removeClass('showed')
      }
    })
  }

  if ($(window).width() <= 1024) {
    $('.js-burger').removeClass('opened')
  }

  $('.js-right-nav-search').on('click', function (e) {
    e.preventDefault()
    $(this).toggleClass('magictime perspectiveDown')
    $(this).toggleClass('active')

    if ($(this).hasClass('active')) {
      $
      $('#js-search-popup').fadeIn(600)
    } else {
      $('#js-search-popup').fadeOut(600)
    }
  })

  // exit from popup-filter

  if ($('.bottom-nav-clothe__item').length) {
    $('.bottom-nav-clothe__item').on('click', function (e) {
      e.stopPropagation()
      if ($(window).width() <= 767) {
        $(this).find('.bottom-nav-clothe-popup').fadeIn(400)
      }
    })
  }

  if ($('.js-bottom-popup-exit__btn').length) {
    $('.js-bottom-popup-exit__btn').on('click', function (e) {
      e.stopPropagation()
      if ($(window).width() <= 767) {
        $(this).parent('.bottom-nav-clothe-popup').fadeOut(400)
      }
    })
  }

  if ($('.bottom-nav-brand__item').length) {
    $('.bottom-nav-brand__item').on('click', function (e) {
      e.stopPropagation()
      if ($(window).width() <= 767) {
        $(this).find('.bottom-nav-brand-popup').fadeIn(400)
      }
    })
  }

  if ($('.js-brand-popup-exit__btn').length) {
    $('.js-brand-popup-exit__btn').on('click', function (e) {
      e.stopPropagation()
      if ($(window).width() <= 767) {
        $(this).parent('.bottom-nav-brand-popup').fadeOut(400)
      }
    })
  }

  // language

  if ($('.js-language').length) {
    $('.js-language').on('click', function () {
      $('.js-language').toggleClass('active')
      if ($(this).hasClass('active')) {
        $('.top-nav__lang').css('display', 'block')
        console.log('active')
      } else {
        $('.top-nav__lang').css('display', 'none')
        console.log('non-active')
      }
    })
  }

  $('.js-lang').on('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    var $this = $(this)
    var innerText = $(this).text()
    console.log(innerText)
    if ($(this).hasClass('ru')) {
      $(this).parents('.js-language').text(innerText)
      $(this).parents('.js-language').removeClass('english')
      $(this).parents('.js-language').addClass('russian')
    }
    if ($(this).hasClass('eng')) {
      $(this).parents('.js-language').text(innerText)
      $(this).parents('.js-language').removeClass('russian')
      $(this).parents('.js-language').addClass('english')
    }
  })

  // registration validation

  if ($('#js-reg-popup').length) {
    $('#js-reg-popup').on('submit', function (e) {
      var attention = $(this).find('.reg-attention')
      var enterInput = $(this).find('.js-enter-input')
      var value_1 = $(this).find('input[name="enter-pass"]').val()
      var value_2 = $(this).find('input[name="check-pass"]').val()

      if ((value_1 !== value_2)) {
        enterInput.find('input').css('border-color', 'red')
        attention.css('display', 'block')
        e.preventDefault()
        value_1 = ''
        value_2 = ''
      } else {
        return false
      }
    })
  }

  // forgot password

  if ($('#js-forgot-pass').length) {
    $('#js-forgot-pass').on('click', function (e) {
      e.preventDefault()
      $(this).parents('#js-enter-popup').fadeOut(600)
      $('#js-forgot-popup').fadeIn()
    })
  }

  $('.js-forgot-popup-cross').on('click', function () {
    $('#js-forgot-popup').fadeOut(600)
  })

  // check your email

  if ($('#js-forgot-popup').length) {
    $('#js-forgot-popup').on('submit', function (e) {
      e.preventDefault()
      $('#js-forgot-popup').fadeOut(600)
      $('#js-check-mail-popup').fadeIn(600)
    })
  }

  $('.js-checkmail-popup-cross').on('click', function () {
    $('#js-check-mail-popup').fadeOut(600)
  })

  // enter popup-filter
  if ($('.js-enter').length) {
    $('.js-enter').on('click', function (e) {
      e.preventDefault()

      $('#js-enter-popup').fadeIn(600)
    })
  }

  $('.js-enter-popup-cross').on('click', function () {
    $('#js-enter-popup').fadeOut(600)
  })

  // transparent hover

  $('.bottom-nav-clothe__item').mouseover(function () {
    $(this).siblings().css('opacity', '0.3')
    $(this).parents('.bottom-nav_inner').find('.right-nav-wrapper').css('opacity', '0.3')
  })

  $('.bottom-nav-clothe__item').mouseout(function () {
    $(this).siblings().css('opacity', '1')
    $(this).parents('.bottom-nav_inner').find('.right-nav-wrapper').css('opacity', '1')
  })

  $('.bottom-nav-brand__item').mouseover(function () {
    $(this).siblings().css('opacity', '0.3')
    $(this).parents('.bottom-nav_inner').find('.right-nav-wrapper').css('opacity', '0.3')
  })

  $('.bottom-nav-brand__item').mouseout(function () {
    $(this).siblings().css('opacity', '1')
    $(this).parents('.bottom-nav_inner').find('.right-nav-wrapper').css('opacity', '1')
  })

  $('input[name="search"]').on('keyup', function () {

    /* var form = $(this).parents('form');
          var div = form.find('.js-list-result');
          var data = form.serialize();

          if ( $(this).val().length > 3 ){
              $.get('/catalog/search_schools', data, function (response) {
                  var list_schools = '';
  console.log(response);
                  $('.js-list-result ul').empty();

                  if (response.schools.length !== 0){
                      for (var key in response.schools){
                          list_schools += '<li class="search-result-item" data-school-id="'+response.schools[key].id+'">'+response.schools[key].title+'</li>';
                      }
                  }else{
                      $('.for-search input[name="profile_id"]').val(0);
                  }

                  $('.js-list-result ul').append(list_schools);

              }).error(function () {
                  showMessages(main_message_error);
              });
          }else{
              $('.js-list-result ul')
                  .empty()
                  .append('<li>Минимальный запрос должен местить в себе 4 символа</li>');
          } */

  })

  if ($(window).width() <= 767) {
    // $('.js-tab-cont').addClass('hide');
    // $('.nav-tab-list__item').removeClass('active');

  }

  // cabinet tabl

  if ($('.js-price-popup').length) {
    $('.js-price-popup').on('click', function (e) {
      e.stopPropagation()
      $(this).toggleClass('open')
    })
  }

  if ($('.js-filter-color').length) {
    $('.js-filter-color').on('click', function (e) {
      e.stopPropagation()
      $(this).toggleClass('open')
    })
  }

  if ($('.js-filter-sex').length) {
    $('.js-filter-sex').on('click', function (e) {
      e.stopPropagation()
      $(this).toggleClass('open')
    })
  }

  // creditcart
  // $(document).ready(function(){
  // 	$('.creditcart-mask1').mask('9999');
  // 	$('.creditcart-mask2').mask('9999');
  // 	$('.creditcart-mask3').mask('9999');
  // 	$('.creditcart-mask4').mask('9999');
  // });

  // cabinet open search-result-item

  if ($('.purchases-block').length) {
    $('.purchases-block').on('click', function () {
      console.log($(this))
      $(this).find('.js-purchases-block_visible').css('display', 'none')
      $(this).find('.purchases-block_inner').fadeIn(600)
    })
  }

  if ($('.js-purchases-close').length) {
    $('.js-purchases-close').on('click', function (e) {
      console.log($(this))
      e.stopPropagation()
      $(this).parents('.purchases-block').find('.js-purchases-block_visible').css({
        'display': 'flex',
        'display': '-webkit-flex',
        'display': '-moz-flex',
        'display': '-ms-flex',
        'display': '-o-flex',
        'display': 'flex'
      })
      $(this).parents('.purchases-block').find('.purchases-block_inner').css('display', 'none')
      //		$(this).toggleClass('active');
    })
  }

  // socials button tern icon

  if ($('.js-content-info__btn').length) {
    $('.js-content-info__btn').on('click', function () {
      console.log($(this))
      $(this).toggleClass('toggle')
      $(this).parent('.social-wrapper').find('.social-logo__img').toggleClass('gray')

      if ($(this).hasClass('toggle')) {
        $(this).text('Отключиться')
      } else {
        $(this).text('Подключить')
      }
    })
  }

  if ($('.js-size-chart__btn').length) {
    $('.js-size-chart__btn').on('click', function (e) {
      e.preventDefault()
      $('.js-size-chart-popup').fadeIn(600)
      $('.js-chart-popup-bg').fadeIn(600)
    })
  }

  if ($('.js-cross-close').length) {
    $('.js-cross-close').on('click', function (e) {
      e.preventDefault()
      $('.js-size-chart-popup').fadeOut(600)
      $('.js-chart-popup-bg').fadeOut(600)
    })
  }

  // catalog ion slider

  var instance

  if ($('#range-price').length) {
    var filter = {
      price_min: $('input[name="price_min"]'),
      price_max: $('input[name="price_max"]')
    }

    var $range = $('#range-price').ionRangeSlider({
      type: 'double',
      min: 0,
      max: 30000,
      from: 0,
      to: 12500,
      hide_min_max: true,
      hide_from_to: false,
      grid: false,
      onChange: function (data) {
        filter.price_min.val(data.from)
        truba = filter.price_max.val(data.to)
        console.log(truba)
      }

    })

    instance = $range.data('ionRangeSlider')

    $('.filter-prices input').on('change keyup', function () {
      var $this = $(this)
      var price_name = $this.attr('name')

      if (price_name === 'price_min') {
        instance.update({
          from: $this.val()
        })
      } else {
        instance.update({
          to: $this.val()
        })
      }
    })

    $('#filter-form').submit(function (e) {
      e.preventDefault()
      e.stopPropagation()
    })
  }

  if ($('#range-size').length) {
    var $range_2 = $('#range-size').ionRangeSlider({
      type: 'single',
      grid: false,
      from: 2,
      values: [
        'Очень свободный', 'Менее свободный ', 'Нормальный',
        'Немного жмет ', 'Сильно жмет', 'Возьми на размер больше'
      ]

    })
  }
  ;

  $('.js-cleanBtn').on('click', function () {
    console.log(instance2)
    instance.update({
      to: 350
    })
    instance2.update({
      from: 6
    })
  })

  if ($('.js-chart-popup-bg').length) {
    $('.js-cross-help').on('click', function () {
      $('.js-help-popup').fadeOut(600)
      $('.js-chart-popup-bg').fadeOut(600)
    })
  }

  if ($('.js-help-block__btn').length) {
    $('.js-help-block__btn').on('click', function () {
      $(this).parent('.help-block').find('.js-help-popup').fadeIn(600)
      $(this).parent('.help-block').find('.js-chart-popup-bg').fadeIn(600)
    })
  }

  // cabinet

  $('.js-info-header').on('click', function () {
    $(this).toggleClass('closed')
    $(this).toggleClass('active')
    var adresItem = $(this).parent('.content__info-wrapper').find('.content__info-outer')

    adresItem.slideToggle(600)
  })

  // dropshiping active
  if ($('#js-dropship').length) {
    $('#js-dropship label').on('click', function () {
      $(this).parents('.smile-rating-container').find('.smile-rating-toggle-container').toggleClass('active')
    })
  }

  // return-exchange items

  if ($('.js-return-toggle').length) {
    $('.js-return-toggle').on('click', function () {
      $(this).next('.return__block-wrapper').slideToggle(600)
      $(this).toggleClass('open')
    })
  }

  // card

  // choose size

  if ($('.goods-right__size').length) {
    $('.goods-right__size').find('.jq-selectbox').on('click', function () {
      console.log('h')
      if ($(this).hasClass('opened')) {
        $(this).prev('.goods-right__size-head').css('color', '#f7002c')
      }
    })
  }

  if ($('.js-content-header').length) {
    $('.js-content-header').on('click', function () {
      $(this).toggleClass('closed')
      $(this).toggleClass('active')
      var item = $(this).parent('.content-outer-block').find('.content-outer-block__inner')

      item.slideToggle(600)
    })
  }
  // mob step
  if ($('.js-cart-next').length) {
    $('.js-cart-next').on('click', function () {
      $('.step_1').addClass('step-hide')
      $('.step_2').removeClass('step-hide')
      $('html, body').animate({
        scrollTop: 0
      }, 0)
      return false
    })
  }
  ;

  if ($('.js-add-order').length) {
    $('.js-add-order').on('click', function () {
      $('.step_2').addClass('step-hide')
      $('.step_3').removeClass('step-hide')
      $('html, body').animate({
        scrollTop: 0
      }, 0)
      return false
    })
  }
  ;

  if ($('.js-add-order_new').length) {
    $('.js-add-order_new').on('click', function () {
      $('.step_3').addClass('step-hide')
      $('.step_1').removeClass('step-hide')
      $('html, body').animate({
        scrollTop: 0
      }, 0)
      return false
    })
  }
  ;
  // mob step

  // amount-size

  $('.js-amount-size-control').each(function () {
    $(this).focus(function () {
      $(this).parents('.amount-size__item').addClass('active')
    })

    $(this).focusout(function () {
      $(this).parents('.amount-size__item').removeClass('active')
    })
  })
})
