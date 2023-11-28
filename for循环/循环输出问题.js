// for (let i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i);
//   }, 1000 * i);
// }
// 上面的输出 时每秒输出一个数，切输出的数值为0-4
// 使用闭包，输出每秒一次，输出的数值为0-4
// for (var i = 0; i < 5; i++) {
//   (function(i) {
//     setTimeout(function() {
//       console.log(i);
//     }, 1000 * i);
//   })(i);
// }

// 使用var ,输出每秒一次，输出的数值为5
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000 * i);
}

