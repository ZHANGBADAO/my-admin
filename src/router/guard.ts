import type { Router, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteEnum } from '@/enum'
import { authStore, routerStore } from '@/store/modules'
import { consoleError } from '@/utils'
import { ErrorRoute } from '@/router/routes'

const whitePathList: Array<string> = [RouteEnum.LOGIN_PATH]

export function createRouterGuards(router: Router) {
  const asyncAuthStore = authStore()
  const asyncRouteStore = routerStore()

  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    // 白名单中存在需要跳转的路由直接放行
    if (whitePathList.includes(to.path)) {
      next()
      return
    }

    // token验证
    const token = asyncAuthStore.getToken
    if (!token) {
      // 是否无需验证权限 true表示忽略 false表示需要
      if (to.meta.ignoreAuth) {
        next()
        return
      }
      // 重定向到登录页面
      const redirectData: RedirectType = {
        path: RouteEnum.LOGIN_PATH,
        // replace: true,
      }
      if (to.path) {
        redirectData.query = { redirect: to.path }
      }
      next(redirectData)
      return
    }

    // 根据远程路由加载状态判断是否需要远程获取用户资源
    if (asyncRouteStore.loadedState) {
      next()
      return
    }
    // 获取当前登录用户权限资源
    const routesFlat = await asyncRouteStore.getUserResourceAndTransform()
    // 动态添加路由
    routesFlat.forEach((item) => {
      router.addRoute(item as RouteRecordRaw)
    })
    asyncRouteStore.setLoadedState(true)
    console.log('服务端获取的菜单转为路由', routesFlat)

    // 配置404错误路由
    const isErrorPage = router
      .getRoutes()
      .findIndex((item) => item.name === 'NotFound')
    if (isErrorPage === -1) {
      router.addRoute(ErrorRoute as RouteRecordRaw)
    }

    next(to)
  })

  router.afterEach((to, from) => {
    const { VITE_APP_NAME } = import.meta.env
    document.title = `${to.meta.title as string} - ${VITE_APP_NAME}`

    // 处理组件是否缓存
    if (to.meta.isKeepalive) {
      // 需要缓存的组件
      const aliveComponentsArr = asyncRouteStore.keepAliveComponents
      if (!aliveComponentsArr.includes(to.meta.componentName as string)) {
        aliveComponentsArr.push(to.meta.componentName as string)
        asyncRouteStore.setKeepAliveComponents(aliveComponentsArr)
      }
    }

    NProgress.done()
  })

  router.onError((error, to, from) => {
    NProgress.remove()
    consoleError('路由异常', error, to, from)
  })
}

interface RedirectType {
  path: string
  replace?: boolean
  query?: Record<string, string>
}
