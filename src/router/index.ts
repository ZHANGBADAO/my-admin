import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes,
})

// config router
export function setupRouter(app: App) {
  app.use(router)
}
