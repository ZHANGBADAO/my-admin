import CryptoJS from 'crypto-js'

const { VITE_APP_NAME } = import.meta.env

export function encrypt(data: any): string {
  const $data = JSON.stringify(data)
  return CryptoJS.AES.encrypt($data, VITE_APP_NAME).toString()
}

export function decrypt(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, VITE_APP_NAME)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  if (originalText) {
    return JSON.parse(originalText)
  }
  return null
}
