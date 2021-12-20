# 开发博客系统接口

## 1. 开发环境搭建与 HTTP 网络请求

### 1.1 搭建开发环境

1. 新建 `blog` 目录，并初始化 `npm` 包：

   ```bash
   npm init -y
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
    * @param _author 作者
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

1. 在 `/src/controller/blog.ts` 中实现如下代码，返回博客详情的假数据：

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
