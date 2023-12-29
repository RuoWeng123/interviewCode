# javascript 继承
## 原型链继承
```javascript
function Parent() {
    this.name = 'parent';
    this.play = [1, 2, 3];
}
function Child() {
    this.type = 'child';
}
Child.prototype = new Parent();
var s1 = new Child();
var s2 = new Child();
s1.play.push(4);
console.log(s1.play, s2.play); // [1, 2, 3, 4] [1, 2, 3, 4]
```
### 原型链继承的优点和缺点
#### 优点
1. 父类方法可以复用
2. 可以通过instanceof和isPrototypeOf来识别类型
#### 缺点
1. 来自原型对象的引用属性是所有实例共享的
2. 创建子类实例时，无法向父类构造函数传参

## 构造函数继承
```javascript
function Parent() {
    this.name = 'parent';
    this.play = [1, 2, 3];
}
function Child() {
    Parent.call(this);
    this.type = 'child';
}
var s1 = new Child();
var s2 = new Child();
s1.play.push(4);
console.log(s1.play, s2.play); // [1, 2, 3, 4] [1, 2, 3]
```
### 构造函数继承的优点和缺点
#### 优点
1. 避免了引用类型的属性被所有实例共享
2. 可以在 Child 中向 Parent 传参
#### 缺点
1. 方法都在构造函数中定义，每次创建实例都会创建一遍方
2. 无法复用父类的方法，每次创建实例都会创建一遍方法。


## 组合继承
```javascript
function Parent(age) {
    this.name = 'parent';
    this.age = age;
    this.play = [1, 2, 3];
}
Parent.prototype.getAge = function () {
    return this.age;
}
function Child(age, childrenAge) {
    Parent.call(this, value);
    this.type = 'child';
    this.childrenAge = childrenAge;
}
Child.prototype = new Parent();
var s1 = new Child(50, 25);
var s2 = new Child();
s1.play.push(4);
console.log(s1.play, s2.play); // [1, 2, 3, 4] [1, 2, 3]
console.log(s1.getAge()); // 50
console.log(s1.childrenAge);  // 25
```
### 组合继承的优点和缺点
#### 优点
1. 融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
2. 可以通过 instanceof 和 isPrototypeOf 方法识别类型。
3. 子类可以向父类构造函数传参。
4. 可复用父类方法。
#### 缺点
1. 调用了两次父类构造函数，生成了两份实例。
2. 子类原型上多了不需要的父类属性，存在内存上的浪费。


## 寄生组合继承
```javascript
function Parent() {
    this.name = 'parent';
    this.play = [1, 2, 3];
}
function Child() {
    Parent.call(this);
    this.type = 'child';
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
var s1 = new Child();
var s2 = new Child();
s1.play.push(4);
console.log(s1.play, s2.play); // [1, 2, 3, 4] [1, 2, 3]
```
### 寄生组合继承的优点和缺点
#### 优点
1. 只调用了一次父类构造函数，避免了在 Parent.prototype 上面创建不必要的、多余的属性。
2. 可以正常使用 instanceof 和 isPrototypeOf。
3. 同时还能够正常使用父类的方法。
#### 缺点
1. 实现较为复杂。


## class 继承
```javascript
class Parent {
    constructor() {
        this.name = 'parent';
        this.play = [1, 2, 3];
    }
}
class Child extends Parent {
    constructor() {
        super();
        this.type = 'child';
    }
}
let s1 = new Child();
let s2 = new Child();
s1.play.push(4);
console.log(s1.play, s2.play); // [1, 2, 3, 4] [1, 2, 3]
```
### class 继承的优点和缺点
#### 优点
1. 实现简单，易于理解，更像是面向对象编程的语法糖。
2. 父类的方法或者属性，可以被子类继承。
3. 可以通过 instanceof 和 isPrototypeOf 方法识别类型。
4. 子类可以向父类构造函数传参。
5. 可复用父类方法。
#### 缺点
1. 实现的底层仍然是基于原型链的继承，无法避免调用两次父类构造函数，生成两份实例。
2. 子类原型上多了不需要的父类属性，存在内存上的浪费。
3. 无法实现私有成员。
4. 无法实现多继承，即无法继承多个类。


async function async1() {
  console.log('1');
  await async2();
  console.log('2');
}

async function async2() {
  return new Promise(() => {
    console.log('3');
    resolve()
  });
}

console.log('4');
async1();

setTimeout(() => {
  console.log('5');
}, 0);

new Promise((resolve, reject) => {
  console.log('6');
  resolve();
}).then(() => {
  console.log('7');
});

console.log('8')  为什么我的浏览器输出是 4 1 3 6 8 7 2 5； 请主要解释一下 为什么await async2() 后为什么不执行 console.log(2), 而是先执行 6
ChatGPT
在你提供的代码中，主要的原因是 new Promise(() => { console.log('3'); }); 这个 Promise 的 executor 函数是同步执行的，而且没有调用 resolve 或 reject。这导致这个 Promise 不会被解决，而 await async2() 会一直等待这个 Promise 解决，因此 console.log('2') 不会被执行，而是先执行了 console.log('6')。