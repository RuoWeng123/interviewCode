# 什么是react hooks
## 定义
Hooks 是 React 16.8 的新增特性，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## Hook 结构体
```js
const hook = {
  memoizedState: null, // 
  baseState: null, // 基础状态
  baseUpdate: null, // 基础更新
  queue: null, // 更新队列
  next: null // 下一个 hook
}
```

## 组件初始化时做那些操作
将 每个hook 以链表的形式串联起来
```js
function mountWorkInProgressHook() {
  const hook = {
    memoizedState: null,  // 这里保存当前函数中，每个hooks形成的链表
    baseState: null,  // 一次更新中保存的最新的 state 值
    baseQueue: null,  // 保存最新的更新队列
    queue: null,   // 更新函数 dispatch等信息
    next: null
  }
  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook
  }
  return workInProgressHook
}
```

## mount
HooksDispatcherOnMount
```js
function mountState(initialState) {
  // init hook
  const hook = mountWorkInProgressHook()
  if (typeof initialState === 'function') {
    // the initialState is function; run and return result to initialState
    initialState = initialState()
  }
  hook.memoizedState = hook.baseState = initialState
  const queue = (hook.queue = {
    pending: null,     // 待更新的
    dispatch: null,   // 负责封信函数
    lastRenderedReducer: basicStateReducer,   // 用于得到最新的 state
    lastRenderedState: initialState,   // 最后一次 state
  })
  //  什么是dispatchAction；
  // function dispatchAction<S, A>(
  //   fiber: Fiber,
  //   queue: UpdateQueue<S, A>,
  //   action: A,
  // )

  // 负责更新的函数
  const dispatch = (queue.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  ))
  return [hook.memoizedState, dispatch]
}
```
dispatchAction
```js
function dispatchAction(fiber, queue, action) {

  // 计算 expirationTime 过程略过。
  /* 创建一个update */
  const update= {
    expirationTime,
    suspenseConfig,
    action,
    eagerReducer: null,
    eagerState: null,
    next: null,
  }
  /* 把创建的update, 将刚才queue 中的待更新的数据拿出来 */
  const pending = queue.pending;
  if (pending === null) {  // 证明第一次更新
    update.next = update;
  } else { // 不是第一次更新
    update.next = pending.next;
    pending.next = update;
  }
  
  queue.pending = update;
  const alternate = fiber.alternate;
  /* 判断当前是否在渲染阶段 */
  if ( fiber === currentlyRenderingFiber || (alternate !== null && alternate === currentlyRenderingFiber)) {
    didScheduleRenderPhaseUpdate = true;
    update.expirationTime = renderExpirationTime;
    // 处于渲染阶段，更新一下过期时间，等待下一轮调和渲染
    currentlyRenderingFiber.expirationTime = renderExpirationTime;
  } else { /* 当前函数组件对应fiber没有处于调和渲染阶段 ，那么获取最新state , 执行更新 */
    if (fiber.expirationTime === NoWork && (alternate === null || alternate.expirationTime === NoWork)) {
      const lastRenderedReducer = queue.lastRenderedReducer; // 这个函数可以得到最新的state， 因为state 不是同步更新的，
      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        try {
          const currentState = queue.lastRenderedState; /* 上一次的state */
          const eagerState = lastRenderedReducer(currentState, action); /* 通过函数得到了最新的 state*/
          update.eagerReducer = lastRenderedReducer;
          update.eagerState = eagerState;
          if (is(eagerState, currentState)) { // 例如： curentState=1; 但是eagerState = 1=>2>1 此时还是1，不更新
            return
          }
        } 
      }
    }
    // 这里可以看到 两次state 不一样，call scheduleUpdateOnFiber to render 
    scheduleUpdateOnFiber(fiber, expirationTime);
  }
}
```

## 执行useEffect 到底在执行什么
第一次，执行mountEffect
```js
function mountEffect(create, deps){
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  // 钩子hooks的memoizedState保存的是当前hooks的信息
  hook.memoizedState = pushEffect(
    HookHasEffect | HookPassive,
    create,
    undefined,
    nextDeps
  );
}
```
pushEffect
```js
function pushEffect(tag, create, destroy, deps) {
  const effect = {
    tag,
    create,
    destroy,
    deps,
    next: null,
  };
  
  let componentUpdateQueue = currentlyRenderingFiber.updateQueue;
  if(componentUpdateQueue === null) {
    componentUpdateQueue = createFunctionComponentUpdateQueue();
    currentlyRenderingFiber.updateQueue = componentUpdateQueue;
    componentUpdateQueue.lastEffect = effect.next = effect;
  } else {
    const lastEffect = componentUpdateQueue.lastEffect;
    if (lastEffect === null) {
      componentUpdateQueue.lastEffect = effect.next = effect;
    } else {
      const firstEffect = lastEffect.next;
      lastEffect.next = effect;
      effect.next = firstEffect;
      componentUpdateQueue.lastEffect = effect;
    }
  }
  return effect;
}
```
## useMemo 
```js
function mountMemo(nextCreate, deps) {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

## useRef
```js
function mountRef(initialValue) {
  const hook = mountWorkInProgressHook();
  const ref = {current: initialValue};
  hook.memoizedState = ref;
  return ref;
}
```

## 总结
1. 组件函数初始化时，每一个钩子函数都会执行，产生一个hook 对象， 每一个hook 都绑定了memoizedState保存当前 hook 信息
2. 之后将这些返回的hook对象，已链表的形式绑定在 workInProgress.memoizedState上；
3. 初始化时，如果effect有副作用，绑定在 workInProgress.updateQueue上；等到dom渲染完成后，再执行effect

4. 更新阶段，workInProgress 此时已经交给了current树，调用useState时，先从current的hooks找到workInProgressHook，


