 # setState 后是如何更新Dom的
 1. setState后，react 会创建一个新的fiber树
 - fiber 节点是对应的react 组件，包含了组件的类型（函数组件还是类组件），props，state 信息
2. 调度更新，react 将新的state或者组件实例放入队列中，这个队列是基于fiber 节点的，择机更新
 - 队列的调度优先级，是用户交互高于网络请求的回调函数
3. react 会在合适的时机处理（当前调用栈完成后）处理更新队列，这就是fiber的核心“reconciliation”；
4. 生成fiber树，在3的处理过程中，某些fiber节点会被标注需要更新
5. commit过程，将需要更新的fiber节点，一次性更新到dom上。这个过程是同步的，会阻塞渲染


## 所以diff 算法的实现最后都是 fiber 的实现
