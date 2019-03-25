if ($('#datepicker2').length) {
    /* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
    /* Written by Andrew Stromnov (stromnov@gmail.com). */
    (function(factory) {
        if (typeof define === "function" && define.amd) {
            // AMD. Register as an anonymous module.
            define(["../widgets/datepicker"], factory);
        } else {
            // Browser globals
            factory(jQuery.datepicker);
        }
    }(function(datepicker) {
        datepicker.regional.ru = {
            closeText: "Закрыть",
            prevText: "&#x3C;Пред",
            nextText: "След&#x3E;",
            currentText: "Сегодня",
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
            ],
            monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
                "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
            ],
            dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
            dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
            dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            weekHeader: "Нед",
            dateFormat: "dd.mm.yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        datepicker.setDefaults(datepicker.regional.ru);
        return datepicker.regional.ru;
    }));
}
$(window).on('load', function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    };
    $('body').removeClass('loaded');
});
/* viewport width */
function viewport() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    }
};
/* viewport width */
$(function() {
    /* placeholder*/
    $('input, textarea').each(function() {
        var placeholder = $(this).attr('placeholder');
        $(this).focus(function() {
            $(this).attr('placeholder', '');
        });
        $(this).focusout(function() {
            $(this).attr('placeholder', placeholder);
        });
    });
    /* placeholder*/
    $('.js-btn-sidebar').click(function() {
        $(this).toggleClass('active');
        $('.layout').toggleClass('hide-sidebar');
        return false;
    });
    $('.js-hide-sidebar').click(function() {
        $('.js-btn-sidebar').removeClass('active'),
            $('.layout').removeClass('hide-sidebar');
        return false;
    });
    /*open user nav*/
    $('.js-user-nav').click(function() {
        $(this).parent().toggleClass('open-nav');
        return false;
    });
    $(document).on('touchstart click', function(e) {
        if ($(e.target).parents().filter('.user:visible').length != 1) {
            $('.user').removeClass('open-nav');
        }
    });
    /*open user nav*/
    /* product tip*/
    $('.js-tip').click(function() {
        $('.tip').removeClass('show-tip');
        var id = $(this).attr('href');
        var idTop = $(this).offset().top;
        var tableTop = $(this).parents('.table-list-wrap').offset().top;
        $(id).addClass('show-tip');
        $('.tip').css('top', idTop - tableTop);
        return false;
    });
    $('.js-tip-slider').click(function() {
        $('.tip').removeClass('show-tip');
        var id = $(this).attr('href');
        $(id).addClass('show-tip');
        return false;
    });
    
    $('.js-tip-close').click(function() {
        $('.tip').removeClass('show-tip');
        return false;
    });
    $(document).on('touchstart click', function(e) {
        if ($(e.target).parents().filter('.tip:visible').length != 1) {
            $('.tip').removeClass('show-tip');
        }
    });
    /* product tip*/
    /*styled select*/
    $('.js-cust-select').click(function() {
        $('.cust-select').not($(this).parent()).removeClass('open-select');
        $(this).parent().toggleClass('open-select');
        return false;
    });
    $('.js-select-list a:not(.js-not-select)').click(function() {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        var textSelect = $(this).html();
        $(this).parents('.cust-select').find('.js-cust-select span').html(textSelect);
        $('.cust-select').removeClass('open-select');
        return false;
    });
    $(document).on('touchstart click', function(e) {
        if ($(e.target).parents().filter('.cust-select:visible').length != 1) {
            $('.cust-select').removeClass('open-select');
        }
    });
    /*styled select*/
    /*select month*/
    $('.js-month').click(function() {
        $(this).toggleClass('active-month');
        $(this).parent().toggleClass('open-month');
        return false;
    });
    $(document).on('touchstart click', function(e) {
        if ($(e.target).parents().filter('.month-select:visible').length != 1) {
            $('.js-month').removeClass('active-month');
            $('.period-list__item').removeClass('open-month');
        }
    });
    /*select month*/
    /*edit one row*/
    $('.js-edit-row').click(function() {
        $('li').removeClass('edit-row');
        $('li').find('.change-input').prop("disabled", true);
        $(this).parents('li').addClass('edit-row');
        $(this).parents('li').find('.change-input').prop("disabled", false).focus();
        return false;
    });
    $('.js-save-row').click(function() {
        $(this).parents('li').removeClass('edit-row');
        $(this).parents('li').find('.change-input').prop("disabled", true);
        return false;
    });
    /*edit one row*/
    /*checked row*/
    $('.check-table input:checkbox').change(function() {
        if ($(this).is(":checked")) {
            $(this).parents('li').addClass('check-row');
        } else {
            $(this).parents('li').removeClass('check-row');
        }
    });
    /*checked row*/
    /*input width content*/
    $('.change-input').each(function() {
        var valueWidth = $(this).attr('value').length;
        $(this).css('width', (valueWidth + 1) * 8);
        $(this).keyup(function() {
            this.style.width = ((this.value.length + 1) * 8) + 'px';
        });
    });
    /*input width content*/
    /*popup-delete begin*/
    /**/
    $('.js-popup').click(function() {
        var id = $(this).attr('href');
        $('.popup').addClass('visible-popup');
        $(id).addClass('show-popup');
        return false;
    });
    $('.js-close-popup').click(function() {
        $('.popup').removeClass('visible-popup');
        $('.window-open').removeClass('show-popup');
        return false;
    });
    $('.popup-overlay').click(function() {
        $('.popup').removeClass('visible-popup');
        $('.window-open').removeClass('show-popup');
        return false;
    });
    /*popup-delete end*/
    /*delivery-orders begin*/
    $('.js-delivery-orders').click(function() {
        $(this).parent().toggleClass('delivery-show');
        $(this).parent().find('.delivery-orders').slideToggle();
        return false;
    });
    /*delivery-orders end*/
    /*create-group begin*/
    $('.js-create-group').click(function() {
        $(this).toggleClass('active');
        $(this).parents('.clients-filter').toggleClass('show-create-group');
        $('.create-group').slideToggle();
        return false;
    });
    /**create-group end*/
    /*show-code-card begin*/
    $(".js-show-code").toggle(function() {
        var cardHidden = $(this).parent().find('.form-control').attr('value');
        var cardCode = $(this).parent().find('.form-control').attr('data-value');
        $(this).parent().find('.form-control').attr('value', cardCode);
        $(this).parent().find('.form-control').attr('data-value', cardHidden);
    }, function() {
        var cardHidden = $(this).parent().find('.form-control').attr('value');
        var cardCode = $(this).parent().find('.form-control').attr('data-value');
        $(this).parent().find('.form-control').attr('value', cardCode);
        $(this).parent().find('.form-control').attr('data-value', cardHidden);
    });
    /*show-code-card end*/
    /*show referrals begin*/
    $('.js-referrals').click(function() {
        $(this).parents('.partner-list__item').toggleClass('show-referrals');
        $(this).parents('.partner-list__item').find('.referrals').slideToggle();
        return false;
    });
    /*show referrals end*/
    /*edit-percent begin*/
    $('.js-edit-percent').click(function() {
        $('li').removeClass('edit-row');
        $('li').find('.change-input').prop("disabled", true);
        $(this).parents('li').addClass('edit-row');
        $(this).parents('li').find('.change-input').prop("disabled", false).focus();
        return false;
    });
    $('.js-save-percent').click(function() {
        $(this).parents('li').removeClass('edit-row');
        $(this).parents('li').find('.change-input').prop("disabled", true);
        return false;
    });
    /*edit-percent end*/
    /*js-sub-nav*/
    $('.js-sub-nav').click(function() {
        $(this).parents('li').toggleClass('show-sub-nav');
        $(this).parents('li').find('.sub-content-nav').slideToggle();
        return false;
    });
    /*js-sub-nav*/
    /*add content page  begin*/
    $('.js-add-page').click(function() {
        $(this).parents('li').toggleClass('show-add-form');
        $(this).parents('li').find('.add-page-form').slideToggle();
        return false;
    });
    /*add content page end*/
    /* components */
    if ($('#datepicker').length) {
        $('#datepicker').datepicker();
    };
    if ($('.js-scroll').length) {
        $(".js-scroll").mCustomScrollbar({
            axis: "y",
            theme: "dark-thin",
            autoExpandScrollbar: true,
            advanced: {
                autoExpandHorizontalScroll: true
            }
        });
    };
    if ($('.js-scroll-horizont').length) {
        $(".js-scroll-horizont").mCustomScrollbar({
            axis: "x",
            theme: "dark-thin",
            autoExpandScrollbar: true,
            setWidth: '100%'
        });
    };
    if ($('.js-photo-slider').length) {
        var $numberReview = $('.number-slide');
        var $slickReview = $('.js-photo-slider');
        $slickReview.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $numberReview.html('<span class="curr-number">' + i + '</span> <span class="curr-number_arr">/</span> ' + slick.slideCount);
        });
        $('.js-photo-slider').slick({
            dots: false,
            infinite: false,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button"><i class="icon-right-arrow"></i></button>',
            nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button"><i class="icon-right-arrow"></i></button>'
        });
    };
    if ($('.js-photo-slider-2').length) {
        $('.js-photo-slider-2').slick({
            dots: false,
            infinite: false,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        });
    };
    if ($('#datepicker2').length) {
        $("#datepicker2").datepicker();
        $("#datepicker3").datepicker();
    }
    /* components */
});

var handler = function() {
    var height_footer = $('footer').height();
    var height_header = $('header').height();
    //$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});
    var viewport_wid = viewport().width;
    var viewport_height = viewport().height;
    if (viewport_wid <= 991) {

    }
}
$(window).bind('load', handler);
$(window).bind('resize', handler);