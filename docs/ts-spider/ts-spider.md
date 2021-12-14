# 使用 TypeScript 编写爬虫工具

## 1. 项目准备

> 目标：安装好项目必备的依赖包，并测试能够通过 npm 脚本启动项目。

1. 安装 npm 包：

   ```bash
   npm init -y
   ```

2. 安装项目基础依赖包：

   ```bash
   yarn add -D typescript ts-node
   ```

3. 创建 `tsconfig.json`：

   ```bash
   npx tsc --init
   ```

4. 修改 `package.json` 的 `scripts` 如下：

   ```json
   "scripts": {
     "dev": "ts-node ./src/spider.ts"
   },
   ```

5. 新建 `src/spider.ts` 并输入以下代码：

   ```js
   console.log('Hello spider')
   ```

6. 运行 `yarn dev` 可以看到控制台输出 `Hello spider`。

## 2. 项目准备
