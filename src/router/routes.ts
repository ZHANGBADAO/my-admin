import { Route } from '@/declare/route'

const layoutPage = () => import('@/views/layout/index.vue')
const ErrorPage = () => import('@/views/exception/404.vue')

export const basicRoutes: Route.MenuToRouteType[] = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
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
    component: layoutPage,
    meta: {
      title: '首页',
    },
  },
]

export const ErrorRoute: Route.MenuToRouteType = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: ErrorPage,
  meta: {
    title: '错误页',
  },
}
