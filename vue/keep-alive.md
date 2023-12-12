# keep-alive 干嘛的？
包裹组件进行缓存，避免重复渲染，提高性能
```js
<keep-alive>
  <component :is="currentComponent"></component>
</keep-alive>
```
# keep-alive 如何工作
第一次加载通过 created 来触发组件的生命周期，第二次加载通过 activated 来触发组件的生命周期   
如果需要挂起，通过deactivated来触发组件的生命周期

# keep-alive 注意事项
1. 如果两个组件有相同的name或者key，则第一个组件状态会保存在缓存中，而不是销毁
2. 设置max属性，可以保存最多的组件实例，超过则会销毁最早的实例
