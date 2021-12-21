import * as http from 'http'

import { successResult } from '../model/resResult'
import {
  blogList,
  blogDetail,
  newBlog,
  updateBlog,
  deleteBlog
} from '../controller/blog'
import { postData } from '../utils/postData'

const handleBlogRouter = async (
  req: http.IncomingMessage,
  res: http.ServerResponse) => {
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
    const id = parseInt(params.get('id') || '1')

    return successResult(blogDetail(id))
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const data = await postData(req)

    return successResult(newBlog(data))
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const id = parseInt(params.get('id') || '1')
    const data = await postData(req)
    updateBlog(id, data)

    return successResult(undefined, 'update success')
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const id = parseInt(params.get('id') || '1')
    deleteBlog(id)

    return successResult(undefined, 'delete success')
  }
}

export default handleBlogRouter
