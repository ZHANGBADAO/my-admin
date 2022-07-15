import { EnumContentType } from '@/enum'

// 转换请求数据
export function transformRequestData(requestData: any, contentType: string) {
  let data = requestData
  // form-data类型转换
  if (contentType === EnumContentType.FORM_DATA) {
    data = transformFile(data)
  }
  return data
}

function transformFile(requestData: any) {
  const formData = new FormData()
  Object.keys(requestData).forEach((requestDataKey) => {
    const requestDataValue = requestData[requestDataKey]
    if (Array.isArray(requestDataValue)) {
      if (requestDataValue.length === 0) {
        return
      }
      // key对应的值是一个数组
      if (requestDataValue[0].constructor === File) {
        // 数组中的元素是File类型
        requestDataValue.forEach((item: File) => {
          formData.append(requestDataKey, item)
        })
      }
      if (requestDataValue[0].constructor === Object) {
        // 数组中的元素是Object类型
        requestDataValue.forEach((item: any, idx: number) => {
          for (const itemKey in item) {
            formData.append(
              `${requestDataKey}[${idx}].${itemKey}`,
              item[itemKey],
            )
          }
        })
      }
      if (typeof requestDataValue[0] !== 'object') {
        // 数组中的元素是基础数据类型, 以字符串形式存储
        formData.append(requestDataKey, JSON.stringify(requestDataValue))
      }
    } else {
      formData.append(requestDataKey, requestDataValue)
    }
  })
  return formData
}
