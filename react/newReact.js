// 简化的 React 类
class React {
  constructor() {
    this.state = {};
    this.queue = [];
  }

  // 更新队列
  enqueueUpdate(component) {
    this.queue.push(component);
    this.scheduleUpdate();
  }

  // 调度更新
  scheduleUpdate() {
    Promise.resolve().then(() => this.flushUpdate());
  }

  // 执行更新
  flushUpdate() {
    while (this.queue.length > 0) {
      const component = this.queue.shift();
      component.update();
    }
  }

  // 创建组件
  static createElement(type, props, ...children) {
    return { type, props, children };
  }

  // 渲染组件
  static render(element, container) {
    const instance = new element.type(element.props);
    const virtualDOM = instance.render();
    container.innerHTML = virtualDOM;
    instance.componentDidMount();
  }
}

// 简化的组件类
class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    this._pendingState = null;
    this._pendingUpdate = false;
  }

  setState(partialState) {
    this._pendingState = partialState;
    React.enqueueUpdate(this);
  }

  update() {
    if (this._pendingState) {
      this.state = { ...this.state, ...this._pendingState };
      this._pendingState = null;
    }
    const virtualDOM = this.render();
    this.componentDidUpdate();
  }

  render() {
    // 子类实现
  }

  componentDidMount() {
    // 生命周期钩子
  }

  componentDidUpdate() {
    // 生命周期钩子
  }
}

// 示例应用
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return React.createElement('div', null,
      React.createElement('p', null, `Count: ${this.state.count}`),
      React.createElement('button', { onClick: () => this.handleClick() }, 'Increment')
    );
  }
}

// 渲染应用
React.render(React.createElement(MyComponent), document.getElementById('root'));
