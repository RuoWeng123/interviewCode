# redux 面试题
## redux 定义，作用
redux 是一个JavaScript状态容器，提供可预测化的状态管理。
## redux 核心原则
1. 单一数据源
2. 状态不可变,只可读
3. 纯函数修改状态， 采用reducer来修改数据
## redux 中 action 的作用
action 是一个对象，用来描述发生了什么，包含两个属性：type 和 payload
type: 表示正在执行的操作类型    
payload: 表示正在执行的操作所需的数据    
## redux 中 reducer 的作用
reducer 是一个纯函数，用来修改状态，接收两个参数：state 和 action
state: 表示当前状态
action: 表示正在执行的操作
return: 返回新的状态
## redux 中 store 的作用
store 是一个对象，用来存储状态，提供了一些方法来操作状态
## redux 中 dispatch 的作用
dispatch 是一个方法，用来触发 action，接收一个 action 作为参数
## redux 中 subscribe 的作用
subscribe 是一个方法，用来订阅 store 中状态的变化，接收一个回调函数作为参数
## redux 中 applyMiddleware 的作用
applyMiddleware 是一个方法，用来扩展 redux 的功能，接收一个中间件作为参数
## redux 中 combineReducers 的作用
combineReducers 是一个方法，用来合并多个 reducer，接收一个对象作为参数
## redux 中 connect 的作用
connect 是一个方法，用来连接组件和 store，接收两个参数：mapStateToProps 和 mapDispatchToProps
mapStateToProps 是一个函数，用来将 store 中的状态映射到组件的 props 中
mapDispatchToProps 是一个函数或对象，用来将 dispatch 映射到组件的 props 中
## 例子
```js
// useReducer.js
const initialState = {
  user: null,
}
const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;
```

```js
// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // 其他的 reducer
})
export default rootReducer;

// store.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducers'; // 假设有一个 rootReducer

const store = createStore(
  rootReducer,
  // 引入异步中间件
  applyMiddleware(thunk)
);

export default store;
```

```js
// action.js

import axios from 'axios';

// 定义 action 
const setUser = (user) =>({
  type: 'SET_USER',
  payload: user
})

// 异步创建 action, 注意返回的一定是dispatch， 给mapDispatchToProps使用
const getUser = () => {
  return (dispatch) => {
    axios.get('/user').then(res => {
      dispatch(setUser(res.data))
    })
  }
}

export {
  getUser
}
```

```js
// useComponent.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from './action';

const UserComponent = ({user, getUser}) => {

  useEffect(() =>{
    getUser();
  },[getUser])
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.age}</p>
      <button onClick={getUser}>获取用户信息</button>
    </div>
  )

  export default connect(
    // mapStateToProps
    (state) => ({
      user: state.user
    }),
    // mapDispatchToProps
    {
      getUser
    }
  )(UserComponent)
}
```

# hooks 中如何使用redux；
- 使用useSelector 获取store中的数据
- 使用useDispatch 获取dispatch方法  