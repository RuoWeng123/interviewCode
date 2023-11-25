# vue3 有那些新特性
## 组件设计方面
1. 语法糖不同，vue2采用依赖选项式API，将组件分为不同的 data methods  computed；vue3采用组合式API， 将逻辑相关的代码放在一起
2. vue2 中，默认值是静态或者 函数返回，vue3则采用工厂函数，每次组件实例化时都执行
3. vue3 支持多个根节点 。
4. Teleport是Vue3引入的，可以在dom节点外部渲染组件
## 状态管理方面
1. vue2 中采用Vuex全局状态管理，采用data computed  来处理组件内部状态
2. vue3 也可以使用Vuex，但是由于组合式APi的引入，采用reactive创建响应式数据，采用ref 创建引用数据

## 性能优化
1. proxy 相对于 defineProperty 有更好的性能
2. 静态树提升，引入静态树可以编译时减少虚拟dom的创建和对比
