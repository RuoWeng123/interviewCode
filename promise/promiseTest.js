// 测试promise 打印顺序
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
  console.log('promise2')
}).then(function () {
  console.log('promise3');
});
console.log('script end');

// 执行顺序，先执行同步代码，然后执行异步代码，
// await后面的代码会被放到微任务队列中，等到同步代码执行完毕后，会先执行微任务队列中的代码，然后再执行宏任务队列中的代码

// script start
// async1 start
// async2
// promise1
// promise2
// script end
// async1 end
// promise3
// setTimeout


setTimeout(function(){
  console.log(1)
}, 100);

new Promise(function(resolve){
  console.log(2);
  resolve();
  console.log(3);
}).then(function(){
  console.log(4);
  new Promise((resolve, reject) =>{
    console.log(5);
    setTimeout(() => {
      console.log(6);
    },10);  // 当这里的时间比1的时间小，先执行6，再执行1
  });
});
console.log(7);
