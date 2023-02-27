class EventEmitter {
  constructor() {
    this.events= {};
  }
  
  on (eventName, callBack){
    if(!this.events[eventName]){
      this.events[eventName] = [];
    }
    
    this.events[eventName].push(callBack);
    
    return this;
  }
  
  emit(eventName, ...args){
    if(!this.events[eventName]){
      return this;
    }
    
    //从event中获取on中push的所有回调函数
    const fns = this.events[eventName];
    fns.forEach(fn => fn.apply(this, args));
    
    return this;
  }
  
  remove(eventName, callback) {
    if(!this.events[eventName]){
      return this;
    }
    // 没有回调函数，
    if(!callback){
      this.events[eventName] = null;
      return this;
    }
    
    // 有回调函数，从现有的event中的队列中移出当前回调函数
    const index = this.events[eventName].indexOf(callback);
    this.events[eventName].splice(index,1);
    
    return this;
  }
  
  once(eventName, callBack){
    const only = () =>{
      callBack.apply(this, arguments);
      this.remove(eventName, only);
    }
    
    this.on(eventName, only);
    return this;
  }
}


const emt = new EventEmitter();
let callback1 = function(...args){
  console.log('回调函数', ...args);
}

let callback2 = function(...args){
  console.log('callback2', ...args);
}
emt.on('cal1', callback1);
emt.on('cal2', callback2);

setTimeout(() =>{
  emt.emit('cal1', 'cal1 需要回调的内容');
}, 2000)

setTimeout(() =>{
  emt.emit('cal2', '回调的内容');
}, 5000);

