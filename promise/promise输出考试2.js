async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");  1
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1"); 2
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("scripts end");

// 1 script start
// 2 async1 start
// 3 async2
// 4 promise1
// 5 scripts end
// 6 promise2
// 7 async1 end
// 8 setTimeout
