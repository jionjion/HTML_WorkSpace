// 对象类型, 使用键值对构建, 且内部成员属性不允许任意访问
const person = {
    name: "Jion",
    address: "ShangHai"
}

console.log(person)
console.log(person.name)
// console.log(person.age) // 不能访问未定义的属性


// 定义类型及其对象.默认定义的对象就是自己本身类型
const user: {
    name: string,
    address: string,
    age: number
} = {
    name: "Jion",
    address: "ShangHai",
    age: 18
}
console.log(user.name)
console.log(user.address)
// console.log(user.phone) // 不能访问未定义的属性


// 接口
// 定义一个函数,输出x,y
let drawPoint = (x, y) => {
    console.log(x, y)
}

// 封装参数,定义
let drawPoint2 = (point) => {
    console.log({x: point.x, y: point.y})
}
// 调用函数
drawPoint2({x: 100, y: 200})
drawPoint2({x: 100, y: "abc"}) // 问题,并没有对应的参数类型限制.

// 创建接口
interface Point {
    x: number;
    y: number;
}

// 使用接口,限制参数类型
let drawPoint3 = (point: Point) => {
    console.log({x: point.x, y: point.y})
}
// drawPoint3({x: 100, y: "abc"}) // 如果类型不匹配,则显示异常..


// 类
// 一个特殊的函数,定义与声明

// 定义接口
interface IPoint {
    // 成员变量
    x: number;
    y: number;
    // 定义方法,无参数,无返回值
    drawPoint: () => void;
    // 定义方法,有参数,有返回值
    getDistance: (p: IPoint) => number;
}

// 定义实现类
class PointClass implements IPoint {
    // 声明成员变量
    x: number;
    y: number;

    // 仅有唯一的构造函数, 不允许重载代码, 可选参数 y
    constructor(x: number, y?: number) {
        this.x = x;
        this.y = y;
    }

    // 实现方法,打印两点坐标
    drawPoint(): void {
        console.log(this.x, this.y)
    }

    // 实现方法,计算两点距离和
    getDistance(p: IPoint): number {
        return Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2);
    }
}

// 实例化类,并调用方法
const pointInstance = new PointClass(1, 2);
pointInstance.drawPoint();

// 访问修饰符 public private protected
class PointClass2 implements IPoint {
    // 使用 public 访问修饰符, 不用声明成员变量.(默认 public 访问修饰符)
    constructor(public x: number, public y: number) {

    }

    // 实现方法,打印两点坐标
    drawPoint(): void {
        console.log(this.x, this.y)
    }

    // 实现方法,计算两点距离和
    getDistance(p: IPoint): number {
        return Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2);
    }
}

const pointInstance2 = new PointClass2(1, 2);
pointInstance2.y = 1 // 使用public 可以直接访问;


// 访问修饰符 public private protected
class PointClass3 {
    // 使用 private 访问修饰符, 并提供 getter / setter 方法
    constructor(private x: number, private y: number) {

    }

    // 提供set 方法,可以修改
    setX = (x: number) => {
        if (x < 0) {
            throw new Error("x 不能少于0")
        }
        this.x = x;
    }
    // 提供get 方法,允许访问
    getX = () => {
        return this.x;
    }
    getY = () => {
        return this.y;
    }

    // 实现方法,打印两点坐标
    drawPoint(): void {
        console.log(this.x, this.y)
    }

    // 实现方法,计算两点距离和
    getDistance(p: PointClass3): number {
        return Math.pow(p.getX() - this.x, 2) + Math.pow(p.getY() - this.y, 2);
    }
}

const pointInstance3 = new PointClass3(1, 2);
// pointInstance3.x = 1 // 使用private方法,禁止直接修改
pointInstance3.setX(3); // 使用 setter 方法,修改数据
pointInstance3.getX() // 使用 getter 方法,获得返回值


// 访问修饰符 public private protected
class PointClass4 {
    // 使用 private 访问修饰符, 并提供简写 getter / setter 方法
    constructor(private x: number, private y: number) {

    }

    // 简写 set 方法
    set X(x: number) {
        this.x = x;
    }

    set Y(y: number) {
        this.y = y;
    }

    // 简写 get 方法
    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }

    // 实现方法,打印两点坐标
    drawPoint(): void {
        console.log(this.x, this.y)
    }

    // 实现方法,计算两点距离和
    getDistance(p: PointClass4): number {
        // 使用属性方式调用 getter 方法
        return Math.pow(p.X - this.x, 2) + Math.pow(p.Y - this.y, 2);
    }
}

const pointInstance4 = new PointClass4(1, 2);
pointInstance4.X = 3; // 使用 setter 方法,修改数据
pointInstance4.X // 使用 getter 方法,获得返回值


// 模块
// 使用 export 修饰类和接口,完成导出
export class PointClass5 {

}

// 使用 import {} from .. 执行导入.必须放在第一行.


// 泛型,在<>内指定类型
let list1: Array<number> = [1, 2, 3, 4]
let list12: number[] = [1, 2, 3, 4]

// 动态泛型,返回成员变量的最后一个. 使用动态泛型
let lastOne = <T>(arr: Array<T>) => {
    return arr[arr.length - 1];
}
// 忽略类型
const l1 = lastOne([1, 2, 3, 4]);
// 指定类型,或者联合类型
const l2 = lastOne<string>(['a', 'b', 'c', 'd']);
const l3 = lastOne<string | number>(['a', 'b', 'c', 'd']);
