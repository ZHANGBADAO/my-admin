import { defineStore } from 'pinia'
import { basicRoutes } from '@/router/routes'
import { Route } from '@/declare/route'
import type { RouteRecordRaw } from 'vue-router'
import {
  asyncImportRoute,
  routerToMenu,
  transformUserResourceToRoutes,
} from '@/router/helpers'
// import { fetchUserRoutes } from '@/api'

interface AsyncRouteState {
  menus: Route.MenuType[]
  routers: RouteRecordRaw[]
  addRouters: any[]
  keepAliveComponents: Array<string>
  loadedState: boolean
}

export const routerStore = defineStore('router-store', {
  state: (): AsyncRouteState => {
    return {
      menus: [],
      routers: basicRoutes,
      addRouters: [],
      keepAliveComponents: [],
      loadedState: false,
    }
  },
  actions: {
    setKeepAliveComponents(componentNames: string[]) {
      this.keepAliveComponents = componentNames
    },
    setLoadedState(state: boolean) {
      this.loadedState = state
    },
    setRouters(routers: any[]) {
      this.addRouters = routers
      this.routers = [...basicRoutes, ...routers]
    },
    setMenus(menus: any[]) {
      this.menus = routerToMenu(menus)
    },
    async getUserResourceAndTransform() {
      // 从服务端获取当前用户的菜单资源
      /*const res = await fetchUserRoutes()
      if (res.error) {
        return Promise.reject(res.error)
      }

      // 菜单资源转为route
      const routes = transformUserResourceToRoutes(res.data?.children || [])
      asyncImportRoute(routes)
      this.setRouters(routes)

      this.setMenus(routes)

      return Promise.resolve(routes)*/
    },
  },
})
