// write promise code
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
  let self = this;

  this.state = PENDING;
  // save resolve or rejected value
  this.value = null;

  // save resolve callback
  this.resolveCallbacks = [];

  this.rejectCallbacks = [];

  function resolve(value){
    if(value instanceof MyPromise){
      return value.then(resolve, reject);
    }
    if(self.state === PENDING){
      self.state = FULFILLED;
      self.value = value;
      self.resolveCallbacks.forEach(cb => cb(value));
    }
  }
  function reject(value){
    if(self.state === PENDING){
      self.state = REJECTED;
      self.value = value;
      self.rejectCallbacks.forEach(cb => cb(value));
    }
  }

  try{
    fn(resolve, reject);
  }catch(e){
    reject(e);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };

  let promise2 = new MyPromise((resolve, reject) => {
    if(this.state === PENDING){
      this.resolveCallbacks.push(onFulfilled);
      this.rejectCallbacks.push(onRejected);
    }
    if(this.state === FULFILLED){
      onFulfilled(this.value);
    }
    if(this.state === REJECTED){
      onRejected(this.value);
    } 
  });
  
  return promise2;
}

const checkIsPromise = (value) => {
  return value && typeof value.then === 'function';
}
MyPromise.prototype.all = function(promises){
  if(!Array.isArray(promises)){
    const type = typeof promises;
    return new TypeError(`TypeError: ${type} ${promises} is not iterable`);
  }
  if(promises.some(item => !checkIsPromise(item))){
    return new TypeError(`TypeError: ${item} is not a promise`);
  }
  let result = [];
  let count = 0;
  return new MyPromise((resolve, reject) => {
    try {
      let item = promises[i];
      Promise.resolve(item).then(res => {
        result.push(res);
        count++;
        if (count === promises.length) {
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  })
}

MyPromise.prototype.race = function(promises){
  return new MyPromise((resolve, reject) => {
    promises.forEach(item => {
      item.then(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  })
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
}
MyPromise.prototype.finally = function(callback) {
  return this.then(
    // 在 Promise 对象状态变为 resolved 时执行回调
    value => MyPromise.resolve(callback()).then(() => value),
    // 在 Promise 对象状态变为 rejected 时执行回调
    reason => MyPromise.resolve(callback()).then(() => {throw reason})
  )
}


// promise static method
MyPromise.resolve = function(value){
  if(value instanceof MyPromise){
    return value;
  }
  return new MyPromise((resolve, reject) => {
    resolve(value);
  })
}

MyPromise.reject = function(value){
  return new MyPromise((resolve, reject) => {
    reject(value);
  })
}

