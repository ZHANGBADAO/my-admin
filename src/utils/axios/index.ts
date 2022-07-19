import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from 'axios'
import { transformRequestData } from '@/utils/axios/transform'
import { EnumStorageKey, EnumContentType } from '@/enum'
import { getLocal } from '@/utils'
import { ElMessage } from 'element-plus'

// create an axios instance
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const handleConfig = { ...config }
    // 请求数据类型转换
    if (handleConfig.data) {
      const contentType = handleConfig.headers!['Content-Type'] as string
      handleConfig.data = transformRequestData(handleConfig.data, contentType)
    }

    // 设置token
    // @ts-ignore
    handleConfig.headers[EnumStorageKey.TOKEN] = getLocal(EnumStorageKey.TOKEN)
    return handleConfig
  },
  (axiosError: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(axiosError)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse<responseType>) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { code, msg } = response.data
    if (code !== 0) {
      ElMessage.error(msg)
      console.log('接口出错: ', response.data)
      return Promise.reject(response.data)
    }

    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

//get请求
function httpGet<T>({
  url,
  data,
  headers,
}: getReqType): Promise<responseType<T>> {
  return new Promise((resolve, reject) => {
    instance
      .request<responseType<T>>({
        method: 'GET',
        url,
        params: data || {},
        headers: Object.assign({}, headers || {}),
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

//post请求
function httpPost<T>({
  url,
  data,
  headers,
}: postReqType): Promise<responseType<T>> {
  return new Promise((resolve, reject) => {
    instance
      .request<responseType<T>>({
        method: 'POST',
        url,
        data: data || {},
        headers: Object.assign(
          {
            'Content-Type': EnumContentType.JSON,
          },
          headers || {},
        ),
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

//上传文件
function httpUpload<T>({
  url,
  data,
  headers,
}: postReqType): Promise<responseType<T>> {
  return new Promise((resolve, reject) => {
    instance
      .request<responseType<T>>({
        method: 'POST',
        url,
        data,
        headers: Object.assign(
          {
            'Content-Type': EnumContentType.FORM_DATA,
          },
          headers || {},
        ),
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

interface getReqType {
  url: string
  data?: Record<string, any>
  headers?: AxiosRequestHeaders
}
interface postReqType {
  url: string
  data?: Record<string, any>
  headers?: AxiosRequestHeaders
}
interface responseType<T = any> {
  code: number
  data: T
  msg: string
}

export const http = {
  get: httpGet,
  post: httpPost,
  upload: httpUpload,
}
