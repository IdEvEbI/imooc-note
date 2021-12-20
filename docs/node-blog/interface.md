# 开发博客系统接口

## 1. 开发环境搭建

1. 新建 `blog` 目录，并初始化 `npm` 包：

   ```bash
   npm init -y
   ```

2. 安装项目基础依赖包，并：创建 `tsconfig.json`：

   ```bash
   yarn add -D typescript ts-node

   yarn add -D @types/node

   yarn add -D nodemon cross-env
   
   npx tsc --init
   ```

3. 新建 `/bin/www.ts` 并修改 `package.json` 的入口和脚本：

   ```json
   "main": "bin/www.ts",
   "scripts": {
     "dev": "cross-env NODE_ENV=dev nodemon",
     "prd": "cross-env NODE_ENV=production nodemon"
   }
   ```

   > 提示：在实际开发中，可以根据 `process.env.NODE_ENV` 判断系统当前运行的是**开发环境**还是**生产环境**。

4. 新建 `/app.ts` 并编写如下代码：

   ```ts
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
