export function successResult(obj: Record<string, any>) {
  return {
    code: 0,
    data: obj,
    msg: 'success',
  }
}

export interface reqType {
  query: Record<string, any>
  body: Record<string, any>
}
