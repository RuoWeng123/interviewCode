function defineReactive(obj, key, val){
  // 创建一个依赖收集器
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get(){
      // 将Dep.target（即当前的Watcher对象存入dep的subs中）
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set(newVal){
      if(val !== newVal){
        val = newVal;
        // 通知所有的订阅者更新
        dep.notify();
      }
    }
  })
}
// 依赖收集器
function Dep () {
  this.subs = [];
}
Dep.prototype.addSub = function(sub){
  this.subs.push(sub);
}
Dep.prototype.notify = function(){
  // 通知所有的订阅者更新
  this.subs.forEach(function(sub) {
    sub.update();
  })
};

// watcher 订阅者 vm vue实例 exp 属性名 cb 回调函数
function Watcher(vm, exp, cb){
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = this.get();
}

Watcher.prototype.get = function(){
  // 将当前的watcher对象赋值给Dep.target
  Dep.target = this;
  // 触发getter，添加自己到属性的订阅器中
  const value = this.vm[this.exp];
  // 添加完毕，重置
  Dep.target = null;
  return value;

}
Watcher.prototype.update = function(){
  // 当数据变化时，触发回调函数进行更新
  const value = this.vm[this.exp];
  const oldValue = this.value;
  if(value !== oldValue){
    this.value = value;
    this.cb.call(this.vm, value, oldValue);
  }
}

// exemple
const obj = {};
defineReactive(obj, 'name', 'weng');
const watcher = new Watcher(obj, 'name', function(){
  console.log('更新了');
});

console.log('name', obj.name);
obj.name = 'le qian';
console.log('新name', obj.name);