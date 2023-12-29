# Vue  React 区别
## 1. 模板语法
- vue 采用template字符串模板， react 采用jsx语法
- vue 支持选项式API； vue3采用组合是API；  react 是类组件和 函数组件
- vue 采用v-model双向绑定，react 采用单向数据流
- vue slot插槽有 匿名插槽，具名插槽，作用于插槽； react 采用props.children

## 2. dom diff
- 都采用同层对比策略
- 对比的时候都是判断节点类型，节点key，

## 3. 组件通信
- vue 采用props和 emits来通信； react props和回调函数
- vue pinia ; react  redux
  数据流：pinia 数据是通过store 管理的； redux 是采用action-》reducer-》store-》view 单向流管理的
  异步操作：pinia 采用action来处理； redux 需要采用applyMiddleware(redux-thunk)来处理
- vue provide/inject; react provide/context

## 4. 组件复用
- vue2 采用mixins, mixins在vue3废弃，采用use函数来引入 ; react 类组件采用高阶函数，函数组件采用 use函数


## watchEffect()  和 useEffect()
相同点：  都是执行副作用的，都接收一个依赖数组作为参数，都可以在副作用操作后执行回调函数清理资源
区别： vue watchEffect 会自动追踪依赖项，并在依赖项变化时，执行副作用。react 需要手动指定依赖到数组中;
      vue 在依赖项变化后重新执行；useEffect 重新渲染后执行
      
