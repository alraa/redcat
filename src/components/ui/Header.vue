<template>
  <header>
    <div class="header__active">
      <div class="wrapper header_wrapper">
        <div class="active__content unlogin_on">
          <div v-if="!token" class="active__unlogin">
            <div class="unlogin__title">
              Магазин одежды, обуви и аксессуаров
            </div>
            <div class="unlogin__panel">
              <div class="login-lang login-lang_unlogin">
									<span class="current">
										RU
									</span>
                <div class="choice" style="display: none;">
										<span class="choice__item">
											RU
										</span>
                  <span class="choice__item">
											ENG
										</span>
                </div>
              </div>
              <div class="unlogin__log-in">
                <a @click.prevent="openModal({type: 'authorization'})" href="#">
                  Войти
                </a>
              </div>
              <div class="unlogin__line">
                /
              </div>
              <div class="unlogin__reg-in">
                <a @click.prevent="openModal({type: 'registration'})" href="#">
                  Регистрация
                </a>
              </div>
            </div>
          </div>
          <div v-else class="active__login">
            <div class="active__login-user">{{userinfo.personMeta.surname || ''}} {{userinfo.personMeta.name || ''}} {{userinfo.personMeta.patronymic || ''}}</div>
            <div class="active__login-wrap">
              <ul class="login__bar">
                <li class="login__item">
                  <router-link to="/cabinet" class="login__link">
                    Личный Кабинет
                  </router-link>
                </li>
              </ul>
              <div class="login-lang">
									<span class="current">
										RU
									</span>
                <div class="choice" style="display: none;">
										<span class="choice__item">
											RU
										</span>
                  <span class="choice__item">
											ENG
										</span>
                </div>
              </div>
              <div class="login__account">
                <a @click.prevent="logoutIn()" href="#" class="login__account-exit">
                  <span class="login__account-text">Выйти</span>
                  <span class="login__account-icon">
										<i class="icon-header-exit"></i>
									</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header__primary">
      <div class="burger burger_open-js">
        <div class="burger__container">
          <span class="burger__line"></span>
          <span class="burger__line"></span>
          <span class="burger__line"></span>
        </div>
      </div>
      <div class="wrapper header_wrapper">
        <div class="primary__content">
          <router-link to="/" class="primary__logo-container">
            <img src="~@/assets/img/logo_2.png" alt="" id="logo__desktop">
          </router-link>
          <nav class="primary__nav-container">
            <ul class="nav__bar">
              <li class="nav__item">
                <router-link to="/catalog" class="nav__link">
                  Новинки
                </router-link>
                <div class="new-popup nav_popup">
                  <div class="new-popup_wrapper">
                    <div class="new-popup__item-bar nav_popup-column-32">
                      <div class="nav_popup-title">
                        Новое
                      </div>
                      <ul class="nav_popup-bar">
                        <li class="nav_popup-item">
                          <router-link :to="'/catalog'" class="nav_popup-link">
                            Смотреть все
                          </router-link>
                        </li>
                        <li v-for="(cat, index) of categories" class="nav_popup-item" v-bind:class="{ hide: (index > maxItemsDisplay) }" :key="cat._id">
                          <router-link :to="'/catalog?category_id=' + cat._id" class="nav_popup-link">
                            {{cat.name}}
                          </router-link>
                        </li>
                      </ul>
                    </div>
                    <div class="new-popup__image-bar nav_popup-column-60">
                      <div class="nav_popup-title">
                        Новые подборки
                      </div>
                      <div class="new-popup__image-collection">
                        <a href="#" class="new-popup__image-item" style="background: url('/static/img/new-popup_1.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Nike
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_2.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Gucci
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_3.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Hilroy
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_4.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Adidas
														</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav__item" v-for="category of categories" :key="category._id">
                <a :href="'/catalog?category_id=' + category._id" class="nav__link" @click.prevent="">
                  {{category.name}}
                </a>
                <div class="new-popup nav_popup">
                  <div class="new-popup_wrapper">
                    <div class="new-popup__item-bar nav_popup-column-32">
                      <div class="nav_popup-title">
                        Новое
                      </div>
                      <ul class="nav_popup-bar">

                        <li class="nav_popup-item">
                          <router-link :to="'/catalog?category_id=' + category._id" href="" class="nav_popup-link">
                            Смотреть все
                          </router-link>
                        </li>

                        <li v-for="(subcat, index) of subcategories.filter(subcat => subcat.category_id === category._id)" :key="subcat._id" class="nav_popup-item" v-bind:class="{ hide: (index > maxItemsDisplay) }">
                          <router-link :to="'/catalog?subcategory_id=' + subcat._id" class="nav_popup-link">
                            {{subcat.name}}
                          </router-link>
                        </li>

                      </ul>
                    </div>
                    <div class="new-popup__image-bar nav_popup-column-60">
                      <div class="nav_popup-title">
                        Новые подборки
                      </div>
                      <div class="new-popup__image-collection">
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_1.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Nike
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_2.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Gucci
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_3.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Hilroy
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_4.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Adidas
														</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav__item">
                <a :href="'/catalog'" class="nav__link" @click.prevent="">
                  Бренды
                </a>
                <div class="new-popup nav_popup">
                  <div class="new-popup_wrapper">
                    <div class="new-popup__item-bar nav_popup-column-32">
                      <div class="nav_popup-title">
                        Новое
                      </div>
                      <ul class="nav_popup-bar">
                        <li class="nav_popup-item">
                          <router-link :to="'/catalog'" class="nav_popup-link">
                            Смотреть все
                          </router-link>
                        </li>

                        <li v-for="(brand, index) of brands" :key="brand._id" class="nav_popup-item"  v-bind:class="{ hide: (index > maxItemsDisplay) }">
                          <router-link :to="'/catalog/?brand_ids=' + brand._id" class="nav_popup-link">
                            {{brand.name}}
                          </router-link>
                        </li>

                      </ul>
                    </div>
                    <div class="new-popup__image-bar nav_popup-column-60">
                      <div class="nav_popup-title">
                        Новые подборки
                      </div>
                      <div class="new-popup__image-collection">
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_1.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Nike
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_2.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Gucci
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_3.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Hilroy
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('./@/assets/img/new-popup_4.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Adidas
														</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav__item">
                <router-link to="/404" class="nav__link">
                  Помощь
                </router-link>
              </li>
              <li class="nav__item">
                <router-link to="/404"  href="#" class="nav__link">
                  Акции
                </router-link>
              </li>
              <li class="nav__item">
                <router-link to="/404" class="nav__link">
                  Партнерство
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="favorite">
            <router-link to="/favorite" class="favorite__link">
              <img src="~@/assets/img/heart_icon.svg" alt="" class="favorite__img">
            </router-link>
            <span class="favorite__count">
								{{wish.length}}
							</span>
          </div>
          <div class="cart cart_margin">
            <router-link to="/cart" class="cart__link">
              <img src="~@/assets/img/cart_icon.svg" alt="" class="cart__img">
            </router-link>
            <span class="cart__count">
								{{basket.length}}
							</span>
          </div>
          <div class="search search_margin" :class="{'search_off': showSearch}">
            <div class="search__container">
              <a href="#" @click.prevent="show" class="search__link">
                <img src="~@/assets/img/dandruff_icon.svg" alt="" class="search__img">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header__mobile">
      <div class="header_wrapper-m">
        <div class="header__logo-mobile-container">
          <div class="header__logo-mobile">
            <img src="~@/assets/img/logo.png" alt="">
          </div>
        </div>
        <div class="mobile-menu__container">
          <div class="mobile-menu__icon-container mobile-menu__login">
            <a href="#" class="mobile-menu__icon">
              <img src="~@/assets/img/avatar_icon_m.png" alt="">
              <span class="mobile-menu__notification"></span>
            </a>
          </div>
          <div class="mobile-menu__icon-container">
            <a href="#" class="mobile-menu__icon">
              <img src="~@/assets/img/heart_icon.png" alt="">
              <span class="mobile-menu__counter">22</span>
            </a>
          </div>
          <div class="mobile-menu__icon-container">
            <a href="#" class="mobile-menu__icon">
              <img src="~@/assets/img/cart_icon.png" alt="">
              <span class="mobile-menu__counter">13</span>
            </a>
          </div>
          <div class="mobile-menu__icon-container mobile-menu__search-click">
            <a href="#" class="mobile-menu__icon">
              <img src="~@/assets/img/dandruff_icon.png" alt="">
            </a>
          </div>
          <div class="mobile-burger">
            <div class="mobile-burger__container">
              <span class="mobile-burger__line"></span>
              <span class="mobile-burger__line"></span>
              <span class="mobile-burger__line"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Наши великие версталюги тут сделали отдельный навбар для узких моников, страдате, разрабы -->

    <div class="header_content header_content-m">
      <div class="content-m__wrapper">
        <div class="transparent-cat">
          <img src="~@/assets/img/cat_icon.png" alt="">
        </div>
        <aside class="content-m__aside">
          <div class="content-m__menu content-m__menu-unlogin">
            <div class="content-m__passage">
              <div class="passage__title">
                Магазин одежды, обуви и аксессуаров
              </div>
              <div class="passage__panel">
                <div class="passage__login">
                  <a href="#">
                    Войти
                  </a>
                </div>
                <div class="passage__line">
                  /
                </div>
                <div class="passage__reg">
                  <a href="#">
                    Регистрация
                  </a>
                </div>
              </div>
            </div>
            <ul class="content-m__bar">
              <li class="content-m__item">
                <a href="#" class="nav__link content-m__link">
                  Новинки
                </a>
                <div class="new-popup nav_popup">
                  <div class="new-popup_wrapper">
                    <div class="new-popup__item-bar nav_popup-column-32">
                      <div class="back-to-menu">
                        <i class="fa-back"></i>
                        Назад
                      </div>
                      <div class="nav_popup-title">
                        Новое
                      </div>
                      <ul class="nav_popup-bar">
                        <li class="nav_popup-item">
                          <router-link :to="'/catalog'" class="nav_popup-link">
                            Смотреть все
                          </router-link>
                        </li>

                        <li v-for="(item) of categories" class="nav_popup-item" :key="item._id">
                          <router-link :to="'/catalog?categry_id' + item._id" class="nav_popup-link">
                            {{item.name}}
                          </router-link>
                        </li>

                      </ul>
                    </div>
                    <div class="new-popup__image-bar nav_popup-column-60">
                      <div class="nav_popup-title">
                        Новые подборки
                      </div>
                      <div class="new-popup__image-collection">
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_1.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Nike
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_2.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Gucci
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_3.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Hilroy
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('./@/assets/img/new-popup_4.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Adidas
														</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="content-m__item" v-for="category of categories" :key="category._id">
                <a :href="'/catalog?category_id=' + category._id" class="content-m__link" @click.prevent="">
                  {{category.name}}
                </a>
                <div class="new-popup nav_popup">
                  <div class="new-popup_wrapper">
                    <div class="new-popup__item-bar nav_popup-column-32">
                      <div class="back-to-menu">
                        <i class="fa-back"></i>
                        Назад
                      </div>
                      <div class="nav_popup-title">
                        Новое
                      </div>
                      <ul class="nav_popup-bar">
                        <li class="nav_popup-item">
                          <router-link :to="'/catalog'" class="nav_popup-link">
                            Смотреть все
                          </router-link>
                        </li>

                        <li v-for="(subcategory) of subcategories.filter(i => i.category_id === category._id)" class="nav_popup-item" :key="subcategory._id">
                          <router-link :to="'/catalog?subcategory_id=' + subcategory._id" class="nav_popup-link">
                            {{subcategory.name}}
                          </router-link>
                        </li>

                      </ul>
                    </div>
                    <div class="new-popup__image-bar nav_popup-column-60">
                      <div class="nav_popup-title">
                        Новые подборки
                      </div>
                      <div class="new-popup__image-collection">
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_1.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Nike
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_2.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Gucci
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('static/img/new-popup_3.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Hilroy
														</span>
                        </a>
                        <a href="#" class="new-popup__image-item" style="background: url('./@/assets/img/new-popup_4.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Adidas
														</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="content-m__item">
                <a href="#" class="content-m__link" @click.prevent="">
                  Бренды
                </a>
                <div class="new-popup nav_popup">
                  <div class="new-popup_wrapper">
                    <div class="new-popup__item-bar nav_popup-column-32">
                      <div class="back-to-menu">
                        <i class="fa-back"></i>
                        Назад
                      </div>
                      <div class="nav_popup-title">
                        Новое
                      </div>
                      <ul class="nav_popup-bar">
                        <li class="nav_popup-item">
                          <a href="" class="nav_popup-link">
                            Смотреть все
                          </a>
                        </li>

                        <li v-for="brand of brands" class="nav_popup-item" :key="brand._id">
                          <router-link :to="'/catalog?brand_id=' + brand._id" class="nav_popup-link">
                            {{brand.name}}
                          </router-link>
                        </li>

                      </ul>
                    </div>
                    <div class="new-popup__image-bar nav_popup-column-60">
                      <div class="nav_popup-title">
                        Новые подборки
                      </div>
                      <div class="new-popup__image-collection">
                        <a href="#" @click.prevent="" class="new-popup__image-item" style="background: url('static/img/new-popup_1.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Nike
														</span>
                        </a>
                        <a href="#" @click.prevent="" class="new-popup__image-item" style="background: url('static/img/new-popup_2.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Gucci
														</span>
                        </a>
                        <a href="#" @click.prevent="" class="new-popup__image-item" style="background: url('static/img/new-popup_3.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Hilroy
														</span>
                        </a>
                        <a href="#" @click.prevent="" class="new-popup__image-item" style="background: url('./@/assets/img/new-popup_4.png') no-repeat center center;">
														<span class="new-popup__image-phrase">
															Adidas
														</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="content-m__item">
                <router-link to="/404" href="#" class="content-m__link">
                  Помощь
                </router-link>
              </li>
              <li class="content-m__item">
                <router-link to="/404" href="#" class="content-m__link">
                  Акции
                </router-link>
              </li>
              <li class="content-m__item">
                <router-link to="/404" href="#" class="content-m__link">
                  Партнерство
                </router-link>
              </li>
            </ul>
            <div class="content-m__login">
              <div class="m__login-user">
                <div class="m__login-avatar">
                  <img src="~@/assets/img/logo-mail.png" alt="">
                </div>
                <div class="m__login-name">
                  Елена Тарасенко
                </div>
                <div class="m__login-email">
                  redcat@gmail.com
                </div>
              </div>
              <ul class="m__login-bar">
                <li class="m__login-item">
                  <a href="" class="m__login-link">
                    Способы оплаты
                  </a>
                </li>
                <li class="m__login-item">
                  <a href="" class="m__login-link">
                    Возвраты
                  </a>
                </li>
                <li class="m__login-item">
                  <a href="" class="m__login-link">
                    Мои заказы
                  </a>
                </li>
                <li class="m__login-item">
                  <a href="" class="m__login-link">
                    Личный кабинет
                  </a>
                </li>
              </ul>
            </div>
            <div class="login-lang">
								<span class="current">
									RU
								</span>
              <div class="choice" style="display: none;">
									<span class="choice__item">
										RU
									</span>
                <span class="choice__item">
										ENG
									</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    <div class="header__search" :class="{'header__search-on': showSearch}">
      <form @submit.prevent="goSearch" class="header__search-form" v-click-outside="hide">
        <div class="header__search-wrapper">
          <input type="search" v-model="searchName" name="search" placeholder="Поиск">
        </div>
        <div class="header__search-icon">
          <input type="submit" value="">
        </div>
      </form>
      <div class="header__search-cross" @click.prevent="showSearch = false">
      </div>
    </div>
  </header>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import ClickOutside from 'vue-click-outside'
import { setImmediate } from 'timers';
export default {
  data() {
    return {
      maxItemsDisplay: 5,
      searchName: '',
      showSearch: false
    }
  },
  directives: {
    ClickOutside
  },
  name: 'Header',
  computed: {
    ...mapState(['token', 'basket', 'wish']),
    ...mapState('userinfo', ['userinfo']),
    ...mapState('card', ['card']),
    ...mapState('nav_info', ['categories', 'subcategories', 'brands', 'colors'])
  },
  created() {
  
    this.getAllCategories()
    this.getAllSubcategories()
    this.getAllBrands()
    this.getAllColors()
  },
  mounted() {
    this.$nextTick(() => {
      if(this.token) {
        this.getUserinfo()
      }
    })
    
  },
  methods: {
    ...mapMutations('modals', ['openModal']),
    ...mapMutations(['logout']),
    ...mapActions('userinfo', ['getUserinfo']),
    ...mapActions('nav_info', ['getAllCategories', 'getAllSubcategories', 'getAllBrands', 'getAllColors']),
    logoutIn () {
      this.logout()
      this.$router.push({path: '/'})
    },
    goSearch() {
      this.showSearch = false
      this.$router.push({path: 'catalog', query: {name: this.searchName}})
      this.searchName = ''
    },
    show() {
      setImmediate( () => {this.showSearch = true} )
    },
    hide() {
      this.showSearch = false
    }
  },
}
</script>

<style scoped>
  .unlogin_on .active__unlogin {
     display: flex;
  }
  .hide {
    display: none
  }
</style>
