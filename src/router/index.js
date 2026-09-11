import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenticated, getRole } from '@/utils/auth'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue')
  },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/orders/OrdersView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/product/ProductView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin/AdminDashboard.vue'),
        meta: {
          requiresAuth: true,
          requiresAdmin: true
        },
        children: [
            {
              path: 'products',
              name: 'admin-products',
              component: () => import('../views/admin/AdminProducts.vue')
            },
            {
              path: 'orders',
              name: 'admin-orders',
              component: () => import('../views/admin/AdminOrders.vue')
            },
            {
              path: 'users',
              name: 'admin-users',
              component: () => import('../views/admin/AdminUsers.vue')
            }
          ]
      }
      
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return next('/login')
  }

  if (to.meta.requiresAdmin && getRole() !== 'admin') {
    return next('/products')
  }

  next()
})

export default router
