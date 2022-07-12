import type { RouteRecordRaw } from 'vue-router'

interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: {
    title: string
  }
}

export const basicRoutes: AppRouteRecordRaw[] = [
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
