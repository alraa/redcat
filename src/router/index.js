import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid'
})

function route (path, view, name, meta) {
  return {
    path,
    name: name || '',
    component: resolve => import(`@/components/pages/${view}/index.vue`).then(resolve),
    meta: meta,
    props: true
  }
}

let router = new Router({
  base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    route('/users', 'Users', 'Пользователи', {requiresAuth: true}),
    route('/products', 'Products', 'Товары', {requiresAuth: true}),
    route('/product/:id', 'Supplier/Single', 'Информация о товаре', {requiresAuth: true}),
    route('/products/add', 'Products/Add', 'Добавить товар', {requiresAuth: true}),
    route('/products/edit/:id', 'Products/Edit', 'Редактировать товар', {requiresAuth: true}),
    route('/supplier', 'Supplier', 'Поставщики', {requiresAuth: true}),
    route('/supplier/:id', 'Supplier/Single', 'Информация о заказе', {requiresAuth: true}),
    route('/order', 'Orders', 'Заказы', {requiresAuth: true}),
    route('/order/:id', 'Orders/item', 'Заказ', {requiresAuth: true}),
    route('/discount', 'Discount', 'Скидки', {requiresAuth: true}),
    route('/discount/add', 'Discount/Add', 'Добавление скидки', {requiresAuth: true}),
    route('/login', 'Login', 'Вход'),
    // Global redirect for 404e
    { path: '*', redirect: '/products', requiresAuth: true }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('redCatToken') === null) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
