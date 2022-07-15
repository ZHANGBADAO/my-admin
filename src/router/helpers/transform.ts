import { Route } from '@/declare/route'

// 路由转换菜单
export function routerToMenu(
  routes: Route.MenuToRouteType[],
): Route.MenuType[] {
  return transformMenuResource(routes)
}

function transformMenuResource(routes: Route.MenuToRouteType[]) {
  return routes.map((item) => {
    const $tmp: Route.MenuType = {
      label: item.meta.title,
      key: item.name,
      path: item.path,
      icon: item.meta.icon,
      redirect: item.redirect,
      isHidden: item.meta.isHidden,
      level: item.meta.level,
      value: item.meta.value,
    }
    if (item.children && item.children.length) {
      $tmp.children = transformMenuResource(item.children)
    }
    return $tmp
  })
}
