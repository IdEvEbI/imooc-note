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

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了一些实用的数据类型方便开发中使用，例如：**枚举**。

### 3.1 布尔值（boolean）

TypeScript 中**布尔值**的类型是 `number`，用来保存 `true` 或者 `false`，这与 JavaScript 一致。

```ts
// 布尔类型
let isDone: boolean = true
```

### 3.2 数字（number）

TypeScript 中**数字**的类型是 `number`，是 64 位的双精度浮点数，这与 JavaScript 一致。

除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015中引入的二进制和八进制字面量。

```ts
// 数字类型
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24
```

> 扩展阅读：[关于 Javascript 的 Number 类型，你需要知道的东西](https://genuifx.github.io/2018/04/17/here-is-what-you-need-to-know-about-javasciprt-number-type/)。

### 3.3 字符串（string）

TypeScript 中**字符串**的类型是 `string`，这与 JavaScript 一致。

- **普通字符串**使用双引号（`"`）或单引号（`'`）包裹，开发中习惯使用单引号；
- **模板字符串**使用反引号包裹（ `\``）。

```ts
// 字符串
let userName: string = 'IdevebI'
let age: number = 18
let welcome: string = `欢迎 ${userName}，今年 ${age}，年少有为啊~~~`
console.log(welcome)
```

### 4. 数组（Array）

TypeScript 中**数组**同样可以保存一组数据，这与 JavaScript 一致。

不过，在 TypeScript 中定义数组时需要**指定保存在数组中数据的数据类型**，在开发中不允许向数组中添加其他类型的数据。

TypeScript 中定义数组有两种方式，推荐使用第一种，代码如下：

```ts
// 数组
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]
```

### 5. 元组（Tuple）

TypeScript 中**元组类型**允许表示**一个已知元素数量和类型的数组**，各元素的类型不必相同，JavaScript 中只有数组的概念，并且对数组元素的类型没有限制。

与 JavaScript 相同，可以通过**下标**访问元组元素，不过由于在定义元组时，已经指定了每个元素的类型，所以在开发时，智能提示要强大很多。

```ts
// 元组
let tuple: [string, number] = ['hello', 16]

console.log(tuple[0].split('').join('-'), tuple[1].toFixed(2))
```

### 6. 枚举（enum）

枚举类型 `enum` 是对 JavaScript 标准数据类型的一个补充，像 C++、Java 等其他语言一样，使用枚举类型可以为一组数值赋予更友好的名字，增强代码的可读性，避免在开发时使用魔法数字。

```ts
// 默认情况下，枚举类型从 `0` 开始为元素编号
enum Color { Red, Green, Blue }
let color: Color = Color.Red
console.log(color) // 0
```

默认情况下，枚举类型从 `0` 开始为元素编号，上述代码编译成 JavaScript 之后的代码如下：

```js
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let color = Color.Red;
console.log(color);
```

在开发时，可以手动指定枚举类型中任意成员的数值，同时还可以通过枚举的数值可以得到对应的名称字符串，代码如下：

```ts
enum Gender { Male = 1, Female = 2, Other = 4 }
console.log(Gender[2], typeof Gender[2]) // 'Female' 'string'
```
