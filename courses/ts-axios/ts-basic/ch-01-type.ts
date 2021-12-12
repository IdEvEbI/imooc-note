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
let tuple: [string, number]
tuple = ['hello', 16]

console.log(tuple[0].split('').join('-'), tuple[1].toFixed(2))
