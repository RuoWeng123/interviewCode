# vue2 组件生命周期
1. beforeCreate
2. created
3. beforeMount
4. mounted
5. beforeUpdate
6. updated
7. beforeDestroy
8. destroyed
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