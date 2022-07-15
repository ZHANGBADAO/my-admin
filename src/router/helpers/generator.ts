import { consoleWarn } from '@/utils'
import type { RouteComponent } from 'vue-router'
import { Route } from '@/declare/route'

// 接口获取的菜单转换为route,此时route里component值为字符串(组件的路径)
export const transformUserResourceToRoutes = (
  resource: Api.Menu[],
  parent?: Route.MenuToRouteType,
): Route.MenuToRouteType[] => {
  return resource.map((item) => {
    let routePath = ''
    let componentName = ''
    if (parent && parent.path) {
      routePath = item.data.path
      componentName = `${parent.meta!.componentName}_${item.data.path}`
    } else {
      routePath = `/${item.data.path}`
      componentName = `${item.data.path}`
    }

    const currentRouter: Route.MenuToRouteType = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: routePath,
      name: componentName,
      // 该路由对应页面的组件路径
      component: item.data.component!,
      meta: {
        // 组件名称
        componentName: componentName,
        value: item.data.id,
        title: item.data.menuName,
        label: item.data.menuName,
        icon: item.data.icon!,
        level: item.data.level,
        isHidden: item.data.isHidden,
        sortNo: item.data.sortNo,
        permissions: item.data.permission!,
        ignoreAuth: false,
      },
    }

    // 是否有子菜单，并递归处理
    if (item.children && item.children.length) {
      // 如果未定义 redirect 默认第一个子路由为 redirect
      if (!item.data.redirectPath) {
        const parentRedirectPath = `/${currentRouter.meta!.componentName!.replaceAll(
          '_',
          '/',
        )}`
        currentRouter.redirect = `${parentRedirectPath}/${item.children[0].data.path}`
      }

      currentRouter.children = transformUserResourceToRoutes(
        item.children,
        currentRouter,
      )
    }

    return currentRouter
  })
}

/**
 * 查找views中对应的组件文件
 * */
const viewsModules: Record<string, () => Promise<RouteComponent>> =
  import.meta.glob('../../views/**/*.{vue,tsx}')

const layoutComponent = () => import('@/views/layout/index.vue')

export const asyncImportRoute = (routes: Route.MenuToRouteType[]): void => {
  routes.forEach((item) => {
    const { component, children } = item
    if (component) {
      if (component === 'LAYOUT') {
        item.component = layoutComponent
      } else {
        const viewsModulesKey = `../../views${component as string}.vue`
        item.component = viewsModules[viewsModulesKey]
      }
    }

    if (children && children.length) {
      asyncImportRoute(children)
    }
  })
}

/**
 * 把多级的路由数组转为二级数组, 解决不能缓存二级路由以下的页面
 * 参数: routes 多级的路由数组, breadCrumb 面包屑导航数组(由于把多级变成二级,$route.matched 无法获取到嵌套路由每一层级的信息, 所以要保存面包屑到meta)
 * 返回值: 二级的路由数组
 */
export function transformRoutesArrToFlat(
  routes: Route.MenuToRouteType[],
  breadCrumb: Route.BreadCrumbType[] = [],
) {
  let arrFlat: Route.MenuToRouteType[] = []

  routes.forEach((route) => {
    const tempObj: Route.MenuToRouteType = {
      path: route.path,
      component: route.component,
      name: route.name,
      meta: route.meta,
      redirect: route.redirect,
      children: [],
    }
    const breadCrumbTemp: Route.BreadCrumbType[] = [
      { title: tempObj.meta!.title as string, path: tempObj.path },
    ]

    if (
      route.meta!.level === 1 &&
      route.children &&
      route.children.length > 0
    ) {
      // 一级菜单的子菜单(二级菜单)
      tempObj.children = transformRoutesArrToFlat(
        route.children,
        breadCrumbTemp,
      )
    }
    if (
      (route.meta!.level as number) > 1 &&
      route.children &&
      route.children.length > 0
    ) {
      // 二级以下的菜单 包括3 4 ...
      // 全都合并到二级菜单数组,最后放入一级菜单的子菜单
      arrFlat = arrFlat.concat(
        transformRoutesArrToFlat(
          route.children,
          breadCrumb.concat(breadCrumbTemp),
        ),
      )
    }

    tempObj.meta!.breadCrumb = breadCrumb.concat(breadCrumbTemp)
    arrFlat.push(tempObj)
  })

  return arrFlat
}
