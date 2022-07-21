import { defineStore } from 'pinia'
import { basicRoutes } from '@/router/routes'
import { Route } from '@/declare/route'
import {
  asyncImportRoute,
  routerToMenu,
  transformUserResourceToRoutes,
  transformRoutesArrToFlat,
} from '@/router/helpers'
import { fetchUserRoutes } from '@/api'

interface AsyncRouteState {
  menus: Route.MenuType[]
  routers: Route.MenuToRouteType[]
  addRouters: any[]
  keepAliveComponents: Array<string>
  loadedState: boolean
  tabList: Array<Route.tabType>
  tabActivated: Route.tabType | null
}

export const routerStore = defineStore('router-store', {
  state: (): AsyncRouteState => {
    return {
      menus: [],
      routers: basicRoutes,
      addRouters: [],
      keepAliveComponents: [],
      loadedState: false, //是否已后去服务端的菜单资源
      tabList: [], //打开的tab页面
      tabActivated: null, //激活的tab页面
    }
  },
  actions: {
    setTabList(tab: Route.tabType, operate: '增加' | '删除') {
      const index = this.tabList.findIndex(
        (item) => item.routeName === tab.routeName,
      )

      if (operate === '增加') {
        index === -1 && this.tabList.push(tab) //没有才增加
      } else {
        this.tabList.splice(index, 1)
      }
    },
    setTabActivated(tab: Route.tabType) {
      this.tabActivated = tab
    },
    setKeepAliveComponents(componentNames: string[]) {
      this.keepAliveComponents = componentNames
    },
    setLoadedState(state: boolean) {
      this.loadedState = state
    },
    setRouters(routers: Route.MenuToRouteType[]) {
      this.addRouters = routers
      this.routers = [...basicRoutes, ...routers]
    },
    setMenus(menus: Route.MenuToRouteType[]) {
      this.menus = routerToMenu(menus)
    },
    // 从服务端获取用户菜单资源转为页面能用的menu和route
    getUserResourceAndTransform() {
      // 从服务端获取当前用户的菜单资源
      return fetchUserRoutes().then(({ data }) => {
        // 菜单资源转为route
        const routes = transformUserResourceToRoutes(data.children || [])
        // 生成左侧菜单数据
        this.setMenus(routes)

        // 把多级的路由数组转为二级数组, 解决不能缓存二级路由以下的页面
        const routesFlat = transformRoutesArrToFlat(routes)
        // 为route生成component
        asyncImportRoute(routesFlat)
        this.setRouters(routesFlat)

        return routesFlat
      })
    },
  },
})
