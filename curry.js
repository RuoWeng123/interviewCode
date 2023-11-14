// 柯里化函数
function curry(fn, args) {
  let  len = fn.length;
  args = args || [];

  return function(){
    let subArgs = args.slice(0);
    for(let i = 0; i < arguments.length; i++){
      subArgs.push(arguments[i]);
    }
    if(subArgs.length < len){
      return curry.call(this, fn, subArgs);
    }else{
      return fn.apply(this, subArgs);
    }
  }
}

// 写法2
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}

// es6 实现
function curry2(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry2.bind(null, fn, ...args);
}