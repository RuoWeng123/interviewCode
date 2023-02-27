// async function async1() {
//   console.log('1')// 1
//   await async2()//2
//   console.log('2')//3
// }
//
// async function async2() {
//   console.log('3')// 4
// }
//
// console.log('4')//5
//
// setTimeout(function () {
//   console.log('5')//6
// })
//
// async1()//7
//
// new Promise(function (resolve) {
//   console.log('6')//8
//   resolve()//9
// }).then(function () {
//   console.log('7')// 10
// })
//
// console.log('8')// 11

// 4 1 3 2 6 7 8 5

// 4 1 3 6 8 2 7 5
setTimeout(function () {
  console.log("1");
  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log("2");
    });
    console.log("3");
  });
});
new Promise(function (resolve) {
  console.log("4");
  resolve();
}).then(function () {
  console.log("5");
});
setTimeout(function () {
  console.log("6");
});
 console.log(7);

 queueMicrotask(() => {
   console.log("8")
 });

 new Promise(function (resolve) {
   resolve();
 }).then(function () {
   console.log("9");
 })
 // 4 7 8 5 9 1 3 2 6