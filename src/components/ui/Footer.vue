<template>
  <footer>
    <div class="wrapper">
      <div class="footer-wrapper">
        <div class="footer-top">
          <!-- footer logo -->
          <div class="logo-wrapper">
            <div class="logo__img">
              <img src="~@/assets/img/footer__logo_bw.png" alt="">
            </div>
            <!--<h1 class="logo-text_big">red<sup>cat</sup></h1>-->
          </div>

          <div class="footer-top-right-block">
            <a href="https://vk.com/red_cat_store" class="footer-top-right__btn">
              <div class="vk_hover">мы в контакте</div>
            </a>

            <nav>
              <ul class="footer-top_right__list">
                <li class="footer-top_right__item">
                  <router-link :to="'/404'" class="footer-top_right__link">Помощь</router-link>
                </li>

                <li class="footer-top_right__item">
                  <router-link :to="'/404'" class="footer-top_right__link">Доставка</router-link>
                </li>

                <li class="footer-top_right__item">
                  <router-link :to="'/404'" class="footer-top_right__link">Возврат</router-link>
                </li>
              </ul>
            </nav>
          </div>

          <nav class="footer-top-nav">
            <ul class="footer-top-nav__list js-footer-top-nav__list">
              <li class="footer-top-nav__item">
                <router-link :to="'/catalog'" class="footer-top-nav__link active">
                  Новинки
                </router-link>
              </li>

              <li class="footer-top-nav__item" v-for="category of categories">
                <router-link :to="'/catalog?category_id=' + category._id" class="footer-top-nav__link">
                  {{category.name}}
                </router-link>
              </li>
            </ul>
            <ul class="footer-top-nav__list">
              <li class="footer-top-nav__item">
                <router-link :to="'/catalog'" class="footer-top-nav__link">
                  Бренды
                </router-link>
              </li>

              <!-- 
              <li class="footer-top-nav__item">
                <router-link :to="'/404'" class="footer-top-nav__link">
                  Коллекции
                </router-link>
              </li>
              -->

              <li class="footer-top-nav__item">
                <router-link :to="'/404'" class="footer-top-nav__link">
                  Акции
                </router-link>
              </li>

              <li class="footer-top-nav__item">
                <router-link :to="'/404'" class="footer-top-nav__link">
                  Партнерство
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="footer-bottom">
          <nav class="footer-bottom-catalog fotter-bottom-catalog__nav">
            <ul class="footer-bottom-catalog__list">
              <li class="footer-bottom-catalog__item" v-for="subcat of subcategories.slice(0, 27).sort((a, b) => a.category_id.localeCompare(b.category_id))">
                <router-link :to="'/catalog?subcategory_id=' + subcat._id" class="footer-bottom-catalog__link">{{subcat.name}}</router-link>
              </li>
            </ul>
          </nav>

          <nav class="footer-bottom-catalog fotter-bottom-brend__nav">
            <ul class="footer-bottom-catalog__list">
              <li class="footer-bottom-catalog__item" v-for="brand of brands.slice(0, 27)" :key="brand._id">
                <router-link :to="'/catalog?brand_id=' + brand._id" class="footer-bottom-catalog__link">{{brand.name}}</router-link>
              </li>
            </ul>
          </nav>
          <!--
          <div class="footer-slider js-footer-slider">
            <div class="footer-slider__slide" style="background: url(img/footer-slide_1.png) no-repeat">
              <div class="footer-slider__hover">
                <div class="footer-slider__hover-text">-30% на Jordan air до 14.05.18</div>
                <a href="#" class="footer-slider__hover-link">подробнее</a>
              </div>
              <div class="footer-slider__text">Sale</div>
              <div class="footer-slider__price">-30%</div>
            </div>

            <div class="footer-slider__slide" style="background: url(img/footer-slide_1.png) no-repeat">
              <div class="footer-slider__hover">
                <div class="footer-slider__hover-text">-30% на Jordan air до 14.05.18</div>
                <a href="#" class="footer-slider__hover-link">подробнее</a>
              </div>
              <div class="footer-slider__text">Sale</div>
              <div class="footer-slider__price">-30%</div>
            </div>

            <div class="footer-slider__slide" style="background: url(img/footer-slide_1.png) no-repeat">
              <div class="footer-slider__hover">
                <div class="footer-slider__hover-text">-30% на Jordan air до 14.05.18</div>
                <a href="#" class="footer-slider__hover-link">подробнее</a>
              </div>
              <div class="footer-slider__text">Sale</div>
              <div class="footer-slider__price">-30%</div>
            </div>
          </div>
          -->
        </div>
        <div class="footer-search">
          <div class="footer-search-left">
            <form action="send.php" method="post" class="footer-form">
              <div class="footer-form-wrapper">
                <input type="search" placeholder="E-mail на рассылку" />
                <input type="submit" value="подписаться" class="btn" />
                <div class="footer-form__subscribe">
                  <i class="fa-choose"></i>
                  <div class="subscribe__text">
                    Вы успешно подписались!
                  </div>
                </div>
              </div>
            </form>

            <ul class="footer-copy__list">
              <!-- <li class="footer-copy__item">&copy; Redcat.com, Inc. All rights reserved</li>
						  <li class="footer-copy__item">designed by Slice Planet</li> -->
              <li class="footer-copy__item">
                <router-link to="/privacy">
                  Политика конфиденциальности
                </router-link>
              </li>
              <li class="footer-copy__item">
                <router-link to="/dogovor">
                  Договор оферты
                </router-link>
              </li>
            </ul>
          </div>
          <div class="footer-search-bottom">
            <div class="footer-search-bottom_left">&copy; Redcat.com, Inc. All rights reserved</div>
            <!-- <div class="footer-search-bottom_right">designed by Slice Planet</div> -->
          </div>

        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'Footer',
  computed: {
    ...mapState(['token', 'basket', 'wish']),
    ...mapState('userinfo', ['userinfo']),
    ...mapState('card', ['card']),
    ...mapState('nav_info', ['categories', 'subcategories', 'brands', 'colors'])
  },
  methods: {
    parseInt: parseInt
  },
}
</script>

<style scoped>

</style>
