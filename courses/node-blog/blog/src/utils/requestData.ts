import * as http from 'http'

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
