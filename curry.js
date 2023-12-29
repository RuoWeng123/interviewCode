// 柯里化函数
function curry_1(fn, args) {
  let  len = fn.length;
  args = args || [];

  return function(){
    let subArgs = args.slice(0);
    for(let i = 0; i < arguments.length; i++){
      subArgs.push(arguments[i]);
    }
    if(subArgs.length < len){
      return curry_1.call(this, fn, subArgs);
    }else{
      return fn.apply(this, subArgs);
    }
  }
}

// 写法2
function curry_2(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curried.apply(this, [...args, ...nextArgs]);
      };
    }
  };
}

const sum = function (...args){
  return args.reduce((a, b) => a + b, 0);
};
const currySum = curry_2(sum);
console.log(currySum(1)(2)(3)(4));

// es6 实现
// function curry2(fn, ...args) {
//   return fn.length <= args.length ? fn(...args) : curry2.bind(null, fn, ...args);
// }