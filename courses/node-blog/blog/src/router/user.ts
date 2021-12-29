import * as http from 'http'
import { userLogin } from '../controller/user'
import { successResult, failResult } from '../model/resResult'
// import { postData } from '../utils/postData'
import { reqQuery } from '../utils/requestData'

const handleUserRouter = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { method, path, params } = reqQuery(req)

  // 用户登录
  if (method === 'GET' && path === '/api/user/login') {
    // const data = await postData(req)
    // const { username, password } = data as {username: string, password: string}
    const username = params.get('username') || ''
    const password = params.get('password') || ''

    const result = await userLogin(username, password)

    if (!result) {
      return failResult(undefined, 'login failed')
    }

    res.setHeader('Set-Cookie', `username=${username}; path=/`)
    return successResult(undefined, 'login success')
  }
}

export default handleUserRouter
