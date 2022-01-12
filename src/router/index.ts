import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/shop'
  },
  {
    path: '/shop',
    component: () => import('views/shop.vue')
  },
  {
    path: '/category',
    component: () => import('views/category.vue')
  },
  {
    path: '/cart',
    component: () => import('views/cart.vue')
  },
  {
    path: '/consult',
    component: () => import('views/consult.vue')
  },
  {
    path: '/login',
    component: () => import('views/login.vue')
  },
  {
    path: '/prefile',
    component: () => import('views/prefile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
