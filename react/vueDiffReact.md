# vue和react的区别

## 相同点：

1. 组件化： React 和 Vue 都采用了组件化的思想，将用户界面划分成独立、可复用的组件，使得代码更易维护和扩展。

2. 虚拟 DOM： 两者都使用了虚拟 DOM 技术，通过在内存中构建虚拟 DOM 树，然后与实际 DOM 进行比较，最终只更新发生变化的部分，以提高性能。

3. 响应式数据流： React 和 Vue 都支持响应式数据流，当数据发生变化时，视图会自动更新。

4. 单文件组件： 两者都支持单文件组件的开发方式，即在一个文件中包含组件的模板、样式和逻辑。

## 不同点：

1. 模板语法：

  Vue 使用基于 HTML 的模板语法，将模板和逻辑放在同一个文件中。
  React 使用 JSX，一种 JavaScript 扩展语法，将模板和逻辑直接写在 JavaScript 代码中。
2. 数据绑定：

  Vue 提供了双向数据绑定，可以通过 v-model 在表单元素和数据之间建立双向绑定。
  React 采用的是单向数据流，通过状态（state）和属性（props）的变化来管理数据。
3. 状态管理：

  在 React 中，状态管理通常使用 Context API、Redux 或其他状态管理库来实现。
  Vue 提供了内建的状态管理工具 Vuex，用于管理组件之间的共享状态。
4. 生态系统：

  React 生态系统更大，拥有丰富的第三方库和组件，适用于构建大型应用。
  Vue 由于其简洁和易用的API，更适合快速开发小型到中型的应用。

## vue3 相对于react hook解决了那些问题
1. 重复渲染，数据改变后，react hook 函数组件会重复渲染，而setup 函数只会执行一次，这在性能上有优势
2. react 因为链表构建hook 的原因，对调用顺序是有要求的。而且react 会每次渲染中反复调用hook； 垃圾回收GC压力大
3. 不必考虑几乎总是需要 useCallback 的问题，以防止传递函数prop给子组件的引用变化，导致无必要的重新渲染。
4. react hook 有闭包陷阱，不设置正确的deps可能有问题。vue3 中自动依赖关系保证使用正确无误
5. react hook 提供了eslint插件，避免闭包陷阱，但是也是需要配置的


# vuex 和 redux 的区别
## 相同点：

1. 状态管理： 两者都提供了集中式的状态管理，用于在应用中管理和共享状态。

2. 单一数据源： 两者都采用了单一数据源的思想，整个应用的状态被存储在一个单一的对象中。

3. 不可变性： 为了更容易追踪状态变化，两者都鼓励使用不可变的数据结构，即在更新状态时创建新的对象而不是直接修改现有对象。

4. 中间件： 两者都支持中间件，用于处理异步操作、日志记录等。中间件是一个函数，可以拦截并处理 action 的执行。

5. 提供了开发工具： 两者都有相关的开发者工具，可以帮助开发者调试状态变化、观察 action 的分发等。

## 差异：

1. 框架关联：

  Vuex 是专门为 Vue.js 设计的，直接集成到 Vue 生态系统中，与 Vue 组件深度整合。
  Redux 是一个独立的状态管理库，可以与多个框架（不仅限于 React）一起使用，它本身并没有直接依赖于任何特定的框架。
2. API 和概念：

  Vuex 的 API 和概念相对来说更简单，容易上手。核心概念包括 state、mutations、actions、getters。
  Redux 引入了更多的概念，包括 reducers、actions、dispatch、subscribe、middleware 等，可能在一开始会显得复杂一些。
3. 语法差异：

  在 Vuex 中，你可以直接在组件中使用 mapState、mapMutations、mapActions 等辅助函数，以更方便地绑定状态和操作。
  在 Redux 中，你需要使用 connect 函数或者 hooks，将状态和操作映射到组件的 props 中。
4. 状态变更方式：

  在 Vuex 中，状态的变更主要通过提交(mutations)来实现。
  在 Redux 中，状态的变更通过派发(actions)来实现，然后通过 reducers 处理。
5. 异步处理：

  Vuex 中使用 actions 处理异步操作，可以包含异步代码，然后提交 mutations。
  Redux 中使用中间件来处理异步操作，例如 redux-thunk、redux-saga。


# vuex 使用例子
## 1. 创建 store

```js
// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    }
  },
  getters: {
    doubleCount: state => state.count * 2
  }
});

export default store;
```
## 在主应用文件中引入并使用 store
  
```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

createApp(App).use(store).mount('#app');
```
## 在组件中使用 store
```js
  <!-- Counter.vue -->
  <template>
    <div>
      <p>Count: {{ $store.state.count }}</p>
      <p>Double Count: {{ $store.getters.doubleCount }}</p>
      <button @click="$store.commit('increment')">Increment</button>
      <button @click="$store.dispatch('incrementAsync')">Increment Async</button>
    </div>
  </template>
```


# redux 使用例子
## 1. 创建 store

```js
// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  count: 0
};

const increment = () => ({ type: 'INCREMENT' });

const incrementAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(increment());
  }, 1000);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export { increment, incrementAsync };
export default store;
```
## 在主应用文件中引入并使用 store
```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```
## 在组件中使用 store
```js
// Counter.js
import React from 'react';
import { connect } from 'react-redux';
import { increment, incrementAsync } from './store';

const Counter = ({ count, doubleCount, increment, incrementAsync }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double Count: {doubleCount}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementAsync}>Increment Async</button>
    </div>
  );
};

const mapStateToProps = state => ({
  count: state.count,
  doubleCount: state.count * 2
});

const mapDispatchToProps = { increment, incrementAsync };

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```

## reducers 和 actions 的区别
1. reducers 是一个纯函数，接收旧的 state 和 action，返回新的 state。
2. actions 是一个对象，其中的每个属性都是一个函数，用于处理异步操作或者触发 state 的变化。


