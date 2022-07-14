const { VITE_APP_NAME } = import.meta.env

export function consoleLog(message?: any, ...optionalParams: any[]) {
  console.log(`[${VITE_APP_NAME} log]:${message}`, ...optionalParams)
}

export function consoleWarn(message?: any, ...optionalParams: any[]) {
  console.warn(`[${VITE_APP_NAME} log]:${message}`, ...optionalParams)
}

export function consoleError(message?: any, ...optionalParams: any[]) {
  console.error(`[${VITE_APP_NAME} log]:${message}`, ...optionalParams)
}

export function consoleTable(message?: any, ...optionalParams: any[]) {
  console.table(`[${VITE_APP_NAME} log]:${message}`, ...optionalParams)
}

export function consoleInfo(message?: any, ...optionalParams: any[]) {
  console.info(`[${VITE_APP_NAME} log]:${message}`, ...optionalParams)
}
