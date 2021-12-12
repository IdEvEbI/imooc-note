// 1. 布尔类型
let isDone: boolean = true

// 2. 数字类型
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24

// 3. 字符串
let userName: string = 'IdevebI'
let age: number = 18
let welcome: string = `欢迎 ${userName}，今年 ${age}，年少有为啊~~~`
console.log(welcome)

// 4. 数组
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

// 5. 元组
let tuple: [string, number] = ['hello', 16]

console.log(tuple[0].split('').join('-'), tuple[1].toFixed(2))

// 6. 枚举
// 默认情况下，枚举类型从 `0` 开始为元素编号
enum Color { Red, Green, Blue }
let color: Color = Color.Red
console.log(color) // 0

// 手动指定枚举类型中任意成员的数值
enum Gender { Male = 1, Female = 2, Other = 4 }
// 通过枚举的数值可以得到对应的名称字符串
console.log(Gender[2], typeof Gender[2]) // 'Female' 'string'

// 7. any
let notSure: any = 4
notSure = '这是一个字符串'
notSure = false
console.log(notSure)

// 8. void
function sayHi(userName: string): void {
  console.log(`欢迎 ${userName} 开始学习 TypeScript。`)
}
sayHi('IdevebI')

// 9. null & undefined
let u: undefined = undefined
let n: null = null
console.log(u == n) // true
console.log(u === n) // false

// 10. never
function myError(message: string): never {
  throw new Error(message)
}

function infiniteLoop(): never {
  while (true) {
  }
}
