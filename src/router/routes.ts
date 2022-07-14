import type { RouteRecordRaw } from 'vue-router'

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '首页',
    },
  },
]
