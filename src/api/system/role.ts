import { http } from '@/utils'

export function createRole(data: Api.RoleType) {
  return http.post<Api.RoleType>({ url: '/tenant/role/user/create', data })
}
export function queryRoles() {
  return http.get<Api.RoleType[]>({ url: '/tenant/role/list/all' })
}
export function updateRole(data: Api.RoleType) {
  return http.post<Api.RoleType>({ url: '/tenant/role/user/edit', data })
}
export function queryRelateMember(data: { roleId?: string }) {
  return http.post<Api.UserType[]>({ url: '/tenant/role/user/list', data })
}
export function roleRelateMember(data: { roleId?: string; uidList: string[] }) {
  return http.post<any>({ url: '/tenant/auth/edit/role/user/batch', data })
}
export function deleteRole(data: { roleId?: string }) {
  return http.post<boolean>({ url: '/tenant/role/delete', data })
}
