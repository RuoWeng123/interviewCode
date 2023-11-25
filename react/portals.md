# 在父节点外 渲染子阶段的方式
##  react-portal
```js
import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  el = document.createElement('div');

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

// 使用 Modal 组件
function App() {
  return (
    <div>
      <Modal>
        <h1>Hello from a portal!</h1>
      </Modal>
    </div>
  );
}

export default App;
```
## vue2 使用vue-portal 插件
```js
<template>
  <div>
    <portal to="destination">
      <p>This will be rendered wherever the <portal-target> with name 'destination' is located.</p>
    </portal>
  </div>
</template>

<script>
import { Portal } from 'portal-vue'

export default {
  components: {
    Portal
  }
}
</script>
```
## vue3 使用teleport
```js
<template>
  <div>
    <teleport to="body">
      <div>This will be rendered directly inside body tag</div>
    </teleport>
  </div>
</template>
```
