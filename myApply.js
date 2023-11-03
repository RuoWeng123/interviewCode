Function.prototype.apply = function(context, arr){
    context = context || window;
    context.fn = this;
    let result;
    if(!arr){
        result = context.fn();
    }else{
        let args = [];
        for(let i = 0; i < arr.length; i++){
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')');
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