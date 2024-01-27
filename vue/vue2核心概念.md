# vue2 组件生命周期
1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate
6. updated
7. beforeDestroy
8. destroyed

# 父子组件生命周期
// 加载阶段
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
// 更新阶段
父beforeUpdate->子beforeUpdate->子updated->父updated
// 销毁阶段
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

# 备注各个钩子执行时，data el dom的状态
beforeCreate执行时：data和el均未初始化，值为undefined
created执行时：Vue 实例观察的数据对象data已经配置好，已经可以得到data的值，但Vue 实例使用的根 DOM 元素el还未初始化
beforeMount执行时：data和el均已经初始化，但此时el并没有渲染进数据，el的值为“虚拟”的元素节点
mounted执行时：此时el已经渲染完成并挂载到实例上
beforeUpdate和updated触发时，el中的数据都已经渲染完成，但只有updated钩子被调用时候，组件dom才被更新。
在created钩子中可以对data数据进行操作，这个时候可以进行数据请求将返回的数据赋给data
在mounted钩子对挂载的dom进行操作，此时，DOM已经被渲染到页面上。
虽然updated函数会在数据变化时被触发，但却不能准确的判断是那个属性值被改变，所以在实际情况中用computed或watch函数来监听属性的变化，并做一些其他的操作。
所有的生命周期钩子自动绑定 this 上下文到实例中，所以不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos()),会导致this指向父级。
在使用vue-router时有时需要使用来缓存组件状态，这个时候created钩子就不会被重复调用了，如果我们的子组件需要在每次加载或切换状态的时候进行某些操作，可以使用activated钩子触发。
父子组件的钩子并不会等待请求返回，请求是异步的，VUE设计也不能因为请求没有响应而不执行后面的钩子。所以，我们必须通过v-if来控制子组件钩子的执行时机

# vue2 如何做性能优化
1. 路由懒加载或者动态导入组件
```javascript
const Foo = () => import('./Foo.vue')
```
2. keep-alive
```html
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```
3. 图片优化，使用适当的webp格式，减少图片大小。采用懒加载技术，仅加载可见区域的图片
4. 生产环境下，关闭devtools
5. 使用cdn引入一些不变动的库，例如Vue element dayjs
6. 启动 Tree-shaking
7. 打包时，移除console.log
```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      'transform-remove-console',
      {
        exclude: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : []
      }
    ]
  ]
}
```
8. 启用gzip压缩
```js
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      })
    ]
  }
}
```
9. 减少不必要的全局样式，可以减少样式表的大小
10. 合理使用v-if和v-show;使用 v-if 适合在条件不经常改变的情况下，而 v-show 适合在条件经常改变的情况下，因为 v-show 只是简单地切换 CSS 的 display 属性。
11. vuex应按照功能划分模块，按需加载和更新状态