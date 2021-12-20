import * as http from "http"

const serverHandle = (req: http.IncomingMessage, res: http.ServerResponse) => {
  // 设置返回格式 - JOSN
  res.setHeader('Content-type', 'application/json')

  // 设置返回数据
  const resData = {
    course: 'Node Blog',
    env: process.env.NODE_ENV
  }

  res.end(JSON.stringify(resData))
}

export default serverHandle
