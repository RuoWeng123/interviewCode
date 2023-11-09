Function.prototype.apply = function(context, arr){
    context = context || window;
    context.fn = this;
    let result;
    if(!arr){
        result = context.fn();
    }else{
      context.fn(...arr);
    }
    delete context.fn;
    return result;
}

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