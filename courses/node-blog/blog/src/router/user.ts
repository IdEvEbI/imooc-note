import * as http from 'http'

const handleUserRouter = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const method = req.method
  const url = req.url
  const path = url?.split('?')[0]

  // 用户登录
  if (method === 'POST' && path === '/api/user/login') {
    return {
      msg: '这是用户登录接口'
    }
  }
}

export default handleUserRouter
