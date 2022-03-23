import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/FrontView.vue'),
    children: [
      {
        path: '/',
        name: '首頁',
        component: () => import(/* webpackChunkName: "about" */ '../views/indexView.vue'),
        meta: {
          title: '黑川玩具批發店',
        },
      },
      {
        path: 'products',
        name: '產品頁',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductView.vue'),
        meta: {
          title: '黑川玩具批發店|產品列表頁',
        },
      },
      {
        path: 'product/:id',
        name: '產品內頁',
        component: () => import(/* webpackChunkName: "about" */ '../views/Productinside.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'car',
        name: '購物車',
        component: () => import(/* webpackChunkName: "about" */ '../views/CardataView.vue'),
        meta: {
          title: '黑川玩具批發店|購物車頁',
        },
      },
      {
        path: 'orderover',
        name: '結帳頁面',
        component: () => import(/* webpackChunkName: "about" */ '../views/orderOver.vue'),
        meta: {
          title: '黑川玩具批發店|結帳頁',
        },
      }
    ]
  }, {
    path: '/login',
    component: () => import('../views/loginView.vue')
  }, {
    path: '/admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin/DashboredView.vue'),
    children: [

      {
        path: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin/AdminProducts.vue')
      },
      {
        path: 'order',
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin/OrderView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'

})

export default router
