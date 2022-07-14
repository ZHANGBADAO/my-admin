import type { VNode } from 'vue'
import { RouteRecordRaw, RouteComponent } from 'vue-router'

declare namespace Route {
  // 定义在前端的静态路由
  interface BasicRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    meta: {
      title: string
    }
  }

  // 菜单转换为route,此时route里component值为字符串(组件的路径)
  interface MenuToRouteType {
    path: string
    name: string
    redirect?: string
    // 该路由对应页面的组件路径
    component: string | (() => Promise<RouteComponent>)
    children?: MenuToRouteType[]
    meta: {
      // 组件名称
      componentName: string
      value: string
      title: string
      label: string
      icon: string
      level: number
      isHidden: number
      sortNo: string
      permissions: string
      ignoreAuth: boolean
    }
  }

  // 前端布局菜单所需结构体
  interface MenuDetailType {
    label: string
    key: string
    path: string
    redirect?: string
    isHidden?: number
    icon?: () => VNode
    cpIcon?: string
    level?: number
    value?: string
  }

  interface MenuType extends MenuDetailType {
    children?: MenuDetailType[]
  }
}
