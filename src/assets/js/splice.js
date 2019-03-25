$(function(){
	$('.burger').on('click', function(){
		if($(this).hasClass('burger_open-js')){
			$(this).removeClass('burger_open-js');
			$('.header__active').stop().slideUp(500);
		} else {
			$(this).addClass('burger_open-js');
			$('.header__active').stop().slideDown(500);
		}
	})

	$('.mobile-burger').on('click', function(){
		if($(this).hasClass('mobile-burger_open-js')){
			$(this).removeClass('mobile-burger_open-js');
		} else {
			$(this).addClass('mobile-burger_open-js');
		}
	})

	$('.mobile-burger').on('click', function(){
		$('.header_content-m').toggleClass('header__mobile-open')
	})

	$('.content-m__link').on('click', function(){
		if($('html').width() < 768){
			$(this).siblings().toggleClass('content-m__link-mobile');
		}
	})

	$('.back-to-menu').on('click', function(){
		$(this).closest('.nav_popup').removeClass('content-m__link-mobile');
	})

	$('.nav__item, .content-m__item').on('mouseover', function(){
		if($(this).children().length > 1){
			$(this).add('.primary__nav-container').siblings().css({
				opacity: .3,
				transition: 'all .6s ease-in-out'
			})

			$(this).parent().css({
				opacity: 1,
				transition: 'all .2s ease-in-out'
			})
		}
	})

	$('.nav__item, .content-m__item').on('mouseout', function(){
		$(this).add('.primary__nav-container').siblings().css({
			opacity: 1,
			transition: 'all .2s ease-in-out'
		})
	})


	$('.login-lang').on('click', function(){
		$(this).find('.choice').slideToggle(500);
	})

	$('.choice__item').on('click', function(){
		$(this).parent().siblings('.current').text($(this).text());
	})

	$('.footer-form-wrapper .btn').on('click', function(e){
		e.preventDefault();
		$(this).closest('.footer-form').addClass('footer-form_subscribe');

		setTimeout(function(){
			e.preventDefault();
			$('.footer-form').removeClass('footer-form_subscribe');
		}, 3000);
	})

	$('.passage__login, .mobile-menu__login, .unlogin__log-in, .log-form__cross').on('click', function(e){
		e.preventDefault();
		$('.main-login__log-popup').toggleClass('main-login__popup-on');
	})
})