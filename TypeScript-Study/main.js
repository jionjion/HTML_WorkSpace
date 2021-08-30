/*
TypeScript 学习

1.编译当前文件
tsc .\main.ts

2.使用Node执行
node main.js

3.在html中引入编译后生成的js文件
* */
// 变量声明... 禁止使用 var
var hello = "Hello World";
var world = "Hello World";
// 声明变量,适配隐式指定类型
var isUpdate = true;
// 声明变量,并强制指定类型
var isDelete = true;
// 定义参数为 数字类型
function add(param1, param2) {
    return param1 + param2;
}
// 数组类型,并指定类型
var listA = [1, 2, 3, 4];
var listB = [1, 2, 3, 4];
// 数组类型,声明时并初始化,隐式指定类型
var listC = [1, 2, 3, 4];
// 联合类型  (string | number)[]
var listD = [1, "a"];
// 任意类型 any[]
var listE = [1, "a", true];
// tuple 元组类型 [number, string] , 固定长度和类型.
// 多用于结构化数据,作为记录对象
var tupleA = [1, "a"];
// 联合类型, 可以为字符或者数字
var unionA;
unionA = 1;
unionA = "a";
// 定义参数为 数字类型或者字符串类型. 在函数内通过 typeof 进行判断
function merge(param1, param2) {
    if (typeof param1 === "string" || typeof param2 === "string")
        return param1.toString() + param2.toString();
    else
        return param1 + param2;
}
// 字面量类型 限定取值类型的值可选范围..
var unionB;
unionB = 2;
function merge2(param1, param2, resultType) {
    if (resultType === "as-string") {
        return param1.toString() + param2.toString();
    }
    if (typeof param1 === "string" || typeof param2 === "string") {
        return param1.toString() + param2.toString();
    }
    else {
        return param1 + param2;
    }
}
merge2(1, 2, "as-number");
merge2(1, 2, "as-string");
// 枚举类型
var ColorA;
(function (ColorA) {
    // 枚举值,为定义时的顺序
    ColorA[ColorA["red"] = 0] = "red";
    ColorA[ColorA["green"] = 1] = "green";
    ColorA[ColorA["blue"] = 2] = "blue";
})(ColorA || (ColorA = {}));
var ColorB;
(function (ColorB) {
    // 枚举值,为定义时的顺序
    ColorB["red"] = "r";
    ColorB["green"] = "g";
    ColorB["blue"] = "b";
})(ColorB || (ColorB = {}));
var color1 = ColorA.red;
console.log(color1);
var color2 = ColorB.blue;
console.log(color2);
