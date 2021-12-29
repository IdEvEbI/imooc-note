# 用户登录

用户登录目标：

1. **核心**：登录校验 & 登录信息存储；
2. 只讲登录，不讲注册。

用户登录内容：

1. cookie 和 session
2. session 写入 redis
3. 开发登录功能和前端联调（用到 nginx 反向代理）

## 1. cookie

Cookie 是实现用户登录的必要条件。

### 1.1 Cookie 的概念

1. 存储在浏览器的一段字符串（最大 5kb）；
2. 跨域不共享；
3. 可以存储结构化数据，格式如：`k1=v1;k2=v2;k3=v3;`；
4. 每次发送 http 请求，会将**请求域的 cookie** 一起发送给服务器；
5. server 可以修改 cookie 并返回给浏览器；
6. 浏览器中也可以通过 JavaScript 修改 cookie（有限制）。

### 1.2 JavaScript 操作 Cookie

1. 客户端查看 cookie 的方式

   1. Chrome 调试控制台 `Network` -> `Headers`；
   2. Chrome 调试控制台 `Application` -> `Storage` -> `Cookies`。

2. JavaScript 查看和追加 Cookie

   1. **查看**：Chrome 调试控制台 `Console` -> `document.cookie`；
   2. **追加**：`document.cookie = 'k1=v1;'` 可以追加 cookie（极少用）。

### 1.3 Cookie 用于登录验证

1. 新建 `/src/utils/requestData.ts` 实现以下代码，封装**请求查询参数**及 **Cookie 数据**：

   ```ts
   import * as http from 'http'

   /** 获取 POST Data 的异步函数  */
   type CookieData = {
     [key: string]: string
   }

   /**
    * 包装常见请求参数
    * @param req HTTP 请求
    * @returns 请求参数
    */
   export const reqQuery = (req: http.IncomingMessage) => {
     const method = req.method || ''
     const url = req.url || ''
     const path = url?.split('?')[0] || ''
     const params = new URLSearchParams(url?.split('?')[1])

     return {
       method,
       url,
       path,
       params
     }
   }

   /**
    * 获取 Cookie 数据
    * @param req HTTP 请求
    * @returns Cookie 对象
    */
   export const reqCookie = (req: http.IncomingMessage) => {
     const cookieStr = req.headers.cookie || ''
     const cookie: CookieData = {}

     cookieStr.split(';').forEach(item => {
       if (!item) {
         return
       }

       const [key, val] = item.trim().split('=')
       cookie[key] = val
     })

     return cookie
   }
   ```

2. 修改 `/src/router/user.ts`，先改用 `GET` 方式处理请求，并通过后端代码来设置 Cookie：

   ```ts
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

       // 设置 Cookie 及有效路径
       res.setHeader('Set-Cookie', `username=${username}; path=/`)
       return successResult(undefined, 'login success')
     }
   }
   ```

### 1.4 服务端限制客户端

#### 仅允许服务端修改 Cookie

在已经完成的代码中，客户端可以通过 `document.cookie = 'username=lisi;'` 伪造登录 Cookie，这样存在安全隐患。修改 `res.setHeader` 增加 `httpOnly` 设置，限制只允许通过后端来修改 Cookie，代码如下：

```ts
res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly`)
```

> 提示：后端增加了 `httpOnly` 设置后，客户端再向服务器发送 Cookie 时，后端设置的 Cookie 会在后面，从而在解析时会覆盖掉用户在浏览器设置的 Cookie。

#### 设置 Cookie 过期时间

1. 在 `/src/router/user.ts` 中增加 `cookieExpires` 函数用于获取 Cookie 的过期时间，代码如下：

   ```ts
   /**
    * Cookie 过期时间
    */
   const cookieExpires = () => {
     const d = new Date()

     d.setTime(d.getTime() + 24 * 60 * 60 * 1000)

     return d.toUTCString()
   }
   ```

2. 修改 `res.setHeader` 增加 `expires` 设置，限制 Cookie 的**过期时间为一天**，代码如下：

   ```ts
   res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${cookieExpires()}`)
   ```
