# 环境安装

> 目标：搭建好课程开发环境，不必为部分浏览器不支持 ES6+ 的语法而困扰，把精力聚焦在 ES6 语法学习上。

## 1. 基础环境准备

1. 安装软件 [VS Code](https://code.visualstudio.com/) 和 [Node.js](https://nodejs.org/)；
2. 新建 `es6plus` 目录；
3. 初始化工程：

   ```bash
   # 创建 npm 包
   yarn init -y

   # 安装 TypeScript
   yarn add -D typescript

   # 创建 TypeScript 编译配置项 tsconfig.json
   npx tsc --init
   ```

4. 新建 `src/index.js` 并实现如下代码：

   ```ts
   console.log('Hello ECMAScript')
   ```

5. 新建模板文件 `/src/tpl/index.html`：

   ```html
   <!DOCTYPE html>
   <html lang="en">

   <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Hello ECMAScript</title>
   </head>

   <body>
     <h1>Hello ECMAScript</h1>
   </body>

   </html>
   ```

## 2. webpack 构建工具

1. 安装 `webpack`、`webpack-cli`、`webpack-dev-server`

   ```bash
   yarn add -D webpack webpack-cli webpack-dev-server
   ```

### 2.1 公共环境配置

1. 安装 `html-webpack-plugin` 和 `babel`：

   ```bash
   yarn add -D html-webpack-plugin

   yarn add -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime
   ```

2. 新建 `./build/webpack.base.config.js` **公共环境配置**：

   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin')

   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'index.js'
     },
     module: {
       rules: [{
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
           loader: 'babel-loader',
           options: {
             presets: [
               ['@babel/preset-env', {
                 'useBuiltIns': 'entry'
               }]
             ],
             plugins: ['@babel/plugin-transform-runtime']
           }
         }
       }]
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/tpl/index.html'
       }),
     ],
   }
   ```

### 2.2 开发环境和生产环境配置

1. 新建 `./build/webpack.dev.config.js` **开发环境配置**：

   ```js
   module.exports = {
     devtool: 'eval-cheap-module-source-map'
   }
   ```

2. 安装 `clean-webpack-plugin`：

   ```bash
   yarn add -D clean-webpack-plugin
   ```

   - 每次成功构建前，清空 dist 目录，避免多次构建生成无用的带哈希的文件。

3. 新建 `./build/webpack.pro.config.js` **生产环境配置**：

   ```js
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')

   module.exports = {
     plugins: [
       new CleanWebpackPlugin()
     ]
   }
   ```

### 2.3 配置入口

1. 安装 `webpack-merge`：

   ```bash
   yarn add -D webpack-merge
   ```

   - 可以合并配置文件

2. 新建 `./build/webpack.config.js` **配置文件入口**：

   ```js
   const { merge } = require('webpack-merge')

   const baseConfig = require('./webpack.base.config')
   const devConfig = require('./webpack.dev.config')
   const proConfig = require('./webpack.pro.config')

   module.exports = (_, argv) => {
     const config = argv.mode === 'development' ? devConfig : proConfig

     return merge(baseConfig, config)
   }
   ```

### 2.4 修改 package.json

1. 修改包入口：

   ```json
   "main": "/src/index.js"
   ```

2. 设置**开发和生产脚本**：

   ```json
   "scripts": {
     "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
     "build": "webpack --mode=production --config ./build/webpack.config.js"
   }
   ```

3. 使用 `yarn start` 并访问 `http://localhost:8080/` 测试启动开发环境；
4. 使用 `yarn build` 确认能够在 `./dist` 目录下生成打包结果。
