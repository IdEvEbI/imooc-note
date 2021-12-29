import * as http from 'http'

/** 获取 POST Data 的异步函数  */
type CookieData = {
  [key: string]: string
}

/**
 * 包装常见请求参数
 * @param req HTTP 请求
 * @returns 请求参数
 */
export const reqQuery = (req: http.IncomingMessage) => {
  const method = req.method || ''
  const url = req.url || ''
  const path = url?.split('?')[0] || ''
  const params = new URLSearchParams(url?.split('?')[1])

  return {
    method,
    url,
    path,
    params
  }
}

/**
 * 获取 Cookie 数据
 * @param req HTTP 请求
 * @returns Cookie 对象
 */
export const reqCookie = (req: http.IncomingMessage) => {
  const cookieStr = req.headers.cookie || ''
  const cookie: CookieData = {}

  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }

    const [key, val] = item.trim().split('=')

    console.log(key, val)

    cookie[key] = val
  })

  return cookie
}
