import { decrypt, encrypt } from '@/utils/crypto'

interface StorageType {
  value: any
  expire: number | null
}

// 默认缓存为7天
const DEFAULT_CACHE_DAY = 7

export function setLocal(
  key: string,
  value: any,
  expire: number | null = DEFAULT_CACHE_DAY,
) {
  const storageData: StorageType = {
    value,
    expire:
      expire !== null ? new Date().getTime() + calculateExpire(expire) : null,
  }
  const json = encrypt(storageData)
  window.localStorage.setItem(key, json)
}

export function getLocal<T>(key: string) {
  const json = window.localStorage.getItem(key)
  if (json) {
    let storageData: StorageType
    try {
      storageData = decrypt(json)
    } catch {
      return null
    }

    const { value, expire } = storageData
    if (expire === null || expire > Date.now()) {
      return value as T
    }
    removeLocal(key)
    return null
  }
  return null
}

export function removeLocal(key: string) {
  window.localStorage.removeItem(key)
}

export function clearLocal() {
  window.localStorage.clear()
}

function calculateExpire(days: number): number {
  return 60 * 60 * 24 * days * 1000
}
