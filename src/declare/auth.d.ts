declare namespace Auth {
  interface UserInfo {
    id: string
    platformId: string
    platformName: string
    tenantId: string
    userName: string
    userPhone: string
    userType: number
    utime?: string
    avatar?: string
    ctime?: string
    deleteFlag?: boolean
    ext?: string
    userCode?: string
    password?: string
  }

  interface User {
    userInfo: UserInfo
    token: string
  }
}
