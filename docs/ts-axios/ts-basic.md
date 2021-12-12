# TypeScript 基础

## 1. 环境准备

在终端输入以下命令，初始化 npm 包，并安装 TypeScript：

```bash
# 初始化 npm 包
npm init -y

# 安装 TypeScript
yarn add typescript -D

# 测试安装成功
npx tsc -v
```

## 2. 快速体验

> 目标：了解 TypeScript 的**编译运行过程**，对 TypeScript **类型注解**的作用有一个基本认识。

### 2.1 编译及运行

**注意**：ts 文件必须要经过编译之后才能被执行，执行的是编译后的 JavaScript 文件。

1. 新建 `ch-01-hello.ts` 编写以下 JavaScript 代码：

   ```ts
   function sayHello(person) {
     return 'Hello, ' + person
   }

   let user = 'IdevebI'

   console.log(sayHello(user))
   ```

2. 在控制台编译并执行：

   ```bash
   # 使用 tsc 编译，默认会在当前目录生成一个同名的 js 文件
   npx tsc ch-01-hello.ts

   # 运行 js 文件
   node ch-01-hello.js
   ```

### 2.2 类型注解

**类型注解**是一种轻量级的为函数或变量添加约束的方式，最直观的作用是**在开发时有更好的智能提示**，同时还能**帮助检测参数类型是否合法**。

修改代码如下：

```ts
function sayHello(person: string) {
  return 'Hello, ' + person
}

let user = 'IdevebI'

console.log(sayHello(user))
```

> 提示：修改后 `sayHello` 函数要求传递一个 `string` 类型的参数，如果传递的参数类型不符合，开发和编译时都会报错并且有明确的错误提示信息，方便程序员及时发现并修改错误。

### 2.3 tsconfig.json

1. 在终端输入以下命令，创建 `tsconfig.json`：

   ```bash
   npx tsc --init
   ```

2. 修改 `tsconfig.json` 打开以下两个选项：
   1. `"outDir": "./js"` 会将编译结果输出到 `./js` 目录下；
   2. `"removeComments": true` 编译过程中会删除代码中的注释。

3. 注意点
   1. 创建了 `tsconfig.json` 之后，可以使用 `npx tsc` 一次性编译当前目录下的所有 ts 文件；
   2. 如果使用 `npx tsc xx.js` 会对 `xx.js` 单独编译，但是不会应用 `tsconfig.json` 的配置内容。
