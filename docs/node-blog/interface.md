# 开发博客系统接口

## 1. 开发环境搭建与 HTTP 网络请求

### 1.1 搭建开发环境

1. 新建 `blog` 目录，并初始化 `npm` 包：

   ```bash
   yarn init -y
   ```

2. 安装项目基础依赖包，并创建 `tsconfig.json`：

   ```bash
   yarn add -D typescript ts-node eslint

   yarn add -D @types/node

   yarn add -D nodemon cross-env

   npx tsc --init

   npx eslint --init
   ```

3. 新建 `/bin/www.ts` 并修改 `package.json` 的入口和脚本：

   ```json
   "main": "bin/www.ts",
   "scripts": {
     "dev": "cross-env NODE_ENV=dev nodemon",
     "prd": "cross-env NODE_ENV=production nodemon",
     "lint": "eslint src --ext .js,.ts"
   }
   ```

   > 提示：在实际开发中，可以根据 `process.env.NODE_ENV` 判断系统当前运行的是**开发环境**还是**生产环境**。

4. 新建 `/app.ts` 并编写如下代码：

   ```ts
   import * as http from 'http'

   const serverHandle = (req: http.IncomingMessage, res: http.ServerResponse) => {
     // 设置返回格式 - JSON
     res.setHeader('Content-type', 'application/json')

     // 设置返回数据
     const resData = {
       course: 'Node Blog',
       env: process.env.NODE_ENV
     }

     res.end(JSON.stringify(resData))
   }

   export default serverHandle
   ```

5. 编写 `/bin/www.ts` 代码如下：

   ```ts
   import * as http from 'http'
   import serverHandle from '../app'

   const PORT = 8000
   const server = http.createServer(serverHandle)

   server.listen(PORT, () => {
     console.log(`server is runing on http://localhost:${PORT}`)
   })
   ```

### 1.2 HTTP 网络请求

1. `GET` 请求和**请求参数**：`GET` 请求是客户端**从服务器获取数据**，例如**获取博客列表**或者**获取某一条博客信息**。

   ```ts
   // 请求方法
   const method = req.method
   console.log(method)

   // 请求 URL
   const url = req.url
   console.log(url)

   // 请求参数
   const urlSearchParams = new URLSearchParams(url?.split('?')[1])
   console.log(urlSearchParams.keys())
   ```

   > 提示：`querystring` 将要被废弃，现在推荐使用 `URLSearchParams` 分析请求参数。

2. `POST` 请求和 `postdata`：`POST` 请求是客户端**向服务器传递数据**，例如**新建一篇博客**或者**修改某一篇博客**。

   > 提示：POST 方法通过 `postdata` 传递数据，浏览器无法直接模拟，可以**使用 postman 工具**。

   ```ts
   if (method === 'POST') {
     // 数据格式
     console.log('content-type', req.headers['content-type'])

     // 接收数据
     let postdata = ''
     req.on('data', chunk => {
       postdata += chunk.toString()
     })
     req.on('end', () => {
       console.log(postdata)
       res.end(postdata)
     })
   }
   ```

## 2. 接口开发

### 2.1 接口开发目标

1. **初始化路由**：根据之前技术方案的设计，做出路由
2. **返回假数据**：将路由和数据处理分离，以符合设计原则

### 2.2 初始化路由

1. 新建 `/src/router/user.ts` 和 `/src/router/blog.ts` 分别作为**用户**和**博客**的路由模块；

2. 编写 `/src/router/blog.ts` 的代码如下：

   ```ts
   import * as http from 'http'

   const handleBlogRouter = (req: http.IncomingMessage, res: http.ServerResponse) => {
     const method = req.method
     const url = req.url
     const path = url?.split('?')[0]

     // 获取博客列表
     if (method === 'GET' && path === '/api/blog/list') {
       return {
         msg: '获取博客列表的接口'
       }
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
   ```

3. 编写 `/src/router/user.ts` 的代码如下：

   ```ts
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
   ```

4. 修改 `/app.ts` 的代码如下：

   ```ts
   import * as http from 'http'
   import handleBlogRouter from './src/router/blog'
   import handleUserRouter from './src/router/user'

   const serverHandle = (req: http.IncomingMessage, res: http.ServerResponse) => {
     // 设置返回格式 - JSON
     res.setHeader('Content-type', 'application/json')

     // 处理 blog 路由
     const blogData = handleBlogRouter(req, res)
     if (blogData) {
       res.end(JSON.stringify(blogData))

       return
     }

     // 处理 user 路由
     const userData = handleUserRouter(req, res)
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
   ```

5. 启动程序并使用 Postman 测试接口能够正常访问并返回数据。

### 2.3 封装响应结果处理函数

新建 `/src/model/resResult.ts` 并实现如下代码：

```ts
/** 响应数据 */
type ResponseData = object | undefined | null

/**
 * 响应结果模型
 */
type ResponseModel = {
  data: ResponseData
  message: string
  errno: number
}

/**
 * 响应结果函数类型
 */
type ResponseResult = (data?: ResponseData, message?: string) => ResponseModel

/**
 * 成功响应
 * @param data 响应数据
 * @param message 响应消息
 * @returns 响应结果模型
 */
export const successResult: ResponseResult = (data, message = 'success') => {
  return {
    data,
    message,
    errno: 0
  }
}

/**
 * 失败响应
 * @param data 响应数据
 * @param message 响应消息
 * @returns 响应结果模型
 */
export const failResult: ResponseResult = (data, message = 'failed') => {
  return {
    data,
    message,
    errno: -1
  }
}

```

### 2.4 博客列表路由（返回假数据）

1. 新建 `/src/controller/blog.ts` 并实现如下代码，返回假数据：

   ```ts
   /**
    * 获取博客列表
    * @param author 作者
    * @param keyword 关键字
    * @returns 博客列表
    */
   export const blogList = (author = '', keyword = '') => {
     return [
       {
         id: 1,
         title: '标题 A',
         content: '博客内容 A',
         createtime: 1640031817776,
         author
       },
       {
         id: 2,
         title: '标题 B',
         content: '博客内容B',
         createtime: 1640031817790,
         author
       }
     ]
   }
   ```

2. 修改 `/src/router/blog.ts` 导入**响应结果**和**博客列表**函数：

   ```ts
   import * as http from 'http'
   import { successResult } from '../model/resResult'
   import { blogList } from '../controller/blog'
   ```

3. 修改 `handleBlogRouter` 函数的 url 参数处理：

   ```ts
   const handleBlogRouter = (req: http.IncomingMessage, res: http.ServerResponse) => {
   const method = req.method
   const url = req.url
   const path = url?.split('?')[0]
   const params = new URLSearchParams(url?.split('?')[1])
   ```

4. 修改**获取博客列表**路由处理代码：

   ```ts
   // 获取博客列表
   if (method === 'GET' && path === '/api/blog/list') {
     const author = params.get('author') || ''
     const keyword = params.get('keyword') || ''

     return successResult(blogList(author, keyword))
   }
   ```

5. 在浏览器中访问 <http://localhost:8000/api/blog/list?author=zhangsan&keyword=node> 测试**博客列表路由**正常。

### 2.5 博客详情路由（返回假数据）

1. 在 `/src/controller/blog.ts` 中实现 `blogDetail` 函数返回博客详情的假数据：

   ```ts
   /**
    * 获取博客详情
    * @param id 博客 id
    * @returns 博客内容对象
    */
   export const blogDetail = (id = 1) => {
     return {
       id,
       title: '标题 A',
       content: '博客内容 A',
       createtime: 1640031817776,
       author: 'zhangsan'
     }
   }
   ```

2. 修改 `/src/router/blog.ts` 中的**获取博客详情**路由处理代码：

   ```ts
   // 获取博客详情
   if (method === 'GET' && path === '/api/blog/detail') {
     const id = parseInt(params.get('id') || '1')

     return successResult(blogDetail(id))
   }
   ```

3. 在浏览器中访问 <http://localhost:8000/api/blog/detail?id=100> 测试**博客详情路由**正常。

### 2.6 POST Data 和新建博客路由

1. 新建 `/src/utils/postData.ts`，实现如下代码处理 POST 提交的数据，代码如下：

   ```ts
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
   ```

2. 在 `/src/controller/blog.ts` 中实现 `newBlog` 函数返回**新建博客**的假数据：

   ```ts
   /**
    * 新建一篇博客
    * @param data 博客数据
    * @returns 新建完成的博客数据
    */
   export const newBlog = (data = {}) => {
     return {
       id: 1 + Math.floor(Math.random() * 10),
       createtime: Date.now(),
       ...data
     }
   }
   ```

3. 修改 `/app.ts` 将 `serverHandle` 函数改为 `async` 函数，并使用 `await` 拦截路由函数返回结果：

   ```ts
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

     // ...
   ```

4. 修改 `/src/router/blog.ts` 引入 `newBlog` 和 `postData`，并且把 `handleBlogRouter` 函数修改为 `async` 函数：

   ```ts
   import {
     blogList,
     blogDetail,
     newBlog
   } from '../controller/blog'
   import { postData } from '../utils/postData'

   const handleBlogRouter = async (
     req: http.IncomingMessage,
     res: http.ServerResponse) => {
   ```

5. 修改**新建一篇博客**路由处理代码：

   ```ts
   // 新建一篇博客
   if (method === 'POST' && path === '/api/blog/new') {
     const data = await postData(req)

     return successResult(newBlog(data))
   }
   ```

### 2.7 更新博客 & 删除博客路由

1. 在 `/src/controller/blog.ts` 中实现 `updateBlog` 函数模拟**更新博客**：

   ```ts
   /**
    * 使用博客数据更新指定 id 的博客
    * @param id 博客 id
    * @param data 博客数据
    * @returns 是否更新成功
    */
   export const updateBlog = (id: number, data = {}) => {
     console.log('Update Blog =>', data)

     return true
   }
   ```

2. 实现 `deleteBlog` 函数模拟**删除博客**：

   ```ts
   /**
    * 删除指定 id 的博客
    * @param id 博客 id
    * @returns 是否删除成功
    */
   export const deleteBlog = (id: number) => {
     console.log(`DELETE ${id} 的博客`)

     return true
   }
   ```

3. 修改 `/src/router/blog.ts` 引入 `updateBlog` 和 `deleteBlog`：

   ```ts
   import {
     blogList,
     blogDetail,
     newBlog,
     updateBlog,
     deleteBlog
   } from '../controller/blog'
   ```

4. 修改**更新一篇博客**路由处理代码：

   ```ts
   // 更新一篇博客
   if (method === 'POST' && path === '/api/blog/update') {
     const id = parseInt(params.get('id') || '1')
     const data = await postData(req)

     return updateBlog(id, data)
       ? successResult(undefined, 'update success')
       : failResult(undefined, 'update failed')
   }
   ```

5. 修改**删除一篇博客**路由处理代码：

   ```ts
   if (method === 'POST' && path === '/api/blog/del') {
     const id = parseInt(params.get('id') || '1')

     return deleteBlog(id)
       ? successResult(undefined, 'delete success')
       : failResult(undefined, 'delete failed')
   }
   ```

### 2.8 用户登录路由

1. 新建 `/src/controller/user.ts` 中实现 `userLogin` 函数模拟**用户登录**：

   ```ts
   /**
    * 用户登录
    * @param username 用户名
    * @param password 密码
    * @returns 是否登录成功
    */
   export const userLogin = (username: string, password: string) => {
     return (username === 'zhangsan' && password === '123')
   }
   ```

2. 修改 `/src/router/blog.ts` 引入模块：

   ```ts
   import * as http from 'http'
   import { userLogin } from '../controller/user'
   import { successResult, failResult } from '../model/resResult'
   import { postData } from '../utils/postData'
   ```

3. 将 `handleUserRouter` 修改为 `async` 函数并实现**用户登录**路由处理代码：

   ```ts
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
   ```
