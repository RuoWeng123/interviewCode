// 依赖收集器
class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach(effect => {
      effect();
    });
  }
}

// 创建依赖收集器实例
const dep = new Dep();

// 全局变量，用于跟踪当前活动的效果函数
let activeEffect = null;

// reactive 函数，将对象转化为响应式对象
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      // 收集依赖
      dep.depend();
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      // 通知更新
      dep.notify();
      return true;
    }
  });
}

// 一个简单的效果函数，用于模拟更新
function effect() {
  console.log('Effect triggered');
}

// 包装效果函数，确保在其执行期间跟踪依赖
function trackEffect(fn) {
  activeEffect = fn;
  fn(); // 运行效果函数以收集依赖
  activeEffect = null;
}

// 创建响应式对象
const obj = reactive({ count: 0 });

// 包装效果函数以进行依赖收集
trackEffect(effect);

// 访问响应式对象的属性
console.log(obj.count); // 触发依赖收集，输出 "Effect triggered"
