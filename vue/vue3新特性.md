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

# vue3 生命周期
在 Vue 3 中，生命周期钩子函数的命名有所改变，但其基本的执行逻辑和 Vue 2 是一样的。以下是 Vue 3 中的生命周期钩子函数：

beforeCreate 和 created 在 Vue 3 中被替换为 setup。

beforeMount 对应 Vue 3 中的 onBeforeMount。

mounted 对应 Vue 3 中的 onMounted。

beforeUpdate 对应 Vue 3 中的 onBeforeUpdate。

updated 对应 Vue 3 中的 onUpdated。

beforeDestroy 在 Vue 3 中被替换为 onBeforeUnmount。

destroyed 在 Vue 3 中被替换为 onUnmounted。

activated 对应 Vue 3 中的 onActivated。

deactivated 对应 Vue 3 中的 onDeactivated。

errorCaptured 对应 Vue 3 中的 onErrorCaptured。

注意，Vue 3 中的生命周期钩子函数需要在 setup 函数中使用。

# vue3 一些特殊函数
## readonly 用于暴露一些不能更改的属性
## shallowRef 包住一个 基础类型或者引用类型，如果是基础类型和Ref是一样的，如果是引用类型，则直接修改属性是不能触发响应的
 shallowRef 用于修改一个复杂数据dan'shi
## shallowReactive 用于创建一个只读的响应式数据，只能监听一层数据的变化
## toRef 用于创建一个响应式数据，可以监听多层数据的变化

# vue3 diff 算法改进

虚拟DOM中的Diff算法是用于比较前后两个虚拟DOM树的算法，以找到最小的更新量来更新实际的DOM。Vue 2中一般采用的是经典的“Virtual DOM Diff算法”，而Vue 3在性能和效率方面进行了一些改进。以下是一些Vue 3中Diff算法的改进：

1. 静态树提升（Static Tree Hoisting）： Vue 3引入了静态树提升的概念，该优化可以将静态节点提升到渲染函数的外部，减少了渲染时的开销。这意味着在比较时，静态节点不再需要每次都进行比较。

2. Cache Handlers： Vue 3引入了缓存处理器，将事件处理程序的缓存添加到虚拟节点中。这样，当相同类型的组件多次渲染时，可以重用相同类型的事件处理程序，减少了不必要的比较和处理。

3. 动态Props缓存： 对于动态Props，Vue 3使用了缓存机制，避免了不必要的Props比较。这样，只有真正变化的Props才会触发更新。

4. Fragment支持： Vue 3支持Fragment，这使得对多个根节点的比较更为高效，减少了比较的复杂性。

5. Key的重要性： Vue 3更强调在列表渲染时使用唯一的key，以便更准确地识别出新增、删除和移动的节点，提高了列表渲染的效率。