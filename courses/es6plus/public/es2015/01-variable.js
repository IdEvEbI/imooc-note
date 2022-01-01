/**
 * 定义变量时，如果没有使用 `var`，例如：`gTmp = 10`，
 * 相当于在 `window` 全局对象上定义了一个**属性 `gTmp`**
 * 开发中强烈不推荐。
 */
console.log('-'.repeat(10), '全局属性不推荐', '-'.repeat(10))
gTmp = 100
console.log(gTmp)
console.log(window.gTmp)

/**
 * 使用 var 定义的变量，会在当前作用域有效
 */
console.log('-'.repeat(10), '全局作用域 & 函数作用域', '-'.repeat(10))
// 1. 全局作用域变量 a
var a = 5

console.log(a)

// 2. 函数作用域变量 b
function fn() {
  var b = 10

  console.log(b)
}
fn()

// 以下代码报错：Uncaught ReferenceError: b is not defined
// console.log(b)

/**
 * 使用 let 定义的变量不允许重复定义，但是 var 可以
 */
console.log('-'.repeat(10), '重复定义', '-'.repeat(10))

var rV1 = 10
var rV1 = 20
console.log(rV1)

let rV2 = 10
// 以下代码报错：Identifier 'rV2' has already been declared.
// let rV2 = 20

/**
 * 使用 let 定义的变量不存在变量提升问题
 */
console.log('-'.repeat(10), '变量提升', '-'.repeat(10))

console.log(uV1)
var uV1 = 100

// 等价代码
// var uV1
// console.log(uV1)
// uV1 = 100

// 以下代码报错：Cannot access 'uV2' before initialization
// console.log(uV2)
const uV2 = 100

/**
 * 使用 let 定义的变量需要注意暂时性死区
 */
console.log('-'.repeat(10), '暂时性死区', '-'.repeat(10))

var tdzA = 6
if (true) {
  // 以下代码报错：Cannot access 'tdzA' before initialization
  // console.log(tdzA)
  let tdzA = 10
}

// 函数传参的死区陷阱，先执行 x = y，此时 y 还没有被赋值，因此执行函数时会报错
function bar(x = y, y = 2) {
  return [x, y]
}
// 执行函数报错：Cannot access 'y' before initialization
// bar()

/**
 * 块级作用域
 */
console.log('-'.repeat(10), '块级作用域', '-'.repeat(10))

// for (let i = 0; i < 3; i++) {
//   console.log('循环内', i)
// }
// 以下代码报错：i is not defined
// console.log('循环外', i)

// var + 定时器问题
// 以下代码输出 3 个 3
// for (var i = 0; i < 3; i++) {
//   setTimeout(function () {
//     console.log(i)
//   })
// }

for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i)
  })
}