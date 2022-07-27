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
