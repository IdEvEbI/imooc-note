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

> 目标：了解 TypeScript 的**编译运行过程**，初步体会 TypeScript **类型注解**的作用。

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

1. 在终端输入以下命令，可以创建 `tsconfig.json`：

   ```bash
   npx tsc --init
   ```

2. 修改 `tsconfig.json` 打开以下一个选项，修改编译结果的输出目录：

   1. `"outDir": "./js"` 会将编译结果输出到 `./js` 目录下。

3. 注意点：

   1. 创建了 `tsconfig.json` 之后，可以使用 `npx tsc` 一次性编译当前目录下的所有 ts 文件；
   2. 如果使用 `npx tsc xx.js` 会对 `xx.js` 单独编译，但是不会应用 `tsconfig.json` 的配置内容。

## 3. 基础类型

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了一些实用的数据类型方便开发中使用，例如：**枚举类型**。

### 3.1 布尔值

TypeScript 中**布尔值**的类型是 `number`，用来保存 `true` 或者 `false`。

```ts
// 布尔类型
let isDone: boolean = true
```

### 3.2 数字

TypeScript 中**数字**的类型是 `number`，是 64 位的双精度浮点数，这与 JavaScript 一致。

除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015中引入的二进制和八进制字面量。

```ts
// 数字类型
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24
```

> 扩展阅读：[关于 Javascript 的 Number 类型，你需要知道的东西](https://genuifx.github.io/2018/04/17/here-is-what-you-need-to-know-about-javasciprt-number-type/)
