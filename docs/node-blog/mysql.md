# 开发博客系统 MySQL 数据存储

> 有关在 CentOS 的常用工具及 MySQL 安装，请参阅：[CentOS 安装笔记](./centos.md)。

MySQL 数据存储目标：

1. **示例**：用 DEMO 演示，不考虑使用；
2. **封装**：将 MySQL 操作封装为工具库；
3. **应用**：让博客系统直接操作数据库，不再使用假数据。

## 1. Node.js 操作 MySQL

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
