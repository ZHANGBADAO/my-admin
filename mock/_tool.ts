export function successResult(obj: Record<string, any>) {
  return {
    code: 0,
    data: obj,
    msg: 'success'
  }
}
