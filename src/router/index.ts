import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/shop'
  },
  {
    name: 'shop',
    path: '/shop',
    component: () => import('views/Shop.vue'),
    meta: {
      isShowTabBar: true
    }
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('views/Category.vue'),
    meta: {
      isShowTabBar: true
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('views/Cart.vue'),
    meta: {
      isShowTabBar: true
    }
  },
  {
    name: 'consult',
    path: '/consult',
    component: () => import('views/Consult.vue'),
    meta: {
      isShowTabBar: false
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('views/Login.vue'),
    meta: {
      isShowTabBar: false
    }
  },
  {
    name: 'pofile',
    path: '/profile',
    component: () => import('views/Profile.vue'),
    meta: {
      isShowTabBar: true
    }
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('views/Search.vue'),
    meta: {
      isShowTabBar: false
    },
    children: [
      {
        path: '',
        redirect: '/search/search-history'
      },
      {
        name: 'search-history',
        path: 'search-history',
        component: () => import('views/Search/SearchHistory.vue'),
        meta: {
          isShowTabBar: false
        }
      },
      {
        name: 'search-result',
        path: 'search-result',
        component: () => import('views/Search/SearchResult.vue'),
        meta: {
          isShowTabBar: false
        }
      }
    ]
  },
  {
    name: 'details',
    path: '/details/:flowerId',
    component: () => import('views/Details.vue'),
    meta: {
      isShowTabBar: false
    }
  },
  {
    name: 'address-list',
    path: '/address-list',
    component: () => import('views/AddressList.vue'),
    meta: {
      isShowTabBar: false
    }
  },
  {
    name: 'address-edit',
    path: '/address/:method',
    component: () => import('views/AddressEdit.vue'),
    meta: {
      isShowTabBar: false
    }
  },
  {
    path: '/test',
    component: () => import('../views/test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
