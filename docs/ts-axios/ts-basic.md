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

### 3.4 数组（Array）

TypeScript 中**数组**同样可以保存一组数据，这与 JavaScript 一致。

不过，在 TypeScript 中定义数组时需要**指定保存在数组中数据的数据类型**，在开发中不允许向数组中添加其他类型的数据。

TypeScript 中定义数组有两种方式，推荐使用第一种，代码如下：

```ts
// 数组
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]
```

### 3.5 元组（Tuple）

TypeScript 中**元组类型**允许表示**一个已知元素数量和类型的数组**，各元素的类型不必相同，JavaScript 中只有数组的概念，并且对数组元素的类型没有限制。

与 JavaScript 相同，可以通过**下标**访问元组元素，不过由于在定义元组时，已经指定了每个元素的类型，所以在开发时，智能提示要强大很多。

```ts
// 元组
let tuple: [string, number] = ['hello', 16]

console.log(tuple[0].split('').join('-'), tuple[1].toFixed(2))
```

### 3.6 枚举（enum）

枚举类型 `enum` 是对 JavaScript 标准数据类型的一个补充，像 C++、Java 等其他语言一样，使用枚举类型可以为一组数值赋予更友好的名字，增强代码的可读性，避免在开发时使用魔法数字。

```ts
// 枚举
// 默认情况下，枚举类型从 `0` 开始为元素编号
enum Color { Red, Green, Blue }
let color: Color = Color.Red
console.log(color) // 0
```

默认情况下，枚举类型从 `0` 开始为元素编号，上述代码编译成 JavaScript 之后如下：

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

### 3.7 any

`any` 表示任意，也就是**不确定变量保存数据的类型**，在使用 TypeScript 做新开发时，建议尽量不要使用 `any` 类型，因为**类型检测**本身就是 TypeScript 的一大优势。

但是，如果如果数据是来自**用户输入**或**第三方代码库**，亦或者是**对现有代码改写升级**，`any` 类型就非常有用了。

提示：在 TypeScript 中如果所有的类型都使用 `any` 那基本等同于用 JavaScript 开发了。

```ts
// any
let notSure: any = 4
notSure = '这是一个字符串'
notSure = false
console.log(notSure)
```

### 3.8 void

`void` 表示没有任何类型，当一个函数没有返回值时，可以将其返回值类型设置为：`void`。

```ts
// void
function sayHi(userName: string): void {
  console.log(`欢迎 ${userName} 开始学习 TypeScript。`)
}
sayHi('IdevebI')
```

> 提示：在开发中不会给变量类型声明为 `void`，因为这样只能使用 `undefined` 为该变量赋值。

### 3.9 null 和 undefined

与 JavaScript 一致，`null` 表示空，`undefined` 表示未定义。

如果把 `tsconfig.json` 中的严格模式关闭 `"strict": false,`，可以把 `null` 和 `undefined` 赋值给其他类型的变量，但是在实际开发中不推荐。

```ts
// null & undefined
let u: undefined = undefined
let n: null = null
console.log(u == n) // true
console.log(u === n) // false
```

### 3.10 never

`never` 表示的是永不存在值的类型，应用场景包括：

1. 总是会抛出异常的函数；
2. 无限循环的函数，例如事件循环。

```ts
function myError(message: string): never {
  throw new Error(message)
}

function infiniteLoop(): never {
  while (true) {
  }
}
```

### 3.11 object

`object` 表示非原始类型，也就是除 `number`、`string`、`boolean`、`symbol`、`null` 或 `undefined` 之外的类型。

```ts
// object
function createObj(obj: object): object {
  return obj
}
createObj({ name: 'IdevebI', age: 18 })
```

### 3.12 类型断言

**类型断言**类似于其他语言中的类型转换，但不进行特殊的数据检查和解构，对运行时没有影响，只是在编译阶段起作用。

TypeScript 提供了两种方式的**类型断言**，在开发中推荐使用第一种 `as`，其语义是：**该变量 是一个（as a）string 类型**。

```ts
// 类型断言
let someValue: any = '我是一个没有类型的字符串'

console.log((someValue as string).length)
console.log((<string>someValue).length)
```

## 4. 变量声明
