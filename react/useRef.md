# useRef 使用场景
- 获取DOM节点
- 保存变量， 因为useEffect , useCallback , useMemo 是一种闭包，所以每次组件渲染，都会获取当前组件上下文中的state，props；故如果要使用上次的状态，需要使用useRef
- 
