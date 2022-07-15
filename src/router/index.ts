import type { App } from 'vue'
import { createRouterGuards } from './guard'

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { basicRoutes } from './routes'

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as RouteRecordRaw[],
})

// config router
export function setupRouter(app: App) {
  createRouterGuards(router)
  app.use(router)
}
