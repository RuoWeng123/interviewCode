# useEffect 详解
## 执行时机
- 每次渲染后，异步执行，不会阻塞浏览器渲染进程    
一般用来执行副作用操作，如：数据请求，DOM操作等

## useEffect 第二个参数传与不传的区别
- 不传：每次渲染都会执行,
- 传空数组：只会在第一次渲染时执行
- 传入依赖：只有依赖变化时才会执行
## useEffect return函数
- 用来清除副作用操作，如：清除定时器，取消订阅等
- 会在组件卸载时执行
- 会在下次执行副作用操作前执行, 也就是回调函数前执行


# useLayoutEffect
## 执行时机
DOM变更后，同步调用，浏览器绘制前执行     
一半用来执行DOM操作，如测量DOM节点大小，获取DOM节点位置等

# useMemo 与 useCallback
## 作用
- useMemo: 用来缓存计算结果
- useCallback: 用来缓存函数
- 两者都是在依赖变化时才会重新计算
- 两者都可以用来优化子组件的渲染

# useRef,用于创建一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
## 使用场景
- 获取DOM节点
- 保存变量
- 获取上一次的值, 例如：


# 如何通过父组件调用子组件的方法
forwardRef + useImperativeHandle
```js
import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const ChildComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    sayHello() {
      console.log('Hello from ChildComponent');
    }
  }));

  return <div>ChildComponent</div>;
});

function ParentComponent() {
  const childRef = useRef();

  const handleClick = () => {
    // 调用子组件的 方法
    childRef.current.sayHello();
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Call Child Method</button>
    </div>
  );
}

export default ParentComponent;
```