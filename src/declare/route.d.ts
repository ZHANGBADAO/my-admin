import { RouteComponent } from 'vue-router'

declare namespace Route {
  // 服务端获取的菜单资源转换为route
  interface MenuToRouteType {
    path: string
    name?: string //路由名称和组件名称一致
    redirect?: { name: string }
    // 该路由对应页面的组件路径
    component?: string | (() => Promise<RouteComponent>)
    children?: MenuToRouteType[]
    meta?: {
      title: string //路由中文
      componentName?: string // 组件名称
      icon?: string
      level?: number //路由层级
      permissions?: string //按钮权限
      ignoreAuth?: boolean //是否忽略权限
      isKeepalive?: number //是否缓存
      isHidden?: number //是否隐藏
      breadCrumb?: BreadCrumbType[] //面包屑导航
    }
  }

  interface BreadCrumbType {
    title: string
    routeName: string
  }

  // 前端布局菜单所需结构体
  interface MenuType {
    label: string
    key: string //值为route的name, 点击菜单用name跳转
    redirect?: { name: string }
    isHidden?: number
    icon?: string
    level?: number
    children?: MenuType[]
  }

  interface tabType {
    title: string
    routeName: string
    icon: string
  }
}
