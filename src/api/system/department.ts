import { http } from '@/utils'

export interface Tree {
  name: string
  id: string
  children?: Tree[]
}

export interface DepartmentInfo {
  ctime: string
  id: string
  name: string
  pid: string
  pname: string
  sortNo: number
  state: number
}

export interface UserList {
  total: number
  list: Array<{
    department: string
    id: string
    userName: string
  }>
}

// 获取所有部门
export function departmentFindAll() {
  return http.post<Tree[]>({
    url: '/tenant/department/findAll',
    data: {
      departmentIdlist: [],
      departmentName: '',
    },
  })
}

// 查询子部门
export function findByDepartmentName(data: {
  departmentIdlist: string[]
  departmentName: string
}) {
  return http.post<DepartmentInfo[]>({
    url: '/tenant/department/findByDepartmentName',
    data,
  })
}

// 查询部门关联的员工
export function findUserByDepartmentId(data: {
  departmentIdlist: string[]
  page: number
  size: number
}) {
  return http.post<UserList>({
    url: '/tenant/department/findUserByDepartmentId',
    data,
  })
}

// 批量移除员工
export function removeDepartmentMember(data: {
  departmentId: string
  userIdList: string[]
}) {
  return http.post<any>({
    url: '/tenant/department/userRelationShipRemove',
    data,
  })
}

// 新增部门
export function addDepartmentApi(data: {
  pid: string
  name: string
  id: string
}) {
  return http.post<any>({ url: '/tenant/department/add', data })
}

// 编辑部门
export function editDepartmentApi(data: {
  pid: string
  name: string
  id: string
}) {
  return http.post<any>({ url: '/tenant/department/update', data })
}

// 删除部门
export function deleteDepartment(data: { id: string }) {
  return http.post<any>({ url: '/tenant/department/delete', data })
}

// 切换部门
export function switchDepartment(data: {
  departmentId: string
  userIdList: string[]
}) {
  return http.post<any>({ url: '/tenant/department/userManayBind', data })
}
