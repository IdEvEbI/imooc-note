import * as http from 'http'
import handleBlogRouter from './src/router/blog'
import handleUserRouter from './src/router/user'

const serverHandle = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  // 设置返回格式 - JSON
  res.setHeader('Content-type', 'application/json')

  // 处理 blog 路由
  const blogData = await handleBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))

    return
  }

  // 处理 user 路由
  const userData = await handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))

    return
  }

  // 未命中路由返回 404
  res.writeHead(404, { 'Content-type': 'text/plain' })
  res.write('404 Not Found')
  res.end()
}

export default serverHandle
