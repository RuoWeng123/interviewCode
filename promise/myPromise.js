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
  this.resovleCallbacks = [];

  this.rejectCallbacks = [];

  function resolve(value){
    if(value instanceof MyPromise){
      return value.then(resolve, reject);
    }
    if(self.state === PENDING){
      self.state = FULFILLED;
      self.value = value;
      self.resovleCallbacks.forEach(cb => cb(value));
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

  if(this.state === PENDING){
    this.resovleCallbacks.push(onFulfilled);
    this.rejectCallbacks.push(onRejected);
  }
  if(this.state === FULFILLED){
    onFulfilled(this.value);
  }
  if(this.state === REJECTED){
    onRejected(this.value);
  }
}

MyPromise.prototype.all = function(promises){
  let result = [];
  let count = 0;
  return new MyPromise((resolve, reject) => {
    promises.forEach((item, index) => {
      item.then(res => {
        result[index] = res;
        count++;
        if(count === promises.length){
          resolve(result);
        }
      }, err => {
        reject(err);
      })
    })
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