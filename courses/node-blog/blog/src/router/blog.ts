import * as http from 'http'
import { successResult, failResult } from '../model/resResult'
import { blogList } from '../controller/blog'

const handleBlogRouter = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const method = req.method
  const url = req.url
  const path = url?.split('?')[0]
  const params = new URLSearchParams(url?.split('?')[1])

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = params.get('author') || ''
    const keyword = params.get('keyword') || ''

    return successResult(blogList(author, keyword))
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: '获取博客详情的接口'
    }
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '这是新建博客的接口'
    }
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: '这是更新博客的接口'
    }
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    return {
      msg: '这是删除博客的接口'
    }
  }
}

export default handleBlogRouter
