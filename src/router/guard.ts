import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteEnum } from '@/enum'
import { authStore, routerStore } from '@/store/modules'
import { consoleError } from '@/utils'

const whitePathList: Array<string> = [RouteEnum.LOGIN_PATH]

export function createRouterGuards(router: Router) {
  const asyncAuthStore = authStore()

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

    next()
  })

  router.afterEach((to, from) => {
    const { VITE_APP_NAME } = import.meta.env
    document.title = `${to.meta.title as string} - ${VITE_APP_NAME}`

    // 处理组件是否缓存
    const asyncRouteStore = routerStore()
    const keepaliveComponents = asyncRouteStore.keepAliveComponents
    if (to.meta.isKeepalive) {
      // 需要缓存的组件
      !keepaliveComponents.includes(to.name as string) &&
        keepaliveComponents.push(to.name as string)
    }
    asyncRouteStore.setKeepAliveComponents(keepaliveComponents)

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
