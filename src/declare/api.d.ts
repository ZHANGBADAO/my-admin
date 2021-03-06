declare namespace Api {
  interface ResourceDetail {
    id: string
    pid: string
    level: number
    menuName: string
    path: string
    isLink: number
    isHidden: number
    isKeepalive: number
    permission?: string
    component?: string
    icon?: string
    redirectPath?: string
    ignoreAuth?: boolean
  }

  interface Menu {
    id: string
    pid: string
    name: string
    sort: string
    data: ResourceDetail
    children?: Array<Menu>
  }
  interface LoginReq {
    userPhone: string
    password: string
    verifyCode: string
    platform: string
  }
  interface LoginRes {
    user: Auth.UserInfo
    tokenValue: string
    tokenName?: string
  }
  interface ForgetReq {
    userPhone: string
    password: string
    verificationCode: string
  }
  interface Pager {
    pageNum: number
    pageSize: number
  }
  interface RoleType {
    id?: string
    roleName?: string
    deleteFlag?: boolean
    ext?: string
    menuIds?: string[]
  }

  interface UserType {
    id: string
    tenantId: string
    userCode: string
    userName: string
    userPhone: string
    userType: number
    ctime: string
    deleteFlag: number
    utime?: string
    avatar?: string
    roleId?: string
    departmentId?: string
    ext?: string
    bindFlag?: number
  }
}
