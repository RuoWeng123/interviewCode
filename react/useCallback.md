# useCallback 定义
useCallback(callback, dependencies) 用于缓存函数，避免不必要的渲染

默认情况下，当一个组件重新渲染时，其中的函数都会重新声明。那么这将传递给子组件，导致子组件也会重新渲染。


## useCallback 一般用于子组件的回调函数中，检查子组件渲染次数
