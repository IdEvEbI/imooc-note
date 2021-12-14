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

## 2. 抓取网页内容

> 目标：新建 `Spider` 类，在构造方法中直接**抓取课程测试的网页内容**。

1. 安装 `superagent` 包及类型依赖：

   ```bash
   yarn add superagent

   yarn add -D @types/superagent
   ```

2. 在 `spider.ts` 中实现基础代码如下：

   ```ts
   class Spider {
     private url = 'http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx'

     constructor() {
       console.log('网络爬虫 - 抓取网络课程')
     }
   }

   const spider = new Spider()
   ```

3. 运行 `yarn dev` 确保程序能够正常执行。

4. 引入 `superagent` 轻量级抓取网页数据的工具包：

   ```ts
   import superagent from 'superagent'
   ```

   > 说明：在 TypeScript 中导入 JavaScript 的工具包，VS Code 会提示安装对应的类型翻译文件。

5. 编写 `startSpider` 启动爬虫方法，并在构造函数中调用：

   ```ts
   /**
    * 启动爬虫抓取数据
    */
   async startSpider() {

   }

   constructor() {
     console.log('网络爬虫 - 抓取网络课程')
     this.startSpider()
   }
   ```

6. 编写 `getRawHtml` 方法抓取网页，并在 `startSpider` 方法中调用：

   ```ts
   /**
    * 从 url 抓取完整的 HTML
    * @returns html
    */
   async getRawHtml() {
     const { text: html } = await superagent.get(this.url)
     return html
   }

   /**
    * 启动爬虫抓取数据
    */
   async startSpider() {
     const html = await this.getRawHtml()
     console.log(html)
   }
   ```

7. 运行 `yarn dev` 确保程序能够正常执行。

## 3. 课程数据提取

> 目标：使用 `cheerio` 从网页中提取**课程数据**。

1. 安装 `cheerio` 包及类型依赖：

   ```bash
   yarn add cheerio

   yarn add -D @types/cheerio
   ```

2. 引入 `cheerio`，jQuery 子集工具包，用于分析网页结构：

   ```ts
   import cheerio from 'cheerio'
   ```

3. 定义**单个课程**和**课程信息**的接口：

   ```ts
   /**
    * 课程
    */
   interface Course {
     title: string,
     count: number
   }

   /**
    * 课程信息
    */
   interface CourseInfo {
     time: number,
     list: Course[]
   }
   ```

4. 准备 `getCourseInfo` 方法，用于提取课程信息，并在 `startSpider` 方法中调用：

   ```ts
   /**
    * 从 html 中提取课程信息
    * @param html
    * @returns 课程信息
    */
   getCourseInfo(html: string): CourseInfo {

   }

   /**
    * 启动爬虫抓取数据
    */
   async startSpider() {
     const html = await this.getRawHtml()
     const result = this.getCourseInfo(html)
     console.log(result)
   }
   ```

5. 实现 `getCourseInfo` 方法，从 `html` 中提取课程信息，装填数据并返回：

   ```ts
   // 记录每次抓取获得到的课程数组
   const list: Course[] = []

   // 解析 html
   const $ = cheerio.load(html)
   Array.from($('.content .course-item'), e => {
     const descs = $(e).find('.course-desc')

     const title = descs.eq(0).text()
     const count = parseInt(
       descs
         .eq(1)
         .text()
         .split('：')[1]
     )

     list.push({ title, count })
   })

   return {
     time: new Date().getTime(),
     list
   }
   ```

6. 运行 `yarn dev` 确保**课程名称**和**学习数量**能够被正确提取并返回。
