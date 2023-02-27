// 想象一下，有一天你突然一次性发了10个请求，但是这样的话并发量是很大的，能不能控制一下，就是一次只发2个请求，某一个请求完了，就让第3个补上，又请求完了，让第4个补上，以此类推，让最高并发量变成可控的
class Scheduler {
  constructor(max) {
    this._count = 0;
    this._queue = [];
    this._max = max;
  }
  
  all(promiseList){
    this._queue = promiseList;
    this._taskStart();
  }
  _taskStart(){
    for(let i = 0; i < this._queue.length; i++){
      this._request();
    }
  }
  _request(){
    if(!this._queue.length || this._count >= this._max) {
      console.log('超过了');
      return;
    }
    this._count++;
    this._queue.shift().then(() =>{
      this._count--;
      this._request();
    })
  }
}
let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2)
  }, 3000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3)
  }, 2000)
})
let p4 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(4)
  }, 4000)
})

let limitInstance = new Scheduler(2);
limitInstance.all([p1, p2, p3, p4]);
