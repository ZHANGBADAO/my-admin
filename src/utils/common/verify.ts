import { ElMessage } from 'element-plus'

export function checkImage(
  file: File,
  size = 4,
  extensions = 'jpg|jpeg|png|gif',
) {
  if (!new RegExp(`.(${extensions})$`, 'i').test(file.name)) {
    ElMessage.error(`上传图片只能是 ${extensions.split('|').join(',')} 格式!`)
    return false
  }
  const isLt2M = (file.size as number) / 1024 / 1024 < size
  if (!isLt2M) {
    ElMessage.error(`上传图片大小不能超过 ${size}MB!`)
    return false
  }
  return true
}
export function checkVideo(file: File) {
  if (!/\.(mp4)$/i.test(file.name)) {
    ElMessage.error('上传视频只能是 mp4 格式!')
    return false
  }
  const isLt2M = (file.size as number) / 1024 / 1024 < 15
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 15MB!')
    return false
  }
  return true
}

export function checkPhone(phone: string): boolean {
  return /^1([0-9]){10}$/.test(phone)
}

export function checkTelephone(tel: string): boolean {
  return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(tel)
}
