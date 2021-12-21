import * as http from 'http'
import { userLogin } from '../controller/user'
import { successResult, failResult } from '../model/resResult'
import { postData } from '../utils/postData'

const handleUserRouter = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const method = req.method
  const url = req.url
  const path = url?.split('?')[0]

  // 用户登录
  if (method === 'POST' && path === '/api/user/login') {
    const data = await postData(req)
    const { username, password } = data as {username: string, password: string}

    return userLogin(username, password)
      ? successResult(undefined, 'login success')
      : failResult(undefined, 'login failed')
  }
}

export default handleUserRouter
