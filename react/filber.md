# react fiber
## 背景
 react16之前采用递归方式处理组件树（或者说 虚拟dom），这种方式一开始就不能中断，如果需要对比大量的虚拟节点，这将会造成主线程阻塞，页面卡顿。
## 浏览器一帧会经过下面这几个过程：

接受输入事件
执行事件回调
开始一帧
执行 RAF (RequestAnimationFrame)
页面布局，样式计算
渲染
执行 RIC  (RequestIdelCallback)

第七步的 RIC 事件不是每一帧结束都会执行，只有在一帧的 16ms 中做完了前面 6 件事儿且还有剩余时间，才会执行。这里提一下，如果一帧执行结束后还有时间执行 RIC 事件，那么下一帧需要在事件执行结束才能继续渲染，所以 RIC 执行不要超过 30ms，如果长时间不将控制权交还给浏览器，会影响下一帧的渲染，导致页面出现卡顿和事件响应不及时。

## 定义
为了解决 React 在渲染过程中无法中断、无法复用渲染状态、无法立即执行的问题。
## fiber 原理
react 将组件构建为 fiber 链表，每个组件都是一个工作单元,处理每个fiber单元前优先判断是否有足够时间处理完成工作
将渲染工作分割成块，将其分散到多个帧中,每个帧可以中断渲染，执行其他任务，然后继续渲染。
## fiber 工作流程
1. fiber 树是一个 由 fiberNode 构建的带有链接关系的dom树。
filerNode的结构
```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 基本属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;   // 描述 组件类型
  this.stateNode = null;

  // Fiber 链接
  this.return = null;   // 指向父 fiber
  this.child = null;   // 子 filber
  this.sibling = null;   // 兄弟 filber
  this.index = 0;  // 子fiber 中 索引位置

  this.ref = null;    // 如果组件有ref，  该属性指向它
  this.refCleanup = null;  // 如果组件上ref 属性在更新过程中被删除或者修改，字段表示需要追踪清理的旧ref

  // props  state
  this.pendingProps = pendingProps;   // 正在等待处理的新 props
  this.memoizedProps = null;      // 上一次渲染时  props
  this.updateQueue = null;       // 包含该filber 上状态更新和副作用
  this.memoizedState = null;   // 上一次渲染时 state
  this.dependencies = null;    // 该fiber 订阅的上下文 或者其他资源

  // 描述 fiber 工作模式
  this.mode = mode;

  // Effects
  this.flags = NoFlags; // 描述该Fiber发生的副作用的标志（十六进制的标识）
  this.subtreeFlags = NoFlags; // 描述该Fiber子树中发生的副作用的标志（十六进制的标识）
  this.deletions = null; // 在commit阶段要删除的子Fiber数组

  this.lanes = NoLanes; // 与React的并发模式有关的调度概念。
  this.childLanes = NoLanes; // 与React的并发模式有关的调度概念。

  this.alternate = null; // Current Tree和Work-in-progress (WIP) Tree的互相指向对方tree里的对应单元
}
```

基于上面的数据结构，react 可以知道遍历fiber树时，从哪里开始、暂停、继续工作。

## 双缓冲技术：  有一个 currentTree 和 一个 workTree；
currentTree，显示在页面上的视图
workTree, 用于计算的视图，一个fiber树    , 每次更新时，从current 复制一份
* state 和props：  memoizedProps; memoizedState, pendingProps 让react 知道组件上的上一个状态以及将要应用的状态，通过比较这些值来判断是否更新。
* subTreeFlags 记录了fiber 需要处理的副作用，commit 阶段一次执行
