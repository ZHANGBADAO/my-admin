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
    // 路由name: 用path动态拼接生成如 dashboard_workplace
    let routeName = ''
    if (parent && parent.path) {
      routePath = item.data.path
      routeName = `${parent.name}_${item.data.path}`
    } else {
      routePath = `/${item.data.path}`
      routeName = item.data.path
    }

    const currentRouter: Route.MenuToRouteType = {
      path: routePath,
      name: routeName,
      // 该路由对应页面的组件路径
      component: item.data.component!,
      meta: {
        // 组件名称
        componentName: routeName,
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
      // redirectPath的值是route的name, 不是path; 用路由的name进行跳转(由于把多级路由转为二级,拼接path就不适用了)
      if (item.data.redirectPath) {
        currentRouter.redirect = {
          name: item.data.redirectPath,
        }
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
      // 二级及以下的菜单 有子菜单,只需把子菜单放入arrFlat, 本身不需要放入;
      // 保证路由表中只有 一级菜单(用来打开layout页面) 和 菜单树中最深层的页面
      return
    }

    tempObj.meta!.breadCrumb = breadCrumb.concat(breadCrumbTemp)
    arrFlat.push(tempObj)
  })

  return arrFlat
}
