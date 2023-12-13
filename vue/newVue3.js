// reactive 大致流程

const toProxy = new WeakMap(); // 存放被代理过的对象
const toRaw = new WeakMap(); // 存放已经代理过的对象

function reactive(target) {
    // 创建响应式对象
    return createReactiveObject(target);
}

function isObject(target) {
    return typeof target === "object" && target !== null;
}

function hasOwn(target,key){
    return target.hasOwnProperty(key);
}

function createReactiveObject(target) {
    if (!isObject(target)) {
        return target;
    }
    
    let observed = toProxy.get(target);
    if(observed){ // 判断是否被代理过
        return observed;
    }
    if(toRaw.has(target)){ // 判断是否要重复代理
        return target;
    }
    
    const handlers = {
        get(target, key, receiver) {
            // 取值
            let res = Reflect.get(target, key, receiver);
            track(target,'get',key); //依赖收集
            // 懒代理，只有当取值时再次做代理，vue2中一上来就会全部递归增加getter,setter
            return isObject(res) ? reactive(res) : res;
        },
        set(target, key, value, receiver) {
            let oldValue = target[key];
            let hadKey = hasOwn(target,key);
            let result = Reflect.set(target, key, value, receiver);
            if(!hadKey){
                trigger(target,'add',key); // 触发添加
            }else if(oldValue !== value){
                trigger(target,'set',key); // 触发修改
            }
            return result;
        },
        deleteProperty(target, key) {
            //...
            const result = Reflect.deleteProperty(target, key);
            return result;
        }
    };
    
    // 开始代理
    observed = new Proxy(target, handlers);
    toProxy.set(target,observed);
    toRaw.set(observed,target); // 做映射表
    return observed;
}


// 可以看到 get 时给 追踪器 track 中添加依赖，set时 利用触发器 trigger 触发依赖

// 追踪器 track
const targetMap = new WeakMap();
function track(target,type,key){
    // 查看是否有effect
    const effect = activeReactiveEffectStack[activeReactiveEffectStack.length-1];
    if(effect){
        let depsMap = targetMap.get(target);
        if(!depsMap){ // 不存在map
            targetMap.set(target,depsMap = new Map());
        }
        let dep = depsMap.get(target);
        if(!dep){ // 不存在则set
            depsMap.set(key,(dep = new Set()));
        }
        if(!dep.has(effect)){
            dep.add(effect); // 将effect添加到依赖中
        }
    }
}


// 触发器 trigger
function trigger(target, type, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let effects = depsMap.get(key);
  if (effects) {
    effects.forEach(effect => {
      effect();
    });
  }
  // 处理如果当前类型是增加属性，如果用到数组的length的effect应该也会被执行
  if (type === "add") {
    let effects = depsMap.get("length");
    if (effects) {
      effects.forEach(effect => {
        effect();
      });
    }
  }
}


// effect 类似于vue2 notify 通知更新
const activeReactiveEffectStack = []; // 存放响应式effect

function effect(fn) {
   const effect = function() {
    // 响应式的effect
    return run(effect, fn);
  };
  effect(); // 先执行一次
  return effect;
}

function run(effect, fn) {
    try {
      activeReactiveEffectStack.push(effect);
      return fn(); // 先让fn执行,执行时会触发get方法，可以将effect存入对应的key属性
    } finally {
      activeReactiveEffectStack.pop(effect);
    }
}
