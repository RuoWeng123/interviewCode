# 好代码的标准
* 可读性强：代码应该易于理解，包括良好的命名、注释和文档。

* 可维护性：代码应该易于修改和扩展，这通常意味着它应该具有良好的模块化和低耦合。

* 可重用性：好的代码应该避免重复，尽可能地重用已有的代码。

* 可靠性：代码应该能正确地执行预期的任务，并能处理异常和错误情况。

* 性能：虽然这不总是最重要的因素，但在需要的时候，好的代码应该尽可能地优化以提高性能。

* 安全性：好的代码应该考虑到安全性，避免常见的安全漏洞。

* 遵循编码规范和标准：好的代码应该遵循一定的编码规范和标准，以保证代码的一致性和可读

# 程序设计原则（Solid 原则）
1. 单一职责原则（Single Responsibility Principle, SRP）：一个类或者模块应该只有一个改变的理由。这意味着一个类或模块只应该负责一项职责。

2. 开放封闭原则（Open-Closed Principle, OCP）：软件实体（类、模块、函数等等）应该可以扩展，但是不可修改。这意味着应该能够在不改变一个模块的源代码的情况下改变其行为。
ex: 假设我们有一个Shape类，以及一个AreaCalculator类，它计算一系列形状的面积
```js
class Shape {
  area() {
    // 计算面积
  }
}

class AreaCalculator {
  constructor(shapes) {
    this.shapes = shapes;
  }

  totalArea() {
    return this.shapes.reduce((total, shape) => {
      return total + shape.area();
    }, 0);
  }
}
```
现在，如果我们想添加一个新的Circle形状，我们可以简单地创建一个新的Circle类，继承自Shape类，并实现area方法。我们不需要修改AreaCalculator类或Shape类的代码。
```js
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}
```

3. 里氏替换原则（Liskov Substitution Principle, LSP）：子类型必须能够替换它们的基类型。这意味着如果一个程序使用一个基类的地方，那么它应该能够使用其子类而不产生任何错误或异常。
ex: 假设我们有一个Bird类，它有一个fly方法：
```js
class Bird {
  fly() {
    console.log('I can fly')
  }
}
```
现在，我们想创建一个Penguin类，它继承自Bird类，但是它不能飞。我们可以简单地覆盖fly方法，让它什么都不做：
```js
class Penguin extends Bird {
  fly() {
    throw new Error('I can not fly');
  }
}
```
为了遵守里氏替换，我们可以将Bird类分解为更具体的类，如FlyingBird和NonFlyingBird：
```js 
class FlyingBird {
  fly() {
    console.log('I can fly');
  }
}

class NonFlyingBird {
  // NonFlyingBird没有fly方法
}

class Penguin extends NonFlyingBird {
  // Penguin现在是NonFlyingBird的子类，它不需要fly方法
}
```


4. 接口隔离原则（Interface Segregation Principle, ISP）：客户端不应该依赖它不需要的接口。这意味着一个类不应该被迫实现它不会使用的接口。
ex: 假设我们有一个Worker接口，它有work和eat两个方法：
```js
interface Worker {
  work();
  eat();
}
```
现在我们有一个HumanWorker类，它实现了Worker接口：
```js
class HumanWorker implements Worker {
  work() {
    // human worker works
  }

  eat() {
    // human worker eats
  }
}
```
我们还有一个RobotWorker类，它也实现了Worker接口。但是，机器人并不需要吃饭，所以eat方法对RobotWorker来说是无用的。
```js
class RobotWorker implements Worker {
  work() {
    // robot worker works
  }

  eat() {
    // robot worker doesn't need to eat, but it has to implement this method
  }
}
```
为了遵守接口隔离原则，我们可以将Worker接口分解为更小的接口，如Workable和Eatable：
```js
interface Workable {
  work();
}

interface Eatable {
  eat();
}

class HumanWorker implements Workable, Eatable {
  work() {
    // human worker works
  }

  eat() {
    // human worker eats
  }
}

class RobotWorker implements Workable {
  work() {
    // robot worker works
  }
}
```
现在，RobotWorker类只需要依赖于它真正需要的Workable接口，而不需要实现无用的eat方法，因此它遵守了接口隔离原则。
5. 依赖倒置原则（Dependency Inversion Principle, DIP）：高层模块不应该依赖低层模块，它们都应该依赖于抽象。这意味着要依赖于抽象（接口和抽象类），不要依赖于具体的类。


# solid原则在vue 组件开发上是如何体现的
1. 单一职责原则： 一个组件只做一件事，便于理解和测试
2. 开放封闭原则： 组件的修改应该通过扩展来实现，而不是修改源代码； 因此设计时，应该考虑插槽，组合式API, 高阶组件
3. 里氏替换原则： 在使用继承和组合时，子组件可以替换父组件而不会影响程序正确性； 例如，通过 extends 实现子组件
```js
<!-- 父组件 -->
<template>
  <div>
    <h1>{{ makeSound() }}</h1>
  </div>
</template>

<script>
export default {
  methods: {
    makeSound() {
      return 'Generic sound';
    }
  }
};
</script>
<!-- 子组件 -->
<template>
  <div>
    <h2>{{ makeSound() }}</h2>
  </div>
</template>

<script>
import ParentComponent from './ParentComponent.vue';

export default {
  extends: ParentComponent,
  methods: {
    // 子组件可以保持父组件的行为，而不修改
    makeSound() {
      return 'Meow';
    }
  }
};
</script>
// ParentComponent 是一个父组件，定义了一个 makeSound 方法，而 ChildComponent 是一个子组件，通过 extends 关键字继承了父组件的行为。子组件保持了相同的接口，即 makeSound 方法，但修改了该方法的具体实现，使其返回 'Meow'。
```
```js
// react 部分实现
// 父组件
const ParentComponent = ({ makeSound }) => {
  return (
    <div>
      <h1>{makeSound()}</h1>
    </div>
  );
};

// 子组件
const ChildComponent = ({ makeSound }) => {
  // 子组件可以保持父组件的行为，而不修改
  return (
    <div>
      <h2>{makeSound()}</h2>
    </div>
  );
};

// 使用组合来创建包含行为的组件
const App = () => {
  const genericSound = () => 'Generic sound';
  const meowSound = () => 'Meow';

  return (
    <div>
      <ParentComponent makeSound={genericSound} ...otherProps/>
      <ChildComponent makeSound={meowSound} ...otherProps/>
    </div>
  );
};

export default App;
// ParentComponent 和 ChildComponent 都是无状态的函数组件，通过接收 makeSound 函数作为 props，实现了组件的复用。在 App 组件中，我们分别传递了不同的 makeSound 函数，达到了类似于里氏替换原则的效果。
```
4. 接口隔离原则： 组件应该是高内聚的，不应该依赖不需要的接口； 例如，组件应该只依赖于它需要的 props，而不是依赖于整个 store；
5. 依赖倒置原则： 组件应该依赖于抽象，而不是具体的实现； 例如，组件应该依赖于抽象的 store，而不是具体的 store 实例；