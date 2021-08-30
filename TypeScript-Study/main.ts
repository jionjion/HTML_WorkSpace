/*
TypeScript 学习

1.编译当前文件
tsc .\main.ts

2.使用Node执行
node main.js

3.在html中引入编译后生成的js文件
* */

// 变量声明... 禁止使用 var
let hello = "Hello World"
const world = "Hello World"

// 声明变量,适配隐式指定类型
let isUpdate = true;
// 声明变量,并强制指定类型
let isDelete: boolean = true;

// 定义参数为 数字类型
function add(param1: number, param2: number) {
    return param1 + param2;
}

// 数组类型,并指定类型
let listA: number[] = [1, 2, 3, 4]
let listB: Array<number> = [1, 2, 3, 4]
// 数组类型,声明时并初始化,隐式指定类型
let listC = [1, 2, 3, 4]

// 联合类型  (string | number)[]
let listD = [1, "a"]
// 任意类型 any[]
let listE: any[] = [1, "a", true]

// tuple 元组类型 [number, string] , 固定长度和类型.
// 多用于结构化数据,作为记录对象
let tupleA: [number, string] = [1, "a"]


// 联合类型, 可以为字符或者数字
let unionA: String | number
unionA = 1
unionA = "a"

// 定义参数为 数字类型或者字符串类型. 在函数内通过 typeof 进行判断
function merge(param1: number | string, param2: number | string) {
    if (typeof param1 === "string" || typeof param2 === "string")
        return param1.toString() + param2.toString()
    else
        return param1 + param2;
}


// 字面量类型 限定取值类型的值可选范围..
let unionB: 0 | 1 | 2
unionB = 2

function merge2(param1: number | string, param2: number | string, resultType: "as-number" | "as-string") {
    if (resultType === "as-string") {
        return param1.toString() + param2.toString()
    }
    if (typeof param1 === "string" || typeof param2 === "string") {
        return param1.toString() + param2.toString()
    } else {
        return param1 + param2;
    }
}

merge2(1, 2, "as-number")
merge2(1, 2, "as-string")


// 枚举类型
enum ColorA {
    // 枚举值,为定义时的顺序
    red, green, blue
}

enum ColorB {
    // 枚举值,为定义时的顺序
    red = "r", green = "g", blue = "b"
}

let color1 = ColorA.red
console.log(color1) // 输出 0


let color2 = ColorB.blue
console.log(color2) // 输出 b

// Any 类型, 可以指定任意类型,灵活性较高,类型不作检查
let any1: any = 1
any1 = "a"
any1 = true
any1 = {}
// any1.toUpperCase() // 运行时抛出异常, 不能在编译时保证安全

// unknown 类型, 不保证类型,但保证类型安全
let unknown1: unknown = 1
unknown1 = 'a'
unknown1 = true
// unknown1.toUpperCase() // 编译时报错,类型不匹配


// never
// void 返回结果为空
function returnVoid(): void {
    console.log("这是一个返回结果为空的函数")
}

// undefined 变量未定义初始化时,定义为 undefined..
function returnNever(): undefined {
    console.log("这是一个返回结果为空的函数")
    return;
}

// 抛出异常, never 一个函数永远执行不完, 比如抛出异常,死循环
function throwError(message: string, errorCode: number): never {
    throw {
        message,
        errorCode
    }
}

throwError("错误发生", 500)

// 函数定义,定义入参和返回值类型
let log = (message: string): void => {
    console.log(message);
}
log("hello")

// 函数定义,定义缺省入参,默认设置为 undefined
let log2 = (message: string, code ?: number): void => {
    console.log(message + code);
}
log2("hello")

// 函数定义, 可选参数默认值设定为 0
let log3 = (message: string, code: number = 0): void => {
    console.log(message + code);
}
log3("hello")
log3("hello", 10)

// 可选参数和默认参数放在最后
let log4 = (message: string, code: number = 0, code2 ?: number): void => {
    console.log(message + code + code2);
}
