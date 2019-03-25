import Vue from 'vue'
import Router from 'vue-router'

// The meta data for your routes

// Function to create routes
// Is default lazy but can be changed
function route (path, view, name, meta) {
  return {
    path,
    name,
    component: resolve => import(`@/components/pages/${view}/index.vue`).then(resolve),
    meta: meta
  }
}

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    base: __dirname,
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      route('/', 'Homepage', 'Главная'),
      route('/catalog', 'Shop', 'Кталог'),
      route('/catalog/:alt', 'Shop/Item', 'Продукт'),
      route('/cart', 'Card', 'Корзина'),
      route('/cart/submit', 'Card/Submit', 'Оформление'),
      route('/favorite', 'Favorite', 'Избранное'),
      route('/dogovor', 'Dogovor', 'Договор'),
      route('/privacy', 'Privacy', 'Политика Конфеденциальности'),
      route('/404', 'NotFound', '404'),
      route('/cabinet', 'Cabinet', 'Кабинет', { auth: true }),
      route('/reset-password', 'ResetPassword', 'Востановление пароля'),
      route('/partnership', 'Partnership', 'Партнетсво'),
      route('/confirm/account', 'ConfirmAccount', 'Потвердить'),
      route('/set-userdata', 'SuccessReg', 'Инфо юзера'),
      route('/registration', 'Registration', 'Регистрация'),
      route('/help', 'Help', 'Помощь'),
      route('/help/:category', 'Help/Category', 'Помощь категория'),
      route('/help/:category/:id', 'Help/Info', 'Помощь информация'),
      route('/stock', 'Stock', 'Акции'),
      // Global redirect for 404
      { path: '*', redirect: '/404' }
    ]
  })
  return router
}
