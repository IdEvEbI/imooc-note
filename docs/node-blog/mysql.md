# 开发博客系统 MySQL 数据存储

> 有关在 CentOS 的常用工具及 MySQL 安装，请参阅：[CentOS 安装笔记](./centos.md)。

MySQL 数据存储目标：

1. **示例**：用 DEMO 演示，不考虑使用；
2. **封装**：将 MySQL 操作封装为工具库；
3. **应用**：让博客系统直接操作数据库，不再使用假数据。

## 1. 数据库建库和建表

1. 建库 `myblog`

   ```sql
   CREATE SCHEMA `myblog` DEFAULT CHARACTER SET utf8;
   ```

2. 建表 `users`

   ```sql
   CREATE TABLE `users` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `username` varchar(40) NOT NULL,
     `password` varchar(40) NOT NULL,
     `realname` varchar(20) NOT NULL,
     PRIMARY KEY (`id`)
   ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8
   ```

3. 建表 `blogs`：

   ```sql
   CREATE TABLE `blogs` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `title` varchar(100) NOT NULL,
     `content` longtext NOT NULL,
     `createtime` bigint(20) NOT NULL,
     `author` varchar(40) NOT NULL,
     PRIMARY KEY (`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8
   ```

## 2. Node.js 操作 MySQL

1. 新建 `demo-mysql` 目录，并初始化 `npm` 包：

   ```bash
   yarn init -y
   ```

2. 安装项目基础依赖包，并创建 `tsconfig.json`：

   ```bash
   yarn add mysql

   yarn add -D typescript ts-node eslint nodemon

   yarn add -D @types/node @types/mysql

   npx tsc --init

   npx eslint --init
   ```

3. 修改 `package.json` 的入口和脚本：

   ```json
   "main": "index.ts",
   "scripts": {
     "start": "nodemon",
     "lint": "eslint src --ext .js,.ts"
   },
   ```

4. 新建 `/index.ts` 并实现如下代码：

   ```ts
   import * as mysql from 'mysql'

   // 创建连接对象
   const con = mysql.createConnection({
       host: 'centos.local',
       user: 'heima',
       password: '123456',
       port: 3306,
       database: 'myblog'
   })

   // 开始连接
   con.connect()

   // 执行 SQL 语句
   const sql = 'SELECT id, username, password, realname FROM users;'

   con.query(sql, (err, result) => {
       if (err) {
           console.error(err)
           return
       }
       console.log(result)
   })

   // 关闭连接
   con.end()
   ```

5. 运行 `yarn start` 并且尝试修改 SQL，观察控制台的运行结果。

## 2. 封装 MySQL 工具

1. 回到 `blog` 项目，安装 `mysql` 包：

   ```bash
   yarn add mysql

   yarn add -D @types/mysql
   ```

2. 新建 `/src/conf/db.ts` 实现如下代码：

   ```ts
   import * as mysql from 'mysql'

   // 环境参数
   const env = process.env.NODE_ENV

   // 数据库连接配置
   export let MYSQL_CONF: mysql.ConnectionConfig = {}

   if (env === 'dev') {
     MYSQL_CONF = {
       host: 'centos.local',
       user: 'heima',
       password: '123456',
       port: 3306,
       database: 'myblog'
     }
   }

   if (env === 'production') {
     MYSQL_CONF = {
       host: 'centos.local',
       user: 'heima',
       password: '123456',
       port: 3306,
       database: 'myblog'
     }
   }
   ```

3. 新建 `/src/db/mysql.ts` 实现如下代码：

   ```ts
   import * as mysql from 'mysql'
   import { MYSQL_CONF } from '../conf/db'

   // 查询结果
   type QueryResult = (sql: string) => Promise<object>

   // 创建连接对象
   const con = mysql.createConnection(MYSQL_CONF)

   // 开始连接
   con.connect()

   export const exec:QueryResult = (sql: string) => {
     return new Promise((resolve, reject) => {
       con.query(sql, (err, result) => {
         if (err) {
           console.error(err)
           reject(err)
           return
         }
         resolve(result)
       })
     })
   }
   ```

## 3. 对接数据库

### 3.1 博客列表

1. 修改 `/src/controller/blog.ts` 中的 `blogList` 方法，返回一个执行 SQL 的 `Promise`，代码如下：

   ```ts
   import { exec } from '../db/mysql'

   /**
    * 获取博客列表
    * @param author 作者
    * @param keyword 关键字
    * @returns 博客列表
    */
   export const blogList = (author = '', keyword = '') => {
     let sql = `SELECT id, title, content, createtime, author
       FROM blogs WHERE 1 = 1 `

     if (author) {
       sql += `AND author = '${author}' `
     }
     if (keyword) {
       sql += `AND content LIKE '%${keyword}%' `
     }
     sql += 'ORDER BY createtime DESC;'

     return exec(sql)
   }
   ```

2. 修改 `/src/router/blog.ts` 中**获取博客列表**的路由处理代码：

   ```ts
   // 获取博客列表
   if (method === 'GET' && path === '/api/blog/list') {
     const author = params.get('author') || ''
     const keyword = params.get('keyword') || ''

     return successResult(await blogList(author, keyword))
   }
   ```

### 3.2 博客详情

1. 修改 `/src/controller/blog.ts` 中的 `blogDetail` 方法，返回一个执行 SQL 的 `Promise`，代码如下：

   ```ts
   /**
    * 获取博客详情
    * @param id 博客 id
    * @returns 博客内容对象
    */
   export const blogDetail = (id = 0) => {
     const sql = `SELECT id, title, content, createtime, author
     FROM blogs WHERE 1 = 1 AND id = ${id}; `

     return exec(sql).then(rows => (rows as object[])[0])
   }
   ```

2. 修改 `/src/router/blog.ts` 中**获取博客详情**的路由处理代码：

   ```ts
   // 获取博客详情
   if (method === 'GET' && path === '/api/blog/detail') {
     const id = parseInt(params.get('id') || '0')

     return successResult(await blogDetail(id))
   }
   ```

### 3.3 新建博客

1. 在 `/src/controller/blog.ts` 中定义博客数据类型：

   ```ts
   // 博客数据类型
   type BlogData = {
     id?: number,
     title?: string,
     content?: string,
     createTime?: number,
     author?: string
   }
   ```

2. 修改 `newBlog` 方法，返回一个执行 SQL 的 `Promise`，代码如下：

   ```ts
   /**
    * 新建一篇博客
    * @param data 博客数据
    * @returns 新建完成的博客 id
    */
   export const newBlog = (data: BlogData = {}) => {
     const { title, content, author } = data
     const createTime = Date.now()

     const sql = `INSERT INTO blogs (title, content, createtime, author)
       VALUES ('${title}', '${content}', ${createTime}, '${author}');
     `

     return exec(sql).then(insertData => {
       return { id: (insertData as OkPacket).insertId }
     })
   }
   ```

3. 修改 `/src/router/blog.ts` 中**新建一篇博客**的路由处理代码：

   ```ts
   // 新建一篇博客
   if (method === 'POST' && path === '/api/blog/new') {
     const data = await postData(req)

     return successResult(await newBlog(data))
   }
   ```

### 3.4 更新博客

1. 修改 `/src/controller/blog.ts` 中的 `updateBlog` 方法，返回一个执行 SQL 的 `Promise`，代码如下：

   ```ts
   /**
    * 使用博客数据更新指定 id 的博客
    * @param id 博客 id
    * @param data 博客数据
    * @returns 是否更新成功
    */
   export const updateBlog = (id: number, data: BlogData = {}) => {
     const { title, content } = data

     const sql = `UPDATE blogs SET title = '${title}', content = '${content}'
       WHERE id = ${id}; `

     return exec(sql).then(updateData => (updateData as OkPacket).affectedRows > 0)
   }
   ```

2. 修改 `/src/router/blog.ts` 中**更新一篇博客**的路由处理代码：

   ```ts
   // 更新一篇博客
   if (method === 'POST' && path === '/api/blog/update') {
     const id = parseInt(params.get('id') || '1')
     const data = await postData(req)

     return await updateBlog(id, data)
       ? successResult(undefined, 'update success')
       : failResult(undefined, 'update failed')
   }
   ```

### 3.5 删除博客

1. 修改 `/src/controller/blog.ts` 中的 `deleteBlog` 方法，返回一个执行 SQL 的 `Promise`，代码如下：

   ```ts
   /**
    * 删除指定 id 的博客
    * @param id 博客 id
    * @param author 作者
    * @returns 是否删除成功
    */
   export const deleteBlog = (id: number, author: string) => {
     const sql = `DELETE FROM blogs WHERE id = ${id} AND author = '${author}'; `

     return exec(sql).then(updateData => (updateData as OkPacket).affectedRows > 0)
   }
   ```

2. 修改 `/src/router/blog.ts` 中**删除一篇博客**的路由处理代码：

   ```ts
   // 删除一篇博客
   if (method === 'POST' && path === '/api/blog/del') {
     const id = parseInt(params.get('id') || '1')

     // TODO: 作者参数使用的是假数据
     return await deleteBlog(id, 'zhangsan')
       ? successResult(undefined, 'delete success')
       : failResult(undefined, 'delete failed')
   }
   ```

### 3.6 用户登录

1. 修改 `/src/controller/user.ts` 中的 `userLogin` 方法，返回一个执行 SQL 的 `Promise`，代码如下：

   ```ts
   import { exec } from '../db/mysql'

   /**
    * 用户登录
    * @param username 用户名
    * @param password 密码
    * @returns 用户信息记录
    */
   export const userLogin = (username: string, password: string) => {
     const sql = `SELECT username, realname
       FROM users
       WHERE username = '${username}' AND password = '${password}';`

     return exec(sql).then(rows => (rows as object[])[0])
   }
   ```

2. 修改 `/src/router/user.ts` 中**用户登录**的路由处理代码：

   ```ts
   // 用户登录
   if (method === 'POST' && path === '/api/user/login') {
     const data = await postData(req)
     const { username, password } = data as {username: string, password: string}

     const result = await userLogin(username, password)

     return (result)
       ? successResult(undefined, 'login success')
       : failResult(undefined, 'login failed')
   }
   ```
