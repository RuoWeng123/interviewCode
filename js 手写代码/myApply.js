Function.prototype.myApply = function(context, argsArray) {
    context = context || window;
    context.fn = this;
  
    let result;
  
    if (!argsArray) {
      result = context.fn();
    } else {
      // 使用 apply 方法传递参数数组
      result = context.fn(...argsArray);
    }
  
    delete context.fn;
    return result;
  };
  
Function.prototype.call = function(context, ...args){
    context = context || window;
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.bind = function(context, ...args){
    context = context || window;
    context.fn = this;
    return function(...args2){
        let result = context.fn(...args, ...args2);
        delete context.fn;
        return result;
    }
}