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

     const result = await blogList(author, keyword)
     return successResult(result)
   }
   ```
