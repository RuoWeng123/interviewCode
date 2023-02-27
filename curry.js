function curry(fn){
  let params = [];
  
  return function sum(...args){
    if(args.length){
      params = [...params, ...args];
      return sum;
    }
    
    return fn(params);
  }
}

function add(arr){
  return arr.reduce((result, item)=>{
    return result + item;
  },0)
}

let curried = curry(add);


console.log(curried(1)(2)(3)(4,5)());
