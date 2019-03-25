<template>
  <div>
    <banner />

    <!-- collection -->
    <section class="right-transmen">
      <div class="transparent-cat_right">
        <img src="~@/assets/img/right__transp-cat.png" alt="">
      </div>
      <div class="wrapper">
        <div class="collection-wrapper">
          <div class="collection-border-wrapper">
            <div class="collection-border_gray"></div>
            <div class="collection-border">

              <div class="collection-border_men collection-border_cat-left">
                <img src="~@/assets/img/general_cat.png" alt="">
              </div>
              <div class="collection-border_inner">
                <div class="collection_top-line"></div>
                <div class="collection_right-line_top"></div>
                <div class="collection_right-line_bottom"></div>
                <div class="collection_bottom-line"></div>
                <div class="collection_left-line"></div>
              </div>
              <div class="collection__inner-wrapper collection_left-wrapper">
                <h2 class="collection__header animate_2">
                  Новинки
                </h2>
                <div class="collection__text animate_2">
                  Все новинки товаров твоих любимых брендов собраны здесь. Я каждый день добавляю новые виды одежды, обуви и аксессуаров специально для тебя. Ты останешься доволен. Заходи!
                </div>
              </div>
            </div>

          </div>
        </div>
        <router-link to="/catalog" href="#" class="more__btn btn animate_2">Подробнее
          <div class="more__btn_topline"></div>
          <div class="more__btn_rightline"></div>
          <div class="more__btn_bottomline"></div>
          <div class="more__btn_leftline"></div>
        </router-link>
      </div>
    </section>

    <section class="left-transmen">
      <div class="transparent-cat_left">
        <img src="~@/assets/img/left__transp-cat.png" alt="">
      </div>
      <div class="wrapper">
        <div class="collection-wrapper">

          <div class="collection-border-wrapper">
            <div class="collection-border_gray"></div>

            <div class="collection-border">
              <div class="collection-border_inner">
                <div class="collection_top-line"></div>
                <div class="collection_right-line_top"></div>
                <div class="collection_right-line_bottom"></div>
                <div class="collection_bottom-line"></div>
                <div class="collection_left-line"></div>
              </div>
              <div class="collection-border_men collection-border_cat-right">
                <img src="~@/assets/img/general_supreme.png" alt="">
              </div>
              <div class="collection__inner-wrapper collection_right-wrapper">
                <h2 class="collection__header animate_3">
                  Бестселлеры
                </h2>
                <div class="collection__text animate_3">
                  Самые популярные вещи, проверенные сотнями покупателей собраны здесь. Уверен, что и ты найдешь здесь для себя много чего интересного, поэтому скорее заходи и убедись в этом сам!
                </div>
              </div>
            </div>

          </div>
          <router-link to="/catalog" href="#" class="more__btn btn animate_3">Подробнее
            <div class="more__btn_topline"></div>
            <div class="more__btn_rightline"></div>
            <div class="more__btn_bottomline"></div>
            <div class="more__btn_leftline"></div>
          </router-link>

        </div>
      </div>
    </section>

    <div class="main-slider_box">
      <div class="wrapper">
        <div class="main-slider-wrapper">
          <div class="animated_text ">свитшоты</div>
          <div class="main-slider js-main-slider">
            <div class="main-slider-block animate_1">

              <div class="main-slider__img ">
                <img src="~@/assets/img/main-slider_1.png" alt="">
              </div>
              <div class="main-slider__text ">свитшоты</div>
              <router-link to="/catalog?name=свитшот" class="main-slider__link ">подробнее</router-link>
            </div>

            <div class="main-slider-block animate_1">

              <div class="main-slider__img">
                <img src="~@/assets/img/main-slider_2.png" alt="">
              </div>
              <div class="main-slider__text">куртки</div>
              <router-link to="/catalog?name=куртка" href="#" class="main-slider__link">подробнее</router-link>
            </div>

            <div class="main-slider-block animate_1">

              <div class="main-slider__img">
                <img src="~@/assets/img/main-slider_3.png" alt="">
              </div>
              <div class="main-slider__text">футболки</div>
              <router-link to="/catalog?name=футболка" href="#" class="main-slider__link">подробнее</router-link>
            </div>

            <div class="main-slider-block animate_1">

              <div class="main-slider__img">
                <img src="~@/assets/img/main-slider_4.png" alt="">
              </div>
              <div class="main-slider__text">зимние куртки</div>
              <router-link to="/catalog?name=куртка" href="#" class="main-slider__link">подробнее</router-link>
            </div>

            <div class="main-slider-block animate_1">

              <div class="main-slider__img">
                <img src="~@/assets/img/main-slider_5.png" alt="">
              </div>
              <div class="main-slider__text">кроссовки</div>
              <router-link to="/catalog?name=кроссовки" href="#" class="main-slider__link">подробнее</router-link>
            </div>

            <div class="main-slider-block animate_1">

              <div class="main-slider__img">
                <img src="~@/assets/img/main-slider_1.png" alt="">
              </div>
              <div class="main-slider__text">свитшоты</div>
              <router-link to="/catalog?name=свитшот" class="main-slider__link ">подробнее</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  mounted () {
    this.$nextTick(() => {
      $(document).trigger('ready')
    })
  }
}
</script>

<style scoped>

</style>
