import { http } from '@/utils'

export function fetchUserRoutes() {
  return http.get<Api.Menu>({ url: '/tenant/menu/list/auth' })
}
