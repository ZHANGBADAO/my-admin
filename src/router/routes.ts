import { Route } from '@/declare/route'

export const basicRoutes: Route.MenuToRouteType[] = [
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
