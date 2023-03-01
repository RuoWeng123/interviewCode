// 题目，实现一个批量请求函数, 能够限制并发量?
class LimitPromise {
  constructor (max) {
    // 异步任务“并发”上限
    this._max = max
    // 当前正在执行的任务数量
    this._count = 0
    // 等待执行的任务队列
    this._taskQueue = []
  }
  
  /**
   * 调用器，将异步任务函数和它的参数传入
   * @param caller 异步任务函数，它必须是async函数或者返回Promise的函数
   * @param args 异步任务函数的参数列表
   * @returns {Promise<unknown>} 返回一个新的Promise
   */
  call (caller, ...args) {
    return new Promise((resolve, reject) => {
      const task = this._createTask(caller, args, resolve, reject)
      if (this._count >= this._max) {
        console.log('count >= max, push a task to queue')
        this._taskQueue.push(task)
      } else {
        task()
      }
    })
  }
  
  /**
   * 创建一个任务
   * @param caller 实际执行的函数
   * @param args 执行函数的参数
   * @param resolve
   * @param reject
   * @returns {Function} 返回一个任务函数
   * @private
   */
  _createTask (caller, args, resolve, reject) {
    return () => {
      // 实际上是在这里调用了异步任务，并将异步任务的返回（resolve和reject）抛给了上层
      caller(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          // 任务队列的消费区，利用Promise的finally方法，在异步任务结束后，取出下一个任务执行
          this._count--
          if (this._taskQueue.length) {
            // console.log('a task run over, pop a task to run')
            let task = this._taskQueue.shift()
            task()
          } else {
            // console.log('task count = ', count)
          }
        })
      this._count++
      // console.log('task run , task count = ', count)
    }
  }
}

const request = {
  get: (url) => new Promise((resolve) =>{
    console.log('get url', url);
    setTimeout(() =>{
      resolve(url)
    },2000)
  }),
  post: (url, data) => new Promise((resolve) =>{
    console.log('post url', url);
    setTimeout(() =>{
      resolve(url)
    },2000)
  }),
  put: (url, data) => new Promise((resolve) =>{
    console.log('put url', url);
    setTimeout(() =>{
      resolve(url)
    },2000)
  }),
  delete: (url) => new Promise((resolve) =>{
    console.log('delete url', url);
    setTimeout(() =>{
      resolve(url)
    },2000)
  }),
}

let limitPromiseInstance = new LimitPromise(2);
limitPromiseInstance.call(request.get, 'get url')
limitPromiseInstance.call(request.post, 'post url', 'params')
limitPromiseInstance.call(request.put, 'put url', 'params')
