<template>
	<div class="partnership">
    <banner />

    <div class="cataloge-nav-wrapper">
      <div class="wrapper">
        <div class="help__header">Оформление заказа</div>
      </div>
    </div>

    <breadcrumb :info="[{name: 'Партнерство', link: false}]"/>

    <div class="wrapper">
      <div class="cart__header">Партнерство с RedCat Store</div>
      <div class="partnership-wrapper">
        <div class="content-wrapper purchases">

          <div class="content__info">
            <div class="purchases-block-wrapper">

              <div class="purchases-block">
                <div class="purchases-block_visible js-purchases-block_visible">

                  <div class="purchases__item number">05/06/2018</div>
                  <div class="purchases__item name">Косарева Елизаветта Олеговна</div>
                  <div class="purchases__item amount"><span>15,000</span> руб</div>
                  <div class="purchases__item price"><span>6,500</span> руб</div>
                  <div class="purchases__item print"></div>
                </div>
                <div class="purchases-block_inner">

                  <div class="purchases-block_inner_top">
                    <div class="purchases__item number">05/06/2018</div>
                    <div class="purchases__item fio">Косарева Елизаветта Олеговна</div>
                    <div class="purchases__item delivery"><span>15,000</span> руб</div>
                    <div class="purchases__item treck-code"><span>6,500</span> руб</div>
                    <div class="purchases__item print js-purchases-close"></div>

                  </div>
                  <div class="purchases-block_inner_middle">
                    <div class="scroll-bar js-scroll">
                      <div class="scroll-bar__item deleted">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                          <div class="purchases-name__deleted">Отменен</div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>-620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="purchases-block_inner_bottom">
													  <div class="purchases-discount_date">21/04/18</div>
													  <div class="purchases-discount_goods">Товаров: 13</div>
													  <div class="purchases-discount">
														  <div class="purchases-discount_procent">Скидка <span>2%</span></div>
														  <div class="purchases-discount_money"><span>350</span> руб.</div>
													  </div>
													  <div class="purchases-total">
														  <div class="purchases-total_text">К оплате:</div>
														  <div class="purchases-total_money"><span>3 150</span> руб.</div>
													  </div>
												  </div> -->
                </div>
              </div>
            </div>
            <div class="purchases-block-wrapper">

              <div class="purchases-block">
                <div class="purchases-block_visible js-purchases-block_visible">

                  <div class="purchases__item number">05/06/2018</div>
                  <div class="purchases__item name">Косарева Елизаветта Олеговна</div>
                  <div class="purchases__item amount"><span>15,000</span> руб</div>
                  <div class="purchases__item price"><span>6,500</span> руб</div>
                  <div class="purchases__item print"></div>
                </div>
                <div class="purchases-block_inner">

                  <div class="purchases-block_inner_top">
                    <div class="purchases__item number">05/06/2018</div>
                    <div class="purchases__item fio">Косарева Елизаветта Олеговна</div>
                    <div class="purchases__item delivery"><span>15,000</span> руб</div>
                    <div class="purchases__item treck-code"><span>6,500</span> руб</div>
                    <div class="purchases__item print js-purchases-close"></div>

                  </div>
                  <div class="purchases-block_inner_middle">
                    <div class="scroll-bar js-scroll">
                      <div class="scroll-bar__item deleted">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                          <div class="purchases-name__deleted">Отменен</div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>-620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="purchases-block_inner_bottom">
													  <div class="purchases-discount_date">21/04/18</div>
													  <div class="purchases-discount_goods">Товаров: 13</div>
													  <div class="purchases-discount">
														  <div class="purchases-discount_procent">Скидка <span>2%</span></div>
														  <div class="purchases-discount_money"><span>350</span> руб.</div>
													  </div>
													  <div class="purchases-total">
														  <div class="purchases-total_text">К оплате:</div>
														  <div class="purchases-total_money"><span>3 150</span> руб.</div>
													  </div>
												  </div> -->
                </div>
              </div>
            </div>
            <div class="purchases-block-wrapper">

              <div class="purchases-block">
                <div class="purchases-block_visible js-purchases-block_visible">

                  <div class="purchases__item number">05/06/2018</div>
                  <div class="purchases__item name">Косарева Елизаветта Олеговна</div>
                  <div class="purchases__item amount"><span>15,000</span> руб</div>
                  <div class="purchases__item price"><span>6,500</span> руб</div>
                  <div class="purchases__item print"></div>
                </div>
                <div class="purchases-block_inner">

                  <div class="purchases-block_inner_top">
                    <div class="purchases__item number">05/06/2018</div>
                    <div class="purchases__item fio">Косарева Елизаветта Олеговна</div>
                    <div class="purchases__item delivery"><span>15,000</span> руб</div>
                    <div class="purchases__item treck-code"><span>6,500</span> руб</div>
                    <div class="purchases__item print js-purchases-close"></div>

                  </div>
                  <div class="purchases-block_inner_middle">
                    <div class="scroll-bar js-scroll">
                      <div class="scroll-bar__item deleted">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                          <div class="purchases-name__deleted">Отменен</div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>-620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>

                      <div class="scroll-bar__item">
                        <div class="purchases-name">
                          <div class="purchases-name__img">
                            <img src="~@/assets/img/purch_img.png" alt="">
                          </div>
                          <div class="purchases-name__descr">
                            <div class="purchases-name__header">Рубашка Polo</div>
                            <div class="purchases-name__text">желтый</div>
                            <div class="purchases-name__size"><span>2</span>XL</div>
                          </div>
                        </div>
                        <div class="purchases-amount"><span>2</span> шт.</div>
                        <div class="purchases-price"><span>620</span> руб.</div>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="purchases-block_inner_bottom">
													  <div class="purchases-discount_date">21/04/18</div>
													  <div class="purchases-discount_goods">Товаров: 13</div>
													  <div class="purchases-discount">
														  <div class="purchases-discount_procent">Скидка <span>2%</span></div>
														  <div class="purchases-discount_money"><span>350</span> руб.</div>
													  </div>
													  <div class="purchases-total">
														  <div class="purchases-total_text">К оплате:</div>
														  <div class="purchases-total_money"><span>3 150</span> руб.</div>
													  </div>
												  </div> -->
                </div>
              </div>
            </div>

          </div>

        </div>
        <div class="oformlenie">
          <div class="cart-right">
            <div class="cart-right-wrapper">
              <div class="content-wrapper purchases">
                <div class="content__info">
                  <div class="promo-top">
                    <div class="cart-right__total">
                      <div class="cart-right__total-text">Уникальный промо-код</div>
                      <div class="cart-right__total-amount"><span>RCS17858</span>
                        <a href="#">
                          <img src="~@/assets/img/share_icon.png" alt="">
                        </a>
                      </div>
                    </div>
                    <div class="cart-right__total">
                      <div class="cart-right__total-text">Реферальная ссылка</div>
                      <div class="cart-right__total-amount"><span>red.c/158478</span>
                        <a href="#">
                          <img src="~@/assets/img/copy_icon.png" alt="">
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="cart-right__total">
                    <div class="cart-right__total-text">Замороженная прибыль</div>
                    <div class="cart-right__total-amount"><span>12,000</span> руб</div>
                  </div>
                  <div class="cart-right__total">
                    <div class="cart-right__total-text">Общая прибыль</div>
                    <div class="cart-right__total-amount"><span>26,000</span> руб</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-right__total-price">
              <div class="cart-right__total">
                <div class="cart-right__total-text">Доступная к выводу прибыль</div>
                <div class="cart-right__total-amount"><span>14,000</span> руб</div>
              </div>
            </div>

          </div>
          <div class="partnership-buttons">
            <div class="partnership-take__btn">Вывести</div>
            <div class="partnership-use__btn">Использовать</div>
          </div>
        </div>
      </div>
    </div>


    <div class="wrapper">
      <div class="partnership-video-wrapper">
        <div class="partnership-text-wrapper">
          <div class="partnership-text-block">
            <div class="partnership-text__header">Описание</div>
            <div class="partnership-text__content">Для тех кто хочет создать физический магазин или интернет магазин с максимально быстрой доставкой. Оптимальный вариант для тех кто хочет иметь товар на руках, активно с ним взаимодействовать и иметь стабильно высокую прибыль.</div>
          </div>
          <div class="partnership-text-block">
            <div class="partnership-text__header">Для кого подойдет: </div>
            <div class="partnership-text__content">Для тех кто хочет создать физический магазин или интернет магазин с максимально быстрой доставкой. Оптимальный вариант для тех кто хочет иметь товар на руках, активно с ним взаимодействовать и иметь стабильно высокую прибыль.</div>
          </div>
        </div>
        <div class="partnership-video">
          <img src="~@/assets/img/partnership-video_img.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  mounted() {
    this.$nextTick(() => {
      $(".js-scroll").mCustomScrollbar({
        axis: "y",
        theme: "dark-thin",
        autoExpandScrollbar: true,
        //            scrollInertia: 50,
        advanced: {
          autoExpandHorizontalScroll: true
        }
      });
      $(document).trigger('ready');
    })
  },
}
</script>

<style scoped>

</style>
