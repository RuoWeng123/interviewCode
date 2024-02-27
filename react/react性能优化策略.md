# 性能优化策略
1. React.pureComponent 和 React.memo。类组件中，通过浅比较来决定是否重新渲染
```jsx
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.name}</div>;
  }
}
```
```jsx
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});
```
2. shouldComponentUpdate, 在类组件中，通过比较返回 boolean 来决定重新渲染
3. 避免创建大量匿名函数，jsx中，每次组件渲染时，都会创建新的函数实例，可以将函数提取到组件外部
4. React.lazy 和 Suspense 按需加载
5. useCallback 和 useMemo 通过记录函数的值，来避免不必要的渲染
6. 优化渲染列表，使用 key 来标识列表项，避免不必要的渲染，同时只渲染窗口区域
7. React.profiler 可以测量一个 react 应用多久渲染一次以及渲染一次的“代价”是多少
8. React.Context 适度使用，可以避免引入额外的状态管理库
