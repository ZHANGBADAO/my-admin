import type { VNode } from 'vue'
import { RouteComponent } from 'vue-router'

declare namespace Route {
  // 菜单转换为route
  interface MenuToRouteType {
    path: string
    name: string
    redirect?: string
    // 该路由对应页面的组件路径
    component: string | (() => Promise<RouteComponent>)
    children?: MenuToRouteType[]
    meta: {
      title: string
      // 组件名称
      componentName?: string
      value?: string
      label?: string
      icon?: string
      level?: number
      isHidden?: number
      sortNo?: string
      permissions?: string
      ignoreAuth?: boolean
      breadCrumb?: BreadCrumbType[]
    }
  }

  interface BreadCrumbType {
    title: string
    path: string
  }

  // 前端布局菜单所需结构体
  interface MenuDetailType {
    label: string
    key: string
    path: string
    redirect?: string
    isHidden?: number
    icon?: string
    cpIcon?: string
    level?: number
    value?: string
  }

  interface MenuType extends MenuDetailType {
    children?: MenuDetailType[]
  }
}
