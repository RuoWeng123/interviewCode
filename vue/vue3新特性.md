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