import * as http from 'http'

/** 获取 POST Data 的异步函数  */
type PromisePostData = (req: http.IncomingMessage) => Promise<object>

/**
 * 获取 POST Data
 * @param req HTTP 请求
 * @returns Promise<object>
 */
export const postData: PromisePostData = (req: http.IncomingMessage) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let data = ''
    req.on('data', chunk => {
      data += chunk.toString()
    })
    req.on('end', () => {
      if (!data) {
        resolve({})
        return
      }
      resolve(JSON.parse(data))
    })
  })
}
