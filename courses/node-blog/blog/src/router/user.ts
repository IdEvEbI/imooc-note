import * as http from 'http'
import { userLogin } from '../controller/user'
import { successResult, failResult } from '../model/resResult'
// import { postData } from '../utils/postData'
import { reqQuery } from '../utils/requestData'
import { reqCookie } from '../utils/cookie'

/**
 * Cookie 过期时间
 */
const cookieExpires = () => {
  const d = new Date()

  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)

  return d.toUTCString()
}

const handleUserRouter = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { method, path, params } = reqQuery(req)

  // 用户登录
  if (method === 'GET' && path === '/api/user/login') {
    // const data = await postData(req)
    // const { username, password } = data as {username: string, password: string}
    const username = params.get('username') || ''
    const password = params.get('password') || ''

    console.log('Cookie 数据', reqCookie(req))

    const result = await userLogin(username, password)

    if (!result) {
      return failResult(undefined, 'login failed')
    }

    res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${cookieExpires()}`)
    return successResult(undefined, 'login success')
  }
}

export default handleUserRouter
