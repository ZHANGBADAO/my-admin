import { http } from '@/utils'

export function fetchLogin(data: Api.LoginReq) {
  return http.post<Api.LoginRes>({
    url: '/user/login',
    data,
  })
}

export function fetchUserRoutes() {
  return http.get<Api.Menu>({
    url: '/user/getUserMenu',
  })
}

export function fetchForget(data: Api.ForgetReq) {
  return http.post<boolean>({ url: '/tenant/forgetPasswordUpdate', data })
}

export function fetchVerifyCode() {
  return http.get<string>({ url: '/tenant/user/getVerifyCodeImg' })
}

// 查询用户列表数据
export function fetchUsers(data: SearchUserType) {
  return http.post<UserResType>({ url: '/tenant/findByPage', data })
}

// 查询单个用户
export function fetchUser(id: string) {
  return http.get<Api.UserType>({ url: `/tenant/getUser?id=${id}` })
}

// 修改用户信息
export function fetchModifyUser(data: UserReq) {
  return http.post<boolean>({ url: '/tenant/updateUser', data })
}

// 删除用户
export function fetchDeleteUser(data: { tenantId: string }) {
  return http.post<boolean>({ url: '/tenant/deleteUser', data })
}

// 新增用户
export function fetchAddUser(data: UserReq) {
  return http.post<boolean>({ url: '/tenant/createUser', data })
}

// 修改密码
export function updatePassword(data: {
  password: string
  resoucePassword: string
  userPhone: string
}) {
  return http.post<any>({ url: '/tenant/updatePassword', data })
}
// 重置密码
export function resetPassword(data: {
  password: string
  userPhone: string
  verificationCode: string
}) {
  return http.post<any>({ url: '/tenant/forgetPasswordUpdate', data })
}
// 获取所有租户列表
export function fetchUserListAll() {
  return http.get<TenantType[]>({ url: '/tenant/findAll' })
}

// 忘记密码发送验证码
export function sendVerifyCode(data: { userPhone: string }) {
  return http.post<any>({ url: '/tenant/ForgetPasswordSendMessage', data })
}

interface SearchUserType extends Api.Pager {
  userName: string
}

interface UserResType {
  list: Api.UserType[]
  total: number
}

interface UserReq {
  userName: string
  userPhone?: string
  roleId?: string
  departmentId?: string
  id?: string
}

interface TenantType {
  userPhone: string
  userName: string
}
