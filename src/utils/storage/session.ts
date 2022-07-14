import { encrypt, decrypt } from '@/utils/crypto'

export function setSession(key: string, value: any) {
  const json = encrypt(value)
  window.sessionStorage.setItem(key, json)
}

export function getSession<T>(key: string) {
  const json = window.sessionStorage.getItem(key)
  let data: T | null = null
  if (json) {
    try {
      data = decrypt(json)
    } catch {
      return null
    }
  }
  return data
}

export function removeSession(key: string) {
  window.sessionStorage.removeItem(key)
}

export function clearSession() {
  window.sessionStorage.clear()
}
